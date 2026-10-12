# FlowCast Driver UI

A responsive, mobile-first frontend inspired by the supplied FlowCast traffic forecasting mockup. It includes four navigable screens and working local UI interactions. The backend is intentionally mocked so the frontend can be connected to an API later.

## Screens

- **Home** — current route forecast, congestion percentage, delay estimate, departure suggestion, hourly congestion chart, and recurring peak-hours insight.
- **Trip Log** — weekly congestion pattern, commute metrics, recent trips, and a form to log a new trip.
- **Alerts** — traffic/ML insight cards, unread indicators, mark-as-read and dismiss actions.
- **Settings** — push-alert and safe-route toggles, notification lead-time selector, and ML system status.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`). To create a production build:

```bash
npm run build
npm run preview
```

## Push this project to GitHub

Create an empty repository in your GitHub account, then run these commands inside this folder. Replace the example URL with your new repository's URL.

```bash
git init
git add .
git commit -m "Build FlowCast driver UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flowcast-driver-ui.git
git push -u origin main
```

## Connect a backend later

Current trips, alerts, preferences, and route forecasts use local sample data in `src/App.jsx`. Suggested integration points:

- Replace `initialTrips` with a trip-history API request.
- Replace `initialAlerts` with an alerts endpoint and persist dismiss/read actions.
- Load current-route congestion and ML model metadata from your prediction API.
- Persist settings to a user-preferences endpoint.

The trip logger currently validates inputs and updates the UI state, but data is not persisted after refresh. The route view contains a stylized map illustration rather than a live map SDK.

## Tech stack

- React 18
- Vite 6
- Plain CSS (no component library required)

## Project structure

```text
flowcast-driver-ui/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```
