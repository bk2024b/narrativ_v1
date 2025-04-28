'use client'
import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UserIcon, Upload, X } from 'lucide-react'

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
    photo_url: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

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
          photo_url: data.photo_url || '',
        })
        
        // Si une photo existe, définir l'aperçu
        if (data.photo_url) {
          setPreview(data.photo_url)
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Afficher l'aperçu
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    try {
      setIsUploading(true)

      // Récupérer l'utilisateur actuel
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Utilisateur non connecté")

      // Générer un nom de fichier unique avec l'extension d'origine
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      
      // Uploader le fichier dans le bucket "avatars"
      const { data: uploadData, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

      if (error) throw error

      // Récupérer l'URL publique
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Mettre à jour les données avec l'URL de la photo
      setFormData(prev => ({ ...prev, photo_url: urlData.publicUrl }))
      
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
      alert("Une erreur est survenue lors de l'envoi de votre photo")
    } finally {
      setIsUploading(false)
    }
  }

  const removePhoto = () => {
    setPreview(null)
    setFormData(prev => ({ ...prev, photo_url: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
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
      <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-teal-400 text-center text-xl font-medium">Modifier mon profil</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Section photo de profil */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-3">
              {preview || formData.photo_url ? (
                <>
                  <Avatar className="w-20 h-20 border-2 border-teal-400">
                    <AvatarImage src={preview || formData.photo_url} alt="Photo de profil" />
                    <AvatarFallback className="bg-gray-700">
                      <UserIcon className="w-10 h-10 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <button 
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div 
                  onClick={handlePhotoClick}
                  className="w-20 h-20 rounded-full bg-gray-700 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Photo</span>
                </div>
              )}
            </div>
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePhotoClick}
              disabled={isUploading}
              className="text-teal-400 border-gray-700 text-xs mb-2"
            >
              {isUploading ? 'Envoi en cours...' : 'Changer la photo'}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-300">Nom</label>
              <Input 
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Dupont"
                className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-300">Prénom(s)</label>
              <Input 
                name="prenoms"
                value={formData.prenoms}
                onChange={handleChange}
                placeholder="Marie"
                className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">Profession</label>
            <Input 
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Développeur web"
              className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">Bio</label>
            <Textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Quelques mots à propos de vous..."
              className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200 min-h-20" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px bg-gray-700 flex-grow"></div>
              <h3 className="text-sm font-medium text-teal-400">Réseaux sociaux</h3>
              <div className="h-px bg-gray-700 flex-grow"></div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-300">Facebook</label>
              <Input 
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/username"
                className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-300">LinkedIn</label>
              <Input 
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-300">Instagram</label>
              <Input 
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
                className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-300">GitHub</label>
              <Input 
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="border-teal-600/40 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 bg-gray-800/50 text-gray-200" 
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-800">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-gray-100"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-transparent text-teal-400 border border-teal-600 hover:bg-gray-800 hover:border-teal-500 transition-all duration-200"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}