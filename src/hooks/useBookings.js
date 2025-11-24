import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import useApp from './useApp'

/**
 * useBookings Hook
 *
 * Manages user bookings with create and cancel functionality
 * Returns { bookings, loading, error, createBooking, cancelBooking, refetch }
 */
export function useBookings() {
  const { currentUser } = useApp()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = async () => {
    if (!currentUser?.id) {
      setBookings([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          class:classes(
            *,
            studio:studios(*),
            instructor:instructors(*)
          )
        `)
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setBookings(data || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [currentUser?.id])

  /**
   * Create a new booking
   */
  const createBooking = async (classId) => {
    if (!currentUser?.id) {
      throw new Error('You must be logged in to book a class')
    }

    try {
      // Check if class is full
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('current_capacity, max_capacity, price')
        .eq('id', classId)
        .single()

      if (classError) throw classError

      if (classData.current_capacity >= classData.max_capacity) {
        throw new Error('This class is full')
      }

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: currentUser.id,
            class_id: classId,
            status: 'confirmed',
            payment_status: 'paid',
            amount: classData.price
          }
        ])
        .select()
        .single()

      if (bookingError) throw bookingError

      // Update class capacity
      const { error: updateError } = await supabase
        .from('classes')
        .update({ current_capacity: classData.current_capacity + 1 })
        .eq('id', classId)

      if (updateError) throw updateError

      // Refresh bookings
      await fetchBookings()

      return booking
    } catch (err) {
      console.error('Error creating booking:', err)
      throw err
    }
  }

  /**
   * Cancel a booking
   */
  const cancelBooking = async (bookingId) => {
    try {
      // Get booking details
      const { data: booking, error: getError } = await supabase
        .from('bookings')
        .select('class_id, classes(current_capacity)')
        .eq('id', bookingId)
        .single()

      if (getError) throw getError

      // Update booking status
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)

      if (updateError) throw updateError

      // Decrease class capacity
      const { error: capacityError } = await supabase
        .from('classes')
        .update({ current_capacity: booking.classes.current_capacity - 1 })
        .eq('id', booking.class_id)

      if (capacityError) throw capacityError

      // Refresh bookings
      await fetchBookings()
    } catch (err) {
      console.error('Error cancelling booking:', err)
      throw err
    }
  }

  return {
    bookings,
    loading,
    error,
    createBooking,
    cancelBooking,
    refetch: fetchBookings
  }
}

/**
 * useStudioBookings Hook
 *
 * Fetches bookings for a specific studio (for studio dashboard)
 */
export function useStudioBookings(studioId) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = async () => {
    if (!studioId) {
      setBookings([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          user:users(*),
          class:classes!inner(
            *,
            studio:studios!inner(*)
          )
        `)
        .eq('class.studio.id', studioId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setBookings(data || [])
    } catch (err) {
      console.error('Error fetching studio bookings:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [studioId])

  return { bookings, loading, error, refetch: fetchBookings }
}
