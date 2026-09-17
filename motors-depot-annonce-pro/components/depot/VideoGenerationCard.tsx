'use client'

import { useEffect, useState } from 'react'

// ─── Icônes ───────────────────────────────────────────────────────────────────

function SparksIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className={className} style={style}>
      <path d="M10 2l1.6 4.8L16.4 8.4l-4.8 1.6L10 14.8l-1.6-4.8L3.6 8.4l4.8-1.6L10 2z" />
      <path d="M16.5 1l.8 2.2L19.5 4l-2.2.8L16.5 7l-.8-2.2L13.5 4l2.2-.8L16.5 1z" opacity="0.7" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill="#1d6340" />
      <path d="M5.5 10l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <span
      className="shrink-0 w-5 h-5 rounded-full border-2 border-t-transparent animate-spin inline-block"
      style={{ borderColor: 'var(--color-ai)', borderTopColor: 'transparent' }}
    />
  )
}

function PendingCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="9" stroke="#acb8c7" strokeWidth="1.5" />
    </svg>
  )
}

// ─── Critères (état avant génération) ─────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[3px]">
      <path d="M13 4L6.5 10.5 3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface CriterionProps {
  met: boolean
  labelMet: string
  labelUnmet: string
}

function Criterion({ met, labelMet, labelUnmet }: CriterionProps) {
  return (
    <div className={`flex items-start gap-2 text-[16px] leading-6 ${met ? 'text-success' : 'text-on-background/60'}`}>
      {met ? <CheckIcon /> : <span className="shrink-0 w-4 text-center select-none">—</span>}
      <span>{met ? labelMet : labelUnmet}</span>
    </div>
  )
}

// ─── Étapes de génération ─────────────────────────────────────────────────────

const STEPS = [
  { label: 'Analyse des photos',   duration: 6000  },
  { label: 'Ordonnancement',       duration: 8000  },
  { label: 'Fond studio',          duration: 10000 },
  { label: 'Génération des clips', duration: 14000 },
  { label: 'Assemblage de la vidéo', duration: 7000 },
]

type StepState = 'pending' | 'active' | 'done'

// ─── Composant principal ──────────────────────────────────────────────────────

interface VideoGenerationCardProps {
  hasEnoughPhotos: boolean
  hasVehicleInfo: boolean
  onGenerate: () => void
  isGenerating?: boolean
  onGenerationComplete?: () => void
}

export function VideoGenerationCard({
  hasEnoughPhotos,
  hasVehicleInfo,
  onGenerate,
  isGenerating = false,
  onGenerationComplete,
}: VideoGenerationCardProps) {
  const canGenerate = hasEnoughPhotos && hasVehicleInfo
  const [currentStep, setCurrentStep] = useState<number>(-1)

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(-1)
      return
    }

    // Démarre à l'étape 0
    setCurrentStep(0)

    let elapsed = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, i) => {
      elapsed += step.duration
      const t = setTimeout(() => {
        if (i < STEPS.length - 1) {
          setCurrentStep(i + 1)
        } else {
          setCurrentStep(STEPS.length) // toutes done
          onGenerationComplete?.()
        }
      }, elapsed)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [isGenerating])

  // ── État génération en cours ──
  if (isGenerating) {
    const stepStates: StepState[] = STEPS.map((_, i) => {
      if (i < currentStep) return 'done'
      if (i === currentStep) return 'active'
      return 'pending'
    })

    return (
      <div className="border border-outline rounded-xl p-4 bg-surface flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <SparksIcon style={{ color: 'var(--color-ai)' }} className="shrink-0" />
          <span className="font-bold text-[18px] leading-6 text-on-surface">
            Génération d'une vidéo avec l'IA
          </span>
        </div>

        {/* Sous-titre */}
        <p className="text-[16px] leading-6 text-on-surface">
          Génération de votre vidéo en cours :
        </p>

        {/* Étapes */}
        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const state = stepStates[i]
            return (
              <div key={step.label} className="flex items-center gap-3">
                {state === 'done'   && <CheckCircleIcon />}
                {state === 'active' && <SpinnerIcon />}
                {state === 'pending' && <PendingCircleIcon />}
                <span className={`text-[16px] leading-6 ${
                  state === 'done'    ? 'text-on-surface font-bold' :
                  state === 'active'  ? 'text-on-surface font-bold' :
                  'text-on-background/40'
                }`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Bannière info */}
        <div
          className="flex items-start gap-3 rounded-lg p-3"
          style={{ backgroundColor: 'var(--color-support-container)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5" style={{ color: 'var(--color-support)' }}>
            <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="5.5" r="0.75" fill="currentColor" />
          </svg>
          <p className="text-[14px] leading-5" style={{ color: 'var(--color-support)' }}>
            Si vous complétez le dépôt d'annonce et passez à l'étape suivante alors que la vidéo est toujours en création, vous ne pourrez pas ajouter la vidéo.
          </p>
        </div>
      </div>
    )
  }

  // ── État initial (critères) ──
  return (
    <div className="border border-outline rounded-xl p-4 bg-surface flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <SparksIcon style={{ color: 'var(--color-ai)' }} className="shrink-0" />
        <span className="font-bold text-[18px] leading-6 text-on-surface">
          Génération d'une vidéo avec l'IA
        </span>
        <span className="text-[13px] font-bold px-2 py-0.5 rounded-md bg-main text-on-main shrink-0">
          Nouveau !
        </span>
      </div>

      {/* Description */}
      <p className="text-[16px] leading-6 text-on-surface">
        Vous pouvez désormais choisir de générer une vidéo de votre véhicule, pour cela vous avez besoin de :
      </p>

      {/* Critères */}
      <div className="flex flex-col gap-2">
        <Criterion
          met={hasEnoughPhotos}
          labelUnmet="5 photos ou plus"
          labelMet="5 photos ou plus ajoutées"
        />
        <Criterion
          met={hasVehicleInfo}
          labelUnmet="Marque, Modèle & Couleur renseignés"
          labelMet="Marque, Modèle, Année & Couleur ajoutés"
        />
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={canGenerate ? onGenerate : undefined}
        className="self-start inline-flex items-center gap-2 font-bold text-[16px] px-5 py-3 rounded-xl transition-opacity hover:opacity-90"
        style={{
          backgroundColor: 'var(--color-ai)',
          color: 'var(--color-on-ai)',
          opacity: canGenerate ? 1 : 0.4,
          cursor: canGenerate ? 'pointer' : 'not-allowed',
        }}
      >
        <SparksIcon />
        Générer une vidéo
      </button>
    </div>
  )
}
