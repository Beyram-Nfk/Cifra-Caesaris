// Your JavaScript code goes here
function exampleFunction() {
    console.log('Hello, World!');
}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caesar Cipher — Veni Vidi Scripsi</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --cream: #FAF7F2;
    --parchment: #F0EAD8;
    --parchment-dark: #DDD4BC;
    --ink: #0D0D0D;
    --ink-soft: #2C2C2C;
    --ink-mid: #4A4A4A;
    --ink-light: #7A7468;
    --gold: #8B6914;
    --gold-light: #B8941F;
    --gold-pale: #D4B96A;
    --julius-red: #6B1212;
    --julius-mid: #922020;
    --augustus-navy: #0F2B52;
    --augustus-mid: #1E4280;
    --rule: #C8BEA8;
    --rule-dark: #A8997E;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Cormorant Garamond', Georgia, serif;
    background-color: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(212,185,106,0.08) 0%, transparent 55%),
      radial-gradient(ellipse at 15% 100%, rgba(212,185,106,0.06) 0%, transparent 45%),
      repeating-linear-gradient(112deg, transparent 0px, transparent 90px, rgba(180,165,130,0.06) 90px, rgba(180,165,130,0.06) 92px),
      repeating-linear-gradient(68deg, transparent 0px, transparent 140px, rgba(180,165,130,0.04) 140px, rgba(180,165,130,0.04) 141px);
    pointer-events: none;
    z-index: 0;
  }

  .pillar-left, .pillar-right {
    position: fixed;
    top: 0; bottom: 0;
    width: 80px;
    z-index: 0;
    pointer-events: none;
  }
  .pillar-left  { left: 0; }
  .pillar-right { right: 0; }

  .pillar-svg { width: 80px; height: 100%; min-height: 100vh; }

  .container {
    position: relative;
    z-index: 1;
    max-width: 840px;
    margin: 0 auto;
    padding: 52px 24px 80px;
  }

  header {
    text-align: center;
    margin-bottom: 48px;
    animation: fadeDown 0.9s cubic-bezier(.22,.8,.36,1) both;
  }

  .header-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .orn-line { height: 1px; width: 60px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
  .orn-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }
  .orn-dot { width: 3px; height: 3px; background: var(--gold-pale); border-radius: 50%; flex-shrink: 0; }

  .title-sub {
    font-family: 'Cinzel', serif;
    font-size: clamp(0.55rem, 1.5vw, 0.72rem);
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
    font-weight: 400;
  }

  h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.4rem, 7vw, 4.4rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    line-height: 1.05;
  }

  .subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    color: var(--ink-mid);
    font-size: 1.1rem;
    margin-top: 8px;
    letter-spacing: 0.04em;
  }

  .header-rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 18px;
  }
  .rule-l { height: 1px; width: 100px; background: linear-gradient(90deg, transparent, var(--rule-dark)); }
  .rule-r { height: 1px; width: 100px; background: linear-gradient(90deg, var(--rule-dark), transparent); }

  /* EMPEROR CARDS */
  .emperors {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 24px;
    animation: fadeUp 0.9s 0.15s cubic-bezier(.22,.8,.36,1) both;
  }

  @media(max-width:560px) {
    .emperors { grid-template-columns: 1fr; }
    .pillar-left, .pillar-right { display: none; }
  }

  .emperor-card {
    position: relative;
    padding: 20px 18px 16px;
    cursor: pointer;
    transition: all 0.28s ease;
    background: white;
    border: 1px solid var(--rule);
    box-shadow: 0 1px 8px rgba(0,0,0,0.04);
    overflow: hidden;
  }

  .emperor-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    opacity: 0;
    transition: opacity 0.28s;
  }
  .emperor-card.julius::after   { background: var(--julius-red); }
  .emperor-card.augustus::after { background: var(--augustus-navy); }
  .emperor-card.active::after   { opacity: 1; }
  .emperor-card.active { box-shadow: 0 4px 20px rgba(0,0,0,0.09); border-color: var(--rule-dark); }
  .emperor-card:not(.active) { opacity: 0.52; }
  .emperor-card:hover:not(.active) { opacity: 0.8; }

  .emp-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }

  .emp-sigil {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif;
    font-weight: 700;
    font-size: 0.78rem;
    flex-shrink: 0;
    letter-spacing: 0.04em;
  }
  .julius .emp-sigil   { background: rgba(107,18,18,0.07); border: 1.5px solid var(--julius-mid); color: var(--julius-red); }
  .augustus .emp-sigil { background: rgba(15,43,82,0.07); border: 1.5px solid var(--augustus-mid); color: var(--augustus-navy); }

  .emp-name { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.07em; color: var(--ink); line-height: 1.2; }
  .emp-era  { font-size: 0.7rem; color: var(--ink-light); font-style: italic; letter-spacing: 0.04em; margin-top: 2px; }

  .emp-shift {
    display: flex; align-items: center; gap: 8px;
    margin: 6px 0 4px;
    font-family: 'Cinzel', serif;
    font-size: 0.68rem; letter-spacing: 0.15em;
    color: var(--ink-mid); text-transform: uppercase;
  }

  .shift-badge {
    width: 24px; height: 24px; border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.9rem; font-family: 'Cinzel', serif;
  }
  .julius .shift-badge   { background: var(--julius-red); color: white; }
  .augustus .shift-badge { background: var(--augustus-navy); color: white; }

  .emp-desc { font-size: 0.78rem; color: var(--ink-light); font-style: italic; line-height: 1.55; }

  /* TOOL PANEL */
  .tool-panel {
    background: white;
    border: 1px solid var(--rule);
    padding: 28px 26px 26px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.055);
    position: relative;
    animation: fadeUp 0.9s 0.25s cubic-bezier(.22,.8,.36,1) both;
  }
  .tool-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold-pale) 50%, var(--gold) 70%, transparent);
  }

  .mode-toggle {
    display: flex; gap: 0;
    margin-bottom: 22px;
    border: 1px solid var(--rule);
    width: fit-content; overflow: hidden;
  }

  .mode-btn {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
    padding: 9px 20px;
    background: transparent; color: var(--ink-light);
    border: none; border-right: 1px solid var(--rule);
    cursor: pointer; transition: all 0.2s;
  }
  .mode-btn:last-child { border-right: none; }
  .mode-btn.active { background: var(--ink); color: white; }
  .mode-btn:not(.active):hover { background: var(--parchment); color: var(--ink-mid); }

  .field-label {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--ink-light); margin-bottom: 7px; display: block;
  }

  textarea {
    width: 100%;
    background: var(--cream);
    border: 1px solid var(--rule);
    color: var(--ink);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.12rem;
    padding: 12px 14px;
    resize: vertical; min-height: 90px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.04em; line-height: 1.6;
  }
  textarea::placeholder { color: var(--rule-dark); font-style: italic; }
  textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(139,105,20,0.07); }

  .cipher-btn { display: flex; gap: 10px; margin: 16px 0; align-items: center; }

  .btn-execute {
    font-family: 'Cinzel', serif;
    font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
    padding: 10px 26px;
    background: var(--ink); color: white;
    border: 2px solid var(--ink);
    cursor: pointer; transition: all 0.2s;
  }
  .btn-execute:hover { background: white; color: var(--ink); }

  .btn-clear {
    font-family: 'Cinzel', serif;
    font-size: 0.64rem; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 8px 16px;
    background: transparent; color: var(--ink-light);
    border: 1px solid var(--rule);
    cursor: pointer; transition: all 0.2s;
  }
  .btn-clear:hover { border-color: var(--ink-light); color: var(--ink-mid); }

  .result-row {
    border: 1px solid var(--rule);
    padding: 14px 15px;
    margin-bottom: 2px;
    background: var(--cream);
    position: relative;
    cursor: pointer;
    transition: background 0.18s;
    animation: slideIn 0.32s ease both;
  }
  .result-row:hover { background: var(--parchment); }
  .result-row.julius-result   { border-left: 3px solid var(--julius-red); }
  .result-row.augustus-result { border-left: 3px solid var(--augustus-navy); }

  .result-emperor {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase;
    margin-bottom: 6px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .julius-result .result-emperor   { color: var(--julius-red); }
  .augustus-result .result-emperor { color: var(--augustus-navy); }

  .copy-hint { font-size: 0.56rem; color: var(--ink-light); opacity: 0; transition: opacity 0.18s; font-style: italic; font-family:'Cormorant Garamond',serif; }
  .result-row:hover .copy-hint { opacity: 1; }

  .result-text { font-family: 'Cormorant Garamond', serif; font-size: 1.18rem; color: var(--ink); letter-spacing: 0.1em; line-height: 1.6; word-break: break-all; }

  .copied-flash {
    position: absolute; top: 9px; right: 11px;
    font-family: 'Cinzel', serif; font-size: 0.56rem; letter-spacing: 0.2em;
    color: var(--gold); opacity: 0; transition: opacity 0.18s; pointer-events: none;
  }
  .copied-flash.show { opacity: 1; }

  .empty-state { text-align: center; padding: 34px 20px; font-style: italic; color: var(--rule-dark); font-size: 0.92rem; letter-spacing: 0.04em; }

  .comparison { margin-top: 10px; border: 1px solid var(--rule); overflow: hidden; animation: fadeUp 0.35s ease both; }
  .comp-header { background: var(--parchment); padding: 8px 13px; font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--ink-light); border-bottom: 1px solid var(--rule); }
  .comp-row { display: grid; grid-template-columns: 60px 1fr 1fr 80px; border-bottom: 1px solid rgba(200,190,168,0.4); }
  .comp-row:last-child { border-bottom: none; }
  .comp-row:nth-child(even) { background: rgba(240,234,216,0.3); }
  .comp-row.comp-head { background: var(--parchment); font-family: 'Cinzel', serif; font-size: 0.56rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-light); }
  .comp-cell { padding: 7px 11px; border-right: 1px solid rgba(200,190,168,0.4); font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; letter-spacing: 0.05em; }
  .comp-cell:last-child { border-right: none; }
  .comp-cell.plain      { color: var(--ink-mid); }
  .comp-cell.julius-c   { color: var(--julius-red); }
  .comp-cell.augustus-c { color: var(--augustus-navy); }

  .custom-section { margin-top: 22px; padding: 16px 18px; border: 1px dashed var(--rule); background: rgba(240,234,216,0.2); }
  .custom-row { display: flex; align-items: flex-start; gap: 12px; margin-top: 9px; flex-wrap: wrap; }
  .custom-label { font-family: 'Cinzel', serif; font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 4px; display: block; }

  .shift-input {
    font-family: 'Cinzel', serif; font-size: 1.1rem;
    width: 56px; text-align: center;
    background: white; border: 1px solid var(--rule); color: var(--ink);
    padding: 6px; outline: none; transition: border-color 0.2s;
  }
  .shift-input:focus { border-color: var(--gold); }

  .custom-result {
    flex: 1; min-width: 180px;
    font-family: 'Cormorant Garamond', serif; font-size: 1.02rem; color: var(--ink);
    background: white; padding: 9px 12px; border: 1px solid var(--rule);
    letter-spacing: 0.06em; min-height: 36px; word-break: break-all; line-height: 1.55;
  }

  .sect-divider { display: flex; align-items: center; gap: 12px; margin: 26px 0 18px; }
  .sect-divider-line { flex: 1; height: 1px; background: var(--rule); }
  .sect-divider-text { font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-light); white-space: nowrap; }

  .alphabet-section { background: white; border: 1px solid var(--rule); padding: 18px 20px; box-shadow: 0 1px 6px rgba(0,0,0,0.04); animation: fadeUp 0.5s ease both; }
  .alpha-heading { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.26em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 9px; padding-bottom: 5px; border-bottom: 1px solid var(--rule); }
  .alpha-strip { display: flex; flex-wrap: wrap; gap: 3px; }
  .alpha-item { text-align: center; width: 27px; }
  .alpha-orig { font-family: 'Cinzel', serif; font-size: 0.56rem; color: var(--ink-light); margin-bottom: 1px; }
  .alpha-shifted { font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 600; padding: 2px 3px; border-radius: 2px; }
  .julius-alpha .alpha-shifted   { color: var(--julius-red); background: rgba(107,18,18,0.06); }
  .augustus-alpha .alpha-shifted { color: var(--augustus-navy); background: rgba(15,43,82,0.06); }

  .hist-note {
    margin-top: 24px;
    padding: 16px 18px;
    border: 1px solid var(--rule);
    border-left: 3px solid var(--gold);
    background: rgba(240,234,216,0.2);
    font-style: italic; font-size: 0.86rem; color: var(--ink-mid); line-height: 1.75;
    animation: fadeUp 0.5s 0.1s ease both;
  }
  .hist-note strong { font-family: 'Cinzel', serif; font-style: normal; font-size: 0.58rem; letter-spacing: 0.25em; color: var(--gold); display: block; margin-bottom: 6px; text-transform: uppercase; }

  footer { text-align: center; margin-top: 48px; font-family: 'Cinzel', serif; font-size: 0.56rem; letter-spacing: 0.38em; color: var(--ink-light); text-transform: uppercase; opacity: 0.55; animation: fadeUp 0.5s 0.3s ease both; }

  @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeUp   { from { opacity:0; transform:translateY(12px);  } to { opacity:1; transform:translateY(0); } }
  @keyframes slideIn  { from { opacity:0; transform:translateX(-7px);  } to { opacity:1; transform:translateX(0); } }
</style>
</head>
<body>

<!-- LEFT PILLAR -->
<div class="pillar-left">
<svg class="pillar-svg" viewBox="0 0 80 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pgL" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%"   stop-color="#CAC0A8"/>
      <stop offset="35%"  stop-color="#EDE4CC"/>
      <stop offset="65%"  stop-color="#F5F0E2"/>
      <stop offset="100%" stop-color="#DDD4BC"/>
    </linearGradient>
    <linearGradient id="capL" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%"   stop-color="#BFBA9E"/>
      <stop offset="50%"  stop-color="#E8E0CA"/>
      <stop offset="100%" stop-color="#C8C0A4"/>
    </linearGradient>
  </defs>
  <!-- Shaft -->
  <rect x="16" y="90" width="48" height="720" fill="url(#pgL)"/>
  <!-- Fluting -->
  <rect x="19" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.09)"/>
  <rect x="25" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="31" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="37" y="90" width="3"   height="720" fill="rgba(255,255,255,0.35)"/>
  <rect x="44" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="50" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="56" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.09)"/>
  <rect x="62" y="90" width="2"   height="720" fill="rgba(0,0,0,0.04)"/>
  <!-- Capital -->
  <rect x="8"  y="70" width="64" height="8"  fill="#D8D0BA"/>
  <rect x="4"  y="62" width="72" height="9"  fill="#E0D8C2"/>
  <rect x="8"  y="56" width="64" height="7"  fill="#EAE2CA" rx="1"/>
  <!-- Echinus (curved cap detail) -->
  <path d="M12,56 Q40,44 68,56" fill="none" stroke="#C8BEA0" stroke-width="2"/>
  <ellipse cx="40" cy="50" rx="30" ry="7" fill="#DED4B8" stroke="#C8BEA0" stroke-width="0.5"/>
  <!-- Neck rings -->
  <rect x="18" y="36" width="44" height="3" fill="#CBBFA4" rx="1"/>
  <rect x="18" y="32" width="44" height="3" fill="#CBBFA4" rx="1"/>
  <rect x="18" y="28" width="44" height="3" fill="#CBBFA4" rx="1"/>
  <!-- Column neck -->
  <rect x="18" y="40" width="44" height="16" fill="#E4DCCA"/>
  <!-- Base -->
  <rect x="12" y="810" width="56" height="8"  fill="#D8D0BA"/>
  <rect x="6"  y="818" width="68" height="7"  fill="#DEDAD2"/>
  <rect x="2"  y="825" width="76" height="9"  fill="#CAC2AA" rx="1"/>
  <rect x="0"  y="834" width="80" height="6"  fill="#BEB6A0" rx="1"/>
  <!-- Shadow edges -->
  <rect x="62" y="90" width="2" height="720" fill="rgba(0,0,0,0.05)"/>
</svg>
</div>

<!-- RIGHT PILLAR -->
<div class="pillar-right">
<svg class="pillar-svg" viewBox="0 0 80 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pgR" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%"   stop-color="#DDD4BC"/>
      <stop offset="35%"  stop-color="#F5F0E2"/>
      <stop offset="65%"  stop-color="#EDE4CC"/>
      <stop offset="100%" stop-color="#CAC0A8"/>
    </linearGradient>
  </defs>
  <rect x="16" y="90" width="48" height="720" fill="url(#pgR)"/>
  <rect x="19" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.09)"/>
  <rect x="25" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="31" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="37" y="90" width="3"   height="720" fill="rgba(255,255,255,0.35)"/>
  <rect x="44" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="50" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.06)"/>
  <rect x="56" y="90" width="2.5" height="720" fill="rgba(0,0,0,0.09)"/>
  <rect x="16" y="90" width="2"   height="720" fill="rgba(0,0,0,0.04)"/>
  <rect x="8"  y="70" width="64" height="8"  fill="#D8D0BA"/>
  <rect x="4"  y="62" width="72" height="9"  fill="#E0D8C2"/>
  <rect x="8"  y="56" width="64" height="7"  fill="#EAE2CA" rx="1"/>
  <path d="M12,56 Q40,44 68,56" fill="none" stroke="#C8BEA0" stroke-width="2"/>
  <ellipse cx="40" cy="50" rx="30" ry="7" fill="#DED4B8" stroke="#C8BEA0" stroke-width="0.5"/>
  <rect x="18" y="36" width="44" height="3" fill="#CBBFA4" rx="1"/>
  <rect x="18" y="32" width="44" height="3" fill="#CBBFA4" rx="1"/>
  <rect x="18" y="28" width="44" height="3" fill="#CBBFA4" rx="1"/>
  <rect x="18" y="40" width="44" height="16" fill="#E4DCCA"/>
  <rect x="12" y="810" width="56" height="8"  fill="#D8D0BA"/>
  <rect x="6"  y="818" width="68" height="7"  fill="#DEDAD2"/>
  <rect x="2"  y="825" width="76" height="9"  fill="#CAC2AA" rx="1"/>
  <rect x="0"  y="834" width="80" height="6"  fill="#BEB6A0" rx="1"/>
</svg>
</div>

<!-- MAIN CONTENT -->
<div class="container">

  <header>
    <div class="header-ornament">
      <div class="orn-dot"></div>
      <div class="orn-line"></div>
      <div class="orn-diamond"></div>
      <div class="orn-line" style="background:linear-gradient(90deg,var(--gold),transparent)"></div>
      <div class="orn-dot"></div>
    </div>
    <p class="title-sub">The Imperial Cipher</p>
    <h1>Cifra Caesaris</h1>
    <p class="subtitle">Veni, Vidi, Scripsi — I came, I saw, I wrote</p>
    <div class="header-rule">
      <div class="rule-l"></div>
      <div class="orn-diamond"></div>
      <div class="rule-r"></div>
    </div>
  </header>

  <!-- EMPEROR CARDS -->
  <div class="emperors">
    <div class="emperor-card julius active" onclick="selectEmperor('julius')">
      <div class="emp-header">
        <div class="emp-sigil">IC</div>
        <div>
          <div class="emp-name">Julius Caesar</div>
          <div class="emp-era">Dictator Perpetuo · 44 BC</div>
        </div>
      </div>
      <div class="emp-shift">
        Shift: <span class="shift-badge">3</span>
        <span style="font-style:italic;font-family:'Cormorant Garamond',serif;font-size:0.82rem;color:var(--ink-light);letter-spacing:0.03em">A encodes as D</span>
      </div>
      <div class="emp-desc">As recorded by Suetonius — Caesar shifted each letter three positions forward to conceal military dispatches from enemies.</div>
    </div>

    <div class="emperor-card augustus" onclick="selectEmperor('augustus')">
      <div class="emp-header">
        <div class="emp-sigil">OA</div>
        <div>
          <div class="emp-name">Augustus Caesar</div>
          <div class="emp-era">Princeps · 27 BC – 14 AD</div>
        </div>
      </div>
      <div class="emp-shift">
        Shift: <span class="shift-badge">1</span>
        <span style="font-style:italic;font-family:'Cormorant Garamond',serif;font-size:0.82rem;color:var(--ink-light);letter-spacing:0.03em">A encodes as B</span>
      </div>
      <div class="emp-desc">Augustus adopted a simpler cipher with only a single-position shift — perhaps valuing speed over security for imperial correspondence.</div>
    </div>
  </div>

  <!-- TOOL PANEL -->
  <div class="tool-panel">
    <div class="mode-toggle">
      <button class="mode-btn active" onclick="setMode('encode')" id="btn-encode">⟶ Encode</button>
      <button class="mode-btn"        onclick="setMode('decode')" id="btn-decode">⟵ Decode</button>
      <button class="mode-btn"        onclick="setMode('compare')" id="btn-compare">⊕ Compare</button>
    </div>

    <label class="field-label" id="input-label">Enter plaintext to encode</label>
    <textarea id="main-input" rows="4" placeholder="Type your message here… e.g. VENI VIDI VICI"></textarea>

    <div class="cipher-btn">
      <button class="btn-execute" onclick="processText()">✦ Execute Cipher</button>
      <button class="btn-clear"   onclick="clearAll()">Clear</button>
    </div>

    <div id="results">
      <div class="empty-state">Enter text above and execute the cipher</div>
    </div>

    <div class="custom-section">
      <span class="field-label" style="margin-bottom:2px">✦ Custom Imperial Shift</span>
      <span style="font-size:0.78rem;color:var(--ink-light);font-style:italic;display:block;margin-bottom:7px">Experiment with any shift value 1–25</span>
      <div class="custom-row">
        <div>
          <span class="custom-label">Shift</span>
          <input type="number" class="shift-input" id="custom-shift" value="13" min="1" max="25" oninput="updateCustom()">
        </div>
        <div style="flex:1;min-width:180px">
          <span class="custom-label">Result</span>
          <div class="custom-result" id="custom-result">—</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ALPHABET STRIPS -->
  <div class="sect-divider">
    <div class="sect-divider-line"></div>
    <div class="sect-divider-text">✦ Alphabet Shift Maps ✦</div>
    <div class="sect-divider-line"></div>
  </div>

  <div class="alphabet-section">
    <div class="alpha-heading">Julius Caesar — Shift 3 &nbsp;(A → D)</div>
    <div class="alpha-strip julius-alpha" id="julius-alpha-strip"></div>
    <div class="alpha-heading" style="margin-top:16px">Augustus Caesar — Shift 1 &nbsp;(A → B)</div>
    <div class="alpha-strip augustus-alpha" id="augustus-alpha-strip"></div>
  </div>

  <!-- HISTORICAL NOTE -->
  <div class="hist-note">
    <strong>⟡ Historia</strong>
    The Caesar cipher is among the oldest known encryption methods. Suetonius wrote in <em>The Twelve Caesars</em> (121 AD) that Julius Caesar used a substitution cipher shifting letters three positions — writing D for A, E for B, and so forth. His great-nephew Augustus employed a similar but simpler cipher, shifting only one position. While trivially broken today, these ciphers were sophisticated tools of statecraft in an era when few could read at all.
  </div>

  <footer>Alea Iacta Est &nbsp;·&nbsp; In Nomine Caesaris &nbsp;·&nbsp; MMXXVI</footer>

</div>

<script>
  let currentMode = 'encode', currentEmperor = 'julius';
  const shifts = { julius: 3, augustus: 1 };
  const ALPHA  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function caesar(text, shift, decode) {
    if (decode) shift = (26 - shift) % 26;
    return text.toUpperCase().split('').map(ch => {
      const i = ALPHA.indexOf(ch);
      return i === -1 ? ch : ALPHA[(i + shift) % 26];
    }).join('');
  }

  function selectEmperor(emp) {
    currentEmperor = emp;
    document.querySelectorAll('.emperor-card').forEach(c => c.classList.remove('active'));
    document.querySelector('.emperor-card.' + emp).classList.add('active');
    if (document.getElementById('main-input').value) processText();
    updateCustom();
  }

  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + mode).classList.add('active');
    const lbl = document.getElementById('input-label');
    const ta  = document.getElementById('main-input');
    if (mode === 'encode')  { lbl.textContent = 'Enter plaintext to encode'; ta.placeholder = 'Type your message here… e.g. VENI VIDI VICI'; }
    else if (mode === 'decode') { lbl.textContent = 'Enter ciphertext to decode'; ta.placeholder = 'Enter encoded text… e.g. YHQL YLGL YLFL'; }
    else { lbl.textContent = 'Enter text to compare both ciphers'; ta.placeholder = "Type any text to see both emperors' encodings side-by-side…"; }
    if (ta.value) processText();
  }

  function processText() {
    const input = document.getElementById('main-input').value.trim();
    const div   = document.getElementById('results');
    if (!input) { div.innerHTML = '<div class="empty-state">Enter text above and execute the cipher</div>'; return; }
    const isDecode = currentMode === 'decode';
    if (currentMode === 'compare') {
      div.innerHTML =
        resultCard('julius',   'Julius Caesar — Shift 3 — Encoded', caesar(input, 3, false), 0) +
        resultCard('augustus', 'Augustus Caesar — Shift 1 — Encoded', caesar(input, 1, false), 1) +
        buildComparisonTable(input);
    } else {
      const emp = currentEmperor;
      const lbl = (emp === 'julius' ? 'Julius Caesar — Shift 3' : 'Augustus Caesar — Shift 1') + ' — ' + (isDecode ? 'Decoded' : 'Encoded');
      div.innerHTML = resultCard(emp, lbl, caesar(input, shifts[emp], isDecode), 0);
    }
    updateCustom();
  }

  function resultCard(emp, label, text, delay) {
    const safe = text.replace(/'/g, "\\'");
    return `<div class="${emp}-result result-row" onclick="copyText('${safe}',this)" style="animation-delay:${delay*0.1}s">
      <div class="result-emperor"><span>${label}</span><span class="copy-hint">Click to copy</span></div>
      <div class="result-text">${text}</div>
      <div class="copied-flash">Copied</div>
    </div>`;
  }

  function buildComparisonTable(input) {
    const words = input.toUpperCase().replace(/[^A-Z ]/g,'').split(/\s+/).filter(Boolean).slice(0,6);
    if (!words.length) return '';
    const rows = words.map(w => {
      const j = caesar(w,3,false), a = caesar(w,1,false);
      return `<div class="comp-row">
        <div class="comp-cell plain">${w}</div>
        <div class="comp-cell julius-c">${j}</div>
        <div class="comp-cell augustus-c">${a}</div>
        <div class="comp-cell" style="font-style:italic;color:var(--ink-light);font-size:0.78rem">${j===a?'Same':'Differs'}</div>
      </div>`;
    }).join('');
    return `<div class="comparison"><div class="comp-header">✦ Word-by-Word Comparison</div>
      <div class="comp-row comp-head"><div class="comp-cell">Plain</div><div class="comp-cell">Julius +3</div><div class="comp-cell">Augustus +1</div><div class="comp-cell">Match?</div></div>
      ${rows}</div>`;
  }

  function copyText(text, el) {
    navigator.clipboard.writeText(text).then(() => {
      const f = el.querySelector('.copied-flash');
      f.classList.add('show');
      setTimeout(() => f.classList.remove('show'), 1300);
    });
  }

  function clearAll() {
    document.getElementById('main-input').value = '';
    document.getElementById('results').innerHTML = '<div class="empty-state">Enter text above and execute the cipher</div>';
    document.getElementById('custom-result').textContent = '—';
  }

  function updateCustom() {
    const shift = Math.abs(parseInt(document.getElementById('custom-shift').value)||1)%26||1;
    const input = document.getElementById('main-input').value.trim();
    document.getElementById('custom-result').textContent = input ? caesar(input, shift, currentMode==='decode') : '—';
  }

  function buildAlphaStrip(id, shift) {
    const el = document.getElementById(id);
    ALPHA.split('').forEach(ch => {
      const sh = ALPHA[(ALPHA.indexOf(ch)+shift)%26];
      el.innerHTML += `<div class="alpha-item"><div class="alpha-orig">${ch}</div><div class="alpha-shifted">${sh}</div></div>`;
    });
  }

  buildAlphaStrip('julius-alpha-strip', 3);
  buildAlphaStrip('augustus-alpha-strip', 1);

  let timer;
  document.getElementById('main-input').addEventListener('input', () => {
    clearTimeout(timer); timer = setTimeout(processText, 300);
  });
</script>
</body>
</html>

// More JavaScript code can be added here...
