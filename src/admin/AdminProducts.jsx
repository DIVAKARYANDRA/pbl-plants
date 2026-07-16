import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { uploadImage } from "../utils/cloudinary";
import { Field, inputClass, Modal, PageHeader, EmptyState } from "./components/AdminUI";
import { Badge, PriceTag } from "../components/UI";

const EMPTY = {
  name: "",
  categoryId: "",
  price: "",
  discountPrice: "",
  images: ["", "", ""],
  shortDescription: "",
  description: "",
  plantType: "",
  size: "",
  sunlight: "",
  water: "",
  potDetails: "",
  indoorOutdoor: "Indoor",
  stock: "In Stock",
  featured: false,
};

const STOCK_OPTIONS = ["In Stock", "Limited Stock", "Out of Stock"];
const IO_OPTIONS = ["Indoor", "Outdoor", "Indoor/Outdoor", "—"];

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, categoryId: categories[0]?.id || "" });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...EMPTY, ...p, images: [...(p.images || []), "", "", ""].slice(0, 3) });
    setModalOpen(true);
  };

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const uploadProductImage = async (idx, file) => {
  if (!file) return;

  try {
    setUploading(true);

    const imageUrl = await uploadImage(file);

    setForm((f) => {
      const images = [...f.images];
      images[idx] = imageUrl;
      return { ...f, images };
    });

  } catch (error) {
    alert("Image upload failed");
    console.error(error);
  } finally {
    setUploading(false);
  }
};
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      images: form.images.filter(Boolean),
    };
    if (editing) updateProduct(editing.id, payload);
    else addProduct(payload);
    setModalOpen(false);
  };

  const handleDelete = (p) => {
    if (confirm(`Delete "${p.name}"? This cannot be undone.`)) deleteProduct(p.id);
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Product Management"
        subtitle="Add, edit and manage everything customers see in the catalog."
        action={
          <button onClick={openAdd} className="btn-primary text-sm">
            + Add Product
          </button>
        }
      />

      <div className="mb-5">
        <input
          className={inputClass + " max-w-sm"}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No products found" subtitle="Try a different search or add a new product." />
      ) : (
        <div className="bg-white rounded-xl2 shadow-card overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left text-forest-700/50 border-b border-forest-700/10">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="border-b border-forest-700/5 last:border-0 hover:bg-sage-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images?.[0]} alt={p.name} className="h-11 w-11 rounded-lg object-cover" />
                        <span className="font-medium text-forest-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-forest-700/70">{cat?.name || "—"}</td>
                    <td className="px-5 py-3">
                      <PriceTag price={p.price} discountPrice={p.discountPrice} />
                    </td>
                    <td className="px-5 py-3">
                      <Badge status={p.stock} />
                    </td>
                    <td className="px-5 py-3">{p.featured ? "★" : "—"}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="text-xs py-1.5 px-3 rounded-full border border-forest-700/15 text-forest-700 hover:bg-forest-700/5">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(p)} className="text-xs py-1.5 px-3 rounded-full border border-red-200 text-red-500 hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Edit Product" : "Add Product"} onClose={() => setModalOpen(false)} wide>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product Name">
                <input required className={inputClass} value={form.name} onChange={set("name")} />
              </Field>
              <Field label="Category">
                <select required className={inputClass} value={form.categoryId} onChange={set("categoryId")}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Price (Rs.)">
                <input required type="number" min="0" className={inputClass} value={form.price} onChange={set("price")} />
              </Field>
              <Field label="Discount Price (Rs.)" hint="Optional — leave blank for no discount">
                <input type="number" min="0" className={inputClass} value={form.discountPrice} onChange={set("discountPrice")} />
              </Field>
            </div>

            <Field label="Short Description" hint="Shown on product cards">
              <input required className={inputClass} value={form.shortDescription} onChange={set("shortDescription")} />
            </Field>
            <Field label="Full Description">
              <textarea required rows={3} className={inputClass} value={form.description} onChange={set("description")} />
            </Field>

            <div>
  <p className="text-sm font-medium text-forest-800 mb-2">
    Product Images
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

    {form.images.map((img, idx) => (
      <div key={idx} className="space-y-2">

        <input
          type="file"
          accept="image/*"
          className={inputClass}
          onChange={(e) =>
            uploadProductImage(idx, e.target.files[0])
          }
        />

        {img && (
          <img
            src={img}
            alt={`Preview ${idx + 1}`}
            className="h-32 w-full rounded-lg object-cover"
          />
        )}

      </div>
    ))}

  </div>

  {uploading && (
    <p className="text-sm text-forest-700 mt-2">
      Uploading image...
    </p>
  )}
</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Plant Type" hint="Use — for non-plant products">
                <input className={inputClass} value={form.plantType} onChange={set("plantType")} />
              </Field>
              <Field label="Size">
                <input className={inputClass} value={form.size} onChange={set("size")} />
              </Field>
              <Field label="Sunlight Requirement">
                <input className={inputClass} value={form.sunlight} onChange={set("sunlight")} />
              </Field>
              <Field label="Watering Requirement">
                <input className={inputClass} value={form.water} onChange={set("water")} />
              </Field>
              <Field label="Pot Details">
                <input className={inputClass} value={form.potDetails} onChange={set("potDetails")} />
              </Field>
              <Field label="Indoor / Outdoor">
                <select className={inputClass} value={form.indoorOutdoor} onChange={set("indoorOutdoor")}>
                  {IO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Stock Status">
                <select className={inputClass} value={form.stock} onChange={set("stock")}>
                  {STOCK_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <label className="flex items-center gap-2 mt-6">
                <input type="checkbox" checked={form.featured} onChange={set("featured")} className="h-4 w-4 accent-gold-500" />
                <span className="text-sm font-medium text-forest-800">Mark as Featured</span>
              </label>
            </div>

            <div className="flex gap-3 mt-1">
              <button type="submit" className="btn-primary flex-1">
                {editing ? "Save Changes" : "Add Product"}
              </button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
