// pages/api/refactor-story.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Méthode non autorisée' })
    }
  
    const { story } = req.body
  
    if (!story) {
      return res.status(400).json({ message: 'Pas de contenu fourni' })
    }
  
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `Tu es un écrivain inspirant. Ton rôle est de reformuler une histoire personnelle pour la rendre plus claire, engageante, bien écrite, sans fautes, tout en gardant un ton authentique. Garde le texte au même format, mais améliore-le.`,
            },
            {
              role: 'user',
              content: story,
            },
          ],
        }),
      })
  
      const data = await response.json()
      const result = data.choices[0].message.content
  
      res.status(200).json({ improvedStory: result })
    } catch (error) {
      console.error('Erreur Groq:', error)
      res.status(500).json({ message: 'Erreur lors de la génération' })
    }
  }
  