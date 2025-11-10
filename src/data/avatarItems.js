export const AVATAR_CATEGORIES = [
  {
    id: 'body',
    label: 'Body',
    items: [
      {
        id: 'body-classic',
        name: 'Explorer',
        price: 0,
        colors: {
          skin: '#f4c9a3',
          hair: '#3b2c35',
        },
      },
      {
        id: 'body-midnight',
        name: 'Midnight Synth',
        price: 250,
        colors: {
          skin: '#2a1f38',
          hair: '#7f5bff',
          glow: '#5bffda',
        },
      },
      {
        id: 'body-neon',
        name: 'Neon',
        price: 400,
        colors: {
          skin: '#f7d4ff',
          hair: '#2fe3ff',
        },
      },
    ],
  },
  {
    id: 'outfit',
    label: 'Outfit',
    items: [
      {
        id: 'outfit-starter',
        name: 'Starter Suit',
        price: 0,
        colors: {
          primary: '#6fe4ff',
          secondary: '#1c86ff',
        },
      },
      {
        id: 'outfit-ember',
        name: 'Ember Armor',
        price: 350,
        colors: {
          primary: '#ff7ea8',
          secondary: '#ffbd4a',
        },
      },
      {
        id: 'outfit-cosmos',
        name: 'Cosmos Cloak',
        price: 500,
        colors: {
          primary: '#7b61ff',
          secondary: '#12d6ff',
        },
      },
    ],
  },
  {
    id: 'accessory',
    label: 'Accessory',
    items: [
      {
        id: 'accessory-none',
        name: 'None',
        price: 0,
      },
      {
        id: 'accessory-visor',
        name: 'Star Visor',
        price: 220,
        colors: {
          accent: '#ffed4e',
        },
      },
      {
        id: 'accessory-jetpack',
        name: 'Pixel Jetpack',
        price: 420,
        colors: {
          accent: '#ff7ea8',
        },
      },
    ],
  },
  {
    id: 'background',
    label: 'Backdrop',
    items: [
      {
        id: 'background-default',
        name: 'Blue Gradient',
        price: 0,
        colors: {
          top: '#0264d1',
          bottom: '#b2ddf2',
        },
      },
      {
        id: 'background-nebula',
        name: 'Nebula Drift',
        price: 300,
        colors: {
          top: '#3b1e5f',
          bottom: '#ff7ea8',
        },
      },
      {
        id: 'background-aurora',
        name: 'Aurora Field',
        price: 380,
        colors: {
          top: '#1f4037',
          bottom: '#99f2c8',
        },
      },
    ],
  },
]

export function getItemById(itemId) {
  for (const category of AVATAR_CATEGORIES) {
    const found = category.items.find((item) => item.id === itemId)
    if (found) return { ...found, category: category.id }
  }
  return null
}


