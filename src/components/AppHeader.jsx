import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import avatarPixel from '../assets/avatar-pixel-circle.svg'

const headerStyles = `
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #040716;
  border-bottom: 1px solid rgba(120, 160, 255, 0.3);
}

.app-header__inner {
  max-width: 1360px;
  margin: 0 auto;
  padding: 18px clamp(16px, 5vw, 36px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.app-header__left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 0;
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 12px;
  background: transparent;
  border: none;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.app-header__logo {
  display: block;
  height: clamp(42px, 6vw, 56px);
  width: auto;
  image-rendering: auto;
  filter: none;
}

.app-header__brand:hover {
  transform: translateY(-1px);
}

.app-header__nav {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding: 8px 22px;
  border-radius: 999px;
  background: rgba(7, 12, 30, 0.7);
  box-shadow:
    inset 0 0 0 1px rgba(98, 127, 255, 0.26),
    0 12px 22px rgba(7, 12, 28, 0.48);
}

.app-header__nav::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border-top: 1px solid rgba(148, 180, 255, 0.24);
  border-left: 1px solid rgba(148, 180, 255, 0.16);
  border-right: 1px solid rgba(22, 32, 72, 0.55);
  border-bottom: 1px solid rgba(9, 14, 32, 0.95);
  pointer-events: none;
}

.app-header__link {
  color: #e3e8ff;
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.app-header__link:hover {
  opacity: 0.85;
  color: #f9fbff;
}

.app-header__link::after {
  content: '▾';
  font-size: 0.6rem;
  opacity: 0.6;
  transform: translateY(-1px);
}

.app-header__link--solo::after {
  display: none;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header__icon {
  --pixel-size: 4px;
  --icon-color: #ffffff;
  position: relative;
  width: calc(var(--pixel-size) * 7);
  height: calc(var(--pixel-size) * 8);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  filter: drop-shadow(0 0 6px rgba(120, 160, 255, 0.25));
}

.app-header__icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--pixel-size);
  height: var(--pixel-size);
  background: transparent;
}

.app-header__icon:focus-visible {
  outline: 2px dashed rgba(255, 255, 255, 0.5);
  outline-offset: 4px;
}

.app-header__icon:hover {
  filter: drop-shadow(0 0 8px rgba(120, 160, 255, 0.45));
}

.app-header__icon--search,
.app-header__icon--search::before {
  width: 24px;
  height: 24px;
}

.app-header__icon--search::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M22 22H20V20H22V22ZM20 20H18V18H20V20ZM14 18H6V16H14V18ZM18 18H16V16H18V18ZM6 16H4V14H6V16ZM16 16H14V14H16V16ZM4 14H2V6H4V14ZM18 14H16V6H18V14ZM6 6H4V4H6V6ZM16 6H14V4H16V6ZM14 4H6V2H14V4Z' fill='%2364748B'/%3E%3C/svg%3E")
    center / contain no-repeat;
}

.app-header__icon--bell {
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 6px rgba(120, 160, 255, 0.25));
}

.app-header__icon--bell::before {
  width: 24px;
  height: 24px;
}

.app-header__icon--bell::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 4V2H9.99999V4H5.00018V6H19.0002V4H14ZM18.9999 16H4.99994V12H2.99994V16V18L7.99975 18V22H9.99975V18H13.9998V20H10V22H13.9998V22H15.9998V18L20.9999 18V16L21 12H19V6H17V14H18.9999V16ZM5.00018 6V14H7.00018V6H5.00018Z' fill='%2394A3B8'/%3E%3C/svg%3E")
    center / 100% 100% no-repeat;
}

.app-header__avatar {
  flex-shrink: 0;
  position: relative;
  display: inline-grid;
  place-items: center;
  text-decoration: none;
}

.app-header__avatar img {
  display: block;
  width: 40px;
  height: 40px;
  image-rendering: pixelated;
}

.app-header__avatar span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.45rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fafcff;
  text-shadow: 0 1px 0 rgba(18, 22, 54, 0.7);
}

.app-header__cta {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  padding: 12px 24px;
  border: 6px solid transparent;
  border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%232A1502' d='M0 0h8v8H0zm1 1v6h6V1H1z'/%3E%3C/svg%3E") 3 stretch;
  border-radius: 0;
  background:
    linear-gradient(145deg, #f3cc4c 0%, #f2b03d 55%, #c97520 100%);
  color: #2a1502;
  box-shadow:
    0 6px 0 rgba(109, 52, 6, 0.65);
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.app-header__cta:hover {
  transform: translateY(-1px);
  box-shadow:
    0 8px 0 rgba(109, 52, 6, 0.7);
}

.app-header__cta:active {
  transform: translateY(0);
  box-shadow:
    0 4px 0 rgba(109, 52, 6, 0.8);
}
`

function AppHeader() {
  return (
    <>
      <style>{headerStyles}</style>
      <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__left">
          <Link to="/" className="app-header__brand" aria-label="Code Cadets home">
            <img src={logoImg} alt="Cadet Hub logo" className="app-header__logo" />
          </Link>
        </div>
        <div className="app-header__actions">
          <button className="app-header__icon app-header__icon--search" type="button" aria-label="Search" />
          <button className="app-header__icon app-header__icon--bell" type="button" aria-label="Notifications" />
          <Link to="/profile" className="app-header__avatar" aria-label="View profile">
            <img src={avatarPixel} alt="" aria-hidden="true" />
            <span>EC</span>
          </Link>
          <Link to="/dashboard" className="app-header__cta">
            Dashboard
          </Link>
        </div>
      </div>
    </header>
    </>
  )
}

export default AppHeader