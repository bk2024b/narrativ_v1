import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function StoryPreview({ story, onBack, onPublish }) {
  const [loading, setLoading] = useState(false)
  const [refactored, setRefactored] = useState(null)

  const handleRefactorAndPublish = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/refactor-story', {
        method: 'POST',
        body: JSON.stringify({ story }),
        headers: { 'Content-Type': 'application/json' },
      })
      
      const data = await res.json()
      
      if (data.improvedStory) {
        setRefactored(data.improvedStory)
        await onPublish(data.improvedStory)
      } else {
        console.error("Réponse API invalide:", data)
      }
    } catch (error) {
      console.error("Erreur lors de la refactorisation:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-left whitespace-pre-wrap border p-4 rounded-md bg-muted">
        {refactored || story}
      </p>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Retour</Button>
        <Button disabled={loading} onClick={handleRefactorAndPublish}>
          {loading ? 'Publication...' : 'Publier'}
        </Button>
      </div>
    </div>
  )
}