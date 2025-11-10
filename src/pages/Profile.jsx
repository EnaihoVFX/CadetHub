import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ICON_STAR,
  ICON_TIMER,
  ICON_MISSION,
  ICON_BADGE,
  ICON_BADGE_TARGET,
  ICON_BADGE_BLOCKS,
  ICON_BADGE_LIGHTNING,
  ICON_BADGE_CONTROLLER,
  ICON_BADGE_FILM,
  ICON_BADGE_SOUND,
  ICON_BADGE_CAT,
  ICON_BADGE_CODE,
} from './dashboard/pixelIcons.js'
import FullBodyAvatar from '../components/FullBodyAvatar.jsx'
import { useAvatar } from '../context/AvatarContext.jsx'
import './Profile.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  },
}

const USER_DATA = {
  username: 'CodeCadet42',
  email: 'cadet@codecadets.com',
  joinDate: 'January 2024',
  level: 12,
  currentXP: 2450,
  nextLevelXP: 3000,
}

const STATS = [
  { label: 'Total XP', value: '2,450', icon: ICON_STAR, color: '#ffd700' },
  { label: 'Quests Done', value: '24', icon: ICON_MISSION, color: '#6fe4ff' },
  { label: 'Badges', value: '8', icon: ICON_BADGE, color: '#ff7ea8' },
  { label: 'Day Streak', value: '7', icon: ICON_TIMER, color: '#f3cc4c' },
]

const BADGES = [
  { name: 'First Steps', icon: ICON_BADGE_TARGET, color: '#6FE4FF', earned: true },
  { name: 'Block Master', icon: ICON_BADGE_BLOCKS, color: '#94B1FF', earned: true },
  { name: 'Motion Pro', icon: ICON_BADGE_LIGHTNING, color: '#F3CC4C', earned: true },
  { name: 'Controller', icon: ICON_BADGE_CONTROLLER, color: '#FF7EA8', earned: true },
  { name: 'Animator', icon: ICON_BADGE_FILM, color: '#F6A55D', earned: true },
  { name: 'Sound Designer', icon: ICON_BADGE_SOUND, color: '#94B1FF', earned: true },
  { name: 'Cat Whisperer', icon: ICON_BADGE_CAT, color: '#FF7EA8', earned: false },
  { name: 'Code Ninja', icon: ICON_BADGE_CODE, color: '#6FE4FF', earned: false },
]

function Profile() {
  const navigate = useNavigate()
  const { equipped, coinBalance } = useAvatar()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(USER_DATA.username)
  const [email, setEmail] = useState(USER_DATA.email)

  const xpPercentage = (USER_DATA.currentXP / USER_DATA.nextLevelXP) * 100

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <motion.div
      className="profile-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="profile-container">
        {/* Profile Header Card */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FullBodyAvatar equipped={equipped} size="lg" className="profile-avatar-figure" />
            <button
              type="button"
              className="profile-avatar-edit pixel-font"
              onClick={() => navigate('/profile/avatar')}
            >
              CUSTOMIZE AVATAR
            </button>
          </div>
          
          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1 className="profile-username pixel-font">{username}</h1>
                <p className="profile-email">{email}</p>
                <p className="profile-join-date">Joined {USER_DATA.joinDate}</p>
                <div className="profile-coins">
                  <span className="profile-coins__label">Coins</span>
                  <span className="profile-coins__value pixel-font">{coinBalance.toLocaleString()}</span>
                </div>
              </>
            ) : (
              <div className="profile-edit-form">
                <div className="form-group">
                  <label className="pixel-font">USERNAME</label>
                  <input
                    type="text"
                    className="pixel-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="pixel-font">EMAIL</label>
                  <input
                    type="email"
                    className="pixel-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="profile-edit-btn pixel-font"
                onClick={() => setIsEditing(true)}
              >
                EDIT
              </button>
            ) : (
              <div className="profile-edit-actions">
                <button 
                  className="profile-save-btn pixel-font"
                  onClick={handleSave}
                >
                  SAVE
                </button>
                <button 
                  className="profile-cancel-btn pixel-font"
                  onClick={() => {
                    setIsEditing(false)
                    setUsername(USER_DATA.username)
                    setEmail(USER_DATA.email)
                  }}
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Level Progress */}
        <div className="profile-level-card">
          <div className="profile-level-header">
            <span className="profile-level-label pixel-font">LEVEL {USER_DATA.level}</span>
            <span className="profile-level-xp">{USER_DATA.currentXP} / {USER_DATA.nextLevelXP} XP</span>
          </div>
          <div className="profile-level-bar">
            <div 
              className="profile-level-fill" 
              style={{ '--progress': `${xpPercentage}%` }}
            />
          </div>
          <p className="profile-level-next">
            {USER_DATA.nextLevelXP - USER_DATA.currentXP} XP to Level {USER_DATA.level + 1}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats-grid">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="profile-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div 
                className="profile-stat-icon"
                style={{ '--icon-color': stat.color }}
              >
                <img src={stat.icon} alt="" />
              </div>
              <div className="profile-stat-content">
                <span className="profile-stat-value pixel-font">{stat.value}</span>
                <span className="profile-stat-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="profile-badges-section">
          <h2 className="profile-section-title pixel-font">BADGES</h2>
          <div className="profile-badges-grid">
            {BADGES.map((badge, index) => (
              <motion.div
                key={badge.name}
                className={`profile-badge ${!badge.earned ? 'profile-badge--locked' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                title={badge.name}
              >
                <div 
                  className="profile-badge-icon"
                  style={{ '--badge-color': badge.color }}
                >
                  <img src={badge.icon} alt={badge.name} />
                </div>
                <span className="profile-badge-name">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="profile-activity-section">
          <h2 className="profile-section-title pixel-font">RECENT ACTIVITY</h2>
          <div className="profile-activity-list">
            <div className="profile-activity-item">
              <div className="profile-activity-icon">🎯</div>
              <div className="profile-activity-content">
                <p className="profile-activity-title">Completed "Tutorial Lesson Two"</p>
                <p className="profile-activity-time">2 hours ago</p>
              </div>
              <span className="profile-activity-xp">+20 XP</span>
            </div>
            
            <div className="profile-activity-item">
              <div className="profile-activity-icon">⭐</div>
              <div className="profile-activity-content">
                <p className="profile-activity-title">Earned "Sound Designer" Badge</p>
                <p className="profile-activity-time">1 day ago</p>
              </div>
            </div>
            
            <div className="profile-activity-item">
              <div className="profile-activity-icon">🚀</div>
              <div className="profile-activity-content">
                <p className="profile-activity-title">Completed "Cat Animation"</p>
                <p className="profile-activity-time">2 days ago</p>
              </div>
              <span className="profile-activity-xp">+30 XP</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
