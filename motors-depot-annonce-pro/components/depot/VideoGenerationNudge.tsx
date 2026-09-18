'use client'

import { useEffect, useState } from 'react'

export const CARD_ID = 'video-generation-card'

const SHADOW = '0 12px 24px rgba(108,129,157,0.5)'
const BORDER = '1px solid rgba(172,184,199,0.4)'

// Hauteur naturelle du nudge (px) — sert de diamètre initial du cercle
const CIRCLE_SIZE = 64

function SpinnerIcon() {
  return (
    <span
      className="shrink-0 w-5 h-5 rounded-full border-2 animate-spin inline-block"
      style={{ borderColor: 'var(--color-support)', borderTopColor: 'transparent' }}
    />
  )
}

function SmallCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="8" fill="#1d6340" />
      <path d="M4.5 8l2.5 2.5 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 3v10l9-5z" />
    </svg>
  )
}

// Hook d'animation : cercle → pill (120ms) puis contenu (80ms)
function useNudgeEntrance() {
  const [expanded, setExpanded] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    // rAF garantit que le premier rendu (cercle) est peint avant la transition
    const raf = requestAnimationFrame(() => setExpanded(true))
    const t = setTimeout(() => setContentVisible(true), 130)
    return () => { cancelAnimationFrame(raf); clearTimeout(t) }
  }, [])

  return { expanded, contentVisible }
}

interface VideoGenerationNudgeProps {
  isGenerating: boolean
  currentStepLabel: string
  videoReady: boolean
}

export function VideoGenerationNudge({ isGenerating, currentStepLabel, videoReady }: VideoGenerationNudgeProps) {
  if (!isGenerating && !videoReady) return null

  return isGenerating
    ? <GeneratingNudge currentStepLabel={currentStepLabel} />
    : <GeneratedNudge />
}

function GeneratingNudge({ currentStepLabel }: { currentStepLabel: string }) {
  const { expanded, contentVisible } = useNudgeEntrance()

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-4 bg-white rounded-full overflow-hidden"
      style={{
        boxShadow: SHADOW,
        border: BORDER,
        width: expanded ? 278 : CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        transition: 'width 120ms cubic-bezier(0.2, 0, 0, 1)',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <SpinnerIcon />
      <div
        className="flex flex-col whitespace-nowrap"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 80ms ease-in',
        }}
      >
        <p className="font-bold text-[14px] leading-5 text-on-surface">Création de la vidéo ...</p>
        <p className="text-[14px] leading-5" style={{ color: 'rgba(58,71,87,0.72)' }}>
          {currentStepLabel}
        </p>
      </div>
    </div>
  )
}

function GeneratedNudge() {
  const { expanded, contentVisible } = useNudgeEntrance()

  function scrollToCard() {
    document.getElementById(CARD_ID)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center justify-between gap-2 bg-white rounded-full overflow-hidden"
      style={{
        boxShadow: SHADOW,
        border: BORDER,
        width: expanded ? 278 : CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        transition: 'width 120ms cubic-bezier(0.2, 0, 0, 1)',
        paddingLeft: 20,
        paddingRight: 8,
      }}
    >
      <div
        className="flex flex-col gap-0.5 whitespace-nowrap"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 80ms ease-in',
        }}
      >
        <div className="flex items-center gap-2">
          <p className="font-bold text-[14px] leading-5 text-on-surface">Vidéo générée</p>
          <SmallCheckIcon />
        </div>
        <p className="text-[14px] leading-5" style={{ color: 'rgba(58,71,87,0.72)' }}>
          Créée en 45.02 sec
        </p>
      </div>
      <button
        type="button"
        onClick={scrollToCard}
        className="flex items-center gap-2 font-bold text-[16px] leading-6 px-4 py-3 rounded-full text-white hover:opacity-90 transition-opacity shrink-0"
        style={{
          backgroundColor: 'var(--color-support)',
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 80ms ease-in',
        }}
      >
        <PlayIcon />
        Voir
      </button>
    </div>
  )
}
