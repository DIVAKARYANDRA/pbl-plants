import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useSiteData } from "../context/SiteDataContext";
import { formatPrice, buildWishlistMessage, buildWhatsAppLink } from "../utils/whatsapp";

export default function WishlistDrawer() {
  const { items, removeItem, updateQty, isOpen, closeDrawer, clear } = useWishlist();
  const { products, settings, offers } = useSiteData();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const detailedItems = items
    .map((item) => ({ ...item, product: products.find((p) => p.id === item.productId) }))
    .filter((i) => i.product);

  const subtotal = detailedItems.reduce(
  (sum, i) =>
    sum + (i.product.discountPrice ?? i.product.price) * i.qty,
  0
);

  const applicableOffers = (offers || [])
  .filter(
    (offer) =>
      offer.enabled &&
      subtotal >= offer.minimumCartValue
  )
  .sort(
    (a,b)=>a.priority-b.priority
  );


const activeOffer = applicableOffers[0];


let discount = 0;


if(activeOffer){

  if(activeOffer.type==="percentage"){

    discount =
      (subtotal * activeOffer.value) / 100;

  }


  else if(activeOffer.type==="flat"){

    discount =
      activeOffer.value;

  }

}


const finalTotal =
  Math.max(subtotal - discount,0);

  const handleSend = () => {
    const message = buildWishlistMessage({ businessName: settings.businessName, items, products });
    const link = buildWhatsAppLink(settings.whatsappNumber, message);
    window.open(link, "_blank", "noopener,noreferrer");
    try {
      const key = "pbl-plants:wishlist-inquiries";
      const current = Number(window.localStorage.getItem(key) || 0);
      window.localStorage.setItem(key, String(current + 1));
    } catch (e) {
      // ignore storage errors
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-forest-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream-50 z-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Wishlist"
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-forest-700/10">
          <h2 className="font-display text-2xl text-forest-800">Your Wishlist</h2>
          <button
            onClick={closeDrawer}
            aria-label="Close wishlist"
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-forest-700/5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F3D2B" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
          {detailedItems.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-3 mt-16">
              <div className="h-16 w-16 rounded-full bg-sage-100 flex items-center justify-center text-forest-400">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.4 5 5.8 5c1.9 0 3.4 1 4.2 2.4C10.8 6 12.3 5 14.2 5c3.4 0 5.3 3.2 3.8 6.7C19.5 16.3 12 21 12 21z"
                  />
                </svg>
              </div>
              <p className="text-forest-700/60">Your wishlist is empty right now.</p>
              <Link to="/products" onClick={closeDrawer} className="btn-secondary mt-2 text-sm">
                Browse plants
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {detailedItems.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 pb-4 border-b border-forest-700/10">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-20 w-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <p className="font-medium text-forest-800 truncate">{product.name}</p>
                    <p className="text-sm text-forest-700/50">
                      {formatPrice(product.discountPrice ?? product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center border border-forest-700/15 rounded-full">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="h-7 w-7 flex items-center justify-center text-forest-700 hover:bg-forest-700/5 rounded-full"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm w-6 text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="h-7 w-7 flex items-center justify-center text-forest-700 hover:bg-forest-700/5 rounded-full"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-xs text-forest-700/40 hover:text-red-500 transition-colors ml-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailedItems.length > 0 && (
          <div className="px-5 sm:px-6 py-5 border-t border-forest-700/10 flex flex-col gap-3">
            <div className="flex flex-col gap-2 text-forest-800">


<div className="flex justify-between">
<span>
Subtotal
</span>

<span>
{formatPrice(subtotal)}
</span>

</div>


{
activeOffer && discount > 0 && (

<div className="flex justify-between text-green-700">

<span>
{activeOffer.title}
</span>

<span>
-{formatPrice(discount)}
</span>

</div>

)

}


<div className="border-t border-forest-700/10 pt-2 flex justify-between">

<span className="font-medium">
Estimated Total
</span>


<span className="font-display text-xl font-semibold">

{formatPrice(finalTotal)}

</span>


</div>


</div>
            <button onClick={handleSend} className="btn-gold w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.34 4.94L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.05.29-3.5-.73-2.95-1.22-4.8-4.2-4.94-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .9 2.15.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.32.38-.45.51-.15.15-.31.31-.13.6.17.29.77 1.28 1.66 2.07 1.14 1.02 2.1 1.34 2.4 1.49.29.15.46.13.63-.08.17-.2.72-.83.91-1.12.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.14.48.21.55.33.07.12.07.7-.17 1.38z" />
              </svg>
              Send Wishlist to WhatsApp
            </button>
            <button onClick={clear} className="text-xs text-center text-forest-700/40 hover:text-red-500 transition-colors">
              Clear wishlist
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
