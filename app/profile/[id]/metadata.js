// app/profile/[id]/metadata.js
import { supabase } from '@/lib/supabase'

export async function generateMetadata({ params }) {
  const { id } = params
  
  // Récupérer les données du profil
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error || !profile) {
    return {
      title: 'Profil non trouvé',
      description: 'Le profil que vous recherchez n\'existe pas.',
    }
  }
  
  const { nom, prenoms, profession, bio } = profile
  const title = `${prenoms} ${nom} - ${profession}`
  const description = bio || `Découvrez l'histoire inspirante de ${prenoms} ${nom}, ${profession}.`
  
  // URL absolue pour l'image OG
  const ogImageUrl = new URL(`/api/og?id=${id}`, process.env.NEXT_PUBLIC_BASE_URL).toString()
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Profil de ${prenoms} ${nom}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@votre_compte_twitter',
    },
  }
}