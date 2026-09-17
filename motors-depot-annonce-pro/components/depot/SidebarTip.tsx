interface SidebarTipProps {
  children: React.ReactNode
}

export function SidebarTip({ children }: SidebarTipProps) {
  return (
    <div className="sticky top-[92px] pt-4 pl-10">
      {/* Lightbulb decorative separator */}
      <div className="flex items-center gap-0 mb-4">
        <div className="flex-1 h-px bg-outline/40" />
        <div className="mx-3 w-10 h-10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a7 7 0 0 1 5.292 11.584C16.3 14.8 16 16 16 17v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1c0-1-.3-2.2-1.292-3.416A7 7 0 0 1 12 2Z" stroke="#acb8c7" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21h6M10 21v1a1 1 0 0 0 2 0v-1" stroke="#acb8c7" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 h-px bg-outline/40" />
      </div>
      <p className="text-[13px] leading-5 text-neutral text-center px-2">{children}</p>
    </div>
  )
}
