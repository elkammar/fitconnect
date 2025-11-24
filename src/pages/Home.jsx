import { Link } from 'react-router-dom'

export default function Home() {
  const featuredClasses = [
    { id: 'yoga-101', name: 'Yoga 101', instructor: 'Sarah Johnson', time: '9:00 AM' },
    { id: 'hiit-training', name: 'HIIT Training', instructor: 'Mike Chen', time: '6:00 PM' },
    { id: 'pilates-basics', name: 'Pilates Basics', instructor: 'Emma Wilson', time: '11:00 AM' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FitConnect</h1>
          <p className="text-xl text-gray-600">Your fitness journey starts here</p>
        </div>

        {/* Featured Classes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{classItem.name}</h3>
                <p className="text-gray-600 mb-1">Instructor: {classItem.instructor}</p>
                <p className="text-gray-600 mb-4">Time: {classItem.time}</p>
                <Link
                  to={`/booking/${classItem.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
