'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'

export default function EditProfileModal({ open, onOpenChange, userId, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '', 
    profession: '',
    bio: '',
    facebook_url: '',
    linkedin_url: '',
    instagram_url: '',
    github_url: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && userId) {
      fetchUserProfile()
    }
  }, [open, userId])

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      if (data) {
        setFormData({
          nom: data.nom || '',
          prenoms: data.prenoms || '',
          profession: data.profession || '',
          bio: data.bio || '',
          facebook_url: data.facebook_url || '',
          linkedin_url: data.linkedin_url || '',
          instagram_url: data.instagram_url || '',
          github_url: data.github_url || '',
        })
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', userId)

      if (error) throw error
      
      if (onProfileUpdate) {
        onProfileUpdate(formData)
      }
      
      onOpenChange(false)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier mon profil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Nom</label>
              <Input 
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Dupont" 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Prénom(s)</label>
              <Input 
                name="prenoms"
                value={formData.prenoms}
                onChange={handleChange}
                placeholder="Marie" 
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Profession</label>
            <Input 
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Développeur web" 
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Bio</label>
            <Textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Quelques mots à propos de vous..."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Réseaux sociaux</h3>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Facebook</label>
              <Input 
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/username" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">LinkedIn</label>
              <Input 
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Instagram</label>
              <Input 
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/username" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">GitHub</label>
              <Input 
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username" 
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}