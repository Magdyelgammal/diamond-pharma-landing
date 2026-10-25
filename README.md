# Diamond Pharmaceutical Industries — Landing Page

Responsive, English-only, single-page corporate/product website built with React, Vite, Three.js, Motion and Lucide icons.

## Local development

`npm ci` then `npm run dev`. Production: `npm run build`; preview: `npm run preview`.

## Content review

Company introduction, mission, vision and four values in `content.js` are **proposed editorial copy for the owner to review**, not independently verified corporate statements. No years of operation, certifications, clinical evidence, testimonials or manufacturing capabilities have been invented.

The contact number and office address were approved by the owner from the supplied packaging. Composition tables and available directions are transcribed from supplied labels in `product-details.js`; benefit summaries use conservative draft wording. Missing directions are not inferred from serving sizes. See `product-copy-review.md` for sources, limitations and editorial decisions. The portfolio has eight product families. Product images use the approved 24-count Lozin C range plus Melato 60, Royal 30, Sawmond 10, Osteomond 120 ml, FerroMond 10, VitaMond Kids 120 and D3+K2 Mond 60.

## Interactions and accessibility

Category filtering, seven flavor selectors with variant-specific ingredient disclosures, native product detail dialogs (Escape, focus trapping and restoration), mobile navigation, telephone links, section anchors, pause-motion control, reduced-motion preferences and an extruded Three.js version of the supplied dpi logo. The navy/teal symbol and its counters are traced from the supplied artwork, with a static SVG fallback. Images are locally hosted WebP assets.

## Vercel

Use the Vite framework preset, `npm run build` and `dist` output directory when deploying. No environment variables or backend services are required. Vercel settings are in `vercel.json`.
