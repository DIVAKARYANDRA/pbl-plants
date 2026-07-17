import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import Reveal from "../components/Reveal";
import FloatingLeaves from "../components/FloatingLeaves";
import { SectionHeading } from "../components/UI";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";
import FAQItem from "../components/FAQItem";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const { settings, products, categories, founder, testimonials, faqs, gallery } = useSiteData();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-forest-800">
        <img
          src={settings.heroImage}
          alt="A lush indoor plant collection"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/70 to-forest-800/40" />
        <FloatingLeaves />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
          <div className="max-w-2xl">
            <span className="reveal is-visible eyebrow text-gold-400">{settings.tagline}</span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-cream-50 font-medium">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-cream-100/75 max-w-xl leading-relaxed">
              {settings.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/products" className="btn-gold">
                Browse the Catalog
              </Link>
              <Link to="/about" className="btn-secondary !text-cream-50 !border-cream-50/30 hover:!bg-white/10 hover:!border-cream-50">
                Our Story
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-8 sm:gap-12">
              <div>
                <p className="font-display text-3xl text-gold-400">{products.length}+</p>
                <p className="text-xs uppercase tracking-widest text-cream-100/50 mt-1">Products</p>
              </div>
              <div className="h-10 w-px bg-cream-100/15" />
              <div>
                <p className="font-display text-3xl text-gold-400">{categories.length}</p>
                <p className="text-xs uppercase tracking-widest text-cream-100/50 mt-1">Categories</p>
              </div>
              <div className="h-10 w-px bg-cream-100/15" />
              <div>
                <p className="font-display text-3xl text-gold-400">4.9★</p>
                <p className="text-xs uppercase tracking-widest text-cream-100/50 mt-1">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-100/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-cream-100/30 animate-pulse" />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="eyebrow">Welcome to {settings.businessName}</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-medium text-forest-800 leading-tight">
              We grow plants the way we'd want them for our own home
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-forest-700/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              From our nursery beds to your doorstep — every plant is nurtured, hardened and quality-checked
              before it's ever listed here. Explore the catalog, save what you love to your wishlist, and send
              it to us on WhatsApp when you're ready to talk.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-sage-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Shop by category" title="Find exactly what your space needs" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 80}>
                <CategoryCard category={cat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <SectionHeading align="left" eyebrow="Handpicked for you" title="Featured Products" />
              <Link to="/products" className="btn-secondary flex-shrink-0">
                View All Products
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-forest-800 relative overflow-hidden">
        <FloatingLeaves className="opacity-30" />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <SectionHeading light eyebrow="Why choose us" title="A premium plant experience, start to finish" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {settings.whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="card-surface !bg-white/5 !border-white/10 rounded-xl2 p-6 h-full">
                  <div className="h-11 w-11 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center font-display text-lg mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg text-cream-50 mb-2">{item.title}</h3>
                  <p className="text-sm text-cream-100/60 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] rounded-xl3 overflow-hidden shadow-soft max-w-md mx-auto lg:mx-0">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-gold-500 text-forest-900 rounded-xl2 px-5 py-4 shadow-soft max-w-[180px] hidden sm:block">
              <p className="font-display text-lg leading-none">2+ yrs</p>
              <p className="text-xs mt-1">of nursery experience</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="eyebrow">Meet the founder</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-medium text-forest-800">{founder.name}</h2>
            <p className="text-gold-600 font-medium mt-1">{founder.title}</p>
            <p className="mt-6 text-forest-700/70 leading-relaxed">{founder.message}</p>
            <Link to="/about" className="btn-primary mt-8 inline-flex">
              Read Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-sage-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <SectionHeading align="left" eyebrow="From the nursery" title="A peek into our world" />
              <Link to="/gallery" className="btn-secondary flex-shrink-0">
                View Gallery
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
            {gallery.slice(0, 8).map((g, i) => (
              <Reveal key={g.id} delay={i * 60} className={`overflow-hidden rounded-xl2 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img
                  src={g.image}
                  alt={g.caption}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square hover:scale-110 transition-transform duration-700"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Customer stories" title="Loved by plant people across the city" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 100}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-sage-50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />
          </Reveal>
          <div className="mt-10">
            {faqs.map((f) => (
              <FAQItem key={f.id} question={f.question} answer={f.answer} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
