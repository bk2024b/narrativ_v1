// app/api/og/story/route.jsx
import { ImageResponse } from '@vercel/og'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const storyId = searchParams.get('id')
    
    // Si pas d'ID fourni, retourner une image par défaut
    if (!storyId) {
      return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              color: 'black',
              background: 'white',
              width: '100%',
              height: '100%',
              padding: '50px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Une histoire inspirante à découvrir
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    // Récupérer l'histoire et les données du profil associé
    const { data: story, error } = await supabase
      .from('stories')
      .select('*, profiles:user_id(*)')
      .eq('id', storyId)
      .single()

    if (error || !story) {
      return NextResponse.json(
        { error: 'Histoire non trouvée' },
        { status: 404 }
      )
    }

    const profile = story.profiles
    const storyExcerpt = story.improved_text 
      ? story.improved_text.substring(0, 120) + '...' 
      : 'Découvrez cette histoire inspirante'

    // Générer l'image OG pour l'histoire
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            padding: '40px 60px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Arrière-plan décoratif */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              zIndex: 0,
            }}
          >
            <div
              style={{
                width: '35%',
                height: '100%',
                backgroundColor: '#3b82f6',
                opacity: 0.2,
              }}
            />
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          >
            {/* Citation */}
            <div
              style={{
                fontSize: 36,
                lineHeight: 1.4,
                color: '#1e293b',
                marginBottom: 40,
                maxWidth: '85%',
                fontStyle: 'italic',
              }}
            >
              "{storyExcerpt}"
            </div>
            
            {/* Ligne de séparation */}
            <div 
              style={{
                width: '120px',
                height: '6px',
                backgroundColor: '#3b82f6',
                marginBottom: 24,
              }}
            />
            
            {/* Auteur */}
            <div
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: '#0f172a',
              }}
            >
              {profile?.prenoms} {profile?.nom}
            </div>
            
            {/* Profession */}
            <div
              style={{
                fontSize: 24,
                color: '#64748b',
                marginBottom: 40,
              }}
            >
              {profile?.profession || ''}
            </div>
            
            {/* Pied de page */}
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                right: 60,
                fontSize: 24,
                color: '#3b82f6',
                fontWeight: 'bold',
              }}
            >
              #HistoireInspirante
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
    
  } catch (error) {
    console.error('Error generating OG image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}