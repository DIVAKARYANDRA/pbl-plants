import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, Modal, PageHeader, EmptyState } from "./components/AdminUI";
import { uploadImage } from "../utils/cloudinary";
import { useAuth } from "../context/AuthContext";

const EMPTY = { name: "", slug: "", image: "", description: "" };

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const { role } = useAuth();

const canEdit = role === "admin";

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };
  const openEdit = (cat) => {
    setEditing(cat);
    setForm(cat);
    setModalOpen(true);
  };

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value, ...(key === "name" && !editing ? { slug: slugify(value) } : {}) }));
  };

  const handleImageUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;


  try {

    setUploading(true);

    const url = await uploadImage(file);

    setForm((f) => ({
      ...f,
      image: url
    }));


  } catch(error) {

    console.error("Category image upload failed:", error);
    alert("Image upload failed");

  } finally {

    setUploading(false);

  }

};

  const handleSubmit = (e) => {

  e.preventDefault();

  if (!canEdit) return;

  const payload = {
    ...form,
    slug: form.slug || slugify(form.name)
  };

  if (editing) {
    updateCategory(editing.id, payload);
  } else {
    addCategory(payload);
  }

  setModalOpen(false);
};

  const handleDelete = (cat) => {
    const inUse = products.some((p) => p.categoryId === cat.id);
    if (inUse) {
      alert(`"${cat.name}" is used by existing products. Reassign or delete those products first.`);
      return;
    }
    if (confirm(`Delete category "${cat.name}"?`)) deleteCategory(cat.id);
  };

  return (
    <div>
      <PageHeader
        title="Category Management"
        subtitle="Categories power both the customer navigation and product filters."
        action={
  canEdit && (
    <button onClick={openAdd} className="btn-primary text-sm">
      + Add Category
    </button>
  )
}
      />

      {categories.length === 0 ? (
        <EmptyState title="No categories yet" subtitle="Add your first category to organize products." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl2 shadow-card overflow-hidden">
              <img src={cat.image} alt={cat.name} className="h-32 w-full object-cover" />
              <div className="p-4">
                <p className="font-semibold text-forest-800">{cat.name}</p>
                <p className="text-xs text-forest-700/45 mt-0.5">/{cat.slug}</p>
                <p className="text-sm text-forest-700/60 mt-2 line-clamp-2">{cat.description}</p>
                <p className="text-xs text-forest-700/45 mt-2">
                  {products.filter((p) => p.categoryId === cat.id).length} products
                </p>
                <div className="flex gap-2 mt-4">
                  {canEdit && (
  <>
                  <button onClick={() => openEdit(cat)} className="btn-secondary text-xs py-2 px-3 flex-1">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="text-xs py-2 px-3 flex-1 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-semibold"
                  >
                    Delete
                  </button>
    </>
)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Edit Category" : "Add Category"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Category Name">
              <input required className={inputClass} disabled={!canEdit} value={form.name} onChange={set("name")} />
            </Field>
            <Field label="Slug" hint="Used in the shop URL, auto-generated from the name">
              <input required className={inputClass} disabled={!canEdit} value={form.slug} onChange={set("slug")} />
            </Field>
            <Field label="Category Image">

                <input
                  type="file"
                  accept="image/*"
                  className={inputClass}
                  disabled={!canEdit}
                  onChange={handleImageUpload}
                />
              
                {form.image && (
                  <img
                    src={form.image}
                    alt="Category preview"
                    className="mt-3 h-32 w-full object-cover rounded-lg"
                  />
                )}
              
              </Field>
            <Field label="Description">
              <textarea rows={3} className={inputClass} disabled={!canEdit} value={form.description} onChange={set("description")} />
            </Field>
            <div className="flex gap-3 mt-2">
              {canEdit && (
              <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary flex-1 disabled:opacity-50"
              >
                  {editing ? "Save Changes" : "Add Category"}
              </button>
            )}
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
