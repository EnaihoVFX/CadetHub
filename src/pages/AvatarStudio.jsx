import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FullBodyAvatar from '../components/FullBodyAvatar.jsx'
import { useAvatar } from '../context/AvatarContext.jsx'
import { getItemById } from '../data/avatarItems.js'
import './AvatarStudio.css'

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

function AvatarStudio() {
  const navigate = useNavigate()
  const { equipped, categories, ownedItems, coinBalance, equipItem, purchaseItem } = useAvatar()
  const [status, setStatus] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [previewItem, setPreviewItem] = useState(null)

  useEffect(() => {
    if (!status) return undefined
    const timer = setTimeout(() => setStatus(null), 2600)
    return () => clearTimeout(timer)
  }, [status])

  const handleEquip = (itemId) => {
    const result = equipItem(itemId)
    if (!result.success) {
      setStatus({ type: 'error', message: 'You need to buy this item first.' })
    } else {
      setStatus({ type: 'success', message: 'Avatar updated!' })
    }
  }

  const handlePurchase = (itemId) => {
    const result = purchaseItem(itemId)
    if (!result.success) {
      if (result.reason === 'insufficient-funds') {
        setStatus({ type: 'error', message: 'Not enough coins. Visit the shop for more options!' })
      } else if (result.reason === 'already-owned') {
        setStatus({ type: 'info', message: 'You already own this item.' })
      } else {
        setStatus({ type: 'error', message: 'Unable to purchase item.' })
      }
    } else {
      const item = getItemById(itemId)
      setStatus({ type: 'success', message: `${item?.name ?? 'Item'} equipped!` })
    }
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const catalogItems = useMemo(() => {
    return categories
      .flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryLabel: category.label,
        })),
      )
      .filter((item) => item.name.toLowerCase().includes(normalizedSearch))
      .filter((item) => (activeCategory === 'all' ? true : item.categoryId === activeCategory))
  }, [categories, normalizedSearch, activeCategory])

  useEffect(() => {
    if (catalogItems.length === 0) {
      setPreviewItem(null)
      return
    }
    setPreviewItem((current) => {
      if (!current) return catalogItems[0]
      const stillExists = catalogItems.find((item) => item.id === current.id)
      return stillExists ?? catalogItems[0]
    })
  }, [catalogItems])

  const totalItems = useMemo(
    () => categories.reduce((sum, category) => sum + category.items.length, 0),
    [categories],
  )

  const previewOwned = previewItem ? ownedItems.has(previewItem.id) : false
  const previewEquipped = previewItem
    ? equipped[previewItem.categoryId] === previewItem.id
    : false

  const previewPriceLabel =
    previewItem && previewItem.price !== undefined
      ? previewItem.price === 0
        ? 'Included'
        : `${previewItem.price} coins`
      : ''

  const handlePreviewAction = () => {
    if (!previewItem) return
    if (previewOwned) {
      handleEquip(previewItem.id)
    } else {
      handlePurchase(previewItem.id)
    }
  }

  const renderItemPreview = (categoryId, item) => {
    const colors = item.colors || {}
    switch (categoryId) {
      case 'body':
        return (
          <div
            className="avatar-item-preview avatar-item-preview--body"
            style={{
              '--preview-skin': colors.skin || '#f4c9a3',
              '--preview-hair': colors.hair || '#3b2c35',
            }}
            aria-hidden="true"
          >
            <span className="preview-body__head">
              <span className="preview-body__hair" />
              <span className="preview-body__face">
                <span className="preview-body__eyes" />
                <span className="preview-body__mouth" />
              </span>
            </span>
            <span className="preview-body__torso" />
          </div>
        )
      case 'outfit':
        return (
          <div
            className="avatar-item-preview avatar-item-preview--outfit"
            style={{
              '--preview-primary': colors.primary || '#6fe4ff',
              '--preview-secondary': colors.secondary || '#1c86ff',
            }}
            aria-hidden="true"
          >
            <span className="preview-outfit__mannequin">
              <span className="preview-outfit__panel" />
              <span className="preview-outfit__trim" />
              <span className="preview-outfit__belt" />
            </span>
          </div>
        )
      case 'accessory':
        {
          const modifier = item.id.replace('accessory-', '')
        return (
          <div
              className={`avatar-item-preview avatar-item-preview--accessory avatar-item-preview--${modifier}`}
              style={{
                '--preview-accent': colors.accent || '#ffd700',
              }}
              aria-hidden="true"
            >
              <span className="preview-accessory__core" />
              {modifier === 'visor' && <span className="preview-accessory__visor" />}
              {modifier === 'jetpack' && (
                <>
                  <span className="preview-accessory__thruster preview-accessory__thruster--left" />
                  <span className="preview-accessory__thruster preview-accessory__thruster--right" />
                  <span className="preview-accessory__flame preview-accessory__flame--left" />
                  <span className="preview-accessory__flame preview-accessory__flame--right" />
                </>
              )}
            </div>
          )
        }
      case 'background':
        return (
          <div
            className="avatar-item-preview avatar-item-preview--background"
            style={{
              '--preview-top': colors.top || '#0264d1',
              '--preview-bottom': colors.bottom || '#b2ddf2',
            }}
            aria-hidden="true"
          >
            <span className="preview-background__stars" />
            <span className="preview-background__horizon" />
          </div>
        )
      default:
        return (
          <div className="avatar-item-preview" aria-hidden="true">
            <span className="preview-generic__icon">★</span>
          </div>
        )
    }
  }

  return (
    <motion.div
      className="avatar-studio-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="avatar-studio__layout">
        <div className="avatar-studio__preview">
          <FullBodyAvatar equipped={equipped} size="lg" />
          <div className="avatar-studio__preview-info">
            <span className="avatar-studio__preview-label">Equipped Loadout</span>
            <ul className="avatar-studio__preview-list">
              {Object.entries(equipped).map(([slot, itemId]) => {
                const item = getItemById(itemId)
                return (
                  <li key={slot}>
                    <span className="avatar-studio__preview-slot">{slot.toUpperCase()}</span>
                    <span className="avatar-studio__preview-item">{item?.name ?? 'Unknown'}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="avatar-preview-selected">
            <div className="avatar-preview-selected__header">
              <h3 className="avatar-preview-selected__title pixel-font">Selected Item</h3>
              <div className="avatar-preview-selected__badges">
                {previewOwned && <span className="badge badge--owned">Owned</span>}
                {previewEquipped && <span className="badge badge--equipped">Equipped</span>}
              </div>
            </div>
            {previewItem ? (
              <>
                <div className="avatar-preview-selected__body">
                  <div className="avatar-preview-selected__thumb">
                    {renderItemPreview(previewItem.categoryId, previewItem)}
                  </div>
                  <div className="avatar-preview-selected__info">
                    <span className="avatar-preview-selected__name">{previewItem.name}</span>
                    <span className="avatar-preview-selected__category">
                      {previewItem.categoryLabel}
                    </span>
                    <span className="avatar-preview-selected__price">{previewPriceLabel}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="avatar-preview-selected__action pixel-font"
                  disabled={previewOwned && previewEquipped}
                  onClick={handlePreviewAction}
                >
                  {previewOwned ? (previewEquipped ? 'Equipped' : 'Equip Item') : 'Buy & Equip'}
                </button>
              </>
            ) : (
              <p className="avatar-preview-selected__empty">
                Hover an item to see its details and equip options.
              </p>
            )}
          </div>
        </div>

        <div className="avatar-studio__controls">
          <div className="avatar-studio__header">
            <div className="avatar-studio__header-top">
              <div>
                <h1 className="avatar-studio__title pixel-font">Avatar Studio</h1>
                <p className="avatar-studio__subtitle">
                  Personalise your cadet with full-body pixel outfits, gadgets, and cosmic backdrops.
                </p>
              </div>
              <div className="avatar-studio__actions">
                <div className="avatar-studio__coins">
                  <span className="avatar-studio__coins-label">Coins</span>
                  <span className="avatar-studio__coins-value pixel-font">{coinBalance.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  className="avatar-studio__shop-btn pixel-font"
                  onClick={() => navigate('/shop')}
                >
                  OPEN SHOP
                </button>
              </div>
            </div>

            <div className="avatar-studio__header-bottom">
              <div className="avatar-studio__filters" role="tablist" aria-label="Avatar categories">
                <button
                  type="button"
                  className={`avatar-studio__filter-btn pixel-font ${activeCategory === 'all' ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`avatar-studio__filter-btn pixel-font ${activeCategory === category.id ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <label className="avatar-studio__search">
                <span className="sr-only">Search items</span>
                <input
                  type="search"
                  placeholder="Search outfits, gear, and more..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="avatar-studio__summary">
            <div className="summary-chip">
              <span className="summary-chip__label">Owned</span>
              <span className="summary-chip__value pixel-font">
                {ownedItems.size}/{totalItems}
              </span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip__label">Categories</span>
              <span className="summary-chip__value pixel-font">{categories.length}</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip__label">Equipped Slots</span>
              <span className="summary-chip__value pixel-font">
                {Object.keys(equipped).length}
              </span>
            </div>
          </div>

          {status && (
            <div className={`avatar-studio__status avatar-studio__status--${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="avatar-studio__catalog">
            {catalogItems.length === 0 ? (
              <div className="avatar-studio__empty">
                <h3 className="avatar-studio__empty-title pixel-font">No items found</h3>
                <p className="avatar-studio__empty-copy">
                  Try a different search term or explore another category. New gear drops frequently!
                </p>
              </div>
            ) : (
              <div className="avatar-grid">
                {catalogItems.map((item) => {
                  const isOwned = ownedItems.has(item.id)
                  const isEquipped = equipped[item.categoryId] === item.id
                  const cardClasses = [
                    'avatar-item-card',
                    isOwned ? 'avatar-item-card--owned' : '',
                    isEquipped ? 'avatar-item-card--equipped' : '',
                    previewItem && previewItem.id === item.id ? 'avatar-item-card--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')

                  const handleClick = () => {
                    if (isOwned) {
                      handleEquip(item.id)
                    } else {
                      handlePurchase(item.id)
                    }
                  }

                  return (
                    <button
                      key={`${item.categoryId}-${item.id}`}
                      type="button"
                      className={cardClasses}
                      onClick={handleClick}
                      onMouseEnter={() => setPreviewItem(item)}
                      onFocus={() => setPreviewItem(item)}
                      data-category={item.categoryId}
                      title={`${item.name} • ${
                        item.price === 0 ? 'Included' : `${item.price} coins`
                      }${isOwned ? ' (Owned)' : ''}`}
                    >
                      <div className="avatar-item-card__preview">
                        {renderItemPreview(item.categoryId, item)}
                      </div>
                      <div className="avatar-item-card__meta">
                        <div className="avatar-item-card__details">
                          <span className="avatar-item-card__name">{item.name}</span>
                          <span className="avatar-item-card__price">
                            {item.price === 0 ? 'Included' : `${item.price} coins`}
                          </span>
                        </div>
                        <span className="avatar-item-card__tag">{item.categoryLabel}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AvatarStudio

