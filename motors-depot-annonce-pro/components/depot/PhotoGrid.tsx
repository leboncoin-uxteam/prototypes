'use client'

import { useRef } from 'react'

const PHOTO_SLOTS = [
  { label: '3/4 avant gauche', icon: 'front' },
  { label: '3/4 arrière droit', icon: 'rear' },
  { label: 'Intérieur conducteur', icon: 'interior' },
  { label: 'Intérieur passager', icon: 'interior' },
  { label: 'Profil gauche', icon: 'side' },
]

function CarIcon({ type }: { type: string }) {
  if (type === 'interior') {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-support/60">
        <rect x="8" y="24" width="48" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 24v-8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="38" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="44" cy="38" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M28 32h8M28 40h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-support/60">
      <path d="M10 40h44M14 40l4-12h28l4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 28l4-8h20l4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="44" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="44" cy="44" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 40v-4h40v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

interface PhotoGridProps {
  photos: string[]
  onAdd: (files: File[]) => void
}

export function PhotoGrid({ photos, onAdd }: PhotoGridProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length) onAdd(files)
    e.target.value = ''
  }

  return (
    <div>
      <p className="font-bold text-[16px] leading-6 text-on-background mb-4">
        Vos photos<span className="text-error text-[12px] ml-0.5">*</span>
      </p>
      <div className="grid grid-cols-4 gap-6">
        {/* Add slot */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-[150px] h-[150px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-support rounded-lg bg-support-container/30 hover:bg-support-container/50 transition-colors"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-support">
            <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M24 20v8M20 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 10l2-4h12l2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[13px] font-bold text-support text-center px-2 leading-4">Ajouter des photos</span>
        </button>

        {/* Photo slots or uploaded photos */}
        {PHOTO_SLOTS.map((slot, i) => {
          const photo = photos[i]
          return (
            <div
              key={slot.label}
              className="w-[150px] h-[150px] flex flex-col items-center justify-center gap-2 border border-dashed border-outline rounded-lg bg-surface"
            >
              {photo ? (
                <img src={photo} alt={slot.label} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <>
                  <CarIcon type={slot.icon} />
                  <span className="text-[12px] text-on-surface/60 text-center px-2 leading-4">{slot.label}</span>
                </>
              )}
            </div>
          )
        })}
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={handleFiles} />
    </div>
  )
}
