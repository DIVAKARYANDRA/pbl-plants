import { PageHeader } from "./components/AdminUI";

export default function AdminOrderAnalytics() {

  return (

    <div>

      <PageHeader
        title="Order Analytics"
        subtitle="Business insights and order statistics."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl2 shadow-card p-6">
          <p className="text-sm text-forest-700/60">
            Total Orders
          </p>

          <h2 className="font-display text-4xl mt-2">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-6">
          <p className="text-sm text-forest-700/60">
            Revenue
          </p>

          <h2 className="font-display text-4xl mt-2">
            ₹0
          </h2>
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-6">
          <p className="text-sm text-forest-700/60">
            Delivered
          </p>

          <h2 className="font-display text-4xl mt-2">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-6">
          <p className="text-sm text-forest-700/60">
            Pending Payments
          </p>

          <h2 className="font-display text-4xl mt-2">
            --
          </h2>
        </div>

      </div>

    </div>

  );

}
