import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WishlistDrawer from "./WishlistDrawer";
import WhatsAppFloatButton from "./WhatsAppFloatButton";

export default function CustomerLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WishlistDrawer />
      <WhatsAppFloatButton />
    </div>
  );
}
