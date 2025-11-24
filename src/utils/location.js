/**
 * Location Utility Functions
 *
 * Provides distance calculations and location-based filtering/sorting for studios and classes.
 */

/**
 * Calculate distance between two coordinates using the Haversine formula
 * Returns distance in miles
 *
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in miles
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  // Radius of Earth in miles
  const R = 3959

  // Convert degrees to radians
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const lat1Rad = toRadians(lat1)
  const lat2Rad = toRadians(lat2)

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c

  return distance
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Calculate distance in kilometers instead of miles
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const distanceMiles = calculateDistance(lat1, lon1, lat2, lon2)
  return distanceMiles * 1.60934 // Convert miles to km
}

/**
 * Add distance property to each studio based on user location
 *
 * @param {Array} studios - Array of studio objects
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @returns {Array} Studios with distance property added
 */
export function addDistanceToStudios(studios, userLat, userLon) {
  if (!userLat || !userLon || !studios) return studios

  return studios.map(studio => ({
    ...studio,
    distance: calculateDistance(userLat, userLon, studio.latitude, studio.longitude)
  }))
}

/**
 * Sort studios by distance from user location
 *
 * @param {Array} studios - Array of studio objects
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @returns {Array} Studios sorted by distance (closest first)
 */
export function sortByDistance(studios, userLat, userLon) {
  if (!userLat || !userLon || !studios) return studios

  const studiosWithDistance = addDistanceToStudios(studios, userLat, userLon)

  return studiosWithDistance.sort((a, b) => a.distance - b.distance)
}

/**
 * Filter studios within a certain radius
 *
 * @param {Array} studios - Array of studio objects
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @param {number} radiusMiles - Maximum distance in miles
 * @returns {Array} Studios within the radius
 */
export function filterByRadius(studios, userLat, userLon, radiusMiles) {
  if (!userLat || !userLon || !studios || !radiusMiles) return studios

  const studiosWithDistance = addDistanceToStudios(studios, userLat, userLon)

  return studiosWithDistance.filter(studio => studio.distance <= radiusMiles)
}

/**
 * Format distance for display
 *
 * @param {number} distance - Distance in miles
 * @returns {string} Formatted distance string
 */
export function formatDistance(distance) {
  if (distance === null || distance === undefined) return ''

  if (distance < 0.1) {
    return 'Less than 0.1 mi'
  } else if (distance < 1) {
    return `${distance.toFixed(1)} mi`
  } else if (distance < 10) {
    return `${distance.toFixed(1)} mi`
  } else {
    return `${Math.round(distance)} mi`
  }
}

/**
 * Check if location is nearby (within 5 miles)
 *
 * @param {number} distance - Distance in miles
 * @returns {boolean} True if within 5 miles
 */
export function isNearby(distance) {
  return distance !== null && distance !== undefined && distance <= 5
}

/**
 * Get city and state from coordinates using reverse geocoding
 * Note: This is a placeholder - in production, you'd use a geocoding API
 *
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<string>} City and state string
 */
export async function reverseGeocode(lat, lon) {
  // For demo purposes, if coordinates are near Chicago, return "Chicago, IL"
  // In production, use Google Maps Geocoding API or similar
  const chicagoLat = 41.8781
  const chicagoLon = -87.6298

  const distanceToChicago = calculateDistance(lat, lon, chicagoLat, chicagoLon)

  if (distanceToChicago < 50) {
    return 'Chicago, IL'
  }

  return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`
}

/**
 * Parse zip code and get approximate coordinates
 * Note: This is a placeholder - in production, use a zip code database or API
 *
 * @param {string} zipCode - 5-digit zip code
 * @returns {Object|null} { latitude, longitude } or null if invalid
 */
export function getCoordinatesFromZip(zipCode) {
  // Chicago area zip codes with approximate coordinates
  const zipDatabase = {
    '60657': { latitude: 41.9392, longitude: -87.6553 }, // Lakeview
    '60614': { latitude: 41.9220, longitude: -87.6531 }, // Lincoln Park
    '60613': { latitude: 41.9540, longitude: -87.6550 }, // Lakeview
    '60622': { latitude: 41.9033, longitude: -87.6785 }, // Wicker Park
    '60647': { latitude: 41.9202, longitude: -87.7050 }, // Logan Square
    '60618': { latitude: 41.9486, longitude: -87.7053 }, // North Center
    // Add more as needed
  }

  return zipDatabase[zipCode] || null
}

export default {
  calculateDistance,
  calculateDistanceKm,
  addDistanceToStudios,
  sortByDistance,
  filterByRadius,
  formatDistance,
  isNearby,
  reverseGeocode,
  getCoordinatesFromZip
}
