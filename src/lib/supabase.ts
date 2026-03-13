import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Feedback feature will not work.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type FeedbackStatus = 'pending' | 'resolved'

export interface Feedback {
  name: string
  rating: number
  message: string
}

export interface FeedbackRow extends Feedback {
  id: string
  status: FeedbackStatus
  created_at: string
}

export async function submitFeedback(feedback: Feedback) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('feedback').insert(feedback)
  if (error) throw error
}

// Public fetch (requires RLS SELECT policy for anon)
export async function fetchPublicFeedbacks() {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase
    .from('feedback')
    .select('id, name, rating, message, status, created_at')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as FeedbackRow[]
}

// Admin functions (require authenticated session)

export async function fetchFeedbacks() {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as FeedbackRow[]
}

export async function updateFeedbackStatus(id: string, status: FeedbackStatus) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase
    .from('feedback')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

export async function deleteFeedback(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase
    .from('feedback')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Auth helpers

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut() {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
