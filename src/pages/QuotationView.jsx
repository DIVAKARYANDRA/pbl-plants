import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuotationByNumber } from "../utils/quotationService";

export default function QuotationView() {

    const { quotationNo } = useParams();

    const [quotation, setQuotation] = useState(null);

    useEffect(() => {

        async function load() {

            const data =
                await getQuotationByNumber(
                    quotationNo
                );

            setQuotation(data);

        }

        load();

    }, [quotationNo]);

    if (!quotation) {

        return (

            <div className="py-24 text-center">

                Loading quotation...

            </div>

        );

    }

    return (

<div className="min-h-screen bg-sage-50 py-10">

<div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">

{/* HEADER */}

<div className="bg-forest-800 text-white px-10 py-8 flex justify-between items-center">

<div className="flex items-center gap-5">

<img
src="/pbl-logo.png"
alt="PBL Plants"
className="h-20 w-20 object-contain bg-white rounded-full p-2"
/>

<div>

<h1 className="text-4xl font-display">

PBL PLANTS

</h1>

<p className="text-green-100">

Premium Indoor & Outdoor Plants

</p>

</div>

</div>

<div className="text-right">

<h2 className="text-3xl font-bold">

QUOTATION

</h2>

<p className="mt-2">

Quotation No: {quotation.quotationNo}

</p>

</div>

</div>

{/* BODY */}
{/* PRODUCTS */}

<div>

  <h3 className="text-xl font-semibold mb-4">

    Quotation Items

  </h3>

  <div className="overflow-x-auto">

    <table className="w-full border border-gray-200">

      <thead className="bg-forest-700 text-white">

        <tr>

          <th className="p-3 text-left">Product</th>

          <th className="p-3 text-center">Qty</th>

          <th className="p-3 text-right">Unit Price</th>

          <th className="p-3 text-right">Amount</th>

        </tr>

      </thead>

      <tbody>

        {quotation.items.map(item => (

          <tr key={item.id} className="border-t">

            <td className="p-3">

              {item.name}

            </td>

            <td className="p-3 text-center">

              {item.qty}

            </td>

            <td className="p-3 text-right">

              ₹{item.price}

            </td>

            <td className="p-3 text-right font-semibold">

              ₹{item.qty * item.price}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

{/* TOTALS */}

<div className="flex justify-end">

  <div className="w-full md:w-96 bg-sage-50 rounded-xl p-6">

    <div className="flex justify-between mb-3">

      <span>Subtotal</span>

      <strong>₹{quotation.subtotal}</strong>

    </div>

    <div className="flex justify-between mb-3">

      <span>Discount</span>

      <strong>₹{quotation.discount}</strong>

    </div>

    <div className="border-t pt-4 flex justify-between text-2xl font-bold text-forest-800">

      <span>Grand Total</span>

      <span>₹{quotation.finalTotal}</span>

    </div>

  </div>

</div>

{/* NOTES */}

{quotation.notes && (

<div className="bg-sage-50 rounded-xl p-6">

<h3 className="font-semibold text-lg mb-3">

Customer Notes

</h3>

<p>

{quotation.notes}

</p>

</div>

)}

{/* TERMS */}

<div className="bg-gray-50 rounded-xl p-6">

<h3 className="font-semibold text-lg mb-4">

Terms & Conditions

</h3>

<ul className="list-disc ml-5 space-y-2 text-sm">

<li>

This quotation is valid until the mentioned validity date.

</li>

<li>

Stock availability will be confirmed at the time of order.

</li>

<li>

Transportation charges, if applicable, are extra.

</li>

<li>

Prices are subject to change after the validity period.

</li>

<li>

This quotation does not reserve stock.

</li>

</ul>

</div>

{/* FOOTER */}

<div className="border-t pt-10">

<div className="flex justify-between items-end">

<div>

<h3 className="font-semibold text-lg">

PBL PLANTS

</h3>

<p>

Seethampeta, beside SRM Transport

</p>

<p>

Near Sai Baba Temple

</p>

<p>

Visakhapatnam - 530016

</p>

<p>

📞 +91 99595 58369

</p>

<p>

✉ pblplants@gmail.com

</p>

<p>

🌐 pbl-plants.vercel.app

</p>

</div>

<div className="text-center">

<div className="h-16"></div>

<div className="border-t w-52"></div>

<p className="mt-2 font-semibold">

Prudhvi Polisetti

</p>

<p className="text-sm text-gray-500">

Authorized Signature

</p>

</div>

</div>

</div>

</div>

</div>

</div>

);

}