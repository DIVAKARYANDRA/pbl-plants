import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./components/AdminUI";
import { getAllSales } from "../utils/salesService";

export default function AdminSalesHistory() {

  const navigate = useNavigate();

  const [sales, setSales] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    async function load() {

      const data = await getAllSales();

      setSales(data);

    }

    load();

  }, []);

  const filtered = useMemo(() => {

    if (!search.trim()) return sales;

    const q = search.toLowerCase();

    return sales.filter(s =>

      s.billNo.toLowerCase().includes(q) ||

      (s.customerName || "")
        .toLowerCase()
        .includes(q)

    );

  }, [sales, search]);

  return (

    <div>

      <PageHeader
        title="Sales History"
        subtitle="View all offline bills."
      />

    const today = new Date().toDateString();

const todaysSales = filtered.filter((sale) => {
  if (!sale.createdAt?.seconds) return false;
  return new Date(sale.createdAt.seconds * 1000).toDateString() === today;
});

const totalRevenue = filtered.reduce(
  (sum, sale) => sum + Number(sale.finalTotal || 0),
  0
);

const todaysRevenue = todaysSales.reduce(
  (sum, sale) => sum + Number(sale.finalTotal || 0),
  0
);

const totalPlants = filtered.reduce(
  (sum, sale) =>
    sum +
    (sale.items || []).reduce(
      (qty, item) => qty + (Number(item?.qty || 0) || 0),
      0
    ),
  0
);

const averageBill = filtered.length > 0 ? Math.round(totalRevenue / filtered.length) : 0;

      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search Invoice or Customer..."
        className="border rounded-lg px-4 py-3 w-full mb-6"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  <div className="bg-white rounded-xl2 shadow-card p-5">

    <div className="text-sm text-gray-500">

      Today's Sales

    </div>

    <div className="text-2xl font-bold text-forest-800">

      ₹{todaysRevenue}

    </div>

  </div>

  <div className="bg-white rounded-xl2 shadow-card p-5">

    <div className="text-sm text-gray-500">

      Total Revenue

    </div>

    <div className="text-2xl font-bold text-forest-800">

      ₹{totalRevenue}

    </div>

  </div>

  <div className="bg-white rounded-xl2 shadow-card p-5">

    <div className="text-sm text-gray-500">

      Plants Sold

    </div>

    <div className="text-2xl font-bold text-forest-800">

      {totalPlants}

    </div>

  </div>

  <div className="bg-white rounded-xl2 shadow-card p-5">

    <div className="text-sm text-gray-500">

      Average Bill

    </div>

    <div className="text-2xl font-bold text-forest-800">

      ₹{averageBill}

    </div>

  </div>

</div>

      <div className="overflow-auto bg-white rounded-xl2 shadow-card">

        <table className="min-w-full">

          <thead className="bg-sage-100">

            <tr>

              <th className="p-4 text-left">Invoice</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-right">Total</th>

              <th className="p-4 text-center">

                Items

                </th>

              <th className="p-4 text-left">Payment</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(sale => (

              <tr
                key={sale.id}
                className="border-t"
              >

                <td className="p-4">

                  {sale.billNo}

                </td>

                <td className="p-4">

                  {sale.customerName || "-"}

                </td>

                <td className="p-4">

                  {

                    sale.createdAt?.seconds

                    ?

                    new Date(
                      sale.createdAt.seconds * 1000
                    ).toLocaleDateString("en-IN")

                    :

                    "-"

                  }

                </td>

                <td className="p-4 text-right">

                  ₹{sale.finalTotal}

                </td>

                <td className="p-4 text-center">

                    {sale.items.length}

                    </td>

                <td className="p-4">

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sale.paymentMode === "Cash"
                            ? "bg-green-100 text-green-700"
                            : sale.paymentMode === "UPI"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                    >

                        {sale.paymentMode}

                    </span>

                    </td>

                <td className="p-4 text-center">

                  <button
                        className="px-3 py-2 rounded-lg bg-forest-700 text-white hover:bg-forest-600 transition"
                        onClick={() =>
                            navigate(`/admin/receipt/${sale.billNo}`)
                        }
                        >
                        🖨
                        </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}