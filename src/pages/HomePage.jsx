import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import ClassCard from '../components/ClassCard'
import { classes, studios, instructors } from '../data/mockData'

/**
 * HomePage Component
 *
 * Landing page for FitConnect featuring hero section, how it works,
 * featured classes, and statistics.
 */
export default function HomePage() {
  const navigate = useNavigate()

  // Get 6 most popular classes (those with higher current capacity)
  const featuredClasses = classes
    .sort((a, b) => b.currentCapacity - a.currentCapacity)
    .slice(0, 6)

  // Handle class booking
  const handleBookClass = (classData) => {
    navigate(`/booking/${classData.id}`)
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/discover')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Fitness Classes
            <span className="block text-primary-600">Near You</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book classes at local studios with ease
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search classes..."
                className="flex-1 px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button type="submit" variant="primary" size="large" className="sm:w-auto w-full">
                Search
              </Button>
            </div>
          </form>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate('/discover')}
            className="text-lg px-8"
          >
            Explore Classes
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Get started with FitConnect in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Discover */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Discover</h3>
              <p className="text-gray-600">
                Browse hundreds of fitness classes at local studios near you
              </p>
            </Card>

            {/* Step 2: Book */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Book</h3>
              <p className="text-gray-600">
                Reserve your spot instantly with just a few clicks
              </p>
            </Card>

            {/* Step 3: Attend */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Attend</h3>
              <p className="text-gray-600">
                Show up and enjoy your class - it's that simple!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Featured Classes
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Popular classes that our community loves
          </p>

          {/* Class Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredClasses.map((classData) => {
              const studio = studios.find((s) => s.id === classData.studioId)
              const instructor = instructors.find((i) => i.id === classData.instructorId)

              return (
                <ClassCard
                  key={classData.id}
                  classData={classData}
                  studioData={studio}
                  instructorData={instructor}
                  onBookClick={handleBookClass}
                />
              )
            })}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="large"
              onClick={() => navigate('/discover')}
            >
              View All Classes
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Studios */}
            <div className="p-6">
              <div className="text-5xl sm:text-6xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-xl text-gray-600">Studios</div>
            </div>

            {/* Classes */}
            <div className="p-6">
              <div className="text-5xl sm:text-6xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-xl text-gray-600">Classes</div>
            </div>

            {/* Members */}
            <div className="p-6">
              <div className="text-5xl sm:text-6xl font-bold text-primary-600 mb-2">
                10,000+
              </div>
              <div className="text-xl text-gray-600">Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Join thousands of members discovering the best fitness classes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="large"
              onClick={() => navigate('/discover')}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Browse Classes
            </Button>
            <Button
              variant="outline"
              size="large"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
