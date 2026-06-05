# Fahrt — Kinder-Reise-App 🚗

Eine offline-fähige PWA zum Beschäftigen von Kindern auf langen Autofahrten.

**Live:** https://benjaminseidler.github.io/fahrt/

## Features

- **🎯 Reisebingo** — 4×4 Grid mit reise-passenden Items (Windrad, Kuh, Tunnel, Schloss…). Antippen = markiert. Bingo-Erkennung mit Konfetti-Animation. "Neue Karte" für ein neues zufälliges Board.
- **📋 Aufgaben-Karten** — 20 Missionen in zwei Schwierigkeiten (⭐ für 6-Jährige, ⭐⭐ für 8-Jährige). Punkte nur bei "Erledigt ✓", "Weiter →" überspringt ohne Punkte.
- **🧠 Quiz** — 20 Multiple-Choice-Fragen über Frankreich, Deutschland und die Route (⭐ leicht / ⭐⭐ mittel). Sofort-Feedback mit Richtig/Falsch-Highlight, Punkte fließen in den globalen Score.
- **⭐ Globaler Punktestand** — immer sichtbar, motiviert beide Kinder
- **Offline-fähig** — Service Worker cached alles beim ersten Laden, funktioniert auch im Tunnel
- **Spielstand-Persistenz** — localStorage speichert alles, bleibt auch nach App-Neustart

## Tech Stack

- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4
- vite-plugin-pwa + Workbox (Service Worker)
- Keine externen Laufzeit-Abhängigkeiten

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server auf http://localhost:5173
npm run build     # Production Build
npm run preview   # Production Preview (für Offline-Test)
```

## Deployment

GitHub Actions deployed automatisch auf GitHub Pages bei jedem Push auf `claude/road-trip-pwa-kids-tDlK4`.

Der Build landet im `gh-pages`-Branch, GitHub Pages serviert von dort.
