import { formatPrice } from "../utils/whatsapp";

export function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] font-medium ${light ? "text-cream-50" : "text-forest-800"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg ${light ? "text-cream-100/80" : "text-forest-700/70"}`}>{subtitle}</p>
      )}
    </div>
  );
}

export function StarRating({ rating = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? "#C9A24B" : "none"}
          stroke="#C9A24B"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.7L12 2.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export function Badge({ status }) {
  const map = {
    "In Stock": "bg-forest-100 text-forest-700",
    "Limited Stock": "bg-gold-50 text-gold-600",
    "Out of Stock": "bg-red-50 text-red-500",
  };
  const cls = map[status] || "bg-sage-100 text-sage-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export function PriceTag({ price, discountPrice, size = "md" }) {
  const hasDiscount = discountPrice && discountPrice < price;
  const big = size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-display font-semibold text-forest-800 ${big}`}>
        {formatPrice(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount && <span className="text-sm text-forest-700/40 line-through">{formatPrice(price)}</span>}
    </div>
  );
}
