'use client'
// app/profile/[id]/UserProfileClient.jsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Facebook, Github, Instagram, Linkedin, Share2 } from 'lucide-react'
import CreateStoryModal from '@/components/story/CreateStoryModal'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import Link from 'next/link'

export default function UserProfileClient({ id }) {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
  useEffect(() => {
    async function fetchProfileData() {
      setLoading(true)
      
      // Vérifier si l'utilisateur est connecté
      const { data: sessionData } = await supabase.auth.getSession()
      const currentUser = sessionData?.session?.user
      
      if (currentUser && currentUser.id === id) {
        setIsOwner(true)
      }
      
      // Récupérer profil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (profileError || !profileData) {
        setLoading(false)
        return notFound()
      }

      setProfile(profileData)

      // Récupérer histoire
      const { data: storyData } = await supabase
        .from('stories')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (storyData && storyData.length > 0) {
        setStory(storyData[0])
      }

      setLoading(false)
    }

    if (id) {
      fetchProfileData()
    }
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>
  }

  if (!profile) {
    return notFound()
  }

  const {
    nom,
    prenoms,
    profession,
    bio,
    photo_url,
    facebook_url,
    linkedin_url,
    instagram_url,
    github_url,
  } = profile

  const socialLinks = [
    { icon: Facebook, url: facebook_url },
    { icon: Linkedin, url: linkedin_url },
    { icon: Instagram, url: instagram_url },
    { icon: Github, url: github_url },
  ].filter((link) => !!link.url)

  const handleShare = async () => {
    const shareData = {
      title: `Découvrez l'histoire inspirante de ${prenoms} ${nom}`,
      text: `${prenoms} ${nom} - ${profession}`,
      url: `${window.location.origin}/profile/${id}`
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Profil partagé avec succès');
      } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
        await navigator.clipboard.writeText(shareData.url);
        setToastMessage('Lien copié dans le presse-papiers !');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      // L'utilisateur a annulé le partage ou une erreur s'est produite
      console.error('Erreur lors du partage:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-6">
      <div className="flex flex-col items-center gap-3">
        <img
          src={photo_url || '/placeholder-user.png'}
          alt="photo profil"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{prenoms} {nom}</h1>
          <p className="text-muted-foreground">{profession}</p>
        </div>
      </div>

      {bio && <p className="italic">{bio}</p>}

      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ icon: Icon, url }, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
              <Icon className="w-5 h-5 text-blue-500 hover:scale-110 transition" />
            </a>
          ))}
        </div>
      )}
      
      {story ? (
  <div className="text-left bg-muted p-6 rounded-xl shadow mt-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Son histoire</h2>
      <Link href={`/story/${story.id}`}>
        <Button variant="outline" size="sm">
          Voir l'histoire complète
        </Button>
      </Link>
    </div>
    <p className="whitespace-pre-wrap">{story.improved_text}</p>
    
    <div className="mt-6 flex justify-end">
      <Button 
        onClick={() => {
          const url = `${window.location.origin}/story/${story.id}`
          const title = `L'histoire inspirante de ${prenoms} ${nom}`
          const text = `Découvrez l'histoire de ${prenoms} ${nom}, ${profession}`
          
          if (navigator.share) {
            navigator.share({ title, text, url })
              .catch(error => console.error('Erreur de partage:', error))
          } else {
            navigator.clipboard.writeText(url)
            setToastMessage('Lien de l\'histoire copié dans le presse-papiers !')
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000)
          }
        }}
        variant="secondary"
        size="sm"
        className="flex items-center gap-1"
      >
        <Share2 className="w-4 h-4" />
        Partager l'histoire
      </Button>
    </div>
  </div>
) : (
  <p className="text-muted-foreground italic">Aucune histoire partagée.</p>
)}
      
      {isOwner && (
        <>
          <Button onClick={() => setOpen(true)}>Créer son histoire</Button>
          <CreateStoryModal open={open} onOpenChange={setOpen} userId={id} />
        </>
      )}
      
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  )
}