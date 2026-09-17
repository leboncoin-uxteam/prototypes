interface FormInputProps {
  label?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  showCounter?: boolean
  type?: string
  suffix?: string
  hint?: string
  action?: React.ReactNode
}

export function FormInput({
  label,
  required,
  value,
  onChange,
  placeholder = '',
  maxLength,
  showCounter = false,
  type = 'text',
  suffix,
  hint,
  action,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-bold text-[16px] leading-6 text-on-background flex gap-0.5">
          {label}
          {required && <span className="text-error text-[12px] mt-0.5">*</span>}
        </label>
      )}
      <div className="relative flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(maxLength ? e.target.value.slice(0, maxLength) : e.target.value)}
            placeholder={placeholder}
            className="w-full border border-outline rounded-lg px-4 py-3 text-[16px] leading-6 text-on-surface bg-surface outline-none focus:border-support transition-colors pr-12"
          />
          {suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-neutral font-medium">
              {suffix}
            </span>
          )}
          {showCounter && maxLength && (
            <span className="absolute right-3 -bottom-5 text-[12px] leading-4 text-neutral">
              {value.length}/{maxLength}
            </span>
          )}
        </div>
        {action}
      </div>
      {hint && <p className="mt-1 text-[12px] leading-4 text-neutral">{hint}</p>}
    </div>
  )
}
