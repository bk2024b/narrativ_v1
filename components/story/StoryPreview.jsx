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
    <div className="space-y-6 py-4">
      <div className="text-center text-gray-300 text-sm mb-4">
        <span className="text-teal-400 font-medium">Aperçu</span> - Voici à quoi ressemblera ton histoire
      </div>
      
      <div className="max-h-[400px] overflow-y-auto border border-gray-700 p-5 rounded-md bg-gray-800/40 shadow-inner">
        <p className="text-left whitespace-pre-wrap text-gray-200 leading-relaxed">
          {refactored || story}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-gray-800">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="w-full sm:w-auto bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-gray-100"
        >
          ← Retour
        </Button>
        
        <Button 
          disabled={loading} 
          onClick={handleRefactorAndPublish}
          className="w-full sm:w-auto bg-transparent text-teal-400 border border-teal-600 hover:bg-gray-800 hover:border-teal-500 transition-all duration-200"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publication...
            </span>
          ) : (
            <>Publier</>
          )}
        </Button>
      </div>
    </div>
  )
}