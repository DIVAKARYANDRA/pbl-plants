import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./components/AdminUI";
import { getWishlistEnquiries } from "../utils/wishlistEnquiryService";

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl2 shadow-card p-6">
      <p className="text-sm text-forest-700/55">
        {title}
      </p>

      <h2
        className={`font-display text-4xl mt-3 ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}

export default function AdminOrderAnalytics() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const data =
        await getWishlistEnquiries();

      setOrders(data);

      setLoading(false);

    }

    load();

  }, []);

  const analytics = useMemo(() => {

    let revenue = 0;

    let delivered = 0;

    let pendingPayments = 0;

    let confirmed = 0;

    let outForDelivery = 0;

    let cancelled = 0;

    let totalOrderValue = 0;

    orders.forEach(order => {

      totalOrderValue +=
        Number(order.finalTotal || 0);

      switch(order.status){

        case "Delivered":

          delivered++;

          revenue +=
            Number(order.finalTotal || 0);

          break;

        case "Payment Pending":

          pendingPayments++;

          break;

        case "Order Confirmed":

          confirmed++;

          revenue +=
            Number(order.finalTotal || 0);

          break;

        case "Out for Delivery":

          outForDelivery++;

          revenue +=
            Number(order.finalTotal || 0);

          break;

        case "Cancelled":

          cancelled++;

          break;

      }

    });

    return {

      totalOrders: orders.length,

      revenue,

      delivered,

      pendingPayments,

      confirmed,

      outForDelivery,

      cancelled,

      averageOrder:

        orders.length
          ? Math.round(
              totalOrderValue /
              orders.length
            )
          : 0

    };

  }, [orders]);

  if (loading) {

    return <p>Loading analytics...</p>;

  }

  return (

    <div>

      <PageHeader
        title="Order Analytics"
        subtitle="Business insights and order statistics."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          title="Total Orders"
          value={analytics.totalOrders}
          color="text-forest-800"
        />

        <StatCard
          title="Revenue"
          value={`₹${analytics.revenue}`}
          color="text-green-700"
        />

        <StatCard
          title="Delivered"
          value={analytics.delivered}
          color="text-emerald-600"
        />

        <StatCard
          title="Pending Payments"
          value={analytics.pendingPayments}
          color="text-orange-600"
        />

        <StatCard
          title="Confirmed"
          value={analytics.confirmed}
          color="text-purple-600"
        />

        <StatCard
          title="Out For Delivery"
          value={analytics.outForDelivery}
          color="text-sky-600"
        />

        <StatCard
          title="Cancelled"
          value={analytics.cancelled}
          color="text-red-600"
        />

        <StatCard
          title="Average Order"
          value={`₹${analytics.averageOrder}`}
          color="text-blue-700"
        />

      </div>

    </div>

  );

}
