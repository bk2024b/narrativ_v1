import AuthButtons from '@/components/auth/AuthButtons'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Bienvenue sur Narrativ</h1>
        <AuthButtons />
      </div>
    </main>
  )
}
