// app/profile/[id]/page.jsx
import { Suspense } from 'react'
import { generateMetadata } from './metadata'
import UserProfileClient from './UserProfileClient'

// Exporter les métadonnées générées dynamiquement
export { generateMetadata }

export default function ProfilePage({ params }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Chargement...</div>}>
      <UserProfileClient id={params.id} />
    </Suspense>
  )
}