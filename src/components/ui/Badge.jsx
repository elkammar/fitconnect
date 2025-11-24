import PropTypes from 'prop-types'

/**
 * Badge Component
 *
 * A status badge component with color-coded variants.
 * Features rounded full shape with small text for displaying status or category information.
 *
 * @param {Object} props
 * @param {string} props.variant - Badge color variant: 'success' | 'warning' | 'error' | 'info' | 'default'
 * @param {React.ReactNode} props.children - Badge content (usually text)
 * @param {string} props.className - Additional CSS classes for custom styling
 */
export default function Badge({ variant = 'default', children, className = '', ...props }) {
  // Base badge styles
  const baseStyles = 'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium'

  // Variant styles using our design system colors
  const variantStyles = {
    success: 'bg-success-50 text-success-700 border border-success-600',
    warning: 'bg-warning-50 text-warning-700 border border-warning-600',
    error: 'bg-error-50 text-error-700 border border-error-600',
    info: 'bg-secondary-50 text-secondary-700 border border-secondary-600',
    default: 'bg-gray-100 text-gray-700 border border-gray-300'
  }

  // Combine all styles
  const badgeClasses = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
}

Badge.propTypes = {
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'default']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
