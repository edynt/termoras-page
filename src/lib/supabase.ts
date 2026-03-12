import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Feedback feature will not work.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface Feedback {
  name: string
  rating: number
  message: string
}

export async function submitFeedback(feedback: Feedback) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('feedback').insert(feedback)
  if (error) throw error
}
