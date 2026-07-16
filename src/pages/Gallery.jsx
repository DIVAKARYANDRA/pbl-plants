import { useMemo, useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export default function Gallery() {
  const { gallery } = useSiteData();
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(gallery.map((g) => g.category))], [gallery]);
  const filtered = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="Life at the Nursery"
        subtitle="Plants, pots, and the customers who bring them home — a glimpse behind the catalog."
      />

      <section className="py-12 sm:py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  filter === cat
                    ? "bg-forest-700 text-cream-50 border-forest-700"
                    : "border-forest-700/15 text-forest-700/70 hover:bg-forest-700/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((g, i) => (
              <Reveal key={g.id} delay={Math.min(i, 8) * 60} className="break-inside-avoid">
                <button
                  onClick={() => setLightbox(g)}
                  className="group relative block w-full rounded-xl2 overflow-hidden shadow-card"
                >
                  <img src={g.image} alt={g.caption} loading="lazy" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <p className="text-cream-50 text-sm font-medium text-left">{g.caption}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-forest-900/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 text-cream-50 flex items-center justify-center hover:bg-white/20"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="max-w-3xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.caption} className="w-full h-full object-contain rounded-xl2" />
            <p className="text-center text-cream-100/80 mt-4">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
