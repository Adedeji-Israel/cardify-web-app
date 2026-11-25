import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Clock, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input, Select, Textarea } from '@/components/ui/Field'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { contactSchema } from '@/lib/schemas'
import type { ContactValues } from '@/lib/schemas'

const INFO = [
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^+\d]/g, '')}` },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, label: 'Support hours', value: SITE.hours },
]

export default function Contact() {
  usePageMeta('Contact Cardify', 'Get in touch with the Cardify team. We reply as soon as possible.')
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { topic: '' } })

  // Front-end only: simulate a network call. Swap this for a real endpoint (e.g. Formspree / your API) later.
  const onSubmit = async (_values: ContactValues) => {
    await new Promise((r) => setTimeout(r, 900))
    setSent(true)
    reset()
  }

  return (
    <>
      <section className="bg-surface">
        <Container className="py-16 text-center lg:py-20">
          <Reveal>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">We’d love to hear from you</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">A member of the team will reach out to you as soon as possible.</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {INFO.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.07}>
                <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <i.icon size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted uppercase">{i.label}</p>
                    {i.href ? (
                      <a href={i.href} className="font-bold break-words hover:text-brand-700">
                        {i.value}
                      </a>
                    ) : (
                      <p className="font-bold">{i.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-6 shadow-lift sm:p-8">
              {sent ? (
                <div className="py-10 text-center" role="status">
                  <CheckCircle2 className="mx-auto text-brand-600" size={52} />
                  <h2 className="mt-4 text-2xl font-bold">Message sent</h2>
                  <p className="mt-2 text-muted">Thanks for reaching out — we’ll get back to you shortly.</p>
                  <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">Send us a message</h2>
                  <p className="mt-1 text-sm text-muted">If you have any query, please contact us.</p>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input label="Full name" autoComplete="name" placeholder="Adaeze Obi" error={errors.name?.message} {...register('name')} />
                      <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
                    </div>
                    <Select label="Topic" error={errors.topic?.message} {...register('topic')}>
                      <option value="">Select a topic…</option>
                      <option>Dollar cards</option>
                      <option>Gift cards</option>
                      <option>US ACH account</option>
                      <option>Bills & store</option>
                      <option>Something else</option>
                    </Select>
                    <Textarea label="Message" placeholder="How can we help?" error={errors.message?.message} {...register('message')} />
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Send message'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
