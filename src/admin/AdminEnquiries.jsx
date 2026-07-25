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

                  <h2 className="font-display text-xl text-forest-800">
                    {e.customerName || "Guest Customer"}
                  </h2>

                  <p className="text-sm text-forest-700/60 mt-1">
                    {e.items?.length || 0} Products
                  </p>

                  <p className="text-sm mt-2">
                    Status:
                    <strong className="ml-2">
                      {e.status}
                    </strong>
                  </p>

                  <p className="text-sm mt-1">
                    Total:
                    <strong className="ml-2">
                      ₹{e.finalTotal}
                    </strong>
                  </p>

                </div>

                <div className="flex gap-2">

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
                    Contacted
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
                    className="text-red-600 text-sm"
                  >
                    Delete
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
