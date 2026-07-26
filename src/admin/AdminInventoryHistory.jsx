import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./components/AdminUI";
import { getInventoryHistory } from "../utils/inventoryService";

export default function AdminInventoryHistory() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    async function load() {

      const data = await getInventoryHistory();

      setHistory(data);

    }

    load();

  }, []);

  const filtered = useMemo(() => {

    return history.filter(item =>
      item.productName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [history, search]);

  return (

    <div>

      <PageHeader
        title="Inventory History"
        subtitle="Track every stock movement."
      />

      <input
        className="border rounded-lg px-4 py-3 w-full mb-6"
        placeholder="Search product..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <div className="overflow-auto bg-white rounded-xl2 shadow-card">

        <table className="min-w-full">

          <thead className="bg-sage-100">

            <tr>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4">Action</th>

              <th className="p-4">Qty</th>

              <th className="p-4">Reason</th>

              <th className="p-4">Previous</th>

              <th className="p-4">Current</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(item=>(

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4">

                  {
                    item.createdAt?.seconds
                    ? new Date(
                        item.createdAt.seconds*1000
                      ).toLocaleString("en-IN")
                    : "-"
                  }

                </td>

                <td className="p-4">

                  {item.productName}

                </td>

                <td className="text-center">

                  {item.action==="receive"

                    ? "📦 Receive"

                    : "➖ Remove"}

                </td>

                <td className="text-center">

                  {item.quantity}

                </td>

                <td className="text-center">

                  {item.reason}

                </td>

                <td className="text-center">

                  {item.previousStock}

                </td>

                <td className="text-center font-semibold text-forest-800">

                  {item.newStock}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}