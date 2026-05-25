/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, TweakSlider */

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper",
  "accent": "#d23f1f",
  "data": "#1f3a68",
  "power": "#b88b2c",
  "blueprint": true,
  "grain": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', t.theme);
    root.style.setProperty('--vermilion', t.accent);
    root.style.setProperty('--inkblue', t.data);
    root.style.setProperty('--gold', t.power);
    document.body.style.setProperty('--grain-on', t.grain ? '.35' : '0');
  }, [t]);

  // Keyboard shortcut: press 'T' to open Tweaks
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 't' || e.key === 'T') {
        window.postMessage({ type: '__activate_edit_mode' }, '*');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Re-trigger blueprint animations when theme changes
  useEffect(() => {
    if (!t.blueprint) return;
    const els = document.querySelectorAll('.draw-on-view');
    els.forEach(el => {
      el.classList.remove('play');
      void el.offsetWidth;
      el.classList.add('play');
    });
  }, [t.theme]);

  return (
    <TweaksPanel title="Tweaks · Field Guide">
      <TweakSection label="Paper" />
      <TweakRadio
        label="Stock"
        value={t.theme}
        options={['paper', 'oxide', 'blueprint']}
        onChange={(v) => setTweak('theme', v)}
      />
      <TweakToggle
        label="Paper grain"
        value={t.grain}
        onChange={(v) => setTweak('grain', v)}
      />

      <TweakSection label="Inks" />
      <TweakColor
        label="Vermilion · signature"
        value={t.accent}
        options={['#d23f1f', '#b03020', '#e8624a', '#7a2418', '#cc4f3a']}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakColor
        label="Ink-blue · data"
        value={t.data}
        options={['#1f3a68', '#163056', '#2e5a8a', '#27457a']}
        onChange={(v) => setTweak('data', v)}
      />
      <TweakColor
        label="Gold · power"
        value={t.power}
        options={['#b88b2c', '#a07820', '#cc9d33', '#8a691f']}
        onChange={(v) => setTweak('power', v)}
      />

      <TweakSection label="Animation" />
      <TweakToggle
        label="Blueprint draw-on"
        value={t.blueprint}
        onChange={(v) => setTweak('blueprint', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(
  (() => { const el = document.createElement('div'); document.body.appendChild(el); return el; })()
).render(<TweaksApp />);
