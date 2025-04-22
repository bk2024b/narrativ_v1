'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

const providers = [
  { name: 'Google', id: 'google' },
  { name: 'Facebook', id: 'facebook' },
  { name: 'LinkedIn', id: 'linkedin' },
]

export default function AuthButtons() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (provider) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // On ne spécifie plus directement la redirection ici
          // car on va gérer ça dans un hook useEffect après l'authentification
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) console.error('Erreur de login:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      {providers.map(({ name, id }) => (
        <Button 
          key={id} 
          onClick={() => handleLogin(id)} 
          variant="outline"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : `Se connecter avec ${name}`}
        </Button>
      ))}
    </div>
  )
}