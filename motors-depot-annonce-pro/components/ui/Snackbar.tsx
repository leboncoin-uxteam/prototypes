'use client'

import { useEffect, useState } from 'react'

interface SnackbarProps {
  message: string
  visible: boolean
  onHide: () => void
  duration?: number
}

export function Snackbar({ message, visible, onHide, duration = 3000 }: SnackbarProps) {
  const [rendered, setRendered] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (visible) {
      setRendered(true)
      const t1 = requestAnimationFrame(() => setShown(true))
      const t2 = setTimeout(() => setShown(false), duration - 200)
      const t3 = setTimeout(() => { setRendered(false); onHide() }, duration)
      return () => { cancelAnimationFrame(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [visible])

  if (!rendered) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-success-container)',
        border: '2px solid var(--color-success)',
        boxShadow: '0 4px 12px rgba(108,129,157,0.3)',
        transform: shown ? 'translateX(0)' : 'translateX(calc(100% + 24px))',
        transition: 'transform 220ms cubic-bezier(0.2, 0, 0, 1)',
        minWidth: 320,
        willChange: 'transform',
      }}
    >
      {/* Icône check */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
        <circle cx="14" cy="14" r="14" fill="var(--color-success)" />
        <path d="M8 14l4.5 4.5 8.5-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <p className="text-[16px] leading-6" style={{ color: 'var(--color-on-success-container)' }}>
        {message}
      </p>
    </div>
  )
}
