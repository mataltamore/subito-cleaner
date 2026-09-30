# Subito Cleaner

**Browser:** Brave (works on any Chromium-based browser that supports Manifest V3)
**Last update:** 2026-09-30
**Made with:** Claude Sonnet 5.5 (Thinking Effort: Medium)

---

## English

### What it does

Subito Cleaner is a small browser extension that cleans up the search/listing pages of [subito.it](https://www.subito.it). It removes the clutter that even Brave's built-in shields leave behind:

- **Promoted listings**: any card tagged **"Vetrina"** is removed.
- **Urgent listings**: any card tagged **"Urgente"** is removed.
- **SubitoPiù promo banner** shown inside the results grid.
- **Empty ad containers** left over after ads are blocked (Lira, AdSense, Apn skin, top banner, in-content slots, skyscrapers, side banner).
- **Footer and SEO sections**: the footer, "Più cercati", "Ricerche consigliate" and "Tutte le categorie".

### How it works

The extension runs a content script on `https://www.subito.it/*` at `document_start`, made of two parts:

1. **`content.css`** hides static elements immediately, so there is no flash of unwanted content. It matches ad containers and sections using the stable part of the class names and ids (e.g. `lira-container`, `smart-adv-lira`, `Sitemap-module`, `#suggested-searches`) and uses the `:has()` selector to hide the parent wrapper of each ad slot.
2. **`content.js`** handles the elements that can only be recognised by their text. It looks for tag `<span>` elements whose text is "Vetrina" or "Urgente", finds the closest parent `<article>` and marks it with a `data-sc-hidden` attribute, which the CSS hides with `display: none`. A `MutationObserver` re-runs the check whenever the page changes, so it keeps working when you change page or when results load dynamically.

> **Note:** elements are _hidden_, not deleted from the DOM. Subito is a Next.js app, and deleting nodes managed by React could cause rendering errors. Visually the result is the same.

### Installation

1. Download or clone this repository.
2. Open `brave://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.
5. Open a search page on subito.it.

### Customization

- To block more badges, add their text to the `BLOCKED_TAGS` set at the top of `content.js`.
- To hide other sections, add their selectors to `content.css`.
- Subito's class names contain generated suffixes (e.g. `__kZJVX`) that may change after a redeploy. The selectors avoid them, but if something reappears, update the selectors.

### Files

| File            | Purpose                                     |
| --------------- | ------------------------------------------- |
| `manifest.json` | Extension manifest (Manifest V3)            |
| `content.css`   | Hides ads, banners, footer and SEO sections |
| `content.js`    | Hides "Vetrina" and "Urgente" listings      |

---

## Italiano

### Cosa fa

Subito Cleaner è una piccola estensione per il browser che ripulisce le pagine di ricerca di [subito.it](https://www.subito.it). Rimuove tutto ciò che anche gli scudi integrati di Brave non eliminano del tutto:

- **Annunci in evidenza**: ogni scheda con il tag **"Vetrina"** viene rimossa.
- **Annunci urgenti**: ogni scheda con il tag **"Urgente"** viene rimossa.
- **Banner promozionale SubitoPiù** mostrato dentro la griglia dei risultati.
- **Contenitori pubblicitari vuoti** rimasti dopo il blocco delle pubblicità (Lira, AdSense, skin Apn, banner in alto, slot tra i risultati, skyscraper, banner laterale).
- **Footer e sezioni SEO**: il footer, "Più cercati", "Ricerche consigliate" e "Tutte le categorie".

### Come funziona

L'estensione esegue un content script su `https://www.subito.it/*` a `document_start`, composto da due parti:

1. **`content.css`** nasconde subito gli elementi statici, evitando che i contenuti indesiderati compaiano per un attimo. Individua contenitori e sezioni usando la parte stabile di classi e id (ad es. `lira-container`, `smart-adv-lira`, `Sitemap-module`, `#suggested-searches`) e usa il selettore `:has()` per nascondere il contenitore genitore di ogni slot pubblicitario.
2. **`content.js`** gestisce gli elementi riconoscibili solo dal testo. Cerca gli `<span>` dei tag con testo "Vetrina" o "Urgente", trova l'`<article>` genitore più vicino e gli assegna l'attributo `data-sc-hidden`, che il CSS nasconde con `display: none`. Un `MutationObserver` ripete il controllo a ogni modifica della pagina, quindi funziona anche cambiando pagina o quando i risultati si caricano dinamicamente.

> **Nota:** gli elementi vengono _nascosti_, non eliminati dal DOM. Subito è un'app Next.js e cancellare nodi gestiti da React potrebbe causare errori di rendering. Visivamente il risultato è identico.

### Installazione

1. Scarica o clona questo repository.
2. Apri `brave://extensions`.
3. Attiva la **Modalità sviluppatore**.
4. Clicca su **Carica estensione non pacchettizzata** e seleziona la cartella del progetto.
5. Apri una pagina di ricerca su subito.it.

### Personalizzazione

- Per bloccare altri tag, aggiungi il loro testo all'insieme `BLOCKED_TAGS` all'inizio di `content.js`.
- Per nascondere altre sezioni, aggiungi i relativi selettori a `content.css`.
- Le classi di Subito contengono suffissi generati (ad es. `__kZJVX`) che potrebbero cambiare dopo un nuovo rilascio. I selettori li evitano, ma se qualcosa ricompare, aggiorna i selettori.

### File

| File            | Scopo                                             |
| --------------- | ------------------------------------------------- |
| `manifest.json` | Manifest dell'estensione (Manifest V3)            |
| `content.css`   | Nasconde pubblicità, banner, footer e sezioni SEO |
| `content.js`    | Nasconde gli annunci "Vetrina" e "Urgente"        |
