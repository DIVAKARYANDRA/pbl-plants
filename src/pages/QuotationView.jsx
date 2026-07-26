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

        <div className="max-w-5xl mx-auto py-16">

            <h1 className="text-4xl font-display">

                {quotation.quotationNo}

            </h1>

            <pre className="bg-white rounded-xl2 shadow-card p-6 mt-8 overflow-auto">

                {JSON.stringify(
                    quotation,
                    null,
                    2
                )}

            </pre>

        </div>

    );

}