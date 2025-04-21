// lib/saveStory.js
import { supabase } from './supabase'

/**
 * Sauvegarde une histoire dans la base de données
 * @param {Object} params - Paramètres de l'histoire
 * @param {string} params.userId - ID de l'utilisateur
 * @param {string} params.raw_text - Texte brut de l'histoire
 * @param {string} params.improved_text - Texte amélioré de l'histoire
 * @returns {Promise} - Promesse résolue avec les données ou rejetée avec une erreur
 */
export async function saveStory({ userId, raw_text, improved_text }) {
  if (!userId) {
    throw new Error('ID utilisateur requis')
  }

  // Vérifier si une histoire existe déjà pour cet utilisateur
  const { data: existingStory } = await supabase
    .from('stories')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle()

  // Soit mettre à jour l'histoire existante, soit en créer une nouvelle
  const { data, error } = await supabase
    .from('stories')
    .upsert(
      {
        user_id: userId,
        content: raw_text,
        improved_text: improved_text,
        ...(existingStory?.id ? { id: existingStory.id } : {})
      },
      { onConflict: 'id' }
    )

  if (error) {
    console.error('Erreur lors de la sauvegarde de l\'histoire:', error)
    throw error
  }

  return data
}