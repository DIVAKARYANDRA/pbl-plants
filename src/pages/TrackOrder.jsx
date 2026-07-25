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

        <h1 className="mt-6 font-display text-5xl md:text-6xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,.25)]">
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

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f2f20] via-[#1f4d35] to-[#2f6b4b] text-white">

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

  <h1 className="mt-6 font-display text-5xl md:text-6xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,.25)]">

    

    Track Your Order

  </h1>

  <p className="mt-5 text-xl text-green-100 max-w-xl mx-auto">

    Your plants are carefully nurtured before reaching their new home.

  </p>

  <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">

    <span className="h-3 w-3 rounded-full bg-green-500 animate-ping"/>

    <span className="font-semibold text-white">

      Live Order Tracking

    </span>

  </div>

</div>

       

        <div className="mt-16">

  <div className="relative">

    {/* Progress Line */}

    <div className="absolute top-7 left-0 w-full h-2 rounded-full bg-green-100 bg-white/10">

      <div
        className="h-2 rounded-full bg-gradient-to-r
from-green-400
to-emerald-300 transition-all duration-1000"
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
              ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-[0_0_25px_rgba(34,197,94,.45)] scale-110 shadow-lg"
              : "bg-white/10 border border-white/20 text-white"
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



        <div className="mt-12 bg-white/10
backdrop-blur-xl
border border-white/20
rounded-xl2
shadow-2xl
p-8">

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-sm text-green-200/80">
                Tracking ID
              </p>

              <h2 className="text-xl font-semibold text-white mt-1">

                {order.trackingId}

              </h2>



              <p className="text-sm text-green-200/80 mt-6">

                Customer

              </p>

              <h3 className="text-lg">

                {order.customerName}

              </h3>



              <p className="text-sm text-green-200/80 mt-6">

                Current Status

              </p>

              <div className="inline-block mt-2 px-4 py-2 rounded-full bg-green-500/20
text-green-300
border
border-green-400/30 font-semibold text-white">

                {order.status}

              </div>

            </div>



            <div>

              <p className="text-sm text-green-200/80">

                Ordered Plants

              </p>

              <div className="mt-4 space-y-3">

                {order.items?.map(item => (

                  <div
                    key={item.productId}
                    className="flex justify-between border-b border-white/10 pb-2"
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
