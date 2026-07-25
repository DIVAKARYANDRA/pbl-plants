import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnquiryByTrackingId } from "../utils/wishlistEnquiryService";

export default function TrackOrder() {

  const { trackingId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const data =
        await getEnquiryByTrackingId(trackingId);

      setOrder(data);

      setLoading(false);

    }

    load();

  }, [trackingId]);



  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center">

        <div className="h-20 w-20 rounded-full border-4 border-green-200 border-t-green-600 animate-spin"></div>

        <p className="mt-6 text-lg text-green-700">
          Tracking your order...
        </p>

      </div>

    );

  }



  if (!order) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">

        <div className="text-7xl">
          🌿
        </div>

        <h1 className="text-3xl font-bold mt-6 text-green-800">
          Order Not Found
        </h1>

        <p className="mt-3 text-green-700">
          We couldn't find this tracking ID.
        </p>

        <Link
          to="/"
          className="mt-8 btn-primary"
        >
          Back to Home
        </Link>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">

      <div className="max-w-5xl mx-auto px-6 py-14">

        <div className="text-center">

          <div className="text-6xl">
            🌿
          </div>

          <h1 className="mt-5 text-4xl font-display text-forest-800">

            Track Your Order

          </h1>

          <p className="mt-3 text-forest-700/70">

            Your plants are getting ready for their new home.

          </p>

        </div>



        <div className="mt-12 bg-white rounded-xl2 shadow-card p-8">

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-sm text-gray-500">
                Tracking ID
              </p>

              <h2 className="text-xl font-semibold mt-1">

                {order.trackingId}

              </h2>



              <p className="text-sm text-gray-500 mt-6">

                Customer

              </p>

              <h3 className="text-lg">

                {order.customerName}

              </h3>



              <p className="text-sm text-gray-500 mt-6">

                Current Status

              </p>

              <div className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

                {order.status}

              </div>

            </div>



            <div>

              <p className="text-sm text-gray-500">

                Ordered Plants

              </p>

              <div className="mt-4 space-y-3">

                {order.items?.map(item => (

                  <div
                    key={item.productId}
                    className="flex justify-between border-b pb-2"
                  >

                    <span>

                      {item.productName} × {item.qty}

                    </span>

                    <strong>

                      ₹{item.lineTotal}

                    </strong>

                  </div>

                ))}

              </div>



              <div className="mt-6 flex justify-between text-lg">

                <span>Total</span>

                <strong>

                  ₹{order.finalTotal}

                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
