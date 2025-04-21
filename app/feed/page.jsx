'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CreateStoryModal from '@/components/story/CreateStoryModal'

export default function FeedPage() {
  const [stories, setStories] = useState([])
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
    }

    const fetchStories = async () => {
      try {
        // Récupérer toutes les histoires, triées par date de création (plus récentes d'abord)
        const { data: storiesData, error } = await supabase
          .from('stories')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        setStories(storiesData)

        // Récupérer les informations des utilisateurs
        const userIds = [...new Set(storiesData.map(story => story.user_id))]
        
        for (const userId of userIds) {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

          if (!userError) {
            setUsers(prev => ({
              ...prev,
              [userId]: userData
            }))
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des histoires:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
    fetchStories()
  }, [])

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  // Fonction pour obtenir les initiales à partir du nom d'utilisateur
  const getInitials = (userName) => {
    if (!userName) return '?'
    return userName.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <p>Chargement des histoires...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Fil d'histoires</h1>
        {currentUser && (
          <Button onClick={() => setCreateModalOpen(true)}>
            Créer mon histoire
          </Button>
        )}
      </div>

      {stories.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-lg text-muted-foreground">Aucune histoire n'a encore été partagée.</p>
          {currentUser && (
            <Button className="mt-4" onClick={() => setCreateModalOpen(true)}>
              Soyez le premier à partager votre histoire
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    {users[story.user_id]?.avatar_url ? (
                      <AvatarImage src={users[story.user_id].avatar_url} alt={users[story.user_id]?.nom || 'Utilisateur'} />
                    ) : (
                      <AvatarFallback>{getInitials(users[story.user_id]?.nom)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{users[story.user_id]?.nom || 'Utilisateur anonyme'}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(story.created_at)}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="line-clamp-4 whitespace-pre-wrap">
                  {story.improved_text || story.content}
                </p>
              </CardContent>

              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setSelectedStory(story)}
                >
                  Lire la suite
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal pour créer une histoire */}
      {currentUser && (
        <CreateStoryModal 
          open={createModalOpen} 
          onOpenChange={setCreateModalOpen} 
          userId={currentUser.id}
        />
      )}

      {/* Modal pour afficher une histoire complète */}
      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="size-6">
                {selectedStory && users[selectedStory.user_id]?.photo_url ? (
                  <AvatarImage src={users[selectedStory.user_id].photo_url} alt={users[selectedStory.user_id]?.full_name || 'Utilisateur'} />
                ) : (
                  <AvatarFallback>{selectedStory && getInitials(users[selectedStory.user_id]?.nom)}</AvatarFallback>
                )}
              </Avatar>
              <span>{selectedStory && (users[selectedStory.user_id]?.full_name || 'Utilisateur anonyme')}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-wrap">
            {selectedStory && (selectedStory.improved_text || selectedStory.content)}
          </div>
          <div className="text-sm text-muted-foreground mt-4">
            {selectedStory && formatDate(selectedStory.created_at)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}