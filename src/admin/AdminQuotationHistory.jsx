import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./components/AdminUI";
import { getQuotations } from "../utils/quotationService";
import { useNavigate } from "react-router-dom";
import { createSale } from "../utils/salesService";
import {
  reduceStock
} from "../utils/wishlistEnquiryService";

import {
  updateQuotation
} from "../utils/quotationService";


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

  async function handleConvert(q) {

  const ok = window.confirm(
    `Convert quotation ${q.quotationNo} to a Sales Bill?`
  );

  if (!ok) return;

  try {

    const now = new Date();

    const date =
      `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    const billNo =
      `PBL-${date}-${String(Date.now()).slice(-4)}`;

    // 1. Create Sale
    await createSale({

      billNo,

      customerName: q.customerName,

      phone: q.phone,

      paymentMode: "Pending",

      items: q.items,

      subtotal: q.subtotal,

      discount: q.discount,

      finalTotal: q.finalTotal

    });

    // 2. Reduce Stock
    for (const item of q.items) {

      await reduceStock(
        item.id,
        item.qty
      );

    }

    // 3. Update Quotation
    await updateQuotation(
      q.id,
      {
        status: "Converted",
        billNo
      }
    );

    alert("Quotation converted successfully.");

    load();

    navigate(`/admin/receipt/${billNo}`);

  } catch (err) {

    console.error(err);

    alert("Unable to convert quotation.");

  }

}

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

                <td className="p-4">

<div className="flex flex-wrap justify-center gap-2">

<button
className="btn-secondary"
onClick={()=>
window.open(
`/q/${q.quotationNo}`,
"_blank"
)
}
>

👁 View

</button>

<button
className="btn-secondary"
onClick={async()=>{

const link =
`${window.location.origin}/q/${q.quotationNo}`;

await navigator.clipboard.writeText(
link
);

alert(
"Quotation link copied."
);

}}
>

🔗 Copy

</button>

<button
className="btn-secondary"
onClick={()=>{

const link =
`${window.location.origin}/q/${q.quotationNo}`;

const message =
`🌿 Hello ${q.customerName},

Your quotation is ready.

Quotation No:
${q.quotationNo}

Please view it here:

${link}

Thank you,
PBL Plants`;

window.open(

`https://wa.me/${q.phone}?text=${encodeURIComponent(message)}`,

"_blank"

);

}}
>

💬 WhatsApp

</button>

{
q.status !== "Converted" && (

<button
className="btn-primary"
onClick={()=>
handleConvert(q)
}
>

✅ Convert

</button>

)
}

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