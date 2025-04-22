// components/share/SocialShareButtons.jsx
import { Facebook, Linkedin, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function SocialShareButtons({ url, title, description }) {
  const [copied, setCopied] = useState(false)
  
  // URLs pour le partage sur les réseaux sociaux
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie du lien:', error)
    }
  }

  const openShareWindow = (shareUrl) => {
    window.open(
      shareUrl,
      'share-window',
      'height=450,width=550,resizable=1,scrollbars=1'
    )
    return false
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => openShareWindow(facebookShareUrl)}
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white"
        onClick={() => openShareWindow(linkedinShareUrl)}
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleCopyLink}
      >
        <Copy className="w-4 h-4" />
        {copied ? 'Copié!' : 'Copier le lien'}
      </Button>
    </div>
  )
}