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

              <div className="mt-5 border-t pt-4">

                {e.items?.map((item) => (

                  <div
                    key={item.productId}
                    className="flex justify-between py-1"
                  >

                    <span>

                      {item.productName}

                      × {item.qty}

                    </span>

                    <span>

                      ₹{item.lineTotal}

                    </span>

                  </div>

                ))}

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
