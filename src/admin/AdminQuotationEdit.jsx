import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "./components/AdminUI";

import {
    getQuotationById,
    updateQuotation
} from "../utils/quotationService";
import { useSiteData } from "../context/SiteDataContext";

export default function AdminQuotationEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { products } = useSiteData();

const [search, setSearch] = useState("");


    const [quotation, setQuotation] = useState(null);

    const [customerName, setCustomerName] = useState("");

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");

    const [items, setItems] = useState([]);

    const [discount, setDiscount] = useState(0);

    const [validTill, setValidTill] = useState("");

    const [notes, setNotes] = useState("");


    useEffect(() => {

        loadQuotation();

    }, []);


    async function loadQuotation() {

        const data = await getQuotationById(id);


        if (!data) {

            alert("Quotation not found");

            navigate("/admin/quotation-history");

            return;

        }


        setQuotation(data);

        setCustomerName(data.customerName || "");

        setPhone(data.phone || "");

        setAddress(data.address || "");

        setItems(data.items || []);

        setDiscount(data.discount || 0);

        setValidTill(data.validTill || "");

        setNotes(data.notes || "");

    }


    function updateQuantity(itemId, qty) {

        if (qty < 1) return;


        setItems(prev =>

            prev.map(item =>

                item.id === itemId

                    ? {
                        ...item,
                        qty
                    }

                    : item

            )

        );

    }


    function removeItem(itemId) {

        setItems(prev =>

            prev.filter(
                item =>
                    item.id !== itemId
            )

        );

    }

    function addProduct(product) {


    const existing = items.find(
        item => item.id === product.id
    );


    if(existing){

        setItems(prev =>

            prev.map(item =>

                item.id === product.id

                ?
                {
                    ...item,
                    qty:item.qty + 1
                }

                :
                item

            )

        );


    }
    else {


        setItems(prev => [

            ...prev,

            {

                id:product.id,

                name:product.name,

                price:
                    product.discountPrice ||
                    product.price,

                qty:1

            }

        ]);

    }


    setSearch("");

}


    const subtotal = items.reduce(

        (sum,item)=>

            sum + item.price * item.qty,

        0

    );


    const finalTotal = Math.max(

        subtotal - Number(discount || 0),

        0

    );



    async function saveChanges() {


        try {


            await updateQuotation(

                id,

                {

                    customerName,

                    phone,

                    address,

                    items,

                    subtotal,

                    discount:Number(discount),

                    finalTotal,

                    validTill,

                    notes

                }

            );


            alert(
                "Quotation updated successfully."
            );


            navigate(
                "/admin/quotation-history"
            );


        }
        catch(err){

            console.error(err);

            alert(
                "Unable to update quotation."
            );

        }


    }

    const searchResults = useMemo(() => {

    if (!search.trim()) return [];

    return products
        .filter(product => {

            const availability =
                product.availability || "both";

            return (
                (availability === "offline" ||
                 availability === "both") &&
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        })
        .slice(0,8);

}, [search, products]);



    if(!quotation){

        return (

            <p className="p-10">

                Loading...

            </p>

        );

    }

    



    return (

<div>


<PageHeader

title="Edit Quotation"

subtitle={`Modify ${quotation.quotationNo}`}

/>



<div className="grid lg:grid-cols-2 gap-8">


{/* CUSTOMER DETAILS */}

<div className="bg-white rounded-xl2 shadow-card p-6 space-y-4">


<h2 className="text-xl font-semibold">

Customer Details

</h2>


<input

className="w-full border rounded-lg px-4 py-3"

placeholder="Customer Name"

value={customerName}

onChange={
e=>setCustomerName(e.target.value)
}

/>



<input

className="w-full border rounded-lg px-4 py-3"

placeholder="Phone"

value={phone}

onChange={
e=>setPhone(e.target.value)
}

/>



<textarea

className="w-full border rounded-lg px-4 py-3"

placeholder="Address"

value={address}

onChange={
e=>setAddress(e.target.value)
}

/>



<input

type="date"

className="w-full border rounded-lg px-4 py-3"

value={validTill}

onChange={
e=>setValidTill(e.target.value)
}

/>



<textarea

className="w-full border rounded-lg px-4 py-3"

placeholder="Notes"

value={notes}

onChange={
e=>setNotes(e.target.value)
}

/>


</div>



{/* ITEMS */}

<div className="bg-white rounded-xl2 shadow-card p-6">


<h2 className="text-xl font-semibold mb-5">

Products

</h2>

<input

className="w-full border rounded-lg px-4 py-3 mb-4"

placeholder="Search product to add..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>


<div className="border rounded-xl mb-5">

{
searchResults.map(product=>(


<button

key={product.id}

className="w-full flex justify-between p-3 hover:bg-sage-50 border-b"

onClick={()=>
addProduct(product)
}

>

<span>

{product.name}

</span>


<span>

₹{
product.discountPrice ||
product.price
}

</span>


</button>


))

}

</div>



<div className="space-y-4">


{
items.map(item=>(


<div

key={item.id}

className="border rounded-xl p-4"

>


<div className="font-semibold">

{item.name}

</div>


<div className="flex justify-between items-center mt-3">


<div className="flex items-center gap-3">


<button

className="btn-secondary"

onClick={()=>

updateQuantity(
item.id,
item.qty-1
)

}

>

-

</button>


<strong>

{item.qty}

</strong>


<button

className="btn-secondary"

onClick={()=>

updateQuantity(
item.id,
item.qty+1
)

}

>

+

</button>


</div>



<div>

₹{item.price * item.qty}

</div>


<button

className="text-red-600"

onClick={()=>
removeItem(item.id)
}

>

Remove

</button>


</div>


</div>


))

}


</div>



<hr className="my-6"/>



<div className="space-y-4">


<div className="flex justify-between">

<span>

Subtotal

</span>

<strong>

₹{subtotal}

</strong>

</div>



<div className="flex justify-between items-center">


<span>

Discount

</span>


<input

type="number"

className="border rounded px-3 py-2 w-28"

value={discount}

onChange={
e=>setDiscount(e.target.value)
}

/>


</div>



<div className="flex justify-between text-xl font-bold">


<span>

Total

</span>


<span>

₹{finalTotal}

</span>


</div>



</div>



<button

className="btn-primary w-full mt-8"

onClick={saveChanges}

>

💾 Save Changes

</button>



</div>



</div>



</div>

    );

}