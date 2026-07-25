import { useState, useEffect } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { PageHeader, Field, inputClass } from "./components/AdminUI";
import ImageUploader from "./components/ImageUploader";

export default function AdminPaymentSettings() {

  const { settings, updateSettings } = useSiteData();

  const [payment, setPayment] = useState({
    upiId: "",
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    gpayNumber: "",
    phonePeNumber: "",
    qrCode: ""
  });

  useEffect(() => {

    if(settings?.paymentSettings){

      setPayment(settings.paymentSettings);

    }

  },[settings]);



  const updateField=(name,value)=>{

    setPayment(prev=>({

      ...prev,

      [name]:value

    }));

  };



  const save=()=>{

    updateSettings({

      paymentSettings:payment

    });

    alert("Payment settings saved.");

  };



  return(

    <div>

      <PageHeader

        title="Payment Settings"

        subtitle="Configure payment methods shown to customers."

      />



      <div className="grid gap-5 max-w-3xl">

        <Field label="UPI ID">

          <input

            className={inputClass}

            value={payment.upiId}

            onChange={e=>updateField("upiId",e.target.value)}

          />

        </Field>



        <Field label="Account Holder">

          <input

            className={inputClass}

            value={payment.accountHolder}

            onChange={e=>updateField("accountHolder",e.target.value)}

          />

        </Field>



        <Field label="Bank Name">

          <input

            className={inputClass}

            value={payment.bankName}

            onChange={e=>updateField("bankName",e.target.value)}

          />

        </Field>



        <Field label="Account Number">

          <input

            className={inputClass}

            value={payment.accountNumber}

            onChange={e=>updateField("accountNumber",e.target.value)}

          />

        </Field>



        <Field label="IFSC">

          <input

            className={inputClass}

            value={payment.ifsc}

            onChange={e=>updateField("ifsc",e.target.value)}

          />

        </Field>



        <Field label="Google Pay Number">

          <input

            className={inputClass}

            value={payment.gpayNumber}

            onChange={e=>updateField("gpayNumber",e.target.value)}

          />

        </Field>



        <Field label="PhonePe Number">

          <input

            className={inputClass}

            value={payment.phonePeNumber}

            onChange={e=>updateField("phonePeNumber",e.target.value)}

          />

        </Field>



        <ImageUploader

          label="Payment QR Code"

          value={payment.qrCode}

          onChange={(url)=>updateField("qrCode",url)}

        />



        <button

          onClick={save}

          className="btn-primary"

        >

          Save Payment Settings

        </button>

      </div>

    </div>

  );

}
