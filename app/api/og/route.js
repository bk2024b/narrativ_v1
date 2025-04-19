// app/api/og/route.js
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const nom = searchParams.get('nom') || 'Inconnu'
  const profession = searchParams.get('profession') || ''
  const titre = `L'histoire inspirante de ${nom}`

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          background: '#fff',
          color: '#000',
          padding: '50px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h1>{titre}</h1>
        <p>{profession}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
