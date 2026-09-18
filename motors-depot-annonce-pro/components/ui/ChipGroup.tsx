interface ChipGroupProps {
  label?: string
  required?: boolean
  options: string[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  multi?: boolean
}

export function ChipGroup({ label, required, options, value, onChange, multi = false }: ChipGroupProps) {
  const selected = Array.isArray(value) ? value : [value]

  function toggle(opt: string) {
    if (multi) {
      const arr = Array.isArray(value) ? value : [value].filter(Boolean)
      const next = arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt]
      onChange(next)
    } else {
      onChange(value === opt ? '' : opt)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-bold text-[16px] leading-6 text-on-background flex gap-0.5">
          {label}
          {required && <span className="text-error text-[12px] mt-0.5">*</span>}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`px-4 py-1.5 rounded-full text-[14px] leading-5 border transition-colors ${
                active
                  ? 'bg-support text-on-support border-support'
                  : 'bg-surface text-on-surface border-outline hover:border-support/60'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
