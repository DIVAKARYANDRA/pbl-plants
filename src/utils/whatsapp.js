export function formatPrice(value) {
  if (value === null || value === undefined) return "";
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

export function buildWishlistMessage({ businessName, items, products }) {
  const lines = [];
  lines.push(`Hello ${businessName}! I'd like to enquire about the following items from my wishlist:`);
  lines.push("");

  let total = 0;
  items.forEach((item, idx) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;
    const unitPrice = product.discountPrice ?? product.price;
    const lineTotal = unitPrice * item.qty;
    total += lineTotal;
    lines.push(
      `${idx + 1}. ${product.name} — Qty: ${item.qty} — ${formatPrice(unitPrice)} each (${formatPrice(lineTotal)})`
    );
  });

  lines.push("");
  lines.push(`Estimated Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push("Could you please confirm availability, final pricing and delivery details? Thank you!");

  return lines.join("\n");
}

export function buildWhatsAppLink(phoneNumber, message) {
  const cleanNumber = String(phoneNumber || "").replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}
