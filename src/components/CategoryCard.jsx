import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative flex flex-col justify-end h-64 sm:h-72 rounded-xl2 overflow-hidden shadow-card transition-all duration-500 hover:shadow-soft hover:-translate-y-1"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/20 to-transparent" />
      <div className="relative p-5 sm:p-6 text-cream-50">
        <h3 className="font-display text-xl sm:text-2xl">{category.name}</h3>
        <p className="text-sm text-cream-100/75 mt-1 line-clamp-2">{category.description}</p>
        <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-gold-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
