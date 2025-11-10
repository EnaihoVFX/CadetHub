import './DashboardMissionGrid.css'
import { ICON_MISSION, ICON_TERMINAL, ICON_PUZZLE, ICON_TIMER } from './pixelIcons.js'

const MISSIONS = [
  {
    title: 'Signal Sync',
    summary: 'Calibrate the comm relay and patch a jittery stream.',
    duration: '10 min',
    status: 'Ready',
    icon: ICON_MISSION,
  },
  {
    title: 'Debug Drift',
    summary: 'Hunt down a looping thruster script in the hangar bot.',
    duration: '15 min',
    status: 'In Progress',
    icon: ICON_TERMINAL,
  },
  {
    title: 'Puzzle Pods',
    summary: 'Solve three logic pods to unlock the cargo vault.',
    duration: '20 min',
    status: 'Co-op',
    icon: ICON_PUZZLE,
  },
]

const BOOSTS = [
  {
    label: 'Daily Boost',
    detail: 'Complete any quest in under 12 minutes for +25% XP.',
    icon: ICON_TIMER,
  },
]

function DashboardMissionGrid() {
  return (
    <section className="dashboard-mission-grid" aria-labelledby="dashboard-mission-grid-title">
      <header className="dashboard-mission-grid__header">
        <span className="dashboard-mission-grid__eyebrow">Mission Board</span>
        <h2 id="dashboard-mission-grid-title" className="dashboard-mission-grid__title pixel-font">
          Featured Quests
        </h2>
      </header>

      <div className="dashboard-mission-grid__cards" role="list">
        {MISSIONS.map((mission) => (
          <article key={mission.title} className="dashboard-mission-grid__card" role="listitem">
            <span
              className="dashboard-mission-grid__card-icon"
              aria-hidden="true"
              style={{ '--mission-icon': `url(${mission.icon})` }}
            />
            <div className="dashboard-mission-grid__card-body">
              <h3 className="dashboard-mission-grid__card-title pixel-font">{mission.title}</h3>
              <p className="dashboard-mission-grid__card-summary">{mission.summary}</p>
            </div>
            <footer className="dashboard-mission-grid__card-meta">
              <span className="dashboard-mission-grid__chip">{mission.duration}</span>
              <span className="dashboard-mission-grid__chip dashboard-mission-grid__chip--status">
                {mission.status}
              </span>
            </footer>
            <button type="button" className="dashboard-mission-grid__cta">
              Launch
            </button>
          </article>
        ))}
      </div>

      <ul className="dashboard-mission-grid__extras">
        {BOOSTS.map((boost) => (
          <li key={boost.label}>
            <span
              className="dashboard-mission-grid__extra-icon"
              aria-hidden="true"
              style={{ '--mission-icon': `url(${boost.icon})` }}
            />
            <div>
              <span className="dashboard-mission-grid__extra-label">{boost.label}</span>
              <p className="dashboard-mission-grid__extra-detail">{boost.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DashboardMissionGrid






