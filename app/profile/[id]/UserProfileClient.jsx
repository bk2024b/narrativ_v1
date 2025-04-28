'use client'
// app/profile/[id]/UserProfileClient.jsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { notFound, useRouter } from 'next/navigation'
import { Edit, LogOut, BookOpen, PlusCircle, Share2 } from 'lucide-react'
import CreateStoryModal from '@/components/story/CreateStoryModal'
import { Button } from '@/components/ui/button'
import EditProfileModal from '@/components/profile/EditProfileModal'
import Link from 'next/link'
import ShareStoryButtons from '@/components/story/ShareStoryButtons'
import { motion } from 'framer-motion'

export default function UserProfileClient({ id }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleProfileUpdate = (updatedProfile) => {
    setProfile((prev) => ({ ...prev, ...updatedProfile }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="animate-pulse text-teal-400 text-xl">Chargement...</div>
      </div>
    )
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
    { icon: ({ className }) => (
      <svg className={className} width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
      </svg>
    ), url: facebook_url },
    { icon: ({ className }) => (
      <svg className={className} width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
      </svg>
    ), url: linkedin_url },
    { icon: ({ className }) => (
      <svg className={className} width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
      </svg>
    ), url: instagram_url },
    { icon: ({ className }) => (
      <svg className={className} width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
      </svg>
    ), url: github_url },
  ].filter((link) => !!link.url)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-5 z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-400 rounded-full filter blur-3xl opacity-5 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-5 z-0"></div>
      
      <main className="container mx-auto px-6 py-16 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8 mb-8">
            <div className="flex flex-col items-center gap-5">
              <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg border-2 border-teal-500 bg-gradient-to-br from-teal-500/20 to-teal-500/5">
                <img
                  src={photo_url || '/placeholder-user.png'}
                  alt="photo profil"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-1">{prenoms} {nom}</h1>
                <div className="h-1 w-24 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mx-auto mb-2"></div>
                <p className="text-teal-400">{profession}</p>
              </div>

              {bio && (
                <p className="italic text-gray-300 text-center max-w-lg mx-auto mt-2">{bio}</p>
              )}

              {socialLinks.length > 0 && (
                <div className="flex justify-center gap-5 mt-2">
                  {socialLinks.map(({ icon: Icon, url }, i) => (
                    <a 
                      key={i} 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:bg-gray-700/50 p-2 rounded-full transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-teal-400 hover:scale-110 transition" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {/* Boutons d'action pour l'utilisateur connecté */}
            {isOwner && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-teal-500/30 hover:bg-teal-500/10"
                  onClick={() => setEditProfileOpen(true)}
                >
                  <Edit className="w-4 h-4" />
                  Éditer mon profil
                </Button>
                
                <Button 
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600"
                  onClick={() => setOpen(true)}
                >
                  <PlusCircle className="w-4 h-4" />
                  Créer mon histoire
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-teal-500/30 hover:bg-teal-500/10"
                  onClick={() => router.push('/feed')}
                >
                  <BookOpen className="w-4 h-4" />
                  Accéder au feed
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </motion.div>
            )}
          </div>
          
          {story ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  <h2 className="text-xl font-semibold text-white">Son histoire</h2>
                </div>
                {/* Vérifier que l'ID existe avant de créer le lien */}
                {story.id && (
                  <Link href={`/story/${story.id}`}>
                    <Button variant="outline" size="sm" className="border-teal-500/30 hover:bg-teal-500/10">
                      Voir l'histoire complète
                    </Button>
                  </Link>
                )}
              </div>
              
              <div className="bg-gray-900/50 p-5 rounded-xl">
                <p className="whitespace-pre-wrap text-gray-300">{story.improved_text}</p>
              </div>

              {/* Nouveau système de partage */}
              <div className="mt-6">
                {story.id && (
                  <div className="w-full">
                    <ShareStoryButtons story={story} profile={profile} />
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8 text-center">
              <p className="text-gray-400 italic">Aucune histoire partagée.</p>
              {isOwner && (
                <Button 
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 mt-4 mx-auto"
                  onClick={() => setOpen(true)}
                >
                  <PlusCircle className="w-4 h-4" />
                  Créez votre première histoire
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </main>
      
      {isOwner && (
        <>
          <CreateStoryModal open={open} onOpenChange={setOpen} userId={id} />
          <EditProfileModal 
            open={editProfileOpen} 
            onOpenChange={setEditProfileOpen} 
            userId={id} 
            onProfileUpdate={handleProfileUpdate}
          />
        </>
      )}
      
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  )
}