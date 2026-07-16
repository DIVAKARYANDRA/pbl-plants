import PageHero from "../components/PageHero";
import ContactSection from "../components/ContactSection";

export default function Contact() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk Plants"
        subtitle="Have a question about a product, care instructions, or delivery? Reach us any of the ways below."
      />
      <ContactSection />
    </div>
  );
}
