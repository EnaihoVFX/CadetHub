const createPixelIcon = (path, fill) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Cpath fill='%23${fill.replace(
    '#',
    '',
  )}' d='${encodeURIComponent(path)}'/%3E%3C/svg%3E`

// Multi-layer pixel icon with optional stroke per layer for crisp outlines
const createPixelIconMulti = (layers) => {
  const paths = layers
    .map(({ d, fill, stroke, strokeWidth }) => {
      const fillAttr = fill ? `fill='%23${fill.replace('#', '')}'` : "fill='none'"
      const strokeAttr = stroke ? ` stroke='%23${stroke.replace('#', '')}'` : ''
      const swAttr = stroke ? ` stroke-width='${strokeWidth || 1}'` : ''
      return `%3Cpath ${fillAttr}${strokeAttr}${swAttr} d='${encodeURIComponent(d)}'/%3E`
    })
    .join('')
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E${paths}%3C/svg%3E`
}

// Improved STAR with outline and highlight
export const ICON_STAR = createPixelIconMulti([
  { d: 'M7 2h2v2h2v2h2v2h-2v2h-2v2H7v-2H5V8H3V6h2V4h2z', fill: null, stroke: '#7A5E1A', strokeWidth: 1 },
  { d: 'M7 2h2v2h2v2h2v2h-2v2h-2v2H7v-2H5V8H3V6h2V4h2z', fill: '#F3CC4C' },
  { d: 'M7 5h2v2H7z', fill: '#FFF3A1' },
])
export const ICON_STREAK = createPixelIcon('M6 1h4v3h2v4h-2v6H6v-3H4V7h2z', '#FF8243')
// Improved CREW with outline and subtle highlight bars
export const ICON_CREW = createPixelIconMulti([
  {
    d: 'M3 3h4v2H3V3zm6 0h4v2H9V3zM1 6h6v2H1V6zm8 0h6v2H9V6zM3 9h4v2H3V9zm6 0h4v2H9V9zm-6 3h4v2H3v-2zm6 0h4v2H9v-2z',
    fill: null,
    stroke: '#1C6E88',
    strokeWidth: 1,
  },
  { d: 'M3 3h4v2H3V3zm6 0h4v2H9V3zM1 6h6v2H1V6zm8 0h6v2H9V6zM3 9h4v2H3V9zm6 0h4v2H9V9zm-6 3h4v2H3v-2zm6 0h4v2H9v-2z', fill: '#6FE4FF' },
  { d: 'M4 4h2v1H4zM10 4h2v1h-2z', fill: '#CFF7FF' },
])
export const ICON_MISSION = createPixelIcon('M3 2h10v2H3V2zm2 3h6v2H5V5zm-2 3h10v2H3V8zm2 3h6v2H5v-2z', '#94B1FF')
export const ICON_TERMINAL = createPixelIcon(
  'M2 2h12v12H2V2zm2 2v8h8V4H4zm1 1h2v2H5V5zm3 0h3v1H8V5zm0 2h3v1H8V7zm0 2h3v1H8V9zm-3 1h2v2H5v-2z',
  '#6FE4FF',
)
export const ICON_PUZZLE = createPixelIcon(
  'M4 2h4v2h2v2h2v4H8V8H6v2H2V6h2V4h2V2z',
  '#F6A55D',
)
// Improved TIMER with outline and face highlight
export const ICON_TIMER = createPixelIconMulti([
  { d: 'M7 2h2v2h3v2h-1v4h-2v2H7v-2H5V6H4V4h3V2z', fill: null, stroke: '#274C9B', strokeWidth: 1 },
  { d: 'M7 2h2v2h3v2h-1v4h-2v2H7v-2H5V6H4V4h3V2z', fill: '#94B0FF' },
  { d: 'M7 5h2v1H7z', fill: '#DCE6FF' },
])
export const ICON_NOTE = createPixelIcon('M3 2h8l2 2v10H3V2zm2 3v1h6V5H5zm0 3v1h6V8H5zm0 3v1h4v-1H5z', '#F3CC4C')
export const ICON_RADIO = createPixelIcon('M2 4h12v8H2V4zm2 2v4h2V6H4zm6 0v4h2V6h-2zm-3 1h2v2H7V7z', '#94B1FF')
export const ICON_SETTINGS = createPixelIcon(
  'M6 2h4v2h2v4h-2v4H6v-2H4V6h2V2z',
  '#6FE4FF',
)
export const ICON_BADGE = createPixelIcon('M6 2h4v2h2v6l-4 4-4-4V4h2V2z', '#F6A55D')

// Badge Icons
export const ICON_BADGE_TARGET = createPixelIconMulti([
  { d: 'M3 3h10v10H3z', fill: null, stroke: '#5A8EFF', strokeWidth: 1 },
  { d: 'M5 5h6v6H5z', fill: '#6FE4FF' },
  { d: 'M7 7h2v2H7z', fill: '#FFFFFF' },
])

export const ICON_BADGE_BLOCKS = createPixelIcon(
  'M2 2h5v5H2zm7 0h5v5H9zM2 9h5v5H2zm7 0h5v5H9z',
  '#94B1FF',
)

export const ICON_BADGE_LIGHTNING = createPixelIcon(
  'M7 2h2v3h3v2h-2v2h2v2h-2v3H8v-3H6v-2h2V7H5V5h2z',
  '#F3CC4C',
)

export const ICON_BADGE_CONTROLLER = createPixelIconMulti([
  { d: 'M4 5h8v6H4z', fill: '#FF7EA8' },
  { d: 'M5 7h2v2H5zm4 0h2v2H9z', fill: '#FFFFFF' },
])

export const ICON_BADGE_FILM = createPixelIcon(
  'M2 2h12v12H2zm2 2v8h8V4zm1 1h1v1H5zm0 2h1v1H5zm0 2h1v1H5zm4-4h1v1H9zm0 2h1v1H9zm0 2h1v1H9z',
  '#F6A55D',
)

export const ICON_BADGE_SOUND = createPixelIconMulti([
  { d: 'M4 6h2v4H4z', fill: '#94B1FF' },
  { d: 'M6 5l3-2v10l-3-2z', fill: '#94B1FF' },
  { d: 'M10 7h1v2h-1zm2-1h1v4h-1z', fill: '#6FE4FF' },
])

export const ICON_BADGE_CAT = createPixelIcon(
  'M3 2h2v2H3zm6 0h2v2H9zM2 4h3v2H2zm7 0h3v2H9zM4 6h6v6H4zm2 2h1v1H6zm3 0h1v1H9zM6 10h2v1H6z',
  '#FF7EA8',
)

export const ICON_BADGE_CODE = createPixelIcon(
  'M5 4h1v2H5zm5 0h1v2h-1zM3 6h2v1H3zm8 0h2v1h-1zM2 8h2v1H2zm10 0h2v1h-2zM3 10h2v1H3zm8 0h2v1h-1zM5 12h1v2H5zm5 0h1v2h-1z',
  '#6FE4FF',
)


