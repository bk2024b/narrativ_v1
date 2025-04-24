import { useState } from 'react'

export default function StepTwo({ onNext, onBack }) {
  const [data, setData] = useState({ bio: '', photo_url: '' })

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Complète ton profil</h2>
      
      <div className="space-y-4">
        <div>
          <textarea
            placeholder="Ta bio inspirante..."
            name="bio"
            value={data.bio}
            onChange={handleChange}
            className="w-full min-h-[120px] bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-teal-400 transition-all duration-300 resize-y"
          />
        </div>

        <div>
          <input
            type="url"
            name="photo_url"
            placeholder="Lien de ta photo (optionnel)"
            value={data.photo_url}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-teal-400 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button 
          onClick={onBack}
          className="flex-1 bg-gray-900 text-teal-400 px-6 py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium border border-gray-700"
        >
          Retour
        </button>
        
        <button 
          onClick={() => onNext(data)}
          className="flex-1 bg-teal-400 text-gray-900 px-6 py-4 rounded-lg hover:bg-teal-300 transition-all duration-300 font-medium"
        >
          Continuer
        </button>
      </div>
    </div>
  )
}