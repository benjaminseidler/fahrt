# CLAUDE.md

## Projekt

Kinder-Reise-PWA für Autofahrten. Zielgruppe: Kinder 6 und 8 Jahre.

Live: https://benjaminseidler.github.io/fahrt/

## Befehle

```bash
npm run dev      # Dev-Server starten
npm run build    # Production Build (in dist/)
npm run preview  # Production Build lokal testen
npx tsc --noEmit # Type-Check ohne Build
```

## Architektur

**Kein Backend, kein Router, keine externe State-Library.**

```
src/
  data/           # Statische Inhalte (bingoItems.ts, aufgaben.ts)
  hooks/          # useBingo, useAufgaben, useLocalStorage
  components/
    layout/       # TabBar, ScoreDisplay
    bingo/        # BingoBoard, BingoCell, BingoWin
    aufgaben/     # MissionCard, MissionControls
  pages/          # BingoPage, AufgabenPage
  App.tsx         # Tab-State + Score-State (useLocalStorage)
```

**State:** Alles in `localStorage` — drei Keys: `fahrt_bingo`, `fahrt_aufgaben`, `fahrt_score`.

**PWA:** `vite-plugin-pwa` mit Workbox. Base path ist `/fahrt/` wegen GitHub Pages.

## Inhalte ändern

- **Bingo-Items hinzufügen/entfernen:** `src/data/bingoItems.ts` — einfach Array erweitern
- **Aufgaben ändern:** `src/data/aufgaben.ts` — `difficulty: 1` (leicht, 1 Punkt) oder `2` (mittel, 2 Punkte)

## Deployment

Push auf `claude/road-trip-pwa-kids-tDlK4` → GitHub Actions baut + pushed auf `gh-pages` Branch → GitHub Pages serviert automatisch.

Workflow: `.github/workflows/deploy.yml`
