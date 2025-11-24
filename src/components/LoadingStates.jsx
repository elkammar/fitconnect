import PropTypes from 'prop-types'
import { Card } from './ui'

/**
 * LoadingStates Component
 *
 * Collection of loading state components including skeleton loaders,
 * spinners, and progress bars for improved UX during async operations.
 */

// Shimmer animation keyframes are in the Tailwind config
// Using gradient animation for shimmer effect

/**
 * ClassCardSkeleton
 *
 * Skeleton loader that matches ClassCard layout
 */
export function ClassCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title and badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
        </div>

        {/* Studio name */}
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />

        {/* Details */}
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
        </div>

        {/* Duration */}
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>

        {/* Capacity bar */}
        <div className="pt-2">
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
          <div className="h-2 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Button */}
        <div className="pt-2">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </Card>
  )
}

/**
 * StudioCardSkeleton
 *
 * Skeleton loader for studio cards
 */
export function StudioCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="h-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-16 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
        </div>
      </div>
    </Card>
  )
}

/**
 * Spinner Component
 *
 * Circular loading spinner with size variants
 */
export function Spinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  }

  return (
    <div
      className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
}

/**
 * ProgressBar Component
 *
 * Linear progress indicator for multi-step forms
 */
export function ProgressBar({ progress, showPercentage = false, className = '' }) {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={className}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-primary-600">{normalizedProgress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${normalizedProgress}%` }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  showPercentage: PropTypes.bool,
  className: PropTypes.string
}

/**
 * LoadingOverlay Component
 *
 * Full-screen loading overlay with spinner
 */
export function LoadingOverlay({ message = 'Loading...', show = true }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl">
        <Spinner size="large" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  )
}

LoadingOverlay.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool
}

/**
 * TableSkeleton Component
 *
 * Skeleton loader for tables
 */
export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded flex-1 animate-pulse" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-8 bg-gray-100 rounded flex-1 animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  )
}

TableSkeleton.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number
}

/**
 * InlineSpinner Component
 *
 * Small inline spinner for buttons
 */
export function InlineSpinner({ className = '' }) {
  return (
    <svg
      className={`animate-spin h-4 w-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

InlineSpinner.propTypes = {
  className: PropTypes.string
}
