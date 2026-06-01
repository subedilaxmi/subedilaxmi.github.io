# Laxmi Subedi - Portfolio Website

A clean, honest, responsive personal-branding website. Two clearly-separated fields:

- 🩺 **Medicine** (blue accent) - medical student with a research interest
- 🎓 **Education Counseling** (teal accent) - helping students choose their path

The design is **slate-minimal**: one refined slate primary colour with lots of
whitespace, and the blue/teal accents used only to tag the two fields - calm and premium.

Built with **Bootstrap 5.3** + a small custom layer. Features:

- 🌗 **Dark / light mode** (remembers the visitor's choice)
- 📱 **Mobile-first** responsive layout
- ✍️ **Insights** - each article opens on its **own page** (`article.html`), with **pagination**
- 📨 **Email-only contact**, with the address **hidden from bots** and **inline form validation**
- 🔒 **No phone or social links** - just email, keeping your footprint small for now

```
lax-portfolio-website/
├── index.html      → the home page
├── article.html    → one reusable page that shows any article
├── content.js      → ⭐ your profile email, articles, (and real testimonials)
├── styles.css      → colours, fonts, light/dark
├── script.js       → dark mode, email, insights+pagination, form
├── article.js      → renders the chosen article
└── README.md       → this guide
```

> Bootstrap and icons load from a CDN, so you need internet the first time it opens.

---

## ▶️ How to view it
**Double-click `index.html`.** Or run a local server: `python3 -m http.server 8000`.

> Article pages use a `?id=` web address. Opening via a local server (or once it's
> hosted online) is the most reliable way to test the "Read more" links.

---

## ✏️ Make it yours - the essentials

**1. Your email** - open `content.js` and edit the two parts:
```js
profile: {
  name: "Laxmi Subedi",
  emailUser:   "hello",            // 👈 before the @
  emailDomain: "laxmisubedi.com"   // 👈 after the @
}
```
This is the single place the email is set. It powers the contact form, the "Email me"
links, and the article pages. The address is assembled by JavaScript, so it **never
appears as plain text** in the page - spam bots can't easily harvest it.

**2. Your photo** - make an `img` folder, add `img/laxmi.png`, then change the
`src="https://placehold.co/..."` line in `index.html` to `src="img/laxmi.png"`.

**3. Your name / intro text** - edit the wording directly in `index.html`.

---

## 📨 How the contact form works
1. The visitor fills it in. If anything is missing or the email looks wrong, a **red
   message appears right under that field** (inline validation) - no page reload.
2. When it's valid and they press **Send via email**, their email app opens with the
   name, email, topic, and message **pre-filled and addressed to you**.
3. They press send; it lands in your inbox; you reply normally over email.

No third-party service, no signup, nothing storing visitor data. (It uses the visitor's
email app - that's the trade-off for keeping it simple and private. If you ever want
messages to arrive without that step, I can switch it to a form service later.)

---

## ✍️ Articles (Insights) - add your own

Articles live in `content.js` under `articles`. Each one automatically gets a card on the
home page **and** its own page at `article.html?id=<slug>`.

Copy a block and edit it:
```js
{
  slug: "my-new-article",          // unique, lowercase-with-dashes (becomes the web address)
  tag: "Study tips",
  cover: "teal",                   // "teal" or "blue"
  icon: "bi-compass",              // any icon from https://icons.getbootstrap.com
  title: "My article title",
  excerpt: "One line shown on the card.",
  readMins: 4,
  body: [
    "First paragraph…",
    "Second paragraph…"
  ]
},
```
- **Read more** takes the reader to that article's page (not a pop-up).
- **Pagination** appears automatically once you have more than `ARTICLES_PER_PAGE`
  articles (default **6** - change it near the top of section 7 in `script.js`).

---

## 🗣️ Testimonials - only real ones
`testimonials` in `content.js` is **empty on purpose**, so the "What students say" section
stays hidden. Nothing is invented. When a real student gives you genuine feedback (with
permission), add a block and the section appears on its own:
```js
{ quote: "Their real words.", name: "Name or initials", role: "Undergraduate applicant" },
```

This - and not adding made-up numbers or ratings - is what keeps the site credible, so no
one can question your claims later.

---

## 🌗 Dark mode & colours
The moon/sun button switches themes and remembers the choice. To adjust the palette, edit
the top of `styles.css`:
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
- **Netlify** - drag this folder onto https://app.netlify.com/drop → instant link.
- **GitHub Pages** - push to a repo, enable Pages in Settings.
- **Vercel** - import at https://vercel.com.

---

## Sections (home page)
Hero · About (the two fields) · Medicine & Research · Counseling (how I help) ·
Insights (article pages + pagination) · Testimonials (hidden until real) · Contact (email only).
