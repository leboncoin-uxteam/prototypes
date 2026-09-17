interface FormSectionProps {
  children: React.ReactNode
  tip?: React.ReactNode
}

export function FormSection({ children, tip }: FormSectionProps) {
  return (
    <div className="flex gap-0">
      <div className="w-[740px] shrink-0 py-8">
        {children}
      </div>
      <div className="flex-1 py-8">
        {tip}
      </div>
    </div>
  )
}
