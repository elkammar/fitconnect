import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Badge } from '../components/ui'
import { Spinner, ProgressBar } from '../components/LoadingStates'
import { useClass } from '../hooks/useClasses'
import useApp from '../hooks/useApp'

/**
 * BookingPage Component
 *
 * Multi-step booking process for class reservations.
 * Features 4 steps: Class Details, User Info, Review, Confirmation
 */
export default function BookingPage() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const { addBooking, currentUser } = useApp()

  // State
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [bookingReference, setBookingReference] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock authentication state (in real app, this would come from context/auth)
  const [isLoggedIn] = useState(true)

  // Form data
  const [formData, setFormData] = useState({
    fullName: isLoggedIn ? 'Alex Morgan' : '',
    email: isLoggedIn ? 'alex.morgan@email.com' : '',
    phone: isLoggedIn ? '(312) 555-0123' : '',
    emergencyContact: ''
  })

  // Get class data using the hook (handles both UUIDs and numeric IDs)
  const { classData, loading: classLoading, error: classError } = useClass(classId)

  // Extract studio and instructor from the fetched class data
  const studioData = classData?.studio || null
  const instructorData = classData?.instructor || null

  // Handle image URL - support both imageUrl and image_url fields, with fallback
  const getImageUrl = (data) => {
    const url = data?.imageUrl || data?.image_url
    return url || 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800' // HIIT class fallback
  }

  // Redirect if class not found (after loading completes)
  useEffect(() => {
    if (!classLoading && !classData && !classError) {
      console.log('📍 Class not found, redirecting to discover')
      navigate('/discover')
    }
  }, [classData, classLoading, classError, navigate])

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Validate step 2 (user info)
  const validateStep2 = () => {
    const { fullName, email, phone } = formData
    if (!fullName || !email || !phone) {
      alert('Please fill in all required fields')
      return false
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return false
    }
    return true
  }

  // Validate step 3 (review)
  const validateStep3 = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return false
    }
    return true
  }

  // Handle next step
  const handleNext = () => {
    if (currentStep === 2 && !validateStep2()) return
    if (currentStep === 3) {
      if (!validateStep3()) return
      handleConfirmBooking()
      return
    }
    setCurrentStep(currentStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const reference = 'FC' + Math.random().toString(36).substr(2, 9).toUpperCase()
      setBookingReference(reference)

      // Create booking object
      const newBooking = {
        id: Date.now(), // Use timestamp as unique ID
        userId: currentUser?.id || 1,
        classId: parseInt(classId),
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'confirmed',
        amount: classData.price,
        reference: reference
      }

      // Add booking to app state
      addBooking(newBooking)

      setLoading(false)
      setCurrentStep(4)
    }, 2000)
  }

  // Format time
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!classData) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Class</h1>
          <p className="text-gray-600 mt-1">Complete your booking in a few simple steps</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          {/* Progress Bar */}
          <ProgressBar
            progress={(currentStep / 4) * 100}
            showPercentage={false}
            className="mb-6"
          />

          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-200 ${
                      step < currentStep
                        ? 'bg-success-600 text-white'
                        : step === currentStep
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      step <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step === 1 && 'Details'}
                    {step === 2 && 'Information'}
                    {step === 3 && 'Review'}
                    {step === 4 && 'Confirm'}
                  </span>
                </div>

                {/* Connector Line */}
                {index < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors duration-200 ${
                      step < currentStep ? 'bg-success-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {/* Step 1: Class Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Class Details</h2>

              {/* Class Image */}
              <img
                src={getImageUrl(classData)}
                alt={classData.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800'
                }}
              />

              {/* Class Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{classData.name}</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">Instructor: {instructorData?.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{formatDate(classData.date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{formatTime(classData.time)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-700">{classData.duration} minutes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={classData.difficulty === 'Beginner' ? 'success' : classData.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                        {classData.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Studio Location</h4>
                  <p className="text-gray-700 mb-1">{studioData?.name}</p>
                  <p className="text-gray-600 text-sm">{studioData?.location}</p>

                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Total Price</span>
                      <span className="text-3xl font-bold text-primary-600">${classData.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{classData.description}</p>
              </div>

              <div className="flex justify-end pt-6 mt-6">
                <Button variant="primary" size="large" onClick={handleNext}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: User Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>

              {isLoggedIn && (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4 flex items-center gap-3">
                  <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-success-700">You're logged in! Your information is pre-filled.</span>
                </div>
              )}

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(555) 987-6543"
                  />
                </div>
              </form>

              <div className="flex justify-between pt-6">
                <Button variant="outline" size="large" onClick={handleBack}>
                  Back
                </Button>
                <Button variant="primary" size="large" onClick={handleNext}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Review & Confirm</h2>

              {/* Class Summary */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Class Details</h3>
                <div className="flex gap-4">
                  <img
                    src={getImageUrl(classData)}
                    alt={classData.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800'
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{classData.name}</p>
                    <p className="text-sm text-gray-600">{studioData?.name}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(classData.date)} at {formatTime(classData.time)}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Info Summary */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Your Information</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Name: <span className="text-gray-900">{formData.fullName}</span></p>
                  <p className="text-sm text-gray-600">Email: <span className="text-gray-900">{formData.email}</span></p>
                  <p className="text-sm text-gray-600">Phone: <span className="text-gray-900">{formData.phone}</span></p>
                  {formData.emergencyContact && (
                    <p className="text-sm text-gray-600">Emergency: <span className="text-gray-900">{formData.emergencyContact}</span></p>
                  )}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                <p className="text-sm text-gray-600">
                  Free cancellation up to 24 hours before the class. Cancellations made within 24 hours will be charged 50% of the class fee. No-shows will be charged the full amount.
                </p>
              </div>

              {/* Total */}
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold text-primary-600">${classData.price}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the terms and conditions, cancellation policy, and understand that I am reserving a spot in this class.
                </label>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" size="large" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleNext}
                  disabled={!agreedToTerms || loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="small" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-xl text-gray-600">
                  You're all set for {classData.name}
                </p>
              </div>

              {/* Booking Reference */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold text-primary-600">{bookingReference}</p>
              </div>

              {/* Booking Summary */}
              <div className="text-left bg-gray-50 p-6 rounded-lg space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                <p className="text-sm text-gray-600">Class: <span className="text-gray-900 font-medium">{classData.name}</span></p>
                <p className="text-sm text-gray-600">Date: <span className="text-gray-900 font-medium">{formatDate(classData.date)}</span></p>
                <p className="text-sm text-gray-600">Time: <span className="text-gray-900 font-medium">{formatTime(classData.time)}</span></p>
                <p className="text-sm text-gray-600">Location: <span className="text-gray-900 font-medium">{studioData?.name}</span></p>
                <p className="text-sm text-gray-600">Amount Paid: <span className="text-gray-900 font-medium">${classData.price}</span></p>
              </div>

              {/* Confirmation sent message */}
              <p className="text-gray-600">
                A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6">
                <Button variant="outline" size="large" className="w-full">
                  📅 Add to Calendar
                </Button>
                <Button variant="secondary" size="large" className="w-full" onClick={() => navigate('/profile')}>
                  View My Bookings
                </Button>
                <Button variant="primary" size="large" className="w-full" onClick={() => navigate('/discover')}>
                  Book Another Class
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
