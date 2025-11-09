import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor.jsx'
import AppHeader from './components/AppHeader.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import mainBg from './assets/bg.jpg'
import './App.css'

function App() {
  return (
    <Router>
      <div
        className="app"
        style={{
          backgroundImage: `url(${mainBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <AppHeader />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <CustomCursor />
      </div>
    </Router>
  )
}

export default App
