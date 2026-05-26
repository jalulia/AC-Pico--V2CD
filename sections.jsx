/* global React, ReactDOM */

/* ============================================================
   SECTIONS §03–§08 — capacity, connectors, BOM, firmware,
   build sequence, sources.
   ============================================================ */

/* --- §03 DIGITAL VS ANALOG — two stick types + arithmetic - */
function Capacity() {
  return (
    <section id="capacity" data-screen-label="03 Digital vs analog">
      <div className="wrap">
        <div className="folio">
          <span className="num">§ 03</span>
          <span className="ttl">Digital vs analog</span>
          <span className="meta">Two input families · capacity</span>
        </div>
        <hr className="rule" />

        <div className="cap-head">
          <div>
            <span className="eyebrow">§ 03 · Digital vs analog</span>
            <h2 style={{ marginTop: 14 }}>Digital vs analog</h2>
          </div>
          <p className="body" style={{ alignSelf: 'end' }}>
            Digital and analog are two different input families, not two versions of the same thing. Each takes a separate path through the board — digital inputs through the shift registers, analog inputs through the ADC — and a cabinet&rsquo;s mix of the two determines how much fits.
          </p>
        </div>

        <div className="cap-grid" style={{ marginTop: 36 }}>

          {/* DIGITAL CASE */}
          <div className="cap-card">
            <div className="cap-card-head">
              <span className="callout-num blue" style={{ background: 'var(--teal)' }}>D</span>
              <div>
                <h3>Digital inputs</h3>
              </div>
            </div>

            <p className="body" style={{ marginTop: 14 }}>
              Digital inputs are on/off switch closures — buttons, digital joystick directions, and coin, start, service, and admin lines. Each shorts an input to ground, and the board reads them through the 74HC165 shift registers. The standard build has 32 digital inputs.
            </p>
            <p className="body" style={{ marginTop: 12 }}>
              A digital joystick uses four of them — up, down, left, right. <strong>4-way and 8-way sticks use the same four switches:</strong> an 8-way stick allows two adjacent directions to close at once, so up&nbsp;+&nbsp;right reads as a diagonal. There is no separate 8-way input.
            </p>

            <p className="body" style={{ marginTop: 12 }}>
              Four digital joysticks use 16 of the 32 inputs:
            </p>

            <pre className="loop-pre" style={{ marginTop: 14 }}>
{`4 digital sticks × 4 directions = 16 digital inputs
32 digital inputs standard       = 16 spare inputs`}
            </pre>

            <DigitalMath />

            <p className="body" style={{ marginTop: 14 }}>
              The remaining 16 inputs cover start, coin, service, and action buttons. A full four-player cabinet with a large button count can expand the digital side with two more 74HC165s, for 48 inputs.
            </p>
          </div>

          {/* ANALOG CASE */}
          <div className="cap-card">
            <div className="cap-card-head">
              <span className="callout-num" style={{ background: 'var(--green)' }}>A</span>
              <div>
                <h3>Analog inputs</h3>
              </div>
            </div>

            <p className="body" style={{ marginTop: 14 }}>
              Analog inputs are voltage axes — Hall-effect joysticks, potentiometers, sliders, and analog levers. Instead of shorting to ground, they output a changing voltage, which the MCP3208 ADC converts. The standard build has 8 analog channels.
            </p>

            <p className="body" style={{ marginTop: 12 }}>
              A Hall-effect joystick uses two channels — X and Y — so four of them fill one MCP3208:
            </p>

            <pre className="loop-pre" style={{ marginTop: 14 }}>
{`4 analog sticks × 2 axes = 8 analog inputs
1 × MCP3208              = 8 analog inputs`}
            </pre>

            <AnalogMath />

            <p className="body" style={{ marginTop: 14 }}>
              For four analog sticks plus pots, sliders, or other analog controls, the board carries a second MCP3208 footprint, bringing it to 16 channels.
            </p>
          </div>
        </div>

        <hr className="rule" style={{ marginTop: 48 }} />
        <div className="design-rule">
          <span className="callout-num" style={{ background: 'var(--vermilion)' }}>!</span>
          <p>
            <strong>Design rule:</strong> digital and analog draw on separate budgets — the shift registers and the ADC — so they are best treated as population options on one PCB. The same board can be assembled as 32D/8A (standard), 32D/16A (analog-heavy), or 48D/8A (digital-heavy), depending on the cabinet.
          </p>
        </div>
      </div>
    </section>
  );
}

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

/* --- §04 CONNECTOR MAP --------------------------------------- */
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

/* --- §06 FIRMWARE AND UNITY COMMUNICATION ------------------- */
function Firmware() {
  return (
    <section id="firmware" data-screen-label="06 Firmware">
      <div className="wrap">
        <div className="folio">
          <span className="num">§ 06</span>
          <span className="ttl">Firmware and Unity communication</span>
          <span className="meta">HID + CDC · ~1 ms target loop</span>
        </div>
        <hr className="rule" />

        <div className="cap-head">
          <div>
            <span className="eyebrow">§ 06 · Firmware + Unity</span>
            <h2 style={{ marginTop: 14 }}>Firmware and Unity communication</h2>
          </div>
        </div>

        <div className="cap-grid" style={{ marginTop: 36 }}>
          <div className="cap-card">
            <h3>v0.1 USB behaviour</h3>
            <p className="body" style={{ marginTop: 12 }}>
              Start with a composite behaviour that is easy to test outside Unity:
            </p>
            <pre className="loop-pre" style={{ marginTop: 14 }}>
{`Inputs:
  HID gamepad  -> buttons + analog axes
  HID mouse    -> spinner relative movement

Outputs:
  CDC serial   -> Unity LED/control commands`}
            </pre>
          </div>

          <div className="cap-card">
            <h3>Simple LED command protocol</h3>
            <p className="body" style={{ marginTop: 12 }}>
              Keep the first pass human-readable. It makes field diagnostics much easier.
            </p>
            <pre className="loop-pre" style={{ marginTop: 14 }}>
{`AIO?
LED 0 255
LED 1 080
PULSE 3 250
ALL 0
MODE ATTRACT 1`}
            </pre>
          </div>
        </div>

        <div className="cap-card" style={{ marginTop: 24 }}>
          <h3>Firmware loop</h3>
          <pre className="loop-pre" style={{ marginTop: 14 }}>
{`Target scan · roughly 1 ms (timing to confirm):
  latch + read 74HC165 digital inputs
  debounce switch states
  read quadrature spinner counters
  sample MCP3208 analog channels
  apply calibration, deadzones, smoothing, inversion
  send HID reports when state changes
  parse LED commands from serial
  update LED PWM outputs`}
          </pre>
          <p className="body" style={{ marginTop: 14, fontSize: 13, color: 'var(--ink-soft)' }}>
            Treat ~1 ms as a target for input responsiveness, not a fixed guarantee — the real rate depends on ADC sampling, HID reporting, and how much serial and LED work each pass does. LED output timing in particular may need tuning: with larger or addressable LED arrays, an update rate that doesn&rsquo;t line up cleanly with the scan loop can surface as visible shimmer or marching artifacts in an animation. The discrete MOSFET PWM channels on v0.1 don&rsquo;t hit this — it only becomes a concern if a cabinet later grows into a big addressable array.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --- §06 BOM ------------------------------------------------- */
const BOM = [
  ['Raspberry Pi Pico H', '1', '$5.00', 'Headers + debug pre-soldered. Cheaper than bare RP2040 for v0.1.'],
  ['74HC165 shift registers', '4 (or 6)', '$3.75–$5.70', '32-input default. Add two for 48-input variant.'],
  ['MCP3208 ADC', '1 (or 2)', '$2.10–$2.80', '8-ch · 12-bit. Second footprint for 16-ch builds.'],
  ['Logic-level N-MOSFET', '10', '$0.50–$3.00', 'AO3400A-class. Low-side LED sinks.'],
  ['Passives · pull-ups, caps, filters', 'lot', '$2.00–$6.00', 'Input pull-ups, gate resistors, ADC filtering, decoupling.'],
  ['Power protection', '1 set', '$1.50–$4.00', 'Fuse / polyfuse, reverse protection, bulk cap, status LEDs.'],
  ['PCB fabrication', '1', '$2.00–$8.00', 'Five-board prototype deals are common.'],
  ['PCB assembly', 'opt.', '$2.00–$8.00', 'Amortised if SMT assembled; THT terminals often hand-installed.'],
  ['Connectors / terminals', 'many', '$6.00–$25.00+', 'Biggest swing item. Pluggable name-brand raises cost fast.']
];

function BOMSection() {
  return (
    <section id="bom" data-screen-label="05 BOM">
      <div className="wrap">
        <div className="folio">
          <span className="num">§ 05</span>
          <span className="ttl">Prototype BOM, excluding controls</span>
          <span className="meta">Board-side electronics</span>
        </div>
        <hr className="rule" />

        <div className="cap-head">
          <div>
            <span className="eyebrow">§ 05 · Prototype BOM</span>
            <h2 style={{ marginTop: 14 }}>
              Prototype BOM,<br/>excluding controls
            </h2>
          </div>
          <p className="body" style={{ alignSelf: 'end' }}>
            This excludes joysticks, buttons, and spinners. It includes the board-side electronics needed to read those controls and drive a small number of LEDs.
          </p>
        </div>

        <div className="bom-grid" style={{ marginTop: 36 }}>
          <table className="spec bom-table">
            <thead>
              <tr>
                <th style={{ width: '34%' }}>Subsystem</th>
                <th style={{ width: '12%' }}>Qty</th>
                <th style={{ width: '18%' }}>Prototype cost</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {BOM.map((row, i) => (
                <tr key={i}>
                  <td className="val">{row[0]}</td>
                  <td className="label numerals">{row[1]}</td>
                  <td className="val numerals" style={{ color: 'var(--vermilion)' }}>{row[2]}</td>
                  <td className="val" style={{ color: 'var(--ink-soft)' }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className="target-card">
            <h3>Realistic board-side target</h3>
            <p className="body" style={{ marginTop: 10, fontSize: 14 }}>
              For a small batch using a Pico H module and screw terminals, budget roughly:
            </p>
            <div className="big-num">
              <span className="numerals">$35–$55</span>
              <span className="big-num-sub">per populated board</span>
            </div>
            <p className="body" style={{ marginTop: 14, fontSize: 13 }}>
              Expanded analog or digital variants usually add more connector cost than chip cost.
            </p>

            <hr className="rule" style={{ margin: '20px 0' }} />
            <span className="mono-xs" style={{ color: 'var(--vermilion)' }}>COST TRAP</span>
            <p className="body" style={{ fontSize: 13, marginTop: 6 }}>
              Connectors dominate the small-batch BOM. Do not over-optimize the MCU before deciding how cabinets will actually be wired.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* --- §07 BUILD SEQUENCE ------------------------------------ */
const PASSES = [
  {
    id: 'A', title: 'Pass A — bench prototype',
    body: 'Wire a Pico H, one MCP3208, four 74HC165s, a few MOSFET outputs, one spinner, one Hall joystick or pot, and a handful of switches on a breadboard/perfboard.'
  },
  {
    id: 'B', title: 'Pass B — cabinet-real test',
    body: 'Move the prototype into a cabinet-like wiring environment. Test long runs, power-supply noise, USB reconnects, Unity restarts, and fast spinner motion.'
  },
  {
    id: 'C', title: 'Pass C — Pico carrier PCB',
    body: 'Lay out the v0.1 carrier board around the Pico H module. Keep BOOTSEL/RUN accessible, add readable silkscreen, and include test pads for every bus.'
  }
];

const DONTS = [
  'Do not integrate the bare RP2040 until the carrier has survived real cabinets.',
  'Do not make the first LED system RGB-heavy unless a cabinet actually needs it.',
  'Do not use a button matrix for cabinet controls; shift registers avoid ghosting.',
  'Do not assume every Hall joystick output is 3.3V-safe — protect or divide 5V outputs.',
  'Do not over-invest in a GUI configurator before the pinout and protocol stabilise.',
  'Do not make terminal labels tiny. Field-wiring readability is a real feature.'
];


/* --- §08 COLOPHON / SOURCES -------------------------------- */
const SOURCES = [
  ['Raspberry Pi Pico documentation', 'GPIO · ADC · PWM · USB · PIO', 'https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html'],
  ['Raspberry Pi Pico H launch note', 'Pre-soldered headers · debug', 'https://www.raspberrypi.com/news/raspberry-pi-pico-w-your-6-iot-platform/'],
  ['Texas Instruments SN74HC165', 'Parallel-in serial-out · 8 bit', 'https://www.ti.com/product/SN74HC165'],
  ['Microchip MCP3208', '12-bit SPI ADC · 8 channels', 'https://www.microchip.com/en-us/product/mcp3208'],
  ['Ultimarc SpinTrak', 'Quadrature spinner reference', 'https://www.ultimarc.com/trackballs-and-spinners/spinners/spintrak/'],
  ['DigiKey SN74HC165N', 'Pricing reference', 'https://www.digikey.com/en/products/detail/texas-instruments/SN74HC165N/376966'],
  ['DigiKey MCP3208-CI/SL', 'Pricing reference', 'https://www.digikey.com/en/products/detail/microchip-technology/MCP3208-CI-SL/305929'],
  ['LCSC AO3400A', 'MOSFET pricing reference', 'https://www.lcsc.com/product-detail/C20917.html'],
  ['JLCPCB assembly', 'PCBA pricing reference', 'https://jlcpcb.com/help/article/pcb-assembly-price'],
  ['JLCPCB prototype', 'PCB fabrication pricing', 'https://jlcpcb.com/'],
  ['LCSC 5.08mm terminals', 'Connector pricing reference', 'https://www.lcsc.com/product-detail/C474952.html'],
  ['Unity Input System', 'HID device support', 'https://docs.unity3d.com/Packages/com.unity.inputsystem%401.0/manual/HID.html']
];

function Sources() {
  return (
    <section id="sources" data-screen-label="08 Sources">
      <div className="wrap">
        <div className="folio">
          <span className="num">§ 08</span>
          <span className="ttl">Sources and assumptions</span>
          <span className="meta">All prices indicative, USD, 2026</span>
        </div>
        <hr className="rule" />

        <div className="cap-head">
          <div>
            <span className="eyebrow">§ 08 · Sources</span>
            <h2 style={{ marginTop: 14 }}>Sources and assumptions</h2>
          </div>
          <p className="body" style={{ alignSelf: 'end' }}>
            Part prices are rough USD snapshots for prototype planning and can change with supplier, package, quantity, shipping, and availability. Controls themselves — joysticks, buttons, and spinners — are intentionally excluded from the BOM table.
          </p>
        </div>

        <ul className="source-list" style={{ marginTop: 36 }}>
          {SOURCES.map((s, i) => (
            <li key={i}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <a href={s[2]} target="_blank" rel="noopener noreferrer">
                <span className="s-title">{s[0]}</span>
                <span className="s-sub">{s[1]}</span>
              </a>
            </li>
          ))}
        </ul>

        <hr className="rule" style={{ marginTop: 56 }} />
        <p className="body" style={{ marginTop: 24, fontSize: 14, color: 'var(--ink-faint)' }}>
          Generated as a single-file HTML prototype for GitHub Pages. Rename to <code>index.html</code> or drop into an existing docs folder.
        </p>

        <hr className="rule" style={{ marginTop: 32 }} />
        <div className="endmark">
          <div className="endmark-bar"></div>
          <div className="endmark-text">
            End of field manual.
            <span className="mono-xs" style={{ color: 'var(--ink-faint)' }}>ARCADE I/O · PICO CARRIER v0.1 · 8 / 8</span>
          </div>
          <div className="endmark-bar"></div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOUNT ALL SECTIONS
   ============================================================ */
function App() {
  return (
    <>
      <Capacity />
      <Connectors />
      <BOMSection />
      <Firmware />
      <Sources />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('rest')).render(<App />);
