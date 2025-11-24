import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge } from '../components/ui'
import { EmptyState } from '../components/ErrorStates'
import { studios, classes } from '../data/mockData'
import useApp from '../hooks/useApp'

/**
 * ProfilePage Component
 *
 * User profile page with tabs for bookings, favorites, settings, and billing.
 * Features two-column layout on desktop, stacked on mobile.
 */
export default function ProfilePage() {
  const navigate = useNavigate()

  // Get global app state
  const {
    currentUser,
    userBookings,
    favoriteStudios: favoriteStudioIds,
    cancelBooking,
    toggleFavoriteStudio,
    updateUserProfile
  } = useApp()

  // Active tab state
  const [activeTab, setActiveTab] = useState('bookings')

  // Get favorite studio objects from IDs
  const favoriteStudios = studios.filter(studio => favoriteStudioIds.includes(studio.id))

  // Account settings form state
  const [settingsForm, setSettingsForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    notifications: {
      emailReminders: true,
      smsReminders: true,
      promotions: false,
      classUpdates: true
    }
  })

  // Payment methods state
  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/26',
      isDefault: false
    }
  ])

  // Transaction history state
  const [transactions] = useState([
    {
      id: 1,
      date: '2025-11-15',
      description: 'Morning Vinyasa Flow',
      amount: 22,
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-11-10',
      description: 'PowerCycle Ride',
      amount: 30,
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-11-05',
      description: 'HIIT Blast',
      amount: 25,
      status: 'completed'
    }
  ])

  // Format date helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format time helper
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Get booking status
  const getBookingStatus = (booking) => {
    const classData = classes.find(c => c.id === booking.classId)
    if (!classData) return 'unknown'

    const classDate = new Date(classData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    classDate.setHours(0, 0, 0, 0)

    if (booking.status === 'cancelled') return 'cancelled'
    if (classDate < today) return 'completed'
    return 'upcoming'
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'upcoming':
        return 'success'
      case 'completed':
        return 'default'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  // Handle cancel booking
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId)
    }
  }

  // Handle remove favorite studio
  const handleRemoveFavorite = (studioId) => {
    toggleFavoriteStudio(studioId)
  }

  // Handle settings form change
  const handleSettingsChange = (e) => {
    const { name, value } = e.target
    setSettingsForm({
      ...settingsForm,
      [name]: value
    })
  }

  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setSettingsForm({
      ...settingsForm,
      notifications: {
        ...settingsForm.notifications,
        [key]: !settingsForm.notifications[key]
      }
    })
  }

  // Handle save settings
  const handleSaveSettings = (e) => {
    e.preventDefault()
    updateUserProfile({
      name: settingsForm.name,
      email: settingsForm.email,
      phone: settingsForm.phone
    })
    alert('Settings saved successfully!')
  }

  // Tab definitions
  const tabs = [
    { id: 'bookings', label: 'My Bookings' },
    { id: 'favorites', label: 'Favorite Studios' },
    { id: 'settings', label: 'Account Settings' },
    { id: 'billing', label: 'Billing' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Card */}
          <aside className="lg:col-span-4">
            <Card className="p-6 sticky top-24">
              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <img
                  src={currentUser?.profileImage || 'https://randomuser.me/api/portraits/women/44.jpg'}
                  alt={currentUser?.name || 'User'}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-100"
                />

                {/* User Info */}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentUser?.name}</h2>
                <p className="text-gray-600 mb-1">{currentUser?.email}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Member since {formatDate(currentUser?.memberSince || '2024-01-15')}
                </p>

                {/* Edit Profile Button */}
                <Button
                  variant="outline"
                  size="medium"
                  className="w-full"
                  onClick={() => setActiveTab('settings')}
                >
                  Edit Profile
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">
                      {userBookings.filter(b => getBookingStatus(b) === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-600">Classes Taken</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">
                      {userBookings.filter(b => getBookingStatus(b) === 'upcoming').length}
                    </p>
                    <p className="text-sm text-gray-600">Upcoming</p>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Right Column - Tabbed Interface */}
          <main className="lg:col-span-8">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex flex-wrap gap-2 -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Tab 1: My Bookings */}
              {activeTab === 'bookings' && (
                <div>
                  {userBookings.length === 0 ? (
                    <EmptyState
                      icon="calendar"
                      title="No bookings yet"
                      message="Start exploring classes and book your first session!"
                      actionLabel="Browse Classes"
                      onAction={() => navigate('/discover')}
                    />
                  ) : (
                    <div className="space-y-4">
                      {userBookings.map((booking) => {
                        const classData = classes.find(c => c.id === booking.classId)
                        const studio = studios.find(s => s.id === classData?.studioId)
                        const status = booking.status === 'cancelled' ? 'cancelled' : getBookingStatus(booking)
                        const confirmationCode = `FC${booking.id.toString().padStart(6, '0')}`

                        if (!classData) return null

                        return (
                          <Card key={booking.id} className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">{classData.name}</h3>
                                  <Badge variant={getStatusBadgeVariant(status)}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </Badge>
                                </div>

                                <p className="text-gray-600 mb-2">{studio?.name}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(classData.date)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {formatTime(classData.time)}
                                  </span>
                                </div>

                                <p className="text-sm text-gray-500 mt-2">
                                  Booking Reference: <span className="font-mono font-medium">{confirmationCode}</span>
                                </p>
                              </div>

                              {status === 'upcoming' && (
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="small"
                                    onClick={() => handleCancelBooking(booking.id)}
                                  >
                                    Cancel Booking
                                  </Button>
                                </div>
                              )}
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Favorite Studios */}
              {activeTab === 'favorites' && (
                <div>
                  {favoriteStudios.length === 0 ? (
                    <EmptyState
                      icon="heart"
                      title="No favorite studios yet"
                      message="Save your favorite studios for quick access!"
                      actionLabel="Browse Studios"
                      onAction={() => navigate('/discover')}
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favoriteStudios.map((studio) => (
                        <Card key={studio.id} className="overflow-hidden">
                          <img
                            src={studio.imageUrl}
                            alt={studio.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{studio.name}</h3>
                              <button
                                onClick={() => handleRemoveFavorite(studio.id)}
                                className="text-error-600 hover:text-error-700"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {studio.location}
                              </span>
                            </p>

                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                              {studio.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm font-medium">{studio.rating}</span>
                                <span className="text-sm text-gray-500">({studio.reviewCount})</span>
                              </div>
                              <Badge variant="info">{studio.type}</Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Account Settings */}
              {activeTab === 'settings' && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>

                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={settingsForm.name}
                            onChange={handleSettingsChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={settingsForm.email}
                            onChange={handleSettingsChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={settingsForm.phone}
                            onChange={handleSettingsChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="medium"
                        onClick={() => alert('Password change modal would open here')}
                      >
                        Change Password
                      </Button>
                    </div>

                    {/* Notification Preferences */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>

                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settingsForm.notifications.emailReminders}
                            onChange={() => handleNotificationToggle('emailReminders')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Email Reminders</p>
                            <p className="text-sm text-gray-600">Receive email reminders about upcoming classes</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settingsForm.notifications.smsReminders}
                            onChange={() => handleNotificationToggle('smsReminders')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">SMS Reminders</p>
                            <p className="text-sm text-gray-600">Receive text message reminders before classes</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settingsForm.notifications.promotions}
                            onChange={() => handleNotificationToggle('promotions')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Promotions & Offers</p>
                            <p className="text-sm text-gray-600">Stay updated on special offers and new classes</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settingsForm.notifications.classUpdates}
                            onChange={() => handleNotificationToggle('classUpdates')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Class Updates</p>
                            <p className="text-sm text-gray-600">Get notified about changes to your booked classes</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="border-t pt-6">
                      <Button type="submit" variant="primary" size="large">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* Tab 4: Billing */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  {/* Payment Methods */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => alert('Add payment method modal would open here')}
                      >
                        Add Payment Method
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <svg className="w-8 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {method.type} ending in {method.last4}
                              </p>
                              <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {method.isDefault && (
                              <Badge variant="success">Default</Badge>
                            )}
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Transaction History */}
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h2>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Description</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-100">
                              <td className="py-4 px-4 text-sm text-gray-600">
                                {formatDate(transaction.date)}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-900">
                                {transaction.description}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-900 text-right font-medium">
                                ${transaction.amount.toFixed(2)}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <Badge variant={transaction.status === 'completed' ? 'success' : 'default'}>
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
