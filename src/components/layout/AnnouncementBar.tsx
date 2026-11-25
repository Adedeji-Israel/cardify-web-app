import { X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'cardify:announcement-dismissed'

function readDismissed() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(readDismissed)
  if (dismissed) return null

  return (
    <div className="relative bg-brand-800 px-10 py-2.5 text-center text-sm text-white">
      <span className="font-semibold">Cardify Digital Business Cards are live 🎉</span>{' '}
      <Link to="/signup" className="ml-1 font-bold underline underline-offset-4 hover:text-brand-200">
        Get yours
      </Link>
      <button
        type="button"
        aria-label="Dismiss announcement"
        className="absolute inset-y-0 right-2 flex w-9 items-center justify-center rounded-full hover:bg-white/10"
        onClick={() => {
          setDismissed(true)
          try {
            sessionStorage.setItem(KEY, '1')
          } catch {
            /* storage unavailable — dismissal just lasts for this render */
          }
        }}
      >
        <X size={16} />
      </button>
    </div>
  )
}
