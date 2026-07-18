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
              icon: <FaInstagram size={18} />,
            },
            {
              href: settings.socials.facebook,
              label: "Facebook",
              icon: <FaFacebookF size={16} />,
            },
            {
              href: settings.socials.youtube,
              label: "YouTube",
              icon: <FaYoutube size={18} />,
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
