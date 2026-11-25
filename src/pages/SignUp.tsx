import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Check, CheckCircle2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { FieldPath, Resolver } from 'react-hook-form'
import { Link } from 'react-router-dom'
import googleIcon from '@/assets/images/google-icon.webp'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { usePageMeta } from '@/hooks/usePageMeta'
import { signUpStep1, signUpStep2, signUpStep3, signUpStep4 } from '@/lib/schemas'
import type { SignUpValues } from '@/lib/schemas'

const STEPS = [
  { title: 'Your email', hint: 'Start with the email you want to use for Cardify.' },
  { title: 'Personal details', hint: 'Make sure these are correct — they’re used to verify your identity.' },
  { title: 'Your identifiers', hint: 'Your username and password must be unique to you.' },
  { title: 'Almost done', hint: 'Add a referral code if you have one.' },
] as const

const STEP_FIELDS: FieldPath<SignUpValues>[][] = [
  ['email'],
  ['firstName', 'lastName'],
  ['username', 'phone', 'password', 'confirmPassword'],
  ['referral', 'heardFrom', 'terms'],
]
const STEP_SCHEMAS = [signUpStep1, signUpStep2, signUpStep3, signUpStep4]

export default function SignUp() {
  usePageMeta('Create your free account — Cardify')
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const stepRef = useRef(0)
  stepRef.current = step

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    // Validate against the schema for the step the user is currently on.
    resolver: (values, ctx, opts) =>
      (zodResolver(STEP_SCHEMAS[stepRef.current]) as unknown as Resolver<SignUpValues>)(values, ctx, opts),
    mode: 'onTouched',
    defaultValues: { heardFrom: '', terms: false },
  })

  const validateStep = () => trigger(STEP_FIELDS[step])

  const next = async () => {
    if (await validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  // Front-end only: simulate account creation. Nothing is sent or stored.
  const onSubmit = async () => {
    if (!(await validateStep())) return
    await new Promise((r) => setTimeout(r, 1000))
    setDone(true)
  }

  const last = step === STEPS.length - 1

  return (
    <AuthLayout
      title="Create your free account"
      subtitle="Join 100k+ people using Cardify to spend, save and get paid."
      footer={
        <>
          Already have a Cardify account?{' '}
          <Link to="/signin" className="font-bold text-brand-700 hover:underline">
            Sign in instead
          </Link>
        </>
      }
    >
      {done ? (
        <div className="rounded-3xl bg-brand-50 p-8 text-center" role="status">
          <CheckCircle2 className="mx-auto text-brand-600" size={48} />
          <h2 className="mt-3 text-xl font-bold">Account created (demo)</h2>
          <p className="mt-2 text-sm text-muted">This is a front-end demo — no data was sent or saved.</p>
          <Button to="/signin" className="mt-5">
            Go to sign in
          </Button>
        </div>
      ) : (
        <>
          {/* Stepper */}
          <ol className="mb-6 flex items-center gap-2" aria-label="Progress">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-1 items-center gap-2" aria-current={i === step ? 'step' : undefined}>
                <span
                  className={clsx(
                    'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    i < step && 'bg-brand-600 text-white',
                    i === step && 'bg-brand-100 text-brand-800 ring-2 ring-brand-600',
                    i > step && 'bg-surface text-muted',
                  )}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </span>
                {i < STEPS.length - 1 && <span className={clsx('h-0.5 flex-1 rounded', i < step ? 'bg-brand-600' : 'bg-line')} />}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <>
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-line bg-white text-sm font-semibold transition-colors hover:border-brand-600"
                onClick={() => alert('Google sign-up is not connected in this front-end demo.')}
              >
                <img src={googleIcon} alt="" width={20} height={20} /> Sign up with Google
              </button>
              <div className="my-6 flex items-center gap-4 text-xs font-semibold text-muted uppercase">
                <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
              </div>
            </>
          )}

          <h2 className="text-lg font-bold">{STEPS[step].title}</h2>
          <p className="mt-1 mb-5 text-sm text-muted">{STEPS[step].hint}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (last) void handleSubmit(onSubmit)(e)
              else void next()
            }}
            noValidate
            className="grid gap-5"
          >
            {/* All steps stay mounted so values persist; only the active one is shown. */}
            <div className={clsx('grid gap-5', step !== 0 && 'hidden')}>
              <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
            </div>
            <div className={clsx('grid gap-5 sm:grid-cols-2', step !== 1 && 'hidden')}>
              <Input label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
              <Input label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
            </div>
            <div className={clsx('grid gap-5', step !== 2 && 'hidden')}>
              <Input label="Username" autoComplete="username" error={errors.username?.message} {...register('username')} />
              <Input label="Phone number" type="tel" autoComplete="tel" placeholder="+234 801 234 5678" error={errors.phone?.message} {...register('phone')} />
              <Input label="Password" type="password" autoComplete="new-password" hint="8+ characters, with an uppercase letter and a number." error={errors.password?.message} {...register('password')} />
              <Input label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
            </div>
            <div className={clsx('grid gap-5', step !== 3 && 'hidden')}>
              <Input label="Referral code (optional)" error={errors.referral?.message} {...register('referral')} />
              <Select label="How did you hear about us?" error={errors.heardFrom?.message} {...register('heardFrom')}>
                <option value="">Select…</option>
                <option>Friend or family</option>
                <option>YouTube</option>
                <option>Instagram / X / TikTok</option>
                <option>Google search</option>
                <option>Event or meetup</option>
                <option>Other</option>
              </Select>
              <div>
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-0.5 size-4 accent-brand-600" {...register('terms')} />
                  <span>I agree to Cardify’s Terms of Use and Privacy Policy.</span>
                </label>
                {errors.terms && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {step > 0 && (
                <Button type="button" variant="secondary" size="lg" onClick={() => setStep((s) => s - 1)}>
                  Previous
                </Button>
              )}
              <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                {last ? (isSubmitting ? 'Creating account…' : 'Create account') : 'Next'}
              </Button>
            </div>
          </form>
        </>
      )}
    </AuthLayout>
  )
}
