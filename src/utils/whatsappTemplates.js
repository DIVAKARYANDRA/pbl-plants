export function buildWhatsAppMessage(enquiry, paymentSettings = {}) {
  
  const items = enquiry.items
    .map(
      (i) =>
        `• ${i.productName} × ${i.qty}`
    )
    .join("\n");

  switch (enquiry.status) {

    case "New":

      return `Hi ${enquiry.customerName},

Thank you for choosing PBL Plants 🌿

We have received your enquiry.

Your selected plants:

${items}

Estimated Total: ₹${enquiry.finalTotal}

Kindly reply with:

📍 Delivery Address

💳 Preferred Payment Method

We'll prepare your quotation immediately.

Thank you.`;



    case "Customer Responded":

      return `Hi ${enquiry.customerName},

Thank you for providing your delivery details.

We are preparing your quotation and will share the payment details shortly.

Regards,
PBL Plants 🌿`;



    case "Payment Pending":

return `Hi ${enquiry.customerName},

Your quotation is ready.

🌿 Plants Selected

${items}

--------------------------------

Estimated Total

₹${enquiry.finalTotal}

--------------------------------

Kindly complete your payment using any one of the below methods.

💳 UPI ID
${paymentSettings.upiId || "-"}

🏦 Bank
${paymentSettings.bankName || "-"}

👤 Account Holder
${paymentSettings.accountHolder || "-"}

🔢 Account Number
${paymentSettings.accountNumber || "-"}

🏛 IFSC
${paymentSettings.ifsc || "-"}

After payment, kindly send the payment screenshot here.

Thank you.

PBL Plants 🌿`;



    case "Payment Received":

      return `Hi ${enquiry.customerName},

We have successfully received your payment.

Thank you.

Your order is now being processed.

🌿 PBL Plants`;



    case "Order Confirmed":

      return `Hi ${enquiry.customerName},

Great news!

Your order has been confirmed.

Items:

${items}

Total Paid : ₹${enquiry.finalTotal}

We'll notify you once the order is dispatched.

Thank you 🌿`;



    case "Out for Delivery":

      return `Hi ${enquiry.customerName},

Your order is out for delivery 🚚

It should reach you shortly.

Thank you for shopping with PBL Plants 🌿`;



    case "Delivered":

      return `Hi ${enquiry.customerName},

Your order has been delivered successfully.

Thank you for choosing PBL Plants 🌿

We'd love to hear your feedback.

Have a wonderful day!`;



    default:

      return enquiry.whatsappMessage || "";

  }

}
