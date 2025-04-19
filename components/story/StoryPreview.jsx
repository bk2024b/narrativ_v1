import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function StoryPreview({ story, onBack, onPublish }) {
  const [loading, setLoading] = useState(false)
  const [refactored, setRefactored] = useState(null)

  const handleRefactorAndPublish = async () => {
    setLoading(true)
    const res = await fetch('/api/refactor-story', {
      method: 'POST',
      body: JSON.stringify({ story }),
      headers: { 'Content-Type': 'application/json' },
    })
    const { result } = await res.json()
    setRefactored(result)
    await onPublish(result)
    setLoading(false)
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
