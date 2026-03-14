# DEVLOG

## 2026-03-14 — Fix: `endpoint` can be `undefined` with no guard (Issue 1)

### Problem

`App.jsx` renders `<FolioChat endpoint={import.meta.env.VITE_FOLIOCHAT_API_URL} />`.  
When the `VITE_FOLIOCHAT_API_URL` environment variable is not set (local dev without a
`.env` file, or an unset CI secret), `import.meta.env.VITE_FOLIOCHAT_API_URL` resolves
to `undefined`.  Without a guard, every `fetch()` inside the widget would fire against
the literal string `"undefined/..."`, fail silently, and lock the widget into a permanent
error state.

### Resolution

`FolioChat` is not needed in the current portfolio and was removed entirely.  
No broken `fetch` calls, no permanent error state, no dead code.

| File | Change |
|---|---|
| `src/components/FolioChat.jsx` | Removed — component not needed |
| `src/App.jsx` | Removed FolioChat import and usage |
| `src/style.css` | Removed `.foliochat-*` CSS rules |
