/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ============================================================
   PLATE 01 — ANATOMY (the big specimen)
   Big top-down exploded ink drawing with leader-line callouts
   numbered 01 → 11. Hover/click any callout to highlight + show
   details in the legend below.
   ============================================================ */

const CALLOUTS = [
  {
    n: '01', tone: 'verm',
    title: 'Raspberry Pi Pico H',
    eyebrow: 'Central brain · USB',
    body: "USB HID and CDC serial run from the Pico. PIO state machines decode quadrature spinners. PWM outputs drive LED brightness. The Pico H pre-soldered headers and debug connector make v0.1 lower-risk than integrating a bare RP2040.",
    spec: [
      ['USB', 'HID + CDC serial'],
      ['Logic', '3.3V · PIO · PWM'],
      ['Migration', 'Bare RP2040 only after pinout/protocol stabilise']
    ]
  },
  {
    n: '02', tone: 'blue',
    title: 'U1–U4 · 74HC165',
    eyebrow: 'Digital input expander',
    body: "Parallel-in / serial-out shift registers chained four-deep. The Pico spends only three GPIO lines to read 32 independent switch inputs. No matrix means no ghosting; every cabinet combo is readable.",
    spec: [
      ['Pico lines', 'DATA · CLOCK · LATCH/LOAD'],
      ['Capacity', '8 inputs per chip · ×4 = 32 inputs'],
      ['Expansion', '+2 chips → 48-input variant'],
      ['Why', 'No ghosting; easy to scan every millisecond']
    ]
  },
  {
    n: '03', tone: 'blue',
    title: 'J_DIGITAL · Switch input bank',
    eyebrow: 'Cabinet switch wiring',
    body: "32 inputs standard, in 4× 8-position groups. Buttons, digital joystick directions, coin/start/service/admin inputs — all wire as normally-open contacts to ground. Pull-ups live on the carrier.",
    spec: [
      ['Signal', 'IN0–IN31'],
      ['Electrical', 'Input pulled up to 3.3V; switch shorts to GND'],
      ['Firmware', 'Per-input debounce, optional shift/admin mapping']
    ]
  },
  {
    n: '04', tone: 'green',
    title: 'U5 · MCP3208',
    eyebrow: 'Analog conversion',
    body: "8-channel 12-bit SPI ADC. Gives the design enough analog channels for four Hall-effect joysticks, or a mix of sticks, levers, pots, and sliders. A second footprint is laid for analog-heavy cabinets but normally unpopulated.",
    spec: [
      ['Bus', 'SPI MOSI · MISO · SCK · CS'],
      ['Resolution', '12-bit · 8 channels'],
      ['Default', 'One populated MCP3208'],
      ['Optional', 'Second MCP3208 footprint → 16 channels']
    ]
  },
  {
    n: '05', tone: 'green',
    title: 'J_ANALOG · Hall / pot inputs',
    eyebrow: 'Analog terminal bank',
    body: "Raw analog controls feed straight into the ADC. Firmware handles calibration, center, deadzone, smoothing, inversion, and HID axis scaling — so the carrier accepts Hall sticks, levers, pots and sliders without an integrated joystick board.",
    spec: [
      ['Signal', '3V3 · GND · A0–A7'],
      ['Four Hall sticks', 'X/Y × 4 = all 8 channels'],
      ['Preferred', '0–3.3V analog output'],
      ['5V Hall modules', 'Use divider/protection; calibrate min/max']
    ]
  },
  {
    n: '06', tone: 'verm',
    title: 'J_SPIN · Quadrature spinners',
    eyebrow: 'Rotary signal',
    body: "Spinners feed the Pico directly as A/B quadrature signals. Firmware can emit mouse X/Y movement (existing arcade convention) or signed deltas for Unity-specific behaviour.",
    spec: [
      ['Pinout', '+5V · GND · A · B per spinner'],
      ['Typical use', 'SpinTrak mapped to left/right mouse movement'],
      ['Protection', 'Make A/B 3.3V-safe before Pico GPIO'],
      ['Firmware', 'PIO or interrupt quadrature decoder']
    ]
  },
  {
    n: '07', tone: 'gold',
    title: 'Q1–Q10 · LED sinks',
    eyebrow: 'Cabinet feedback',
    body: "Discrete logic-level N-MOSFETs feed ten OUT0–OUT9 terminals. For this cabinet count, simpler than a dedicated LED driver. The load connects between VLED+ and OUTx; the board switches the ground side under PWM control.",
    spec: [
      ['Outputs', 'OUT0–OUT9'],
      ['Control', 'PWM brightness per channel'],
      ['Load', 'LEDs / cabinet lamps with appropriate current limiting'],
      ['Caution', 'Add flyback protection before driving relays/solenoids']
    ]
  },
  {
    n: '08', tone: 'gold',
    title: 'J_LED_POWER',
    eyebrow: 'Power domains',
    body: "USB powers the logic only. LED / lamp current comes from an external 5V or 12V supply through a fuse/polyfuse and reverse-protection path. Grounds are tied on the board at the star point.",
    spec: [
      ['Logic', 'USB → Pico → 3.3V logic'],
      ['LEDs', 'External VLED+ and GND'],
      ['Protection', 'Fuse/polyfuse, reverse protection, bulk cap'],
      ['Layout', 'Keep LED current away from ADC ground paths']
    ]
  },
  {
    n: '09', tone: 'ink',
    title: 'USB · to PC / Unity host',
    eyebrow: 'Host connection',
    body: "The board is useful even before a Unity integration exists. Inputs appear as standard HID devices and LED commands ride a CDC serial text protocol until the vendor HID output protocol is mature.",
    spec: [
      ['Inputs', 'HID gamepad + HID mouse'],
      ['LED commands', 'CDC serial text protocol'],
      ['Unity', 'Input System for HID; SerialPort for v0.1 LED control'],
      ['Future', 'Vendor HID output reports can replace serial later']
    ]
  }
];

function Anatomy() {
  const [active, setActive] = useState('01');
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('play'); });
    }, { threshold: .12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const set = (n) => setActive(n);
  const isActive = (n) => active === n;
  const isDim = (n) => active && active !== n;

  const activeCallout = CALLOUTS.find(c => c.n === active) || CALLOUTS[0];

  return (
    <div>
      <div className="anatomy-svg-wrap">
        <svg
          ref={ref}
          className="draw-on-view"
          viewBox="0 0 1280 880"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Exploded technical drawing of the Arcade I/O Pico Carrier v0.1"
        >
          {/* ============ Reference grid removed for legibility ============ */}

          {/* Crosshair centerlines */}
          <g className="ink hair" opacity=".25">
            <line x1="640" y1="60" x2="640" y2="820" strokeDasharray="2 6" />
            <line x1="120" y1="440" x2="1160" y2="440" strokeDasharray="2 6" />
          </g>

          {/* Corner registration crosses */}
          <g className="ink hair">
            {[[60, 60], [1220, 60], [60, 820], [1220, 820]].map(([cx, cy], i) => (
              <g key={i}>
                <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} />
                <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} />
                <circle cx={cx} cy={cy} r="5" />
              </g>
            ))}
          </g>

          {/* Title block — bottom-right */}
          <g transform="translate(960 770)" className="ink hair">
            <rect x="0" y="0" width="260" height="80" />
            <line x1="0" y1="20" x2="260" y2="20" />
            <line x1="0" y1="50" x2="260" y2="50" />
            <line x1="130" y1="20" x2="130" y2="80" />
            <text x="8" y="14" className="lbl fill-only" stroke="none">DRAWING · AIO-PC-001 / 01</text>
            <text x="8" y="40" className="lbl-sm fill-only" stroke="none">NOT TO SCALE</text>
            <text x="138" y="40" className="lbl-sm fill-only" stroke="none">DRWN · A.PRINCEPS</text>
            <text x="8" y="70" className="lbl-sm fill-only" stroke="none">DIAGRAM · SCHEMATIC</text>
            <text x="138" y="70" className="lbl-sm fill-only" stroke="none">REV · A · 2026</text>
          </g>

          {/* Compass removed — orientation is meaningless on a board diagram */}

          {/* Scale bar removed — figure is schematic, not dimensioned */}

          {/* =================================================
              BOARD OUTLINE
              ================================================= */}
          <g className="ink" strokeWidth="1.5">
            <rect x="240" y="180" width="800" height="520" rx="10" />
            {/* mounting holes */}
            {[[270, 210], [1010, 210], [270, 670], [1010, 670]].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="9" />
                <circle cx={cx} cy={cy} r="2.5" className="ink-fill fill-only" stroke="none" />
              </g>
            ))}
            {/* board name silkscreen */}
          </g>
          <text x="640" y="195" className="lbl fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>
            ARCADE · I / O · PICO · CARRIER · v0.1
          </text>
          <text x="640" y="690" className="lbl-sm fill-only" stroke="none" textAnchor="middle">
            SCHEMATIC LAYOUT · NOT TO SCALE
          </text>

          {/* =================================================
              [01] PICO MODULE — center
              ================================================= */}
          <g
            className={`comp ${isActive('01') ? 'is-active' : ''} ${isDim('01') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('01')} onClick={() => set('01')}
            style={{ cursor: 'pointer' }}
          >
            {/* outline */}
            <rect x="540" y="280" width="200" height="320" rx="6" className="ink" strokeWidth="1.5" />
            {/* castellated pins */}
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={'l' + i} className="ink hair">
                <rect x="532" y={296 + i * 15} width="8" height="9" />
                <circle cx="536" cy={300 + i * 15} r="1.5" className="ink-fill fill-only" stroke="none" />
              </g>
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={'r' + i} className="ink hair">
                <rect x="740" y={296 + i * 15} width="8" height="9" />
                <circle cx="744" cy={300 + i * 15} r="1.5" className="ink-fill fill-only" stroke="none" />
              </g>
            ))}
            {/* USB connector */}
            <rect x="610" y="270" width="60" height="14" className="ink hair" />
            {/* RP2040 chip */}
            <rect x="588" y="368" width="104" height="92" className="ink" strokeWidth="1.25" />
            <line x1="588" y1="378" x2="692" y2="378" className="ink hair" />
            <text x="640" y="396" className="lbl fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 11 }}>RP2040</text>
            <text x="640" y="412" className="lbl-sm fill-only" stroke="none" textAnchor="middle">CORTEX-M0+ · 133 MHz</text>
            {/* flash */}
            <rect x="600" y="424" width="32" height="22" className="ink hair" />
            <text x="616" y="438" className="lbl-sm fill-only" stroke="none" textAnchor="middle">W25Q</text>
            {/* xtal */}
            <rect x="648" y="424" width="32" height="22" className="ink hair" />
            <text x="664" y="438" className="lbl-sm fill-only" stroke="none" textAnchor="middle">12MHz</text>
            {/* boot/run buttons */}
            <rect x="600" y="476" width="32" height="14" className="ink hair" />
            <text x="616" y="486" className="lbl-sm fill-only" stroke="none" textAnchor="middle">BOOT</text>
            <rect x="648" y="476" width="32" height="14" className="ink hair" />
            <text x="664" y="486" className="lbl-sm fill-only" stroke="none" textAnchor="middle">RUN</text>
            {/* LED indicator */}
            <circle cx="616" cy="510" r="4" className="ink hair" />
            <text x="630" y="514" className="lbl-sm fill-only" stroke="none">LED</text>
            {/* debug header */}
            <g className="ink hair">
              {Array.from({ length: 3 }).map((_, i) => (
                <rect key={i} x={620 + i * 12} y="540" width="8" height="8" />
              ))}
            </g>
            <text x="640" y="562" className="lbl-sm fill-only" stroke="none" textAnchor="middle">SWD</text>

            {/* module label at top */}
            <text x="640" y="262" className="lbl fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 10 }}>
              RASPBERRY · PI · PICO · H
            </text>
          </g>

          {/* =================================================
              [02] 74HC165 chain — above pico
              ================================================= */}
          <g
            className={`comp ${isActive('02') ? 'is-active' : ''} ${isDim('02') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('02')} onClick={() => set('02')}
            style={{ cursor: 'pointer' }}
          >
            {[0, 1, 2, 3].map(i => (
              <g key={i} transform={`translate(${288 + i * 56} 230)`}>
                <rect x="0" y="0" width="44" height="32" className="ink" strokeWidth="1.25" />
                {/* pins top */}
                {Array.from({ length: 8 }).map((_, j) => (
                  <g key={j} className="ink hair">
                    <rect x={3 + j * 5} y="-4" width="2" height="4" />
                  </g>
                ))}
                {/* pins bottom */}
                {Array.from({ length: 8 }).map((_, j) => (
                  <g key={j} className="ink hair">
                    <rect x={3 + j * 5} y="32" width="2" height="4" />
                  </g>
                ))}
                <text x="22" y="14" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>74HC165</text>
                <text x="22" y="26" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>U{i + 1}</text>
                {/* dot indicator */}
                <circle cx="6" cy="6" r="1.5" className="ink-fill fill-only" stroke="none" />
              </g>
            ))}
            {/* serial chain arrow */}
            <g className="blue hair">
              <line x1="332" y1="246" x2="344" y2="246" strokeDasharray="2 2" />
              <line x1="388" y1="246" x2="400" y2="246" strokeDasharray="2 2" />
              <line x1="444" y1="246" x2="456" y2="246" strokeDasharray="2 2" />
            </g>
          </g>

          {/* =================================================
              [03] J_DIGITAL — top edge terminals (32 pins, 4 banks)
              ================================================= */}
          <g
            className={`comp ${isActive('03') ? 'is-active' : ''} ${isDim('03') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('03')} onClick={() => set('03')}
            style={{ cursor: 'pointer' }}
          >
            {[0, 1, 2, 3].map(bank => (
              <g key={bank} transform={`translate(${260 + bank * 130} 180)`}>
                {/* bank divider */}
                <rect x="0" y="-16" width="120" height="16" className="ink hair" />
                <text x="60" y="-4" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>
                  IN{bank * 8}–{bank * 8 + 7}
                </text>
                {/* 8 terminal pins per bank */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    <rect x={4 + i * 14} y="-32" width="10" height="16" className="ink hair" />
                    <circle cx={9 + i * 14} cy="-24" r="1.5" className="ink-fill fill-only" stroke="none" />
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* =================================================
              [04] MCP3208 ADC
              ================================================= */}
          <g
            className={`comp ${isActive('04') ? 'is-active' : ''} ${isDim('04') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('04')} onClick={() => set('04')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="416" y="600" width="60" height="40" className="ink" strokeWidth="1.25" />
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} className="ink hair">
                <rect x={420 + i * 7} y="640" width="2" height="6" />
              </g>
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} className="ink hair">
                <rect x={420 + i * 7} y="594" width="2" height="6" />
              </g>
            ))}
            <circle cx="422" cy="606" r="1.5" className="ink-fill fill-only" stroke="none" />
            <text x="446" y="619" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>MCP3208</text>
            <text x="446" y="631" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>U5</text>

            {/* second footprint, dashed (optional) */}
            <rect x="494" y="600" width="60" height="40" className="ink hair" strokeDasharray="3 3" />
            <text x="524" y="619" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>(U6 OPT)</text>
            <text x="524" y="631" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>16-CH BUILD</text>
          </g>

          {/* =================================================
              [05] J_ANALOG — bottom-center terminal bank
              ================================================= */}
          <g
            className={`comp ${isActive('05') ? 'is-active' : ''} ${isDim('05') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('05')} onClick={() => set('05')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="416" y="664" width="140" height="20" className="ink hair" />
            <text x="486" y="678" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>
              3V3 · GND · A0 · A1 · A2 · A3 · A4 · A5 · A6 · A7
            </text>
            {/* 10 terminal pins */}
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <rect x={420 + i * 13} y="684" width="9" height="16" className="ink hair" />
                <circle cx={424.5 + i * 13} cy="692" r="1.5" className="ink-fill fill-only" stroke="none" />
              </g>
            ))}
          </g>

          {/* =================================================
              [06] J_SPIN — LEFT side, 4 ports stacked
              ================================================= */}
          <g
            className={`comp ${isActive('06') ? 'is-active' : ''} ${isDim('06') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('06')} onClick={() => set('06')}
            style={{ cursor: 'pointer' }}
          >
            {[0, 1, 2, 3].map(i => (
              <g key={i} transform={`translate(240 ${320 + i * 60})`}>
                <rect x="-32" y="0" width="32" height="40" className="ink hair" />
                {/* 4 pins per spinner */}
                {[0, 1, 2, 3].map(p => (
                  <g key={p}>
                    <rect x="-44" y={4 + p * 9} width="10" height="6" className="ink hair" />
                    <circle cx="-39" cy={7 + p * 9} r="1" className="ink-fill fill-only" stroke="none" />
                  </g>
                ))}
                <text x="-16" y="14" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>
                  J_SPIN
                </text>
                <text x="-16" y="26" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9, fontWeight: 700 }}>
                  {i}
                </text>
                <text x="-16" y="36" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>
                  +5 G A B
                </text>
              </g>
            ))}
          </g>

          {/* =================================================
              [07] MOSFET ROW · Q1-Q10
              ================================================= */}
          <g
            className={`comp ${isActive('07') ? 'is-active' : ''} ${isDim('07') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('07')} onClick={() => set('07')}
            style={{ cursor: 'pointer' }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i} transform={`translate(${790 + i * 22} 600)`}>
                {/* MOSFET package SOT-23 ish */}
                <rect x="0" y="0" width="14" height="20" className="ink" strokeWidth="1.1" />
                {/* pins */}
                <line x1="3" y1="20" x2="3" y2="26" className="ink hair" />
                <line x1="11" y1="20" x2="11" y2="26" className="ink hair" />
                <line x1="7" y1="0" x2="7" y2="-6" className="ink hair" />
                <text x="7" y="14" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>Q{i + 1}</text>
              </g>
            ))}
            {/* schematic mosfet symbol up top of group */}
            <g transform="translate(840 564)" className="gold">
              <line x1="0" y1="0" x2="14" y2="0" strokeWidth="1.25" />
              <line x1="14" y1="-6" x2="14" y2="6" strokeWidth="1.25" />
              <line x1="14" y1="-4" x2="22" y2="-10" strokeWidth="1.25" />
              <line x1="14" y1="4" x2="22" y2="10" strokeWidth="1.25" />
              <line x1="22" y1="-10" x2="22" y2="-18" strokeWidth="1.25" />
              <line x1="22" y1="10" x2="22" y2="18" strokeWidth="1.25" />
              <text x="30" y="3" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>N-CH</text>
            </g>
          </g>

          {/* =================================================
              [08] J_LED_OUT — RIGHT side, 10 ports
              ================================================= */}
          <g
            className={`comp ${isActive('07') ? 'is-active' : ''} ${isDim('07') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('07')} onClick={() => set('07')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="790" y="664" width="240" height="20" className="ink hair" />
            <text x="910" y="678" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>
              OUT0 · OUT1 · OUT2 · ... · OUT9
            </text>
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <rect x={794 + i * 23} y="684" width="16" height="16" className="ink hair" />
                <circle cx={802 + i * 23} cy="692" r="1.5" className="gold-fill fill-only" stroke="none" />
              </g>
            ))}
          </g>

          {/* =================================================
              [08] J_LED_POWER — top right
              ================================================= */}
          <g
            className={`comp ${isActive('08') ? 'is-active' : ''} ${isDim('08') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('08')} onClick={() => set('08')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="850" y="216" width="160" height="60" className="ink" strokeWidth="1.25" />
            <line x1="850" y1="232" x2="1010" y2="232" className="ink hair" />
            <text x="930" y="227" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>J_LED_POWER · 5–12 V</text>
            {/* terminal pair */}
            <g transform="translate(866 240)">
              <rect x="0" y="0" width="40" height="28" className="ink hair" />
              <circle cx="10" cy="14" r="2" className="gold-fill fill-only" stroke="none" />
              <circle cx="30" cy="14" r="2" className="ink-fill fill-only" stroke="none" />
              <text x="10" y="40" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>VLED+</text>
              <text x="30" y="40" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>GND</text>
            </g>
            {/* fuse */}
            <g transform="translate(926 250)" className="ink hair">
              <rect x="0" y="-4" width="22" height="8" />
              <line x1="-6" y1="0" x2="0" y2="0" />
              <line x1="22" y1="0" x2="28" y2="0" />
              <text x="11" y="-8" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>FUSE</text>
            </g>
            {/* reverse-protection diode */}
            <g transform="translate(968 250)" className="ink hair">
              <polygon points="0,0 12,-6 12,6" />
              <line x1="12" y1="-6" x2="12" y2="6" />
              <line x1="-6" y1="0" x2="0" y2="0" />
              <line x1="12" y1="0" x2="20" y2="0" />
              <text x="6" y="-8" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>REV</text>
            </g>
          </g>

          {/* =================================================
              [09] USB — bottom emitting from Pico
              ================================================= */}
          <g
            className={`comp ${isActive('09') ? 'is-active' : ''} ${isDim('09') ? 'is-dim' : ''}`}
            onMouseEnter={() => set('09')} onClick={() => set('09')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="600" y="270" width="80" height="18" className="ink" strokeWidth="1.25" />
            <text x="640" y="282" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>USB · TO HOST</text>
            {/* cable run upward */}
            <line x1="640" y1="270" x2="640" y2="200" className="ink hair" strokeDasharray="3 3" />
          </g>

          {/* =================================================
              SIGNAL / WIRE ROUTING — under everything
              ================================================= */}
          <g style={{ pointerEvents: 'none' }}>
            {/* digital signal: shift chain → pico (blue) */}
            <path d="M468 262 C 510 262 510 320 540 320" className="blue hair" strokeWidth="1.25" strokeDasharray="3 3" />
            {/* MCP3208 → Pico (blue) */}
            <path d="M476 612 C 510 612 510 520 540 520" className="blue hair" strokeWidth="1.25" strokeDasharray="3 3" />
            {/* J_ANALOG → MCP3208 */}
            <line x1="486" y1="664" x2="446" y2="640" className="blue hair" strokeWidth="1" strokeDasharray="2 2" />
            {/* J_SPIN → Pico (vermilion) */}
            {[0, 1, 2, 3].map(i => (
              <path key={i} d={`M240 ${340 + i * 60} C 380 ${340 + i * 60} 460 ${440} 540 440`} className="verm hair" strokeWidth="1" strokeDasharray="2 3" />
            ))}
            {/* Pico → MOSFET (gold) */}
            {Array.from({ length: 5 }).map((_, i) => (
              <path key={i} d={`M748 ${440 + i * 8} C 800 440 800 540 ${795 + i * 22} 600`} className="gold hair" strokeWidth="1" strokeDasharray="2 2" />
            ))}
            {/* MOSFET → J_LED_OUT */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1={797 + i * 22} y1="626" x2={802 + i * 23} y2="684" className="gold hair" strokeWidth="1" />
            ))}
            {/* J_LED_POWER → MOSFET rail */}
            <path d="M930 276 C 930 400 880 540 880 580" className="gold" strokeWidth="1.5" strokeDasharray="4 3" />
          </g>

          {/* =================================================
              LEADER LINES + CALLOUT NUMBERS (outside the board)
              ================================================= */}
          {/* Helper to place a callout: leader from anchor → out → number circle */}
          {[
            // [n, tone, x1,y1,  x2,y2,  x3,y3]   // anchor → bend → tag
            ['01', 'verm', 640, 440, 1090, 440, 1130, 440],
            ['02', 'ink', 378, 246, 378, 130, 410, 110],
            ['03', 'ink', 650, 160, 720, 80, 750, 70],
            ['04', 'ink', 446, 620, 200, 760, 170, 760],
            ['05', 'ink', 486, 684, 470, 800, 470, 832],
            ['06', 'ink', 200, 360, 130, 360, 100, 360],
            ['07', 'ink', 870, 612, 1100, 612, 1130, 612],
            ['08', 'ink', 930, 216, 1100, 180, 1140, 150],
            ['09', 'ink', 640, 270, 640, 130, 640, 100],
          ].map(([n, tone, x1, y1, x2, y2, x3, y3]) => (
            <g
              key={n}
              className={`callout-grp ${isActive(n) ? 'is-active' : ''} ${isDim(n) ? 'is-dim' : ''}`}
              onMouseEnter={() => set(n)}
              onClick={() => set(n)}
              style={{ cursor: 'pointer' }}
            >
              <polyline
                points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                className="ink hair leader-line"
                strokeWidth=".75"
              />
              <circle cx={x1} cy={y1} r="2.5" className="ink-fill fill-only" stroke="none" />
              <circle
                cx={x3} cy={y3} r="13"
                className={tone === 'verm' ? 'verm-fill fill-only' : 'ink-fill fill-only'}
                stroke="none"
              />
              <text
                x={x3} y={y3 + 4}
                className="lbl-num fill-only"
                stroke="none"
                textAnchor="middle"
                style={{ fontSize: 10, letterSpacing: 0 }}
              >
                {n}
              </text>
            </g>
          ))}

          {/* Section markers like "A" "B" engineering reference */}
          <g className="ink hair" opacity=".6">
            <text x="60" y="40" className="lbl-sm fill-only" stroke="none">A</text>
            <text x="1230" y="40" className="lbl-sm fill-only" stroke="none">A</text>
            <text x="60" y="870" className="lbl-sm fill-only" stroke="none">B</text>
            <text x="1230" y="870" className="lbl-sm fill-only" stroke="none">B</text>
          </g>
        </svg>
      </div>

      {/* ====== Master / detail split below the figure ====== */}
      <div className="anatomy-explorer">
        <div className="ae-head">
          <span className="mono-xs"><span style={{ color: 'var(--vermilion)' }}>/</span>Inventory<span style={{ color: 'var(--ink-faint)' }}>({CALLOUTS.length})</span></span>
          <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>Select a block · 01 → 11</span>
        </div>
        <div className="ae-split">

          {/* LEFT — numbered tab list */}
          <nav className="ae-tabs" aria-label="Anatomy callouts">
            {CALLOUTS.map(c => (
              <button
                key={c.n}
                className={`ae-tab ${active === c.n ? 'is-active' : ''}`}
                onClick={() => set(c.n)}
                onMouseEnter={() => set(c.n)}
              >
                <span className="ae-tab-n">{c.n}</span>
                <span className="ae-tab-body">
                  <span className="ae-tab-title">{c.title}</span>
                  <span className="ae-tab-eyebrow">
                    <span className="lane-swatch" style={{
                      width: 8, height: 8,
                      background:
                        c.tone === 'verm' ? 'var(--vermilion)' :
                        c.tone === 'blue' ? 'var(--inkblue)' :
                        c.tone === 'gold' ? 'var(--gold)' : 'var(--ink)'
                    }} />
                    {c.eyebrow}
                  </span>
                </span>
                <span className="ae-tab-mark">{active === c.n ? '●' : ''}</span>
              </button>
            ))}
          </nav>

          {/* RIGHT — active detail panel */}
          <article className="ae-detail" key={activeCallout.n}>
            <header className="ae-d-head">
              <div>
                <div className="ae-d-eyebrow">
                  <span className="lane-swatch" style={{
                    width: 10, height: 10,
                    background:
                      activeCallout.tone === 'verm' ? 'var(--vermilion)' :
                      activeCallout.tone === 'blue' ? 'var(--inkblue)' :
                      activeCallout.tone === 'gold' ? 'var(--gold)' : 'var(--ink)'
                  }} />
                  <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>{activeCallout.eyebrow}</span>
                </div>
                <h3 className="ae-d-title">{activeCallout.title}</h3>
              </div>
              <div className="ae-d-num">
                <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>BLOCK</span>
                <span className="ae-d-n">{activeCallout.n}</span>
              </div>
            </header>

            <p className="ae-d-body">{activeCallout.body}</p>

            {/* Mini isolated diagram */}
            <div className="ae-d-fig">
              <div className="ae-d-fig-frame">
                {window.MiniDiagram && <window.MiniDiagram n={activeCallout.n} />}
              </div>
            </div>

            <table className="spec ae-d-spec">
              <tbody>
                {activeCallout.spec.map(([k, v]) => (
                  <tr key={k}>
                    <td className="label" style={{ width: '32%' }}>{k}</td>
                    <td className="val">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <footer className="ae-d-foot">
              <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>
                {activeCallout.n} / {CALLOUTS.length}
              </span>
              <div className="ae-d-nav">
                <button onClick={() => {
                  const i = CALLOUTS.findIndex(c => c.n === active);
                  const prev = CALLOUTS[(i - 1 + CALLOUTS.length) % CALLOUTS.length];
                  set(prev.n);
                }}>← Prev</button>
                <button onClick={() => {
                  const i = CALLOUTS.findIndex(c => c.n === active);
                  const next = CALLOUTS[(i + 1) % CALLOUTS.length];
                  set(next.n);
                }}>Next →</button>
              </div>
            </footer>
          </article>

        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('anatomy-figure')).render(<Anatomy />);
