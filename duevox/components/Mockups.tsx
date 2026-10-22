/* CSS-built product mockups so no image assets are needed. Swap for real screenshots later. */

function Sparkline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" className={className} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22a074" stopOpacity=".25" />
          <stop offset="1" stopColor="#22a074" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 48 L25 40 L50 44 L75 28 L100 32 L125 18 L150 24 L175 8 L200 14 V60 H0Z" fill="url(#spark)" />
      <path d="M0 48 L25 40 L50 44 L75 28 L100 32 L125 18 L150 24 L175 8 L200 14" stroke="#14845e" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-44 rounded-[28px] border-[6px] border-brand-950 bg-white p-3 shadow-2xl ${className}`}>
      <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-brand-950/80" />
      <p className="text-[10px] text-muted">Total Balance</p>
      <p className="text-lg font-bold text-brand-950">$12,480.32</p>
      <Sparkline className="mt-1 h-12 w-full" />
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-brand-50 p-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-red-500 text-[10px] font-bold text-white">N</span>
        <div className="text-[10px] leading-tight">
          <p className="font-semibold">Subscription found</p>
          <p className="text-muted">Netflix · $15.99/mo</p>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {["Spotify", "Adobe", "iCloud"].map((n) => (
          <div key={n} className="flex justify-between text-[10px]">
            <span>{n}</span>
            <span className="text-muted">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LaptopMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="rounded-t-xl border-[5px] border-brand-950 bg-white p-3 shadow-xl">
        <div className="grid grid-cols-[56px_1fr] gap-3">
          <div className="space-y-2 rounded-lg bg-brand-50 p-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-2 rounded ${i === 0 ? "bg-brand-700" : "bg-brand-200"}`} />
            ))}
          </div>
          <div>
            <p className="text-[10px] text-muted">Total Balance</p>
            <p className="text-lg font-bold text-brand-950">$12,480.32</p>
            <Sparkline className="mt-1 h-20 w-full" />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["Income", "Spending", "Saved"].map((l) => (
                <div key={l} className="rounded-md bg-brand-50 p-1.5">
                  <p className="text-[8px] text-muted">{l}</p>
                  <div className="mt-1 h-1.5 w-3/4 rounded bg-brand-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2 w-[108%] -translate-x-[4%] rounded-b-xl bg-brand-950/90" />
    </div>
  );
}

export function FloatingCard({
  title,
  value,
  className = "",
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-white p-3 shadow-lg ${className}`}>
      <p className="text-[10px] text-muted">{title}</p>
      <p className="text-sm font-bold text-brand-950">{value}</p>
      <span className="text-[10px] font-semibold text-brand-600">+12%</span>
    </div>
  );
}

export function ShieldVisual() {
  return (
    <div className="relative grid h-56 w-56 place-items-center">
      <div className="absolute inset-0 rounded-full bg-brand-100" />
      <div className="absolute inset-6 rounded-full bg-brand-200/70" />
      <svg viewBox="0 0 24 24" className="relative h-28 w-28 text-brand-700" fill="currentColor">
        <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" />
        <rect x="9" y="10.5" width="6" height="5" rx="1" fill="#fff" />
        <path d="M10.5 10.5V9a1.5 1.5 0 013 0v1.5" stroke="#fff" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  );
}

export function PhotoPlaceholder({ className = "", label }: { className?: string; label: string }) {
  return (
    <div
      className={`grid place-items-center overflow-hidden bg-gradient-to-br from-brand-100 via-brand-200 to-brand-400 text-xs font-medium text-brand-900/60 ${className}`}
    >
      {label}
    </div>
  );
}
