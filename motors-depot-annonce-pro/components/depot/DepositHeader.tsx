'use client'

import { useRouter } from 'next/navigation'

export function DepositHeader() {
  const router = useRouter()

  return (
    <header
      className="sticky top-0 z-50 bg-surface flex items-center justify-between px-8 h-[60px]"
      style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-main font-bold text-[20px] leading-none">leboncoin</span>
        <span className="text-on-surface/30 text-[16px]">|</span>
        <span className="text-on-surface text-[16px] font-normal">Déposer une annonce</span>
      </div>

      <button
        onClick={() => router.push('/')}
        className="border border-outline rounded-full px-4 py-1.5 text-[14px] text-on-surface hover:bg-neutral-container transition-colors"
      >
        Quitter
      </button>
    </header>
  )
}
