import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import FullBodyAvatar from '../components/FullBodyAvatar.jsx'
import { useAvatar } from '../context/AvatarContext.jsx'
import { AVATAR_CATEGORIES, getItemById } from '../data/avatarItems.js'
import './Shop.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

function Shop() {
  const { coinBalance, equipped, ownedItems, purchaseItem, equipItem } = useAvatar()
  const [previewItem, setPreviewItem] = useState(null)
  const [status, setStatus] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const previewEquipped = previewItem
    ? {
        ...equipped,
        [previewItem.category]: previewItem.id,
      }
    : equipped

  const handlePurchase = (item) => {
    const result = purchaseItem(item.id)
    if (!result.success) {
      if (result.reason === 'insufficient-funds') {
        setStatus({ type: 'error', message: "You don't have enough coins yet. Complete more quests!" })
      } else if (result.reason === 'already-owned') {
        setStatus({ type: 'info', message: 'You already own this item. Equip it to show it off!' })
      } else {
        setStatus({ type: 'error', message: 'Unable to purchase item.' })
      }
    } else {
      setStatus({ type: 'success', message: `${item.name} purchased and equipped!` })
    }
  }

  const handleEquip = (item) => {
    const result = equipItem(item.id)
    if (result.success) {
      setStatus({ type: 'success', message: `${item.name} equipped!` })
    } else {
      setStatus({ type: 'error', message: 'You need to buy this item before equipping it.' })
    }
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const visibleCategories = useMemo(() => {
    return AVATAR_CATEGORIES
      .map((category) => {
        const filteredItems = category.items.filter((item) =>
          item.name.toLowerCase().includes(normalizedSearch),
        )
        return {
          ...category,
          items: filteredItems,
        }
      })
      .filter((category) => {
        if (category.items.length === 0) return false
        if (activeCategory === 'all') return true
        return category.id === activeCategory
      })
  }, [normalizedSearch, activeCategory])

  return (
    <motion.div
      className="shop-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="shop-layout">
        <aside className="shop-preview-panel">
          <h2 className="shop-preview-title pixel-font">Preview</h2>
          <FullBodyAvatar equipped={previewEquipped} size="lg" />
          <div className="shop-preview-info">
            <span className="shop-preview-label">
              {previewItem ? previewItem.name : 'Current look'}
            </span>
            <p className="shop-preview-copy">
              {previewItem
                ? 'Thinking about picking this up? View it in motion before you buy.'
                : 'Try different items from the catalog to see them here.'}
            </p>
          </div>
        </aside>

        <section className="shop-catalog">
          <div className="shop-hero">
            <div>
              <h1 className="shop-title pixel-font">Galactic Outfitters</h1>
              <p className="shop-subtitle">
                Spend coins to unlock fresh fits, gadgets, and cosmic vibes for your avatar.
                Items equip instantly so you can flex right away.
              </p>
            </div>
            <div className="shop-balance-card">
              <span className="shop-balance-label">COINS</span>
              <span className="shop-balance-value pixel-font">{coinBalance.toLocaleString()}</span>
            </div>
          </div>

          {status && (
            <div className={`shop-status shop-status--${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="shop-toolbar">
            <div className="shop-filters" role="tablist" aria-label="Shop categories">
              <button
                type="button"
                className={`shop-filter-btn pixel-font ${activeCategory === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All
              </button>
              {AVATAR_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`shop-filter-btn pixel-font ${activeCategory === category.id ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <label className="shop-search">
              <span className="sr-only">Search the catalog</span>
              <input
                type="search"
                placeholder="Search the catalog..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
          </div>

          <div className="shop-catalog__list">
            {visibleCategories.length === 0 ? (
              <div className="shop-empty">
                <h3 className="shop-empty__title pixel-font">No items found</h3>
                <p className="shop-empty__copy">
                  Try a different search term or browse another category. The shop updates often!
                </p>
              </div>
            ) : (
              visibleCategories.map((category) => (
                <div key={category.id} className="shop-category">
                  <header className="shop-category__header">
                    <h3 className="shop-category__title pixel-font">{category.label}</h3>
                    <span className="shop-category__count">
                      {category.items.filter((item) => ownedItems.has(item.id)).length}
                      {' / '}
                      {category.items.length} owned
                    </span>
                  </header>
                  <div className="shop-category__grid">
                    {category.items.map((item) => {
                      const owned = ownedItems.has(item.id)
                      const equippedSlot = equipped[category.id] === item.id
                      return (
                        <article
                          key={item.id}
                          className={`shop-item-card ${owned ? 'shop-item-card--owned' : ''}`}
                          onMouseEnter={() => setPreviewItem({ ...item, category: category.id })}
                          onFocus={() => setPreviewItem({ ...item, category: category.id })}
                          onMouseLeave={() => setPreviewItem(null)}
                        >
                          <div className="shop-item-card__preview">
                            <FullBodyAvatar
                              equipped={{
                                ...equipped,
                                [category.id]: item.id,
                              }}
                              size="sm"
                            />
                          </div>
                          <div className="shop-item-card__body">
                            <h4 className="shop-item-card__name">{item.name}</h4>
                            <p className="shop-item-card__price">
                              {item.price === 0 ? 'Included' : `${item.price} coins`}
                            </p>
                          </div>
                          <div className="shop-item-card__footer">
                            {owned ? (
                              <button
                                type="button"
                                className="shop-item-card__btn pixel-font"
                                onClick={() => handleEquip({ ...item, category: category.id })}
                                disabled={equippedSlot}
                              >
                                {equippedSlot ? 'Equipped' : 'Equip'}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="shop-item-card__btn shop-item-card__btn--buy pixel-font"
                                onClick={() => handlePurchase({ ...item, category: category.id })}
                              >
                                Buy
                              </button>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default Shop

