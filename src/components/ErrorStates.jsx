import PropTypes from 'prop-types'
import { Button, Card } from './ui'

/**
 * ErrorStates Component
 *
 * Collection of error and empty state components for displaying
 * errors, 404 pages, and empty data states.
 */

/**
 * ErrorMessage Component
 *
 * Red alert box for displaying error messages
 */
export function ErrorMessage({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  onRetry,
  showRetry = true
}) {
  return (
    <Card className="p-6 border-2 border-error-200 bg-error-50">
      <div className="flex items-start gap-4">
        {/* Error Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-error-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-error-900 mb-1">{title}</h3>
          <p className="text-error-700 mb-4">{message}</p>

          {showRetry && onRetry && (
            <Button
              variant="outline"
              size="small"
              onClick={onRetry}
              className="border-error-600 text-error-600 hover:bg-error-50"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  showRetry: PropTypes.bool
}

/**
 * NotFoundPage Component
 *
 * 404 page for routes that don't exist
 */
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <div className="h-1 w-32 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error Icon */}
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="large"
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            size="large"
            className="w-full"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * EmptyState Component
 *
 * Generic empty state for when there's no data to display
 */
export function EmptyState({
  icon = 'box',
  title = 'No results found',
  message = 'Try adjusting your filters or search to find what you\'re looking for.',
  actionLabel,
  onAction,
  children
}) {
  const icons = {
    box: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    heart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
    document: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    smile: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    )
  }

  return (
    <Card className="p-12 text-center">
      {/* Icon */}
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icons[icon] || icons.box}
        </svg>
      </div>

      {/* Message */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button variant="primary" size="large" onClick={onAction}>
          {actionLabel}
        </Button>
      )}

      {/* Custom Children */}
      {children && <div className="mt-6">{children}</div>}
    </Card>
  )
}

EmptyState.propTypes = {
  icon: PropTypes.oneOf(['box', 'search', 'calendar', 'heart', 'document', 'smile']),
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  children: PropTypes.node
}

/**
 * NetworkError Component
 *
 * Specialized error for network/connection issues
 */
export function NetworkError({ onRetry }) {
  return (
    <ErrorMessage
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

NetworkError.propTypes = {
  onRetry: PropTypes.func
}

/**
 * PermissionError Component
 *
 * Error for unauthorized access
 */
export function PermissionError({ message = 'You don\'t have permission to access this resource.' }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="p-12 max-w-md text-center">
        <div className="w-20 h-20 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-warning-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Denied</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <Button
          variant="primary"
          size="large"
          onClick={() => window.location.href = '/'}
        >
          Go to Homepage
        </Button>
      </Card>
    </div>
  )
}

PermissionError.propTypes = {
  message: PropTypes.string
}
