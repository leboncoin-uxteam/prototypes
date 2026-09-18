'use client'

import { useRouter } from 'next/navigation'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function DepositHeader() {
  const router = useRouter()

  return (
    <header
      className="sticky top-0 z-50 w-full bg-surface"
      style={{ boxShadow: '0 4px 8px rgba(108,129,157,0.5)' }}
    >
      <div className="max-w-[1440px] mx-auto px-[187px] h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/leboncoin-logo.svg`}
            alt="leboncoin"
            width={164}
            height={30}
            style={{ height: 30, width: 164 }}
          />
          <span className="text-[16px] font-bold text-support leading-6">
            Déposer une annonce
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="border border-support rounded-full px-5 py-2 text-[14px] font-bold text-support hover:bg-support-container transition-colors"
        >
          Quitter
        </button>
      </div>
    </header>
  )
}
