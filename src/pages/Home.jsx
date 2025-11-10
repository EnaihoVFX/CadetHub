import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    // For now, navigate directly to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="home-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="hero-content"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h1 
            className="hero-title pixel-font"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            CODE CADETS
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Embark on an epic coding adventure!
            <br />
            Learn programming through interactive quests and challenges.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button 
              className="hero-btn primary-btn pixel-font"
              onClick={handleGetStarted}
            >
              GET STARTED
            </button>
            <button 
              className="hero-btn secondary-btn pixel-font"
              onClick={() => navigate('/signin')}
            >
              SIGN IN
            </button>
          </motion.div>

          <motion.p 
            className="hero-new-user"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            New to Code Cadets?{' '}
            <button 
              className="link-btn pixel-font"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </button>
          </motion.p>
        </motion.div>

        <motion.div 
          className="hero-features"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3 className="pixel-font">Interactive Quests</h3>
            <p>Complete coding challenges in a fun, game-like environment</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3 className="pixel-font">Earn Rewards</h3>
            <p>Level up your skills and collect achievements</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="pixel-font">Build Projects</h3>
            <p>Create real programs and share with the community</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home
