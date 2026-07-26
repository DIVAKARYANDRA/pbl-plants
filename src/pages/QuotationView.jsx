
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuotationByNumber } from "../utils/quotationService";

export default function QuotationView() {
  const { quotationNo } = useParams();
  const [quotation, setQuotation] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getQuotationByNumber(quotationNo);
      setQuotation(data);
    }
    load();
  }, [quotationNo]);

  if (!quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading quotation...
      </div>
    );
  }

  const createdDate = quotation.createdAt?.seconds
    ? new Date(quotation.createdAt.seconds * 1000).toLocaleDateString("en-IN")
    : "-";

  const statusClasses = {
    Draft: "bg-yellow-100 text-yellow-700",
    Converted: "bg-green-100 text-green-700",
    Expired: "bg-red-100 text-red-700",
    Approved: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-sage-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-forest-800 text-white p-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/pbl-logo.jpg"
              alt="PBL Plants"
              className="h-16 w-16 rounded-full bg-white p-2"
            />
            <div>
              <h1 className="text-3xl font-display">PBL PLANTS</h1>
              <p className="text-green-100">
                Premium Indoor & Outdoor Plants
              </p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <h2 className="text-3xl font-bold">QUOTATION</h2>

            <div className="mt-3 inline-block bg-white/10 rounded-lg px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-green-100">
                Quotation No
              </p>
              <p className="font-bold text-lg">
                {quotation.quotationNo}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">
                Customer Details
              </h3>

              <p><b>Name:</b> {quotation.customerName}</p>
              <p><b>Phone:</b> {quotation.phone}</p>
              <p><b>Address:</b> {quotation.address || "-"}</p>
            </div>

            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">
                Quotation Details
              </h3>

              <p><b>Date:</b> {createdDate}</p>
              <p><b>Valid Till:</b> {quotation.validTill}</p>

              <div className="mt-3">
                <b>Status:</b>{" "}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses[quotation.status] || "bg-gray-100 text-gray-700"}`}>
                  {quotation.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quotation Items</h3>

            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-forest-700 text-white">
                  <tr>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {quotation.items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-center">{item.qty}</td>
                      <td className="p-3 text-right">₹{item.price}</td>
                      <td className="p-3 text-right font-semibold">
                        ₹{item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full md:w-96 bg-sage-50 rounded-xl p-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <strong>₹{quotation.subtotal}</strong>
              </div>

              <div className="flex justify-between mt-3">
                <span>Discount</span>
                <strong>₹{quotation.discount}</strong>
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between text-2xl font-bold text-forest-800">
                <span>Grand Total</span>
                <span>₹{quotation.finalTotal}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-semibold text-green-800">
              Quotation Validity
            </h3>

            <p className="mt-2 text-green-700">
              This quotation is valid until <strong>{quotation.validTill}</strong>.
              Prices and stock availability may change after this date.
            </p>
          </div>

          {quotation.notes && (
            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">
                Customer Notes
              </h3>
              <p>{quotation.notes}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">
              Terms & Conditions
            </h3>

            <ul className="list-disc ml-6 space-y-2 text-sm">
              <li>This quotation is valid until the specified validity date.</li>
              <li>Stock availability is subject to confirmation.</li>
              <li>Transportation charges are extra if applicable.</li>
              <li>Prices may change after the validity period.</li>
              <li>This quotation does not reserve stock.</li>
            </ul>
          </div>

          <div className="text-center py-6">
            <h2 className="text-2xl font-display text-forest-800">
              🌿 Thank You 🌿
            </h2>

            <p className="text-gray-600 mt-2">
              We appreciate the opportunity to serve you.
            </p>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between gap-8">

            <div className="text-sm space-y-1">
              <h3 className="font-semibold text-lg">
                PBL PLANTS
              </h3>

              <p>Seethampeta, beside SRM Transport</p>
              <p>Near Sai Baba Temple</p>
              <p>Visakhapatnam, Andhra Pradesh 530016</p>
              <p>📞 +91 99595 58369</p>
              <p>✉ pblplants@gmail.com</p>
              <p>🌐 pbl-plants.vercel.app</p>
            </div>

            <div className="text-center">
              <div className="h-16"></div>
              <div className="border-t w-56"></div>
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
  );
}
