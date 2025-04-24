'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthButtons({ mode = 'login' }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // Nous utilisons un paramètre pour indiquer si c'est un signup
            signup: mode === 'signup' ? 'true' : 'false'
          }
        },
      })
      if (error) console.error('Erreur d\'authentification:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <Button 
        onClick={handleAuth} 
        variant="outline"
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {/* Icône Google */}
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        {isLoading ? 'Chargement...' : mode === 'signup' ? 'S\'inscrire avec Google' : 'Se connecter avec Google'}
      </Button>
      
      <div className="text-sm text-muted-foreground">
        {mode === 'signup' ? (
          <p>
            Déjà un compte ?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        ) : (
          <p>
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              S'inscrire
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}