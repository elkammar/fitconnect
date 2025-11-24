import { useState } from 'react'
import { Button } from './ui'

/**
 * LocationPermissionBanner Component
 *
 * Displays a banner prompting users to enable location access.
 * Explains the benefits and provides an action button.
 *
 * @param {Object} props
 * @param {function} props.onEnableLocation - Callback when "Enable Location" is clicked
 * @param {function} props.onDismiss - Callback when banner is dismissed
 * @param {boolean} props.showZipCodeOption - Whether to show zip code input option
 * @param {function} props.onZipCodeSubmit - Callback when zip code is submitted
 */
export default function LocationPermissionBanner({
  onEnableLocation,
  onDismiss,
  showZipCodeOption = true,
  onZipCodeSubmit
}) {
  const [showZipInput, setShowZipInput] = useState(false)
  const [zipCode, setZipCode] = useState('')

  const handleZipSubmit = (e) => {
    e.preventDefault()
    if (zipCode.length === 5 && /^\d{5}$/.test(zipCode)) {
      onZipCodeSubmit?.(zipCode)
      setShowZipInput(false)
      setZipCode('')
    }
  }

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="font-semibold text-primary-900">
              Find Classes Near You
            </h3>
          </div>

          <p className="text-sm text-primary-800 mb-3">
            Enable location access to see distances, find nearby studios, and sort classes by proximity.
            We only use your location while you're using the app.
          </p>

          {!showZipInput ? (
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={onEnableLocation}
                variant="primary"
                size="small"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                Enable Location
              </Button>

              {showZipCodeOption && (
                <button
                  onClick={() => setShowZipInput(true)}
                  className="text-sm text-primary-700 hover:text-primary-900 underline"
                >
                  Or enter your zip code
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleZipSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
                maxLength={5}
                pattern="\d{5}"
                className="px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm w-32"
              />
              <Button
                type="submit"
                variant="primary"
                size="small"
                disabled={zipCode.length !== 5}
              >
                Submit
              </Button>
              <button
                type="button"
                onClick={() => {
                  setShowZipInput(false)
                  setZipCode('')
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="ml-4 text-primary-600 hover:text-primary-900 transition-colors"
          aria-label="Dismiss"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
