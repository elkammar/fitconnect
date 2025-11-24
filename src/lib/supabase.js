import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Client Configuration
 *
 * This module initializes and exports the Supabase client for the FitConnect application.
 * The client is configured using environment variables for security.
 *
 * @see https://supabase.com/docs/reference/javascript/initializing
 */

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// MOCK DATA MODE: Skip Supabase initialization if env vars missing
// Validate environment variables
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error(
//     'Missing Supabase environment variables. Please check your .env file.'
//   )
// }

// Create and export the Supabase client (or null if in mock mode)
export const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // SIMPLIFIED: Minimal auth config to avoid hanging queries
    autoRefreshToken: false,  // Changed from true
    persistSession: false,     // Changed from true
    detectSessionInUrl: false, // Changed from true
  },
  // Global configuration
  global: {
    headers: {
      'x-application-name': 'FitConnect',
    },
  },
}) : null

/**
 * Helper function to check if user is authenticated
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

/**
 * Helper function to get current user
 * @returns {Promise<Object|null>}
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Helper function to sign out
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export default supabase
