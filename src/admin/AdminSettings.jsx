import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Field, inputClass, PageHeader } from "./components/AdminUI";
import ImageUploader from "./components/ImageUploader";

export default function AdminSettings() {
  const { settings, updateSettings } = useSiteData();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setSocial = (key) => (e) =>
    setForm((f) => ({ ...f, socials: { ...f.socials, [key]: e.target.value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div>
      <PageHeader
        title="Website Settings"
        subtitle="Update branding and contact details shown across the customer website."
        action={
          <button form="settings-form" type="submit" className="btn-primary text-sm">
            Save Changes
          </button>
        }
      />

      {saved && (
        <div className="mb-6 bg-forest-100 text-forest-700 px-4 py-3 rounded-lg text-sm font-medium">
          Settings saved successfully.
        </div>
      )}

      <form id="settings-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
        <section className="bg-white rounded-xl2 shadow-card p-6">
          <h2 className="font-display text-lg text-forest-800 mb-4">Branding</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company Name">
              <input className={inputClass} value={form.businessName} onChange={set("businessName")} />
            </Field>
            <Field label="Logo Text">
              <input className={inputClass} value={form.logoText} onChange={set("logoText")} />
            </Field>
            <Field label="Tagline">
              <input className={inputClass} value={form.tagline} onChange={set("tagline")} />
            </Field>
            <Field label="Favicon URL">
              <input className={inputClass} value={form.favicon} onChange={set("favicon")} />
            </Field>
          </div>
        </section>

        <section className="bg-white rounded-xl2 shadow-card p-6">
          <h2 className="font-display text-lg text-forest-800 mb-4">Homepage Hero</h2>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Hero Title">
              <input className={inputClass} value={form.heroTitle} onChange={set("heroTitle")} />
            </Field>
            <Field label="Hero Description">
              <textarea rows={3} className={inputClass} value={form.heroSubtitle} onChange={set("heroSubtitle")} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Hero Banner Image">

                <ImageUploader
                  value={form.heroImage}
                  onChange={(url) =>
                    setForm((f) => ({
                      ...f,
                      heroImage: url,
                    }))
                  }
                />
              
              </Field>
              <Field label="Secondary Banner Image">

                <ImageUploader
                  value={form.bannerImage}
                  onChange={(url) =>
                    setForm((f) => ({
                      ...f,
                      bannerImage: url,
                    }))
                  }
                />
              
              </Field>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl2 shadow-card p-6">
          <h2 className="font-display text-lg text-forest-800 mb-4">Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="WhatsApp Number" hint="Include country code, digits only, e.g. 919876543210">
              <input className={inputClass} value={form.whatsappNumber} onChange={set("whatsappNumber")} />
            </Field>
            <Field label="Phone Number">
              <input className={inputClass} value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label="Email">
              <input className={inputClass} value={form.email} onChange={set("email")} />
            </Field>
            <Field label="Address">
              <input className={inputClass} value={form.address} onChange={set("address")} />
            </Field>
            <Field label="Map Note" hint="Shown until a real map embed is added">
              <input className={inputClass} value={form.mapNote} onChange={set("mapNote")} />
            </Field>
          </div>
        </section>

        <section className="bg-white rounded-xl2 shadow-card p-6">
          <h2 className="font-display text-lg text-forest-800 mb-4">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Instagram URL">
              <input className={inputClass} value={form.socials.instagram} onChange={setSocial("instagram")} />
            </Field>
            <Field label="Facebook URL">
              <input className={inputClass} value={form.socials.facebook} onChange={setSocial("facebook")} />
            </Field>
            <Field label="Pinterest URL">
              <input className={inputClass} value={form.socials.pinterest} onChange={setSocial("pinterest")} />
            </Field>
          </div>
        </section>

        <div className="sm:hidden">
          <button type="submit" className="btn-primary w-full">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
