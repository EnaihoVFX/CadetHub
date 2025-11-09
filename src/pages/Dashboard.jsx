import './dashboard/DashboardPage.css'
import DashboardHero from './dashboard/DashboardHero.jsx'
import DashboardProfileCard from './dashboard/DashboardProfileCard.jsx'
import DashboardStatusStrip from './dashboard/DashboardStatusStrip.jsx'

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-main">
        <DashboardHero />
        <DashboardProfileCard />
      </div>

      <DashboardStatusStrip />
    </div>
  )
}

export default Dashboard
