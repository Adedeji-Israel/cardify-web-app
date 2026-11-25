import { Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import appStore from '@/assets/images/app-store.webp'
import googlePlay from '@/assets/images/google-play.webp'
import { DISCLAIMER, FOOTER_GROUPS, SITE } from '@/data/site'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="inline-block rounded-xl bg-white px-4 py-2.5">
              <Logo className="h-7" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={SITE.external.app} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
                <img src={appStore} alt="Download on the App Store" width={120} height={40} className="h-10 w-auto" />
              </a>
              <a href={SITE.external.app} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
                <img src={googlePlay} alt="Get it on Google Play" width={120} height={46} className="h-10 w-auto rounded-md bg-white" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_GROUPS.map((g) => (
              <div key={g.title}>
                <h3 className="text-sm font-bold text-white">{g.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      {'external' in l && l.external ? (
                        <a href={l.to} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-300">
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.to} className="transition-colors hover:text-brand-300">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-sm font-bold text-white">Support</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-brand-300">
                    <Mail size={14} /> Email
                  </a>
                </li>
                <li>
                  <a href={SITE.external.app} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-300">
                    <MessageCircle size={14} /> Live chat
                  </a>
                </li>
                <li>
                  <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2 hover:text-brand-300">
                    <Phone size={14} /> Call us
                  </a>
                </li>
                <li className="text-xs text-white/50">{SITE.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-white/50">{DISCLAIMER}</p>
          <p className="mt-4 text-xs text-white/50">© 2022–{new Date().getFullYear()} Cardify Africa. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
