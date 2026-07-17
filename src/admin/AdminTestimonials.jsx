import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, Modal, PageHeader, EmptyState } from "./components/AdminUI";
import { StarRating } from "../components/UI";
import ImageUploader from "./components/ImageUploader";

const EMPTY = { name: "", location: "", rating: 5, text: "", image: "" };

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };
  const openEdit = (t) => {
    setEditing(t);
    setForm(t);
    setModalOpen(true);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, rating: Number(form.rating) };
    if (payload.rating < 1 || payload.rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }
    if (editing) updateTestimonial(editing.id, payload);
    else addTestimonial(payload);
    setModalOpen(false);
  };

  const handleDelete = (t) => {
    if (confirm(`Delete testimonial from "${t.name}"?`)) deleteTestimonial(t.id);
  };

  return (
    <div>
      <PageHeader
        title="Testimonials Management"
        subtitle="Customer stories shown on the homepage."
        action={
          <button onClick={openAdd} className="btn-primary text-sm">
            + Add Testimonial
          </button>
        }
      />

      {testimonials.length === 0 ? (
        <EmptyState title="No testimonials yet" subtitle="Add your first customer story." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl2 shadow-card p-5 flex flex-col gap-3">
              <StarRating rating={t.rating} />
              <p className="text-sm text-forest-700/70 italic line-clamp-3">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <img src={t.image} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-forest-800">{t.name}</p>
                  <p className="text-xs text-forest-700/45">{t.location}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEdit(t)} className="btn-secondary text-xs py-2 px-3 flex-1">Edit</button>
                <button onClick={() => handleDelete(t)} className="text-xs py-2 px-3 flex-1 rounded-full border border-red-200 text-red-500 hover:bg-red-50 font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Customer Name">
                <input required className={inputClass} value={form.name} onChange={set("name")} />
              </Field>
              <Field label="Location">
                <input className={inputClass} value={form.location} onChange={set("location")} />
              </Field>
            </div>
            <Field label="Rating (1–5)">
              <input type="number" min="1" max="5" className={inputClass} value={form.rating} onChange={set("rating")} />
            </Field>
            <Field label="Testimonial Text">
              <textarea required rows={3} className={inputClass} value={form.text} onChange={set("text")} />
            </Field>
            <Field label="Customer Photo">
              <ImageUploader
                value={form.image}
                onChange={(url) =>
                  setForm((f) => ({
                    ...f,
                    image: url,
                  }))
                }
              />
            </Field>
            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn-primary flex-1">{editing ? "Save Changes" : "Add Testimonial"}</button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
