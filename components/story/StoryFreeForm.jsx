import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function StoryFreeForm({ story, setStory, onNext, onBack }) {
  return (
    <div className="space-y-4">
      <Textarea
        className="min-h-[200px]"
        placeholder="Raconte ton histoire ici..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Retour</Button>
        <Button onClick={onNext}>Suivant</Button>
      </div>
    </div>
  )
}
