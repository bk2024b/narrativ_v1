// components/story/ShareStoryButton.jsx
'use client'
import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ShareStoryButtons from './ShareStoryButtons'

export default function ShareStoryButton({ story, profile }) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  
  if (!story || !profile) return null
  
  return (
    <div className="w-full">
      {!showShareOptions ? (
        <Button 
          onClick={() => setShowShareOptions(true)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Partager cette histoire
        </Button>
      ) : (
        <ShareStoryButtons story={story} profile={profile} />
      )}
    </div>
  )
}