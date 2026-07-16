import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { PageHeader } from "./components/AdminUI";

export default function AdminDashboard() {
  const { products, categories, testimonials, faqs, gallery } = useSiteData();
  const featuredCount = products.filter((p) => p.featured).length;
  const wishlistInquiries = Number(window.localStorage.getItem("pbl-plants:wishlist-inquiries") || 0);

  const stats = [
    { label: "Total Products", value: products.length, to: "/admin/products", icon: "leaf" },
    { label: "Categories", value: categories.length, to: "/admin/categories", icon: "layers" },
    { label: "Featured Products", value: featuredCount, to: "/admin/products", icon: "star" },
    { label: "Wishlist Inquiries", value: wishlistInquiries, to: "/admin/products", icon: "quote" },
    { label: "Gallery Images", value: gallery.length, to: "/admin/gallery", icon: "image" },
    { label: "Testimonials", value: testimonials.length, to: "/admin/testimonials", icon: "quote" },
    { label: "FAQs", value: faqs.length, to: "/admin/faqs", icon: "help" },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="A quick overview of your PBL Plants catalog." />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="bg-white rounded-xl2 shadow-card p-5 sm:p-6 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300"
          >
            <p className="font-display text-3xl text-forest-800">{s.value}</p>
            <p className="text-sm text-forest-700/55 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl2 shadow-card p-6 sm:p-8">
        <h2 className="font-display text-xl text-forest-800 mb-2">Getting Started</h2>
        <p className="text-sm text-forest-700/60 mb-5 max-w-2xl">
          This dashboard controls everything customers see — branding, products, categories, the founder story,
          gallery, testimonials and FAQs. Changes save automatically and appear live on the website.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/settings" className="btn-secondary text-sm">Edit Branding</Link>
          <Link to="/admin/products" className="btn-primary text-sm">Manage Products</Link>
        </div>
      </div>
    </div>
  );
}
