export function canEditAll(role) {
  return role === "admin";
}


export function canEditProducts(role) {
  return (
    role === "admin" ||
    role === "product_manager"
  );
}
