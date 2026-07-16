import { useSiteData } from "../context/SiteDataContext";
import { buildWhatsAppLink } from "../utils/whatsapp";

export default function WhatsAppFloatButton() {
  const { settings } = useSiteData();
  const link = buildWhatsAppLink(settings.whatsappNumber, `Hello ${settings.businessName}! I have a question about your plants.`);

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-forest-700 text-cream-50 flex items-center justify-center shadow-soft hover:bg-forest-800 hover:scale-105 transition-all duration-300"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.34 4.94L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.05.29-3.5-.73-2.95-1.22-4.8-4.2-4.94-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .9 2.15.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.32.38-.45.51-.15.15-.31.31-.13.6.17.29.77 1.28 1.66 2.07 1.14 1.02 2.1 1.34 2.4 1.49.29.15.46.13.63-.08.17-.2.72-.83.91-1.12.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.14.48.21.55.33.07.12.07.7-.17 1.38z" />
      </svg>
    </a>
  );
}
