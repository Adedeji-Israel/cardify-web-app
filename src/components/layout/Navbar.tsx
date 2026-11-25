import clsx from 'clsx'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PRIMARY_NAV, PRODUCT_MENU } from '@/data/site'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
      isActive ? 'bg-brand-50 text-brand-700' : 'text-ink/80 hover:bg-surface hover:text-ink',
    )

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b bg-white/85 backdrop-blur-lg transition-shadow',
        scrolled ? 'border-line shadow-card' : 'border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.slice(0, 1).map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass}>
              {l.label}
            </NavLink>
          ))}

          {/* Products dropdown (hover + keyboard focus) */}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:bg-surface hover:text-ink"
              aria-haspopup="true"
            >
              {PRODUCT_MENU.label}
              <ChevronDown size={16} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute top-full left-0 w-80 translate-y-1 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <ul className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                {PRODUCT_MENU.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50">
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className="block text-xs text-muted">{item.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {PRIMARY_NAV.slice(1).map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button to="/signin" variant="ghost">
            Sign in
          </Button>
          <Button to="/signup">Create free account</Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-surface lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={clsx(
          'absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white px-4 pt-4 pb-8 shadow-lift transition-all duration-300 lg:hidden',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {PRIMARY_NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                clsx('rounded-xl px-4 py-3 text-base font-semibold', isActive ? 'bg-brand-50 text-brand-700' : 'hover:bg-surface')
              }
            >
              {l.label}
            </NavLink>
          ))}
          <p className="mt-4 px-4 text-xs font-semibold tracking-wide text-muted uppercase">{PRODUCT_MENU.label}</p>
          {PRODUCT_MENU.items.map((item) => (
            <Link key={item.label} to={item.to} className="rounded-xl px-4 py-3 hover:bg-surface">
              <span className="block text-base font-semibold">{item.label}</span>
              <span className="block text-sm text-muted">{item.description}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-6 grid gap-3">
          <Button to="/signup" size="lg">
            Create free account
          </Button>
          <Button to="/signin" variant="secondary" size="lg">
            Sign in
          </Button>
        </div>
      </div>
    </header>
  )
}
