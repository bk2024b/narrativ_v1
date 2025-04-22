'use client'

import { useEffect, useState } from 'react'
import StepOne from '@/components/profile/onboatding/StepOne'
import StepTwo from '@/components/profile/onboatding/StepTwo'
import StepThree from '@/components/profile/onboatding/StepThree'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkExistingProfile = async () => {
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

        // Si le profil existe déjà et contient les informations essentielles,
        // rediriger vers la page de profil
        if (!error && profile && profile.nom && profile.prenoms) {
          router.push(`/profile/${user.id}`)
          return
        }

        // Sinon, continuer avec l'onboarding
        setIsLoading(false)
      } catch (error) {
        console.error('Erreur lors de la vérification du profil:', error)
        setIsLoading(false)
      }
    }

    checkExistingProfile()
  }, [router])

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleData = (data) => {
    setFormData({ ...formData, ...data })
    nextStep()
  }

  const finishOnboarding = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from('profiles').upsert({
      id: user.id,
      ...formData,
    })

    router.push(`/profile/${user.id}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      {step === 1 && <StepOne onNext={handleData} />}
      {step === 2 && <StepTwo onNext={handleData} onBack={prevStep} />}
      {step === 3 && (
        <StepThree
          onNext={(data) => {
            setFormData({ ...formData, ...data })
            finishOnboarding()
          }}
          onBack={prevStep}
        />
      )}
    </div>
  )
}