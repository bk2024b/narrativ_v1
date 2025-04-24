'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
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
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <button 
        onClick={handleAuth} 
        disabled={isLoading}
        className="w-full bg-transparent text-teal-400 px-5 py-3 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium flex items-center justify-center gap-3 border border-teal-600 hover:border-teal-500"
      >
        {/* Icône Google */}
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        <span>
          {isLoading ? 'Chargement...' : mode === 'signup' ? 'S\'inscrire avec Google' : 'Se connecter avec Google'}
        </span>
      </button>
      
      {mode === 'login' && (
        <div className="flex items-center gap-3 my-1">
          <div className="h-px bg-gray-700 flex-grow"></div>
          <span className="text-gray-400 text-xs">ou</span>
          <div className="h-px bg-gray-700 flex-grow"></div>
        </div>
      )}
      
      {mode === 'login' && (
        <Link href="/signup" className="w-full text-center bg-transparent text-teal-400 px-5 py-3 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium border border-teal-600 hover:border-teal-500 flex items-center justify-center">
          Créer un compte
        </Link>
      )}
      
      <div className="text-xs text-gray-400 mt-2 text-center">
        {mode === 'signup' ? (
          <p>
            Déjà un compte ?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300 font-medium">
              Se connecter
            </Link>
          </p>
        ) : (
          <p>
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-teal-400 hover:text-teal-300 font-medium">
              S'inscrire
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}