'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        // Récupérer l'utilisateur actuel
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/login')
          return
        }

        // Vérifier si l'utilisateur a déjà un profil complet
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        // Si aucune erreur et que le profil existe et contient des données essentielles,
        // rediriger vers la page de profil, sinon vers l'onboarding
        if (!error && profile && profile.nom && profile.prenoms) {
          router.push(`/profile/${user.id}`)
        } else {
          router.push('/onboarding')
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du profil:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkUserProfile()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl mb-4">Vérification de votre compte...</h1>
        <p>Vous allez être redirigé dans un instant.</p>
      </div>
    </div>
  )
}