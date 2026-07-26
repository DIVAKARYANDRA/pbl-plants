import { PageHeader } from "./components/AdminUI";

export default function AdminBilling() {

  return (

    <div>

      <PageHeader
        title="Offline Billing"
        subtitle="Generate walk-in customer bills and manage POS sales."
      />

      <div className="bg-white rounded-xl2 shadow-card p-8">

        <h2 className="font-display text-2xl text-forest-800">

          🚧 Offline Billing Coming Soon

        </h2>

        <p className="mt-4 text-forest-700/70">

          This module will allow you to:

        </p>

        <ul className="mt-5 space-y-3 text-forest-700">

          <li>✅ Search products</li>

          <li>✅ Add products to bill</li>

          <li>✅ Auto reduce inventory</li>

          <li>✅ Generate printable receipt</li>

          <li>✅ Save sales history</li>

          <li>✅ Dashboard analytics</li>

        </ul>

      </div>

    </div>

  );

}