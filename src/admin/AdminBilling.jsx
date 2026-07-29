import { useMemo, useState } from "react";
import { PageHeader } from "./components/AdminUI";
import { useSiteData } from "../context/SiteDataContext";
import { createSale } from "../utils/salesService";
import { reduceStock } from "../utils/wishlistEnquiryService";
import { useNavigate } from "react-router-dom";

export default function AdminBilling() {

    const navigate = useNavigate();

  const { products } = useSiteData();

  const [customerName, setCustomerName] = useState("");

  const [phone, setPhone] = useState("");

  const [search, setSearch] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");

  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  const searchResults = useMemo(() => {

    if (!search.trim()) return [];

    return products
      .filter((p) => {

        const availability =
          p.availability || "both";

        return (
          (availability === "offline" ||
            availability === "both") &&
          p.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      })
      .slice(0, 8);

  }, [search, products]);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  const finalTotal = Math.max(
    subtotal - Number(discount || 0),
    0
    );

  return (

    <div>

      <PageHeader
        title="Offline Billing"
        subtitle="Generate bills for walk-in customers."
      />

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl2 shadow-card p-6 space-y-5">

          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e)=>setCustomerName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            placeholder="Search Plant..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <div className="border rounded-xl overflow-hidden">

            {searchResults.map((p)=>(

              <button
    key={p.id}
    onClick={() => {

        setCart(prev => {

            const existing = prev.find(
                item => item.id === p.id
            );

            if (existing) {

                return prev.map(item =>

                    item.id === p.id
                        ? {
                            ...item,
                            qty: item.qty + 1
                        }
                        : item

                );

            }

            return [

                ...prev,

                {
                    id: p.id,
                    name: p.name,
                    price: p.discountPrice || p.price,
                    qty: 1,
                    stockQuantity: p.stockQuantity
                }

            ];

        });

        setSearch("");

    }}
    className="w-full flex justify-between p-4 hover:bg-sage-50 border-b"
>

                <div className="text-left">

                  <div className="font-medium">

                    {p.name}

                  </div>

                  <div className="text-sm text-gray-500">

                    ₹{p.discountPrice || p.price}

                  </div>

                </div>

                <div>

                  Qty

                  {" "}

                  {p.stockQuantity}

                </div>

              </button>

            ))}

          </div>

        </div>

        <div className="bg-white rounded-xl2 shadow-card p-6">

          <h2 className="font-display text-2xl">

            Bill Summary

          </h2>

          {cart.length === 0 ? (

    <div className="py-12 text-center text-gray-500">

        No products added yet

    </div>

) : (

    <div className="space-y-4">

        {cart.map(item => (

            <div
                key={item.id}
                className="border rounded-xl p-4"
            >

                <div className="font-semibold">

                    {item.name}

                </div>

                <div className="flex items-center justify-between mt-3">

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => {

                                setCart(prev =>
                                    prev
                                        .map(i =>
                                            i.id === item.id
                                                ? {
                                                    ...i,
                                                    qty: i.qty - 1
                                                }
                                                : i
                                        )
                                        .filter(i => i.qty > 0)
                                );

                            }}
                            className="h-8 w-8 rounded bg-gray-100"
                        >

                            −

                        </button>

                        <strong>

                            {item.qty}

                        </strong>

                        <button
                            onClick={() => {

                                if (
                                    item.qty >=
                                    item.stockQuantity
                                ) {

                                    alert(
                                        `Only ${item.stockQuantity} available in stock`
                                    );

                                    return;

                                }

                                setCart(prev =>
                                    prev.map(i =>
                                        i.id === item.id
                                            ? {
                                                ...i,
                                                qty: i.qty + 1
                                            }
                                            : i
                                    )
                                );

                            }}
                            className="h-8 w-8 rounded bg-gray-100"
                        >

                            +

                        </button>

                    </div>

                    <strong>

                        ₹{item.price * item.qty}

                    </strong>

                </div>

            </div>

        ))}

    </div>

)}

          <hr className="my-6" />

                <div className="space-y-4">

                <div className="flex justify-between">

                    <span>
                    Subtotal
                    </span>

                    <strong>
                    ₹{subtotal}
                    </strong>

                </div>

                <div className="flex items-center justify-between">

                    <span>
                    Discount
                    </span>

                    <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-28 text-right"
                    />

                </div>

                <div className="border-t pt-4 flex justify-between text-xl font-bold text-forest-800">

                    <span>
                    Grand Total
                    </span>

                    <span>
                    ₹{finalTotal}
                    </span>

                </div>

                </div>

        <select
            className="mt-6 w-full border rounded-lg px-4 py-3"
            value={paymentMode}
            onChange={(e)=>setPaymentMode(e.target.value)}
          >

            <option>

              Cash

            </option>

            <option>

              UPI

            </option>

            <option>

              Card

            </option>

            <option>

              Bank Transfer

            </option>

          </select>

          <button

disabled={cart.length===0}

className="btn-primary w-full mt-6 disabled:opacity-50"

onClick={async()=>{

try{

const now = new Date();

const date =
`${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;

const billNo =
`PBL-${date}-${String(Date.now()).slice(-4)}`;

const saleData = {
  billNo,
  customerName,
  phone,
  paymentMode,
  items,
  subtotal,
  discount,
  finalTotal
};

console.log("SALE DATA", saleData);

await createSale(saleData);

await createSale({

billNo,

customerName,

phone,

paymentMode,

items:cart,

subtotal,

discount:Number(discount),

finalTotal

});

console.log({
  billNo,
  customerName,
  phone,
  paymentMode,
  items: cart,
  subtotal,
  discount: Number(discount),
  finalTotal
});


for(const item of cart){

await reduceStock(
item.id,
item.qty
);

}


setCart([]);

setCustomerName("");

setPhone("");

setDiscount(0);

navigate(`/admin/receipt/${billNo}`);


}
catch(err){

console.error(err);

alert(
"Unable to generate bill."
);

}

}}

>

🧾 Generate Bill

</button>

        </div>


      </div>

    </div>

    



  );

}
