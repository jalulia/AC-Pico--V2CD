/* global React, ReactDOM */

/* ============================================================
   SECTIONS — surviving React islands after Phase 2 migration.
   Prose moved to static HTML in index.html.
   ============================================================ */

/* --- §03 DigitalMath island ---------------------------------- */
function DigitalMath() {
  return (
    <svg viewBox="0 0 540 220" className="cap-math">
      {/* 4 sticks × 4 dirs */}
      <g>
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${20 + i * 70} 30)`}>
            {/* compass */}
            <circle cx="20" cy="30" r="22" className="ink hair" />
            <line x1="20" y1="14" x2="20" y2="46" className="ink hair" />
            <line x1="4" y1="30" x2="36" y2="30" className="ink hair" />
            <circle cx="20" cy="30" r="3" className="blue-fill" />
            <text x="20" y="80" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>STICK {i + 1}</text>
            <text x="20" y="92" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>4 SW</text>
          </g>
        ))}
      </g>
      {/* × */}
      <text x="312" y="62" className="ink-fill" textAnchor="middle" style={{ fontSize: 24, fontFamily: 'var(--mono)' }}>=</text>
      {/* sum */}
      <g transform="translate(340 28)">
        <rect x="0" y="0" width="180" height="64" className="ink hair" />
        <text x="90" y="28" className="ink-fill" textAnchor="middle" style={{ fontSize: 28, fontFamily: 'var(--sans)', fontWeight: 500 }}>16</text>
        <text x="90" y="50" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>DIGITAL INPUTS USED</text>
      </g>

      {/* bar of 32 inputs, 16 filled */}
      <g transform="translate(20 130)">
        <text x="0" y="-6" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>BUDGET · 32 DIGITAL INPUTS</text>
        {Array.from({ length: 32 }).map((_, i) => (
          <rect
            key={i}
            x={i * 15.5}
            y="0"
            width="13"
            height="22"
            className={i < 16 ? 'blue-fill' : 'ink hair'}
            fill={i < 16 ? 'var(--inkblue)' : 'transparent'}
          />
        ))}
        <text x="124" y="40" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--inkblue)' }}>USED · 16</text>
        <text x="372" y="40" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>SPARE · 16</text>
        {/* bracket */}
        <line x1="0" y1="28" x2="248" y2="28" className="ink hair" />
        <line x1="0" y1="28" x2="0" y2="32" className="ink hair" />
        <line x1="248" y1="28" x2="248" y2="32" className="ink hair" />
        <line x1="252" y1="28" x2="495" y2="28" className="ink hair" />
        <line x1="252" y1="28" x2="252" y2="32" className="ink hair" />
        <line x1="495" y1="28" x2="495" y2="32" className="ink hair" />
      </g>
    </svg>
  );
}

/* --- §03 AnalogMath island ----------------------------------- */
function AnalogMath() {
  return (
    <svg viewBox="0 0 540 220" className="cap-math">
      {/* 4 sticks with X/Y axes */}
      <g>
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${20 + i * 70} 30)`}>
            <circle cx="20" cy="30" r="22" className="ink hair" />
            <line x1="20" y1="14" x2="20" y2="46" className="verm hair" strokeWidth="1.5" />
            <line x1="4" y1="30" x2="36" y2="30" className="verm hair" strokeWidth="1.5" />
            <circle cx="20" cy="30" r="3" className="verm-fill" />
            <text x="20" y="80" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>HALL {i + 1}</text>
            <text x="20" y="92" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 7 }}>X · Y</text>
          </g>
        ))}
      </g>
      <text x="312" y="62" className="ink-fill" textAnchor="middle" style={{ fontSize: 24, fontFamily: 'var(--mono)' }}>=</text>
      <g transform="translate(340 28)">
        <rect x="0" y="0" width="180" height="64" className="ink hair" />
        <text x="90" y="28" className="ink-fill" textAnchor="middle" style={{ fontSize: 28, fontFamily: 'var(--sans)', fontWeight: 500 }}>8</text>
        <text x="90" y="50" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>ANALOG CHANNELS USED</text>
      </g>

      {/* bar of 8 channels, all filled */}
      <g transform="translate(20 130)">
        <text x="0" y="-6" className="lbl-sm fill-only" stroke="none" style={{ fontSize: 9 }}>BUDGET · 8 ANALOG CHANNELS (1× MCP3208)</text>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={i * 62}
            y="0"
            width="56"
            height="22"
            fill="var(--vermilion)"
          />
        ))}
        <text x="248" y="40" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--vermilion)' }}>USED · 8 · ZERO SPARE</text>
      </g>
    </svg>
  );
}

/* --- §04 CONNECTOR MAP (kept as island) ---------------------- */
const CONNECTORS = [
  {
    n: '04A', tone: 'blue', name: 'J_DIGITAL', sub: 'IN0–IN31 + repeated GND',
    use: 'Buttons, digital joystick directions, coin/start/service/admin inputs.',
    wiring: 'Normally-open switch shorts input to ground. Pullups live on the board.',
    pins: ['IN0', 'IN1', 'IN2', 'IN3', '...', 'IN31', 'GND']
  },
  {
    n: '04B', tone: 'verm', name: 'J_SPIN 0–3', sub: '+5V · GND · A · B',
    use: 'SpinTrak-style quadrature spinners or other two-channel encoders.',
    wiring: 'Use protected 3.3V-safe signal inputs. If a device actively drives 5V, level shift or divide before Pico GPIO.',
    pins: ['+5V', 'GND', 'A', 'B']
  },
  {
    n: '04C', tone: 'green', name: 'J_ANALOG', sub: '3V3 · GND · A0–A7',
    use: 'Hall-effect joysticks, analog levers, pots, sliders.',
    wiring: 'Prefer 0–3.3V output. For 0.5–4.5V Hall modules, add divider/protection and calibrate in firmware.',
    pins: ['3V3', 'GND', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7']
  },
  {
    n: '04D', tone: 'gold', name: 'J_LED_POWER', sub: 'VLED+ · GND',
    use: 'External LED / lamp supply.',
    wiring: 'USB powers logic; external 5V/12V powers LEDs. Grounds are common on the board.',
    pins: ['VLED+', 'GND']
  },
  {
    n: '04E', tone: 'gold', name: 'J_LED_OUT', sub: 'OUT0–OUT9',
    use: 'Button LEDs, cabinet lamps, status indicators.',
    wiring: 'Low-side sink outputs. Load connects between VLED+ and OUTx. Add current limiting as needed.',
    pins: ['OUT0', 'OUT1', 'OUT2', 'OUT3', 'OUT4', 'OUT5', 'OUT6', 'OUT7', 'OUT8', 'OUT9']
  },
  {
    n: '04F', tone: 'ink', name: 'USB', sub: 'Pico micro-USB · carrier USB-C later',
    use: 'Connection to game PC / Unity host.',
    wiring: 'v0.1 uses Pico H USB directly. A later integrated RP2040 board can move this to USB-C.',
    pins: ['VBUS', 'D-', 'D+', 'GND']
  }
];

function MiniTerminal({ pins, tone }) {
  const color =
    tone === 'verm' ? 'var(--vermilion)' :
    tone === 'blue' ? 'var(--teal)' :
    tone === 'green' ? 'var(--green)' :
    tone === 'gold' ? 'var(--gold)' : 'var(--ink)';

  const w = pins.length <= 4 ? 220 : pins.length <= 7 ? 280 : 340;

  return (
    <svg viewBox={`0 0 ${w} 100`} className="mini-term">
      {/* body */}
      <rect x="10" y="20" width={w - 20} height="50" className="ink" strokeWidth="1.25" />
      <line x1="10" y1="34" x2={w - 10} y2="34" className="ink hair" />
      {/* pins */}
      {pins.map((p, i) => {
        const step = (w - 40) / pins.length;
        const cx = 20 + step / 2 + i * step;
        return (
          <g key={i}>
            <line x1={cx} y1="70" x2={cx} y2="80" className="ink hair" strokeWidth="1.5" />
            <circle cx={cx} cy="50" r="3" fill={color} />
            <text x={cx} y="93" className="lbl-sm fill-only" stroke="none" textAnchor="middle" style={{ fontSize: 8 }}>{p}</text>
          </g>
        );
      })}
      {/* mounting screws on body */}
      <circle cx="20" cy="27" r="2.5" className="ink hair" />
      <circle cx={w - 20} cy="27" r="2.5" className="ink hair" />
      {/* leader sample */}
      <line x1="10" y1="18" x2="10" y2="8" className="ink hair" strokeDasharray="2 2" />
      <line x1={w - 10} y1="18" x2={w - 10} y2="8" className="ink hair" strokeDasharray="2 2" />
    </svg>
  );
}

function Connectors() {
  return (
    <section id="connectors" data-screen-label="04 Connectors">
      <div className="wrap">
        <div className="folio">
          <span className="num">§ 04</span>
          <span className="ttl">Connector map</span>
          <span className="meta">Field wiring · screw terminals</span>
        </div>
        <hr className="rule" />

        <div className="cap-head">
          <div>
            <span className="eyebrow">§ 04 · Connector map</span>
            <h2 style={{ marginTop: 14 }}>
              Connector map
            </h2>
          </div>
          <p className="body" style={{ alignSelf: 'end' }}>
            For v0.1, use pluggable screw terminals or Euroblock-style connectors. They cost more than raw headers, but make early cabinet installs and debugging much less painful.
          </p>
        </div>

        <div className="connector-grid" style={{ marginTop: 36 }}>
          {CONNECTORS.map(c => (
            <article key={c.n} className="conn">
              <div className="conn-head">
                <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>{c.n}</span>
                <span className="lane-swatch" style={{
                  width: 14, height: 14, display: 'inline-block',
                  background:
                    c.tone === 'verm' ? 'var(--vermilion)' :
                    c.tone === 'blue' ? 'var(--teal)' :
                    c.tone === 'green' ? 'var(--green)' :
                    c.tone === 'gold' ? 'var(--gold)' : 'var(--ink)'
                }} />
              </div>
              <h3 className="conn-name">{c.name}</h3>
              <div className="mono-xs" style={{ color: 'var(--ink-faint)', marginTop: 6 }}>{c.sub}</div>

              <div className="conn-fig">
                <MiniTerminal pins={c.pins} tone={c.tone} />
              </div>

              <div className="conn-body">
                <div>
                  <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>USE</span>
                  <p className="body" style={{ fontSize: 13, marginTop: 4 }}>{c.use}</p>
                </div>
                <div>
                  <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>WIRING</span>
                  <p className="body" style={{ fontSize: 13, marginTop: 4 }}>{c.wiring}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOUNT ISLANDS
   ============================================================ */
ReactDOM.createRoot(document.getElementById('capacity-digitalmath')).render(<DigitalMath />);
ReactDOM.createRoot(document.getElementById('capacity-analogmath')).render(<AnalogMath />);
ReactDOM.createRoot(document.getElementById('connectors-mount')).render(<Connectors />);
