# Laxmi Subedi - Portfolio Website (Angular 21)

A clean, honest, responsive personal-branding website. Two clearly-separated fields:

- 🩺 **Medicine** (blue accent) - medical student with a research interest
- 🎓 **Education Counseling** (teal accent) - helping students choose their path

The design is **slate-minimal**: one refined slate primary colour with lots of
whitespace, and the blue/teal accents used only to tag the two fields - calm and premium.

Built with **Angular 21** (standalone components, signals, zoneless change detection) on top
of **Bootstrap 5.3**. The look and layout are identical to the original static site — this is
the same design re-built as an Angular app. Features:

- 🌗 **Dark / light mode** (remembers the visitor's choice)
- 📱 **Mobile-first** responsive layout
- ✍️ **Insights** - each article opens on its **own route** (`/insights/<slug>`), with **pagination**
- 📨 **Email-only contact**, with the address **hidden from bots** and **inline form validation**
- 🔒 **No phone or social links** - just email, keeping your footprint small for now

---

## 🧱 Requirements

- **Node.js ≥ 20.19, ≥ 22.12, or ≥ 24** (Angular 21's supported range).
  If you use `nvm`: `nvm install 22 && nvm use 22`.
- Bootstrap, Bootstrap Icons and Angular are installed via **npm** (`npm install`).
  Google Fonts still load from a CDN (so the very first load needs internet).

---

## ▶️ Run it

```bash
npm install        # once
npm start          # dev server → http://localhost:4200
npm run build      # production build → dist/lax-portfolio-website/browser
```

---

## 🗂️ Project structure

```
lax-portfolio-website/
├── src/
│   ├── index.html                 → app shell (Google Fonts + <base href>)
│   ├── main.ts                    → bootstraps the app
│   ├── styles.css                 → ⭐ the original design system (colours, fonts, light/dark)
│   └── app/
│       ├── app.ts / app.config.ts / app.routes.ts
│       ├── layout.ts / layout.html         → app shell: navbar + <router-outlet> + footer
│       │                                     + back-to-top (rendered once for every route)
│       ├── core/                           → shared logic + data
│       │   ├── content.ts                  → ⭐ your email, articles, testimonials (+ types)
│       │   ├── theme.service.ts            → dark/light, persisted
│       │   ├── contact.service.ts          → builds the (bot-hidden) email + mailto links
│       │   └── reveal.directive.ts         → fade-up reveal-on-scroll
│       ├── components/                      → reusable pieces
│       │   ├── navbar · footer · back-to-top     (used on every page)
│       │   └── insights · testimonials · contact-form   (the dynamic sections)
│       └── pages/
│           ├── home.ts / home.html         → the page (hero/about/medicine/counseling
│           │                                  are inline; dynamic sections are components)
│           ├── article.ts / article.html   → renders one article (route /insights/:slug)
│           └── not-found.ts / .html        → 404 page (unknown URL or unknown article slug)
├── public/img/profile.png           → photo + favicon (served at /img/profile.png)
├── legacy/                        → the original static HTML/CSS/JS, kept for reference
└── angular.json / package.json / tsconfig*.json
```

> The CSS in `src/styles.css` is the original file, unchanged — that's what keeps the design
> pixel-identical to the static version.

**Routing & layout.** `Layout` is the shell that renders the navbar, footer and back-to-top
once around a `<router-outlet>` — the same chrome on every page. The navbar/footer in-page links
use `routerLink="/"` + `fragment`, so from an article or the 404 page they navigate home and
scroll to the right section. A `canMatch` guard checks the article slug, so an unknown slug
(or any unknown URL) falls through to the **404 page** with the URL preserved.

---

## ✏️ Make it yours - the essentials

**1. Your email** - open `src/app/core/content.ts` and edit the two parts:
```ts
profile: {
  name: 'Laxmi Subedi',
  emailUser: 'contact.laxmisubedi',  // 👈 before the @
  emailDomain: 'laxmisubedi.com.np' // 👈 after the @
}
```
This is the single place the email is set. It powers the contact form, the "Email me"
links, and the article pages. The address is assembled at runtime, so it **never appears as
plain text** in the page source - spam bots can't easily harvest it.

**2. Your photo** - replace `public/img/profile.png` with your own (same filename), or change
the `src="img/profile.png"` references in the components.

**3. Your name / intro text** - the hero, about, medicine and counseling copy lives in
`src/app/pages/home.html`; the insights/testimonials/contact sections are in `src/app/components/`.

---

## 📨 How the contact form works
1. The visitor fills it in. If anything is missing or the email looks wrong, a **red message
   appears right under that field** (inline validation) - no page reload.
2. When it's valid and they press **Send via email**, their email app opens with the name,
   email, topic, and message **pre-filled and addressed to you**.
3. They press send; it lands in your inbox; you reply normally over email.

No third-party service, no signup, nothing storing visitor data.

---

## ✍️ Articles (Insights) - add your own

Articles live in `src/app/core/content.ts` under `articles`. Each one automatically gets a
card on the home page **and** its own route at `/insights/<slug>`.

Copy a block and edit it:
```ts
{
  slug: 'my-new-article',          // unique, lowercase-with-dashes (becomes the URL)
  tag: 'Study tips',
  cover: 'teal',                   // 'teal' or 'blue'
  icon: 'bi-compass',              // any icon from https://icons.getbootstrap.com
  title: 'My article title',
  excerpt: 'One line shown on the card.',
  readMins: 4,
  body: [
    'First paragraph…',
    'Second paragraph…',
  ],
},
```
- **Read more** routes to that article's page.
- **Pagination** appears automatically once you have more than `ARTICLES_PER_PAGE` articles
  (default **6** - change it at the top of `src/app/components/insights.ts`).

---

## 🗣️ Testimonials - only real ones
`testimonials` in `core/content.ts` is **empty on purpose**, so the "What students say" section
stays hidden. When a real student gives genuine feedback (with permission), add a block and the
section appears on its own:
```ts
{ quote: 'Their real words.', name: 'Name or initials', role: 'Undergraduate applicant' },
```

---

## 🌗 Dark mode & colours
The moon/sun button switches themes and remembers the choice. To adjust the palette, edit the
top of `src/styles.css`:
```css
:root {
  --brand:   #334155;   /* slate - buttons, links, primary UI */
  --medical: #2563eb;   /* Medicine accent (blue) */
  --counsel: #0d9488;   /* Counseling accent (teal) */
}
```
Dark-mode versions are in the `[data-bs-theme="dark"]` block just below.

---

## 🚀 Put it online for free
This is a client-side Angular SPA; build first (`npm run build`), then deploy
`dist/lax-portfolio-website/browser`:
- **Netlify / Vercel / Cloudflare Pages** - build command `npm run build`, publish the
  `browser` folder above. Add an SPA fallback (rewrite all routes → `index.html`) so deep
  links like `/insights/...` work.
- **GitHub Pages** - serve the `browser` folder; set `<base href>` to your repo subpath if needed.

---

## Sections (home page)
Hero · About (the two fields) · Medicine & Research · Counseling (how I help) ·
Insights (article routes + pagination) · Testimonials (hidden until real) · Contact (email only).
