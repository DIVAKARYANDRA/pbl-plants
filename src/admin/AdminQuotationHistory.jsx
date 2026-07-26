import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./components/AdminUI";
import { getQuotations } from "../utils/quotationService";
import { useNavigate } from "react-router-dom";

export default function AdminQuotationHistory() {

  const [quotations, setQuotations] = useState([]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const data = await getQuotations();

    setQuotations(data);

  }

  const filtered = useMemo(() => {

    return quotations.filter(q =>

      q.customerName
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [quotations, search]);

  return (

    <div>

      <PageHeader
        title="Quotation History"
        subtitle="Manage customer quotations."
      />

      <input
        className="border rounded-lg px-4 py-3 w-full mb-6"
        placeholder="Search customer..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <div className="overflow-auto bg-white rounded-xl2 shadow-card">

        <table className="min-w-full">

          <thead className="bg-sage-100">

            <tr>

              <th className="p-4 text-left">

                Quotation

              </th>

              <th className="p-4 text-left">

                Customer

              </th>

              <th className="p-4">

                Total

              </th>

              <th className="p-4">

                Status

              </th>

              <th className="p-4">

                Valid Till

              </th>

              <th className="p-4">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(q => (

              <tr
                key={q.id}
                className="border-t"
              >

                <td className="p-4">

                  {q.quotationNo}

                </td>

                <td className="p-4">

                  {q.customerName}

                </td>

                <td className="text-center">

                  ₹{q.finalTotal}

                </td>

                <td className="text-center">

                  {q.status}

                </td>

                <td className="text-center">

                  {q.validTill}

                </td>

                <td className="text-center">

                  <div className="flex justify-center gap-2">

<button
    className="btn-secondary"
    onClick={() =>
        navigate(`/admin/quotation/${q.id}`)
    }
>
    👁 View
</button>

</div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}