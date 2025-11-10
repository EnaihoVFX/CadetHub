import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { AVATAR_CATEGORIES, getItemById } from '../data/avatarItems.js'

const AvatarContext = createContext(undefined)

const DEFAULT_EQUIPPED = {
  body: 'body-classic',
  outfit: 'outfit-starter',
  accessory: 'accessory-none',
  background: 'background-default',
}

const DEFAULT_OWNED = new Set(Object.values(DEFAULT_EQUIPPED))

export function AvatarProvider({ children }) {
  const [coinBalance, setCoinBalance] = useState(1250)
  const [equipped, setEquipped] = useState(DEFAULT_EQUIPPED)
  const [ownedItems, setOwnedItems] = useState(DEFAULT_OWNED)

  const purchaseItem = useCallback((itemId) => {
    if (ownedItems.has(itemId)) {
      return { success: false, reason: 'already-owned' }
    }

    const item = getItemById(itemId)
    if (!item) {
      return { success: false, reason: 'not-found' }
    }

    if (item.price > coinBalance) {
      return { success: false, reason: 'insufficient-funds' }
    }

    setCoinBalance((prev) => prev - item.price)
    setOwnedItems((prev) => {
      const next = new Set(prev)
      next.add(itemId)
      return next
    })
    setEquipped((prev) => ({
      ...prev,
      [item.category]: itemId,
    }))

    return { success: true }
  }, [coinBalance, ownedItems])

  const equipItem = useCallback((itemId) => {
    if (!ownedItems.has(itemId)) {
      return { success: false, reason: 'not-owned' }
    }
    const item = getItemById(itemId)
    if (!item) {
      return { success: false, reason: 'not-found' }
    }
    setEquipped((prev) => ({
      ...prev,
      [item.category]: itemId,
    }))
    return { success: true }
  }, [ownedItems])

  const value = useMemo(() => ({
    coinBalance,
    equipped,
    ownedItems,
    categories: AVATAR_CATEGORIES,
    purchaseItem,
    equipItem,
  }), [coinBalance, equipped, ownedItems, purchaseItem, equipItem])

  return (
    <AvatarContext.Provider value={value}>
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatar() {
  const context = useContext(AvatarContext)
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider')
  }
  return context
}


