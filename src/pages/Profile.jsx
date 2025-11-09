import './Profile.css'

function Profile() {
  return (
    <div className="profile-page">
      <section className="profile-card">
        <div className="profile-card__avatar" aria-hidden="true">
          <span className="profile-card__initials">EC</span>
        </div>
        <div className="profile-card__content">
          <h1 className="profile-card__title">Cadet Profile</h1>
          <p className="profile-card__subtitle">Customise your cadet identity and track your stellar stats.</p>
        </div>
      </section>
    </div>
  )
}

export default Profile

