import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, PageHeader } from "./components/AdminUI";

export default function AdminFounder() {
  const { founder, updateFounder } = useSiteData();
  const [form, setForm] = useState(founder);
  const [saved, setSaved] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFounder(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div>
      <PageHeader
        title="Founder Section"
        subtitle="Shown on the Home and About pages."
        action={
          <button form="founder-form" type="submit" className="btn-primary text-sm">
            Save Changes
          </button>
        }
      />

      {saved && (
        <div className="mb-6 bg-forest-100 text-forest-700 px-4 py-3 rounded-lg text-sm font-medium">
          Founder section saved.
        </div>
      )}

      <form id="founder-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        <div className="flex flex-col items-center gap-3">
          <img src={form.image} alt="Founder preview" className="w-full aspect-[4/5] object-cover rounded-xl2 shadow-card" />
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-6 flex flex-col gap-4">
          <Field label="Founder Image URL">
            <input className={inputClass} value={form.image} onChange={set("image")} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Founder Name">
              <input className={inputClass} value={form.name} onChange={set("name")} />
            </Field>
            <Field label="Title">
              <input className={inputClass} value={form.title} onChange={set("title")} />
            </Field>
          </div>
          <Field label="Founder Message" hint="Shown as a quote on the site">
            <textarea rows={4} className={inputClass} value={form.message} onChange={set("message")} />
          </Field>
          <Field label="Vision Statement">
            <textarea rows={2} className={inputClass} value={form.vision} onChange={set("vision")} />
          </Field>
          <Field label="Mission Statement">
            <textarea rows={2} className={inputClass} value={form.mission} onChange={set("mission")} />
          </Field>
        </div>
      </form>
    </div>
  );
}
