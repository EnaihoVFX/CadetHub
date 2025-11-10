import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor.jsx'
import AppHeader from './components/AppHeader.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Quest from './pages/Quest.jsx'
import QuestDetail from './pages/QuestDetail.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Shop from './pages/Shop.jsx'
import AvatarStudio from './pages/AvatarStudio.jsx'
import mainBg from './assets/bg.jpg'
import { AvatarProvider } from './context/AvatarContext.jsx'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/avatar" element={<AvatarStudio />} />
        <Route path="/quest" element={<Quest />} />
        <Route path="/quest/:questId" element={<QuestDetail />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <AvatarProvider>
        <div
          className="app"
          style={{
            '--app-bg-image': `url(${mainBg})`,
          }}
        >
          <AppHeader />
          <main className="app-main">
            <AnimatedRoutes />
          </main>
          <CustomCursor />
        </div>
      </AvatarProvider>
    </Router>
  )
}

export default App
