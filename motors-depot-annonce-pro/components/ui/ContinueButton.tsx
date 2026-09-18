interface ContinueButtonProps {
  onClick?: () => void
  disabled?: boolean
  label?: string
}

export function ContinueButton({ onClick, disabled, label = 'Continuer' }: ContinueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-main text-on-main font-bold text-[16px] leading-6 py-3 rounded-full disabled:opacity-50 transition-colors active:bg-main-hovered"
    >
      {label}
    </button>
  )
}
