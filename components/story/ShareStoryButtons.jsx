// components/story/ShareStoryButtons.jsx
import SocialShareButtons from '../share/SocialShareButtons'

export default function ShareStoryButtons({ story, profile }) {
  if (!story || !story.id || !profile) return null
  
  // Construire l'URL complète de l'histoire
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/story/${story.id}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/story/${story.id}`
  
  const title = `L'histoire inspirante de ${profile.prenoms} ${profile.nom}`
  const description = `Découvrez l'histoire de ${profile.prenoms} ${profile.nom}, ${profile.profession}`
  
  return (
    <div className="mt-6">
      <h3 className="text-center text-lg font-medium mb-4">Partager cette histoire</h3>
      <SocialShareButtons 
        url={url} 
        title={title} 
        description={description}
      />
    </div>
  )
}