import clsx from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'
import type { InputHTMLAttributes, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const control =
  'w-full rounded-xl border bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:bg-surface'

type Shared = { label: string; error?: string; hint?: string }

function Wrapper({
  id,
  label,
  error,
  hint,
  children,
}: Shared & { id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

type InputProps = Shared & InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }

export function Input({ label, error, hint, className, type, ref, ...rest }: InputProps) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={isPassword && visible ? 'text' : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={clsx(control, 'h-12', error ? 'border-red-400' : 'border-line', isPassword && 'pr-12', className)}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted hover:text-ink"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </Wrapper>
  )
}

type TextareaProps = Shared & TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: Ref<HTMLTextAreaElement> }

export function Textarea({ label, error, hint, className, ref, ...rest }: TextareaProps) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(control, 'min-h-32 py-3', error ? 'border-red-400' : 'border-line', className)}
        {...rest}
      />
    </Wrapper>
  )
}

type SelectProps = Shared & SelectHTMLAttributes<HTMLSelectElement> & { ref?: Ref<HTMLSelectElement> }

export function Select({ label, error, hint, className, children, ref, ...rest }: SelectProps) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <select
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(control, 'h-12', error ? 'border-red-400' : 'border-line', className)}
        {...rest}
      >
        {children}
      </select>
    </Wrapper>
  )
}
