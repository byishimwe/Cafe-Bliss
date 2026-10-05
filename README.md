# Café Bliss

A fictional neighborhood café, built as a hospitality web design portfolio project. Static HTML, custom CSS, and vanilla JavaScript. No framework, build step, or runtime JavaScript dependency.

## Run locally

From the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. A normal static hosting service can serve the same files unchanged.

## Maintain the site

- `index.html`: semantic sections, forms, navigation, metadata, and native dialog shell.
- `css/styles.css`: design tokens, component styles, responsive compositions, and reduced-motion support.
- `js/main.js`: shared 18-item menu, filter rendering, dialog behavior, navigation, and form validation.
- `images/`: local photographs, optimized espresso, favicon, and social preview.
- `tests/date-rules.test.cjs`: deterministic tests of the production reservation date/time rules.

Menu prices are USD. Change the `MENU` array to update both menu views. Weekday hours are 7am–7pm; weekend hours are 8am–6pm. Reservations use hourly slots, finish accepting seats one hour before closing, and use the visitor's local calendar and clock because there is no real café timezone.

Google Fonts supplies Fraunces and Manrope with system fallbacks. The selected Unsplash photography is remote. Photo content should be reviewed again if sources change. Local image dimensions and remote request sizes limit layout shift and transfer size.

## Honest demo boundaries

Reservations, contact messages, and newsletter signups are validated locally. They do not send network requests, persist personal information, reserve tables, send email, or create subscriptions. Feedback remains in the current page only. Forms stay disabled when JavaScript is unavailable; the main content and navigation remain available.

The location, contact details, menu, events, and illustrative testimonials belong to a fictional café. The `.example` email and fictional telephone number demonstrate link behavior and are not operating business contacts.

A real launch requires a reservation/availability service, server-side validation, contact delivery, email delivery, and a consent-aware newsletter provider. Replace example business details and testimonials with verified content. Set absolute `og:image`/`twitter:image` URLs and a canonical URL after a real deployment URL is known. There are no fabricated reviews or LocalBusiness structured data.

## Verify

```sh
node --check js/main.js
node --test tests/date-rules.test.cjs
```

Browser checklist:

- Review 1440, 1280, 1024, 768, 430, and 375px widths; also check 200% zoom.
- Exercise every desktop/mobile navigation link, anchor offset, and active state. Test mobile Escape, closing after selection, and focus destination.
- Filter all menu categories; confirm 18 full-menu rows and consistent prices.
- Close the menu with its button, Escape, and backdrop. Confirm scroll restoration, keyboard containment, focus return, and mobile dialog scrolling.
- Submit empty/invalid forms, whitespace, old dates, weekend dates, and elapsed same-day slots. Confirm inline errors and focus on the first invalid field.
- Submit valid demo data, including HTML-like text in names; verify literal text, truthful feedback, resets, and no newsletter reload.
- Check keyboard-only navigation, focus indicators, labels, contrast, reduced motion, and JavaScript-disabled fallback.
- Inspect console errors, image loading, internal anchors, current year, and document overflow.

Use current evergreen browsers with native `<dialog>` support. Visual checks complement the focused date tests; they are not replaced by them.
