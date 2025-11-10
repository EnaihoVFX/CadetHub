import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Auth.css'

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

function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, navigate directly to dashboard
    navigate('/dashboard')
  }

  return (
    <motion.div
      className="auth-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="auth-container">
        <button 
          className="auth-back-btn pixel-font"
          onClick={() => navigate('/')}
        >
          ← BACK
        </button>
        
        <motion.div 
          className="auth-card pixel-border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="auth-title pixel-font">SIGN IN</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="pixel-font">USERNAME</label>
              <input 
                type="text" 
                className="pixel-input" 
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label className="pixel-font">PASSWORD</label>
              <input 
                type="password" 
                className="pixel-input" 
                placeholder="Enter password"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn pixel-font">
              SIGN IN
            </button>
            
            <p className="form-footer">
              Don't have an account?{' '}
              <button 
                type="button"
                className="link-btn pixel-font"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SignIn

