'use client'

interface FormToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  description?: string
}

export function FormToggle({ label, checked, onChange, description }: FormToggleProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors shrink-0 mt-0.5 ${
          checked ? 'bg-support' : 'bg-neutral-container'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-surface rounded-full shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </div>
      <div>
        <p className="text-[14px] leading-5 text-on-surface">{label}</p>
        {description && <p className="text-[12px] leading-4 text-neutral mt-0.5">{description}</p>}
      </div>
    </label>
  )
}
