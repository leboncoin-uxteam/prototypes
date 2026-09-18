interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  label: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
}

export function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-bold text-[16px] leading-6 text-on-background">{label}</p>
      <div className="flex flex-col gap-4 mt-2">
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={label}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected ? 'border-support' : 'border-outline'
                }`}
              >
                {selected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-support" />
                )}
              </div>
              <span className="text-[16px] leading-6 text-on-surface">{opt.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
