interface FormSelectProps {
  label?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}

export function FormSelect({ label, required, value, onChange, options, placeholder }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-bold text-[16px] leading-6 text-on-background flex gap-0.5">
          {label}
          {required && <span className="text-error text-[12px] mt-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-outline rounded-full px-4 py-3 pr-10 text-[16px] leading-6 text-on-surface bg-surface appearance-none outline-none focus:border-support transition-colors cursor-pointer"
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface"
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
        >
          <path d="M1 1L7 7L13 1" stroke="#152233" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
