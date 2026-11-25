import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import googleIcon from '@/assets/images/google-icon.webp'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { usePageMeta } from '@/hooks/usePageMeta'
import { signInSchema } from '@/lib/schemas'
import type { SignInValues } from '@/lib/schemas'

export default function SignIn() {
  usePageMeta('Sign in — Cardify')
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) })

  // Front-end only: nothing is sent anywhere and no credentials are stored.
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900))
    setDone(true)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your Cardify account with your email or username and password."
      footer={
        <>
          New to Cardify?{' '}
          <Link to="/signup" className="font-bold text-brand-700 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {done ? (
        <div className="rounded-3xl bg-brand-50 p-8 text-center" role="status">
          <CheckCircle2 className="mx-auto text-brand-600" size={48} />
          <h2 className="mt-3 text-xl font-bold">You’re signed in (demo)</h2>
          <p className="mt-2 text-sm text-muted">This is a front-end demo, so there is no real account behind this form.</p>
          <Button to="/" variant="secondary" className="mt-5">
            Back to home
          </Button>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-line bg-white text-sm font-semibold transition-colors hover:border-brand-600"
            onClick={() => alert('Google sign-in is not connected in this front-end demo.')}
          >
            <img src={googleIcon} alt="" width={20} height={20} /> Log in with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-xs font-semibold text-muted uppercase">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
            <Input label="Email or username" autoComplete="username" error={errors.identifier?.message} {...register('identifier')} />
            <Input label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="size-4 accent-brand-600" {...register('remember')} /> Remember me
              </label>
              <button type="button" className="font-semibold text-brand-700 hover:underline" onClick={() => alert('Password reset is not available in this front-end demo.')}>
                Forgot password?
              </button>
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </>
      )}
    </AuthLayout>
  )
}
