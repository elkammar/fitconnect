import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppProvider from './context/AppProvider'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import DiscoverPage from './pages/DiscoverPage'
import HowItWorksPage from './pages/HowItWorksPage'
import StudioDashboardPage from './pages/StudioDashboardPage'
import ProfilePage from './pages/ProfilePage'
import BookingPage from './pages/BookingPage'
import DatabaseTestPage from './pages/DatabaseTestPage'
import { NotFoundPage } from './components/ErrorStates'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <Navigation />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/studio-dashboard" element={<StudioDashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/booking/:classId" element={<BookingPage />} />

            {/* Database Connection Test Page (for debugging) */}
            <Route path="/db-test" element={<DatabaseTestPage />} />

            {/* Redirect /bookings to /profile (bookings are in profile page) */}
            <Route path="/bookings" element={<Navigate to="/profile" replace />} />

            {/* 404 - Catch all unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
