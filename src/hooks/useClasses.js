import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
import { classes as mockClasses } from '../data/mockData'

/**
 * useClasses Hook
 *
 * Returns mock classes data with optional filters
 * Returns { classes, loading, error, refetch }
 */
export function useClasses(filters = {}) {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchClasses = async () => {
    try {
      setLoading(true)
      setError(null)

      // USING MOCK DATA
      let result = [...mockClasses]

      // Apply filters
      if (filters.type && filters.type.length > 0) {
        result = result.filter(c => filters.type.includes(c.type))
      }

      if (filters.difficulty) {
        result = result.filter(c => c.difficulty === filters.difficulty)
      }

      if (filters.studioId) {
        result = result.filter(c => c.studio?.id === filters.studioId)
      }

      if (filters.instructorId) {
        result = result.filter(c => c.instructor?.id === filters.instructorId)
      }

      if (filters.date) {
        result = result.filter(c => c.date === filters.date)
      }

      if (filters.minPrice) {
        result = result.filter(c => c.price >= filters.minPrice)
      }

      if (filters.maxPrice) {
        result = result.filter(c => c.price <= filters.maxPrice)
      }

      // Apply search term if provided
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        result = result.filter(c =>
          c.name.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          c.type.toLowerCase().includes(term)
        )
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'time':
            result.sort((a, b) => a.time.localeCompare(b.time))
            break
          case 'price':
            result.sort((a, b) => a.price - b.price)
            break
          case 'popularity':
            result.sort((a, b) => b.currentCapacity - a.currentCapacity)
            break
          default:
            result.sort((a, b) => {
              const dateCompare = a.date.localeCompare(b.date)
              if (dateCompare !== 0) return dateCompare
              return a.time.localeCompare(b.time)
            })
        }
      } else {
        // Default sort by date and time
        result.sort((a, b) => {
          const dateCompare = a.date.localeCompare(b.date)
          if (dateCompare !== 0) return dateCompare
          return a.time.localeCompare(b.time)
        })
      }

      setClasses(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [
    filters.type?.join(','),
    filters.difficulty,
    filters.studioId,
    filters.instructorId,
    filters.date,
    filters.minPrice,
    filters.maxPrice,
    filters.searchTerm,
    filters.sortBy
  ])

  return { classes, loading, error, refetch: fetchClasses }
}

/**
 * useClass Hook
 *
 * Fetches a single class by ID from mock data
 */
export function useClass(classId) {
  const [classData, setClassData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClass = async () => {
      try {
        setLoading(true)
        setError(null)

        // USING MOCK DATA
        const data = mockClasses.find(c => c.id === parseInt(classId))

        if (!data) {
          throw new Error('Class not found')
        }

        setClassData(data)
      } catch (err) {
        console.error('Error fetching class:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (classId) {
      fetchClass()
    }
  }, [classId])

  return { classData, loading, error }
}
