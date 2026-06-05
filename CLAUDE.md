# CLAUDE.md

# Projektkontext

- **Zweck**: Kinder-Reise-PWA zum Beschäftigen von Kindern (6 und 8 Jahre) auf langen Autofahrten — Reisebingo und Aufgaben-Karten mit Punkte-System. Vollständig offline-fähig.
- **Stack**: React 19 + Vite 8 + TypeScript + Tailwind CSS v4 + vite-plugin-pwa (Workbox)
- **Deployment**: GitHub → GitHub Actions baut auf Push → `gh-pages`-Branch → GitHub Pages unter https://benjaminseidler.github.io/fahrt/

---

# Arbeitsweise

## Dokumentation
- `CLAUDE.md` und `README.md` nach jeder relevanten Änderung aktualisieren – nur das Nötigste, keine Redundanz.

## GitHub
- Änderungen stets committen und pushen – für schnelles Feedback und nachvollziehbare Historie.
- **Commit-Messages**: kurz, aussagekräftig, im Imperativ. Conventional Commits nutzen: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- **Keine Secrets committen** – API-Keys, Tokens, `.env` etc. gehören in `.gitignore`, niemals ins Repo.

## Qualitätssicherung
- Vor jedem Commit: visuell testen – Funktionalität **und** Optik.
- Lokal testen, wenn möglich zusätzlich im produktiven Web-Deployment.
- Gefundene Fehler oder Verbesserungsbedarf **zuerst beheben**, bevor neue Features folgen.

## Umgang mit Unklarheiten
- Bei offenen Fragen oder mehreren sinnvollen Optionen: aktiv nachfragen (ask-tool), statt Annahmen zu treffen.
- Optionen klar und strukturiert präsentieren, damit eine fundierte Entscheidung möglich ist.

---

# Entwicklung

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

- **Bingo-Items:** `src/data/bingoItems.ts` — Array erweitern, mind. 16 Items nötig
- **Aufgaben:** `src/data/aufgaben.ts` — `difficulty: 1` (leicht, 1 Punkt) oder `2` (mittel, 2 Punkte)

## Deployment

Push auf `claude/road-trip-pwa-kids-tDlK4` → GitHub Actions (`.github/workflows/deploy.yml`) → `gh-pages`-Branch → GitHub Pages.
