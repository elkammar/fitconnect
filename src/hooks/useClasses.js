import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * useClasses Hook
 *
 * Fetches classes from Supabase with optional filters
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

      // Execute query
      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

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
