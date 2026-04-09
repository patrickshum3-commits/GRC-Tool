# MVP Architecture Notes

## 1) Tauri vs Electron recommendation
For this offline single-user MVP, **Tauri** is the better baseline:
- Smaller install footprint and lower memory usage than Electron.
- Native desktop packaging without bundling a full Chromium runtime.
- Good fit for local SQLite and local file storage commands.
- Keeps an upgrade path open for a future LAN/private deployment.

Electron remains a valid fallback if the team prefers pure JavaScript runtime APIs, but Tauri is lighter for the stated constraints.

## 2) Proposed folder structure

```text
.
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   └── architecture.md
├── src/
│   ├── app/
│   │   ├── layout/
│   │   ├── routes/
│   │   └── AppStateContext.tsx
│   ├── components/
│   ├── domain/
│   ├── features/
│   ├── pages/
│   ├── persistence/
│   │   ├── sqlite/
│   │   └── storage/
│   ├── seed/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/
│   └── src/
└── README.md
```

## 3) Initial schema and skeleton implementation status
- SQLite schema created for workspaces, frameworks, requirements, controls, risks, audits, findings, CAPA, evidence, report templates, and activity.
- Seed SQL created for ISO/IEC 27001, ISO/IEC 27701, PCI DSS plus sample controls and risks.
- React + TypeScript app shell created with left navigation and nine MVP modules.
- Local persistence implemented with localStorage adapter for immediate offline behavior.
- Report export stubs implemented as local text file download actions.
- Tauri runtime notes included to wire SQLite commands in `src-tauri` next.
