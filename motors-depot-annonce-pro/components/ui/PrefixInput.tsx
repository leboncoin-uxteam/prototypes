interface PrefixInputProps {
  label: string
  prefix?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
}

export function PrefixInput({ label, prefix = 'Prefix', value, onChange, placeholder = "Entrez l'URL", hint }: PrefixInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-[16px] leading-6 text-on-background">{label}</label>
      <div className="flex border border-outline rounded-lg overflow-hidden focus-within:border-support transition-colors">
        <div className="px-4 py-3 bg-neutral-container/50 border-r border-outline text-[14px] text-neutral whitespace-nowrap shrink-0">
          {prefix}
        </div>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 text-[16px] leading-6 text-on-surface bg-surface outline-none"
        />
      </div>
      {hint && <p className="text-[12px] leading-4 text-neutral">{hint}</p>}
    </div>
  )
}
