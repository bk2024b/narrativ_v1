'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import StoryFreeForm from './StoryFreeForm'
import GuidedStoryForm from './StoryGuidedForm'
import StoryPreview from './StoryPreview'

export default function CreateStoryModal({ open, onOpenChange, userId }) {
  const [mode, setMode] = useState(null) // 'free' | 'guided'
  const [story, setStory] = useState('')
  const [step, setStep] = useState(1) // 1 = choix, 2 = rédaction, 3 = preview

  const reset = () => {
    setMode(null)
    setStory('')
    setStep(1)
  }

  const handlePublish = async (finalStory) => {
    const { error } = await supabase.from('stories').upsert({
      user_id: userId,
      content: finalStory,
    })
    if (!error) {
      onOpenChange(false)
      reset()
    }
  }
  

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if (!val) reset() }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer ton histoire</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="flex flex-col gap-4 py-4">
            <Button onClick={() => { setMode('free'); setStep(2) }}>
              ✍️ Rédiger moi-même
            </Button>
            <Button variant="outline" onClick={() => { setMode('guided'); setStep(2) }}>
              🧠 Être guidé
            </Button>
          </div>
        )}

        {step === 2 && mode === 'free' && (
          <StoryFreeForm story={story} setStory={setStory} onNext={() => setStep(3)} onBack={() => setStep(1)} />
        )}

        {step === 2 && mode === 'guided' && (
          <StoryGuidedForm setStory={setStory} onNext={() => setStep(3)} onBack={() => setStep(1)} />
        )}

        {step === 3 && (
          <StoryPreview story={story} onBack={() => setStep(2)} onPublish={(refactoredText) => handlePublish(refactoredText)} />
        )}
      </DialogContent>
    </Dialog>
  )
}
