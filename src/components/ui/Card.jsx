import PropTypes from 'prop-types'

/**
 * Card Component
 *
 * A reusable card component with white background, shadow, and rounded corners.
 * Features a subtle hover effect that increases the shadow.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes for custom styling
 * @param {function} props.onClick - Optional click handler (makes card interactive)
 */
export default function Card({ children, className = '', onClick, ...props }) {
  // Base card styles
  const baseStyles = 'bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out'

  // Hover effect - only apply if onClick is provided
  const hoverStyles = onClick ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : 'hover:shadow-lg'

  // Combine all styles
  const cardClasses = `${baseStyles} ${hoverStyles} ${className}`

  // If onClick is provided, make it interactive
  const cardProps = onClick ? { onClick, role: 'button', tabIndex: 0 } : {}

  return (
    <div className={cardClasses} {...cardProps} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}
