import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function StepOne({ onNext }) {
  const [data, setData] = useState({ nom: '', prenoms: '', profession: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    // Effacer l'erreur lorsque l'utilisateur modifie un champ
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!data.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!data.prenoms.trim()) newErrors.prenoms = "Le(s) prénom(s) est/sont requis"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onNext(data)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white text-center mb-6">Dis-nous qui tu es</h2>
      
      <div className="space-y-4">
        <div>
          <Input 
            type="text"
            placeholder="Nom" 
            name="nom" 
            value={data.nom}
            onChange={handleChange}
            className={`bg-gray-900 text-white border ${errors.nom ? 'border-red-500' : 'border-gray-700'} focus:border-teal-400`}
          />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
        </div>

        <div>
          <Input 
            type="text"
            placeholder="Prénom(s)" 
            name="prenoms" 
            value={data.prenoms}
            onChange={handleChange}
            className={`bg-gray-900 text-white border ${errors.prenoms ? 'border-red-500' : 'border-gray-700'} focus:border-teal-400`}
          />
          {errors.prenoms && <p className="text-red-500 text-sm mt-1">{errors.prenoms}</p>}
        </div>

        <div>
          <Input 
            type="text"
            placeholder="Profession" 
            name="profession"
            value={data.profession}
            onChange={handleChange}
            className="bg-gray-900 text-white border border-gray-700 focus:border-teal-400"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-teal-400 text-gray-900 py-3 rounded-lg hover:bg-teal-300 font-medium"
        >
          Continuer
        </Button>
      </div>
    </div>
  )
}