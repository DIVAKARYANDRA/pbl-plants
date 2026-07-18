import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useSiteData } from "../context/SiteDataContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openDrawer } = useWishlist();
  const { settings } = useSiteData();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive ? "text-gold-500" : scrolled ? "text-forest-800 hover:text-gold-500" : "text-cream-50 hover:text-gold-400"
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-400 ${
        scrolled ? "bg-cream-50/90 backdrop-blur-md shadow-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="flex items-center gap-2 font-display text-xl sm:text-2xl"
        >
          <img
            src="/pbl-logo.jpg"
            alt="PBL Plants Logo"
            className="h-10 w-10 object-contain"
          />
        
          <span className={scrolled ? "text-forest-800" : "text-cream-50"}>
            {settings.logoText}
          </span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openDrawer}
            aria-label="Open wishlist"
            className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              scrolled ? "text-forest-800 hover:bg-forest-700/5" : "text-cream-50 hover:bg-white/10"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.4 5 5.8 5c1.9 0 3.4 1 4.2 2.4C10.8 6 12.3 5 14.2 5c3.4 0 5.3 3.2 3.8 6.7C19.5 16.3 12 21 12 21z"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold-500 text-forest-900 text-[11px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className={`lg:hidden h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              scrolled ? "text-forest-800" : "text-cream-50"
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96 mt-4" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 px-5 sm:px-8 pb-4 bg-cream-50/95 backdrop-blur-md rounded-b-2xl">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 border-b border-forest-700/10 text-forest-800 font-medium ${isActive ? "text-gold-600" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
