// app/story/[id]/page.jsx
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ShareStoryButton from '@/components/story/ShareStoryButton'

export async function generateMetadata({ params }) {
  const { id } = params
  
  const { data: story, error } = await supabase
    .from('stories')
    .select('*, profiles:user_id(*)')
    .eq('id', id)
    .single()
  
  if (error || !story) {
    return {
      title: 'Histoire non trouvée',
      description: 'L\'histoire que vous recherchez n\'existe pas.',
    }
  }
  
  const profile = story.profiles
  const title = `L'histoire inspirante de ${profile.prenoms} ${profile.nom}`
  const description = story.improved_text 
    ? `${story.improved_text.substring(0, 160)}...` 
    : `Découvrez l'histoire inspirante de ${profile.prenoms} ${profile.nom}`
  
  // URL absolue pour l'image OG spécifique à l'histoire
  const ogImageUrl = new URL(`/api/og/story?id=${id}`, process.env.NEXT_PUBLIC_BASE_URL).toString()
  
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
          alt: `Histoire de ${profile.prenoms} ${profile.nom}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function StoryPage({ params }) {
  const { id } = params
  
  const { data: story, error } = await supabase
    .from('stories')
    .select('*, profiles:user_id(*)')
    .eq('id', id)
    .single()
  
  if (error || !story) {
    return notFound()
  }
  
  const profile = story.profiles
  
  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <Link href={`/profile/${profile.id}`} className="text-blue-500 hover:underline">
          ← Retour au profil
        </Link>
      </div>
      
      <article className="space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">L'histoire de {profile.prenoms} {profile.nom}</h1>
          <p className="text-muted-foreground">{profile.profession}</p>
        </header>
        
        <div className="border-t border-b py-8">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{story.improved_text}</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ShareStoryButton story={story} profile={profile} />
        </div>
      </article>
    </main>
  )
}