import { supabase } from '../utils/supabaseClient'
import { ApiError } from '../utils/ApiError'

export const signup = async (email: string, password: string) => {

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return {
    message: 'Signup successful.',
    user: data.user,
  }
}

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // You can add more checks here to customize the error type
    throw new ApiError(401, error.message, 'AUTH_FAILED')
  }
  const { session } = data
  return {
    session,
    user: data.user,
  }
}
