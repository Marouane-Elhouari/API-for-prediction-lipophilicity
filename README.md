# GNN Frontend

Interface React (Vite + Tailwind) pour l'API `gnn_api` : prédiction, historique,
visualisation 2D et 3D des molécules.

## Installation

```bash
npm install
```

## Configuration

Copie `.env.example` en `.env` et adapte les valeurs :

```bash
cp .env.example .env
```

- `VITE_API_BASE_URL` : URL du backend FastAPI (par défaut `http://127.0.0.1:8000`).
- `VITE_API_KEY` : doit correspondre exactement à `GNN_API_KEY` défini côté backend
  (ou à `change-me-in-production` si tu n'as rien défini côté backend).

## Lancement

Assure-toi que le backend (`gnn_api`) tourne déjà sur le port 8000, puis :

```bash
npm run dev
```

L'app est servie sur `http://localhost:5173`.

## Structure

```
src/
├── api.js                    # client API (fetch + clé API)
├── App.jsx                   # layout (sidebar + panneau actif)
└── components/
    ├── Sidebar.jsx            # navigation rétractable
    ├── MoleculeBackground.jsx # fond animé (molécules flottantes)
    ├── PredictPanel.jsx       # POST /api/predict
    ├── HistoryPanel.jsx       # GET /api/history + exports CSV/XLSX
    ├── Visualization2D.jsx    # POST /api/mol-2d
    └── Visualization3D.jsx    # POST /api/mol-3d + GET /api/mol-3d-file/{filename}
```
