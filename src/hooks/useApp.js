import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

/**
 * useApp Hook
 *
 * Custom hook to access the global application context.
 * Provides access to user state, bookings, favorites, and related actions.
 *
 * @returns {Object} Application context value
 * @throws {Error} If used outside of AppProvider
 *
 * @example
 * const { currentUser, isAuthenticated, login, logout } = useApp()
 */
export default function useApp() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }

  return context
}
