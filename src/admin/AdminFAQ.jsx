import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, Modal, PageHeader, EmptyState } from "./components/AdminUI";
import { useAuth } from "../context/AuthContext";

const EMPTY = { question: "", answer: "" };

export default function AdminFAQ() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const { role } = useAuth();

const canEdit = role === "admin";

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };
  const openEdit = (f) => {
    setEditing(f);
    setForm(f);
    setModalOpen(true);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    if(!canEdit){
   return;
 }
    e.preventDefault();
    if (editing) updateFaq(editing.id, form);
    else addFaq(form);
    setModalOpen(false);
  };

  const handleDelete = (item) => {
    if (confirm("Delete this FAQ?")) deleteFaq(item.id);
  };

  return (
    <div>
      <PageHeader
        title="FAQ Management"
        subtitle="Answer the questions customers ask most, shown on the homepage."
        {
  canEdit && (
    <button onClick={openAdd} className="btn-primary text-sm">
      + Add Category
    </button>
  )
}
      />

      {faqs.length === 0 ? (
        <EmptyState title="No FAQs yet" subtitle="Add your first frequently asked question." />
      ) : (
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <div key={f.id} className="bg-white rounded-xl2 shadow-card p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-forest-800">{f.question}</p>
                <p className="text-sm text-forest-700/60 mt-1.5 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(f)} className="text-xs py-1.5 px-3 rounded-full border border-forest-700/15 text-forest-700 hover:bg-forest-700/5">
                  Edit
                </button>
                <button onClick={() => handleDelete(f)} className="text-xs py-1.5 px-3 rounded-full border border-red-200 text-red-500 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Edit FAQ" : "Add FAQ"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Question">
              <input required className={inputClass} disabled={!canEdit} value={form.question} onChange={set("question")} />
            </Field>
            <Field label="Answer">
              <textarea required rows={4} className={inputClass} disabled={!canEdit} value={form.answer} onChange={set("answer")} />
            </Field>
            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn-primary flex-1">{editing ? "Save Changes" : "Add FAQ"}</button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
