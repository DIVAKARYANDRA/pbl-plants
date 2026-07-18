import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, Modal, PageHeader, EmptyState } from "./components/AdminUI";


const EMPTY = {
  id: "",
  title: "",
  type: "percentage",
  enabled: true,
  minimumCartValue: 3000,
  value: 10,
  message: "",
};


function generateId(){
  return `offer-${Date.now()}`;
}


export default function AdminOffers(){

  const {
    offers,
    addOffer,
    updateOffer,
    deleteOffer
  } = useSiteData();


  const [modalOpen,setModalOpen] = useState(false);
  const [editing,setEditing] = useState(null);
  const [form,setForm] = useState(EMPTY);



  const openAdd = () => {

    setEditing(null);

    setForm({
      ...EMPTY,
      id:generateId()
    });

    setModalOpen(true);

  };


  const openEdit = (offer)=>{

    setEditing(offer);

    setForm(offer);

    setModalOpen(true);

  };


  const set=(key)=>(e)=>{

    const value =
      e.target.type==="checkbox"
      ? e.target.checked
      : e.target.value;


    setForm(prev=>({
      ...prev,
      [key]:value
    }));

  };


  const handleSubmit=(e)=>{

    e.preventDefault();


    const payload={
      ...form,
      minimumCartValue:Number(form.minimumCartValue),
      value:Number(form.value)
    };


    if(editing){

      updateOffer(payload);

    }
    else{

      addOffer(payload);

    }


    setModalOpen(false);

  };



  const handleDelete=(offer)=>{

    if(confirm(`Delete ${offer.title}?`)){

      deleteOffer(offer.id);

    }

  };



return (

<div>


<PageHeader

title="Offers Management"

subtitle="Create and manage website discounts and promotions."

action={
<button
onClick={openAdd}
className="btn-primary text-sm"
>
+ Add Offer
</button>
}

/>



{
!offers || offers.length===0 ?

<EmptyState
title="No offers"
subtitle="Create your first promotion"
/>


:

<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

{
offers.map((offer)=>(

<div
key={offer.id}
className="bg-white rounded-xl2 shadow-card p-5"
>


<div className="flex justify-between">

<div>

<h3 className="font-semibold text-forest-800">
{offer.title}
</h3>


<p className="text-sm text-forest-700/60">
{offer.type}
</p>

</div>


<span className={`text-xs px-3 py-1 rounded-full ${
offer.enabled
?"bg-green-100 text-green-700"
:"bg-gray-100 text-gray-500"
}`}>

{
offer.enabled
?"Active"
:"Disabled"
}

</span>


</div>


<p className="text-sm mt-3">
Minimum:
₹{offer.minimumCartValue}
</p>


<p className="text-sm">
Value:
{offer.value}
</p>



<div className="flex gap-3 mt-4">

<button
onClick={()=>openEdit(offer)}
className="btn-secondary flex-1"
>
Edit
</button>


<button
onClick={()=>handleDelete(offer)}
className="text-red-500 border rounded-full flex-1"
>
Delete
</button>

</div>


</div>

))

}

</div>

}




{
modalOpen &&

<Modal
title={editing?"Edit Offer":"Add Offer"}
onClose={()=>setModalOpen(false)}
>


<form
onSubmit={handleSubmit}
className="flex flex-col gap-4"
>


<Field label="Offer Title">

<input
className={inputClass}
value={form.title}
onChange={set("title")}
/>

</Field>



<Field label="Offer Type">

<select
className={inputClass}
value={form.type}
onChange={set("type")}
>

<option value="percentage">
Percentage Discount
</option>

<option value="flat">
Flat Discount
</option>

<option value="free_delivery">
Free Delivery
</option>

<option value="festival">
Festival Offer
</option>


</select>

</Field>



<Field label="Minimum Cart Value">

<input
type="number"
className={inputClass}
value={form.minimumCartValue}
onChange={set("minimumCartValue")}
/>

</Field>



<Field label="Discount Value">

<input
type="number"
className={inputClass}
value={form.value}
onChange={set("value")}
/>

</Field>



<Field label="Message">

<textarea
className={inputClass}
rows="3"
value={form.message}
onChange={set("message")}
/>

</Field>



<label className="flex gap-3 items-center">

<input
type="checkbox"
checked={form.enabled}
onChange={set("enabled")}
/>

Enable Offer

</label>



<div className="flex gap-3">

<button
className="btn-primary flex-1"
>
Save
</button>


<button
type="button"
onClick={()=>setModalOpen(false)}
className="btn-secondary flex-1"
>
Cancel
</button>

</div>



</form>


</Modal>

}



</div>

);


}
