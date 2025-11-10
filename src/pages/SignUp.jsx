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

function SignUp() {
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
      <div className="auth-container auth-container--signup">
        <button 
          className="auth-back-btn pixel-font"
          onClick={() => navigate('/')}
        >
          ← BACK
        </button>
        
        <motion.div 
          className="auth-card auth-card--signup pixel-border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="auth-title pixel-font">CREATE ACCOUNT</h1>
          
          <form className="auth-form auth-form--signup" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="pixel-font">USERNAME</label>
              <input 
                type="text" 
                className="pixel-input" 
                placeholder="Choose username"
                required
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label className="pixel-font">EMAIL</label>
              <input 
                type="email" 
                className="pixel-input" 
                placeholder="Enter email"
                required
              />
            </div>
            
            <div className="password-group">
              <div className="form-group">
                <label className="pixel-font">PASSWORD</label>
                <input 
                  type="password" 
                  className="pixel-input" 
                  placeholder="Create password"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="pixel-font">CONFIRM PASSWORD</label>
                <input 
                  type="password" 
                  className="pixel-input" 
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="submit-btn pixel-font">
              CREATE ACCOUNT
            </button>
            
            <p className="form-footer">
              Already have an account?{' '}
              <button 
                type="button"
                className="link-btn pixel-font"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SignUp

