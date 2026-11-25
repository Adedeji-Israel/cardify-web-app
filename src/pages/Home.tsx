import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Banknote, CreditCard, Gift, Landmark, Store } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import appExplore from '@/assets/images/app-explore.webp'
import appStore from '@/assets/images/app-store.webp'
import businessCard from '@/assets/images/business-card-mockup.webp'
import cards from '@/assets/images/cards-mockup.webp'
import googlePlay from '@/assets/images/google-play.webp'
import walletMockup from '@/assets/images/wallet-mockup.webp'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HERO_HEADLINES, PRESS, PRODUCTS, RESOURCES, SITE, STATS } from '@/data/site'
import type { Product } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'

const ICONS: Record<Product['icon'], LucideIcon> = {
  card: CreditCard,
  gift: Gift,
  bank: Landmark,
  store: Store,
  naira: Banknote,
}

function RotatingHeadline() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % HERO_HEADLINES.length), 3800)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <h1 className="relative min-h-[8.5rem] text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:min-h-[10rem] sm:text-5xl lg:min-h-[13rem] lg:text-6xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="block"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          {HERO_HEADLINES[i]}
        </motion.span>
      </AnimatePresence>
    </h1>
  )
}

function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={SITE.external.app} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
        <img src={appStore} alt="Download on the App Store" width={134} height={45} className="h-11 w-auto transition-transform hover:scale-105" />
      </a>
      <a href={SITE.external.app} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
        <img src={googlePlay} alt="Get it on Google Play" width={134} height={52} className="h-11 w-auto rounded-md border border-line transition-transform hover:scale-105" />
      </a>
    </div>
  )
}

export default function Home() {
  usePageMeta(
    'Cardify Africa — Dollar cards, gift cards & more',
    'Create and fund dollar cards with NGN & USDT, trade gift cards, get paid with US ACH accounts, pay bills and share digital business cards.',
  )

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div aria-hidden className="absolute -top-40 -right-40 size-[34rem] rounded-full bg-brand-200/50 blur-3xl" />
        <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-card">
              <span className="size-2 rounded-full bg-brand-500" /> Trusted by 100k+ people across Africa
            </p>
            <RotatingHeadline />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Cardify lets you create virtual dollar cards, buy and sell gift cards, get paid in USD, pay bills and share digital business
              cards — all with NGN and USDT.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/signup" size="lg">
                Create free account <ArrowRight size={18} />
              </Button>
              <Button to="/about" variant="secondary" size="lg">
                Learn more
              </Button>
            </div>
            <StoreBadges className="mt-8" />
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <img
              src={cards}
              alt="The Cardify app showing a dollar card and recent transactions"
              width={900}
              height={900}
              fetchPriority="high"
              className="animate-float mx-auto w-full max-w-lg rounded-[2rem] shadow-lift"
            />
          </div>
        </Container>
      </section>

      {/* TRIBE + STATS */}
      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Join the Cardify tribe"
              title="Virtual cards, gift cards, bills and business cards in one place"
              description="Stop juggling apps. Cardify is the one stop for moving money across NGN, USDT and USD — simply and securely."
            />
          </Reveal>
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.08}>
                <div className="rounded-3xl bg-brand-50 p-6 text-center">
                  <dt className="order-2 mt-1 text-sm font-medium text-muted">{s.label}</dt>
                  <dd className="text-4xl font-extrabold text-brand-700">{s.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="scroll-mt-20 bg-surface py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Solutions you need" title="Everything money-related, handled" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, idx) => {
              const Icon = ICONS[p.icon]
              return (
                <Reveal key={p.id} delay={(idx % 3) * 0.08}>
                  <article className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        <Icon size={24} />
                      </span>
                      {p.badge && (
                        <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">{p.badge}</span>
                      )}
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                    <a
                      href={SITE.external.app}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:gap-3 transition-all"
                    >
                      {p.cta} <ArrowRight size={16} />
                    </a>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* SHOWCASE: wallet + business card */}
      <section className="py-20">
        <Container className="space-y-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <img src={walletMockup} alt="Cardify wallet screen with NGN balance" width={900} height={900} loading="lazy" className="mx-auto w-full max-w-md rounded-[2rem]" />
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading
                align="left"
                eyebrow="A vibrant community"
                title="Join the #Cardified"
                description="From events and panels to tech meetups across Africa, the Cardify community is where people learn, trade and grow together."
              />
              <ul className="mt-6 space-y-3 text-sm font-medium">
                {['24/7 human customer service', 'Transactions with no hidden fees', 'Instant NGN & USDT funding'].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <Button href={SITE.external.youtube} variant="secondary" className="mt-8">
                Watch the event series
              </Button>
            </Reveal>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="lg:order-2">
              <img src={businessCard} alt="A Cardify digital business card shared by tap or QR code" width={900} height={900} loading="lazy" className="mx-auto w-full max-w-md rounded-[2rem]" />
            </Reveal>
            <Reveal delay={0.1} className="lg:order-1">
              <SectionHeading
                align="left"
                eyebrow="Cardify Store"
                title="Digital business cards, one tap away"
                description="Create, customise and instantly share a digital business card with anyone, anywhere — with a tap, a scan or a link."
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {['One-tap sharing', 'QR codes', 'Dedicated link'].map((t) => (
                  <span key={t} className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                    {t}
                  </span>
                ))}
              </div>
              <Button to="/signup" className="mt-8">
                Get your card
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* RESOURCES */}
      <section className="bg-surface py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Resources" title="Learn, watch and get help" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.map((r, idx) => (
              <Reveal key={r.title} delay={idx * 0.06}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-3xl bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted">{r.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-700 group-hover:gap-3 transition-all">
                    Visit <ArrowRight size={16} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-brand-800 px-6 py-14 text-white sm:px-12 lg:px-16">
              <div aria-hidden className="absolute -top-20 -left-20 size-72 rounded-full bg-brand-600/50 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">Join 100k+ people who use Cardify Africa</h2>
                  <p className="mt-4 max-w-lg text-white/75">Download the app and create your first dollar card in minutes.</p>
                  <StoreBadges className="mt-8" />
                </div>
                <img src={appExplore} alt="" width={544} height={585} loading="lazy" className="mx-auto hidden w-64 rounded-3xl bg-white p-2 shadow-lift lg:block" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* PRESS */}
      <section className="pb-4">
        <Container>
          <p className="text-center text-xs font-semibold tracking-widest text-muted uppercase">As featured in</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-extrabold text-ink/30">
            {PRESS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
