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
  const router = useRouter()

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

    router.push(`/profile/${user.id}`) // Tu pourras utiliser le username plus tard
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
