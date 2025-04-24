'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Récupérer l'utilisateur actuel
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/login')
          return
        }

        // Vérifier si l'utilisateur a déjà un profil
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        // Récupérer le paramètre signup des query params
        const isSignup = searchParams.get('signup') === 'true'

        // Si c'est une inscription, diriger vers l'onboarding
        if (isSignup) {
          router.push('/onboarding')
          return
        }

        // Si c'est une connexion et que le profil existe, rediriger vers le profil
        if (!error && profile && profile.nom && profile.prenoms) {
          router.push(`/profile/${user.id}`)
        } else {
          // Si c'est une connexion mais le profil n'est pas complet, 
          // rediriger vers l'onboarding quand même
          router.push('/onboarding')
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du profil:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    handleAuth()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl mb-4">Vérification de votre compte...</h1>
        <p>Vous allez être redirigé dans un instant.</p>
      </div>
    </div>
  )
}