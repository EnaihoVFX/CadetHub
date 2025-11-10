import './dashboard/DashboardPage.css'
import DashboardHero from './dashboard/DashboardHero.jsx'

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-layout" role="presentation">
        <DashboardHero />
      </div>
    </div>
  )
}

export default Dashboard
