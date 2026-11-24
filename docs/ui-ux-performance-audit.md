# FIRENOX: UI/UX and performance audit

Date: 2026-11-24. Tooling: Lighthouse 12 (mobile = Moto G Power on slow 4G with 4x CPU throttling; desktop preset), run against `next build && next start`. Full-page screenshots were taken with headless Chrome at 1440px and 390px wide. Contrast was computed from the OKLCH tokens.

## Results

| Metric (mobile) | Before | After |
|---|---|---|
| Performance score | **40** | **91–93** |
| Largest Contentful Paint | 15.9 s | 3.3 s |
| Total Blocking Time | 2,290 ms | 40–130 ms |
| Speed Index | 6.9 s | 0.9–1.0 s |
| Time to Interactive | 16.7 s | 3.3 s |
| Main-thread work | 11.2 s | 1.7 s |
| Page weight | 4,628 KiB | 388 KiB |
| Accessibility | 97 (21 contrast failures) | **100** |
| SEO | 100 | 100 |
| Desktop performance | 67 (LCP 2.8 s, TBT 350 ms) | **100** (LCP 0.7 s, TBT 0 ms) |

Best Practices stays at 96 locally. The one remaining flag is a 404 for `/_vercel/insights/script.js`: Vercel Analytics serves that script only on a Vercel deployment, so the flag disappears in production.

All original images and videos are kept in `public/`. New, optimised assets were added under new names and the code points at them. Unused files are never requested by the page, so they cost no load time.

---

## Site-wide

| Area | What was there | Issue | Change |
|---|---|---|---|
| Fonts | CSS asked for `"Inter"` and `"Oswald"`, but neither font was loaded | Every visitor saw fallback fonts (Segoe UI or Arial Narrow), so the condensed headline style was off brand | Loaded both fonts with `next/font/google` (self-hosted, `display: swap`, no third-party request, no layout shift) and wired them into the `--font-sans` and `--font-display` tokens |
| Image pipeline | `images.unoptimized: true` | Every photo was sent at full resolution. A 174px tile downloaded a 1254px image, and the About image was a 1.95 MB PNG | Turned on Next image optimisation with AVIF/WebP, a `qualities` allowlist and a one-year cache. Each image now gets a `sizes` hint that matches its layout |
| Lazy loading | Every below-the-fold image had `loading="eager"` | About 2.5 MB of photos competed with the hero on first load | Removed it, so photos load as they approach the viewport |
| Brand colour | One red (`--primary` `#e82919`) used for red text on dark backgrounds *and* for solid buttons with white text | Both uses failed WCAG AA: red text on dark was 4.4:1 and white on red was 4.3:1. Lighthouse flagged 21 elements | Split it into two tokens: `--primary` `#f3442c` for text and icons (5.5:1) and `--cta` `#d61e17` for solid fills (5.1:1 with white). Solid buttons now use `bg-cta` |
| Build safety | `typescript.ignoreBuildErrors: true` | Type errors could ship without anyone noticing | Removed it. The project type-checks cleanly and the build now enforces it |
| Dead code | About 400 lines of CSS for retired hero experiments, plus 2 unused components | Larger CSS bundle and harder upkeep | Deleted the CSS (stylesheet went from 1,055 to 658 lines) plus `product-turntable.tsx` and `fire-can-3d.tsx` |
| Unused media | 30 files the page never loads (v0 placeholders, earlier PNG/MP4 versions, a duplicate MP4 in the repo root) | None for visitors: unused files are never requested | **Kept on purpose.** New optimised versions were added alongside under new names (`public/images/`, `public/videos/`, `public/brand/`, `*-firenox.webp`), and the code was updated to point at them |
| Scroll reveal | `<Reveal>` was wired up but forced `opacity: 1`, so it never animated. It also put `will-change` on about 60 elements | No polish, plus wasted GPU memory | Rebuilt it as progressive enhancement. Only content that starts below the fold fades in, so above-the-fold content never flashes and LCP is never delayed. It respects reduced motion and works without JavaScript |
| Anchor offsets | Fixed header with no scroll padding | Nav jumps could hide section titles under the header | Added `scroll-padding-top` |

## Metadata and icons

| What was there | Issue | Change |
|---|---|---|
| No favicon was configured. `public/icon.svg`, `apple-icon.png` and the 32px icons were the **v0 template logo** | `/favicon.ico` returned 404 and the browser tab showed no brand | Built `app/icon.png` and `app/apple-icon.png` from the cleaned FIRENOX flame mark (Next file convention) |
| The OG image was a 1.95 MB square PNG | Too heavy, and the wrong ratio for link previews (social cards are 1.91:1) | Added a 1200×630 `app/opengraph-image.jpg` (105 KB) with alt text, plus a Twitter `summary_large_image` card |
| `metadataBase: https://firenox.example` | Placeholder domain, so canonical and OG URLs were broken | Read from `NEXT_PUBLIC_SITE_URL` with `https://firenoxglobal.com` as the fallback (it matches the contact email domain). Added it to `.env.example` and added a canonical URL. **Set the real domain before launch** |

## Header

| What was there | Issue | Change |
|---|---|---|
| Logo: `firenox-fire-logo.png`, 143 KB | The image was a screenshot with a **carousel "‹" arrow button baked into it**, and it was 143 KB for a 36px icon | Removed the arrow, rebuilt the flame pixels that the button's overlay had darkened, centred the mark and exported a 3 KB WebP |
| Nav: Home, Product, Features, Use Cases, Proof, Certifications, Contact | The two biggest sections (How To Use and the comparison) couldn't be reached from the nav. "Proof" is a sub-block | Nav is now Home, Product, Features, Use Cases, How To Use, Compare, Contact |
| No active state | Visitors couldn't tell where they were on a long one-page site | Added a scroll-spy underline and `aria-current` |
| Mobile menu | No Escape-to-close. The header stayed see-through over the hero when the menu opened. No CTA in the menu | Escape closes it, the header gets a solid background when open, the menu has 48px touch rows, and an Enquire Now button sits in the menu on phones |

## Hero

| What was there | Issue | Change |
|---|---|---|
| A three.js 3D bottle that started on page load | **The main performance problem.** Three.js (380 KB) plus environment and shader warm-up took about 7.5 s of main-thread time on mobile and delayed LCP to 15.9 s | Captured a pixel-matched static render of the same model at 2× (28 KB WebP), served with `fetchpriority=high`. On desktop the live 3D viewer starts on the first mouse move, scroll or key press and fades in over the render with no visible jump (checked side by side). On touch and data-saver devices a **"Rotate in 3D"** button loads it on demand. If WebGL fails, the render simply stays in place instead of showing an error |
| Mobile order: copy, bottle (480px), buttons | **The Get a Quote button was below the fold on phones** | Mobile order is now copy, buttons, bottle (420px) |
| Secondary CTA "SEE PRODUCT" with a ▶ play icon | The play icon promised a video the label didn't mention | Renamed to "WATCH DEMO" (it scrolls to the demo video) |
| Kicker text at 10px with 0 letter-spacing | Too small and cramped, and it failed contrast | 11px with 0.08em tracking, now passes contrast |

## Why Choose

| What was there | Issue | Change |
|---|---|---|
| Five centred items stacked vertically on mobile, each with a 56px icon | About 1,100px of centred text on phones, which is hard to scan | On mobile each item is a row: icon on the left, title and text on the right. Tablet and desktop are unchanged |

## Use Cases

| What was there | Issue | Change |
|---|---|---|
| Seven full-width 4:3 photos stacked on mobile | **About 2,000px of scrolling** through stock photos | Two-column grid on mobile, with the last tile spanning both columns so nothing is orphaned |
| Tablet: 3 columns × 7 items | Left an orphan tile on the last row | Tablet uses 4 columns with the first tile spanning two (2+1+1 / 1+1+1+1) |
| Full-size images (151–334 KB each), eager loading | Slow and wasteful | Optimised and lazy-loaded. Tiles now weigh 9–38 KB. Spanning tiles get their own `sizes` hint so they stay sharp |

## About and video

| What was there | Issue | Change |
|---|---|---|
| A 1.95 MB PNG thumbnail, loaded eagerly | The heaviest asset on the page | WebP source (137 KB) served through the optimiser and lazy-loaded |
| The video modal used a 16:9 frame | **The video is portrait (720×1280)**, so it played as a thin strip between large black bars | The modal frame is now 9:16 and sized to the viewport height |
| A 5.8 MB MP4 with the moov atom at the end | Slow to start, because it had to download fully before playing | Re-encoded with H.264 CRF 24 and `+faststart`, giving 2.8 MB that starts streaming at once. Added a matching portrait poster frame |
| Modal | The page scrolled behind it | Body scroll is locked while it's open |
| Play button `bg-primary/90` | Failed contrast | `bg-cta`. The hover zoom now respects reduced motion |
| Product Highlights: bare icons and labels, re-animating 1.2 s on *every* scroll pass (`once={false}`) | Looked unfinished and the repeated motion was distracting | Light cards with a hover state that reveal once with a short stagger |

## How To Use

| What was there | Issue | Change |
|---|---|---|
| Step number shown twice: a "01" badge on the photo and "01" again beside the title | Redundant | Kept the badge (now `bg-cta`, which passes contrast) and gave the heading a screen-reader-only "Step 1:" |
| Photos loaded eagerly | Slow | Lazy-loaded and optimised |

## Wet / Cool / Control

| What was there | Issue | Change |
|---|---|---|
| Step numbers in `text-primary/70` | **2.7:1 contrast**, the worst failure on the page | Muted foreground colour, hidden from screen readers because the order is already clear |

## Comparison

| What was there | Issue | Change |
|---|---|---|
| Footnote: "Visual summary rebuilt as native HTML." | **Developer note visible to customers** | Replaced with: "Comparison reflects typical portable powder extinguishers. Confirm current certifications and performance claims for your market before purchase." |
| `aria-label="HTML comparison infographic"` on a plain div | Developer wording, and screen readers ignore a label on a div with no role | `role="group"` with a meaningful label. Removed a redundant label on the mobile list |
| Table text at 12px, mobile cells at 11.2px, mobile labels at 9.3px | Too small to read comfortably on phones, and failed contrast at that size | Raised to 13px, 12.8px and 10.9px |

## Certifications

| What was there | Issue | Change |
|---|---|---|
| `max-w-[1520px]` container | The band didn't line up with any other section, and its heading sat at the far left edge at 1440px | Uses the shared `max-w-7xl` container and gutters |
| Badges as outlined text plus a 10px "COMPLIANT" label | Tiny text that failed contrast, and the badges looked like plain text | Cards with a check icon and a one-line description of each mark (CE: European conformity; ISO: quality management; SABER: Saudi product registration; SASO: Saudi standards). Text is now 12px and passes contrast |

## Enquiry form and footer

| What was there | Issue | Change |
|---|---|---|
| Submit and Enquire buttons with white on `#e82919` | 4.3:1, failed AA | `bg-cta`, 5.1:1 |
| The footer used the defective logo PNG | Same artifact as the header | Cleaned WebP mark |

---

## Round 2: new imagery and visual polish

| Area | What was there | Issue | Change |
|---|---|---|---|
| Use-case photos | Seven stock-style scenes (1.75 MB in total) | None of them showed the product, so they read as generic stock imagery | New scenes generated with Gemini (`gemini-3.1-flash-image`) via the Bifrost gateway, with the **real FIRENOX 3D render composited in** (matched scale, contact shadow, colour-matched to the scene's light). Branding is pixel-exact rather than redrawn by AI. Total size 461 KB. Files: `public/use-cases/*-firenox.webp` |
| Use-case layout | Seven equal 174px squares on desktop | The photos were too small to read and the section had no focal point | Editorial bento grid: Home is a large 2×2 feature tile and Marine/Industrial are wide tiles. Each tile has a "where to keep it" caption. Section header rewritten ("Where to keep it") with an intro line |
| Hero | Flat black background | Felt empty, and the product floated without context | Generated ember-haze backdrop (8 KB, fades into the page), a warm light pool under the bottle, and a trust row (Covers 7 fire classes · Water-based formula · No annual servicing) |
| Section headers | Why Choose and About had no eyebrow label; heading sizes varied (`md:text-4xl` vs `md:text-5xl`) | Inconsistent hierarchy from section to section | Every major section now uses the same eyebrow, heading (`md:text-5xl`) and rule pattern |

Why the composite approach: the gateway's working upstream key accepts text-only image requests but rejects requests that include reference images (HTTP 502 `upstream_credentials_exhausted`). It also rate-limits, so requests were sent 30 seconds apart. Scenes were therefore generated with a deliberately empty foreground spot, and the bottle was composited in afterwards.

Scores after round 2 (production build): mobile Performance 89–91, Accessibility 100, SEO 100, CLS 0; desktop Performance 100.

## Not changed (recommendations)

1. **Photography.** The use-case scenes are generated composites. For flagship marketing (ads, print), a real photo shoot with the physical product is still worth doing.
2. **Logo source.** The flame mark was rebuilt from a low-resolution screenshot, and its right edge is clipped in the original. Ask the designer for the vector (SVG) master.
3. **Claims.** The comparison and certification copy makes compliance claims. Check them against the certificates for each market.
4. **Mobile LCP (3.3 s).** The remaining time is mostly the network round-trip for the hero image on simulated slow 4G. On Vercel's CDN the optimised image is cached at the edge, which should bring this under 2.5 s.
