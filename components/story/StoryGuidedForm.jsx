import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import StoryPreview from './StoryPreview'
import { saveStory } from '@/lib/saveStory'

const steps = [
  {
    title: 'Présentation',
    questions: [
      "Quel est ton prénom et ton nom ?",
      "Quelle est ta profession ou ton activité principale ?",
      "D'où viens-tu ?",
    ],
  },
  {
    title: 'Le point de départ',
    questions: [
      "À quoi ressemblait ta vie ou ta situation avant de te lancer ?",
      "Quel était ton rêve ou ton objectif à cette époque ?",
    ],
  },
  {
    title: 'Le déclic',
    questions: [
      "Y a-t-il eu un moment précis qui a tout changé ?",
      "Pourquoi as-tu décidé de passer à l'action ?",
    ],
  },
  {
    title: 'Les galères',
    questions: [
      "Quels ont été les plus gros obstacles que tu as rencontrés ?",
      "As-tu déjà voulu abandonner ? Qu'est-ce qui t'a fait continuer ?",
    ],
  },
  {
    title: 'L\'action',
    questions: [
      "Quelles actions concrètes as-tu mises en place pour avancer ?",
      "As-tu été aidé ? Par qui ou par quoi ?",
    ],
  },
  {
    title: 'Le résultat',
    questions: [
      "Où en es-tu aujourd'hui ? Qu'as-tu réussi à accomplir ?",
      "Quel est ta plus grande fierté dans ce parcours ?",
    ],
  },
  {
    title: 'Le partage',
    questions: [
      "Qu'as-tu appris de cette expérience ?",
      "Quel conseil donnerais-tu à quelqu'un qui vit une situation similaire ?",
    ],
  },
]

export default function GuidedStoryForm({ setStory, onNext, onBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (index, value) => {
    setAnswers({
      ...answers,
      [`${currentStep}_${index}`]: value,
    })
  }

  const generateStoryText = () => {
    return steps
      .map((step, stepIndex) => {
        const responses = step.questions.map((_, qIndex) => {
          return answers[`${stepIndex}_${qIndex}`] || ''
        }).join('\n')
        return `## ${step.title}\n${responses}`
      })
      .join('\n\n')
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Quand on atteint la dernière étape, on génère le texte et on passe à l'étape suivante
      const storyText = generateStoryText()
      setStory(storyText) // Mise à jour du texte de l'histoire dans le parent
      onNext() // Appel de la fonction onNext du parent pour passer à l'étape preview
    }
  }

  const step = steps[currentStep]

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">{step.title}</h2>
        {step.questions.map((q, i) => (
          <div key={i} className="space-y-2">
            <p className="text-sm font-medium">{q}</p>
            <Textarea
              placeholder="Ta réponse..."
              value={answers[`${currentStep}_${i}`] || ''}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={currentStep === 0}>
            Précédent
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Voir l\'aperçu' : 'Suivant'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}