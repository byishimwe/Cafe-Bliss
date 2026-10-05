# Café Bliss

A fictional neighborhood café, built as a hospitality web design portfolio project. Crafted with semantic HTML5, custom CSS, and vanilla JavaScript — zero frameworks, build steps, or runtime dependencies.

## Run locally

From the repository root, serve the files using any static file server:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Or with Node.js:

```sh
npx serve .
```

Open `http://127.0.0.1:8000` (or the port indicated by your runner). Any standard static hosting service (GitHub Pages, Netlify, Cloudflare Pages, Vercel) can host the repository unchanged.

## Repository structure & maintenance

- `index.html`: Semantic section architecture (`#home`, `#menu`, `#about`, `#events`, `#reservation`, `#contact`), accessibility features (skip link, landmarks, live regions, aria attributes), progressive enhancement fallback states, and the native `<dialog>` full-menu modal.
- `css/styles.css`: Curated warm design system tokens, fluid typography via `clamp()`, height-aware responsive laptop media queries, mobile navigation sheet, and `prefers-reduced-motion` compliance.
- `js/main.js`: Single source of truth for the 18-item menu dataset (`MENU`), category filtering, modal dialog lifecycle with focus restoration, scroll-spy navigation, and client-side form validation.
- `images/`: Local photographic and brand assets (`espresso.webp`, `Cappuccino.webp`, `Summer Berry Delight.jpg`, `social-preview.jpg`, `favicon.svg`).
- `tests/`: Local test scripts and audit tools:
  - `date-rules.test.cjs`: Deterministic unit test suite covering reservation dates, operating hours, and same-day slot cutoffs using Node's native test runner (`node:test`).
  - `interaction-audit.mjs`: Headless Chrome DevTools Protocol automation script auditing form validation, dialog traps, and focus handling.
  - `render-check.mjs`: Multi-viewport automated screenshot and overflow checker.
  - `font-debug.mjs` & `amp-test.html`: Typography and optical size inspection utilities.
- `VALIDATION.md`: Senior frontend audit log verifying typography hierarchy, WCAG AA contrast (~6.5:1), viewport safe-area clearance, and multi-device compliance.

## Menu & business rules

- **Menu prices & categories:** Prices are USD. Modifying the `MENU` array in `js/main.js` automatically updates both the featured category view and the full modal listing across all four categories: Coffee, Tea, Breakfast, and Bakery & desserts.
- **Operating hours:** Monday–Friday 7am–7pm; Saturday–Sunday 8am–6pm.
- **Reservation rules:** Hourly reservation slots, ending one hour prior to closing (last slot 6pm weekdays, 5pm weekends). Slots calculate against the visitor's local calendar and time. Same-day bookings only offer future hours.
- **Typography & imagery:** Loaded fonts are Google Fonts Fraunces (including true italic weights for editorial ampersands) and Manrope, with system serif/sans-serif fallbacks. Remote hero and section photos are loaded from Unsplash with explicit width/height attributes to eliminate layout shifts (CLS).

## Honest demo boundaries

- **Client-only validation:** Reservations, contact inquiries, and newsletter signups validate input patterns client-side. They do not initiate network requests, persist personal information to databases, book actual tables, send emails, or create mailing list subscriptions. Feedback messages display only in the current page session.
- **Progressive enhancement:** When JavaScript is disabled, `<fieldset disabled>` keeps forms inactive while informing the user via `<noscript>`, while core branding, menu highlights, operating hours, events, and location details remain completely accessible.
- **Fictional data:** The address (`42 Market Lane, Brewville`), telephone number (`+1 (202) 555-0148`), and `.example` email demonstrate formatting and link behavior only. Testimonials represent illustrative concept personas.
- **Production readiness requirements:** Deploying this site for a commercial establishment requires integrating an availability backend, server-side data sanitization, an email/SMS dispatch service, a privacy-consenting newsletter provider, verified business metadata, and absolute OpenGraph canonical URLs.

## Verify & test

Run syntax checks and deterministic unit tests:

```sh
node --check js/main.js
node --test tests/date-rules.test.cjs
```

Manual browser verification checklist:

- Test responsive viewports: 1440px, 1280px (laptop height-constrained), 1024px, 768px, 430px, and 375px; verify 200% browser zoom.
- Verify desktop header and mobile hamburger navigation: Escape dismissal, focus redirection to destination sections, and scroll-spy active link indicator.
- Verify menu filter tabs: "All favorites", "Coffee", "Tea", "Breakfast", "Bakery & desserts", and polite screen-reader status announcements.
- Verify full-menu modal: Opens via `#full-menu-button`, locks body scrolling, scrolls internally within `.dialog-body`, closes via `×` button, Escape key, or backdrop click, and restores focus to the trigger.
- Verify reservation rules: Date selection activates appropriate hourly time options; past dates, past same-day hours, and closed hours remain unselectable.
- Verify forms and validation: Submit empty or invalid inputs; verify custom field errors, `aria-invalid` state, and immediate keyboard focus on the first invalid field.
- Verify accessibility: Keyboard Tab order, focus outlines, contrast ratios, and `prefers-reduced-motion` animation suppression.
