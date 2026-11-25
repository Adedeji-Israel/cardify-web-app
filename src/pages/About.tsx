import { Eye, Rocket, ShieldCheck, Sparkles, Target, Wallet } from 'lucide-react'
import team from '@/assets/images/team.webp'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePageMeta } from '@/hooks/usePageMeta'

const VALUES = [
  { icon: Sparkles, title: 'Simplicity first', text: 'Onboarding as easy as A, B, C — no jargon, no friction.' },
  { icon: ShieldCheck, title: 'Secure from the start', text: 'Security and privacy are built into every feature we ship.' },
  { icon: Wallet, title: 'No hidden fees', text: 'You get what you see. Transparent pricing, always.' },
  { icon: Rocket, title: 'Always improving', text: 'We keep adding solutions to receive, sell and spend money.' },
]

export default function About() {
  usePageMeta('About Cardify Africa', 'Learn the Cardify story, our mission and our vision for seamless money movement across Africa.')

  return (
    <>
      <section className="bg-surface">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <Reveal>
            <p className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-brand-700 uppercase shadow-card">
              About us
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Getting things done in a limitless framework
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Cardify gives people the power to use fiat and digital currencies for everyday payment needs — from dollar cards and gift cards to
              US accounts and bills.
            </p>
            <Button to="/signup" size="lg" className="mt-8">
              Get started
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={team} alt="The Cardify team" width={500} height={508} fetchPriority="high" className="mx-auto w-full max-w-sm rounded-full shadow-lift" />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-4xl">
          <Reveal>
            <SectionHeading align="left" eyebrow="Our story" title="Revolutionising how you manage money" />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Cardify Africa is a startup changing the way you manage your wallets. With a focus on flexibility and efficiency, we make
                spending across fiat and digital currencies as effortless as possible.
              </p>
              <p>
                Deposit into popular wallets, convert flexibly within and outside the system, and spend directly from virtual cards for
                frictionless payments, wherever you are.
              </p>
              <p>
                And we’re not stopping there. We’re continuously building new ways for you to receive, sell and spend money — guided by our
                brand values.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          {[
            {
              icon: Target,
              title: 'Our mission',
              text: 'To empower individuals and businesses with a seamless platform for efficient, flexible fund management across fiat and digital currencies — secure, reliable and customer-centric, driving financial inclusion and economic growth.',
            },
            {
              icon: Eye,
              title: 'Our vision',
              text: 'A future where people can move funds between wallets effortlessly, and where Cardify Africa is synonymous with trust, innovation and excellence — a catalyst for financial empowerment across Africa and beyond.',
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-white p-8 shadow-card">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <c.icon size={24} />
                </span>
                <h2 className="mt-5 text-2xl font-bold">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What we stand for" title="Simplicity is of the essence at Cardify" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-line p-6">
                  <v.icon className="text-brand-600" size={26} />
                  <h3 className="mt-4 font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
