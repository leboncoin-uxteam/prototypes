function SparksIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 2l1.6 4.8L16.4 8.4l-4.8 1.6L10 14.8l-1.6-4.8L3.6 8.4l4.8-1.6L10 2z" />
      <path d="M16.5 1l.8 2.2L19.5 4l-2.2.8L16.5 7l-.8-2.2L13.5 4l2.2-.8L16.5 1z" opacity="0.7" />
    </svg>
  )
}

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
      {met ? (
        <CheckIcon />
      ) : (
        <span className="shrink-0 w-4 text-center select-none">—</span>
      )}
      <span>{met ? labelMet : labelUnmet}</span>
    </div>
  )
}

interface VideoGenerationCardProps {
  hasEnoughPhotos: boolean
  hasVehicleInfo: boolean
  onGenerate: () => void
}

export function VideoGenerationCard({ hasEnoughPhotos, hasVehicleInfo, onGenerate }: VideoGenerationCardProps) {
  const canGenerate = hasEnoughPhotos && hasVehicleInfo

  return (
    <div className="border border-outline rounded-xl p-4 bg-surface flex flex-col gap-4">
      {/* Header: icône + titre + tag "Nouveau !" */}
      <div className="flex items-center gap-2 flex-wrap">
        <SparksIcon className="text-ai shrink-0" />
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
        className="inline-flex items-center gap-2 font-bold text-[16px] px-5 py-3 rounded-xl bg-ai text-on-ai transition-opacity hover:opacity-90"
        style={{ opacity: canGenerate ? 1 : 0.4, cursor: canGenerate ? 'pointer' : 'not-allowed' }}
      >
        <SparksIcon />
        Générer une vidéo
      </button>
    </div>
  )
}
