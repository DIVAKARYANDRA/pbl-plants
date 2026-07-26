export function getStockStatus(product) {

  const quantity = Number(product.stockQuantity || 0);

  const lowStockAlert = Number(product.lowStockAlert || 0);

  if (quantity <= 0) {
    return "Out of Stock";
  }

  if (quantity <= lowStockAlert) {
    return "Limited Stock";
  }

  return "In Stock";
}
