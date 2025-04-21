import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { story } = await req.json();

    if (!story) {
      return NextResponse.json(
        { message: 'Pas de contenu fourni' },
        { status: 400 }
      );
    }

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
    });

    const data = await response.json();
    const improvedStory = data.choices[0].message.content;

    return NextResponse.json({ improvedStory });
  } catch (error) {
    console.error('Erreur Groq:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la génération' },
      { status: 500 }
    );
  }
}