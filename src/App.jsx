import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SiteDataProvider } from "./context/SiteDataContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import AdminBilling from "./admin/AdminBilling";
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
import AdminEnquiries from "./admin/AdminEnquiries";
import TrackOrder from "./pages/TrackOrder";
import AdminPaymentSettings from "./admin/AdminPaymentSettings";
import AdminOrderAnalytics from "./admin/AdminOrderAnalytics";
import AdminReceipt from "./admin/AdminReceipt";
import AdminSalesHistory from "./admin/AdminSalesHistory";
import AdminInventory from "./admin/AdminInventory";
import AdminInventoryHistory from "./admin/AdminInventoryHistory";
import AdminQuotation from "./admin/AdminQuotation";
import AdminQuotationHistory from "./admin/AdminQuotationHistory";
import AdminQuotationEditor from "./admin/AdminQuotationEditor";
import QuotationView from "./pages/QuotationView";
import AdminQuotationEdit from "./admin/AdminQuotationEdit";

function Providers({ children }) {
  return (
    <SiteDataProvider>
      <AuthProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </AuthProvider>
    </SiteDataProvider>
  );
}

// Role Guard Component
function RoleProtectedRoute({ allowedRoles }) {
  const { user } = useAuth(); // Assuming role is stored in user object

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/products" replace />;
  }

  return <Outlet />;
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
            <Route path="/track/:trackingId" element={<TrackOrder />} />
          </Route>

          <Route path="/q/:quotationNo" element={<QuotationView />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              
              {/* Routes accessible by BOTH admin & product_manager */}
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="inventory-history" element={<AdminInventoryHistory />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="payment-settings" element={<AdminPaymentSettings />} />
              <Route path="quotations" element={<AdminQuotation />} />
              <Route path="quotation-history" element={<AdminQuotationHistory />} />
              <Route path="quotation/:id" element={<AdminQuotationEditor />} />
              <Route path="quotation/edit/:id" element={<AdminQuotationEdit />} />
              <Route path="analytics" element={<AdminOrderAnalytics />} />
              <Route path="billing" element={<AdminBilling />} />
              <Route path="sales" element={<AdminSalesHistory />} />
              <Route path="enquiries" element={<AdminEnquiries />} />

              {/* ADMIN ONLY ROUTES */}
              <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="settings" element={<AdminSettings />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="founder" element={<AdminFounder />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="faqs" element={<AdminFAQ />} />
              </Route>

            </Route>

            <Route path="/admin/receipt/:billNo" element={<AdminReceipt />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
