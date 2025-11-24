import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { classes as mockClasses } from '../data/mockData'

/**
 * useClasses Hook
 *
 * Fetches classes from Supabase with optional filters
 * Falls back to mock data if Supabase is not available
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

      // Check if Supabase is available
      if (!supabase) {
        console.warn('⚠️ Supabase not available, using mock data')
        // Use mock data with client-side filtering
        let result = [...mockClasses]

        // Apply filters (same logic as before)
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
              result.sort((a, b) => (b.currentCapacity || 0) - (a.currentCapacity || 0))
              break
            default:
              result.sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date)
                if (dateCompare !== 0) return dateCompare
                return a.time.localeCompare(b.time)
              })
          }
        } else {
          result.sort((a, b) => {
            const dateCompare = a.date.localeCompare(b.date)
            if (dateCompare !== 0) return dateCompare
            return a.time.localeCompare(b.time)
          })
        }

        setClasses(result)
        setLoading(false)
        return
      }

      // Start building the query
      let query = supabase
        .from('classes')
        .select(`
          *,
          studio:studios(*),
          instructor:instructors(*)
        `)

      // Apply filters
      if (filters.type && filters.type.length > 0) {
        query = query.in('type', filters.type)
      }

      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty)
      }

      if (filters.studioId) {
        query = query.eq('studio_id', filters.studioId)
      }

      if (filters.instructorId) {
        query = query.eq('instructor_id', filters.instructorId)
      }

      if (filters.date) {
        query = query.eq('date', filters.date)
      }

      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
      }

      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }

      // Execute query with timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout - falling back to mock data')), 5000)
      )

      const { data, error: fetchError } = await Promise.race([query, timeoutPromise])

      if (fetchError) {
        console.warn('Supabase query failed, falling back to mock data:', fetchError.message)
        throw fetchError
      }

      let result = data || []

      // Apply search term (client-side for simplicity)
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
            result.sort((a, b) => b.current_capacity - a.current_capacity)
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
      console.error('Error fetching classes:', err)
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
 * Fetches a single class by ID from Supabase
 * Falls back to mock data if Supabase is not available
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

        // Check if Supabase is available
        if (!supabase) {
          console.warn('⚠️ Supabase not available, using mock data')
          const data = mockClasses.find(c => c.id === parseInt(classId))

          if (!data) {
            throw new Error('Class not found')
          }

          setClassData(data)
          setLoading(false)
          return
        }

        // Fetch from Supabase
        const { data, error: fetchError } = await supabase
          .from('classes')
          .select(`
            *,
            studio:studios(*),
            instructor:instructors(*)
          `)
          .eq('id', classId)
          .single()

        if (fetchError) throw fetchError

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
