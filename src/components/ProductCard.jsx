import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useSiteData } from "../context/SiteDataContext";
import { Badge, PriceTag } from "./UI";

export default function ProductCard({ product }) {
  console.log("PRODUCT FROM FIRESTORE:", product);
  const { addItem, isInWishlist, lastAdded } = useWishlist();
  const { categories } = useSiteData();
  const category = categories.find((c) => c.id === product.categoryId);
  const inWishlist = isInWishlist(product.id);
  const justAdded = lastAdded === product.id;

  return (
    <div className="group relative flex flex-col card-surface rounded-xl2 overflow-hidden transition-all duration-500 hover:shadow-soft hover:-translate-y-1.5">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-sage-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discountPrice && (
          <span className="absolute top-3 left-3 bg-gold-500 text-forest-900 text-xs font-bold px-2.5 py-1 rounded-full">
            SALE
          </span>
        )}
        <div className="absolute top-3 right-3">
          <Badge status={product.stock} />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-4 sm:p-5 flex-1">
        {category && <span className="eyebrow text-forest-400">{category.name}</span>}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg text-forest-800 leading-snug hover:text-forest-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-forest-700/60 line-clamp-2">{product.shortDescription}</p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <PriceTag price={product.price} discountPrice={product.discountPrice} />
          <button
            onClick={() => addItem(product.id)}
            disabled={product.stock === "Out of Stock"}
            aria-label={`Add ${product.name} to wishlist`}
            className={`relative flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              inWishlist
                ? "bg-forest-700 border-forest-700 text-cream-50"
                : "border-forest-700/25 text-forest-700 hover:bg-forest-700 hover:text-cream-50 hover:border-forest-700"
            } ${justAdded ? "scale-110" : ""}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.4 5 5.8 5c1.9 0 3.4 1 4.2 2.4C10.8 6 12.3 5 14.2 5c3.4 0 5.3 3.2 3.8 6.7C19.5 16.3 12 21 12 21z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
