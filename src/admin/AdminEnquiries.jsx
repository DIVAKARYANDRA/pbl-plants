import { useEffect, useState } from "react";
import {
  getWishlistEnquiries,
  deleteWishlistEnquiry,
  updateWishlistStatus,
} from "../utils/wishlistEnquiryService";
import { PageHeader } from "./components/AdminUI";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

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

          : e.status === "Contacted"
          ? "bg-yellow-100 text-yellow-700"

          : e.status === "Quotation Sent"
          ? "bg-blue-100 text-blue-700"

          : e.status === "Order Confirmed"
          ? "bg-purple-100 text-purple-700"

          : "bg-gray-100 text-gray-700"
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

                  <button
                    onClick={async () => {
                      await updateWishlistStatus(
                        e.id,
                        "Contacted"
                      );
                      load();
                    }}
                    className="btn-secondary text-sm"
                  >
                    Update Status
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

      const message = encodeURIComponent(
        selectedEnquiry.whatsappMessage || ""
      );

      window.open(
        `https://wa.me/?text=${message}`,
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
