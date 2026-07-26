import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSaleByBillNo } from "../utils/salesService";
import { useSiteData } from "../context/SiteDataContext";
import { useState } from "react";

export default function AdminReceipt() {

  const { billNo } = useParams();

  const navigate = useNavigate();

  const { settings } = useSiteData();
  console.log(settings);

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

}, [billNo, navigate]);

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

<>
<style>{`

@media screen {

  body{
    background:#f3f4f6;
  }

}

@media print {

  @page{
    size:58mm auto;
    margin:0;
  }

  html,
  body{

    width:58mm;
    margin:0;
    padding:0;

  }

  body{

    background:white;

    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;

  }

  .receipt{

    width:58mm;

    margin:0 auto;

    padding:4mm;

    box-shadow:none;

  }

}

`}</style>

<div
className="
receipt
mx-auto
bg-white
text-black
p-4
text-sm
font-mono
"
>

      <div className="text-center mb-3">

  <img
    src="/pbl-logo.png"
    alt="PBL Plants"
    className="w-12 h-12 mx-auto mb-2 object-contain"
  />

  <h1 className="text-lg font-bold">

    {settings.logoText || "PBL Plants"}

  </h1>

  <p className="text-[11px] text-gray-500">

    {settings.tagline}

  </p>

  <p className="text-[11px] text-gray-600 mt-1">

    Walk-in Customer Bill

  </p>

</div>

      <hr className="my-2"/>

      <p>

        <b>Invoice No:</b> {sale.billNo}

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

      <hr className="my-2"/>

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

      <hr className="my-2"/>

      <div className="flex justify-between">

        <span>Subtotal</span>

        <span>₹{sale.subtotal}</span>

      </div>

      <div className="flex justify-between">

        <span>Discount</span>

        <span>₹{sale.discount}</span>

      </div>

      <div className="flex justify-between font-bold text-base mt-2">

        <span>TOTAL</span>

        <span>₹{sale.finalTotal}</span>

      </div>

      <hr className="my-2"/>

      <p>

        Payment: <b>{sale.paymentMode}</b>

      </p>

      <hr className="my-2"/>

      <div className="text-center text-[11px] mt-4">

  <hr className="my-2"/>

  <p className="font-semibold">

    🌿 Thank You 🌿

  </p>

  <p>

    Visit Again

  </p>

  <p className="mt-2 font-medium">

    {settings.logoText}

  </p>

  <p>

    📞 +{settings.whatsappNumber}

  </p>

</div>

    </div>

</>

);

}