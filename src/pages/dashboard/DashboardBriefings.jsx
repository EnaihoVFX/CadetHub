import './DashboardBriefings.css'
import { ICON_NOTE, ICON_RADIO, ICON_BADGE } from './pixelIcons.js'

const BRIEFINGS = [
  {
    title: 'Launch Checklist',
    detail: 'Fuel lines cleared, drone bay synced, coding pods warmed.',
    icon: ICON_RADIO,
  },
  {
    title: 'Crew Ping',
    detail: 'Voyager Squad confirmed for 18:00 UTC practice session.',
    icon: ICON_BADGE,
  },
]

const NOTES = [
  {
    title: 'Patch 1.4',
    content: 'New shader puzzles live now. Expect tighter time limits.',
    icon: ICON_NOTE,
  },
  {
    title: 'Hangar Tip',
    content: 'Swap to the Retro HUD theme for clearer pixel grids.',
    icon: ICON_NOTE,
  },
]

function DashboardBriefings() {
  return (
    <aside className="dashboard-briefings" aria-labelledby="dashboard-briefings-title">
      <header className="dashboard-briefings__header">
        <span className="dashboard-briefings__eyebrow">Ops Center</span>
        <h2 id="dashboard-briefings-title" className="dashboard-briefings__title pixel-font">
          Briefings
        </h2>
      </header>

      <section aria-label="Upcoming checks" className="dashboard-briefings__section">
        <h3 className="dashboard-briefings__section-title">Check-ins</h3>
        <ul>
          {BRIEFINGS.map((brief) => (
            <li key={brief.title}>
              <span
                className="dashboard-briefings__icon"
                aria-hidden="true"
                style={{ '--briefing-icon': `url(${brief.icon})` }}
              />
              <div>
                <span className="dashboard-briefings__label">{brief.title}</span>
                <p className="dashboard-briefings__detail">{brief.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Notes and updates" className="dashboard-briefings__section">
        <h3 className="dashboard-briefings__section-title">Notes</h3>
        <ul>
          {NOTES.map((note) => (
            <li key={note.title}>
              <span
                className="dashboard-briefings__icon"
                aria-hidden="true"
                style={{ '--briefing-icon': `url(${note.icon})` }}
              />
              <div>
                <span className="dashboard-briefings__label">{note.title}</span>
                <p className="dashboard-briefings__detail">{note.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default DashboardBriefings







