import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, Modal, PageHeader, EmptyState } from "./components/AdminUI";
import ImageUploader from "./components/ImageUploader";

const EMPTY = { image: "", caption: "", category: "Store" };

export default function AdminGallery() {
  const { gallery, addGalleryImage, deleteGalleryImage } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.image) {
    alert("Please upload an image");
    return;
  }

  addGalleryImage(form);

  setForm(EMPTY);
  setModalOpen(false);
};

  const handleDelete = (item) => {
    if (confirm("Remove this image from the gallery?")) deleteGalleryImage(item.id);
  };

  return (
    <div>
      <PageHeader
        title="Gallery Management"
        subtitle="Upload plant, store and customer photos for the public Gallery page."
        action={
          <button onClick={() => setModalOpen(true)} className="btn-primary text-sm">
            + Upload Image
          </button>
        }
      />

      {gallery.length === 0 ? (
        <EmptyState title="No images yet" subtitle="Upload your first gallery image." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((g) => (
            <div key={g.id} className="bg-white rounded-xl2 shadow-card overflow-hidden group relative">
              <img src={g.image} alt={g.caption} className="h-36 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium text-forest-800 truncate">{g.caption}</p>
                <p className="text-xs text-forest-700/45">{g.category}</p>
              </div>
              <button
                onClick={() => handleDelete(g)}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-forest-900/70 text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title="Upload Gallery Image" onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Gallery Image">

              <ImageUploader
                value={form.image}
                onChange={(url) =>
                  setForm((f) => ({
                    ...f,
                    image: url
                  }))
                }
              />
            
            </Field>
            <Field label="Caption">
              <input required className={inputClass} value={form.caption} onChange={set("caption")} />
            </Field>
            <Field label="Category">
              <select className={inputClass} value={form.category} onChange={set("category")}>
                <option>Store</option>
                <option>Plants</option>
                <option>Customers</option>
              </select>
            </Field>
            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn-primary flex-1">Add Image</button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
