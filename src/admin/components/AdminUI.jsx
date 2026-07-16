export function Field({ label, children, hint }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-forest-800">{label}</span>
      {children}
      {hint && <span className="text-xs text-forest-700/45">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg border border-forest-700/15 bg-white text-sm text-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow";

export function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 bg-forest-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-cream-50 rounded-xl2 shadow-2xl w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-forest-700/10 sticky top-0 bg-cream-50 z-10">
          <h3 className="font-display text-xl text-forest-800">{title}</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-forest-700/5" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F3D2B" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-forest-800">{title}</h1>
        {subtitle && <p className="text-forest-700/55 text-sm mt-1.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, subtitle, action }) {
  return (
    <div className="text-center py-16 border border-dashed border-forest-700/20 rounded-xl2">
      <p className="font-display text-lg text-forest-800">{title}</p>
      {subtitle && <p className="text-sm text-forest-700/55 mt-1">{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
