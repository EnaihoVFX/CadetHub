import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ICON_STAR,
  ICON_TIMER,
  ICON_MISSION,
  ICON_BADGE,
  ICON_PUZZLE,
  ICON_TERMINAL,
} from './dashboard/pixelIcons.js'
import questBg from '../assets/orig.png'
import './Quest.css'

const QUEST_STATS = [
  { label: 'Active', value: '3', icon: ICON_MISSION },
  { label: 'Completed', value: '24', icon: ICON_STAR },
  { label: 'Time Left', value: '2h 15m', icon: ICON_TIMER },
]

const QUESTS_DATA = {
  scratch: [
    { id: 1, title: 'Tutorial Lesson One', difficulty: 'EASY', xp: '+15 XP', emoji: '📖', color: '#6FE4FF', description: 'Learn the basics of Scratch blocks', progress: 80 },
    { id: 2, title: 'Tutorial Lesson Two', difficulty: 'EASY', xp: '+20 XP', emoji: '🎯', color: '#6FE4FF', description: 'Master sprite movement and control', progress: 60 },
    { id: 3, title: 'Cat Animation', difficulty: 'EASY', xp: '+30 XP', emoji: '🐈', color: '#F6A55D', description: 'Make the cat sprite move and meow', progress: 40 },
    { id: 4, title: 'Maze Game', difficulty: 'EASY', xp: '+40 XP', emoji: '🧩', color: '#94B1FF', description: 'Create a simple maze navigation game', progress: 0 },
    { id: 5, title: 'Story Time', difficulty: 'EASY', xp: '+35 XP', emoji: '📝', color: '#FF7EA8', description: 'Build an interactive story with choices', progress: 0 },
    { id: 6, title: 'Pong Classic', difficulty: 'MEDIUM', xp: '+80 XP', emoji: '⚡', color: '#6FE4FF', description: 'Recreate the classic Pong game', progress: 25 },
    { id: 7, title: 'Music Maker', difficulty: 'MEDIUM', xp: '+75 XP', emoji: '🎹', color: '#F3CC4C', description: 'Design your own music sequencer', progress: 0 },
    { id: 8, title: 'Platform Hero', difficulty: 'HARD', xp: '+150 XP', emoji: '🚀', color: '#FF8243', description: 'Create a platformer with physics', progress: 0 },
  ],
  python: [
    { id: 9, title: 'Tutorial Lesson One', difficulty: 'EASY', xp: '+15 XP', emoji: '📖', color: '#6FE4FF', description: 'Introduction to Python syntax', progress: 100 },
    { id: 10, title: 'Tutorial Lesson Two', difficulty: 'EASY', xp: '+20 XP', emoji: '🎯', color: '#6FE4FF', description: 'Variables and data types basics', progress: 75 },
    { id: 11, title: 'Hello World', difficulty: 'EASY', xp: '+25 XP', emoji: '🐍', color: '#6FE4FF', description: 'Your first Python program', progress: 50 },
    { id: 12, title: 'Calculator Pro', difficulty: 'EASY', xp: '+45 XP', emoji: '🔢', color: '#F6A55D', description: 'Build a basic calculator', progress: 30 },
    { id: 13, title: 'Number Guesser', difficulty: 'EASY', xp: '+40 XP', emoji: '🎲', color: '#94B1FF', description: 'Create a guessing game', progress: 0 },
    { id: 14, title: 'List Master', difficulty: 'MEDIUM', xp: '+70 XP', emoji: '📊', color: '#FF7EA8', description: 'Master Python lists and loops', progress: 15 },
    { id: 15, title: 'File Handler', difficulty: 'MEDIUM', xp: '+85 XP', emoji: '💾', color: '#F3CC4C', description: 'Work with files and data', progress: 0 },
    { id: 16, title: 'Web Scraper', difficulty: 'HARD', xp: '+180 XP', emoji: '🌐', color: '#FF8243', description: 'Build a web scraping tool', progress: 0 },
  ],
  html: [
    { id: 17, title: 'Tutorial Lesson One', difficulty: 'EASY', xp: '+15 XP', emoji: '📖', color: '#6FE4FF', description: 'HTML structure and basic tags', progress: 90 },
    { id: 18, title: 'Tutorial Lesson Two', difficulty: 'EASY', xp: '+20 XP', emoji: '🎯', color: '#6FE4FF', description: 'CSS basics and styling elements', progress: 65 },
    { id: 19, title: 'My First Page', difficulty: 'EASY', xp: '+20 XP', emoji: '📄', color: '#6FE4FF', description: 'Create your first HTML page', progress: 45 },
    { id: 20, title: 'Bio Card', difficulty: 'EASY', xp: '+35 XP', emoji: '💳', color: '#F6A55D', description: 'Design a personal bio card', progress: 20 },
    { id: 21, title: 'Color Palette', difficulty: 'EASY', xp: '+40 XP', emoji: '🎨', color: '#94B1FF', description: 'Style with CSS colors', progress: 0 },
    { id: 22, title: 'Gallery Grid', difficulty: 'MEDIUM', xp: '+75 XP', emoji: '🖼️', color: '#FF7EA8', description: 'Build an image gallery', progress: 10 },
    { id: 23, title: 'Form Master', difficulty: 'MEDIUM', xp: '+80 XP', emoji: '📋', color: '#F3CC4C', description: 'Create interactive forms', progress: 0 },
    { id: 24, title: 'Portfolio Site', difficulty: 'HARD', xp: '+160 XP', emoji: '🌟', color: '#FF8243', description: 'Build a complete portfolio', progress: 0 },
  ],
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

const cardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
}

function Quest() {
  const [selectedLanguage, setSelectedLanguage] = useState('scratch')
  const navigate = useNavigate()

  const handleQuestClick = (questId) => {
    navigate(`/quest/${questId}`)
  }

  return (
    <motion.div
      className="quest-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ '--quest-bg': `url(${questBg})` }}
    >
      <section
        className="quest-hero"
        aria-labelledby="quest-hero-title"
      >
        <div className="quest-hero__fx" aria-hidden="true" />
        <div className="quest-hero__layout">
          {/* Left Side Panel with Toggle on Top */}
          <div className="quest-sidebar-wrapper">
            {/* Language Toggle */}
            <div className="quest-toggle" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={selectedLanguage === 'scratch'}
                className={`quest-toggle__btn pixel-font ${selectedLanguage === 'scratch' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('scratch')}
              >
                SCRATCH
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLanguage === 'python'}
                className={`quest-toggle__btn pixel-font ${selectedLanguage === 'python' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('python')}
              >
                PYTHON
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLanguage === 'html'}
                className={`quest-toggle__btn pixel-font ${selectedLanguage === 'html' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('html')}
              >
                HTML
              </button>
            </div>

            <aside className="quest-sidebar">
              <span className="quest-hero__eyebrow">Quest Console</span>
            <h1 id="quest-hero-title" className="quest-hero__title pixel-font">
              Quest Board
            </h1>
            <p className="quest-hero__subtitle">
              Choose your mission, earn XP, and unlock new challenges across the galaxy.
            </p>

            {/* Stats Row */}
            <ul className="quest-hero__stats" aria-label="Quest Statistics">
              {QUEST_STATS.map((s) => (
                <li key={s.label} className="quest-hero__stat">
                  <span className="quest-hero__stat-icon" aria-hidden="true">
                    <img src={s.icon} alt="" />
                  </span>
                  <div className="quest-hero__stat-copy">
                    <span className="quest-hero__stat-value">{s.value}</span>
                    <span className="quest-hero__stat-label">{s.label}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Progress Block */}
            <div className="quest-hero__progress" role="group" aria-label="Weekly progress">
              <div className="quest-hero__progress-header">
                <span className="quest-hero__progress-label">Weekly Challenge</span>
                <span className="quest-hero__progress-value">75%</span>
              </div>
              <div className="quest-hero__progress-track">
                <div
                  className="quest-hero__progress-fill"
                  style={{ '--progress': '75%' }}
                />
              </div>
              <div className="quest-hero__progress-caption">
                Complete 3 more quests to unlock the Explorer Badge
              </div>
            </div>
            </aside>
          </div>

          {/* Right Content Area */}
          <div className="quest-main-content">
            {/* Quest Grid */}
            <motion.div 
              className="quest-grid"
              key={selectedLanguage}
              initial="initial"
              animate="animate"
            >
              {QUESTS_DATA[selectedLanguage].map((quest, index) => (
                <motion.div
                  key={quest.id}
                  className="quest-card"
                  variants={cardVariants}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => handleQuestClick(quest.id)}
                >
                  <div className="quest-card__header">
                    <span 
                      className="quest-card__emoji" 
                      aria-hidden="true"
                      style={{ '--icon-color': quest.color }}
                    >
                      {quest.emoji}
                    </span>
                    <span className={`quest-card__difficulty quest-card__difficulty--${quest.difficulty.toLowerCase()}`}>
                      {quest.difficulty}
                    </span>
                  </div>
                  <div className="quest-card__body">
                    <h3 className="quest-card__title">{quest.title}</h3>
                    <p className="quest-card__description">{quest.description}</p>
                  </div>
                  {quest.progress > 0 && (
                    <div className="quest-card__progress">
                      <div className="quest-card__progress-track">
                        <div
                          className="quest-card__progress-fill"
                          style={{ '--progress': `${quest.progress}%` }}
                        />
                      </div>
                      <span className="quest-card__progress-label">{quest.progress}% Complete</span>
                    </div>
                  )}
                  <div className="quest-card__footer">
                    <span className="quest-card__xp">{quest.xp}</span>
                    <button 
                      type="button" 
                      className="quest-card__btn pixel-font"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleQuestClick(quest.id)
                      }}
                    >
                      START
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Quest

