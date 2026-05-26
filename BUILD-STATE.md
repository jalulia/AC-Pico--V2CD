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
| `index.html` | Static cover + §01 + §02 shell + topbar; loads paper.css + 3 jsx scripts |
| `paper.css` | Design tokens, all styles |
| `anatomy.jsx` | FIG.01 board SVG + numbered callout leaders + inventory master/detail explorer |
| `mini-diagrams.jsx` | Per-block line diagrams keyed by id |
| `sections.jsx` | §03–§06, §08 (Digital vs analog, Connectors, BOM, Firmware, Sources) |
| `img/01-pico-h.png` … `img/10-usb.png` | 10 transparent component photos |
| `ac-logo-wordmark.svg`, `ac-logomark.svg` | Arcade Commons branding |
| **Deleted** | `app.jsx`, `tweaks-panel.jsx` (old Tweaks theme panel) |

---

## Current state

### Design system
- **Background is WHITE.** Never cream/beige/off-white as a default. Always match the existing repo design system.
- Fonts: Geist (sans) + Geist Mono. Tokens: `--paper` (white), `--ink`, lane colors `--teal`, `--green`, `--vermilion`, `--gold`, `--orange`.
- Don't tighten general spacing.

### FIG.01 — Board layout (anatomy.jsx)
- **Pin-exact orthogonal routing.** Every signal trace starts on a labelled Pico pad and lands on a real component pin. Solid polylines, no dashed beziers. Buses labelled by function (DATA/CLK/LATCH, SCK/MOSI/MISO/CS, A/B, PWM ×10), never by invented GP numbers.
- **Junction dots** (blue = digital/SPI, vermilion = spinner, gold = PWM) mark where each bus lands on a Pico pad.
- **Callout labels** beside each leader badge: plain name + lane eyebrow with coloured square. Labels placed away from board; 08 and 10 forced left.
- **Active-state backing fills.** Component body rects get a white fill that fades in only when the block is active/highlighted. J_ANALOG and MOSFET use 80% opacity. CSS classes: `.solid`, `.solid.soft`.
- **Leader anchors on component edges** so bold active lines don't cross internals. 01 exits Pico right edge, 04 exits right of Q10, 03 exits MCP3208 left edge, 02 exits chip top.
- **Removed:** scale ruler, compass rose, dimension text, "SCHEMATIC LAYOUT" caption, title block ("DRAWING AIO-PC-001").
- Trace colours: ink, blue, verm, gold. Cross-overs are intentional non-joins.

### Inventory — §02 Anatomy explorer
- The inventory IS the §02 master/detail explorer, not a separate section or grid.
- **10 blocks** in image-3 order + USB as #10: 01 Microcontroller · 02 Digital input expander · 03 Analog input ADC · 04 LED drivers · 05 Spinner · 06 Hall-effect analog joystick · 07 Arcade buttons & switches · 08 Terminal blocks · 09 Power input · 10 USB.
- **Plain name leads** each card; designator is the subtitle.
- **Photos** (transparent PNGs) at native resolution, no stretching.
- Selection keyed by stable internal `id`; display number via `num`. Maps: `numFor`, `titleFor`, `eyebrowFor`, `toneFor`.
- §02 heading: "Visual walkthrough".

### Mini-diagrams (mini-diagrams.jsx)
- 10 diagrams + TERM terminal-block diagram.
- **15% smaller** (frame `max-width: 85%`, centred).
- **Light grey ground** (`#f4f4f4`).
- **Finer lines**: body strokes .85, hair .35, general ink .5.
- **Body fills** (`var(--paper)`) on IC/component rects.
- **Colour accents**: blue pin dots on 74HC165/J_DIGITAL, vermilion + blue A/B waveforms on spinner, gold LED triangle + rail nodes, green MCP3208 indicator, blue USB cable.
- `MiniDiagram` takes `n` (display number) and `d` (diagram key = internal id).

### §03 — Digital vs analog
- Plain documentary language. No cutesy framing.
- Cards: "Digital inputs" / "Analog inputs" (two input families).
- 4-way vs 8-way: same four switches, diagonals = two at once.
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

---

## Open questions / TODO

- **10 (USB) leader overlap:** leader grazes "RASPBERRY PI PICO H" text when active. Relocate badge if needed.
- **"NOT TO SCALE":** no longer appears on the figure. Add to figure header if wanted.
- **Future hardware:** USB-C / bare-RP2040 deferred until the carrier survives real cabinets.

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

---

## Workflow note

Files = memory. Every change lives in the file, not the session. Julia uploads changed files to GitHub (upload overwrites; manual delete for removed files).
