import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { useWishlist } from "../context/WishlistContext";
import { Badge, PriceTag } from "../components/UI";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";

const SPECS = [
  { key: "plantType", label: "Plant Type" },
  { key: "size", label: "Size" },
  { key: "sunlight", label: "Sunlight Requirement" },
  { key: "water", label: "Watering Requirement" },
  { key: "indoorOutdoor", label: "Indoor / Outdoor" },
  { key: "potDetails", label: "Pot Details" },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { products, categories } = useSiteData();
  const { addItem, isInWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((p) => p.id === id);

  if (!product) return <Navigate to="/products" replace />;

  const category = categories.find((c) => c.id === product.categoryId);
  const inWishlist = isInWishlist(product.id);
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const specs = SPECS.filter((s) => product[s.key] && product[s.key] !== "—");

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-forest-700/50 mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-forest-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-forest-700">Shop</Link>
          {category && (
            <>
              <span>/</span>
              <Link to={`/products?category=${category.slug}`} className="hover:text-forest-700">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-forest-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <Reveal>
            <div className="flex flex-col gap-4">
              <div className="aspect-square rounded-xl3 overflow-hidden bg-sage-100 shadow-card">
                <img
                  src={product.images?.[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        activeImage === i ? "border-gold-500" : "border-transparent"
                      }`}
                    >
                      <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={120}>
            <div className="flex flex-col gap-5">
              {category && <span className="eyebrow">{category.name}</span>}
              <h1 className="font-display text-3xl sm:text-4xl text-forest-800 leading-tight">{product.name}</h1>

              <div className="flex items-center gap-4">
                <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />
                <Badge status={product.stock} />
              </div>

              <p className="text-forest-700/70 leading-relaxed">{product.description}</p>

              <div className="grid grid-cols-2 gap-3 mt-2">
                {specs.map((s) => (
                  <div key={s.key} className="bg-sage-50 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wide text-forest-700/50">{s.label}</p>
                    <p className="text-sm font-semibold text-forest-800 mt-1">{product[s.key]}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => addItem(product.id)}
                  disabled={product.stock === "Out of Stock"}
                  className={`flex-1 justify-center gap-2 ${inWishlist ? "btn-secondary" : "btn-primary"} disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.4 5 5.8 5c1.9 0 3.4 1 4.2 2.4C10.8 6 12.3 5 14.2 5c3.4 0 5.3 3.2 3.8 6.7C19.5 16.3 12 21 12 21z"
                    />
                  </svg>
                  {inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
              <p className="text-xs text-forest-700/50">
                No online payment — build your wishlist and confirm your order with us directly on WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl text-forest-800 mb-8">You may also like</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
