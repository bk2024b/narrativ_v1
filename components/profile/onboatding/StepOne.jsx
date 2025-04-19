import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function StepOne({ onNext }) {
  const [data, setData] = useState({ nom: '', prenoms: '', profession: '' })

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-4">
      <Input placeholder="Nom" name="nom" onChange={handleChange} />
      <Input placeholder="Prénom(s)" name="prenoms" onChange={handleChange} />
      <Input placeholder="Profession" name="profession" onChange={handleChange} />
      <Button onClick={() => onNext(data)}>Suivant</Button>
    </div>
  )
}
