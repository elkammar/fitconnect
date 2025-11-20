import { useState, useEffect } from 'react'
import { Button, Badge, Card } from '../components/ui'
import { Spinner, StudioCardSkeleton, TableSkeleton } from '../components/LoadingStates'
import { classes, bookings, instructors, getClassesByStudio } from '../data/mockData'
import { seedDatabase, clearDatabase } from '../utils/seedDatabase'

/**
 * StudioDashboardPage Component
 *
 * Dashboard interface for studio owners to manage their classes, bookings, and analytics.
 * Features sidebar navigation and multiple tab views.
 */
export default function StudioDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isSeeding, setIsSeeding] = useState(false)

  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV

  // Simulate loading on mount and tab change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [activeTab])

  // Mock studio data (in real app, this would come from auth/context)
  const studioId = 1
  const studioName = "ZenFlow Yoga Studio"
  const studioClasses = getClassesByStudio(studioId)

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'classes', label: 'Classes', icon: 'calendar' },
    { id: 'bookings', label: 'Bookings', icon: 'list' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ]

  // Icon component
  const Icon = ({ name, className = "w-5 h-5" }) => {
    const icons = {
      home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
      calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      list: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />,
      chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    }
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[name]}
      </svg>
    )
  }

  // Stats for overview
  const stats = [
    { label: "Today's Classes", value: '5', icon: 'calendar', color: 'primary' },
    { label: 'Total Bookings This Week', value: '142', icon: 'list', color: 'secondary' },
    { label: 'Revenue This Month', value: '$12,450', icon: 'chart', color: 'success' },
    { label: 'Average Attendance', value: '87%', icon: 'chart', color: 'warning' }
  ]

  // Upcoming classes (next 5)
  const upcomingClasses = studioClasses.slice(0, 5)

  // Recent bookings
  const recentBookings = bookings.slice(0, 10)

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesStatus
  })

  // Handle database seeding (Dev mode only)
  const handleSeedDatabase = async () => {
    if (!window.confirm('⚠️ This will populate the database with mock data. Continue?')) {
      return
    }

    setIsSeeding(true)
    try {
      const results = await seedDatabase()
      alert(`✅ Database seeded successfully!\n\nStudios: ${results.studios.success}\nInstructors: ${results.instructors.success}\nClasses: ${results.classes.success}`)
    } catch (error) {
      alert(`❌ Error seeding database: ${error.message}`)
    } finally {
      setIsSeeding(false)
    }
  }

  // Handle database clearing (Dev mode only)
  const handleClearDatabase = async () => {
    if (!window.confirm('⚠️ DANGER: This will delete ALL data from the database. This cannot be undone. Continue?')) {
      return
    }

    if (!window.confirm('Are you ABSOLUTELY sure? All studios, instructors, and classes will be permanently deleted.')) {
      return
    }

    setIsSeeding(true)
    try {
      await clearDatabase()
      alert('✅ Database cleared successfully!')
    } catch (error) {
      alert(`❌ Error clearing database: ${error.message}`)
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 animate-fadeIn">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-lg fixed h-full flex flex-col">
        {/* Studio Logo/Name */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary-600">{studioName}</h2>
          <p className="text-sm text-gray-500 mt-1">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dev Tools Section (Only visible in development) */}
        {isDevelopment && (
          <div className="p-4 border-t border-gray-200 bg-warning-50">
            <div className="mb-3">
              <p className="text-xs font-semibold text-warning-800 uppercase tracking-wide">
                🛠️ Dev Tools
              </p>
              <p className="text-xs text-warning-600 mt-1">
                Database management
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                className="w-full px-3 py-2 bg-success-600 hover:bg-success-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSeeding ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Seeding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Seed Database
                  </>
                )}
              </button>
              <button
                onClick={handleClearDatabase}
                disabled={isSeeding}
                className="w-full px-3 py-2 bg-error-600 hover:bg-error-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Database
              </button>
            </div>
            <p className="text-xs text-warning-700 mt-2 italic">
              ⚠️ Only visible in dev mode
            </p>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">ST</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Studio Admin</p>
              <p className="text-xs text-gray-500">admin@studio.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-60 flex-1 p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <StudioCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                        <Icon name={stat.icon} className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Upcoming Classes */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Classes</h2>
              {loading ? (
                <TableSkeleton rows={5} columns={5} />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Class Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Instructor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Capacity</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingClasses.map(cls => {
                      const instructor = instructors.find(i => i.id === cls.instructorId)
                      return (
                        <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{cls.time}</td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{cls.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{instructor?.name}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={cls.currentCapacity >= cls.maxCapacity ? 'text-error-600' : 'text-gray-900'}>
                              {cls.currentCapacity}/{cls.maxCapacity}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="small">View</Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <Card className="p-6 lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
                <div className="space-y-3">
                  {recentBookings.map(booking => {
                    const cls = classes.find(c => c.id === booking.classId)
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">User #{booking.userId}</p>
                          <p className="text-sm text-gray-600">{cls?.name}</p>
                        </div>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'success' :
                          booking.status === 'waitlist' ? 'warning' : 'error'
                        }>
                          {booking.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="primary" size="medium" className="w-full">
                    Add New Class
                  </Button>
                  <Button variant="secondary" size="medium" className="w-full">
                    View All Bookings
                  </Button>
                  <Button variant="outline" size="medium" className="w-full">
                    Export Report
                  </Button>
                  <Button variant="outline" size="medium" className="w-full">
                    Manage Instructors
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Classes</h1>
                <p className="text-gray-600 mt-1">View and manage all your fitness classes</p>
              </div>
              <Button variant="primary" size="medium">
                Add New Class
              </Button>
            </div>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Class Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date & Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Instructor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Capacity</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studioClasses.map(cls => {
                      const instructor = instructors.find(i => i.id === cls.instructorId)
                      return (
                        <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{cls.name}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="info">{cls.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {cls.date} at {cls.time}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{instructor?.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {cls.currentCapacity}/{cls.maxCapacity}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">${cls.price}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button variant="ghost" size="small">Edit</Button>
                            <Button variant="ghost" size="small" className="text-error-600">Delete</Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
              <p className="text-gray-600 mt-1">View and manage all class bookings</p>
            </div>

            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="waitlist">Waitlist</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Button variant="outline" size="medium">
                  Export CSV
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Booking ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Class</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(booking => {
                      const cls = classes.find(c => c.id === booking.classId)
                      return (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">#{booking.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">User #{booking.userId}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{cls?.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{booking.bookingDate}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">${booking.amount}</td>
                          <td className="py-3 px-4">
                            <Badge variant={
                              booking.status === 'confirmed' ? 'success' :
                              booking.status === 'waitlist' ? 'warning' : 'error'
                            }>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="small">View Details</Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
              <p className="text-gray-600 mt-1">Track your studio's performance and growth</p>
            </div>

            {/* Time Period Selector */}
            <div className="flex justify-end">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Key Metrics Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <StudioCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <span className="text-xs text-success-600 font-medium bg-success-50 px-2 py-1 rounded">
                      +12.5%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">$24,850</p>
                  <p className="text-xs text-gray-500">vs. $22,100 last period</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <span className="text-xs text-success-600 font-medium bg-success-50 px-2 py-1 rounded">
                      +8.3%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">487</p>
                  <p className="text-xs text-gray-500">vs. 450 last period</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Avg. Class Size</p>
                    <span className="text-xs text-error-600 font-medium bg-error-50 px-2 py-1 rounded">
                      -2.1%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">18.2</p>
                  <p className="text-xs text-gray-500">vs. 18.6 last period</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Cancellation Rate</p>
                    <span className="text-xs text-success-600 font-medium bg-success-50 px-2 py-1 rounded">
                      -1.8%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">4.2%</p>
                  <p className="text-xs text-gray-500">vs. 6.0% last period</p>
                </Card>
              </div>
            )}

            {/* Revenue Chart */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
              <div className="h-64 flex items-end justify-between gap-2">
                {[
                  { label: 'Mon', value: 85, amount: '$2,890' },
                  { label: 'Tue', value: 72, amount: '$2,450' },
                  { label: 'Wed', value: 95, amount: '$3,230' },
                  { label: 'Thu', value: 68, amount: '$2,310' },
                  { label: 'Fri', value: 88, amount: '$2,990' },
                  { label: 'Sat', value: 100, amount: '$3,400' },
                  { label: 'Sun', value: 92, amount: '$3,130' }
                ].map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full mb-2">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.amount}
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500 cursor-pointer"
                        style={{ height: `${(day.value / 100) * 240}px` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{day.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Class Performance & Popular Times */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performing Classes */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Classes</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Morning Yoga Flow', bookings: 142, revenue: '$4,260', trend: '+15%' },
                    { name: 'HIIT Training', bookings: 128, revenue: '$3,840', trend: '+12%' },
                    { name: 'Evening Meditation', bookings: 98, revenue: '$2,940', trend: '+8%' },
                    { name: 'Power Pilates', bookings: 87, revenue: '$2,610', trend: '+5%' },
                    { name: 'Spin Class', bookings: 76, revenue: '$2,280', trend: '+3%' }
                  ].map((cls, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-bold text-sm">#{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{cls.name}</p>
                        <p className="text-sm text-gray-600">{cls.bookings} bookings • {cls.revenue}</p>
                      </div>
                      <span className="text-xs text-success-600 font-medium bg-success-50 px-2 py-1 rounded">
                        {cls.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Peak Hours */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Time Slots</h2>
                <div className="space-y-3">
                  {[
                    { time: '6:00 AM - 8:00 AM', percentage: 92, bookings: 156 },
                    { time: '8:00 AM - 10:00 AM', percentage: 78, bookings: 132 },
                    { time: '5:00 PM - 7:00 PM', percentage: 95, bookings: 161 },
                    { time: '7:00 PM - 9:00 PM', percentage: 68, bookings: 115 },
                    { time: '10:00 AM - 12:00 PM', percentage: 45, bookings: 76 },
                    { time: '12:00 PM - 2:00 PM', percentage: 38, bookings: 64 }
                  ].map((slot, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{slot.time}</span>
                        <span className="text-sm text-gray-600">{slot.bookings} bookings</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${slot.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Instructor Performance */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructor Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Instructor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Classes Taught</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg. Attendance</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Sarah Johnson', classes: 24, attendance: '22.5', rating: 4.9, revenue: '$7,200', trend: '+18%', trendUp: true },
                      { name: 'Mike Chen', classes: 22, attendance: '20.8', rating: 4.8, revenue: '$6,600', trend: '+12%', trendUp: true },
                      { name: 'Emma Davis', classes: 18, attendance: '18.2', rating: 4.7, revenue: '$5,400', trend: '+8%', trendUp: true },
                      { name: 'James Wilson', classes: 16, attendance: '16.5', rating: 4.6, revenue: '$4,800', trend: '-3%', trendUp: false }
                    ].map((instructor, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-semibold text-sm">
                                {instructor.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{instructor.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{instructor.classes}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{instructor.attendance}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-warning-500 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-900">{instructor.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{instructor.revenue}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            instructor.trendUp ? 'text-success-600 bg-success-50' : 'text-error-600 bg-error-50'
                          }`}>
                            {instructor.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Member Retention & Class Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Member Retention */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Member Retention</h2>
                <div className="flex items-center justify-center h-48">
                  <div className="relative w-48 h-48">
                    {/* Donut chart representation */}
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#e5e7eb"
                        strokeWidth="24"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#10b981"
                        strokeWidth="24"
                        fill="none"
                        strokeDasharray={`${(87 / 100) * 502.4} 502.4`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-4xl font-bold text-gray-900">87%</p>
                      <p className="text-sm text-gray-600">Retention Rate</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success-600">342</p>
                    <p className="text-xs text-gray-600">Active Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-error-600">51</p>
                    <p className="text-xs text-gray-600">Churned (30d)</p>
                  </div>
                </div>
              </Card>

              {/* Class Type Distribution */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Class Type Distribution</h2>
                <div className="space-y-4">
                  {[
                    { type: 'Yoga', percentage: 35, count: 87, color: 'bg-purple-500' },
                    { type: 'HIIT', percentage: 25, count: 62, color: 'bg-red-500' },
                    { type: 'Pilates', percentage: 20, count: 50, color: 'bg-pink-500' },
                    { type: 'Spin', percentage: 12, count: 30, color: 'bg-blue-500' },
                    { type: 'Meditation', percentage: 8, count: 20, color: 'bg-green-500' }
                  ].map((type, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                          <span className="text-sm font-medium text-gray-700">{type.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{type.count} classes</span>
                          <span className="text-sm font-semibold text-gray-900 w-12 text-right">{type.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${type.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <Card className="p-12 text-center">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
