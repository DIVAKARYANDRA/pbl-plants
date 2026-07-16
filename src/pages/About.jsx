import { useSiteData } from "../context/SiteDataContext";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/UI";

export default function About() {
  const { settings, founder } = useSiteData();

  return (
    <div>
      <PageHero
        eyebrow="Our Story"
        title={`About ${settings.businessName}`}
        subtitle="A small nursery that grew into a premium plant and pot catalog — built one honest recommendation at a time."
      />

      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-xl3 overflow-hidden shadow-soft max-w-md mx-auto lg:mx-0">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="eyebrow">Meet the founder</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-medium text-forest-800">{founder.name}</h2>
            <p className="text-gold-600 font-medium mt-1">{founder.title}</p>
            <p className="mt-6 text-forest-700/70 leading-relaxed">{founder.message}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-forest-800 text-cream-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Reveal>
            <div className="card-surface !bg-white/5 !border-white/10 rounded-xl2 p-8 h-full">
              <span className="eyebrow text-gold-400">Our Vision</span>
              <p className="mt-4 font-display text-2xl leading-snug">{founder.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-surface !bg-white/5 !border-white/10 rounded-xl2 p-8 h-full">
              <span className="eyebrow text-gold-400">Our Mission</span>
              <p className="mt-4 font-display text-2xl leading-snug">{founder.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Browse, wishlist, WhatsApp — that's it"
              subtitle="We kept the experience simple on purpose. No accounts, no checkout forms — just a catalog and a direct line to our team."
            />
          </Reveal>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Browse the catalog", desc: "Explore plants, pots and accessories with full care details." },
            { title: "Build your wishlist", desc: "Save everything you like — it stays with you as you browse." },
            { title: "Send it on WhatsApp", desc: "One tap sends your full wishlist to our team to confirm." },
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-forest-700 text-cream-50 flex items-center justify-center font-display text-lg mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg text-forest-800">{step.title}</h3>
                <p className="text-sm text-forest-700/60 mt-2">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
