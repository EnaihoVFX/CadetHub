import { useNavigate } from 'react-router-dom'
import heroBg from '../../assets/herobg.jpg'
import './DashboardHero.css'
import {
  ICON_CREW,
  ICON_STAR,
  ICON_TIMER,
  ICON_PUZZLE,
  ICON_MISSION,
  ICON_BADGE,
  ICON_STREAK,
} from './pixelIcons.js'
import FullBodyAvatar from '../../components/FullBodyAvatar.jsx'
import { useAvatar } from '../../context/AvatarContext.jsx'

const HERO_BADGES = [
  { label: 'Boost Active', detail: 'Meteor Maze grants +2x XP for 30 min.', icon: ICON_TIMER },
  { label: 'Crew Online', detail: 'Voyager Squad: 6 cadets in the bay.', icon: ICON_CREW },
  { label: 'Next Unlock', detail: 'Nebula Navigator title at 1,320 XP.', icon: ICON_STAR },
]

const HERO_STATS = [
  { label: 'Streak', value: '7 days', icon: ICON_TIMER },
  { label: 'Missions', value: '24', icon: ICON_STAR },
  { label: 'Crew', value: '6', icon: ICON_CREW },
]

const HERO_PROGRESS = {
  label: 'Next Objective',
  valuePercent: 62,
  caption: 'Nebula Navigator title at 1,320 XP',
}

const PROFILE_BADGES = [
  { label: 'Nav', icon: ICON_BADGE, color: '#F6A55D' },
  { label: 'Puzzle', icon: ICON_PUZZLE, color: '#FF7EA8' },
  { label: 'Lead', icon: ICON_MISSION, color: '#6FE4FF' },
  { label: 'Streak', icon: ICON_STREAK, color: '#94B1FF' },
]

function DashboardHero() {
  const navigate = useNavigate()
  const { equipped, coinBalance } = useAvatar()

  const handleLaunchQuest = () => {
    navigate('/quest')
  }

  const handleViewProfile = () => {
    navigate('/profile')
  }

  return (
    <div className="dashboard-hero-row">
      <section
        className="dashboard-hero"
        aria-labelledby="dashboard-hero-title"
        style={{
          '--hero-bg': `url(${heroBg})`,
        }}
      >
        <div className="dashboard-hero__fx" aria-hidden="true" />
        <div className="dashboard-hero__content">
          <span className="dashboard-hero__eyebrow">Mission Console</span>
          <h1 id="dashboard-hero-title" className="dashboard-hero__title pixel-font">
            Cadet Hub
          </h1>
          <p className="dashboard-hero__subtitle">Pick a quest, sync your crew, and launch when the pixels line up.</p>
          <div className="dashboard-hero__cta-group" role="group">
            <button 
              type="button" 
              className="dashboard-hero__cta-button dashboard-hero__cta-button--primary"
              onClick={handleLaunchQuest}
            >
              Launch Quest
            </button>
            <button type="button" className="dashboard-hero__cta-button dashboard-hero__cta-button--secondary">
              Open Hangar
            </button>
          </div>
          <ul className="dashboard-hero__stats" aria-label="Status">
            {HERO_STATS.map((s) => (
              <li key={s.label} className="dashboard-hero__stat">
                <span className="dashboard-hero__stat-icon" aria-hidden="true">
                  <img src={s.icon} alt="" />
                </span>
                <div className="dashboard-hero__stat-copy">
                  <span className="dashboard-hero__stat-value">{s.value}</span>
                  <span className="dashboard-hero__stat-label">{s.label}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="dashboard-hero__progress" role="group" aria-label="Next objective progress">
            <div className="dashboard-hero__progress-header">
              <span className="dashboard-hero__progress-label">{HERO_PROGRESS.label}</span>
              <span className="dashboard-hero__progress-value">{HERO_PROGRESS.valuePercent}%</span>
            </div>
            <div className="dashboard-hero__progress-track">
              <div
                className="dashboard-hero__progress-fill"
                style={{ '--progress': `${HERO_PROGRESS.valuePercent}%` }}
              />
            </div>
            <div className="dashboard-hero__progress-caption">{HERO_PROGRESS.caption}</div>
          </div>
          <ul className="dashboard-hero__badges">
            {HERO_BADGES.map((badge) => (
              <li key={badge.label} className="pixel-badge">
                <span className="dashboard-hero__badge-icon" aria-hidden="true">
                  <img src={badge.icon} alt="" />
                </span>
                <div className="dashboard-hero__badge-copy">
                  <span className="dashboard-hero__badge-label">{badge.label}</span>
                  <p className="dashboard-hero__badge-detail">{badge.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <aside className="dashboard-hero__aside" aria-label="Profile">
        <div className="dashboard-hero__aside-inner">
          <div className="retro-profile">
            <div className="retro-profile__header">
              <div className="retro-profile__avatar-frame">
                <FullBodyAvatar equipped={equipped} size="sm" />
              </div>
              <div className="retro-profile__info">
                <h3 className="retro-profile__name pixel-font">CADET_NOVA</h3>
                <div className="retro-profile__rank pixel-font">LVL 12 • NAVIGATOR</div>
              </div>
            </div>
            <div className="retro-profile__divider" aria-hidden="true" />
            <div className="retro-profile__stats">
              <div className="retro-stat">
                <img src={ICON_STAR} alt="" aria-hidden="true" />
                <span className="retro-stat__value pixel-font">1,204</span>
                <span className="retro-stat__label">XP</span>
              </div>
              <div className="retro-stat">
                <img src={ICON_STREAK} alt="" aria-hidden="true" />
                <span className="retro-stat__value pixel-font">7</span>
                <span className="retro-stat__label">STREAK</span>
              </div>
              <div className="retro-stat">
                <img src={ICON_MISSION} alt="" aria-hidden="true" />
                <span className="retro-stat__value pixel-font">24</span>
                <span className="retro-stat__label">QUEST</span>
              </div>
            </div>
            <div className="retro-profile__divider" aria-hidden="true" />
            <div className="retro-profile__badges">
              <div className="retro-badges-label pixel-font">EARNED BADGES</div>
              <div className="retro-badges-grid">
                {PROFILE_BADGES.map((b, i) => (
                  <button
                    key={b.label}
                    type="button"
                    className="retro-badge"
                    style={{ 
                      '--badge-color': b.color,
                      '--badge-delay': `${i * 0.08}s`
                    }}
                    aria-label={b.label}
                  >
                    <img src={b.icon} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className="retro-profile__divider" aria-hidden="true" />
            <div className="retro-profile__actions">
              <button 
                type="button" 
                className="retro-btn retro-btn--cyan"
                onClick={handleViewProfile}
              >
                <span className="pixel-font">VIEW_PROFILE</span>
              </button>
              <button type="button" className="retro-btn retro-btn--amber">
                <span className="pixel-font">SHARE</span>
              </button>
              <div className="retro-profile__coins">
                <span className="retro-profile__coins-label">Coins</span>
                <span className="retro-profile__coins-value pixel-font">{coinBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default DashboardHero
