import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function Products() {
  const { products, categories } = useSiteData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategorySlug = searchParams.get("category") || "all";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeCategorySlug]);

  const setCategory = (slug) => {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategorySlug !== "all") {
      const cat = categories.find((c) => c.slug === activeCategorySlug);
      if (cat) list = list.filter((p) => p.categoryId === cat.id);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return list;
  }, [products, categories, activeCategorySlug, query, sort]);

  return (
    <div>
      <PageHero
        eyebrow="Shop All"
        title="The Full Catalog"
        subtitle="Search, filter and build your wishlist — then send it to us on WhatsApp to confirm your order."
      />

      <section className="py-12 sm:py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
            <div className="relative w-full lg:max-w-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-700/40"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search plants, pots, tools..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-forest-700/15 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen((o) => !o)}
                className="lg:hidden btn-secondary py-2.5 px-4 text-sm"
              >
                Categories
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="py-3 px-4 rounded-full border border-forest-700/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
            {/* Category filters */}
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
              <div className="lg:sticky lg:top-28 flex flex-col gap-1">
                <p className="eyebrow mb-2">Categories</p>
                <button
                  onClick={() => setCategory("all")}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategorySlug === "all" ? "bg-forest-700 text-cream-50" : "text-forest-700/70 hover:bg-forest-700/5"
                  }`}
                >
                  All Products ({products.length})
                </button>
                {categories.map((cat) => {
                  const cnt = products.filter((p) => p.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.slug)}
                      className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeCategorySlug === cat.slug
                          ? "bg-forest-700 text-cream-50"
                          : "text-forest-700/70 hover:bg-forest-700/5"
                      }`}
                    >
                      {cat.name} ({cnt})
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Grid */}
            <div>
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-display text-2xl text-forest-800">No products found</p>
                  <p className="text-forest-700/60 mt-2">Try a different search term or category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filtered.map((p, i) => (
                    <Reveal key={p.id} delay={Math.min(i, 8) * 60}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
