# VRoom Site — Handoff

## Stato Attuale

**Live:** https://vroom-dev.github.io/VRoom_site/
**Commit:** 829e2d5
**Data:** 2026-03-09

## Logo SVG

Il logo VRoom è una **V rossa con 3 linee stradali** sotto (prospettiva che si allontana).

```svg
<path fill="#E94560" d="M54,25 L30,80 L40,80 L54,48 L68,80 L78,80 L54,25 Z"/>
<line x1="36" y1="85" x2="72" y2="85" stroke="#E94560" stroke-width="3"/>
<line x1="42" y1="91" x2="66" y2="91" stroke="#E94560" stroke-width="2" opacity="0.7"/>
<line x1="48" y1="96" x2="60" y2="96" stroke="#E94560" stroke-width="1.5" opacity="0.4"/>
```

### Dove è usato nel sito
- **Loader**: Grande, con glow e animazione float
- **Cursore custom**: Sostituisce il mouse, con trail effect
- **Nav**: Piccolo accanto al nome
- **Hero**: Grande accanto al titolo
- **Map animation**: Cursore che segue il percorso animato
- **Footer**: Piccolo accanto al copyright

## Sezioni

1. **Hero** — Logo + tagline + mappa animata con replay
2. **Behaviour** — Flusso 4 step (Naviga/Registra → Import → Hands-free → Export)
3. **Tiers** — Free/Rider €4.99/Pro €9.99 (senza friction)
4. **Community** — 4 card su sicurezza collettiva
5. **Features** — 6 card sintetiche
6. **CTA** — Stats + GitHub link
7. **Footer**

## Palette Brand

```css
--vroom-red: #E94560;        /* Primary */
--vroom-red-bright: #ff5a75; /* Hover/gradient */
--vroom-dark: #1A1A2E;       /* Background icon */
--teal: #00e5bf;             /* Accents/badges */
--orange: #ff6b2c;           /* Secondary accent */
```

## Prossimi Miglioramenti Possibili

### Logo interactions da esplorare
- [ ] Logo che si anima al click (vibra/ruota)
- [ ] Logo che cambia colore in base alla sezione (scroll-based)
- [ ] Logo "trail" più elaborato (particelle invece di cerchi)
- [ ] Logo 3D con Three.js (se si vuole esagerare)
- [ ] Logo che "guida" lungo la mappa nel hero

### Contenuti
- [ ] Sezione "Track Mode" dedicata (coming soon)
- [ ] Video demo embedded
- [ ] Testimonial/quote da beta tester
- [ ] FAQ section

### Tecnici
- [ ] Lighthouse audit e ottimizzazione
- [ ] Favicon dinamico con logo
- [ ] Open Graph image con logo
- [ ] Animazione route più complessa (curve reali)

## File

- `index.html` — Sito completo (single file, ~1100 righe)
- `CONTRIBUTING.md` — Guida contributor
- `README.md` — Info GitHub Pages
- `LICENSE` — MIT
- `HANDOFF.md` — Questo file

## Deploy

GitHub Pages automatico su push a `main`. URL: https://vroom-dev.github.io/VRoom_site/

## PAT Note

Il PAT usato per push (`github_pat_11B6Y3KSI...`) dovrebbe essere ruotato periodicamente per sicurezza.
