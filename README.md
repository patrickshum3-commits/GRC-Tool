# GRC Tool (Offline MVP)

Desktop-oriented compliance management MVP for ISO/IEC 27001, ISO/IEC 27701, and PCI DSS.

## Tech stack
- Frontend: React + TypeScript (Vite)
- Desktop direction: Tauri (recommended)
- Persistence (current): local browser storage for MVP shell
- Database schema target: SQLite (`database/schema.sql`)

## What is implemented
1. Project skeleton and modular folder layout.
2. SQLite schema and seed scripts.
3. Strongly typed domain interfaces.
4. Seed/sample app state.
5. App shell with left navigation.
6. Pages: Dashboard, Frameworks, Controls, Risks, Audits, Evidence, Reports, Settings.
7. Basic CRUD create flows for core entities.
8. Local persistence adapter (`localStorage`).
9. Report export stubs (text exports).

## Run instructions
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Next steps
- Implement Tauri command handlers in `src-tauri` for real SQLite CRUD.
- Replace localStorage adapter with SQLite repository adapter.
- Add entity detail pages and edit/delete flows.
- Add file picker integration for evidence capture.
