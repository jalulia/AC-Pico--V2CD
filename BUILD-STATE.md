# AC-Pico — Build State & Decisions

> **Purpose:** the single source of truth for the Arcade I/O Pico Carrier v0.1 field manual.
> Upload this into the Claude **Project** as a file. At the start of any new chat, say:
> *"Read BUILD-STATE.md before doing anything."*

---

## How to use this doc (the convention)

Don't log every edit — that gets abandoned within a week. Log **decisions**, not keystrokes.

- **Locked Decisions / Content Canon** = durable choices that are expensive to re-derive or that have already been gotten *wrong* once. These MUST live here. If a decision would be annoying to re-explain in a fresh chat, it belongs in this file.
- **Routine edits** (typos, spacing, a color nudge) do **not** go here. They live in the chat and the git history.
- **Current State sections get overwritten** when the truth changes — keep them describing *now*, not history.
- **Decision Log** (bottom) gets *appended* with one dated line per consequential call, so the "why" survives.

Rule of thumb: *would I be irritated to explain this again in a new chat?* → it goes in this file.

---

## Project

- **What it is:** a low-cost internal arcade I/O carrier board built around the Raspberry Pi Pico H. Reads cabinet controls (buttons, digital joysticks, Hall-effect analog sticks, spinners, pots) and sends them to a PC over USB, while driving cabinet LEDs. Purpose-built for Arcade Commons / indie cabinets — *not* a "play every MAME game" hobbyist board.
- **Repo:** `github.com/jalulia/AC-Pico--V2CD` (Public)
- **Deploy:** GitHub Pages — `jalulia.github.io/AC-Pico--V2CD/`
- **Doc type:** Arcade Commons "field manual" — Swiss-editorial × mid-century technical illustration.

---

## Architecture & file map

It is a **multi-file React app compiled in the browser by Babel standalone** (not a single HTML file, not a build step). This matters for previewing — see caveat below.

| File | Role |
|---|---|
| `index.html` | Static cover, §01, §02 shell, topbar; loads CSS + the three script files below |
| `paper.css` | All design tokens + styles |
| `mini-diagrams.jsx` | `window.MiniDiagram` — small per-component icons used in the anatomy explorer |
| `anatomy.jsx` | FIG.01 board figure + the 9 numbered callout blocks + the inventory master/detail explorer |
| `sections.jsx` | §03–§08 (Digital vs analog, Connectors, BOM, Firmware, Build sequence, Sources) |
| `ac-logo-wordmark.svg`, `ac-logomark.svg` | Brand marks |
| `Style Guide.html` + `style-guide.css/.jsx` + `specimen.jsx` | **Separate internal style guide.** Not part of the main page. |

**Deleted (do not reintroduce):** `app.jsx`, `tweaks-panel.jsx` — these were the "Tweaks" theme-picker panel.

### Preview caveat (this caused a "skeleton" scare)

Opening `index.html` as a **lone file** (double-click, or a single-file preview) renders a broken skeleton — serif text, giant logo, missing sections — because it can't see its sibling `paper.css` / `.jsx` files. This is expected, not a bug.

- **To preview locally:** from the repo folder run `python3 -m http.server`, open `localhost:8000`.
- **Or:** just commit and view the live GitHub Pages URL. Pages serves everything over http, so siblings resolve and it renders correctly.

---

## Locked design decisions

1. **Background is WHITE** (`--paper: #ffffff`). **Never cream / beige / off-white / warm-paper** as a default. (The `oxide` theme is cream — it is optional and not the default; do not ship it as the default.)
2. **Match the existing repo design system.** Do not invent a new aesthetic, new fonts, or new color logic. Fonts are **Geist** (sans) and **Geist Mono** (mono).
3. **No fake engineering-drawing chrome on FIG.01.** Removed: the mm scale ruler, the `100 × 70 mm` dimension claim, and the compass rose; the "NORTH ↑" plate-header note is gone; title-block cells now read `NOT TO SCALE` and `DIAGRAM · SCHEMATIC`. Rationale: a hand-placed diagram is not dimensioned — pseudo-precision is misleading.
4. **Tweaks panel removed entirely** (the "press T" theme/color picker). It was non-essential UI cruft.
5. **Lane colors are semantic** — keep them consistent: teal = data / digital, green = analog/Hall, vermilion = signal / spinner (and the hero accent), gold/orange = power & light.

---

## Content canon (facts that must stay correct)

- **§03 is "Digital vs analog"** — that framing *is* the section, and *is* the real answer to "can it run four joysticks?". The "four joysticks?" wording survives only as a one-line rhetorical hook, never as the title.
- **4-way vs 8-way lives INSIDE the digital case, and is not a third concept.** A digital stick is **four switches** (up/down/left/right). 4-way allows one direction at a time; 8-way is the **same four switches** with two adjacent allowed to close together for a diagonal. **The board never sees a special "8-way input"** — it reads switches; firmware decides. Do not line up "4-way / 8-way / analog" as three parallel things — only **digital vs analog** is the real fork.
- **Analog sticks differ in kind:** continuous X/Y *voltage* → MCP3208 ADC. No 4-way/8-way idea applies.
- **Seimitsu LS-32 is a MICROSWITCH (digital) joystick**, not Hall-effect/analog. If a Hall-effect analog example is needed, use a **bare Hall mechanism / DIY Hall kit → MCP3208**. The Ultimarc **UltraStik 360** is the true commercial Hall analog stick, but it has its **own USB + 14-bit ADC** — i.e. exactly the cost this board avoids — so mention it only as context, de-emphasized. (The repo currently has zero UltraStik content; keep it that way.)
- **Loop timing is a TARGET, not a guarantee:** "~1 ms (timing to confirm)". It is the firmware *scan loop*, **distinct from the RP2040's 133 MHz CPU clock**. Caveat to keep: large/addressable LED arrays whose refresh doesn't align with the loop can show shimmer/marching artifacts; v0.1's discrete MOSFET PWM channels don't hit this — only a future big addressable array would.
- **Capacity arithmetic:** 4 digital sticks = 16 of 32 digital inputs (via 74HC165, 3 GPIO); 4 analog sticks = 8 of 8 channels = one MCP3208 (via SPI). Digital and analog draw on **separate budgets**, so you can mix both; you can't max digital *and* analog *and* a full button set at standard config — then go 48-input (6× 74HC165) and/or dual-ADC. Board populations: **32D/8A, 32D/16A, 48D/8A** — one PCB.
- **Part facts:** RP2040 = dual Cortex-M0+ @ 133 MHz · 74HC165 = 8-bit parallel-in/serial-out · MCP3208 = 8-channel 12-bit SPI ADC.
- **Inventory = the §02 Anatomy explorer** (master/detail), *not* a separate section and *not* a grid. It carries **10 blocks** in image-3 order + USB as #10: 01 Microcontroller · 02 Digital input expander · 03 Analog input ADC · 04 LED drivers · 05 Spinner · 06 Hall-effect analog joystick · 07 Arcade buttons & switches · 08 Terminal blocks · 09 Power input · 10 USB. **Plain name leads** each card; the designator (`MCP3208`) is the subtitle. Each detail panel has a photo placeholder top-right that prints its own filename (`img/01-pico-h.png` … `img/10-usb.png`), the line diagram below, specs beneath.
- **Figure ↔ inventory are locked by display number,** but selection is keyed by a stable internal `id` so renumbering never touches the hover/highlight logic. The cream diagram frame is an intentional small accent — **not** a background — leave it. Don't tighten general spacing.

---

## Section map

`§00` Cover · `§01` What this board is · `§02` Board anatomy (FIG.01 + 9 blocks) · `§03` **Digital vs analog** · `§04` Connector map · `§05` Prototype BOM (board-side, $35–$55) · `§06` Firmware + Unity (~1 ms loop) · `§07` Build sequence · `§08` Sources.

---

## Open questions / TODO

- **FIG.01 routing — DONE (verify on push):** floating dashed curves replaced with solid orthogonal traces that start on labelled Pico pads and land on real pins. Labelled buses: DATA/CLK/LATCH (74HC165), SCK/MOSI/MISO/CS (MCP3208), A0–A7→CH0–7, spinner A/B, PWM ×10→gates, drain→OUTx, GND rail→PSU, VLED+ (LED anodes external). Functions are labelled **by bus, not by invented GP numbers**. *Eyeball on push:* (a) left field has three trace bands (shift 300–330 / spinner 360–465 / SPI 540–585) — check none look tangled; (b) the DATA tap crosses the shift runs and the drains cross the GND rail — those are intended cross-overs, not joins; (c) the dense 8-wire analog comb bottom-centre; (d) PWM verticals brushing the N-CH symbol near Q3–Q5.
- **FIG.01 title block:** kept as plain branding (`NOT TO SCALE`). Open: keep, or remove entirely?
- **Terminal-block callout (08):** anchored at the LED-out strip as a representative terminal; nudge if it reads cluttered against callout 04.
- **Future hardware:** USB-C / bare-RP2040 migration is explicitly *deferred* until the carrier survives real cabinets.

---

## Decision log

- **2026-05-25** — White is the only default background; cream is banned. Match the repo's design system, never invent one.
- **2026-05-25** — Stripped all fake blueprint chrome from FIG.01 (scale ruler, mm dimension, compass, NORTH note); title block softened to "NOT TO SCALE / DIAGRAM · SCHEMATIC".
- **2026-05-25** — Removed the Tweaks panel (`app.jsx`, `tweaks-panel.jsx`, the "press T" hint).
- **2026-05-25** — §03 renamed **"Digital vs analog"**; 4-way/8-way folded inside the digital case (same four switches, no special 8-way input); redundant standalone card deleted.
- **2026-05-25** — Loop reframed to "~1 ms target (to confirm)" + LED-array artifact caveat; clarified it's not the CPU clock.
- **2026-05-25** — Confirmed via research: LS-32 = microswitch/digital; UltraStik 360 = the all-in-one Hall analog stick this board deliberately undercuts.
- **2026-05-25** — Inventory rebuilt: 10 blocks rebased to image 3's component set + USB (#10), plain name leading, designator demoted to subtitle, photo placeholder per block printing its own `img/NN-name.png` filename. Figure callouts re-pointed to the same numbers via a stable id↔num split (no hover-logic change). New terminal-block mini-diagram added. Block number shrunk (56→34px); overview copy narrowed by the photo column. USB kept as #10 (reconciles image 3's 9 with Matt's 10-item brief). Pin-exact trace routing deferred to the next pass.
- **2026-05-25** — FIG.01 pin-exact routing pass: replaced every floating dashed bezier with solid orthogonal polylines that originate on specific Pico pads and terminate on real component pins (shift bus, SPI, analog channels, spinner A/B, PWM→gates, drain→OUT, GND rail, VLED+). Buses labelled by function, never by invented GP numbers. Trace colours limited to the figure's existing palette (ink/blue/verm/gold). Cross-overs (DATA over shift runs, drains over GND rail) are intentional non-joins.
