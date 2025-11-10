import './DashboardStatusStrip.css'
import { ICON_CREW, ICON_STAR, ICON_STREAK } from './pixelIcons.js'

const STATUS_ITEMS = [
  { label: 'Total XP', value: '12,740', icon: ICON_STAR },
  { label: 'Daily Streak', value: '7 days', icon: ICON_STREAK },
  { label: 'Crew Online', value: '6 cadets', icon: ICON_CREW },
]

function DashboardStatusStrip() {
  return (
    <section className="dashboard-status-strip" aria-label="Current progress stats">
      {STATUS_ITEMS.map((item) => (
        <div key={item.label} className="dashboard-status-strip__chip">
          <span
            className="dashboard-status-strip__icon"
            aria-hidden="true"
            style={{ '--status-icon': `url(${item.icon})` }}
          />
          <div className="dashboard-status-strip__text">
            <span className="dashboard-status-strip__label">{item.label}</span>
            <span className="dashboard-status-strip__value">{item.value}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default DashboardStatusStrip
