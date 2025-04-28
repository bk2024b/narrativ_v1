import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UserIcon, Upload, X } from 'lucide-react'

export default function StepTwo({ onNext, onBack }) {
  const [data, setData] = useState({ bio: '', photo_url: '' })
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
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
      setData(prev => ({ ...prev, photo_url: urlData.publicUrl }))
      
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
      alert("Une erreur est survenue lors de l'envoi de votre photo")
    } finally {
      setIsUploading(false)
    }
  }

  const removePhoto = () => {
    setPreview(null)
    setData(prev => ({ ...prev, photo_url: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white text-center mb-6">Complète ton profil</h2>
      
      <div className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            {preview || data.photo_url ? (
              <>
                <Avatar className="w-28 h-28 border-2 border-teal-400">
                  <AvatarImage src={preview || data.photo_url} alt="Photo de profil" />
                  <AvatarFallback className="bg-gray-700">
                    <UserIcon className="w-12 h-12 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <button 
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div 
                onClick={handlePhotoClick}
                className="w-28 h-28 rounded-full bg-gray-700 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Ajouter photo</span>
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
            className="text-teal-400 border-gray-700"
          >
            {isUploading ? 'Envoi en cours...' : 'Choisir une photo'}
          </Button>
        </div>

        <div>
          <Textarea
            placeholder="Ta bio inspirante..."
            name="bio"
            value={data.bio}
            onChange={handleChange}
            className="min-h-[120px] bg-gray-900 text-white border-gray-700 focus:border-teal-400 resize-y"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 bg-gray-900 text-teal-400 border-gray-700 hover:bg-gray-700"
        >
          Retour
        </Button>
        
        <Button 
          onClick={() => onNext(data)}
          className="flex-1 bg-teal-400 text-gray-900 hover:bg-teal-300"
        >
          Continuer
        </Button>
      </div>
    </div>
  )
}