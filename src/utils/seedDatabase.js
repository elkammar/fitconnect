/**
 * Database Seeding Utility for FitConnect
 *
 * ⚠️ WARNING: This script should only be run ONCE to populate the database with initial data.
 * Running it multiple times will create duplicate entries.
 *
 * This script:
 * 1. Imports mock data from src/data/mockData.js
 * 2. Transforms the data to match Supabase schema
 * 3. Inserts studios, instructors, and classes in order
 * 4. Maintains relationships between entities using ID mappings
 * 5. Handles errors gracefully and logs progress
 *
 * Usage:
 * - Click the "Seed Database" button in Studio Dashboard (dev mode only)
 * - Or call seedDatabase() directly from console
 */

import { createClient } from '@supabase/supabase-js'
import { studios, instructors, classes } from '../data/mockData'

// ⚠️ SECURITY WARNING: Using anon key for seeding!
// 🚨 This requires RLS to be temporarily DISABLED on tables
// 🚨 NEVER do this in production - only for development seeding!
// ℹ️ Note: I would NEVER do this in a real production application - only for development purposes!

// BEFORE running seed: Run disable-rls.sql in Supabase SQL Editor
// AFTER seeding complete: Run enable-rls.sql to re-enable security

/**
 * Create a Supabase client for seeding (only when needed)
 * This is separate from the main app client to avoid conflicts
 */
function createSeedClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  console.log('🔍 Checking environment variables...')
  console.log('Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.log('Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing')

  if (!supabaseAnonKey) {
    console.error('❌ VITE_SUPABASE_ANON_KEY is not set!')
    throw new Error('Anon key is required for seeding')
  }

  // Create Supabase client with anon key
  // NOTE: RLS must be DISABLED on tables for this to work!
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('✅ Supabase client created (using anon key - RLS must be disabled!)')
  console.log('⚠️  IMPORTANT: Make sure you ran disable-rls.sql before seeding!')

  return supabase
}

/**
 * Seed the entire database with mock data
 */
export async function seedDatabase() {
  console.log('🌱 Starting database seeding...')
  console.log('⚠️  WARNING: This will insert new data into your database!')

  // Create client only when seeding
  const supabase = createSeedClient()

  const results = {
    studios: { success: 0, failed: 0, ids: {} },
    instructors: { success: 0, failed: 0, ids: {} },
    classes: { success: 0, failed: 0, ids: {} },
    errors: []
  }

  try {
    // Step 1: Seed Studios
    console.log('\n📍 Seeding studios...')
    const studioResults = await seedStudios()
    results.studios = studioResults
    console.log(`✅ Studios: ${studioResults.success} inserted, ${studioResults.failed} failed`)

    // Step 2: Seed Instructors
    console.log('\n👨‍🏫 Seeding instructors...')
    const instructorResults = await seedInstructors(studioResults.ids)
    results.instructors = instructorResults
    console.log(`✅ Instructors: ${instructorResults.success} inserted, ${instructorResults.failed} failed`)

    // Step 3: Seed Classes
    console.log('\n📚 Seeding classes...')
    const classResults = await seedClasses(studioResults.ids, instructorResults.ids)
    results.classes = classResults
    console.log(`✅ Classes: ${classResults.success} inserted, ${classResults.failed} failed`)

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('🎉 Database seeding complete!')
    console.log('='.repeat(50))
    console.log(`Total Studios: ${results.studios.success}/${studios.length}`)
    console.log(`Total Instructors: ${results.instructors.success}/${instructors.length}`)
    console.log(`Total Classes: ${results.classes.success}/${classes.length}`)

    if (results.errors.length > 0) {
      console.log(`\n⚠️  ${results.errors.length} errors occurred:`)
      results.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`)
      })
    }

    return results
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error)
    throw error
  }
}

/**
 * Seed studios table
 */
async function seedStudios() {
  const results = { success: 0, failed: 0, ids: {}, errors: [] }

  for (const studio of studios) {
    try {
      // Transform mock data to match Supabase schema
      const studioData = {
        name: studio.name,
        description: studio.description,
        location: studio.location,
        phone: studio.phone,
        email: studio.email,
        image_url: studio.imageUrl,
        type: [studio.type], // Convert single type to array
        rating: studio.rating,
        review_count: studio.reviewCount,
        amenities: studio.amenities,
        is_active: true
      }

      // Insert studio
      const { data, error } = await supabase
        .from('studios')
        .insert([studioData])
        .select('id')
        .single()

      if (error) {
        console.error(`❌ Failed to insert studio "${studio.name}":`, error.message)
        results.failed++
        results.errors.push(`Studio "${studio.name}": ${error.message}`)
      } else {
        // Map old ID to new UUID
        results.ids[studio.id] = data.id
        results.success++
        console.log(`✓ Inserted studio: ${studio.name} (${studio.id} → ${data.id})`)
      }
    } catch (error) {
      console.error(`❌ Exception inserting studio "${studio.name}":`, error)
      results.failed++
      results.errors.push(`Studio "${studio.name}": ${error.message}`)
    }
  }

  return results
}

/**
 * Seed instructors table
 */
async function seedInstructors(studioIdMap) {
  const results = { success: 0, failed: 0, ids: {}, errors: [] }

  for (const instructor of instructors) {
    try {
      // Get the UUID for the studio
      const studioUuid = studioIdMap[instructor.studioId]

      if (!studioUuid) {
        console.error(`❌ Studio ID ${instructor.studioId} not found for instructor "${instructor.name}"`)
        results.failed++
        results.errors.push(`Instructor "${instructor.name}": Studio not found`)
        continue
      }

      // Transform mock data to match Supabase schema
      const instructorData = {
        studio_id: studioUuid,
        name: instructor.name,
        bio: instructor.bio,
        profile_image_url: instructor.imageUrl,
        specialties: instructor.specialties,
        certifications: instructor.certifications,
        years_experience: instructor.yearsExperience,
        rating: instructor.rating,
        is_active: true
      }

      // Insert instructor
      const { data, error } = await supabase
        .from('instructors')
        .insert([instructorData])
        .select('id')
        .single()

      if (error) {
        console.error(`❌ Failed to insert instructor "${instructor.name}":`, error.message)
        results.failed++
        results.errors.push(`Instructor "${instructor.name}": ${error.message}`)
      } else {
        // Map old ID to new UUID
        results.ids[instructor.id] = data.id
        results.success++
        console.log(`✓ Inserted instructor: ${instructor.name} (${instructor.id} → ${data.id})`)
      }
    } catch (error) {
      console.error(`❌ Exception inserting instructor "${instructor.name}":`, error)
      results.failed++
      results.errors.push(`Instructor "${instructor.name}": ${error.message}`)
    }
  }

  return results
}

/**
 * Seed classes table
 */
async function seedClasses(studioIdMap, instructorIdMap) {
  const results = { success: 0, failed: 0, ids: {}, errors: [] }

  for (const classData of classes) {
    try {
      // Get the UUIDs for studio and instructor
      const studioUuid = studioIdMap[classData.studioId]
      const instructorUuid = instructorIdMap[classData.instructorId]

      if (!studioUuid) {
        console.error(`❌ Studio ID ${classData.studioId} not found for class "${classData.name}"`)
        results.failed++
        results.errors.push(`Class "${classData.name}": Studio not found`)
        continue
      }

      if (!instructorUuid) {
        console.error(`❌ Instructor ID ${classData.instructorId} not found for class "${classData.name}"`)
        results.failed++
        results.errors.push(`Class "${classData.name}": Instructor not found`)
        continue
      }

      // Transform mock data to match Supabase schema
      const transformedClassData = {
        studio_id: studioUuid,
        instructor_id: instructorUuid,
        name: classData.name,
        description: classData.description,
        type: classData.type,
        difficulty: classData.difficulty,
        duration: classData.duration,
        date: classData.date,
        time: classData.time,
        price: classData.price,
        current_capacity: classData.currentCapacity,
        max_capacity: classData.maxCapacity,
        image_url: classData.imageUrl,
        is_active: true
      }

      // Insert class
      const { data, error } = await supabase
        .from('classes')
        .insert([transformedClassData])
        .select('id')
        .single()

      if (error) {
        console.error(`❌ Failed to insert class "${classData.name}":`, error.message)
        results.failed++
        results.errors.push(`Class "${classData.name}": ${error.message}`)
      } else {
        // Map old ID to new UUID
        results.ids[classData.id] = data.id
        results.success++
        console.log(`✓ Inserted class: ${classData.name} (${classData.id} → ${data.id})`)
      }
    } catch (error) {
      console.error(`❌ Exception inserting class "${classData.name}":`, error)
      results.failed++
      results.errors.push(`Class "${classData.name}": ${error.message}`)
    }
  }

  return results
}

/**
 * Clear all seeded data (DANGER: Use with caution!)
 * This function is useful for testing the seeding process
 */
export async function clearDatabase() {
  console.log('🗑️  WARNING: Clearing all data from database...')

  try {
    // Delete in reverse order due to foreign key constraints
    const { error: classesError } = await supabase
      .from('classes')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (classesError) throw classesError

    const { error: instructorsError } = await supabase
      .from('instructors')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (instructorsError) throw instructorsError

    const { error: studiosError } = await supabase
      .from('studios')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (studiosError) throw studiosError

    console.log('✅ Database cleared successfully')
    return { success: true }
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    throw error
  }
}
