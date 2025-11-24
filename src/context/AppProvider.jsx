import { useReducer, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from './AppContext'
import { supabase } from '../lib/supabase'

/**
 * AppProvider Component
 *
 * Provides global state management for the application using React Context and useReducer.
 * Integrates with Supabase for authentication and data persistence.
 * Features:
 * - Real-time auth state synchronization
 * - User profile management
 * - Bookings and favorites management
 * - Loading states for auth checks
 */

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_SESSION: 'SET_SESSION',
  LOGOUT: 'LOGOUT',
  ADD_BOOKING: 'ADD_BOOKING',
  CANCEL_BOOKING: 'CANCEL_BOOKING',
  UPDATE_BOOKINGS: 'UPDATE_BOOKINGS',
  TOGGLE_FAVORITE_STUDIO: 'TOGGLE_FAVORITE_STUDIO',
  TOGGLE_FAVORITE_CLASS: 'TOGGLE_FAVORITE_CLASS',
  SET_FAVORITES: 'SET_FAVORITES',
  SET_ERROR: 'SET_ERROR'
}

// Initial state
const initialState = {
  currentUser: null,
  session: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  userBookings: [],
  favoriteStudios: [],
  favoriteClasses: []
}

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      }

    case ACTIONS.SET_SESSION:
      return {
        ...state,
        session: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      }

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case ACTIONS.LOGOUT:
      return {
        ...initialState,
        loading: false
      }

    case ACTIONS.ADD_BOOKING:
      return {
        ...state,
        userBookings: [...state.userBookings, action.payload]
      }

    case ACTIONS.CANCEL_BOOKING:
      return {
        ...state,
        userBookings: state.userBookings.map(booking =>
          booking.id === action.payload
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      }

    case ACTIONS.UPDATE_BOOKINGS:
      return {
        ...state,
        userBookings: action.payload
      }

    case ACTIONS.TOGGLE_FAVORITE_STUDIO:
      const studioExists = state.favoriteStudios.includes(action.payload)
      return {
        ...state,
        favoriteStudios: studioExists
          ? state.favoriteStudios.filter(id => id !== action.payload)
          : [...state.favoriteStudios, action.payload]
      }

    case ACTIONS.TOGGLE_FAVORITE_CLASS:
      const classExists = state.favoriteClasses.includes(action.payload)
      return {
        ...state,
        favoriteClasses: classExists
          ? state.favoriteClasses.filter(id => id !== action.payload)
          : [...state.favoriteClasses, action.payload]
      }

    case ACTIONS.SET_FAVORITES:
      return {
        ...state,
        favoriteStudios: action.payload.studios || [],
        favoriteClasses: action.payload.classes || []
      }

    default:
      return state
  }
}

// Storage keys for localStorage (backup/cache)
const STORAGE_KEYS = {
  BOOKINGS: 'fitconnect_bookings',
  FAVORITE_STUDIOS: 'fitconnect_favorite_studios',
  FAVORITE_CLASSES: 'fitconnect_favorite_classes'
}

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [initialized, setInitialized] = useState(false)

  /**
   * Fetch user profile from Supabase users table
   */
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // If profile doesn't exist, return null (user needs to complete profile)
        if (error.code === 'PGRST116') {
          return null
        }
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  /**
   * Fetch user bookings from Supabase
   */
  const fetchUserBookings = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching bookings:', error)
      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS)
      return stored ? JSON.parse(stored) : []
    }
  }

  /**
   * Fetch user favorites from Supabase
   */
  const fetchUserFavorites = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      const studios = data
        .filter(f => f.favoritable_type === 'studio')
        .map(f => f.favoritable_id)

      const classes = data
        .filter(f => f.favoritable_type === 'class')
        .map(f => f.favoritable_id)

      return { studios, classes }
    } catch (error) {
      console.error('Error fetching favorites:', error)
      // Fallback to localStorage
      const storedStudios = localStorage.getItem(STORAGE_KEYS.FAVORITE_STUDIOS)
      const storedClasses = localStorage.getItem(STORAGE_KEYS.FAVORITE_CLASSES)
      return {
        studios: storedStudios ? JSON.parse(storedStudios) : [],
        classes: storedClasses ? JSON.parse(storedClasses) : []
      }
    }
  }

  /**
   * Initialize user data when authenticated
   */
  const initializeUserData = async (session) => {
    if (!session?.user) {
      dispatch({ type: ACTIONS.SET_USER, payload: null })
      return
    }

    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })

      // Fetch user profile
      const profile = await fetchUserProfile(session.user.id)

      // If no profile exists, create a basic one from auth metadata
      const userData = profile || {
        id: session.user.id,
        email: session.user.email,
        full_name: session.user.user_metadata?.full_name || 'User',
        profile_image_url: session.user.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/lego/1.jpg',
        member_since: session.user.created_at
      }

      dispatch({ type: ACTIONS.SET_USER, payload: userData })

      // Fetch bookings and favorites
      const [bookings, favorites] = await Promise.all([
        fetchUserBookings(session.user.id),
        fetchUserFavorites(session.user.id)
      ])

      dispatch({ type: ACTIONS.UPDATE_BOOKINGS, payload: bookings })
      dispatch({ type: ACTIONS.SET_FAVORITES, payload: favorites })

    } catch (error) {
      console.error('Error initializing user data:', error)
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  /**
   * Set up Supabase auth state listener
   */
  useEffect(() => {
    // Check if Supabase is initialized
    if (!supabase) {
      console.warn('⚠️ Supabase not initialized - missing environment variables')
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      setInitialized(true)
      return
    }

    let mounted = true

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error

        if (mounted) {
          dispatch({ type: ACTIONS.SET_SESSION, payload: session })
          if (session) {
            console.log('✅ Valid Supabase session found:', session.user.email)
            await initializeUserData(session)
          } else {
            console.log('❌ No Supabase session - user is not authenticated')
            // Clear any user data and ensure logged out state
            dispatch({ type: ACTIONS.LOGOUT })
            dispatch({ type: ACTIONS.SET_LOADING, payload: false })
          }
          setInitialized(true)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
          dispatch({ type: ACTIONS.LOGOUT })
          setInitialized(true)
        }
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email || 'no user')

        if (mounted) {
          dispatch({ type: ACTIONS.SET_SESSION, payload: session })

          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            console.log('✅ User signed in, initializing data...')
            await initializeUserData(session)
          } else if (event === 'SIGNED_OUT') {
            console.log('👋 User signed out, clearing data...')
            dispatch({ type: ACTIONS.LOGOUT })
            // Clear localStorage
            localStorage.removeItem(STORAGE_KEYS.BOOKINGS)
            localStorage.removeItem(STORAGE_KEYS.FAVORITE_STUDIOS)
            localStorage.removeItem(STORAGE_KEYS.FAVORITE_CLASSES)
            console.log('✅ Logout complete, state cleared')
          }
        }
      }
    )

    // Cleanup
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Persist bookings to localStorage as backup
   */
  useEffect(() => {
    if (state.userBookings.length > 0) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(state.userBookings))
    }
  }, [state.userBookings])

  /**
   * Persist favorites to localStorage as backup
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_STUDIOS, JSON.stringify(state.favoriteStudios))
    localStorage.setItem(STORAGE_KEYS.FAVORITE_CLASSES, JSON.stringify(state.favoriteClasses))
  }, [state.favoriteStudios, state.favoriteClasses])

  // ============================================================================
  // AUTH ACTION CREATORS
  // ============================================================================

  /**
   * Sign up a new user
   */
  const signup = async (email, password, fullName, phone = '') => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: ACTIONS.SET_ERROR, payload: null })

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone
          }
        }
      })

      if (error) throw error

      // Create user profile in users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: email,
            full_name: fullName,
            phone: phone || null,
            role: 'user'
          }])

        if (profileError) {
          console.error('Error creating user profile:', profileError)
          // Continue anyway as the user is created in auth
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Signup error:', error)
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      return { data: null, error }
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  /**
   * Sign in an existing user
   */
  const login = async (email, password) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: ACTIONS.SET_ERROR, payload: null })

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // User data will be set by the auth state change listener
      return { data, error: null }
    } catch (error) {
      console.error('Login error:', error)
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      return { data: null, error }
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  /**
   * Sign out the current user
   */
  const logout = async () => {
    try {
      console.log('🚪 Logout initiated...')
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })

      console.log('📤 Calling supabase.auth.signOut()...')

      // Add timeout to signOut call (3 seconds)
      const signOutPromise = supabase.auth.signOut()
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Logout timeout')), 3000)
      )

      try {
        const { error } = await Promise.race([signOutPromise, timeoutPromise])

        if (error) {
          console.error('❌ Logout failed:', error.message, error)
          throw error
        }

        console.log('✅ Supabase signOut() completed successfully')
      } catch (timeoutError) {
        console.warn('⚠️ SignOut timed out, forcing manual logout...')
        // Force manual logout by clearing the session
        dispatch({ type: ACTIONS.LOGOUT })
        localStorage.removeItem(STORAGE_KEYS.BOOKINGS)
        localStorage.removeItem(STORAGE_KEYS.FAVORITE_STUDIOS)
        localStorage.removeItem(STORAGE_KEYS.FAVORITE_CLASSES)
        console.log('✅ Manual logout complete')
        return { error: null }
      }

      console.log('⏳ Waiting for SIGNED_OUT event...')
      // State will be cleared by the auth state change listener
      return { error: null }
    } catch (error) {
      console.error('❌ Logout error:', error.message || error)
      // Force logout anyway
      dispatch({ type: ACTIONS.LOGOUT })
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS)
      localStorage.removeItem(STORAGE_KEYS.FAVORITE_STUDIOS)
      localStorage.removeItem(STORAGE_KEYS.FAVORITE_CLASSES)
      return { error }
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  /**
   * Reset password
   */
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error }
    }
  }

  // ============================================================================
  // BOOKINGS ACTION CREATORS
  // ============================================================================

  /**
   * Add a new booking
   */
  const addBooking = async (booking) => {
    try {
      if (!state.currentUser) {
        throw new Error('Must be logged in to book a class')
      }

      // Add to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: state.currentUser.id,
          class_id: booking.classId,
          amount: booking.amount,
          status: 'confirmed',
          reference_code: booking.reference || null
        }])
        .select()
        .single()

      if (error) throw error

      // Update local state
      dispatch({ type: ACTIONS.ADD_BOOKING, payload: data })
      return { data, error: null }
    } catch (error) {
      console.error('Error adding booking:', error)
      // Fallback to local state only
      dispatch({ type: ACTIONS.ADD_BOOKING, payload: booking })
      return { data: null, error }
    }
  }

  /**
   * Cancel a booking
   */
  const cancelBooking = async (bookingId) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)

      if (error) throw error

      // Update local state
      dispatch({ type: ACTIONS.CANCEL_BOOKING, payload: bookingId })
      return { error: null }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      // Fallback to local state only
      dispatch({ type: ACTIONS.CANCEL_BOOKING, payload: bookingId })
      return { error }
    }
  }

  /**
   * Update bookings list
   */
  const updateBookings = (bookings) => {
    dispatch({ type: ACTIONS.UPDATE_BOOKINGS, payload: bookings })
  }

  // ============================================================================
  // FAVORITES ACTION CREATORS
  // ============================================================================

  /**
   * Toggle studio favorite
   */
  const toggleFavoriteStudio = async (studioId) => {
    console.log('toggleFavoriteStudio called with:', studioId)
    console.log('Current user:', state.currentUser)
    console.log('Current favorites:', state.favoriteStudios)

    if (!state.currentUser) {
      console.warn('Must be logged in to favorite studios')
      return
    }

    const isFavorited = state.favoriteStudios.includes(studioId)
    console.log('Is currently favorited:', isFavorited)

    try {
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', state.currentUser.id)
          .eq('favoritable_type', 'studio')
          .eq('favoritable_id', studioId)

        if (error) throw error
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{
            user_id: state.currentUser.id,
            favoritable_type: 'studio',
            favoritable_id: studioId
          }])

        if (error) throw error
      }

      // Update local state
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE_STUDIO, payload: studioId })
    } catch (error) {
      console.error('Error toggling studio favorite:', error)
      // Fallback to local state only
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE_STUDIO, payload: studioId })
    }
  }

  /**
   * Toggle class favorite
   */
  const toggleFavoriteClass = async (classId) => {
    if (!state.currentUser) {
      console.warn('Must be logged in to favorite classes')
      return
    }

    const isFavorited = state.favoriteClasses.includes(classId)

    try {
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', state.currentUser.id)
          .eq('favoritable_type', 'class')
          .eq('favoritable_id', classId)

        if (error) throw error
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{
            user_id: state.currentUser.id,
            favoritable_type: 'class',
            favoritable_id: classId
          }])

        if (error) throw error
      }

      // Update local state
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE_CLASS, payload: classId })
    } catch (error) {
      console.error('Error toggling class favorite:', error)
      // Fallback to local state only
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE_CLASS, payload: classId })
    }
  }

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  /**
   * Check if a studio is favorited
   */
  const isStudioFavorited = (studioId) => {
    return state.favoriteStudios.includes(studioId)
  }

  /**
   * Check if a class is favorited
   */
  const isClassFavorited = (classId) => {
    return state.favoriteClasses.includes(classId)
  }

  /**
   * Update user profile
   */
  const updateUserProfile = async (updates) => {
    try {
      if (!state.currentUser) {
        throw new Error('Must be logged in to update profile')
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', state.currentUser.id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      dispatch({ type: ACTIONS.SET_USER, payload: data })
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      // Fallback to local state only
      const updatedUser = {
        ...state.currentUser,
        ...updates
      }
      dispatch({ type: ACTIONS.SET_USER, payload: updatedUser })
      return { data: null, error }
    }
  }

  // Context value
  const value = {
    // State
    currentUser: state.currentUser,
    session: state.session,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    initialized,
    error: state.error,
    userBookings: state.userBookings,
    favoriteStudios: state.favoriteStudios,
    favoriteClasses: state.favoriteClasses,

    // Auth actions
    signup,
    login,
    logout,
    resetPassword,

    // Booking actions
    addBooking,
    cancelBooking,
    updateBookings,

    // Favorites actions
    toggleFavoriteStudio,
    toggleFavoriteClass,
    isStudioFavorited,
    isClassFavorited,

    // User actions
    updateUserProfile
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}
