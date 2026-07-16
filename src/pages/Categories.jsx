import { useSiteData } from "../context/SiteDataContext";
import Reveal from "../components/Reveal";
import CategoryCard from "../components/CategoryCard";
import PageHero from "../components/PageHero";

export default function Categories() {
  const { categories } = useSiteData();

  return (
    <div>
      <PageHero
        eyebrow="Browse"
        title="Shop by Category"
        subtitle="From leafy indoor companions to statement ceramic pots — find the right category for your space."
      />
      <section className="py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <CategoryCard category={cat} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
