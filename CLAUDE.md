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

# Production build (outputs to dist/, also copies index.html → dist/404.html)
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
| `src/main.jsx` | React root, wraps `<App>` in `<BrowserRouter>` inside `<StrictMode>` |
| `src/App.jsx` | Route definitions: `/` → HomeLayout, `/projects/foliochat` → FolioChatPage |
| `src/style.css` | Global CSS with dark-theme variables and all component styles |
| `vite.config.js` | Vite config with `@vitejs/plugin-react`, `base: '/'`, and 404.html copy plugin |

### Routing

React Router v6 with **BrowserRouter**. GitHub Pages SPA routing is handled by a vite plugin that copies `dist/index.html` → `dist/404.html` at build time.

- `/` — home page (full layout)
- `/projects/foliochat` — FolioChat project deep-dive page

### Component tree (`src/components/`)

```
App (Routes)
├── HomeLayout  [route: /]
│   ├── Sidebar    – fixed left nav with scroll-spy; includes FolioChat link
│   ├── main-layout
│   │   ├── Hero       – full-screen landing; terminal boot sequence; ASK FOLIOCHAT CTA
│   │   ├── BentoGrid  – 4-column metrics grid (engineers mentored, success rate, etc.)
│   │   ├── About      – bio and background
│   │   ├── Skills     – tech stack / skills grid
│   │   ├── Projects   – static SOLUTIONS array; FolioChat is SOL-000 (featured)
│   │   ├── Contact    – contact form / links
│   │   └── Footer     – copyright and social links
│   └── FolioChat  – floating chat widget (bottom-right); opens via foliochat:open event
└── FolioChatPage  [route: /projects/foliochat]
    └── src/pages/foliochat/index.jsx
```

### FolioChat widget (`src/components/FolioChat.tsx`)

TypeScript component. All styling is inline — no external CSS. Props:

| Prop | Type | Default |
|---|---|---|
| `endpoint` | `string` (required) | — |
| `theme` | `"dark" \| "light" \| "auto"` | `"dark"` |
| `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` |
| `accentColor` | `string` | `"#F26419"` |
| `greeting` | `string` | — |

Set `VITE_FOLIOCHAT_API_URL` env var to activate the widget. Listens for the `foliochat:open` CustomEvent on `window` so any component can open it programmatically.

### Project pages (`src/pages/`)

Individual project deep-dive pages. Standalone layout (no Sidebar).

- `src/pages/foliochat/index.jsx` — FolioChat project page

### Content (`src/content/`)

Markdown files for project pages. Drop new `.md` files in the articles directory and they auto-appear on the page via `import.meta.glob` (no config needed).

```
src/content/projects/
└── foliochat/
    ├── overview.md          ← rendered at top of project page
    └── articles/
        └── *.md             ← auto-discovered; one article per file
```

Article filenames become the article title (hyphens → spaces, uppercased).

### Custom hook (`src/hooks/`)

- **`useFadeUp.js`** – uses `IntersectionObserver` to add a `fade-up visible` CSS class when an element scrolls into view (threshold 0.15). Falls back to always-visible when `IntersectionObserver` is unavailable.

### Static assets (`public/`)

- `public/assets/images/shane-profile.jpg` – profile photo used in the Hero section.
- `public/assets/Shane_Wilkey_CV.pdf` – CV download.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which:
1. Installs dependencies with `npm ci`.
2. Builds the app with `npm run build` (output: `dist/`). The vite plugin also writes `dist/404.html` = `dist/index.html` for GitHub Pages SPA routing.
3. Deploys `dist/` to GitHub Pages via `actions/deploy-pages@v4`.

## Key Design Decisions

- **Static SOLUTIONS array** – `Projects.jsx` uses a static `SOLUTIONS` array (previously fetched from GitHub API but now hardcoded for reliability). FolioChat is `SOL-000` and featured with an accent top border.
- **BrowserRouter + 404.html** – enables clean `/projects/foliochat` URLs on GitHub Pages without hash routing conflicts with in-page anchor links.
- **Custom event for FolioChat open** – the Hero's "ASK FOLIOCHAT" button dispatches `new CustomEvent('foliochat:open')` on `window`; FolioChat listens for it. This keeps components decoupled.
- **Markdown via import.meta.glob** – project article content is auto-discovered with `{ eager: true, query: '?raw' }`. No plugin needed. Drop a `.md` file in the articles directory and it renders automatically.
- **No CSS framework** – all styles live in `src/style.css` using CSS custom properties for theming.
- **No routing** on the home page – in-page navigation uses anchor IDs and scroll-spy in Sidebar.
