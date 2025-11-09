import { Link } from 'react-router-dom'
import avatarPixel from '../../assets/avatar-pixel-circle.svg'
import './DashboardProfileCard.css'

const QUICK_LINKS = [
  { label: 'Edit Loadout', to: '/profile' },
  { label: 'Mission History', to: '/profile#history' },
  { label: 'Achievements', to: '/profile#achievements' },
]

function DashboardProfileCard() {
  return (
    <aside className="dashboard-profile-card" aria-label="Your profile summary">
      <div className="dashboard-profile-card__header">
        <div className="dashboard-profile-card__avatar" aria-hidden="true">
          <img src={avatarPixel} alt="" />
          <span className="dashboard-profile-card__initials">EC</span>
        </div>
        <div className="dashboard-profile-card__identity">
          <span className="dashboard-profile-card__role">Cadet</span>
          <h2 className="dashboard-profile-card__name">Elara Codewright</h2>
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
          <span>1,320 XP to go</span>
        </div>
      </div>

      <ul className="dashboard-profile-card__stats">
        <li>
          <span className="dashboard-profile-card__stat-label">Current Rank</span>
          <span className="dashboard-profile-card__stat-value">Solar Debugger</span>
        </li>
        <li>
          <span className="dashboard-profile-card__stat-label">Crew Assignment</span>
          <span className="dashboard-profile-card__stat-value">Voyager Squad · Slot 02</span>
        </li>
        <li>
          <span className="dashboard-profile-card__stat-label">Galaxy Pass</span>
          <span className="dashboard-profile-card__stat-value">Active · 12 days left</span>
        </li>
      </ul>

      <div className="dashboard-profile-card__links">
        {QUICK_LINKS.map((link) => (
          <Link key={link.label} to={link.to} className="dashboard-profile-card__link">
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
