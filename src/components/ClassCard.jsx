import PropTypes from 'prop-types'
import { Card, Badge, Button } from './ui'
import useApp from '../hooks/useApp'
// import { formatDistance } from '../utils/location'

/**
 * ClassCard Component
 *
 * Displays a fitness class with details, capacity, and booking functionality.
 * Features responsive design, color-coded capacity indicators, and interactive elements.
 *
 * @param {Object} props
 * @param {Object} props.classData - Class information (id, name, type, difficulty, duration, etc.)
 * @param {Object} props.studioData - Studio information (name, location, etc.)
 * @param {Object} props.instructorData - Instructor information (name, specialties, etc.)
 * @param {function} props.onBookClick - Callback function when booking button is clicked
 * @param {Object} props.userLocation - User's location {latitude, longitude} or null
 */
export default function ClassCard({ classData, studioData, instructorData, onBookClick }) {
  const {
    id,
    name,
    type,
    difficulty,
    duration,
    date,
    time,
    current_capacity,
    max_capacity,
    price,
    description,
    image_url
  } = classData

  // Handle both snake_case (from database) and camelCase (from mock data)
  const imageUrl = image_url || classData.imageUrl
  const currentCapacity = current_capacity ?? classData.currentCapacity ?? 0
  const maxCapacity = max_capacity ?? classData.maxCapacity ?? 1

  // Get app context for favorites
  const { toggleFavoriteStudio, isStudioFavorited } = useApp()
  const isFavorited = studioData ? isStudioFavorited(studioData.id) : false

  // Calculate availability (works with both DB snake_case and mock camelCase)
  const availableSpots = maxCapacity - currentCapacity
  const isFull = availableSpots <= 0
  const capacityPercentage = (currentCapacity / maxCapacity) * 100

  // Determine class status based on availability
  const getClassStatusValue = () => {
    if (availableSpots === 0) return 'full'
    if (availableSpots <= 3) return 'filling-fast'
    return 'available'
  }
  const classStatus = getClassStatusValue()

  // Determine capacity color based on status
  const getCapacityColor = () => {
    if (classStatus === 'full') return 'bg-error-600'
    if (classStatus === 'filling-fast') return 'bg-warning-600'
    return 'bg-success-600'
  }

  // Format time from 24h to 12h format
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Format date to readable format
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr)
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get difficulty badge variant
  const getDifficultyVariant = () => {
    if (difficulty === 'Beginner') return 'success'
    if (difficulty === 'Intermediate') return 'warning'
    if (difficulty === 'Advanced') return 'error'
    return 'default'
  }

  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    e.stopPropagation() // Prevent triggering parent click events
    console.log('Heart clicked! Studio data:', studioData)
    console.log('Toggle function available:', typeof toggleFavoriteStudio)
    if (studioData) {
      console.log('Toggling favorite for studio:', studioData.id)
      toggleFavoriteStudio(studioData.id)
    } else {
      console.warn('No studio data available')
    }
  }

  return (
    <Card className="transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-t-lg flex-shrink-0 bg-gradient-to-br from-primary-400 to-primary-600">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            {type}
          </div>
        )}

        {/* Overlays on Image */}
        <div className="absolute top-3 left-3">
          <Badge variant="info" className="bg-white/90 backdrop-blur-sm">
            {type}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-primary-700 text-lg shadow-md">
            ${price}
          </span>
        </div>

        {/* Favorite Button */}
        {studioData && (
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 hover:scale-110 group/heart"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-6 h-6 transition-colors duration-200 ${
                isFavorited ? 'text-error-600 fill-current' : 'text-gray-400 group-hover/heart:text-error-600'
              }`}
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3 flex flex-col flex-grow">
        {/* Title and Difficulty */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">{name}</h3>
          <Badge variant={getDifficultyVariant()}>
            {difficulty}
          </Badge>
        </div>

        {/* Studio Name */}
        {studioData && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">{studioData.name}</span>
          </p>
        )}

        {/* Instructor, Date, and Time */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {instructorData && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {instructorData.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(time)}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(date)}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{duration} minutes</span>
        </div>

        {/* Description */}
        <div className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Capacity Indicator */}
        <div className="space-y-2 pt-2 mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${isFull ? 'text-error-600' : 'text-gray-700'}`}>
              {isFull ? 'Class Full' : `${availableSpots} spot${availableSpots !== 1 ? 's' : ''} left`}
            </span>
            <span className="text-gray-500">
              {currentCapacity}/{maxCapacity} spots
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${getCapacityColor()} transition-all duration-300`}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>

        {/* Book Button */}
        <div className="pt-2">
          <Button
            variant={isFull ? 'secondary' : 'primary'}
            size="medium"
            onClick={() => {
              console.log('Book button clicked!', classData)
              onBookClick(classData)
            }}
            className="w-full"
          >
            {isFull ? 'Join Waitlist' : 'Book Now'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

ClassCard.propTypes = {
  classData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    currentCapacity: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired,
  studioData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  instructorData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  onBookClick: PropTypes.func.isRequired
}
