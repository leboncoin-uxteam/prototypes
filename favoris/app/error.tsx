"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <p className="text-headline-2" style={{ color: "var(--base-on-surface)" }}>
        Une erreur est survenue
      </p>
      <p className="text-body-2" style={{ color: "var(--dim-on-surface-dim-1-text)" }}>
        {error.message}
      </p>
      <button
        onClick={reset}
        className="text-body-1-hl px-4 py-2 rounded-lg"
        style={{ backgroundColor: "var(--main-main)", color: "var(--main-on-main)" }}
      >
        Réessayer
      </button>
    </main>
  )
}
