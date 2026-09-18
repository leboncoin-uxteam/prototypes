interface FormSectionProps {
  children: React.ReactNode
  tip?: React.ReactNode
}

export function FormSection({ children, tip }: FormSectionProps) {
  return (
    <div className="flex items-start">
      <div className="w-[740px] shrink-0 bg-surface rounded-[8px] py-6 flex flex-col gap-6">
        {children}
      </div>
      <div className="flex-1 px-10 pt-10">
        {tip}
      </div>
    </div>
  )
}
