import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSiteData } from "../context/SiteDataContext";

const NAV = [
  { to: "/admin", label: "Dashboard", end: true, icon: "grid" },
  { to: "/admin/settings", label: "Website Settings", icon: "settings" },
  { to: "/admin/products", label: "Products", icon: "leaf" },
  { to: "/admin/categories", label: "Categories", icon: "layers" },
  { to: "/admin/founder", label: "Founder Section", icon: "user" },
  { to: "/admin/gallery", label: "Gallery", icon: "image" },
  { to: "/admin/offers", label: "Offers", icon: "tag" },
  { to: "/admin/testimonials", label: "Testimonials", icon: "star" },
  { to: "/admin/faqs", label: "FAQs", icon: "help" },
];

const ICONS = {
  grid: <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />,
  settings: <path d="M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 00-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 00-2-1.2L14 3h-4l-.5 2.5a7 7 0 00-2 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9c.6.5 1.3.9 2 1.2L10 21h4l.5-2.5c.7-.3 1.4-.7 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z" />,
  leaf: <path d="M12 2c6 2 10 7 10 13a9 9 0 01-18 0c0-6 4-11 8-13z" />,
  layers: <path d="M12 2l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 5l9 5 9-5" />,
  user: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0" />,
  image: <path d="M4 4h16v16H4V4zm3 12l4-5 3 4 2-2.5L20 16" />,
  star: <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.7L12 2.5z" />,
  tag: <path d="M20 12l-8 8-8-8V4h8l8 8zM8 8h.01" />,
  help: <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM9.5 9a2.5 2.5 0 015 .5c0 1.5-2 1.8-2 3.5m0 3h.01" />,
};

function Icon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export default function AdminLayout() {
  const { logout } = useAuth();
  const { settings } = useSiteData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sage-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-forest-900/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-forest-800 text-cream-100 flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-6 py-6 border-b border-cream-100/10">
          <Link to="/admin" className="font-display text-xl text-cream-50">
            {settings.logoText}
          </Link>
          <p className="text-xs text-cream-100/45 mt-0.5">Admin Dashboard</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-gold-500 text-forest-900" : "text-cream-100/70 hover:bg-white/5 hover:text-cream-50"
                }`
              }
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-cream-100/10 flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-cream-100/70 hover:bg-white/5 hover:text-cream-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
            </svg>
            View Website
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-cream-100/70 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-20 bg-cream-50 border-b border-forest-700/10 px-5 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu" className="h-9 w-9 flex items-center justify-center text-forest-800">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <span className="font-display text-lg text-forest-800">Admin</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-5 sm:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
