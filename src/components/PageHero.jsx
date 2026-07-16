import Reveal from "./Reveal";
import FloatingLeaves from "./FloatingLeaves";

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-forest-800 pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-8 overflow-hidden">
      <FloatingLeaves className="opacity-30" />
      <div className="max-w-4xl mx-auto text-center relative">
        <Reveal>
          {eyebrow && <span className="eyebrow text-gold-400">{eyebrow}</span>}
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl text-cream-50 font-medium leading-tight">{title}</h1>
          {subtitle && <p className="mt-5 text-cream-100/70 text-base sm:text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
