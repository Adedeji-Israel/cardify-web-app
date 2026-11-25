import clsx from 'clsx'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Cardify home" className="inline-flex shrink-0">
      <img src={logo} alt="Cardify" width={640} height={152} className={clsx('h-8 w-auto sm:h-9', className)} />
    </Link>
  )
}
