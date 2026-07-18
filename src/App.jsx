import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteDataProvider } from "./context/SiteDataContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import AdminOffers from "./admin/AdminOffers";
import CustomerLayout from "./components/CustomerLayout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminSettings from "./admin/AdminSettings";
import AdminProducts from "./admin/AdminProducts";
import AdminCategories from "./admin/AdminCategories";
import AdminFounder from "./admin/AdminFounder";
import AdminGallery from "./admin/AdminGallery";
import AdminTestimonials from "./admin/AdminTestimonials";
import AdminFAQ from "./admin/AdminFAQ";

function Providers({ children }) {
  return (
    <SiteDataProvider>
      <AuthProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </AuthProvider>
    </SiteDataProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          {/* Customer-facing site */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="founder" element={<AdminFounder />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route 
                path="offers" 
                element={<AdminOffers />} 
              />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faqs" element={<AdminFAQ />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
