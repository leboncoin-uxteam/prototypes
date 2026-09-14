interface FormInputProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  showCounter?: boolean
  type?: string
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
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-[16px] leading-6 text-on-background flex gap-0.5">
        {label}
        {required && <span className="text-error text-[12px] mt-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(maxLength ? e.target.value.slice(0, maxLength) : e.target.value)}
          placeholder={placeholder}
          className="w-full border border-outline rounded-full px-4 py-3 text-[16px] leading-6 text-on-surface bg-surface outline-none focus:border-support transition-colors"
        />
        {showCounter && maxLength && (
          <span className="absolute right-1 -bottom-5 text-[12px] leading-4 text-neutral">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
