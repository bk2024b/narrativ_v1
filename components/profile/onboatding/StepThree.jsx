import { useState } from 'react'

const AVAILABLE_SOCIALS = [
  { label: 'Facebook', key: 'facebook_url', icon: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
    </svg>
  ) },
  { label: 'LinkedIn', key: 'linkedin_url', icon: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
    </svg>
  ) },
  { label: 'Instagram', key: 'instagram_url', icon: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
    </svg>
  ) },
  { label: 'GitHub', key: 'github_url', icon: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
      <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
    </svg>
  ) },
]

export default function StepThree({ onNext, onBack }) {
  const [links, setLinks] = useState([])
  const [showAddMenu, setShowAddMenu] = useState(false)

  const addLink = (socialType) => {
    const socialToAdd = AVAILABLE_SOCIALS.find(s => s.key === socialType)
    if (socialToAdd) {
      setLinks([...links, { ...socialToAdd, value: '' }])
      setShowAddMenu(false)
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

  const remainingSocials = AVAILABLE_SOCIALS.filter(
    (s) => !links.find((l) => l.key === s.key)
  )

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Tes réseaux sociaux</h2>
      
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={link.key} className="flex items-center gap-2">
            <div className="bg-gray-900 text-gray-400 p-3 rounded-l-lg border-y border-l border-gray-700">
              {link.icon}
            </div>
            <input
              type="url"
              placeholder={`Lien ${link.label}`}
              value={link.value}
              onChange={(e) => updateLink(index, e.target.value)}
              className="flex-1 bg-gray-900 text-white px-4 py-3 border-y border-gray-700 focus:outline-none focus:border-teal-400 transition-all duration-300"
            />
            <button 
              onClick={() => removeLink(index)}
              className="bg-gray-900 text-red-500 p-3 rounded-r-lg border-y border-r border-gray-700 hover:bg-gray-800"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        ))}

        {remainingSocials.length > 0 && (
          <div className="relative">
            <button 
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full bg-gray-900 text-teal-400 px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium border border-gray-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Ajouter un réseau
            </button>
            
            {showAddMenu && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                {remainingSocials.map(social => (
                  <button 
                    key={social.key}
                    onClick={() => addLink(social.key)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-3 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="text-gray-400">{social.icon}</span>
                    <span>{social.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-2">
        <button 
          onClick={onBack}
          className="flex-1 bg-gray-900 text-teal-400 px-6 py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium border border-gray-700"
        >
          Retour
        </button>
        
        <button 
          onClick={handleSubmit}
          className="flex-1 bg-teal-400 text-gray-900 px-6 py-4 rounded-lg hover:bg-teal-300 transition-all duration-300 font-medium"
        >
          Terminer
        </button>
      </div>
    </div>
  )
}