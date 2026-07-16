import { useState } from "react";

export default function FAQItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-forest-700/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-forest-800 group-hover:text-forest-600 transition-colors">
          {question}
        </span>
        <span
          className={`flex-shrink-0 h-8 w-8 rounded-full border border-forest-700/20 flex items-center justify-center text-forest-700 transition-transform duration-300 ${
            open ? "rotate-45 bg-forest-700 text-cream-50 border-forest-700" : ""
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-400 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-forest-700/70 pt-3 pr-8 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
