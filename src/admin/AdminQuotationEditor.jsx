import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "./components/AdminUI";
import { getQuotationById } from "../utils/quotationService";

export default function AdminQuotationEditor() {

    const { id } = useParams();

    const [quotation, setQuotation] = useState(null);

    useEffect(() => {

        async function load() {

            const data = await getQuotationById(id);

            setQuotation(data);

        }

        load();

    }, [id]);

    if (!quotation) {

        return <p className="p-10">Loading...</p>;

    }

    return (

        <div>

            <PageHeader
                title={quotation.quotationNo}
                subtitle="Quotation Details"
            />

            <pre className="bg-white rounded-xl2 p-6 shadow-card overflow-auto">

                {JSON.stringify(quotation, null, 2)}

            </pre>

        </div>

    );

}