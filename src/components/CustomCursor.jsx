import { createPortal } from 'react-dom'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import cursorSprite from '../assets/ cursor.png'

const OFFSCREEN_TRANSFORM = 'translate3d(-9999px, -9999px, 0)'
const CURSOR_Z_INDEX = 999999999999

function CustomCursor() {
  const cursorRef = useRef(null)
  const lastPositionRef = useRef({ x: null, y: null })
  const hotspot = useMemo(() => ({ x: 9, y: 6 }), [])

  const setCursorPosition = useCallback(
    (x, y) => {
      const cursor = cursorRef.current
      if (!cursor) return
       lastPositionRef.current = { x, y }
      cursor.classList.remove('is-hidden')
      cursor.classList.add('is-visible')
      cursor.style.transform = `translate3d(${x - hotspot.x}px, ${y - hotspot.y}px, 0)`
    },
    [hotspot],
  )

  const hideCursor = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    cursor.classList.remove('is-visible')
    cursor.classList.add('is-hidden')
    cursor.style.transform = OFFSCREEN_TRANSFORM
  }, [])

  useLayoutEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    cursor.style.setProperty('pointer-events', 'none', 'important')
    cursor.style.setProperty('position', 'fixed', 'important')
    cursor.style.setProperty('top', '0', 'important')
    cursor.style.setProperty('left', '0', 'important')
    cursor.style.setProperty('z-index', String(CURSOR_Z_INDEX), 'important')
    cursor.style.transform = OFFSCREEN_TRANSFORM
  }, [])

  useEffect(() => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute('data-custom-cursor', 'true')
    styleEl.textContent = `
      html, body, main, nav, header, footer, button, input, textarea, select, a, *::before, *::after, * {
        cursor: none !important;
      }
    `
    document.head.appendChild(styleEl)
    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])

  useEffect(() => {
    const handleAnyMove = (event) => {
      if ('clientX' in event && 'clientY' in event) {
        setCursorPosition(event.clientX, event.clientY)
      }
    }

    const handlePointerLeaveWindow = () => {
      hideCursor()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        hideCursor()
      }
    }

    const handleWindowFocus = () => {
      const restore = () => {
        const { x, y } = lastPositionRef.current
        if (typeof x === 'number' && typeof y === 'number') {
          setCursorPosition(x, y)
        } else {
          hideCursor()
        }
      }
      window.requestAnimationFrame(restore)
      setTimeout(restore, 0)
    }

    const doc = document
    const root = doc.documentElement

    const listenerOptions = { passive: true, capture: true }

    root.addEventListener('pointermove', handleAnyMove, listenerOptions)
    root.addEventListener('pointerenter', handleAnyMove, listenerOptions)
    doc.addEventListener('pointerover', handleAnyMove, listenerOptions)
    doc.addEventListener('mousemove', handleAnyMove, listenerOptions)
    doc.addEventListener('mouseover', handleAnyMove, listenerOptions)
    window.addEventListener('pointermove', handleAnyMove, listenerOptions)
    window.addEventListener('mousemove', handleAnyMove, listenerOptions)
    window.addEventListener('pointerenter', handleAnyMove, listenerOptions)
    window.addEventListener('mouseenter', handleAnyMove, listenerOptions)
    window.addEventListener('pointerleave', handlePointerLeaveWindow, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeaveWindow, { passive: true })
    window.addEventListener('blur', handlePointerLeaveWindow)
    window.addEventListener('focus', handleWindowFocus)
    doc.addEventListener('visibilitychange', handleVisibilityChange)

    hideCursor()

    return () => {
      root.removeEventListener('pointermove', handleAnyMove, listenerOptions)
      root.removeEventListener('pointerenter', handleAnyMove, listenerOptions)
      doc.removeEventListener('pointerover', handleAnyMove, listenerOptions)
      doc.removeEventListener('mousemove', handleAnyMove, listenerOptions)
      doc.removeEventListener('mouseover', handleAnyMove, listenerOptions)
      window.removeEventListener('pointermove', handleAnyMove, listenerOptions)
      window.removeEventListener('mousemove', handleAnyMove, listenerOptions)
      window.removeEventListener('pointerenter', handleAnyMove, listenerOptions)
      window.removeEventListener('mouseenter', handleAnyMove, listenerOptions)
      window.removeEventListener('pointerleave', handlePointerLeaveWindow)
      window.removeEventListener('mouseleave', handlePointerLeaveWindow)
      window.removeEventListener('blur', handlePointerLeaveWindow)
      window.removeEventListener('focus', handleWindowFocus)
      doc.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [hideCursor, setCursorPosition])

  return createPortal(
    <div ref={cursorRef} className="custom-cursor is-hidden" style={{ backgroundImage: `url(${cursorSprite})` }} />,
    document.body,
  )
}

export default CustomCursor

