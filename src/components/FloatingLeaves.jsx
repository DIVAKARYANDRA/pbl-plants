const LEAVES = [
  { top: "8%", left: "4%", size: 46, delay: "0s", anim: "animate-float", rotate: "-12deg" },
  { top: "18%", left: "88%", size: 34, delay: "1.2s", anim: "animate-floatSlow", rotate: "20deg" },
  { top: "62%", left: "2%", size: 30, delay: "2s", anim: "animate-float", rotate: "8deg" },
  { top: "74%", left: "92%", size: 50, delay: "0.6s", anim: "animate-floatSlow", rotate: "-20deg" },
  { top: "40%", left: "94%", size: 22, delay: "1.8s", anim: "animate-float", rotate: "35deg" },
];

function LeafSVG({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 6c16 5 24 18 24 30 0 11-9 22-24 22S8 47 8 36C8 24 16 11 32 6z"
        fill="url(#leafGrad)"
        opacity="0.85"
      />
      <path d="M32 16v34" stroke="#1F3D2B" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      <defs>
        <linearGradient id="leafGrad" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8AA68A" />
          <stop offset="1" stopColor="#3C6844" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FloatingLeaves({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {LEAVES.map((leaf, idx) => (
        <div
          key={idx}
          className={`absolute ${leaf.anim} opacity-70`}
          style={{
            top: leaf.top,
            left: leaf.left,
            animationDelay: leaf.delay,
            transform: `rotate(${leaf.rotate})`,
          }}
        >
          <LeafSVG size={leaf.size} />
        </div>
      ))}
    </div>
  );
}
