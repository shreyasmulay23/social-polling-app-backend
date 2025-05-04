import { createClient } from '@supabase/supabase-js'

export const getSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log(supabaseKey)
    console.log(supabaseKey)
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_KEY in environment variables.'
    )
  }

  return createClient(supabaseUrl, supabaseKey)
}
