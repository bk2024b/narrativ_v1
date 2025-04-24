// app/signup/page.jsx
import AuthButtons from '@/components/auth/AuthButtons'

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Créer un compte Narrativ</h1>
        <p className="text-muted-foreground mb-6">Partagez votre histoire inspirante</p>
        <AuthButtons mode="signup" />
      </div>
    </main>
  )
}