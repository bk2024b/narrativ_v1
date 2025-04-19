import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function StepTwo({ onNext, onBack }) {
  const [data, setData] = useState({ bio: '', photo_url: '' })

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Ta bio inspirante..."
        name="bio"
        onChange={handleChange}
        className="min-h-[100px]"
      />
      <Input
        type="url"
        name="photo_url"
        placeholder="Lien de ta photo (optionnel)"
        onChange={handleChange}
      />
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={() => onNext(data)}>Suivant</Button>
      </div>
    </div>
  )
}
