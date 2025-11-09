import heroBg from '../../assets/herobg.png'
import './DashboardHero.css'

function DashboardHero() {
  return (
    <section className="dashboard-hero" aria-labelledby="dashboard-hero-title">
      <div className="dashboard-hero__frame" style={{ '--hero-background': `url(${heroBg})` }}>
        <div className="dashboard-hero__content">
          <span className="dashboard-hero__eyebrow">Mission Control</span>
          <h1 id="dashboard-hero-title" className="dashboard-hero__title pixel-font">
            Welcome to Cadet Hub
          </h1>
          <p className="dashboard-hero__subtitle">
            Blast off into bite-sized coding quests designed for curious cadets. Choose a mission, press launch, and
            learn by doing—one pixel at a time.
          </p>
          <div className="dashboard-hero__cta-group">
            <button type="button" className="dashboard-hero__cta-button dashboard-hero__cta-button--primary">
              Start Quest
            </button>
            <button type="button" className="dashboard-hero__cta-button dashboard-hero__cta-button--secondary">
              Browse Missions
            </button>
          </div>
          <p className="dashboard-hero__footnote">Tip: "Meteor Maze" awards double XP for the next 30 minutes.</p>
        </div>
      </div>
    </section>
  )
}

export default DashboardHero
