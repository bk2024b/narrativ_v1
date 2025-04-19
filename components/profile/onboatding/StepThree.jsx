import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Plus, Trash } from 'lucide-react'

const AVAILABLE_SOCIALS = [
  { label: 'Facebook', key: 'facebook_url' },
  { label: 'LinkedIn', key: 'linkedin_url' },
  { label: 'Instagram', key: 'instagram_url' },
  { label: 'GitHub', key: 'github_url' },
]

export default function StepThree({ onNext, onBack }) {
  const [links, setLinks] = useState([])

  const addLink = () => {
    const remaining = AVAILABLE_SOCIALS.filter(
      (s) => !links.find((l) => l.key === s.key)
    )
    if (remaining.length > 0) {
      setLinks([...links, { ...remaining[0], value: '' }])
    }
  }

  const updateLink = (index, value) => {
    const updated = [...links]
    updated[index].value = value
    setLinks(updated)
  }

  const removeLink = (index) => {
    const updated = [...links]
    updated.splice(index, 1)
    setLinks(updated)
  }

  const handleSubmit = () => {
    const socials = links.reduce((acc, link) => {
      acc[link.key] = link.value
      return acc
    }, {})
    onNext(socials)
  }

  return (
    <div className="space-y-4">
      <p className="font-semibold">Ajoute tes réseaux sociaux (optionnel)</p>

      {links.map((link, index) => (
        <div key={link.key} className="flex items-center gap-2">
          <Input
            type="url"
            placeholder={`Lien ${link.label}`}
            value={link.value}
            onChange={(e) => updateLink(index, e.target.value)}
          />
          <Button variant="ghost" size="icon" onClick={() => removeLink(index)}>
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}

      {links.length < AVAILABLE_SOCIALS.length && (
        <Button variant="outline" onClick={addLink}>
          <Plus className="w-4 h-4 mr-2" /> Ajouter un réseau
        </Button>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={handleSubmit}>Terminer</Button>
      </div>
    </div>
  )
}
