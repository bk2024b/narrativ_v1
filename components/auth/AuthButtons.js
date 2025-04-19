'use client'

import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

const providers = [
  { name: 'Google', id: 'google' },
  { name: 'Facebook', id: 'facebook' },
  { name: 'LinkedIn', id: 'linkedin' },
]

export default function AuthButtons() {
  const handleLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/profile`, // tu peux modifier ici
      },
    })
    if (error) console.error('Erreur de login:', error.message)
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      {providers.map(({ name, id }) => (
        <Button key={id} onClick={() => handleLogin(id)} variant="outline">
          Se connecter avec {name}
        </Button>
      ))}
    </div>
  )
}
