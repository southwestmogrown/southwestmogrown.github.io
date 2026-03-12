# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Personal portfolio website for Shane (southwestmogrown), built as a single-page application with **Vite + React**. It is deployed to GitHub Pages at `southwestmogrown.github.io`.

## Development Commands

```bash
# Install dependencies
npm ci

# Start local dev server (hot reload)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

> There is no test suite or linter configured. Running `npm run build` is the primary way to validate changes.

## Architecture

### Entry points

| File | Role |
|---|---|
| `index.html` | HTML shell, mounts `#root` |
| `src/main.jsx` | React root, renders `<App>` inside `<StrictMode>` |
| `src/App.jsx` | Composes all section components in order |
| `src/style.css` | Global CSS with dark-theme variables and all component styles |
| `vite.config.js` | Vite config with `@vitejs/plugin-react`, `base: '/'` |

### Component tree (`src/components/`)

```
App
├── Nav        – sticky top navigation with smooth-scroll links
├── Hero       – full-screen landing section
├── About      – bio and background
├── Skills     – tech stack / skills grid
├── Projects   – fetches featured repos from the GitHub API; falls back to static data
├── Contact    – contact form / links
└── Footer     – copyright and social links
```

### Custom hook (`src/hooks/`)

- **`useFadeUp.js`** – uses `IntersectionObserver` to add a `fade-up visible` CSS class when an element scrolls into view (threshold 0.15). Falls back to always-visible when `IntersectionObserver` is unavailable.

### Static assets (`public/`)

- `public/assets/images/shane-profile.jpg` – profile photo used in the Hero section.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which:
1. Installs dependencies with `npm ci`.
2. Builds the app with `npm run build` (output: `dist/`).
3. Deploys `dist/` to GitHub Pages via `actions/deploy-pages@v4`.

## Key Design Decisions

- **GitHub API for projects** – `Projects.jsx` fetches each featured repo from `https://api.github.com/repos/southwestmogrown/<name>`. If the API call fails or returns an error, a static fallback array (`buildFallback()`) is used so the section always renders.
- **No routing** – the site is a single scrollable page; navigation links use anchor IDs.
- **No CSS framework** – all styles live in `src/style.css` using CSS custom properties for theming.
