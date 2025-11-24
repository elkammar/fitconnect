import { useState, useEffect } from 'react'

/**
 * useGeolocation Hook
 *
 * Provides access to the user's geographic location using the browser's Geolocation API.
 * Handles permissions, errors, and loading states.
 *
 * @param {boolean} autoRequest - Whether to automatically request location on mount
 * @returns {Object} { latitude, longitude, loading, error, requestLocation, clearError }
 */
export function useGeolocation(autoRequest = false) {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const requestLocation = () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setLoading(false)
        console.log('📍 Location obtained:', {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      // Error callback
      (error) => {
        setLoading(false)

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location permissions in your browser.')
            break
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable. Please try again.')
            break
          case error.TIMEOUT:
            setError('Location request timed out. Please try again.')
            break
          default:
            setError('An error occurred while getting your location.')
        }

        console.error('📍 Geolocation error:', error)
      },
      // Options
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // Cache position for 5 minutes
      }
    )
  }

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    if (autoRequest) {
      requestLocation()
    }
  }, [autoRequest])

  return {
    latitude,
    longitude,
    loading,
    error,
    requestLocation,
    clearError,
    hasLocation: latitude !== null && longitude !== null
  }
}

export default useGeolocation
