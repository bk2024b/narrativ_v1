// app/api/og/route.jsx
import { ImageResponse } from '@vercel/og'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    // Si pas d'ID fourni, retourner une image par défaut
    if (!id) {
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
            Partage ton histoire inspirante
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    // Récupérer les données du profil
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !profile) {
      return NextResponse.json(
        { error: 'Profil non trouvé' },
        { status: 404 }
      )
    }

    // Récupérer l'histoire si disponible
    const { data: storyData } = await supabase
      .from('stories')
      .select('improved_text')
      .eq('user_id', id)
      .maybeSingle()

    const storyExcerpt = storyData?.improved_text 
      ? storyData.improved_text.substring(0, 100) + '...' 
      : 'Découvrez mon histoire inspirante'

    // Générer l'image OG
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f4f4f5',
            padding: '40px 60px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Arrière-plan */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '30%',
              height: '100%',
              backgroundColor: '#3b82f6',
              zIndex: 0,
              opacity: 0.8,
            }}
          />
          
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
            {/* Titre */}
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: '#18181b',
                marginBottom: 20,
              }}
            >
              {profile.prenoms} {profile.nom}
            </div>
            
            {/* Profession */}
            <div
              style={{
                fontSize: 40,
                color: '#3b82f6',
                marginBottom: 40,
              }}
            >
              {profile.profession}
            </div>
            
            {/* Extrait de l'histoire */}
            <div
              style={{
                fontSize: 30,
                color: '#52525b',
                lineHeight: 1.4,
                maxWidth: '70%',
              }}
            >
              "{storyExcerpt}"
            </div>
            
            {/* Pied de page */}
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: 60,
                fontSize: 24,
                color: '#71717a',
              }}
            >
              Découvrez mon histoire inspirante
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