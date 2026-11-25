import { ArrowLeft, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import cards from '@/assets/images/cards-mockup.webp'
import { Logo } from '../ui/Logo'

type Props = { title: string; subtitle: string; children: ReactNode; footer: ReactNode }

/** Split-screen layout for sign in / create account. The brand panel hides on small screens. */
export function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-4 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 text-center text-sm text-muted">{footer}</div>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-brand-800 lg:flex lg:items-center lg:justify-center">
        <div aria-hidden className="absolute -top-24 -right-24 size-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-24 size-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative z-10 max-w-md px-10 text-white">
          <img src={cards} alt="" width={900} height={900} className="mx-auto mb-8 w-72 animate-float rounded-3xl shadow-lift" />
          <h2 className="text-3xl font-extrabold text-balance">Spend, save and get paid across borders.</h2>
          <p className="mt-3 text-white/75">Dollar cards, gift cards, US ACH accounts and bills — all from one Cardify account.</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck size={16} /> 100k+ verified users trust Cardify
          </p>
        </div>
      </aside>
    </div>
  )
}
