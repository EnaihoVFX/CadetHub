import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ICON_STAR,
  ICON_TIMER,
  ICON_MISSION,
  ICON_BADGE,
  ICON_PUZZLE,
  ICON_TERMINAL,
  ICON_BADGE_TARGET,
  ICON_BADGE_BLOCKS,
  ICON_BADGE_LIGHTNING,
  ICON_BADGE_CONTROLLER,
  ICON_BADGE_FILM,
  ICON_BADGE_SOUND,
  ICON_BADGE_CAT,
  ICON_BADGE_CODE,
} from './dashboard/pixelIcons.js'
import tutorial1Scratch from '../assets/tutorial1-scratch.png'
import './QuestDetail.css'

// All quests data
const ALL_QUESTS = {
  1: { 
    id: 1, 
    title: 'Tutorial Lesson One', 
    difficulty: 'EASY', 
    xp: '+15 XP', 
    language: 'Scratch',
    icon: ICON_TERMINAL, 
    color: '#6FE4FF', 
    description: 'Learn the basics of Scratch blocks',
    fullDescription: 'In this tutorial, you\'ll learn the fundamental building blocks of Scratch programming. Master how to use motion blocks, looks blocks, and event blocks to bring your sprites to life.',
    duration: '15 min',
    steps: 5,
    headerImage: tutorial1Scratch,
    badges: [
      { name: 'First Steps', icon: ICON_BADGE_TARGET, color: '#6FE4FF' },
      { name: 'Block Master', icon: ICON_BADGE_BLOCKS, color: '#94B1FF' }
    ],
    preview: {
      image: '',
      video: 'https://turbowarp.org/1240428407/embed?autoplay'
    }
  },
  2: { 
    id: 2, 
    title: 'Tutorial Lesson Two', 
    difficulty: 'EASY', 
    xp: '+20 XP', 
    language: 'Scratch',
    icon: ICON_TERMINAL, 
    color: '#6FE4FF', 
    description: 'Master sprite movement and control',
    fullDescription: 'Take your Scratch skills to the next level by learning advanced sprite control techniques. You\'ll explore coordinate systems, smooth animations, and interactive controls.',
    duration: '20 min',
    steps: 7,
    badges: [
      { name: 'Motion Pro', icon: ICON_BADGE_LIGHTNING, color: '#F3CC4C' },
      { name: 'Controller', icon: ICON_BADGE_CONTROLLER, color: '#FF7EA8' }
    ],
    preview: {
      image: '',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  3: { 
    id: 3, 
    title: 'Cat Animation', 
    difficulty: 'EASY', 
    xp: '+30 XP', 
    language: 'Scratch',
    icon: ICON_PUZZLE, 
    color: '#F6A55D', 
    description: 'Make the cat sprite move and meow',
    fullDescription: 'Create your first animated character! Program the Scratch cat to walk, jump, and make sounds. You\'ll learn about costume switching, sound effects, and timing.',
    duration: '25 min',
    steps: 8,
    badges: [
      { name: 'Animator', icon: ICON_BADGE_FILM, color: '#F6A55D' },
      { name: 'Sound Designer', icon: ICON_BADGE_SOUND, color: '#94B1FF' },
      { name: 'Cat Whisperer', icon: ICON_BADGE_CAT, color: '#FF7EA8' }
    ],
    preview: {
      image: '',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
}

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

const badgeVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
}

function QuestDetail() {
  const { questId } = useParams()
  const navigate = useNavigate()
  const quest = ALL_QUESTS[questId]

  if (!quest) {
    return (
      <div className="quest-detail-error">
        <h1>Quest Not Found</h1>
        <button onClick={() => navigate('/quest')}>Back to Quests</button>
      </div>
    )
  }

  return (
    <motion.div
      className="quest-detail-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="quest-detail-hero">
        <div className="quest-detail-hero__fx" aria-hidden="true" />
        
        <div className="quest-detail-hero__content">
          {/* Back Button */}
          <button className="quest-back-btn pixel-font" onClick={() => navigate('/quest')}>
            ← BACK TO QUESTS
          </button>

          {/* Quest Header */}
          <div className="quest-detail-header">
            <div className="quest-detail-header__top">
              <div className="quest-detail-header__image-wrapper">
                <img 
                  src={quest.headerImage || ''} 
                  alt="Quest preview" 
                  className="quest-detail-header__image"
                  onError={(e) => { e.target.style.opacity = '0.3' }}
                />
              </div>
              <div className="quest-detail-header__info">
                <h1 className="quest-detail-header__title pixel-font">{quest.title}</h1>
                <p className="quest-detail-header__subtitle">{quest.fullDescription}</p>
              </div>
            </div>
            <div className="quest-detail-stats">
              <div className="quest-detail-stat">
                <span className="quest-detail-stat__icon">
                  <img src={ICON_TIMER} alt="" />
                </span>
                <div className="quest-detail-stat__content">
                  <span className="quest-detail-stat__value">{quest.duration}</span>
                  <span className="quest-detail-stat__label">Duration</span>
                </div>
              </div>
              <div className="quest-detail-stat">
                <span className="quest-detail-stat__icon">
                  <img src={ICON_MISSION} alt="" />
                </span>
                <div className="quest-detail-stat__content">
                  <span className="quest-detail-stat__value">{quest.steps}</span>
                  <span className="quest-detail-stat__label">Steps</span>
                </div>
              </div>
              <div className={`quest-detail-stat quest-detail-stat--compact quest-detail-stat--${quest.difficulty.toLowerCase()}`}>
                {quest.difficulty}
              </div>
              <div className="quest-detail-stat quest-detail-stat--compact">
                <span className="quest-detail-xp">{quest.xp}</span>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="quest-detail-preview-section">
            <h2 className="quest-detail-section-title pixel-font">Preview</h2>
            
            <div className="quest-preview-card">
              {quest.preview.image && (
                <div className="quest-preview-image">
                  <img src={quest.preview.image} alt="" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
              )}
              {quest.preview.video && (
                <div className="quest-preview-video">
                  <iframe
                    src={quest.preview.video}
                    title={`${quest.title} video preview`}
                    frameBorder="0"
                    scrolling="no"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    allowTransparency="true"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Start Quest Button - Overlay */}
          <div className="quest-start-overlay">
            <button className="quest-start-btn pixel-font">
              START QUEST
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default QuestDetail
