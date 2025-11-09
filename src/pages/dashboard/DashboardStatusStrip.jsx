import './DashboardStatusStrip.css'

const STATUS_ITEMS = [
  { label: 'Total XP', value: '12,740', icon: '★' },
  { label: 'Daily Streak', value: '7 days', icon: '🔥' },
  { label: 'Crew Online', value: '6 cadets', icon: '👥' },
]

function DashboardStatusStrip() {
  return (
    <section className="dashboard-status-strip" aria-label="Current progress stats">
      {STATUS_ITEMS.map((item) => (
        <div key={item.label} className="dashboard-status-strip__chip">
          <span className="dashboard-status-strip__icon" aria-hidden="true">
            {item.icon}
          </span>
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
