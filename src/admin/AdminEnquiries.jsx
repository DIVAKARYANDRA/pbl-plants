import { useEffect, useState } from "react";
import {
  getWishlistEnquiries,
  deleteWishlistEnquiry,
  updateWishlistStatus,
  assignTrackingId,
} from "../utils/wishlistEnquiryService";
import { PageHeader } from "./components/AdminUI";
import { buildWhatsAppMessage } from "../utils/whatsappTemplates";
import { useSiteData } from "../context/SiteDataContext";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const { settings } = useSiteData();

  async function load() {
    setLoading(true);

    try {
      const data = await getWishlistEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleTrackingLink(enquiry) {

  try {

    const trackingId =
      await assignTrackingId(enquiry.id);

    const url =
      `${window.location.origin}/track/${trackingId}`;

    await navigator.clipboard.writeText(url);

    alert("Tracking link copied to clipboard.");

    load();

  } catch (err) {

    console.error(err);

    alert("Unable to generate tracking link.");

  }

}

  return (
    <div>
      <PageHeader
        title="Customer Enquiries"
        subtitle="Wishlist enquiries received from the website."
      />

      {loading ? (
        <p>Loading...</p>
      ) : enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <div className="space-y-5">
          {enquiries.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-xl2 shadow-card p-6"
            >
              <div className="flex justify-between items-start">

                <div>

                 <h2 className="font-display text-2xl text-forest-800">
  {e.customerName || "Guest Customer"}
</h2>

                  <div className="mt-3">

  <span
    className={`
      inline-flex
      items-center
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold

      ${
e.status === "New"
? "bg-green-100 text-green-700"

: e.status === "Customer Responded"
? "bg-yellow-100 text-yellow-700"

: e.status === "Payment Pending"
? "bg-orange-100 text-orange-700"

: e.status === "Payment Received"
? "bg-sky-100 text-sky-700"

: e.status === "Order Confirmed"
? "bg-purple-100 text-purple-700"

: e.status === "Out for Delivery"
? "bg-indigo-100 text-indigo-700"

: e.status === "Delivered"
? "bg-emerald-100 text-emerald-700"

: "bg-red-100 text-red-700"
}
    `}
  >
    {e.status}
  </span>

</div>

<div className="space-y-1 mt-3 text-sm text-forest-700">

  <p>
    📞 {e.phone || "-"}
  </p>

  <p>
    📍 {e.city || "-"}
  </p>

  <p>
    🛒 {e.items?.length || 0} Products
  </p>

  <p>
    💰 ₹{e.finalTotal}
  </p>

  <p>
  🔗 Tracking ID:
  <strong className="ml-2">
    {e.trackingId || "Not Generated"}
  </strong>
</p>

  <p>
    📅 {
      e.createdAt?.seconds
        ? new Date(
            e.createdAt.seconds * 1000
          ).toLocaleString("en-IN")
        : "-"
    }
  </p>

</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">

                  <select
  value={e.status}
  onChange={async (event) => {

    await updateWishlistStatus(
      e.id,
      event.target.value
    );

    load();

  }}
  className="border rounded-lg px-3 py-2 text-sm bg-white"
>

  <option value="New">
    🟢 New
  </option>

  <option value="Customer Responded">
    🟡 Customer Responded
  </option>

  <option value="Payment Pending">
    🟠 Payment Pending
  </option>

  <option value="Payment Received">
    🔵 Payment Received
  </option>

  <option value="Order Confirmed">
    🟣 Order Confirmed
  </option>

  <option value="Out for Delivery">
    🚚 Out for Delivery
  </option>

  <option value="Delivered">
    ✅ Delivered
  </option>

  <option value="Cancelled">
    ❌ Cancelled
  </option>

</select>

                  <button
  onClick={() => handleTrackingLink(e)}
  className="btn-secondary text-sm"
>
  {e.trackingId
    ? "📋 Copy Tracking Link"
    : "🔗 Generate Tracking Link"}
</button>

                  <button
                    onClick={async () => {

                      if (
                        !window.confirm(
                          "Delete this enquiry?"
                        )
                      )
                        return;

                      await deleteWishlistEnquiry(e.id);

                      load();

                    }}
                    className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

              <div className="mt-5 border-t pt-4 flex justify-between items-center">

  <span className="text-sm text-forest-700">
    {e.items?.length || 0} Products
  </span>

  <button
    onClick={() => setSelectedEnquiry(e)}
    className="btn-secondary text-sm"
  >
    View Details
  </button>

</div>

            </div>
          ))}
        </div>
      )}

      {selectedEnquiry && (

<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">

<div className="bg-white rounded-xl2 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

<div className="flex justify-between items-center p-6 border-b">

<h2 className="font-display text-2xl text-forest-800">
Customer Enquiry
</h2>

<button
onClick={()=>setSelectedEnquiry(null)}
className="text-2xl"
>
×
</button>

</div>

<div className="p-6 space-y-6">

<div>

<h3 className="font-semibold text-lg">
{selectedEnquiry.customerName}
</h3>

<p>📞 {selectedEnquiry.phone}</p>

<p>📍 {selectedEnquiry.city}</p>

{
selectedEnquiry.notes && (
<p className="mt-2">
📝 {selectedEnquiry.notes}
</p>
)
}

</div>

<hr/>

<div>

<h3 className="font-semibold mb-3">
Products
</h3>

{selectedEnquiry.items?.map(item=>(

<div
key={item.productId}
className="flex justify-between py-2 border-b"
>

<div>

<div className="font-medium">
{item.productName}
</div>

<div className="text-sm text-gray-500">
Qty : {item.qty}
</div>

</div>

<div>
₹{item.lineTotal}
</div>

</div>

))}

</div>

<hr/>

<div className="space-y-2">

<div className="flex justify-between">

<span>Subtotal</span>

<span>
₹{selectedEnquiry.subtotal}
</span>

</div>

<div className="flex justify-between">

<span>Discount</span>

<span>
₹{selectedEnquiry.discount}
</span>

</div>

<div className="flex justify-between font-bold text-lg">

<span>Final Total</span>

<span>
₹{selectedEnquiry.finalTotal}
</span>

</div>

</div>

{
selectedEnquiry.offerApplied && (

<div>

🎁 Offer Applied :
<strong className="ml-2">
{selectedEnquiry.offerApplied}
</strong>

</div>

)
}

  <div className="flex justify-end pt-6">

  <button
    onClick={() => {

  let phone = selectedEnquiry.phone || "";

  // Keep only digits
  phone = phone.replace(/\D/g, "");

  // If user entered 10 digits, add India code
  if (phone.length === 10) {
    phone = "91" + phone;
  }

  const message = encodeURIComponent(
  buildWhatsAppMessage(
    selectedEnquiry,
    settings.paymentSettings
  )
);

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );

}}
    className="btn-primary"
  >
    📲 Open WhatsApp
  </button>

</div>

</div>

</div>

</div>

)}
    </div>
  );
}
