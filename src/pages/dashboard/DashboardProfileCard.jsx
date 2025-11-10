import { Link } from 'react-router-dom'
import heroBg from '../../assets/herobg.jpg'
import avatarPixel from '../../assets/avatar-pixel-circle.svg'
import './DashboardProfileCard.css'
import { ICON_BADGE, ICON_SETTINGS, ICON_STREAK, ICON_TIMER } from './pixelIcons.js'

const QUICK_LINKS = [
  { label: 'Edit Loadout', to: '/profile', icon: ICON_SETTINGS },
  { label: 'Mission Log', to: '/profile#history', icon: ICON_TIMER },
  { label: 'Badge Case', to: '/profile#achievements', icon: ICON_BADGE },
]

function DashboardProfileCard() {
  return (
    <aside
      className="dashboard-profile-card"
      aria-label="Your profile summary"
      style={{
        '--profile-bg': `url(${heroBg})`,
      }}
    >
      <div className="dashboard-profile-card__header">
        <div className="dashboard-profile-card__avatar" aria-hidden="true">
          <img src={avatarPixel} alt="" />
          <span className="dashboard-profile-card__initials">EC</span>
        </div>
        <div className="dashboard-profile-card__identity">
          <span className="dashboard-profile-card__role">Cadet</span>
          <h2 className="dashboard-profile-card__name pixel-font">Elara Codewright</h2>
          <span className="dashboard-profile-card__level">Level 12 · 3,480 XP</span>
        </div>
      </div>

      <div className="dashboard-profile-card__progress" aria-label="Progress to next rank">
        <div className="dashboard-profile-card__progress-track">
          <div className="dashboard-profile-card__progress-fill" style={{ width: '72%' }}>
            <span className="dashboard-profile-card__progress-label">72%</span>
          </div>
        </div>
        <div className="dashboard-profile-card__progress-meta">
          <span>Next Rank: Nebula Navigator</span>
          <span>1,320 XP remaining</span>
        </div>
      </div>

      <ul className="dashboard-profile-card__stats">
        <li>
          <span className="dashboard-profile-card__stat-label">Current Rank</span>
          <span className="dashboard-profile-card__stat-value">Solar Debugger</span>
        </li>
        <li>
          <span className="dashboard-profile-card__stat-label">Crew Slot</span>
          <span className="dashboard-profile-card__stat-value">Voyager Squad · 02</span>
        </li>
        <li>
          <span className="dashboard-profile-card__stat-label">Streak</span>
          <span className="dashboard-profile-card__stat-value">
            <span
              className="dashboard-profile-card__stat-chip"
              aria-hidden="true"
              style={{ '--profile-icon': `url(${ICON_STREAK})` }}
            />
            7 days alive
          </span>
        </li>
      </ul>

      <div className="dashboard-profile-card__links" role="navigation" aria-label="Quick profile links">
        {QUICK_LINKS.map((link) => (
          <Link key={link.label} to={link.to} className="dashboard-profile-card__link">
            <span
              className="dashboard-profile-card__link-icon"
              aria-hidden="true"
              style={{ '--profile-icon': `url(${link.icon})` }}
            />
            {link.label}
          </Link>
        ))}
      </div>

      <Link to="/profile" className="dashboard-profile-card__cta">
        View Full Profile
      </Link>
    </aside>
  )
}

export default DashboardProfileCard
