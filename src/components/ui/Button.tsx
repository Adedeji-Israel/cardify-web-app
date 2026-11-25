import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-card hover:bg-brand-700 hover:shadow-lift',
  secondary: 'bg-white text-ink ring-1 ring-line hover:ring-brand-600 hover:text-brand-700',
  ghost: 'text-ink hover:bg-brand-50 hover:text-brand-700',
  dark: 'bg-ink text-white hover:bg-brand-900',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: undefined
    href?: undefined
  }
type RouterLinkProps = CommonProps & { to: string; href?: undefined; onClick?: () => void }
type AnchorProps = CommonProps & { href: string; to?: undefined }

export function Button(props: ButtonProps | RouterLinkProps | AnchorProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = clsx(base, variants[variant], sizes[size], className)

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    )
  }
  if (props.href !== undefined) {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  const { variant: _v, size: _s, className: _c, children: _ch, to: _t, href: _h, ...rest } = props
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
