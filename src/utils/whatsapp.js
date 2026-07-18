export function formatPrice(value) {
  if (value === null || value === undefined) return "";
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

export function buildWishlistMessage({
  businessName,
  items,
  products,
  subtotal,
  discount,
  finalTotal,
  discountOffer,
  deliveryOffer
}) {

  const lines = [];

  lines.push(
    `Hello ${businessName}! I'd like to enquire about the following items from my wishlist:`
  );

  lines.push("");


  items.forEach((item, idx) => {

    const product = products.find(
      (p) => p.id === item.productId
    );


    if (!product) return;


    const unitPrice =
      product.discountPrice ?? product.price;


    const lineTotal =
      unitPrice * item.qty;


    lines.push(
      `${idx + 1}. ${product.name} — Qty: ${item.qty} — ${formatPrice(unitPrice)} each (${formatPrice(lineTotal)})`
    );

  });


  lines.push("");
  lines.push("----------------------");
  lines.push("");


  // Subtotal

  lines.push(
    `Subtotal: ${formatPrice(subtotal)}`
  );


  // Discount offer

  if(discountOffer && discount > 0){

    lines.push("");

    lines.push(
      `Offer Applied: ${discountOffer.title}`
    );


    lines.push(
      `Discount: -${formatPrice(discount)}`
    );

  }


  // Free Delivery

  if(deliveryOffer){

    lines.push("");

    lines.push(
      "Delivery: FREE 🚚"
    );

  }


  lines.push("");

  lines.push(
    `Final Amount: ${formatPrice(finalTotal)}`
  );


  lines.push("");

  lines.push(
    "Could you please confirm availability, final pricing and delivery details? Thank you!"
  );


  return lines.join("\n");

}

export function buildWhatsAppLink(phoneNumber, message) {
  const cleanNumber = String(phoneNumber || "").replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}
