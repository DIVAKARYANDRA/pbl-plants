import { useSiteData } from "../context/SiteDataContext";
import { buildWhatsAppLink } from "../utils/whatsapp";
import Reveal from "./Reveal";
import { SectionHeading } from "./UI";

const ICONS = {
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm0 0l8 8 8-8" />
    </svg>
  ),
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function ContactSection() {
  const { settings } = useSiteData();
  const link = buildWhatsAppLink(
    settings.whatsappNumber,
    `Hello ${settings.businessName}! I'd like to know more about your plants.`
  );

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeading eyebrow="Get in touch" title="We'd love to help you find the right plant" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-12">
          <Reveal className="lg:col-span-2 flex flex-col gap-4" delay={100}>
            <div className="card-surface rounded-xl2 p-6 flex items-start gap-4">
              <span className="h-11 w-11 rounded-full bg-forest-700/10 text-forest-700 flex items-center justify-center flex-shrink-0">
                {ICONS.phone}
              </span>
              <div>
                <p className="font-semibold text-forest-800">Call or WhatsApp</p>
                <p className="text-sm text-forest-700/60 mt-1">{settings.phone}</p>
              </div>
            </div>
            <div className="card-surface rounded-xl2 p-6 flex items-start gap-4">
              <span className="h-11 w-11 rounded-full bg-forest-700/10 text-forest-700 flex items-center justify-center flex-shrink-0">
                {ICONS.mail}
              </span>
              <div>
                <p className="font-semibold text-forest-800">Email</p>
                <p className="text-sm text-forest-700/60 mt-1">{settings.email}</p>
              </div>
            </div>
            <div className="card-surface rounded-xl2 p-6 flex items-start gap-4">
              <span className="h-11 w-11 rounded-full bg-forest-700/10 text-forest-700 flex items-center justify-center flex-shrink-0">
                {ICONS.pin}
              </span>
              <div>
                <p className="font-semibold text-forest-800">Visit the Nursery</p>
                <p className="text-sm text-forest-700/60 mt-1">{settings.address}</p>
              </div>
            </div>
            <a href={link} target="_blank" rel="noreferrer" className="btn-gold w-full mt-1">
              Chat with us on WhatsApp
            </a>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-3">
            <div className="relative h-full min-h-[320px] rounded-xl2 overflow-hidden bg-sage-100 flex items-center justify-center border border-forest-700/10">
              <div className="absolute inset-0 leaf-divider opacity-40" />
              <div className="relative text-center px-6">
                <span className="h-14 w-14 rounded-full bg-forest-700 text-cream-50 flex items-center justify-center mx-auto mb-4">
                  {ICONS.pin}
                </span>
                <p className="font-display text-lg text-forest-800">Google Map</p>
                <iframe
                    src={settings.mapNote}
                    width="60%"
                    height="350"
                    style={{ border:0 }}
                    loading="lazy"
                    allowFullScreen
                  />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
