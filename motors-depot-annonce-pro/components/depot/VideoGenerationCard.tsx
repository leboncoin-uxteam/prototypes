function SparksIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l1.8 5.2 5.2 1.8-5.2 1.8L10 15.5l-1.8-5.2L3 8.5l5.2-1.8L10 1.5z" />
      <path d="M16 1l.9 2.1L19 4l-2.1.9L16 7l-.9-2.1L13 4l2.1-.9L16 1z" opacity="0.6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
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
        <span className="shrink-0 mt-0.5 w-4 text-center leading-none">—</span>
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
      {/* Header */}
      <div className="flex items-center gap-2">
        <SparksIcon className="text-ai shrink-0" />
        <span className="font-bold text-[18px] leading-6 text-on-surface flex-1">
          Génération d'une vidéo avec l'IA
        </span>
        <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-accent-container text-on-accent-container shrink-0">
          Option
        </span>
      </div>

      {/* Description */}
      <p className="text-[16px] leading-6 text-on-surface">
        Vous pouvez désormais choisir de générer une vidéo de votre véhicule, pour cela vous avez besoin de :
      </p>

      {/* Criteria */}
      <div className="flex flex-col gap-2">
        <Criterion
          met={hasEnoughPhotos}
          labelUnmet="5 photos ou plus"
          labelMet="5 photos ou plus ajoutées"
        />
        <Criterion
          met={hasVehicleInfo}
          labelUnmet="Marque, Modèle, Année & Couleur renseignés"
          labelMet="Marque, Modèle, Année & Couleur ajoutés"
        />
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={canGenerate ? onGenerate : undefined}
        className={`inline-flex items-center gap-2 font-bold text-[16px] px-6 py-3 rounded-full bg-ai text-on-ai transition-opacity ${
          canGenerate ? 'hover:opacity-90 cursor-pointer' : 'cursor-not-allowed'
        }`}
        style={{ opacity: canGenerate ? 1 : 0.4 }}
      >
        <SparksIcon />
        Générer une vidéo
      </button>
    </div>
  )
}
