import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import ClassCard from '../components/ClassCard'
import { ClassCardSkeleton } from '../components/LoadingStates'
import { EmptyState } from '../components/ErrorStates'
import { useClasses } from '../hooks/useClasses'

/**
 * DiscoverPage Component
 *
 * Main class discovery interface with filtering, searching, and sorting capabilities.
 * Features a sidebar with filters and a main grid displaying matching classes.
 * Now using mock data!
 */
export default function DiscoverPage() {
  const navigate = useNavigate()

  // State for filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [sortBy, setSortBy] = useState('time')

  // Available class types
  const classTypes = ['Yoga', 'Pilates', 'Cycling', 'Boxing', 'Dance', 'HIIT', 'Barre', 'Martial Arts', 'Strength Training', 'Meditation']

  // Fetch classes with filters using custom hook
  const { classes: filteredClasses, loading, error } = useClasses({
    searchTerm,
    type: selectedTypes,
    difficulty: selectedDifficulty,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    date: selectedDate,
    sortBy
  })

  // Handle type checkbox change
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedTypes([])
    setSelectedDifficulty('')
    setMinPrice('')
    setMaxPrice('')
    setSelectedDate('')
    setSortBy('time')
  }

  // Handle class booking
  const handleBookClass = (classData) => {
    navigate(`/booking/${classData.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Filters */}
          <aside className="lg:w-1/5 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>

              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Class Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Type
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {classTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        checked={selectedDifficulty === (level === 'All' ? '' : level)}
                        onChange={() => setSelectedDifficulty(level === 'All' ? '' : level)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Clear Filters Button */}
              <Button
                variant="outline"
                size="medium"
                onClick={handleClearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </Card>
          </aside>

          {/* Right Panel - Class Grid */}
          <main className="lg:w-4/5">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Discover Classes</h1>
                {!loading && (
                  <p className="text-gray-600 mt-1">
                    Showing {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'}
                  </p>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="time">Time</option>
                  <option value="price">Price</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Error loading classes</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ClassCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredClasses.length === 0 ? (
              /* Empty State */
              <EmptyState
                icon="search"
                title="No classes found"
                message="Try adjusting your filters or search term to find more classes"
                actionLabel="Clear Filters"
                onAction={handleClearFilters}
              />
            ) : (
              /* Class Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((classData) => (
                  <ClassCard
                    key={classData.id}
                    classData={classData}
                    studioData={classData.studio}
                    instructorData={classData.instructor}
                    onBookClick={handleBookClass}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
