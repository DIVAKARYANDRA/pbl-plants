export default function AdminBillPrint({ sale }) {

  if (!sale) return null;

  return (

    <div
      id="bill-print"
      className="max-w-[320px] mx-auto bg-white text-black p-4 text-sm"
    >

      <div className="text-center">

        <h2 className="text-xl font-bold">

          🌿 PBL PLANTS

        </h2>

        <p>

          Walk-in Customer Bill

        </p>

      </div>

      <hr className="my-3"/>

      <p>

        <strong>Bill No:</strong>

        {" "}

        {sale.billNo}

      </p>

      <p>

        <strong>Date:</strong>

        {" "}

        {new Date().toLocaleString("en-IN")}

      </p>

      {
        sale.customerName &&

        <p>

          <strong>Customer:</strong>

          {" "}

          {sale.customerName}

        </p>

      }

      {
        sale.phone &&

        <p>

          <strong>Phone:</strong>

          {" "}

          {sale.phone}

        </p>

      }

      <hr className="my-3"/>

      {sale.items.map(item=>(

        <div
          key={item.id}
          className="mb-3"
        >

          <div className="font-semibold">

            {item.name}

          </div>

          <div className="flex justify-between">

            <span>

              {item.qty} × ₹{item.price}

            </span>

            <strong>

              ₹{item.qty*item.price}

            </strong>

          </div>

        </div>

      ))}

      <hr className="my-3"/>

      <div className="flex justify-between">

        <span>

          Subtotal

        </span>

        <span>

          ₹{sale.subtotal}

        </span>

      </div>

      <div className="flex justify-between">

        <span>

          Discount

        </span>

        <span>

          ₹{sale.discount}

        </span>

      </div>

      <div className="flex justify-between text-lg font-bold mt-3">

        <span>

          TOTAL

        </span>

        <span>

          ₹{sale.finalTotal}

        </span>

      </div>

      <div className="mt-4">

        Payment :

        {" "}

        {sale.paymentMode}

      </div>

      <hr className="my-4"/>

      <div className="text-center">

        🌿 Thank You 🌿

        <br/>

        Visit Again

      </div>

    </div>

  );

}