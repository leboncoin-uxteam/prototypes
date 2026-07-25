import Image from "next/image"

type Props = {
  icon: string
  label: string
  onClick?: () => void
}

export function CategoryButton({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-[4px] bg-transparent border-none cursor-pointer"
    >
      <span
        className="flex items-center justify-center w-[44px] h-[44px] rounded-full"
        style={{ backgroundColor: "var(--feedback-neutral-container)" }}
      >
        <Image
          src={icon}
          alt={label}
          width={20}
          height={20}
          style={{ color: "var(--base-on-surface)" }}
        />
      </span>

      <span
        className="text-caption text-center whitespace-nowrap"
        style={{ color: "var(--base-on-background)" }}
      >
        {label}
      </span>
    </button>
  )
}
