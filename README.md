# PBL Plants — Premium Plant Catalog Platform

A production-quality, fully responsive **digital catalog** for PBL Plants — a premium plant nursery.
There is **no payment gateway, checkout, or online ordering**. Customers browse the catalog, build a
wishlist, and send it straight to WhatsApp so the business owner can confirm the order personally.

The codebase is built as a **reusable catalog platform**: all business content (branding, products,
categories, founder story, gallery, testimonials, FAQs) lives in a single data layer that the Admin
Dashboard edits — no code changes needed to rebrand this for a ceramics store, furniture business, or
any other catalog-style shop.

---

## 1. Architecture

**Type:** Single Page Application (SPA), client-side only, no backend server required.

- **React 19 + Vite** — component-based UI, instant dev server, optimized production build.
- **React Router 7** — client-side routing for both the customer site and the admin dashboard.
- **Tailwind CSS 3** — utility-first styling with a custom design system (colors, type, motion) defined
  in `tailwind.config.js`.
- **React Context + localStorage** — acts as the "database." All catalog content is stored under a single
  `localStorage` key and edited through the Admin Dashboard. This keeps the project deployable as a static
  site (Vercel, Netlify, GitHub Pages, shared hosting) with zero backend infrastructure, while still giving
  the business owner a real content-management experience.
  - Swap `SiteDataContext.jsx` for real API calls later (e.g. Firebase, Supabase, a Node/Express API) without
    touching any page or component — every page reads through the `useSiteData()` hook only.
- **Wishlist persistence:** stored in `sessionStorage` (per the brief: "persist during the session").
- **Admin auth:** a simple username/password check against credentials stored in the same data layer,
  session-based. This is a **demo-grade** auth suitable for a single shop owner logging in from their own
  device — for a public multi-admin deployment, swap `AuthContext.jsx` for real authentication (e.g. Firebase
  Auth, Supabase Auth, or a backend session).
- **WhatsApp integration:** builds a `wa.me` deep link with a pre-formatted message listing every wishlist
  item, quantity, and price — no WhatsApp Business API needed.

### Why this architecture is reusable across businesses
Every piece of business-specific content — logo, tagline, hero copy, categories, products, founder,
testimonials, FAQs, gallery — is data, not code. Renaming "PBL Plants" to another business, changing the
category list from "Indoor Plants / Outdoor Plants" to "Sofas / Chairs / Tables" for a furniture business,
or swapping the color palette in `tailwind.config.js`, requires **no changes to any page or component logic**.

---

## 2. Folder Structure

```
pbl-plants/
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # App entry point
    ├── App.jsx                  # Router + provider setup (all routes live here)
    ├── index.css                # Tailwind + global styles/utilities
    │
    ├── data/
    │   └── seedData.js          # Default/demo content — the initial "database"
    │
    ├── context/
    │   ├── SiteDataContext.jsx  # The "database": settings, products, categories,
    │   │                        # founder, testimonials, FAQs, gallery + CRUD actions
    │   ├── WishlistContext.jsx  # Wishlist state (session-persisted)
    │   └── AuthContext.jsx      # Admin login/logout state
    │
    ├── utils/
    │   ├── storage.js           # localStorage / sessionStorage helpers
    │   ├── whatsapp.js          # Wishlist → WhatsApp message + link builder
    │   └── image.js             # Placeholder image helper
    │
    ├── components/              # Shared customer-facing UI
    │   ├── CustomerLayout.jsx   # Navbar + Footer + Wishlist drawer wrapper
    │   ├── Navbar.jsx, Footer.jsx, PageHero.jsx
    │   ├── ProductCard.jsx, CategoryCard.jsx, TestimonialCard.jsx, FAQItem.jsx
    │   ├── WishlistDrawer.jsx, WhatsAppFloatButton.jsx
    │   ├── FloatingLeaves.jsx, Reveal.jsx  # animation helpers
    │   ├── ContactSection.jsx
    │   └── UI.jsx                # SectionHeading, StarRating, Badge, PriceTag
    │
    ├── pages/                   # Customer-facing routes
    │   ├── Home.jsx, Categories.jsx, Products.jsx, ProductDetails.jsx
    │   ├── About.jsx, Gallery.jsx, Contact.jsx, NotFound.jsx
    │
    └── admin/                   # Admin dashboard (separate experience)
        ├── AdminLogin.jsx, AdminLayout.jsx, ProtectedRoute.jsx
        ├── AdminDashboard.jsx, AdminSettings.jsx
        ├── AdminProducts.jsx, AdminCategories.jsx
        ├── AdminFounder.jsx, AdminGallery.jsx
        ├── AdminTestimonials.jsx, AdminFAQ.jsx
        └── components/AdminUI.jsx   # Shared admin form/modal primitives
```

---

## 3. Technology Choices

| Concern              | Choice                        | Why |
|-----------------------|--------------------------------|-----|
| UI framework          | React 19 (Vite)                | Fast dev/build, huge ecosystem, easy to extend later |
| Routing                | React Router 7                 | Standard client-side routing, nested layouts for customer vs admin |
| Styling                | Tailwind CSS 3                 | Rapid, consistent, themeable design system without a CSS framework fight |
| State / "database"     | React Context + localStorage   | Zero backend needed for a single-shop catalog; trivially swappable for a real API |
| Fonts                  | Fraunces (display) + Manrope (body) | Warm, boutique serif paired with a clean modern sans — avoids a generic template look |
| Animations             | Tailwind keyframes + IntersectionObserver-based scroll reveal | Lightweight, no animation library dependency |

---

## 4. How to Run the Project

```bash
# 1. Install dependencies
npm install

# 2. Start the local dev server
npm run dev
# → open http://localhost:5173

# 3. Build for production
npm run build
# → outputs to /dist, deployable to any static host

# 4. Preview the production build locally
npm run preview
```

### Admin Dashboard Access
- URL: `/admin/login`
- Demo credentials:
  - **Username:** `admin`
  - **Password:** `pblplants123`

Change these at any time by editing `defaultAdminCredentials` in `src/data/seedData.js` (or wire up a
"change password" screen in the admin — the data layer already supports it).

### Resetting demo data
All content is stored in the browser's `localStorage` under the key `pbl-plants:database:v1`. To reset to
the original demo content, clear that key (DevTools → Application → Local Storage) or call
`resetToDefaults()` from `useSiteData()` inside the app.

---

## 5. Feature Checklist

**Customer Website**
- Home (hero, intro, categories, featured products, why-choose-us, founder, gallery preview, testimonials, FAQ, contact)
- Categories page (dynamic, driven by admin data)
- Product listing (search, category filter, sorting)
- Product details (multiple images, full specs, wishlist button, related products)
- Wishlist (add/remove/update qty, persists per session, "Send to WhatsApp")
- About (story, founder, vision, mission)
- Gallery (filterable, lightbox)
- Contact (phone, WhatsApp, email, address, map placeholder, socials)

**Admin Dashboard**
- Login (username/password)
- Dashboard (stats: products, categories, wishlist inquiries, featured, gallery, testimonials, FAQs)
- Website Settings (logo, favicon, name, tagline, hero, WhatsApp number, contact, socials)
- Product Management (full CRUD, images, pricing, care details, featured/availability flags)
- Category Management (full CRUD)
- Founder Section Management
- Gallery Management (upload/remove)
- Testimonials Management (full CRUD)
- FAQ Management (full CRUD)

All buttons, forms, filters, and the WhatsApp handoff are fully functional — this is a working
application, not a static mockup.
