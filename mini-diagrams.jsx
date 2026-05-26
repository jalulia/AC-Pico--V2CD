/* global React */
/* ============================================================
   MINI DIAGRAMS — one isolated ink-line drawing per block.
   Used inside the anatomy explorer's detail panel.
   Each diagram is its own ~440×220 SVG, drafted plainly.
   ============================================================ */

function MiniDiagram({ n, d }) {
  const W = 440, H = 220;
  const key = d || n;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mini-diagram" preserveAspectRatio="xMidYMid meet">
      {/* corner registration marks */}
      <g className="ink hair" opacity=".55">
        <path d="M8 8 L8 18 M8 8 L18 8" />
        <path d={`M${W - 8} 8 L${W - 8} 18 M${W - 8} 8 L${W - 18} 8`} />
        <path d={`M8 ${H - 8} L8 ${H - 18} M8 ${H - 8} L18 ${H - 8}`} />
        <path d={`M${W - 8} ${H - 8} L${W - 8} ${H - 18} M${W - 8} ${H - 8} L${W - 18} ${H - 8}`} />
      </g>
      {/* title-strip number */}
      <text x="14" y="22" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9, fill: 'var(--ink-faint)' }}>
        FIG. 01.{n}
      </text>

      {Diagrams[key] && Diagrams[key]()}
    </svg>
  );
}

const Diagrams = {

  /* ============ TERM · TERMINAL BLOCKS ============ */
  'TERM': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>PLUGGABLE TERMINAL BLOCK — 3.5 / 5.08 mm</text>
      <g transform="translate(120 50)" className="ink" strokeWidth="1.25">
        {/* board-side base */}
        <rect x="0" y="64" width="200" height="30" />
        {/* removable plug */}
        <rect x="8" y="22" width="184" height="42" />
        {/* screw terminals + wire entries */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} transform={`translate(${30 + i * 36} 43)`} className="ink hair">
            <circle cx="0" cy="0" r="8" />
            <line x1="-4" y1="-4" x2="4" y2="4" />
            <line x1="-4" y1="4" x2="4" y2="-4" />
            <line x1="0" y1="-9" x2="0" y2="-21" />
          </g>
        ))}
        {/* through-board pins */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1={30 + i * 36} y1="94" x2={30 + i * 36} y2="110" className="ink hair" />
        ))}
        {/* pitch dimension between first two pins */}
        <line x1="30" y1="122" x2="66" y2="122" className="ink hair" />
        <line x1="30" y1="118" x2="30" y2="126" className="ink hair" />
        <line x1="66" y1="118" x2="66" y2="126" className="ink hair" />
        <text x="48" y="136" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>PITCH</text>
      </g>
      <text x="220" y="206" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>
        Pluggable · used for every external connection
      </text>
    </g>
  ),

  /* ============ 01 · PICO H ============ */
  '01': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>RASPBERRY PI PICO H</text>
      {/* module body */}
      <rect x="120" y="44" width="200" height="148" rx="6" className="ink" strokeWidth="1.25" />
      {/* USB at top */}
      <rect x="195" y="36" width="50" height="10" className="ink hair" />
      <text x="220" y="32" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>USB</text>
      {/* RP2040 */}
      <rect x="170" y="76" width="100" height="60" className="ink" strokeWidth="1.25" />
      <line x1="170" y1="86" x2="270" y2="86" className="ink hair" />
      <text x="220" y="100" className="lbl fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 12 }}>RP2040</text>
      <text x="220" y="120" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>CORTEX-M0+ · 133 MHz</text>
      {/* boot/run/led */}
      <rect x="175" y="148" width="30" height="14" className="ink hair" />
      <text x="190" y="158" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>BOOT</text>
      <rect x="210" y="148" width="30" height="14" className="ink hair" />
      <text x="225" y="158" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>RUN</text>
      <circle cx="255" cy="155" r="4" className="ink hair" />
      <text x="265" y="158" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>LED</text>
      {/* SWD */}
      <g transform="translate(195 172)" className="ink hair">
        <rect x="0" y="0" width="6" height="6" />
        <rect x="10" y="0" width="6" height="6" />
        <rect x="20" y="0" width="6" height="6" />
        <text x="32" y="6" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>SWD</text>
      </g>
      {/* castellated pins */}
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i} className="ink hair">
          <rect x="112" y={50 + i * 10} width="8" height="6" />
          <rect x="320" y={50 + i * 10} width="8" height="6" />
        </g>
      ))}
      {/* leader: 40 GPIO */}
      <g className="leader hair">
        <line x1="112" y1="100" x2="60" y2="100" />
        <line x1="60" y1="100" x2="60" y2="80" />
        <text x="58" y="74" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>40 GPIO</text>
      </g>
      <g className="leader hair">
        <line x1="328" y1="120" x2="380" y2="120" />
        <text x="384" y="123" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>3V3 / 5V</text>
      </g>
    </g>
  ),

  /* ============ 02 · 74HC165 CHAIN ============ */
  '02': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>4× 74HC165 — PARALLEL-IN / SERIAL-OUT</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${44 + i * 92} 70)`}>
          <rect x="0" y="0" width="60" height="64" className="ink" strokeWidth="1.25" />
          {/* parallel inputs on top */}
          {Array.from({ length: 8 }).map((_, j) => (
            <g key={j} className="ink hair">
              <line x1={4 + j * 7} y1="0" x2={4 + j * 7} y2="-12" />
              <circle cx={4 + j * 7} cy="-16" r="1.5" className="ink-fill fill-only" stroke="none" />
            </g>
          ))}
          {/* chip name */}
          <text x="30" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>74HC165</text>
          <text x="30" y="36" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>U{i + 1}</text>
          <text x="30" y="52" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>IN{i * 8}–{i * 8 + 7}</text>
          {/* chain arrow */}
          {i < 3 && (
            <g className="ink hair">
              <line x1="60" y1="32" x2="92" y2="32" strokeDasharray="2 2" />
              <polygon points="92,32 86,29 86,35" className="ink-fill fill-only" stroke="none" />
            </g>
          )}
        </g>
      ))}
      {/* output to Pico */}
      <g className="ink hair">
        <line x1="412" y1="102" x2="430" y2="102" />
        <text x="386" y="156" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>→ PICO</text>
      </g>
      {/* 3 control lines from Pico */}
      <g transform="translate(36 158)" className="ink hair">
        <text x="0" y="0" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>DATA · CLOCK · LATCH (3 GPIO)</text>
        <line x1="0" y1="6" x2="368" y2="6" />
        <line x1="0" y1="10" x2="368" y2="10" />
        <line x1="0" y1="14" x2="368" y2="14" />
      </g>
      <text x="220" y="200" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>
        32 inputs scanned over 3 GPIO · no ghosting
      </text>
    </g>
  ),

  /* ============ 03 · J_DIGITAL ============ */
  '03': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>J_DIGITAL — 32 SWITCH TERMINALS · 4 BANKS</text>
      {/* terminal bank top row */}
      {[0, 1, 2, 3].map(bank => (
        <g key={bank} transform={`translate(${30 + bank * 100} 50)`}>
          <rect x="0" y="0" width="80" height="20" className="ink hair" />
          <text x="40" y="14" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>IN{bank * 8}–{bank * 8 + 7}</text>
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x={3 + i * 9.5} y="20" width="6" height="10" className="ink hair" />
              <circle cx={6 + i * 9.5} cy="25" r="1" className="ink-fill fill-only" stroke="none" />
            </g>
          ))}
        </g>
      ))}
      {/* example switch circuit */}
      <g transform="translate(60 110)">
        <text x="0" y="0" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>SCHEMATIC — ONE INPUT</text>
        {/* 3.3V rail */}
        <line x1="0" y1="20" x2="320" y2="20" className="ink hair" />
        <text x="-2" y="16" className="lbl-sm fill-only" stroke="none" textAnchor="end" style={{ fontSize: 7 }}>3V3</text>
        {/* pull-up resistor */}
        <g transform="translate(60 20)" className="ink hair">
          <line x1="0" y1="0" x2="0" y2="6" />
          <rect x="-6" y="6" width="12" height="20" />
          <text x="14" y="20" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 7 }}>10k Ω</text>
          <line x1="0" y1="26" x2="0" y2="36" />
        </g>
        {/* INx node */}
        <circle cx="60" cy="56" r="2" className="ink-fill fill-only" stroke="none" />
        <text x="72" y="60" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>INx → 74HC165</text>
        {/* switch */}
        <g transform="translate(60 56)" className="ink hair">
          <line x1="0" y1="0" x2="0" y2="16" />
          <line x1="0" y1="16" x2="20" y2="16" />
          <line x1="20" y1="16" x2="32" y2="6" />
          <line x1="40" y1="16" x2="60" y2="16" />
          <text x="20" y="-2" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 7 }}>SW</text>
        </g>
        {/* GND */}
        <line x1="120" y1="72" x2="120" y2="80" className="ink hair" />
        <line x1="112" y1="80" x2="128" y2="80" className="ink hair" />
        <line x1="115" y1="83" x2="125" y2="83" className="ink hair" />
        <line x1="118" y1="86" x2="122" y2="86" className="ink hair" />
        <text x="135" y="84" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 7 }}>GND</text>
      </g>
    </g>
  ),

  /* ============ 04 · MCP3208 ADC ============ */
  '04': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>MCP3208 — 8-CHANNEL 12-BIT SPI ADC</text>
      {/* SOIC body */}
      <rect x="140" y="60" width="160" height="100" className="ink" strokeWidth="1.25" />
      {/* dot indicator */}
      <circle cx="148" cy="68" r="2" className="ink-fill fill-only" stroke="none" />
      <text x="220" y="115" className="lbl fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 12 }}>MCP3208</text>
      <text x="220" y="130" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>U5 · 12-BIT</text>
      {/* left pins (A0-A7) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} className="ink hair">
          <line x1="140" y1={70 + i * 11} x2="120" y2={70 + i * 11} />
          <text x="116" y={73 + i * 11} className="lbl-sm fill-only" stroke="none" textAnchor="end" style={{ fontSize: 8 }}>A{i}</text>
        </g>
      ))}
      {/* right pins (SPI) */}
      {[
        ['VDD', 70], ['VREF', 81], ['AGND', 92], ['CLK', 103],
        ['MOSI', 114], ['MISO', 125], ['CS', 136], ['DGND', 147]
      ].map(([name, y], i) => (
        <g key={i} className="ink hair">
          <line x1="300" y1={y} x2="320" y2={y} />
          <text x="324" y={y + 3} className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>{name}</text>
        </g>
      ))}
      {/* legend */}
      <text x="60" y="180" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>ANALOG IN</text>
      <text x="380" y="180" className="lbl-sm fill-only" stroke="none" textAnchor="end" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>SPI → PICO</text>
    </g>
  ),

  /* ============ 05 · J_ANALOG ============ */
  '05': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>J_ANALOG — HALL / POT TERMINAL BANK</text>
      {/* terminal */}
      <rect x="40" y="56" width="360" height="40" className="ink" strokeWidth="1.25" />
      <line x1="40" y1="74" x2="400" y2="74" className="ink hair" />
      {['3V3', 'GND', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'].map((p, i) => {
        const cx = 60 + i * 36;
        const verm = (p === '3V3');
        return (
          <g key={i}>
            <line x1={cx} y1="74" x2={cx} y2="84" className="ink hair" />
            <circle cx={cx} cy="86" r="3" fill={verm ? 'var(--vermilion)' : 'var(--ink)'} />
            <text x={cx} y="68" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>{p}</text>
          </g>
        );
      })}
      {/* Hall stick illustration */}
      <g transform="translate(80 130)" className="ink hair">
        <text x="0" y="0" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>HALL JOYSTICK</text>
        <circle cx="40" cy="32" r="22" />
        <line x1="40" y1="14" x2="40" y2="50" />
        <line x1="22" y1="32" x2="58" y2="32" />
        <circle cx="40" cy="32" r="3" className="verm-fill fill-only" stroke="none" />
        {/* X and Y leader lines */}
        <line x1="58" y1="32" x2="80" y2="32" />
        <text x="84" y="35" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>X → A0</text>
        <line x1="40" y1="14" x2="40" y2="4" />
        <text x="46" y="6" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>Y → A1</text>
      </g>
      <g transform="translate(260 130)" className="ink hair">
        <text x="0" y="0" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>POT / SLIDER</text>
        <rect x="0" y="14" width="120" height="14" />
        <line x1="0" y1="21" x2="120" y2="21" />
        <line x1="40" y1="14" x2="40" y2="6" />
        <polygon points="40,6 36,2 44,2" className="ink-fill fill-only" stroke="none" />
        <text x="0" y="44" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 7 }}>3V3 — wiper — GND</text>
      </g>
    </g>
  ),

  /* ============ 06 · J_SPIN — QUADRATURE ============ */
  '06': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>J_SPIN — QUADRATURE A / B</text>
      {/* terminal */}
      <g transform="translate(38 50)" className="ink">
        <rect x="0" y="0" width="80" height="40" strokeWidth="1.25" />
        {['+5V', 'GND', 'A', 'B'].map((p, i) => (
          <g key={i}>
            <line x1={10 + i * 20} y1="40" x2={10 + i * 20} y2="48" className="hair" />
            <circle cx={10 + i * 20} cy="50" r="2.5" fill={p === '+5V' ? 'var(--vermilion)' : 'var(--ink)'} />
            <text x={10 + i * 20} y="18" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>{p}</text>
          </g>
        ))}
      </g>
      {/* spinner wheel */}
      <g transform="translate(180 70)" className="ink">
        <circle cx="0" cy="0" r="34" strokeWidth="1.25" />
        <circle cx="0" cy="0" r="4" className="ink-fill fill-only" stroke="none" />
        {/* tick marks around */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24;
          const x1 = Math.cos(a) * 28;
          const y1 = Math.sin(a) * 28;
          const x2 = Math.cos(a) * 34;
          const y2 = Math.sin(a) * 34;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="hair" />;
        })}
        <text x="0" y="50" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>SPINTRAK-CLASS</text>
      </g>
      {/* waveform */}
      <g transform="translate(260 50)">
        <text x="0" y="0" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>A / B QUADRATURE</text>
        {/* A line */}
        <path d="M 0 18 L 12 18 L 12 6 L 36 6 L 36 18 L 60 18 L 60 6 L 84 6 L 84 18 L 108 18 L 108 6 L 132 6 L 132 18 L 140 18" className="ink" strokeWidth="1.25" />
        <text x="-2" y="14" className="lbl-sm fill-only" stroke="none" textAnchor="end" style={{ fontSize: 7 }}>A</text>
        {/* B line, 90° offset */}
        <path d="M 0 46 L 24 46 L 24 34 L 48 34 L 48 46 L 72 46 L 72 34 L 96 34 L 96 46 L 120 46 L 120 34 L 140 34" className="ink" strokeWidth="1.25" />
        <text x="-2" y="42" className="lbl-sm fill-only" stroke="none" textAnchor="end" style={{ fontSize: 7 }}>B</text>
        <text x="0" y="64" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 7, fill: 'var(--ink-faint)' }}>A LEADS B → CW</text>
      </g>
      <text x="220" y="186" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>
        PIO state-machine decodes signed deltas
      </text>
    </g>
  ),

  /* ============ 07 · MOSFET DRIVERS ============ */
  '07': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>Q1–Q10 · N-MOSFET SINK · OUT0–OUT9</text>
      {/* schematic — one channel */}
      <g transform="translate(120 56)" className="ink" strokeWidth="1.25">
        {/* VLED+ */}
        <line x1="0" y1="0" x2="240" y2="0" />
        <text x="-4" y="4" className="lbl-sm fill-only" stroke="none" textAnchor="end" style={{ fontSize: 8 }}>VLED+</text>
        {/* LED */}
        <line x1="80" y1="0" x2="80" y2="24" />
        <polygon points="74,24 86,24 80,40" className="ink-fill fill-only" stroke="none" />
        <line x1="74" y1="40" x2="86" y2="40" />
        <line x1="80" y1="40" x2="80" y2="56" />
        <text x="92" y="36" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 7 }}>LED</text>
        {/* OUTx node */}
        <circle cx="80" cy="56" r="2.5" className="ink-fill fill-only" stroke="none" />
        <text x="92" y="60" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>OUTx</text>
        {/* MOSFET symbol */}
        <line x1="80" y1="56" x2="80" y2="68" />
        <line x1="80" y1="68" x2="100" y2="68" /> {/* drain */}
        <line x1="100" y1="62" x2="100" y2="86" /> {/* channel */}
        <line x1="100" y1="68" x2="120" y2="60" /> {/* drain arrow */}
        <line x1="100" y1="80" x2="120" y2="88" /> {/* source */}
        <line x1="120" y1="60" x2="120" y2="44" /> {/* drain to top */}
        <line x1="120" y1="88" x2="120" y2="104" /> {/* source to gnd */}
        {/* gate */}
        <line x1="100" y1="74" x2="60" y2="74" />
        <line x1="60" y1="74" x2="60" y2="100" />
        <rect x="40" y="100" width="40" height="12" />
        <text x="60" y="108" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>GATE R</text>
        <line x1="60" y1="112" x2="60" y2="124" />
        <text x="60" y="138" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>PICO PWM</text>
        {/* GND */}
        <line x1="80" y1="104" x2="240" y2="104" />
        <text x="244" y="108" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>GND</text>
        {/* AO3400A label */}
        <text x="138" y="78" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>AO3400A</text>
      </g>
      <text x="220" y="200" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>
        ×10 channels · 8-bit PWM brightness
      </text>
    </g>
  ),

  /* ============ 08 · J_LED_POWER ============ */
  '08': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>J_LED_POWER — EXTERNAL 5–12 V SUPPLY</text>
      {/* terminal */}
      <g transform="translate(48 50)" className="ink">
        <rect x="0" y="0" width="84" height="40" strokeWidth="1.25" />
        {['VLED+', 'GND'].map((p, i) => (
          <g key={i}>
            <line x1={20 + i * 44} y1="40" x2={20 + i * 44} y2="50" className="hair" />
            <circle cx={20 + i * 44} cy="52" r="3" fill={p === 'VLED+' ? 'var(--gold)' : 'var(--ink)'} />
            <text x={20 + i * 44} y="18" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>{p}</text>
          </g>
        ))}
      </g>
      {/* protection chain */}
      <g transform="translate(170 70)" className="ink" strokeWidth="1.25">
        <line x1="0" y1="0" x2="20" y2="0" />
        {/* fuse */}
        <rect x="20" y="-6" width="36" height="12" />
        <text x="38" y="-10" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>FUSE</text>
        <line x1="56" y1="0" x2="80" y2="0" />
        {/* diode (reverse protect) */}
        <polygon points="80,-6 80,6 92,0" className="ink-fill fill-only" stroke="none" />
        <line x1="92" y1="-6" x2="92" y2="6" />
        <text x="86" y="-10" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>REV</text>
        <line x1="92" y1="0" x2="120" y2="0" />
        {/* bulk cap */}
        <line x1="120" y1="-12" x2="120" y2="12" />
        <line x1="128" y1="-12" x2="128" y2="12" />
        <text x="124" y="-16" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>BULK</text>
        <line x1="128" y1="0" x2="160" y2="0" />
        {/* node */}
        <circle cx="160" cy="0" r="2.5" className="ink-fill fill-only" stroke="none" />
        <text x="166" y="4" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 8 }}>→ LED RAIL</text>
      </g>
      <text x="220" y="160" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>
        STAR-POINT GROUND
      </text>
      <text x="220" y="175" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>
        USB powers logic only · LED rail isolated
      </text>
    </g>
  ),

  /* ============ 09 · USB ============ */
  '09': () => (
    <g>
      <text x="220" y="22" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 9 }}>USB — HOST LINK (HID + CDC SERIAL)</text>
      {/* USB-A receptacle */}
      <g transform="translate(80 60)" className="ink">
        <rect x="0" y="0" width="120" height="40" rx="3" strokeWidth="1.25" />
        <rect x="14" y="10" width="92" height="20" className="hair" />
        <line x1="40" y1="10" x2="40" y2="30" className="hair" />
        <text x="60" y="56" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>PICO MICRO-USB</text>
      </g>
      {/* cable */}
      <g className="ink hair">
        <path d="M 200 80 C 240 80 240 110 280 110" strokeDasharray="4 3" />
        <text x="240" y="76" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>USB 2.0</text>
      </g>
      {/* host PC */}
      <g transform="translate(280 86)" className="ink">
        <rect x="0" y="0" width="100" height="50" strokeWidth="1.25" />
        <line x1="0" y1="14" x2="100" y2="14" className="hair" />
        <text x="50" y="11" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>GAME PC / UNITY</text>
        <text x="50" y="28" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>HID gamepad</text>
        <text x="50" y="40" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>HID mouse · CDC</text>
      </g>
      <text x="220" y="170" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--ink-faint)' }}>
        Composite enumeration — inputs + LED commands on one cable
      </text>
    </g>
  ),

};

// Make available globally
window.MiniDiagram = MiniDiagram;
