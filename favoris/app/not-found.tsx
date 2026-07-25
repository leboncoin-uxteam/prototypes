import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <p className="text-headline-2" style={{ color: "var(--base-on-surface)" }}>
        Page introuvable
      </p>
      <Link
        href="/onboarding"
        className="text-body-1-hl px-4 py-2 rounded-lg"
        style={{ backgroundColor: "var(--main-main)", color: "var(--main-on-main)" }}
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}
