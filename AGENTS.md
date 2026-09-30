# Base44 Dev Environment

## Project Overview
**btb.aero** — "Letiskový repository" (airport repository). A purely static, vanilla HTML/CSS/JS website for a fictional airport (Bratislava-Bricksburg / BTB). No backend, no build step, no package manager, no external services or credentials required.

- `index.html` — main page structure
- `script.js` — all app logic (flight data, search/filter, admin panel, TTS, dark mode, localStorage persistence)
- `style.css` — all styling (light/dark themes, responsive)

## How to Run
```bash
docker compose -f docker-compose.base44.yml up -d
```
The site is served by nginx on **port 3000**. Source files are bind-mounted read-only, so edits to `index.html` / `script.js` / `style.css` are live on browser refresh — no rebuild needed.

## Health Check
The container healthcheck probes `http://127.0.0.1:3000/` via wget (must use `127.0.0.1`, not `localhost`, because nginx only binds IPv4).

## Verification
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` → `200`
- Open the preview; the airport dashboard with flight table, map, and admin panel should render.

## Notes
- nginx workers run as `root` (via a custom `nginx.main.base44.conf`) because the sandbox repo directory has restrictive `700` permissions that the default `nginx` user cannot traverse.
- No secrets or environment variables are needed.
