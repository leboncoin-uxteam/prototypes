export default function DeposerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-container flex justify-center">
      <div className="w-full max-w-[430px] flex flex-col bg-surface min-h-screen">
        {children}
      </div>
    </div>
  );
}
