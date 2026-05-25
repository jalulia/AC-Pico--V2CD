/* global React, ReactDOM */
const { useState } = React;

/* ============================================================
   STYLE GUIDE — content
   ============================================================ */

/* ───────────── Small inline SVG helpers ─────────────────── */

function FigCornerRegistration() {
  return (
    <svg viewBox="0 0 200 120" className="live" style={{ width: '100%', maxWidth: 320 }}>
      <g className="ink hair">
        <path d="M8 8 L8 24 M8 8 L24 8" />
        <path d="M192 8 L192 24 M192 8 L176 8" />
        <path d="M8 112 L8 96 M8 112 L24 112" />
        <path d="M192 112 L192 96 M192 112 L176 112" />
      </g>
      <g className="ink hair" opacity=".4">
        <line x1="100" y1="20" x2="100" y2="100" strokeDasharray="2 4" />
        <line x1="20" y1="60" x2="180" y2="60" strokeDasharray="2 4" />
      </g>
      <rect x="60" y="40" width="80" height="40" className="ink" strokeWidth="1.25" />
      <text x="100" y="64" textAnchor="middle" className="lbl fill-only" stroke="none" style={{ fontSize: 9 }}>SUBJECT</text>
    </svg>
  );
}

function FigScaleBarCompass() {
  return (
    <svg viewBox="0 0 280 80" className="live" style={{ width: '100%', maxWidth: 360 }}>
      <g transform="translate(20 40)" className="ink hair">
        <line x1="0" y1="0" x2="160" y2="0" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1={i * 40} y1="-5" x2={i * 40} y2="5" />
        ))}
        <text x="0" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>0</text>
        <text x="40" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>20</text>
        <text x="80" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>40</text>
        <text x="120" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>60</text>
        <text x="148" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>80 mm</text>
      </g>
      <g transform="translate(240 40)" className="ink hair">
        <circle cx="0" cy="0" r="22" />
        <path d="M0 -16 L6 0 L0 16 L-6 0 Z" className="ink-fill fill-only" stroke="none" />
        <text x="-4" y="-28" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>N</text>
      </g>
    </svg>
  );
}

function FigLeaderAnatomy() {
  return (
    <svg viewBox="0 0 480 260" className="live" style={{ width: '100%' }}>
      {/* subject */}
      <rect x="60" y="100" width="180" height="60" className="ink" strokeWidth="1.25" />
      <text x="150" y="135" textAnchor="middle" className="lbl fill-only" stroke="none" style={{ fontSize: 10 }}>SUBJECT</text>
      {/* leader */}
      <polyline points="160,160 160,210 320,210 320,180" className="ink hair leader-line" />
      {/* anchor */}
      <circle cx="160" cy="160" r="3" className="ink-fill fill-only" stroke="none" />
      {/* number */}
      <circle cx="320" cy="180" r="14" className="ink-fill fill-only" stroke="none" />
      <text x="320" y="184" textAnchor="middle" className="lbl-num fill-only" stroke="none" style={{ fontSize: 11 }}>03</text>
      {/* annotations */}
      <g className="ink hair" opacity=".5">
        <line x1="160" y1="160" x2="50" y2="160" />
        <text x="42" y="164" textAnchor="end" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>① anchor</text>
        <line x1="240" y1="210" x2="240" y2="246" />
        <text x="240" y="256" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>② bend (90° once)</text>
        <line x1="320" y1="180" x2="380" y2="180" />
        <text x="386" y="184" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>③ tag (r 13)</text>
        <line x1="320" y1="194" x2="320" y2="232" />
        <text x="320" y="244" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>④ number — mono 11 / paper</text>
      </g>
    </svg>
  );
}

function FigBadLeader() {
  return (
    <svg viewBox="0 0 480 200" className="live" style={{ width: '100%' }}>
      <rect x="60" y="80" width="160" height="50" className="ink" strokeWidth="1.25" />
      <text x="140" y="110" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>SUBJECT</text>
      <rect x="260" y="80" width="160" height="50" className="ink" strokeWidth="1.25" />
      <text x="340" y="110" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>SUBJECT</text>
      {/* crossing leaders */}
      <polyline points="80,130 80,170 380,170 380,130" stroke="var(--vermilion)" strokeWidth="1" fill="none" />
      <polyline points="380,130 380,160 80,160 80,130" stroke="var(--vermilion)" strokeWidth="1" fill="none" />
      <circle cx="240" cy="165" r="14" fill="var(--vermilion)" />
      <text x="240" y="170" textAnchor="middle" className="lbl-num fill-only" stroke="none" style={{ fontSize: 11 }}>!</text>
      <text x="240" y="200" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9, fill: 'var(--vermilion)' }}>crossing leaders, redundant tags</text>
    </svg>
  );
}

function FigSchematic({ kind }) {
  if (kind === 'resistor') {
    return (
      <svg viewBox="0 0 120 60" className="live" style={{ width: 120 }}>
        <g className="ink" strokeWidth="1.25">
          <line x1="10" y1="30" x2="40" y2="30" />
          <rect x="40" y="22" width="40" height="16" />
          <line x1="80" y1="30" x2="110" y2="30" />
        </g>
      </svg>
    );
  }
  if (kind === 'cap') {
    return (
      <svg viewBox="0 0 80 60" className="live" style={{ width: 80 }}>
        <g className="ink" strokeWidth="1.25">
          <line x1="40" y1="6" x2="40" y2="22" />
          <line x1="22" y1="22" x2="58" y2="22" />
          <line x1="22" y1="30" x2="58" y2="30" />
          <line x1="40" y1="30" x2="40" y2="46" />
        </g>
      </svg>
    );
  }
  if (kind === 'gnd') {
    return (
      <svg viewBox="0 0 80 60" className="live" style={{ width: 80 }}>
        <g className="ink" strokeWidth="1.25">
          <line x1="40" y1="6" x2="40" y2="20" />
          <line x1="18" y1="20" x2="62" y2="20" />
          <line x1="24" y1="28" x2="56" y2="28" />
          <line x1="30" y1="36" x2="50" y2="36" />
          <line x1="36" y1="44" x2="44" y2="44" />
        </g>
      </svg>
    );
  }
  if (kind === 'diode') {
    return (
      <svg viewBox="0 0 120 60" className="live" style={{ width: 120 }}>
        <g className="ink" strokeWidth="1.25">
          <line x1="10" y1="30" x2="50" y2="30" />
          <polygon points="50,22 50,38 64,30" className="ink-fill fill-only" />
          <line x1="64" y1="22" x2="64" y2="38" />
          <line x1="64" y1="30" x2="110" y2="30" />
        </g>
      </svg>
    );
  }
  if (kind === 'mosfet') {
    return (
      <svg viewBox="0 0 120 100" className="live" style={{ width: 120 }}>
        <g className="ink" strokeWidth="1.25">
          <line x1="40" y1="10" x2="40" y2="30" />
          <line x1="40" y1="30" x2="60" y2="30" />
          <line x1="60" y1="20" x2="60" y2="80" />
          <line x1="60" y1="30" x2="80" y2="20" />
          <line x1="60" y1="70" x2="80" y2="80" />
          <line x1="80" y1="20" x2="80" y2="10" />
          <line x1="80" y1="80" x2="80" y2="90" />
          <line x1="60" y1="50" x2="20" y2="50" />
          <rect x="40" y="58" width="0" height="0" />
        </g>
      </svg>
    );
  }
  if (kind === 'switch') {
    return (
      <svg viewBox="0 0 120 60" className="live" style={{ width: 120 }}>
        <g className="ink" strokeWidth="1.25">
          <line x1="10" y1="40" x2="40" y2="40" />
          <line x1="40" y1="40" x2="68" y2="20" />
          <line x1="80" y1="40" x2="110" y2="40" />
          <circle cx="40" cy="40" r="2" className="ink-fill fill-only" />
          <circle cx="80" cy="40" r="2" className="ink-fill fill-only" />
        </g>
      </svg>
    );
  }
  if (kind === 'arrow') {
    return (
      <svg viewBox="0 0 120 40" className="live" style={{ width: 120 }}>
        <line x1="10" y1="20" x2="100" y2="20" className="ink" strokeWidth="1.5" />
        <polygon points="100,20 92,15 92,25" className="ink-fill fill-only" />
      </svg>
    );
  }
  return null;
}

/* ───────────── Foundations ───────────── */
function Foundations() {
  return (
    <section id="foundations" data-screen-label="01 Foundations">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 01</span>
          <span className="ttl">Foundations · Paper, ink, accents</span>
          <span className="meta">Tokens · CSS variables</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 01</span>
            <h2 style={{ marginTop: 14 }}>Black on paper, rationed colour.</h2>
          </div>
          <p className="body">
            Pure white paper carries 96% of the work. Black ink — near-black, slightly warm — does the structure. Three accents are rationed: vermilion for the section signal and the hero callout, ink-blue for data lanes, gold for power and light. Saturations stay restrained on purpose.
          </p>
        </div>

        <div className="swatch-grid" style={{ marginTop: 28 }}>
          <div className="swatch" style={{ '--c': '#ffffff' }}>
            <div className="swatch-chip" style={{ borderRight: '.5px solid var(--rule-soft)' }} />
            <div className="swatch-meta">
              <span className="swatch-name">Paper</span>
              <span className="swatch-hex">#FFFFFF</span>
              <span className="swatch-var">--paper</span>
              <span className="swatch-rule">Body ground only. Never tint without reason.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': '#f7f6f3' }}>
            <div className="swatch-chip" />
            <div className="swatch-meta">
              <span className="swatch-name">Paper · two</span>
              <span className="swatch-hex">#F7F6F3</span>
              <span className="swatch-var">--paper-2</span>
              <span className="swatch-rule">Insets only — diagram surrounds, code wells.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': '#0a0908' }}>
            <div className="swatch-chip" />
            <div className="swatch-meta">
              <span className="swatch-name">Ink</span>
              <span className="swatch-hex">#0A0908</span>
              <span className="swatch-var">--ink</span>
              <span className="swatch-rule">All structure. All headlines. Default text.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': '#9d9a92' }}>
            <div className="swatch-chip" />
            <div className="swatch-meta">
              <span className="swatch-name">Ink · faint</span>
              <span className="swatch-hex">#9D9A92</span>
              <span className="swatch-var">--ink-faint</span>
              <span className="swatch-rule">Metadata · mono labels · folio meta.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': '#d23f1f' }}>
            <div className="swatch-chip" />
            <div className="swatch-meta">
              <span className="swatch-name">Vermilion</span>
              <span className="swatch-hex">#D23F1F</span>
              <span className="swatch-var">--vermilion</span>
              <span className="swatch-rule">Section eyebrow + ONE hero callout. Cap at 2 surfaces per spread.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': '#1f3a68' }}>
            <div className="swatch-chip" />
            <div className="swatch-meta">
              <span className="swatch-name">Ink-blue</span>
              <span className="swatch-hex">#1F3A68</span>
              <span className="swatch-var">--inkblue</span>
              <span className="swatch-rule">Data lane only — digital, analog, signal flow.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': '#b88b2c' }}>
            <div className="swatch-chip" />
            <div className="swatch-meta">
              <span className="swatch-name">Gold</span>
              <span className="swatch-hex">#B88B2C</span>
              <span className="swatch-var">--gold</span>
              <span className="swatch-rule">Power &amp; light lane — LEDs, supply rails.</span>
            </div>
          </div>
          <div className="swatch" style={{ '--c': 'transparent', borderRight: '.5px solid var(--rule-soft)' }}>
            <div className="swatch-chip" style={{ background: 'repeating-linear-gradient(45deg, rgba(10,9,8,.18) 0 2px, transparent 2px 6px)' }} />
            <div className="swatch-meta">
              <span className="swatch-name">Grain</span>
              <span className="swatch-hex">opacity 0.14</span>
              <span className="swatch-var">body::before</span>
              <span className="swatch-rule">Fixed paper grain — multiply blend. Optional.</span>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: 48 }}>Tokens</h3>
        <table className="tokens" style={{ marginTop: 14 }}>
          <thead>
            <tr><th>Variable</th><th>Value</th><th>Where it earns its keep</th></tr>
          </thead>
          <tbody>
            <tr><td className="var">--rule</td><td className="val">#0A0908</td><td className="use">Primary hairlines. Frames, table dividers.</td></tr>
            <tr><td className="var">--rule-soft</td><td className="val">rgba(10,9,8,.10)</td><td className="use">Sub-dividers inside a table or inside a card.</td></tr>
            <tr><td className="var">--hair</td><td className="val">0.5px</td><td className="use">Default stroke width on every rule and border.</td></tr>
            <tr><td className="var">--paper-2</td><td className="val">#F7F6F3</td><td className="use">Tinted inset — diagram canvas surround, code well.</td></tr>
            <tr><td className="var">--vermilion-soft</td><td className="val">rgba(210,63,31,.10)</td><td className="use">Hover halos. Never as a fill.</td></tr>
          </tbody>
        </table>

        <Do
          tag="DO"
          title="Use lane colour beside the label, not inside it."
          body="The text stays ink; the colour rides a small 8×8 px swatch to its left. Saves the page from a rainbow of typography."
          example={
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, background: 'var(--inkblue)' }} />
                <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>DIGITAL LANE</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, background: 'var(--vermilion)' }} />
                <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>SIGNAL LANE</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, background: 'var(--gold)' }} />
                <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>POWER LANE</span>
              </span>
            </div>
          }
          counterTag="DON'T"
          counterTitle="Tint the label itself."
          counterBody="Coloured mono labels feel like UI debug output and break the editorial tone. The same vermilion that should be reserved for the hero now appears on three chips at once."
          counterExample={
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="mono-xs" style={{ color: 'var(--inkblue)', border: '.5px solid var(--inkblue)', padding: '6px 9px' }}>DIGITAL LANE</span>
              <span className="mono-xs" style={{ color: 'var(--vermilion)', border: '.5px solid var(--vermilion)', padding: '6px 9px' }}>SIGNAL LANE</span>
              <span className="mono-xs" style={{ color: 'var(--gold)', border: '.5px solid var(--gold)', padding: '6px 9px' }}>POWER LANE</span>
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ───────────── Type ───────────── */
function TypeChapter() {
  return (
    <section id="type" data-screen-label="02 Type">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 02</span>
          <span className="ttl">Type system · Scale, weight, tabular</span>
          <span className="meta">Geist + Geist Mono</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 02</span>
            <h2 style={{ marginTop: 14 }}>One weight per role.</h2>
          </div>
          <p className="body">
            Geist for everything legible; Geist Mono for everything structural — labels, metadata, code, technical values. Never alternate weights inside a single headline; never mix mono and sans inside a single word. Tabular numerals on any column that adds up.
          </p>
        </div>

        <div style={{ marginTop: 36 }}>
          <div className="type-row">
            <div className="type-meta">
              <b>H1 · DISPLAY</b>
              <span>Geist · 400 · -0.055em</span>
              <span>clamp(48px, 9vw, 168px)</span>
              <span>Cover headline only.</span>
            </div>
            <div className="type-sample" style={{ fontSize: 96, fontWeight: 400, letterSpacing: '-.055em' }}>Field manual</div>
          </div>

          <div className="type-row">
            <div className="type-meta">
              <b>H2 · SECTION</b>
              <span>Geist · 400 · -0.04em</span>
              <span>clamp(32px, 4.8vw, 80px)</span>
              <span>One per section. No weight mixing.</span>
            </div>
            <div className="type-sample" style={{ fontSize: 56, fontWeight: 400, letterSpacing: '-.04em', lineHeight: 0.95 }}>Anatomy of a board.</div>
          </div>

          <div className="type-row">
            <div className="type-meta">
              <b>H3 · BLOCK</b>
              <span>Geist · 500 · -0.018em</span>
              <span>clamp(18px, 1.7vw, 24px)</span>
              <span>Inside cards, panels, detail headers.</span>
            </div>
            <div className="type-sample" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-.018em' }}>Raspberry Pi Pico H · RP2040</div>
          </div>

          <div className="type-row">
            <div className="type-meta">
              <b>LEDE</b>
              <span>Geist · 400 · 17–22px</span>
              <span>line-height 1.42 · max 64ch</span>
              <span>Opening paragraph of any section.</span>
            </div>
            <div className="type-sample" style={{ fontSize: 18, lineHeight: 1.42, color: 'var(--ink)' }}>
              The carrier presents the cabinet wirer with five terminal banks arrayed around a central Pico H module.
            </div>
          </div>

          <div className="type-row">
            <div className="type-meta">
              <b>BODY</b>
              <span>Geist · 400 · 15px</span>
              <span>line-height 1.55 · max 62ch</span>
              <span>Default reading text.</span>
            </div>
            <div className="type-sample" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
              Use raw analog controls instead of integrated USB joystick boards. Firmware handles calibration, deadzone, smoothing, inversion, and HID axis scaling.
            </div>
          </div>

          <div className="type-row">
            <div className="type-meta">
              <b>MONO · LABEL</b>
              <span>Geist Mono · 500 · 10–11px</span>
              <span>letter-spacing 0.08–0.14em · UPPERCASE</span>
              <span>Folio, eyebrow, metadata.</span>
            </div>
            <div className="type-sample" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
              DOCUMENT · A · &nbsp; 25.05.2026 · &nbsp; PRESS T TWEAKS
            </div>
          </div>

          <div className="type-row">
            <div className="type-meta">
              <b>MONO · DATA</b>
              <span>Geist Mono · 500 · 12–13px</span>
              <span>letter-spacing 0.02em · tabular-nums</span>
              <span>Spec tables, BOM rows, code wells.</span>
            </div>
            <div className="type-sample" style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '.02em', color: 'var(--ink)' }}>
              MCP3208 · 8 channels · 12-bit · SPI &nbsp;&nbsp; $2.10–$2.80
            </div>
          </div>
        </div>

        <Do
          tag="DO"
          title="Hold one weight across a headline."
          body="If the sentence wraps to two lines, both lines share the exact same weight, size, and colour. Variation belongs between elements, not within."
          example={
            <h3 style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-.035em', lineHeight: 0.96 }}>
              How this<br/>field guide was built.
            </h3>
          }
          counterTag="DON'T"
          counterTitle="Wrap a span in lighter italic for ‘emphasis'."
          counterBody="Mid-headline weight or font swaps were the single biggest failure in v1. Looks like fashion, not editorial. If a phrase deserves a different voice, give it a different element entirely."
          counterExample={
            <h3 style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-.035em', lineHeight: 0.96 }}>
              How this<br/>
              <span style={{ fontWeight: 300, fontStyle: 'italic', fontFamily: 'Georgia, serif', color: 'var(--ink-soft)' }}>field guide was built.</span>
            </h3>
          }
        />

        <Do
          tag="DO"
          title="Tabular numerals on every numeric column."
          body="font-variant-numeric: tabular-nums; on body and any cell that adds up. Columns line up at the millimetre even with proportional Geist."
          example={
            <table className="spec" style={{ width: 240, fontVariantNumeric: 'tabular-nums' }}>
              <tbody>
                <tr><td className="label">A</td><td className="val">$ 35.00</td></tr>
                <tr><td className="label">B</td><td className="val">$  4.50</td></tr>
                <tr><td className="label">C</td><td className="val">$108.20</td></tr>
              </tbody>
            </table>
          }
          counterTag="DON'T"
          counterTitle="Let proportional figures jitter columns."
          counterBody="Geist 1 and 4 are narrow at default; a column of dollar amounts becomes ragged. Especially bad on small mono labels."
          counterExample={
            <table className="spec" style={{ width: 240, fontVariantNumeric: 'proportional-nums' }}>
              <tbody>
                <tr><td className="label">A</td><td className="val">$ 35.00</td></tr>
                <tr><td className="label">B</td><td className="val">$  4.50</td></tr>
                <tr><td className="label">C</td><td className="val">$108.20</td></tr>
              </tbody>
            </table>
          }
        />
      </div>
    </section>
  );
}

/* ───────────── Spatial grammar ───────────── */
function Spatial() {
  return (
    <section id="space" data-screen-label="03 Spatial">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 03</span>
          <span className="ttl">Spatial grammar · Folio · Plate · Grid</span>
          <span className="meta">Page architecture</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 03</span>
            <h2 style={{ marginTop: 14 }}>Plates, not pages.</h2>
          </div>
          <p className="body">
            Every section is a plate. A plate has a folio bar (number · title · meta), a single rule beneath it, the lede, and the artifact. Sections breathe with 96px top &amp; bottom padding on desktop. The hairline at 0.5px is sacred.
          </p>
        </div>

        <Ex
          n="03.1"
          title="The folio bar"
          stamp="STRUCT · 01"
          meta="HEAD · EVERY SECTION"
          notes={[
            ['PLATE 03', 'Vermilion · uppercase mono'],
            ['Title', 'Ink · uppercase mono · 0.04em tracking'],
            ['Meta', 'Ink-faint · right-aligned'],
            ['Rule', '0.5px hair below folio']
          ]}
        >
          <div style={{ width: '100%', maxWidth: 800 }}>
            <div className="folio" style={{ paddingTop: 0, paddingBottom: 14 }}>
              <span className="num">PLATE 03</span>
              <span className="ttl">Spatial grammar · Folio &amp; plate</span>
              <span className="meta">REV A · 2026</span>
            </div>
            <hr className="rule" />
          </div>
        </Ex>

        <Do
          tag="DO"
          title="Stamp every interactive surface with a doc-ID."
          body="Top of the page: ● DOCUMENT A &nbsp; subject &nbsp; date · shortcut. It gives the reader a coordinate, and a 0.14em tracking lets it whisper."
          example={
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'center', width: '100%' }}>
              <span className="mono-xs" style={{ letterSpacing: '.14em' }}>● DOCUMENT B</span>
              <span className="mono-xs" style={{ letterSpacing: '.14em', color: 'var(--ink-faint)', textAlign: 'center' }}>FIELD MANUAL · STYLE GUIDE</span>
              <span className="mono-xs" style={{ letterSpacing: '.14em', color: 'var(--ink-faint)' }}>25.05.2026</span>
            </div>
          }
          counterTag="DON'T"
          counterTitle="Centre a logo + nav links at the top."
          counterBody="Reads as marketing chrome. Field-guide pages are documents, not websites — give the reader catalogue metadata, not a brand stamp."
          counterExample={
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28, padding: '8px 0', alignItems: 'center' }}>
              <strong style={{ fontFamily: 'Inter, sans-serif' }}>Arcade I/O™</strong>
              <a style={{ color: 'var(--ink-soft)', border: 0, fontFamily: 'Inter, sans-serif' }}>Product</a>
              <a style={{ color: 'var(--ink-soft)', border: 0, fontFamily: 'Inter, sans-serif' }}>Docs</a>
              <a style={{ color: 'var(--ink-soft)', border: 0, fontFamily: 'Inter, sans-serif' }}>Contact</a>
              <button style={{ padding: '6px 12px', background: 'var(--vermilion)', color: 'white', border: 0, borderRadius: 6 }}>Buy now</button>
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ───────────── Drafting ───────────── */
function Drafting() {
  return (
    <section id="drafting" data-screen-label="04 Drafting">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 04</span>
          <span className="ttl">Drafting · Frames, registration, scale</span>
          <span className="meta">Diagram conventions</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 04</span>
            <h2 style={{ marginTop: 14 }}>The frame is a contract.</h2>
          </div>
          <p className="body">
            Every diagram is a drawn-up document, not an illustration. Corner registration marks declare the active area. A scale bar carries measure. A compass declares North. A title block in the lower-right names the drawing, sheet, scale, draftsman, and rev.
          </p>
        </div>

        <Ex
          n="04.1"
          title="Frame · registration crosses · centreline"
          stamp="DRAFT · 01"
          meta="DIAGRAM FRAME"
          notes={[
            ['Corner marks', 'L-shape · 16 px arm · 0.5 px stroke'],
            ['Centreline', 'Dashed 2 4 · 25% opacity'],
            ['Subject', 'Solid 1.25 px stroke · ink'],
            ['Inset bg', '--paper-2 only when needed for line legibility']
          ]}
        >
          <FigCornerRegistration />
        </Ex>

        <Ex
          n="04.2"
          title="Scale bar &amp; compass"
          stamp="DRAFT · 02"
          meta="REFERENCE PRIMITIVES"
          notes={[
            ['Scale bar', '5 tick marks · indicative length only'],
            ['Compass', 'r 22 · solid arrowhead in --ink'],
            ['Placement', 'Always bottom-right area, outside subject']
          ]}
        >
          <FigScaleBarCompass />
        </Ex>

        <Do
          tag="DO"
          title="Use 0.5 px hairlines for non-structural elements."
          body="Frame borders, sub-rules, and decorative ticks at half-pixel. Reserve 1.25–1.5 px for the structural outlines of subjects and 1.5–2 px for primary signal wires."
          example={
            <svg viewBox="0 0 220 80" className="live" style={{ width: 220 }}>
              <g className="ink">
                <line x1="10" y1="20" x2="210" y2="20" strokeWidth=".5" />
                <text x="10" y="36" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>0.5 PX · HAIRLINE</text>
                <line x1="10" y1="50" x2="210" y2="50" strokeWidth="1.25" />
                <text x="10" y="66" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>1.25 PX · STRUCTURE</text>
              </g>
            </svg>
          }
          counterTag="DON'T"
          counterTitle="Layer a 39px grid behind a line diagram."
          counterBody="The grid was the most-deleted element from v1. Drafting paper grid fights every line in the figure and turns the page into graph paper instead of a manual. The frame and crosshair already locate the subject."
          counterExample={
            <div style={{
              background: 'repeating-linear-gradient(0deg, transparent 0 19px, var(--rule-soft) 19px 19.5px), repeating-linear-gradient(90deg, transparent 0 19px, var(--rule-soft) 19px 19.5px), var(--paper)',
              padding: 20, width: 220
            }}>
              <svg viewBox="0 0 180 60" className="live" style={{ width: '100%' }}>
                <rect x="20" y="14" width="140" height="32" className="ink" strokeWidth="1.25" />
                <text x="90" y="36" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>subject fights grid</text>
              </svg>
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ───────────── Leader lines ───────────── */
function Leader() {
  return (
    <section id="leader" data-screen-label="05 Leaders">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 05</span>
          <span className="ttl">Leader lines · Anatomy of a callout</span>
          <span className="meta">Annotation rules</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 05</span>
            <h2 style={{ marginTop: 14 }}>Anchor, bend, tag.</h2>
          </div>
          <p className="body">
            A callout is four things in order: an anchor dot on the subject, a single polyline, one orthogonal bend, and a filled circle bearing a number. Eleven matter. Twelve is too many; eight is fine.
          </p>
        </div>

        <Ex
          n="05.1"
          title="Anatomy of a callout"
          stamp="LEADER · 01"
          meta="ANCHOR → BEND → TAG → NUMBER"
          notes={[
            ['Anchor', 'Solid 3 px circle ON the subject edge'],
            ['Leader', '0.75 px polyline · 90° bend at most ONCE'],
            ['Tag', 'r 13 filled circle · ink (or vermilion only for hero)'],
            ['Number', 'Geist Mono 11 px · paper colour · centred']
          ]}
        >
          <FigLeaderAnatomy />
        </Ex>

        <Do
          tag="DO"
          title="One bend, perpendicular, into clean margin."
          body="Take the leader straight out, bend once at 90°, and land the tag in a quiet margin. Test all four corners before declaring done."
          example={
            <svg viewBox="0 0 280 140" className="live" style={{ width: '100%' }}>
              <rect x="40" y="40" width="120" height="40" className="ink" strokeWidth="1.25" />
              <polyline points="100,80 100,110 200,110" className="ink hair" strokeWidth=".75" />
              <circle cx="100" cy="80" r="3" className="ink-fill fill-only" />
              <circle cx="214" cy="110" r="14" className="ink-fill fill-only" />
              <text x="214" y="114" textAnchor="middle" className="lbl-num fill-only" stroke="none" style={{ fontSize: 11 }}>07</text>
            </svg>
          }
          counterTag="DON'T"
          counterTitle="Cross other leaders. Curve them."
          counterBody="A crossed leader looks like a wiring mistake, which is the opposite of the field-manual message. Bezier curves read as illustrative — they fight the document tone."
          counterExample={<FigBadLeader />}
        />

        <Do
          tag="DO"
          title="Test the corners: title block, scale bar, neighbour tags."
          body="Every diagram has three failure zones for callouts: the title block (lower-right), the scale bar / compass (lower-left), and adjacent tags. Before shipping, dry-run all four corners."
          example={
            <svg viewBox="0 0 280 140" className="live" style={{ width: '100%' }}>
              <g className="ink hair">
                <rect x="10" y="10" width="260" height="120" />
                <g transform="translate(180 100)">
                  <rect x="0" y="0" width="80" height="24" />
                  <text x="40" y="14" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>TITLE BLOCK</text>
                </g>
                <g transform="translate(20 100)">
                  <line x1="0" y1="12" x2="60" y2="12" />
                  <text x="0" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>SCALE</text>
                </g>
                <circle cx="120" cy="118" r="12" className="ink-fill fill-only" />
                <text x="120" y="122" textAnchor="middle" className="lbl-num fill-only" stroke="none" style={{ fontSize: 10 }}>04</text>
                <text x="120" y="138" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8, fill: 'var(--vermilion)' }}>safe alley between</text>
              </g>
            </svg>
          }
          counterTag="DON'T"
          counterTitle="Park the tag on top of the scale bar."
          counterBody="A 14-px tag inside the scale-bar's ±5 px tick zone hides both. The fix is mechanical: move the tag horizontally outside the scale bar's X range, or vertically below the bar's Y."
          counterExample={
            <svg viewBox="0 0 280 140" className="live" style={{ width: '100%' }}>
              <g>
                <line x1="20" y1="100" x2="180" y2="100" className="ink hair" />
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1={20 + i * 40} y1="95" x2={20 + i * 40} y2="105" className="ink hair" />
                ))}
                <text x="20" y="118" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>0  20  40  60  80 mm</text>
                <circle cx="80" cy="100" r="14" fill="var(--vermilion)" />
                <text x="80" y="104" textAnchor="middle" className="lbl-num fill-only" stroke="none" style={{ fontSize: 10 }}>04</text>
              </g>
            </svg>
          }
        />
      </div>
    </section>
  );
}

/* ───────────── Schematic ───────────── */
function SchematicChapter() {
  return (
    <section id="schematic" data-screen-label="06 Schematic">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 06</span>
          <span className="ttl">Schematic primitives</span>
          <span className="meta">Symbols · simplified</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 06</span>
            <h2 style={{ marginTop: 14 }}>Read at a glance.</h2>
          </div>
          <p className="body">
            Symbols are simplified for one-pass reading. Component bodies are 1.25 px stroke; pins and wires step down to 0.5–0.75 px. Polarity dots are filled, not annotated. Where the symbol is conventional, use the convention — don't invent.
          </p>
        </div>

        <div className="primitives">
          <Primitive name="Resistor" use="Pull-up · gate R · bias">
            <FigSchematic kind="resistor" />
          </Primitive>
          <Primitive name="Capacitor" use="Decoupling · bulk · filter">
            <FigSchematic kind="cap" />
          </Primitive>
          <Primitive name="Diode" use="Reverse protection · flyback">
            <FigSchematic kind="diode" />
          </Primitive>
          <Primitive name="N-MOSFET" use="Low-side sink · driver">
            <FigSchematic kind="mosfet" />
          </Primitive>
          <Primitive name="Switch (NO)" use="Cabinet switch · button">
            <FigSchematic kind="switch" />
          </Primitive>
          <Primitive name="GND symbol" use="Ground reference">
            <FigSchematic kind="gnd" />
          </Primitive>
          <Primitive name="Signal arrow" use="Direction of flow">
            <FigSchematic kind="arrow" />
          </Primitive>
          <Primitive name="Optional footprint" use="Population option">
            <svg viewBox="0 0 120 60" className="live" style={{ width: 120 }}>
              <rect x="20" y="14" width="80" height="32" className="ink hair" strokeDasharray="4 3" />
              <text x="60" y="34" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>(U6 opt)</text>
            </svg>
          </Primitive>
        </div>

        <Do
          tag="DO"
          title="Label values inline, units once per diagram."
          body="100nF lives next to its cap, 10kΩ lives next to its resistor. Don't repeat the unit in every label — declare it once in the figure caption."
          example={
            <svg viewBox="0 0 260 80" className="live" style={{ width: 260 }}>
              <g className="ink" strokeWidth="1.25">
                <line x1="10" y1="40" x2="50" y2="40" />
                <rect x="50" y="32" width="40" height="16" />
                <line x1="90" y1="40" x2="130" y2="40" />
                <text x="70" y="26" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>10k</text>
                <line x1="130" y1="40" x2="170" y2="40" />
                <line x1="170" y1="28" x2="170" y2="40" />
                <line x1="160" y1="28" x2="180" y2="28" />
                <line x1="160" y1="24" x2="180" y2="24" />
                <text x="200" y="26" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>100n</text>
              </g>
              <text x="130" y="76" textAnchor="middle" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>Ω · F implied by caption</text>
            </svg>
          }
          counterTag="DON'T"
          counterTitle="Decorate symbols with shadows, gradients, or rounded corners."
          counterBody="A drop shadow on a MOSFET is not 'editorial polish' — it's a regression to clip art. Stay flat, stay hairline."
          counterExample={
            <svg viewBox="0 0 260 80" className="live" style={{ width: 260 }}>
              <defs>
                <filter id="bad-shadow"><feDropShadow dx="2" dy="2" stdDeviation="1" floodOpacity=".3" /></filter>
              </defs>
              <rect x="60" y="32" width="40" height="16" rx="8" fill="var(--paper-2)" stroke="var(--vermilion)" strokeWidth="1.5" filter="url(#bad-shadow)" />
              <text x="130" y="42" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9, fill: 'var(--vermilion)' }}>← rounded, shadowed, coloured</text>
            </svg>
          }
        />
      </div>
    </section>
  );
}

/* ───────────── Components ───────────── */
function ComponentsChapter() {
  return (
    <section id="components" data-screen-label="07 Components">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 07</span>
          <span className="ttl">Components · catalogue</span>
          <span className="meta">Live · interactive</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 07</span>
            <h2 style={{ marginTop: 14 }}>One pattern per job.</h2>
          </div>
          <p className="body">
            The full catalogue. Use them as-is; don't invent variations. If a job isn't covered here, add the variant to this guide first.
          </p>
        </div>

        <Ex
          n="07.1"
          title="Callout number"
          stamp="UI · 01"
          meta="ROLE · TAG"
          notes={[
            ['Default', 'Filled ink · paper text'],
            ['Hero', 'Filled vermilion · paper text — ONCE per spread'],
            ['Outline', 'Stroke ink · ink text — secondary'],
            ['Size', '22–30 px diameter']
          ]}
        >
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <span className="callout-num">01</span>
            <span className="callout-num verm">01</span>
            <span className="callout-num outline">01</span>
            <span className="callout-num" style={{ width: 30, height: 30 }}>11</span>
          </div>
        </Ex>

        <Ex
          n="07.2"
          title="Metric card"
          stamp="UI · 02"
          meta="STAT · KEY NUMBER"
          notes={[
            ['Number', 'Geist 32 px · -0.035em tracking'],
            ['Label', 'Mono 10 px · uppercase'],
            ['Bar', '4 px lane colour · left edge'],
            ['Sub-label', '<em> · ink-faint · 2 px below']
          ]}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, width: 360, border: '.5px solid var(--rule)', borderRight: 0, borderBottom: 0 }}>
            <div className="stat" style={{ '--lane': 'var(--inkblue)' }}>
              <span className="stat-bar" />
              <span className="stat-n">32</span>
              <span className="stat-lbl">Digital inputs<br/><em>switch to ground</em></span>
            </div>
            <div className="stat" style={{ '--lane': 'var(--vermilion)' }}>
              <span className="stat-bar" />
              <span className="stat-n">2–4</span>
              <span className="stat-lbl">Spinner ports<br/><em>quadrature A/B</em></span>
            </div>
          </div>
        </Ex>

        <Ex
          n="07.3"
          title="Spec table"
          stamp="UI · 03"
          meta="LABEL × VALUE"
          notes={[
            ['Label', 'Mono 10 px · uppercase · ink-faint'],
            ['Value', 'Mono 13 px · ink'],
            ['Divider', '0.5 px rule-soft between rows'],
            ['Pad', '11 px vertical']
          ]}
        >
          <table className="spec" style={{ maxWidth: 420 }}>
            <tbody>
              <tr><td className="label">Class</td><td className="val">USB I/O Carrier Board</td></tr>
              <tr><td className="label">Brain</td><td className="val">Raspberry Pi Pico H · RP2040</td></tr>
              <tr><td className="label">Status</td><td className="val"><span className="dot verm" />Prototype Stream</td></tr>
            </tbody>
          </table>
        </Ex>

        <Ex
          n="07.4"
          title="Pre / Code well"
          stamp="UI · 04"
          meta="VERBATIM · MONO"
          notes={[
            ['Background', '--paper (matches ground)'],
            ['Border', '0.5 px ink rule'],
            ['Font', 'Geist Mono 12 px / 1.6'],
            ['Padding', '22 px']
          ]}
        >
          <pre className="loop-pre" style={{ maxWidth: 460 }}>{`> AIO?
< AIO v0.1 OK · 32D 8A 4S 10L
> LED 0 255       ; full brightness
> PULSE 3 250     ; pulse channel 3
< OK`}</pre>
        </Ex>

        <Ex
          n="07.5"
          title="Master / detail explorer"
          stamp="UI · 05"
          meta="11+ ITEMS · CLICK-DRIVEN"
          notes={[
            ['Pattern', 'Tab list (left) + detail panel (right)'],
            ['Active state', 'Inverted (ink fill, paper text)'],
            ['Connection', 'Click figure → activates tab'],
            ['Don\'t use a 3-col card grid for 11+ items']
          ]}
        >
          <div style={{ width: '100%', maxWidth: 640, border: '.5px solid var(--rule)', background: 'var(--paper)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
              <div style={{ borderRight: '.5px solid var(--rule)' }}>
                {['01', '02', '03'].map((n, i) => (
                  <div key={n} style={{
                    padding: '10px 14px',
                    background: i === 0 ? 'var(--ink)' : 'transparent',
                    color: i === 0 ? 'var(--paper)' : 'var(--ink)',
                    borderBottom: '.5px solid var(--rule-soft)',
                    fontFamily: 'var(--mono)', fontSize: 11
                  }}>{n} · Block</div>
                ))}
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Active</div>
                <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>Block 01 — content here</div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 6 }}>Detail body, spec table, mini diagram, prev/next.</div>
              </div>
            </div>
          </div>
        </Ex>
      </div>
    </section>
  );
}

/* ───────────── Voice ───────────── */
function Voice() {
  return (
    <section id="voice" data-screen-label="08 Voice">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 08</span>
          <span className="ttl">Voice · Copy conventions</span>
          <span className="meta">Tone · 6 rules</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 08</span>
            <h2 style={{ marginTop: 14 }}>Declarative. Specific. Quiet.</h2>
          </div>
          <p className="body">
            The voice is a senior engineer writing for a colleague — confident, declarative, never selling. No exclamation. No hedging. Specific values over vague qualifiers. Em-dashes for asides; colons before lists; periods at the end of full sentences in body copy.
          </p>
        </div>

        <Do
          tag="DO"
          title='"Connectors dominate the small-batch BOM."'
          body="Declarative, specific, claims something. The reader knows what to do after reading it (don't over-optimise the MCU)."
          example={<p className="body" style={{ fontSize: 16, margin: 0 }}>Connectors dominate the small-batch BOM. Don't over-optimise the MCU.</p>}
          counterTag="DON'T"
          counterTitle='"This BOM contains some helpful items 🎉"'
          counterBody="Hedged. Vague. Decorated with an emoji. Reader leaves with nothing actionable."
          counterExample={<p className="body" style={{ fontSize: 16, margin: 0 }}>This BOM contains some helpful items that you might want to consider when planning! 🎉</p>}
        />

        <Do
          tag="DO"
          title="Number every figure. Reference by number."
          body="FIG. 01, FIG. 02, FIG. 05.1. Inline reference: 'see Fig. 03'. The reader navigates by coordinate, not by spatial direction."
          example={<p className="body" style={{ fontSize: 14, margin: 0 }}>The MOSFET row sinks each output to ground (see Fig. 07).</p>}
          counterTag="DON'T"
          counterTitle="Reference by spatial direction."
          counterBody="'See the diagram below' / 'as shown above' breaks on mobile, breaks when sections are reordered, and tells the reader nothing about where to find it."
          counterExample={<p className="body" style={{ fontSize: 14, margin: 0, color: 'var(--vermilion)' }}>The MOSFET row sinks each output to ground (see the diagram below).</p>}
        />

        <Do
          tag="DO"
          title="Use real values, not 'fast / cheap / quality'."
          body="$35–$55. 32 inputs. 12-bit. 1 ms loop. Real numbers anchor the claim and let the reader plan."
          example={<p className="body" style={{ fontSize: 14, margin: 0 }}>Budget $35–$55 per populated board. The 1 ms scan loop reports HID at &lt; 2 ms latency.</p>}
          counterTag="DON'T"
          counterTitle="Speak in qualities."
          counterBody="'Affordable, low-latency, scalable' — three words, zero information. Specifics are easier to write and harder to argue with."
          counterExample={<p className="body" style={{ fontSize: 14, margin: 0, color: 'var(--vermilion)' }}>Affordable and low-latency, with a scalable architecture.</p>}
        />
      </div>
    </section>
  );
}

/* ───────────── Pre-flight checks ───────────── */
const CHECKS = [
  ['Folio bar at section top, hairline below', 'Number · title · meta — same pattern every plate.'],
  ['Vermilion on ≤ 2 surfaces per spread', 'Section eyebrow counts. Don\'t tip past two.'],
  ['Callout tags do not touch each other or the title block', 'Test each corner; r = 13 → keep ≥ 30 px between centres.'],
  ['Scale bar X-range is callout-free', 'Move tags vertically below the bar, or laterally past 80 mm.'],
  ['One weight per headline', 'No mid-sentence italic, no light/heavy swap.'],
  ['Tabular numerals on every numeric column', 'BOM, capacity math, metric cards.'],
  ['No grid background behind line diagrams', 'Frame + crosshair already locate the subject.'],
  ['No rounded corners > 12 px on any technical element', 'Cards, frames, MOSFETs, terminals — all square or tight.'],
  ['Mono labels for metadata, sans for prose, never mix inside a word', 'Geist + Geist Mono are siblings, not interchangeable.'],
  ['Tables have explicit <tbody>', 'Avoids React reconciler warnings + parser quirks.'],
  ['Diagrams open with a FIG. NN label', 'Even mini-diagrams in detail panels.'],
  ['Body copy max 62ch, lede max 64ch', 'Past that, readers skip the paragraph.']
];

function Checks() {
  return (
    <section id="checks" data-screen-label="09 Checks">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 09</span>
          <span className="ttl">Pre-flight checks</span>
          <span className="meta">Run before you ship · 12 items</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 09</span>
            <h2 style={{ marginTop: 14 }}>Twelve passes. Each one earned.</h2>
          </div>
          <p className="body">
            Each item below caused a defect on the way to v1. Tick them all before you call a plate finished. They're listed in order of how often they bite.
          </p>
        </div>

        <div className="checks">
          {CHECKS.map(([t, sub], i) => (
            <div className="check" key={i}>
              <div className="check-box">{String(i + 1).padStart(2, '0')}</div>
              <div className="check-text">
                {t}
                <em>{sub}</em>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Hard don'ts ───────────── */
const HARD_DONTS = [
  {
    t: "Don't centre running body copy.",
    b: "Centred prose breaks the rag and forces the eye to refind the left edge every line. Centre only single-line elements: stat numerals, endmark glyphs, the compass.",
    earned: "v1 colophon centred a paragraph; the eye lost the rag at line 2."
  },
  {
    t: "Don't ship a 3-column card grid for >8 items.",
    b: "Beyond eight items, a grid of detail cards turns into wallpaper. Move to a master / detail explorer: a tab list focuses attention; a single active detail respects the reader.",
    earned: "v1 anatomy was 11 cards in a 3-col grid; nothing felt connected to the figure."
  },
  {
    t: "Don't paint a colour on every callout chip.",
    b: "Lane colour belongs to a swatch beside a label, not in the chip's fill. Otherwise the page acquires a rainbow that costs the hero accent its meaning.",
    earned: "v1 used four chip fill colours; vermilion stopped meaning anything."
  },
  {
    t: "Don't decorate headlines with serif italic if you don't have a serif voice.",
    b: "Mid-headline italic in a font family you don't otherwise use reads as a typographic accident, not editorial colour. If the phrase needs different weight, give it a different element.",
    earned: "v1 used Newsreader italic on alternating headline halves; pulled in v2."
  },
  {
    t: "Don't put a giant grid behind a technical drawing.",
    b: "Drafting grid behind a line subject is graph paper, not a manual. It competes with every stroke. Use registration corners and a faint centreline instead.",
    earned: "v1 anatomy and signal-flow figures both had 39 px grid backgrounds; both removed."
  },
  {
    t: "Don't let the callout circle clip the title block, scale bar, or another tag.",
    b: "All three are common collision zones. After placing a callout, run a mental box check on its 14 px radius against the figure's lower-right corner (title block) and lower-left (scale + compass).",
    earned: "v1 had three collision regressions across two figures — `02 + SCALE`, `08 + title block`, `04 + scale bar`."
  },
  {
    t: "Don't write 'see screenshot above / below'.",
    b: "Spatial direction breaks the moment the layout changes. Always reference figures by FIG.NN. Reorder safely; ship references confidently.",
    earned: "Stripe.dev does this well; we adopted FIG. labels everywhere."
  },
  {
    t: "Don't show every micro-feature in the BOM.",
    b: "Group by subsystem: chip, transistors, passives, protection, PCB, connectors. The reader plans by subsystem, not by Digi-Key SKU.",
    earned: "v1 listed individual capacitor values; cut for clarity, no information lost."
  },
  {
    t: "Don't make terminal labels tiny on field-wiring diagrams.",
    b: "Cabinet wirers read at arm's length under bad light. 11 px mono uppercase minimum on any connector face. Readability is a feature, not polish.",
    earned: "The carrier itself takes this seriously; the guide diagrams must too."
  },
  {
    t: "Don't ship a fixed-width pre that overflows on mobile.",
    b: "Code wells are common offenders. overflow-x: auto on .loop-pre and min-width: 0 on the flex/grid parent. Never widen the cell to accommodate code.",
    earned: "Verifier flagged a 63 px horizontal overflow in signal flow at 924 px iframe width."
  }
];

function HardDonts() {
  return (
    <section id="dont" data-screen-label="10 Don'ts">
      <div className="wrap">
        <div className="folio">
          <span className="num">CHAPTER 10</span>
          <span className="ttl">Hard don'ts · Lessons earned</span>
          <span className="meta">10 items · each came from a defect</span>
        </div>
        <hr className="rule" />

        <div className="sg-chap-head">
          <div>
            <span className="sg-eyebrow">/Chapter 10</span>
            <h2 style={{ marginTop: 14 }}>Things this book broke on, so you don't.</h2>
          </div>
          <p className="body">
            Each don't below caused a real defect during v1. They are the inverse of the obvious advice — they specifically describe traps that looked correct until shipped.
          </p>
        </div>

        <div className="hd-list" style={{ marginTop: 32 }}>
          {HARD_DONTS.map((d, i) => (
            <div className="hd" key={i}>
              <div className="hd-n">
                <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>NO.</span>
                <span className="hd-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <div className="hd-t">{d.t}</div>
                <p className="body" style={{ marginTop: 8, fontSize: 14 }}>{d.b}</p>
                <div className="hd-earned">
                  <span className="mono-xs" style={{ color: 'var(--vermilion)' }}>EARNED FROM</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)', marginLeft: 10 }}>{d.earned}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="rule" style={{ marginTop: 56 }} />
        <div className="endmark">
          <div className="endmark-bar" />
          <div className="endmark-text">
            <span style={{ fontSize: 22, color: 'var(--ink)' }}>End of style guide.</span>
            <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>DOC B · REV A · MAY 2026 · 10 / 10</span>
          </div>
          <div className="endmark-bar" />
        </div>
      </div>
    </section>
  );
}

/* ───────────── Helpers ───────────── */

function Primitive({ name, use, children }) {
  return (
    <div className="prim">
      <div className="prim-canvas">{children}</div>
      <span className="prim-name">{name}</span>
      <span className="prim-use">{use}</span>
    </div>
  );
}

function Ex({ n, title, stamp, meta, notes = [], children }) {
  return (
    <div className="ex">
      <div className="ex-stamp">
        <span className="n">EX.{n}</span>
        <span className="v">{stamp}</span>
      </div>
      <div className="ex-body">
        <div className="ex-head">
          <span className="ex-title">{title}</span>
          <span className="ex-meta">{meta}</span>
        </div>
        <div className="ex-canvas">{children}</div>
        {notes.length > 0 && (
          <dl className="ex-notes">
            {notes.map(([k, v], i) => (
              <div className="ex-note" key={i}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

function Do({ tag, title, body, example, counterTag, counterTitle, counterBody, counterExample }) {
  return (
    <div className="dxdo">
      <div className="dxdo-cell">
        <div className="dxdo-tag do"><span className="mark">✓</span>{tag}</div>
        <div className="dxdo-title">{title}</div>
        <p className="dxdo-body">{body}</p>
        <div className="dxdo-mini">
          <div className="dxdo-mini-cv">{example}</div>
        </div>
      </div>
      <div className="dxdo-cell">
        <div className="dxdo-tag dont"><span className="mark">✕</span>{counterTag}</div>
        <div className="dxdo-title">{counterTitle}</div>
        <p className="dxdo-body">{counterBody}</p>
        <div className="dxdo-mini">
          <div className="dxdo-mini-cv bad">{counterExample}</div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Mount ───────────── */
function App() {
  return (
    <>
      <Foundations />
      <TypeChapter />
      <Spatial />
      <Drafting />
      <Leader />
      <SchematicChapter />
      <ComponentsChapter />
      <Voice />
      <Checks />
      <HardDonts />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('sg-root')).render(<App />);
