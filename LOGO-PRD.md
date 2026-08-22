# Repliq AI — Logo Product Requirements Document

Use this brief to generate a logo (designer, Figma, Midjourney, Ideogram, Recraft, or similar). It describes the product, brand, constraints, and deliverables so the mark matches the live website.

---

## 1. Product snapshot

| | |
|---|---|
| **Brand name** | Repliq |
| **Legal / full name** | Repliq AI |
| **Tagline** | Rebuild the Web from Code & Vision |
| **One-liner** | An AI reconstruction engine: give it a GitHub repo and screenshots, and it rebuilds the interface as live, interactive UI. |
| **Category** | Developer tool / design-to-code / AI studio |
| **Stage** | Hackathon MVP (2026) |
| **Audience** | Design engineers, product teams, design-system architects, creatives who need pixel-accurate reconstruction |

**Core metaphor:** replica + compile. A screenshot (vision) is mapped onto a repository (code) and compiled into a faithful interface.

---

## 2. Brand personality

The logo should feel like **precision engineering with cinematic taste** — not a cute AI mascot, not a generic SaaS gradient blob.

| Be this | Not this |
|---|---|
| Quiet, expensive, editorial | Playful, bubbly, startup-pastel |
| Dark studio / obsidian | Bright SaaS white + blue |
| Sharp, geometric, crafted | Soft rounded “friendly AI” |
| Warm ivory on black | Neon cyberpunk rainbow |
| Replica, lens, compile, grid | Robot heads, sparkles-only, chat bubbles |

**Voice keywords:** obsidian, replica, compile, lens, parity, studio, cinematic, precise.

**Pronunciation:** *REP-lick* (like “replica” without the last syllable). The name is a portmanteau of **replica** + **IQ**.

---

## 3. Name lockup

- Primary wordmark: **Repliq**
- Optional secondary: **AI** (smaller, tracking-wide, or as a superscript / asterisk)
- Do **not** use: ReplIQ, REPLIQ in all-caps as the only lockup, Replik, Replica AI
- Letter **q** is distinctive — keep the descender or a geometric tail; do not hide it
- Current site sometimes uses a placeholder **“R”** in a rounded square. Replace that. The new mark should still work as a compact **R** or abstract icon at 16–32px

Optional conceptual nod: an asterisk `*` already appears next to the hero title on the landing page. A small asterisk, registration-style mark, or compile tick can sit beside the wordmark — it is not required.

---

## 4. Visual system (from the live site)

Use these values. Do not invent a new palette unless a monochrome variant needs it.

### Color

| Token | Hex | Role |
|---|---|---|
| Obsidian black | `#050505` | Primary background |
| Charcoal | `#0B0B0D` / `#111111` | Panels, nav glass |
| Ivory / parchment | `#E1E0CC` / `#E8E5DC` | Primary brand light (hero type, CTAs) |
| Warm gold fade | `#ffcd75` | Accent only — used as a highlight gradient on headlines, not as a fill |
| Soft grey | `#8A8A8F` / `#8C8983` | Secondary text |
| White | `#F5F5F5` / `#FFFFFF` | Type on dark, glass strokes |
| Violet (legacy) | `#8B5CF6` | Older accent. **Do not** make this the logo color. Optional 10% usage at most |

**Logo color rules**

1. Default: ivory `#E1E0CC` (or white) on black `#050505`
2. Inverse: black mark on ivory `#E8E5DC`
3. One-color: solid black or solid ivory
4. Avoid: purple-first, rainbow gradients, glassmorphism *inside* the mark, photoreal metal, 3D bevels

### Type

- UI type: **Geist Sans** (primary), **Geist Mono** (labels)
- Wordmark should feel related: geometric grotesque, tight tracking (`-0.04em` to `-0.07em`), medium weight
- Avoid: script, serif display, comic, heavy techno stencil, Inter clones that look like every other AI startup

### Shape language already in the product

- Full-bleed dark canvases, noise + vignette
- Floating **pill / capsule** navigation (`rounded-full`)
- Glass cards: `border-white/10`, `bg-white/5`, `backdrop-blur`
- Soft rounded squares for icons (`rounded-xl` / `rounded-2xl`)
- Hairline 1px rules, not thick outlines
- Large tracking-tight headlines, not boxed logos

The logo should sit comfortably **inside a 32–40px rounded square or circle** on that glass nav, and also as a large wordmark on a black hero.

---

## 5. Concept directions (pick 1, explore 3)

Designers / generators should explore these, then lock one.

### A. Replica lens
A circular aperture, viewfinder, or dual overlapping frames (screenshot vs compiled UI). Suggests “capture intent → compile replica.” Keep it geometric, 2–3 shapes max.

### B. Compile R
A custom **R** built from a grid, bounding box, or two stacked layers (source + output). The counter of the R can hold a small tick, asterisk, or slit of gold.

### C. Parity split
A mark split vertically (before / after), like the site’s comparison slider. Left: wireframe / dashed. Right: solid fill. Reads as reconstruction.

**Do not combine all three.** One idea, executed cleanly.

---

## 6. Required lockups

Produce these variants:

1. **Primary wordmark** — `Repliq` (with optional small `AI` or `*`)
2. **Icon / app mark** — standalone symbol that works at 16px, 24px, 32px, favicon
3. **Nav lockup** — icon + wordmark, horizontal, for the floating glass header
4. **Stacked** — icon above wordmark, for splash / OG image
5. **Favicon** — simplified icon, no thin lines that vanish at 16px

---

## 7. Technical specs

| Spec | Requirement |
|---|---|
| Master files | SVG (stroke converted to outlines) + PDF |
| Raster | PNG @ 1x/2x, transparent; also on `#050505` and on `#E8E5DC` |
| Favicon | 32×32, 16×16 PNG + SVG |
| App / OG | Square 1024×1024, and landscape 1200×630 wordmark on black |
| Clear space | At least the width of the **q** descender (or the icon’s inner padding) on all sides |
| Minimum size | Icon ≥ 16px; wordmark ≥ 80px wide |
| Grid | Design on a 24 or 32 unit square grid |
| Strokes | If used, ≥ 1.5px at 24px size; prefer filled geometry for the icon |

---

## 8. Usage on this website

The mark will replace:

- The white **“R”** rounded tile in `/reconstruct/new` and `/dashboard` nav
- Potential placement on the landing hero next to “Repliq AI”
- Favicon and browser tab
- Footer / OG images later

**Surfaces**

- Dark glass pill (`bg-black/40`, `border-white/10`) — ivory mark
- Solid black page — ivory mark
- Ivory CTA button — black mark
- Favicon — high contrast, no gold gradient (gold will muddy at 16px)

---

## 9. Hard constraints (rejection list)

Reject any direction that:

- Looks like a chatbot, sparkle, or brain
- Uses purple as the dominant color
- Uses drop shadows, glow, or inner glass as part of the *vector* (the UI already has glass; the logo should be flat)
- Is a literal camera, GitHub cat, or React atom
- Contains photographs, screenshots, or UI chrome
- Is illegible as a favicon
- Feels like Vercel, Linear, Midjourney, or Cursor clones

---

## 10. Ready-to-paste generation prompts

### Prompt — icon (Ideogram / Recraft / Midjourney)

```
Minimal geometric logo icon for “Repliq”, an AI website reconstruction studio.
Flat vector, 2D, single-color ivory #E1E0CC on pure black #050505.
Concept: a precise replica mark — overlapping frames or a custom letter R built from a viewfinder / bounding box.
Hairline geometry, cinematic, editorial, expensive. No gradients, no 3D, no glow, no purple, no robot, no sparkles, no text.
Centered, lots of negative space, works as a 16px favicon. Square composition.
```

### Prompt — wordmark

```
Custom wordmark “Repliq” for a dark cinematic AI developer tool.
Geometric grotesque, medium weight, tight tracking, ivory #E1E0CC on black #050505.
Distinctive lowercase q. Optional tiny asterisk after the name.
No serifs, no neon, no gradient fill, no 3D. Clean vector, editorial, like a film studio + compiler.
```

### Prompt — full lockup

```
Horizontal logo lockup: small geometric icon + wordmark “Repliq”.
Ivory #E1E0CC on black #050505. Icon on the left, wordmark on the right, aligned optically.
Minimal, glass-UI compatible, premium dark studio brand. Flat vector, no effects.
```

---

## 11. Success criteria

The logo is done when:

- [ ] It is recognizable as **Repliq**, not a generic AI square
- [ ] The icon is clear at 16px
- [ ] Ivory-on-black and black-on-ivory both work
- [ ] It fits the existing floating capsule nav without looking like a leftover “R” badge
- [ ] A designer unfamiliar with the product can describe it as “precise / cinematic / reconstruction,” not “chatbot”
- [ ] SVG is production-ready (outlined, legal, no linked fonts)

---

## 12. Current placeholder (to replace)

Today the product uses a temporary mark: a rounded square with a bold **R**, white fill, black letter, ~32×32 in the nav. The new logo should occupy the same slot, with optional wordmark **Repliq** beside it on desktop.
