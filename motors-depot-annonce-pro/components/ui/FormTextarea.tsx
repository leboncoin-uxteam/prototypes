interface FormTextareaProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  rows?: number
  hint?: string
  aiButton?: boolean
  onAiClick?: () => void
}

export function FormTextarea({
  label,
  required,
  value,
  onChange,
  placeholder = '',
  maxLength,
  rows = 4,
  hint,
  aiButton,
  onAiClick,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-[16px] leading-6 text-on-background flex gap-0.5">
        {label}
        {required && <span className="text-error text-[12px] mt-0.5">*</span>}
      </label>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(maxLength ? e.target.value.slice(0, maxLength) : e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full border border-outline rounded-lg px-4 py-3 text-[16px] leading-6 text-on-surface bg-surface outline-none focus:border-support transition-colors resize-none"
        />
        {maxLength && (
          <span className="absolute right-3 bottom-3 text-[12px] leading-4 text-neutral">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {aiButton && (
        <button
          type="button"
          onClick={onAiClick}
          className="self-start inline-flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--color-ai)', color: 'var(--color-on-ai)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5l1.4 4.1 4.1 1.4-4.1 1.4L8 12.5l-1.4-4.1-4.1-1.4 4.1-1.4L8 1.5z" />
          </svg>
          Me proposer une description automatique
        </button>
      )}

      {hint && <p className="text-[12px] leading-4 text-neutral">{hint}</p>}
    </div>
  )
}
