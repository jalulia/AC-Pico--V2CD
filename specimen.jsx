/* global React, ReactDOM */
const { useEffect, useRef } = React;

/* ============================================================
   COVER SPECIMEN — small exploded line drawing of the carrier
   Animated draw-on with registration marks & callouts.
   ============================================================ */

function Specimen() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('play'); });
    }, { threshold: .25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <svg ref={ref} className="draw-on-view" viewBox="0 0 720 460" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      {/* registration corners */}
      <g className="ink hair">
        <path d="M14 14 L14 30 M14 14 L30 14" />
        <path d="M706 14 L706 30 M706 14 L690 14" />
        <path d="M14 446 L14 430 M14 446 L30 446" />
        <path d="M706 446 L706 430 M706 446 L690 446" />
      </g>

      {/* axis crosshair light */}
      <g className="ink hair" opacity=".25">
        <line x1="360" y1="36" x2="360" y2="424" strokeDasharray="2 5" />
        <line x1="40" y1="230" x2="680" y2="230" strokeDasharray="2 5" />
      </g>

      {/* scale bar */}
      <g transform="translate(40 410)" className="ink hair">
        <line x1="0" y1="0" x2="80" y2="0" />
        <line x1="0" y1="-4" x2="0" y2="4" />
        <line x1="40" y1="-3" x2="40" y2="3" />
        <line x1="80" y1="-4" x2="80" y2="4" />
        <text x="0" y="18" className="lbl-sm fill-only" stroke="none">0    40    80 mm</text>
      </g>

      {/* compass */}
      <g transform="translate(660 410)" className="ink hair">
        <circle cx="0" cy="0" r="14" />
        <path d="M0 -10 L4 0 L0 10 L-4 0 Z" className="ink-fill fill-only" stroke="none" />
        <text x="-3" y="-18" className="lbl-sm fill-only" stroke="none">N</text>
      </g>

      {/* === Board outline (carrier PCB) === */}
      <g className="ink" strokeWidth="1.25">
        <rect x="120" y="100" width="480" height="260" rx="8" />
        {/* mounting holes */}
        <circle cx="140" cy="120" r="5" />
        <circle cx="580" cy="120" r="5" />
        <circle cx="140" cy="340" r="5" />
        <circle cx="580" cy="340" r="5" />
        <circle cx="140" cy="120" r="2" className="ink-fill fill-only" stroke="none" />
        <circle cx="580" cy="120" r="2" className="ink-fill fill-only" stroke="none" />
        <circle cx="140" cy="340" r="2" className="ink-fill fill-only" stroke="none" />
        <circle cx="580" cy="340" r="2" className="ink-fill fill-only" stroke="none" />
      </g>

      {/* === Pico module (raised, dashed shadow to imply 3D) === */}
      <g className="ink" strokeWidth="1">
        <rect x="312" y="186" width="96" height="120" rx="3" />
        {/* RP2040 chip */}
        <rect x="338" y="220" width="44" height="36" />
        {/* USB port at bottom */}
        <rect x="340" y="296" width="40" height="14" rx="1" />
        {/* castellated pins L */}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={'l' + i} x="307" y={194 + i * 11} width="5" height="6" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={'r' + i} x="408" y={194 + i * 11} width="5" height="6" />
        ))}
        {/* boot button */}
        <rect x="378" y="266" width="14" height="10" rx="2" />
        {/* led */}
        <circle cx="328" cy="272" r="3" />
      </g>

      {/* dashed offset shadow = "exploded floating" cue */}
      <g className="ink hair" strokeDasharray="3 4" opacity=".55">
        <rect x="318" y="192" width="96" height="120" rx="3" />
      </g>

      {/* === Shift-register chain (top of board, line of 4 chips) === */}
      <g className="ink" strokeWidth="1">
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <rect x={170 + i * 70} y="124" width="50" height="24" />
            {/* pin marks */}
            {Array.from({ length: 8 }).map((_, j) => (
              <rect key={j} x={172 + i * 70 + j * 6} y="148" width="2" height="3" />
            ))}
            {Array.from({ length: 8 }).map((_, j) => (
              <rect key={'t' + j} x={172 + i * 70 + j * 6} y="121" width="2" height="3" />
            ))}
            <text x={184 + i * 70} y="139" className="lbl-sm fill-only" stroke="none">165</text>
          </g>
        ))}
      </g>

      {/* === MCP3208 (bottom of board) === */}
      <g className="ink" strokeWidth="1">
        <rect x="250" y="324" width="60" height="22" />
        {Array.from({ length: 8 }).map((_, j) => (
          <rect key={j} x={252 + j * 7} y="346" width="2" height="3" />
        ))}
        {Array.from({ length: 8 }).map((_, j) => (
          <rect key={'t' + j} x={252 + j * 7} y="321" width="2" height="3" />
        ))}
        <text x="263" y="338" className="lbl-sm fill-only" stroke="none">3208</text>
      </g>

      {/* === MOSFET row (bottom-right) === */}
      <g className="ink" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <rect x={428 + i * 16} y="324" width="10" height="14" />
            <line x1={433 + i * 16} y1="338" x2={433 + i * 16} y2="345" />
            <line x1={430 + i * 16} y1="324" x2={430 + i * 16} y2="320" />
            <line x1={436 + i * 16} y1="324" x2={436 + i * 16} y2="320" />
          </g>
        ))}
      </g>

      {/* === Connector strips (perimeter terminals) === */}
      {/* TOP - J_DIGITAL */}
      <g className="ink" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i}>
            <rect x={150 + i * 26} y="108" width="20" height="10" rx="2" />
            <circle cx={160 + i * 26} cy="113" r="1.5" className="ink-fill fill-only" stroke="none" />
          </g>
        ))}
      </g>

      {/* BOTTOM-LEFT - J_SPIN (rotated, vertical strip at left) */}
      <g className="ink" strokeWidth="1">
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={i}>
            <rect x="128" y={170 + i * 32} width="22" height="22" rx="2" />
            <circle cx="139" cy={181 + i * 32} r="1.5" className="ink-fill fill-only" stroke="none" />
            <text x="155" y={185 + i * 32} className="lbl-sm fill-only" stroke="none">S{i}</text>
          </g>
        ))}
      </g>

      {/* RIGHT - J_LED_OUT (vertical right side) */}
      <g className="ink" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <rect x="570" y={140 + i * 18} width="20" height="12" rx="2" />
            <circle cx="580" cy="146" r="0" />
          </g>
        ))}
      </g>

      {/* BOTTOM right - J_LED_POWER */}
      <g className="ink" strokeWidth="1.5">
        <rect x="500" y="324" width="56" height="22" rx="2" />
        <text x="513" y="338" className="lbl-sm fill-only" stroke="none">VLED+</text>
      </g>

      {/* === Leader-line callouts === */}
      <g className="leader">
        {/* 01 - shift registers */}
        <path d="M210 130 L210 76" />
        <circle cx="210" cy="68" r="10" className="verm-fill fill-only" stroke="none" />
        <text x="206" y="71" className="lbl-num fill-only" stroke="none">01</text>

        {/* 02 - Pico */}
        <path d="M360 240 L470 60" />
        <circle cx="478" cy="56" r="10" className="verm-fill fill-only" stroke="none" />
        <text x="474" y="59" className="lbl-num fill-only" stroke="none">02</text>

        {/* 03 - MCP3208 */}
        <path d="M280 346 L210 400" />
        <circle cx="200" cy="404" r="10" className="ink-fill fill-only" stroke="none" />
        <text x="194" y="407" className="lbl-num fill-only" stroke="none">03</text>

        {/* 04 - MOSFET row */}
        <path d="M510 338 L580 400" />
        <circle cx="590" cy="404" r="10" className="gold-fill fill-only" stroke="none" />
        <text x="584" y="407" className="lbl-num fill-only" stroke="none">04</text>

        {/* 05 - USB */}
        <path d="M360 308 L360 380 L420 380" />
        <circle cx="432" cy="380" r="10" className="ink-fill fill-only" stroke="none" />
        <text x="425" y="383" className="lbl-num fill-only" stroke="none">05</text>

        {/* 06 - Spinner */}
        <path d="M138 180 L70 180" />
        <circle cx="58" cy="180" r="10" className="verm-fill fill-only" stroke="none" />
        <text x="52" y="183" className="lbl-num fill-only" stroke="none">06</text>
      </g>

      {/* tiny side labels removed (collided with callouts; scale bar and compass carry the meaning) */}
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById('specimen')).render(<Specimen />);
