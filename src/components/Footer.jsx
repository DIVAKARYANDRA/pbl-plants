import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const { settings, categories } = useSiteData();

  return (
    <footer className="bg-forest-900 text-cream-100 pt-16 pb-8 mt-auto relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-cream-50 mb-3">{settings.logoText}</h3>
          <p className="text-sm text-cream-100/60 leading-relaxed max-w-xs">{settings.tagline}</p>
          <div className="flex items-center gap-3 mt-5">
  {[
    {
      href: settings.socials.instagram,
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3zm11.5 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
        </svg>
      ),
    },
    {
      href: settings.socials.facebook,
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M22 12A10 10 0 1010.44 21.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/>
        </svg>
      ),
    },
    {
      href: settings.socials.youtube,
      label: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z"/>
        </svg>
      ),
    },
  ].map((s) => (
    <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noreferrer"
      aria-label={s.label}
      className="h-10 w-10 rounded-full border border-cream-100/20 flex items-center justify-center hover:bg-gold-500 hover:text-forest-900 hover:border-gold-500 transition-all duration-300"
    >
      {s.icon}
    </a>
  ))}
</div>
        </div>

        <div>
          <h4 className="eyebrow text-gold-400 mb-4">Explore</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-cream-100/70">
            <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-gold-400 transition-colors">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold-400 mb-4">Categories</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-cream-100/70">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/products?category=${c.slug}`} className="hover:text-gold-400 transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold-400 mb-4">Get in Touch</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-cream-100/70">
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            <li className="max-w-[220px]">{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-100/40">
        <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
        <p>Digital catalog only — orders confirmed personally over WhatsApp.</p>
      </div>
    </footer>
  );
}
