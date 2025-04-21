'use client'
// components/story/ShareStoryButton.jsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { Toast } from '@/components/ui/toast'

export default function ShareStoryButton({ story, profile }) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
  const storyUrl = `${window.location.origin}/story/${story.id}`
  const shareText = `Découvrez l'histoire inspirante de ${profile.prenoms} ${profile.nom}, ${profile.profession}`
  
  const shareViaWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `L'histoire de ${profile.prenoms} ${profile.nom}`,
          text: shareText,
          url: storyUrl
        })
      } else {
        setShowShareOptions(true)
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error)
    }
  }
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    setShowShareOptions(false)
  }
  
  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(storyUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    setShowShareOptions(false)
  }
  
  const shareToLinkedin = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(storyUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
    setShowShareOptions(false)
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storyUrl)
      setToastMessage('Lien copié dans le presse-papiers !')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      setShowShareOptions(false)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }
  
  return (
    <div className="relative">
      <Button 
        onClick={shareViaWebShare}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Partager cette histoire
      </Button>
      
      {showShareOptions && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border z-10">
          <div className="flex gap-4">
            <button onClick={shareToFacebook} className="flex flex-col items-center text-xs">
              <Facebook className="w-8 h-8 text-blue-600 mb-1" />
              Facebook
            </button>
            <button onClick={shareToTwitter} className="flex flex-col items-center text-xs">
              <Twitter className="w-8 h-8 text-blue-400 mb-1" />
              Twitter
            </button>
            <button onClick={shareToLinkedin} className="flex flex-col items-center text-xs">
              <Linkedin className="w-8 h-8 text-blue-700 mb-1" />
              LinkedIn
            </button>
            <button onClick={copyToClipboard} className="flex flex-col items-center text-xs">
              <LinkIcon className="w-8 h-8 text-gray-500 mb-1" />
              Copier
            </button>
          </div>
        </div>
      )}
      
      {showToast && (
        <Toast variant="success">{toastMessage}</Toast>
      )}
    </div>
  )
}