# BUILD-STATE.md — Arcade I/O Pico Carrier v0.1 Field Guide
> Upload this to the Claude Project so future chats read it first.
> Convention: log DECISIONS not keystrokes; overwrite Current State, append Decision Log.
---
## Repo
- **GitHub**: github.com/jalulia/AC-Pico--V2CD
- **Pages**: jalulia.github.io/AC-Pico--V2CD/
- **Owner**: Julia (jalulia)
---
## File map
| File | Role |
|---|---|
| `index.html` | Static cover + §01 + §02 shell + §03–§06 + §08 static prose + topbar + ArcadeApp scaffold + edit gate + editor + loader |
| `paper.css` | Design tokens, all styles |
| `anatomy.jsx` | FIG.01 board SVG + numbered callout leaders + inventory master/detail explorer |
| `mini-diagrams.jsx` | Per-block line diagrams keyed by id |
| `sections.jsx` | React islands only: DigitalMath, AnalogMath, Connectors + MiniTerminal (mount into placeholders) |
| `img/01-pico-h.png` … `img/10-usb.png` | 10 transparent component photos |
| `ac-logo-wordmark.svg`, `ac-logomark.svg` | Arcade Commons branding |
| **Deleted** | `app.jsx`, `tweaks-panel.jsx` (old Tweaks theme panel) |
---
## Current state
### Design system
- **Background is WHITE.** Never cream/beige/off-white as a default. Always match the existing repo design system.
- Fonts: Geist (sans) + Geist Mono. Tokens: `--paper` (white), `--ink`, lane colors `--teal`, `--green`, `--vermilion`, `--gold`, `--orange`.
- Don't tighten general spacing.
### CMS-lite system (Phases 0–4 complete)
- **Supabase project:** AC IO (`evskzyurkqzjjakbrawo`), separate from the Yoshi dossier.
- **Tables:** `ac_section_content` (cid + html), `ac_sections`, `ac_meta`, `ac_files`, `ac_editors`.
- **RLS:** anon read/write on content tables; `ac_editors` is private (no anon SELECT).
- **Edit gate:** `is_editor` RPC checks email against `ac_editors` allowlist.
- **ArcadeApp scaffold:** vanilla JS IIFE with `sb()` and `storage()` REST helpers.
- **23 editable blocks** (`data-editable` + `data-cid`) across §00–§08. Prose is static HTML at parse time.
- **4 React islands** mount into bare placeholder divs: `#anatomy-figure`, `#capacity-digitalmath`, `#capacity-analogmath`, `#connectors-mount`. Islands and editable blocks are always siblings, never nested.
- **Edit button** in topbar → email prompt → `is_editor` RPC → `localStorage` persistence → `body.ac-edit-mode` class → per-block `contentEditable` editing → upsert to `ac_section_content`.
- **Loader** on page load fetches saved content, injects, sanitizes, re-wires edit buttons.
- **§07 Build sequence** dropped from nav and code. Contents folio says "Seven sections". Endmark says "7 / 7".
- **§04 Connectors** kept as a single React island (not editable in v1).
### FIG.01 — Board layout (anatomy.jsx)
- **Pin-exact orthogonal routing.** Every signal trace starts on a labelled Pico pad and lands on a real component pin. Solid polylines, no dashed beziers. Buses labelled by function (DATA/CLK/LATCH, SCK/MOSI/MISO/CS, A/B, PWM ×10), never by invented GP numbers.
- **Junction dots** (blue = digital/SPI, vermilion = spinner, gold = PWM) mark where each bus lands on a Pico pad.
- **Callout labels** beside each leader badge: plain name + lane eyebrow with coloured square. Labels placed away from board; 08 and 10 forced left.
- **Active-state backing fills.** Component body rects get a white fill that fades in only when the block is active/highlighted. J_ANALOG and MOSFET use 80% opacity. CSS classes: `.solid`, `.solid.soft`.
- **Leader anchors on component edges** so bold active lines don't cross internals.
- **Removed:** scale ruler, compass rose, dimension text, "SCHEMATIC LAYOUT" caption, title block.
### Inventory — §02 Anatomy explorer
- The inventory IS the §02 master/detail explorer, not a separate section or grid.
- **10 blocks** in image-3 order + USB as #10.
- **Plain name leads** each card; designator is the subtitle.
- **Photos** (transparent PNGs) at native resolution, no stretching.
### Mini-diagrams (mini-diagrams.jsx)
- 10 diagrams + TERM terminal-block diagram.
- **15% smaller**, **Light grey ground** (`#f4f4f4`), **Finer lines**, **Body fills**, **Colour accents**.
### §03 — Digital vs analog
- Plain documentary language. No cutesy framing.
- Cards: "Digital inputs" / "Analog inputs" (two input families).
- Design rule: population options on one PCB → 32D/8A, 32D/16A, 48D/8A.
### Removed sections
- §07 Build sequence — removed.
- Tweaks panel — deleted.
---
## Content canon
- **Seimitsu LS-32** = microswitch/digital joystick. Belongs with buttons.
- **Ultimarc UltraStik 360** = all-in-one Hall analog stick (the cost this board undercuts). Repo has zero UltraStik content; keep it that way.
- **Hall analog example** = generic bare Hall module → MCP3208.
- **Part facts:** RP2040 = dual Cortex-M0+ @ 133 MHz · 74HC165 = 8-bit parallel-in/serial-out · MCP3208 = 8-channel 12-bit SPI ADC.
- **Loop timing** softened to "~1 ms target (to confirm)".
- **Forbids:** mentioning Yoshi, "beginner-friendly" framing, UltraStik-bypass centering.
---
## Locked design decisions
- Background is WHITE. Never cream/beige/off-white as default.
- Always match the existing repo design system; never invent a new aesthetic.
- Pin-exactness is the standing rule for FIG.01.
- Plain name leads each inventory card; part designator is the subtitle.
- Don't tighten general spacing.
- Mini-diagram ground: light grey (#f4f4f4), not cream.
- Active component fills: white default, 80% for J_ANALOG/MOSFET.
- Transparent PNGs: never add backgrounds.
- §03: plain documentation anchored on Matt's notes. No cutesy language.
- Editable prose is always static HTML; React islands are locked.
- Islands and editable blocks are siblings, never nested.
---
## Open questions / TODO
- **10 (USB) leader overlap:** leader grazes "RASPBERRY PI PICO H" text when active.
- **"NOT TO SCALE":** no longer appears on the figure.
- **Future hardware:** USB-C / bare-RP2040 deferred.
- **§04 Connectors:** currently a locked island. If Julia wants card prose editable, convert to static HTML per the migration map's alternative path.
- **Phase 5 (block insertion) + Phase 6 (image upload):** deferred until MVP ships.
---
## Decision log
- **2026-05-25** — Removed fake engineering-drawing chrome from FIG.01.
- **2026-05-25** — §03 renamed → "Digital vs analog". 4-way/8-way folded inside digital case.
- **2026-05-25** — Confirmed: LS-32 = microswitch/digital; UltraStik 360 = Hall analog.
- **2026-05-25** — Inventory rebuilt: 10 blocks, plain name leading, stable id↔num split.
- **2026-05-25** — FIG.01 pin-exact routing pass. Junction dots added.
- **2026-05-25** — Callout inventory-tag labels added. 08/10 forced left.
- **2026-05-25** — Active-state backing fills (.solid, .solid.soft).
- **2026-05-25** — Leader anchors moved to component edges.
- **2026-05-25** — Removed center caption + title block. Tightened analog comb.
- **2026-05-26** — §03 rewritten with Matt's notes.
- **2026-05-26** — §07 Build sequence removed.
- **2026-05-26** — Component photos wired in (10 transparent PNGs). Native resolution cap.
- **2026-05-26** — Mini-diagrams overhauled: smaller, light grey, finer strokes, body fills, colour accents.
- **2026-05-26** — §02 heading → "Visual walkthrough".
- **2026-05-26** — Phase 0 verified: Supabase tables, RLS, is_editor gate all live.
- **2026-05-26** — Phases 1–4 (CMS-lite port) completed. 23 editable blocks, 4 React islands, edit gate, per-block editor, on-load loader. §07 dropped, MiniTerminal dupe line fixed, sections.jsx trimmed to islands only.
---
## Workflow note
Files = memory. Every change lives in the file, not the session. Julia uploads changed files to GitHub (upload overwrites; manual delete for removed files).
