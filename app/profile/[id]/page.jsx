'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Facebook, Github, Instagram, Linkedin } from 'lucide-react'
import CreateStoryModal from '@/components/story/CreateStoryModal'
import { Button } from '@/components/ui/button'

export default function UserProfile() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const { id } = useParams()
  
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
      
      {isOwner && (
        <div className="text-right mb-4">
          <button
            onClick={() => {
              const url = `${window.location.origin}/profile/${id}`
              if (navigator.share) {
                navigator.share({
                  title: 'Découvre mon histoire !',
                  url
                })
              } else {
                navigator.clipboard.writeText(url)
                alert('Lien copié dans le presse-papiers !')
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded-xl shadow hover:bg-primary/90"
          >
            Partager mon profil
          </button>
        </div>
      )}

      {story ? (
        <div className="text-left bg-muted p-6 rounded-xl shadow mt-8">
          <h2 className="text-xl font-semibold mb-4">Son histoire</h2>
          <p className="whitespace-pre-wrap">{story.improved_text}</p>
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
    </div>
  )
}