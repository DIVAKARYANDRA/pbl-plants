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

  const ORDER_STEPS = [
  "New",
  "Customer Responded",
  "Payment Pending",
  "Payment Received",
  "Order Confirmed",
  "Out for Delivery",
  "Delivered",
];

const currentStep =
  Math.max(
    ORDER_STEPS.indexOf(order.status),
    0
  );

  const leaves = [
  5, 12, 20, 28, 36, 45,
  55, 64, 73, 82, 90, 96
];



  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eef8ec] via-white to-[#f8fff8]">

      {/* Floating Background */}

<div className="absolute inset-0 overflow-hidden pointer-events-none">

  {/* Sun */}

  <div className="absolute top-16 right-20 h-40 w-40 rounded-full bg-yellow-200 blur-3xl opacity-30 animate-pulse"/>

  {/* Clouds */}

  <div className="absolute top-24 left-[-200px] animate-[cloud_35s_linear_infinite]">

    <div className="w-40 h-12 rounded-full bg-white shadow-lg opacity-70"/>

  </div>

  <div className="absolute top-44 left-[-260px] animate-[cloud_48s_linear_infinite]">

    <div className="w-56 h-14 rounded-full bg-white shadow-lg opacity-60"/>

  </div>

  {/* Floating Leaves */}

  {leaves.map((left, i) => (

  <div
    key={i}
    className="absolute text-green-500 opacity-20 animate-[leaf_18s_linear_infinite]"
    style={{
      left: `${left}%`,
      top: "-60px",
      animationDelay: `${i * 1.4}s`,
      animationDuration: `${14 + i}s`,
      fontSize: `${22 + (i % 4) * 6}px`
    }}
  >
    🍃
  </div>

))}

</div>

      <div className="max-w-5xl mx-auto px-6 py-14">

        <div className="text-center pt-10">

  <div className="text-7xl animate-bounce">

    🌿

  </div>

  <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-800">

    Track Your Order

  </h1>

  <p className="mt-5 text-xl text-forest-700 max-w-xl mx-auto">

    Your plants are carefully nurtured before reaching their new home.

  </p>

  <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-xl">

    <span className="h-3 w-3 rounded-full bg-green-500 animate-ping"/>

    <span className="font-semibold">

      Live Order Tracking

    </span>

  </div>

</div>

       

        <div className="mt-16">

  <div className="relative">

    {/* Progress Line */}

    <div className="absolute top-7 left-0 w-full h-2 rounded-full bg-green-100">

      <div
        className="h-2 rounded-full bg-green-600 transition-all duration-1000"
        style={{
          width: `${(currentStep/(ORDER_STEPS.length-1))*100}%`
        }}
      />

    </div>


    <div className="relative flex justify-between">

      {[
        {
          icon:"🌱",
          label:"Received"
        },
        {
          icon:"📦",
          label:"Packed"
        },
        {
          icon:"🚚",
          label:"Delivery"
        },
        {
          icon:"🏡",
          label:"Delivered"
        }
      ].map((step,index)=>(

        <div
          key={index}
          className="flex flex-col items-center"
        >

          <div
            className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl transition-all duration-700 ${
              currentStep >= index*2
              ? "bg-green-600 text-white scale-110 shadow-lg"
              : "bg-white border-2 border-green-200"
            }`}
          >

            {step.icon}

          </div>

          <span className="text-sm mt-3">

            {step.label}

          </span>

        </div>

      ))}

    </div>

  </div>

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
