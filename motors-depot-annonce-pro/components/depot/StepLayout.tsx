'use client'

import { useRouter } from 'next/navigation'

const TOTAL_STEPS = 6

interface StepLayoutProps {
  step: number
  title: string
  showBack?: boolean
  onBack?: () => void
  children: React.ReactNode
  footer: React.ReactNode
}

export function StepLayout({ step, title, showBack = false, onBack, children, footer }: StepLayoutProps) {
  const router = useRouter()
  const progress = (step / TOTAL_STEPS) * 100

  function handleBack() {
    if (onBack) return onBack()
    router.back()
  }

  function handleClose() {
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Status bar — decorative */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 bg-surface">
        <span className="text-[15px] font-semibold text-on-surface tracking-[-0.5px]">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
            <rect x="0" y="4" width="3" height="7" rx="0.5" fill="#152233" />
            <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" fill="#152233" />
            <rect x="9" y="1" width="3" height="10" rx="0.5" fill="#152233" />
            <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="#152233" opacity="0.3" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.2 2.5 12.1 3.5 13.4 5L15 3.3C13.2 1.3 10.8 0 8 0C5.2 0 2.8 1.3 1 3.3L2.6 5C3.9 3.5 5.8 2.5 8 2.5Z" fill="#152233" />
            <path d="M8 5.5C9.5 5.5 10.8 6.2 11.7 7.3L13.3 5.6C12 4.1 10.1 3.2 8 3.2C5.9 3.2 4 4.1 2.7 5.6L4.3 7.3C5.2 6.2 6.5 5.5 8 5.5Z" fill="#152233" />
            <circle cx="8" cy="10.5" r="1.5" fill="#152233" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#152233" strokeOpacity="0.35" />
            <rect x="1.5" y="1.5" width="18" height="9" rx="2" fill="#152233" />
            <path d="M23 4v4a2 2 0 0 0 0-4z" fill="#152233" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Nav header */}
      <div
        className="relative flex items-center justify-center h-[60px] bg-surface px-4"
        style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.1)' }}
      >
        {showBack && (
          <button
            onClick={handleBack}
            className="absolute left-4 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-container"
            aria-label="Retour"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="#152233" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <h1 className="font-bold text-[20px] leading-7 text-on-surface">{title}</h1>

        <button
          onClick={handleClose}
          className="absolute right-4 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-container"
          aria-label="Fermer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="#152233" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] w-full bg-neutral-container">
        <div
          className="h-full bg-support transition-all duration-medium ease-standard"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Sticky footer */}
      <div
        className="sticky bottom-0 bg-surface p-4"
        style={{ boxShadow: '0px -4px 8px rgba(108,129,157,0.3)' }}
      >
        {footer}
      </div>
    </div>
  )
}
