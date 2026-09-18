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
  onStepChange?: (label: string) => void
  videoReady?: boolean
  videoValidated?: boolean
  videoDeleted?: boolean
  thumbnailUrl?: string
  onValidate?: () => void
  onDeleteVideo?: () => void
}

export function VideoGenerationCard({
  hasEnoughPhotos,
  hasVehicleInfo,
  onGenerate,
  isGenerating = false,
  onGenerationComplete,
  onStepChange,
  videoReady = false,
  videoValidated = false,
  videoDeleted = false,
  thumbnailUrl,
  onValidate,
  onDeleteVideo,
}: VideoGenerationCardProps) {
  const canGenerate = hasEnoughPhotos && hasVehicleInfo
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const [showDialog, setShowDialog] = useState(false)
  const [showValidateDialog, setShowValidateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(-1)
      return
    }

    // Démarre à l'étape 0
    setCurrentStep(0)
    onStepChange?.(STEPS[0].label)

    let elapsed = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, i) => {
      elapsed += step.duration
      const t = setTimeout(() => {
        if (i < STEPS.length - 1) {
          setCurrentStep(i + 1)
          onStepChange?.(STEPS[i + 1].label)
        } else {
          setCurrentStep(STEPS.length) // toutes done
          onStepChange?.('')
          onGenerationComplete?.()
        }
      }, elapsed)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [isGenerating])

  // ── État vidéo supprimée ──
  if (videoDeleted) {
    return (
      <div className="border border-outline rounded-xl p-4 bg-surface flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <SparksIcon style={{ color: 'var(--color-ai)' }} className="shrink-0" />
          <span className="font-bold text-[18px] leading-6 text-on-surface">
            Génération d'une vidéo avec l'IA
          </span>
        </div>
        <div className="flex items-center gap-2 text-error">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[16px] leading-6">La vidéo ne sera pas visible sur votre annonce</span>
        </div>
      </div>
    )
  }

  // ── État vidéo validée (ajoutée à l'annonce) ──
  if (videoValidated) {
    return (
      <div className="border border-outline rounded-xl p-4 bg-surface flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <SparksIcon style={{ color: 'var(--color-ai)' }} className="shrink-0" />
          <span className="font-bold text-[18px] leading-6 text-on-surface">
            Génération d'une vidéo avec l'IA
          </span>
        </div>

        {/* Lecteur vidéo mock */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            background: thumbnailUrl ? `url(${thumbnailUrl}) center/cover no-repeat` : '#1a2535',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute top-3 right-3 z-10">
            <span className="text-white font-bold text-[13px] opacity-90 drop-shadow">leboncoin</span>
          </div>
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1 text-[12px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-ai)' }}
            >
              <SparksIcon style={{ width: 12, height: 12 }} />
              Vidéo via IA
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button type="button" className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-2 flex flex-col gap-1">
            <div className="w-full h-1 bg-white/30 rounded-full">
              <div className="w-0 h-full bg-white rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-[12px] font-medium drop-shadow">0:00 / 0:10</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white" opacity="0.8">
                <path d="M1 1h4v1.5H2.5V4H1V1zm10 0h4v3h-1.5V2.5H11V1zM1 11h1.5v1.5H4V14H1v-3zm10.5 1.5V11H13v3h-3v-1.5h1.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Statut + CTA Supprimer */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-success">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M13 4L6.5 10.5 3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[16px] leading-6 font-medium">La vidéo sera visible sur votre annonce</span>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            className="inline-flex items-center font-bold text-[14px] px-5 py-2.5 rounded-full border border-support text-support hover:bg-support-container transition-colors shrink-0"
          >
            Supprimer la vidéo
          </button>
        </div>

        {/* Dialog — Supprimer la vidéo (réutilisé) */}
        {showDeleteDialog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(21,34,51,0.6)' }}
            onClick={() => setShowDeleteDialog(false)}
          >
            <div
              className="bg-surface rounded-2xl max-w-[672px] w-full mx-6 flex flex-col overflow-hidden"
              style={{ boxShadow: '0 6px 12px rgba(108,129,157,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start px-6 pt-6 pb-4">
                <h2 className="font-bold text-[20px] leading-7 text-on-surface">
                  Voulez-vous vraiment supprimer la vidéo IA ?
                </h2>
              </div>
              <div className="px-6 pb-8 text-[16px] leading-7 text-on-surface">
                <p>Si vous supprimez la vidéo, il ne vous sera pas possible d'en générer une nouvelle pour cette annonce.</p>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4">
                <button type="button" onClick={() => setShowDeleteDialog(false)} className="font-bold text-[16px] text-on-surface px-5 py-2.5 rounded-full hover:bg-neutral-container transition-colors">
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => { setShowDeleteDialog(false); onDeleteVideo?.() }}
                  className="font-bold text-[16px] px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-error)' }}
                >
                  Supprimer la vidéo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── État vidéo générée ──
  if (videoReady) {
    return (
      <div className="border border-outline rounded-xl p-4 bg-surface flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <SparksIcon style={{ color: 'var(--color-ai)' }} className="shrink-0" />
          <span className="font-bold text-[18px] leading-6 text-on-surface">
            Génération d'une vidéo avec l'IA
          </span>
        </div>

        {/* Lecteur vidéo mock */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            background: thumbnailUrl ? `url(${thumbnailUrl}) center/cover no-repeat` : '#1a2535',
          }}
        >
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Watermark leboncoin */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-white font-bold text-[13px] opacity-90 drop-shadow">leboncoin</span>
          </div>

          {/* Tag ✦ Vidéo via IA */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1 text-[12px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-ai)' }}
            >
              <SparksIcon className="w-3 h-3" style={{ width: 12, height: 12 }} />
              Vidéo via IA
            </span>
          </div>

          {/* Bouton play centré */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              type="button"
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Barre de progression + timecode */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-2 flex flex-col gap-1">
            <div className="w-full h-1 bg-white/30 rounded-full">
              <div className="w-0 h-full bg-white rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-[12px] font-medium drop-shadow">0:00 / 0:10</span>
              {/* Fullscreen icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white" opacity="0.8">
                <path d="M1 1h4v1.5H2.5V4H1V1zm10 0h4v3h-1.5V2.5H11V1zM1 11h1.5v1.5H4V14H1v-3zm10.5 1.5V11H13v3h-3v-1.5h1.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Question + CTAs */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <p className="font-bold text-[16px] leading-6 text-on-surface">
              Le contenu est-il conforme à votre véhicule ?
            </p>
            <p className="text-[14px] leading-5 text-on-background/60">
              Vérifiez le contenu de la vidéo avant de continuer.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              className="inline-flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-xl border border-support text-support hover:bg-support-container transition-colors"
            >
              Supprimer
            </button>
            <button
              type="button"
              onClick={() => setShowValidateDialog(true)}
              className="inline-flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-xl text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--color-support)' }}
            >
              Valider la vidéo
            </button>
          </div>
        </div>

        {/* Dialog — Valider la vidéo */}
        {showValidateDialog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(21,34,51,0.6)' }}
            onClick={() => setShowValidateDialog(false)}
          >
            <div
              className="bg-surface rounded-2xl max-w-[672px] w-full mx-6 flex flex-col overflow-hidden"
              style={{ boxShadow: '0 6px 12px rgba(108,129,157,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-4">
                <h2 className="font-bold text-[20px] leading-7 text-on-surface">
                  Voulez-vous ajouter la vidéo IA à votre annonce ?
                </h2>
                <button
                  type="button"
                  onClick={() => setShowValidateDialog(false)}
                  className="shrink-0 ml-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-container transition-colors text-on-surface"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-4 text-[16px] leading-7 text-on-surface flex flex-col gap-2">
                <p>
                  Cette vidéo a été générée à partir des photographies de votre annonce. L'intelligence artificielle peut modifier ou altérer certains éléments visuels.
                </p>
                <p>Avant de la publier, vérifiez qu'elle représente fidèlement votre véhicule.</p>
                <p>En validant la vidéo, vous confirmez :</p>
                <ul className="list-disc pl-5 flex flex-col gap-1">
                  <li>disposer des droits et autorisations nécessaires sur les photographies utilisées ;</li>
                  <li>avoir vérifié le contenu de la vidéo ;</li>
                  <li>être responsable de son contenu lors de sa publication avec votre annonce.</li>
                </ul>
                <p>Cette vidéo ne constitue pas une validation de votre annonce par leboncoin.</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-outline">
                <button
                  type="button"
                  onClick={() => setShowValidateDialog(false)}
                  className="font-bold text-[16px] text-support px-5 py-2.5 rounded-full hover:bg-support-container transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => { setShowValidateDialog(false); onValidate?.() }}
                  className="font-bold text-[16px] px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-support)' }}
                >
                  Ajouter la vidéo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dialog — Supprimer la vidéo */}
        {showDeleteDialog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(21,34,51,0.6)' }}
            onClick={() => setShowDeleteDialog(false)}
          >
            <div
              className="bg-surface rounded-2xl max-w-[672px] w-full mx-6 flex flex-col overflow-hidden"
              style={{ boxShadow: '0 6px 12px rgba(108,129,157,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-4">
                <h2 className="font-bold text-[20px] leading-7 text-on-surface">
                  Voulez-vous vraiment supprimer la vidéo IA ?
                </h2>
              </div>

              {/* Content */}
              <div className="px-6 pb-8 text-[16px] leading-7 text-on-surface">
                <p>
                  Si vous supprimez la vidéo, il ne vous sera pas possible d'en générer une nouvelle pour cette annonce.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(false)}
                  className="font-bold text-[16px] text-on-surface px-5 py-2.5 rounded-full hover:bg-neutral-container transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => { setShowDeleteDialog(false); onDeleteVideo?.() }}
                  className="font-bold text-[16px] px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-error)' }}
                >
                  Supprimer la vidéo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

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
        onClick={canGenerate ? () => setShowDialog(true) : undefined}
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

      {/* Dialog de confirmation */}
      {showDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(21,34,51,0.6)' }}
          onClick={() => setShowDialog(false)}
        >
          <div
            className="bg-surface rounded-2xl p-8 max-w-[600px] w-full mx-6 flex flex-col gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-bold text-[22px] leading-7 text-on-surface">
                Générer une vidéo avec l'IA
              </h2>
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-container transition-colors text-on-surface"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Corps */}
            <p className="text-[16px] leading-7 text-on-surface">
              Cette fonctionnalité utilise l'intelligence artificielle pour générer une vidéo à partir des photographies de votre annonce. En poursuivant, vous confirmez disposer de l'ensemble des droits et autorisations nécessaires sur les photographies utilisées. La vidéo générée peut comporter des modifications, erreurs ou altérations. Vous devrez la prévisualiser avant de la publier. Vous disposerez également de la possibilité de la supprimer
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="font-bold text-[16px] text-on-surface px-5 py-3 rounded-full hover:bg-neutral-container transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => { setShowDialog(false); onGenerate() }}
                className="font-bold text-[16px] px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--color-support)', color: 'var(--color-on-support)' }}
              >
                Générer la vidéo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
