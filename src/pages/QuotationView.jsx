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

#{quotation.quotationNo}

</p>

</div>

</div>

{/* BODY */}

<div className="p-10 space-y-10">

{/* BASIC DETAILS */}

<div className="grid md:grid-cols-2 gap-8">

<div className="bg-sage-50 rounded-xl p-6">

<h3 className="font-semibold text-lg mb-4">

Customer Details

</h3>

<p>

<b>Name:</b>

{" "}

{quotation.customerName}

</p>

<p>

<b>Phone:</b>

{" "}

{quotation.phone}

</p>

<p>

<b>Address:</b>

{" "}

{quotation.address || "-"}

</p>

</div>

<div className="bg-sage-50 rounded-xl p-6">

<h3 className="font-semibold text-lg mb-4">

Quotation Details

</h3>

<p>

<b>Date:</b>

{" "}

{

quotation.createdAt?.seconds

?

new Date(

quotation.createdAt.seconds*1000

).toLocaleDateString("en-IN")

:

"-"

}

</p>

<p>

<b>Valid Till:</b>

{" "}

{quotation.validTill}

</p>

<p>

<b>Status:</b>

<span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">

{quotation.status}

</span>

</p>

</div>

</div>

    );

}