import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button, Card } from '../components/ui'

/**
 * DatabaseTestPage - Simple page to test Supabase connection
 * Visit at /db-test to diagnose connection issues
 */
export default function DatabaseTestPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const addResult = (test, status, message, data = null) => {
    setResults(prev => [...prev, {
      test,
      status,
      message,
      data,
      timestamp: new Date().toISOString()
    }])
  }

  const runTests = async () => {
    setResults([])
    setLoading(true)

    try {
      // Test 1: Client initialization
      console.log('🧪 Test 1: Checking Supabase client...')
      addResult('Client Init', 'running', 'Checking Supabase client initialization...')

      if (!supabase) {
        addResult('Client Init', 'fail', 'Supabase client is undefined')
        return
      }

      // Check environment variables
      const url = import.meta.env.VITE_SUPABASE_URL
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY

      console.log('Supabase URL:', url)
      console.log('Anon Key:', key ? 'Set (length: ' + key.length + ')' : 'Missing')

      addResult('Client Init', 'pass', 'Supabase client initialized', {
        client: !!supabase,
        url: url,
        keyLength: key?.length
      })

      // Test 2: Simple count query with timeout
      console.log('🧪 Test 2: Running count query...')
      addResult('Count Query', 'running', 'SELECT count FROM classes (10s timeout)...')

      const countStart = Date.now()

      // Add timeout wrapper
      const countPromise = supabase
        .from('classes')
        .select('*', { count: 'exact', head: true })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout after 10 seconds')), 10000)
      )

      try {
        const { count, error: countError } = await Promise.race([countPromise, timeoutPromise])
        const countDuration = Date.now() - countStart

        if (countError) {
          addResult('Count Query', 'fail', `Error: ${countError.message}`, countError)
          console.error('Count error:', countError)
        } else {
          addResult('Count Query', 'pass', `Found ${count} classes in ${countDuration}ms`, { count, duration: countDuration })
          console.log('Count success:', count)
        }
      } catch (timeoutError) {
        const countDuration = Date.now() - countStart
        addResult('Count Query', 'fail', `Query timed out after ${countDuration}ms`, { error: timeoutError.message })
        console.error('Count timeout:', timeoutError)
      }

      // Test 3: Simple select query (limit 1)
      console.log('🧪 Test 3: Running simple select query...')
      addResult('Select Query', 'running', 'SELECT * FROM classes LIMIT 1...')

      const selectStart = Date.now()
      const { data: selectData, error: selectError } = await supabase
        .from('classes')
        .select('*')
        .limit(1)

      const selectDuration = Date.now() - selectStart

      if (selectError) {
        addResult('Select Query', 'fail', `Error: ${selectError.message}`, selectError)
        console.error('Select error:', selectError)
      } else {
        addResult('Select Query', 'pass', `Retrieved ${selectData?.length || 0} record in ${selectDuration}ms`, selectData)
        console.log('Select success:', selectData)
      }

      // Test 4: Query with filter
      console.log('🧪 Test 4: Running filtered query...')
      addResult('Filtered Query', 'running', 'SELECT * FROM classes WHERE is_active = true LIMIT 5...')

      const filterStart = Date.now()
      const { data: filterData, error: filterError } = await supabase
        .from('classes')
        .select('*')
        .eq('is_active', true)
        .limit(5)

      const filterDuration = Date.now() - filterStart

      if (filterError) {
        addResult('Filtered Query', 'fail', `Error: ${filterError.message}`, filterError)
        console.error('Filter error:', filterError)
      } else {
        addResult('Filtered Query', 'pass', `Retrieved ${filterData?.length || 0} active classes in ${filterDuration}ms`, filterData)
        console.log('Filter success:', filterData)
      }

      // Test 5: Check RLS status
      console.log('🧪 Test 5: Checking table access...')
      addResult('RLS Check', 'running', 'Checking if anonymous users can access tables...')

      const { data: rlsData, error: rlsError } = await supabase
        .from('classes')
        .select('id, name')
        .limit(3)

      if (rlsError) {
        if (rlsError.code === '42501' || rlsError.message.includes('policy')) {
          addResult('RLS Check', 'fail', 'RLS is blocking queries. Need to add SELECT policies.', rlsError)
        } else {
          addResult('RLS Check', 'fail', `Error: ${rlsError.message}`, rlsError)
        }
      } else {
        addResult('RLS Check', 'pass', `RLS allows anonymous reads. Retrieved ${rlsData?.length || 0} classes.`, rlsData)
      }

    } catch (err) {
      console.error('Test suite error:', err)
      addResult('Test Suite', 'fail', `Unexpected error: ${err.message}`, err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800 border-green-300'
      case 'fail': return 'bg-red-100 text-red-800 border-red-300'
      case 'running': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return '✅'
      case 'fail': return '❌'
      case 'running': return '⏳'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Supabase Connection Test
          </h1>
          <p className="text-gray-600 mb-6">
            This page runs a series of tests to verify the Supabase database connection.
          </p>

          <Button
            onClick={runTests}
            disabled={loading}
            className="mb-6"
          >
            {loading ? 'Running Tests...' : 'Run Connection Tests'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Test Results</h2>

              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getStatusIcon(result.status)}</span>
                        <h3 className="font-bold text-lg">{result.test}</h3>
                      </div>
                      <p className="text-sm mb-2">{result.message}</p>

                      {result.data && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium">
                            View Details
                          </summary>
                          <pre className="mt-2 p-3 bg-white rounded text-xs overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Summary</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>Total Tests: {results.length}</p>
                  <p>Passed: {results.filter(r => r.status === 'pass').length}</p>
                  <p>Failed: {results.filter(r => r.status === 'fail').length}</p>
                  <p>Running: {results.filter(r => r.status === 'running').length}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
