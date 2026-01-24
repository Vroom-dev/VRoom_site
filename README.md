# VRoom Landing Site

Landing page per GitHub Pages della app VRoom.

## Struttura

```
site/
├── index.html          # Landing page principale
├── CONTRIBUTING.md     # Guida per contributor
└── README.md          # Questo file
```

## Come funziona

Questa cartella contiene la landing page statica per GitHub Pages.

### Per GitHub Pages:

1. Vai in **Settings** del repo GitHub
2. Seleziona **Pages** 
3. Scegli il branch e la cartella sorgente:
   - Branch: `main`
   - Folder: `/site`
4. GitHub Pages servirà il sito su: `https://datanal.github.io/Vroom4/`

Oppure puoi creare un branch dedicato `gh-pages` per servire questa cartella.

## Customizzazioni

### Logo e Colori
- **Colore primario**: `#ff6b1a` (orange)
- **Colore secondario**: `#1a1a1a` (dark)
- **Accent**: `#0066ff` (blue)

Modifica in `index.html` nella sezione `:root { --primary: ... }`

### Link Esterni
Tutti i link a GitHub sono hardcoded. Aggiorna se il repo cambia proprietario.

## Responsive

La pagina è fully responsive:
- Desktop: layout full
- Tablet: grid adjustment
- Mobile: single column, hamburger menu (future)

## Feature

✅ Hero section accattivante
✅ Feature grid interattivo
✅ Tech stack showcase
✅ Roadmap timeline
✅ Privacy & Safety section
✅ Call-to-action buttons
✅ Footer con link importanti
✅ SEO-friendly HTML5
