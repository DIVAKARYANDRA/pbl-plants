import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { PageHeader } from "./components/AdminUI";
import { useEffect, useState } from "react";
import { getWishlistEnquiryCount } from "../utils/wishlistEnquiryService";
import { getSales } from "../utils/salesService";
import { getQuotations } from "../utils/quotationService";

export default function AdminDashboard() {
  const { products, categories, testimonials, faqs, gallery } = useSiteData();
  const featuredCount = products.filter((p) => p.featured).length;
  const [wishlistInquiries, setWishlistInquiries] = useState(0);
  const [sales, setSales] = useState([]);

const [quotations, setQuotations] = useState([]);

      useEffect(() => {

  async function load() {

    const count =
      await getWishlistEnquiryCount();

    setWishlistInquiries(count);


    const salesData =
      await getSales();

    setSales(salesData);


    const quotationData =
      await getQuotations();

    setQuotations(quotationData);

  }

  load();

}, []);


  const today = new Date();


const todaySales = sales
.filter(s => {

  if(!s.createdAt?.seconds)
    return false;

  const date =
    new Date(
      s.createdAt.seconds * 1000
    );

  return (
    date.toDateString()
    ===
    today.toDateString()
  );

})
.reduce(
  (sum,s)=>
    sum + Number(s.finalTotal || 0),
  0
);


const monthlySales = sales
.filter(s=>{

  if(!s.createdAt?.seconds)
    return false;

  const date =
    new Date(
      s.createdAt.seconds * 1000
    );


  return (
    date.getMonth()
      === today.getMonth()
    &&
    date.getFullYear()
      === today.getFullYear()
  );

})
.reduce(
  (sum,s)=>
    sum + Number(s.finalTotal || 0),
  0
);


const pendingQuotations =
  quotations.filter(
    q =>
      q.status !== "Converted"
  ).length;


const lowStockProducts =
  products.filter(
    p =>
      Number(p.stockQuantity || 0)
      <= 5
  ).length;

  const stats = [
    {
 label:"Today's Sales",
 value:`₹${todaySales}`,
 to:"/admin/sales",
 icon:"money"
},

{
 label:"This Month Sales",
 value:`₹${monthlySales}`,
 to:"/admin/sales",
 icon:"chart"
},

{
 label:"Pending Quotations",
 value:pendingQuotations,
 to:"/admin/quotations",
 icon:"quote"
},

{
 label:"Low Stock Products",
 value:lowStockProducts,
 to:"/admin/inventory",
 icon:"warning"
},
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
      <PageHeader title="Dashboard" subtitle="Business overview of your PBL Plants operations." />

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
