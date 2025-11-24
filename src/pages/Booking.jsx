import { useParams } from 'react-router-dom'

export default function Booking() {
  const { classId } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Class</h1>
          <p className="text-gray-600 mb-8">Class ID: {classId}</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
              <p className="text-gray-600">Complete your booking for this fitness class.</p>
            </div>

            {/* Placeholder for booking form */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-500 italic">Booking flow will be implemented here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
