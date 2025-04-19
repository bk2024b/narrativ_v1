// lib/saveStory.js
import { supabase } from './supabase'

export const saveStory = async ({ userId, raw_text, improved_text }) => {
  const { data, error } = await supabase
    .from('stories')
    .insert([{ user_id: userId, raw_text, improved_text }])

  if (error) throw error
  return data[0]
}
