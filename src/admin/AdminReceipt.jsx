import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSaleByBillNo } from "../utils/salesService";

import { useState } from "react";

export default function AdminReceipt() {

  const { billNo } = useParams();

  const navigate = useNavigate();

  const [sale, setSale] = useState(null);

  useEffect(() => {

    async function load() {

      const data = await getSaleByBillNo(billNo);

      if (!data) {

        alert("Bill not found");

        navigate("/admin/billing");

        return;

      }

      setSale(data);

      setTimeout(() => {

        window.print();

      }, 500);

    }

    load();

  }, []);

  useEffect(() => {

    const afterPrint = () => {

      navigate("/admin/billing");

    };

    window.addEventListener("afterprint", afterPrint);

    return () => {

      window.removeEventListener(
        "afterprint",
        afterPrint
      );

    };

  }, []);

  if (!sale) {

    return <p className="p-10">Loading...</p>;

  }

  return (

    <div className="max-w-sm mx-auto bg-white text-black p-6">

      <div className="text-center">

        <h1 className="text-2xl font-bold">

          🌿 PBL PLANTS

        </h1>

        <p>

          Walk-in Customer Bill

        </p>

      </div>

      <hr className="my-4"/>

      <p>

        <b>Bill No:</b> {sale.billNo}

      </p>

      <p>

        <b>Date:</b>{" "}

        {
          sale.createdAt?.seconds
            ? new Date(
                sale.createdAt.seconds * 1000
              ).toLocaleString("en-IN")
            : "-"
        }

      </p>

      {sale.customerName && (

        <p>

          <b>Customer:</b> {sale.customerName}

        </p>

      )}

      {sale.phone && (

        <p>

          <b>Phone:</b> {sale.phone}

        </p>

      )}

      <hr className="my-4"/>

      {sale.items.map(item => (

        <div
          key={item.id}
          className="mb-3"
        >

          <div>

            {item.name}

          </div>

          <div className="flex justify-between">

            <span>

              {item.qty} × ₹{item.price}

            </span>

            <b>

              ₹{item.qty * item.price}

            </b>

          </div>

        </div>

      ))}

      <hr className="my-4"/>

      <div className="flex justify-between">

        <span>Subtotal</span>

        <span>₹{sale.subtotal}</span>

      </div>

      <div className="flex justify-between">

        <span>Discount</span>

        <span>₹{sale.discount}</span>

      </div>

      <div className="flex justify-between font-bold text-lg mt-3">

        <span>TOTAL</span>

        <span>₹{sale.finalTotal}</span>

      </div>

      <hr className="my-4"/>

      <p>

        Payment: <b>{sale.paymentMode}</b>

      </p>

      <hr className="my-4"/>

      <div className="text-center">

        🌿 Thank You 🌿

        <br/>

        Visit Again

      </div>

    </div>

  );

}