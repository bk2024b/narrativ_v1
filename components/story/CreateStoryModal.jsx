'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
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
    try {
      const { error } = await supabase.from('stories').upsert({
        user_id: userId,
        content: story,
        improved_text: finalStory
      });
      
      if (!error) {
        onOpenChange(false)
        reset()
        // Optionnellement, rafraîchir la page pour montrer la nouvelle histoire
        window.location.reload()
      } else {
        console.error("Erreur lors de la publication:", error)
      }
    } catch (err) {
      console.error("Erreur:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if (!val) reset() }}>
      <DialogContent className="max-w-2xl bg-gray-900 border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-teal-400 text-center text-xl font-medium">Créer ton histoire</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="flex flex-col gap-4 py-6 px-2">
            <div className="text-center text-gray-300 text-sm mb-2">
              Commence par choisir comment tu souhaites créer ton histoire
            </div>
            <Button 
              onClick={() => { setMode('free'); setStep(2) }}
              className="bg-transparent text-teal-400 px-5 py-4 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium border border-teal-600 hover:border-teal-500 flex items-center justify-center gap-3"
            >
              <span className="text-xl">✍️</span> Rédiger moi-même
            </Button>
            <div className="flex items-center gap-3 my-1">
              <div className="h-px bg-gray-700 flex-grow"></div>
              <span className="text-gray-400 text-xs">ou</span>
              <div className="h-px bg-gray-700 flex-grow"></div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => { setMode('guided'); setStep(2) }}
              className="bg-transparent text-gray-300 px-5 py-4 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-3"
            >
              <span className="text-xl">🧠</span> Être guidé
            </Button>
          </div>
        )}

        {step === 2 && mode === 'free' && (
          <StoryFreeForm story={story} setStory={setStory} onNext={() => setStep(3)} onBack={() => setStep(1)} />
        )}

        {step === 2 && mode === 'guided' && (
          <GuidedStoryForm setStory={setStory} onNext={() => setStep(3)} onBack={() => setStep(1)} />
        )}

        {step === 3 && (
          <StoryPreview story={story} onBack={() => setStep(2)} onPublish={handlePublish} />
        )}

        {/* Indicateur d'étapes en bas */}
        <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-800">
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-teal-400' : 'bg-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-teal-400' : 'bg-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${step === 3 ? 'bg-teal-400' : 'bg-gray-600'}`}></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}