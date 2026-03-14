# DEVLOG

## 2026-03-14 — Fix: `endpoint` can be `undefined` with no guard (Issue 1)

### Problem

`App.jsx` renders `<FolioChat endpoint={import.meta.env.VITE_FOLIOCHAT_API_URL} />`.  
When the `VITE_FOLIOCHAT_API_URL` environment variable is not set (local dev without a
`.env` file, or an unset CI secret), `import.meta.env.VITE_FOLIOCHAT_API_URL` resolves
to `undefined`.  Without a guard, every `fetch()` inside the widget would fire against
the literal string `"undefined/..."`, fail silently, and lock the widget into a permanent
error state.

### Fix

Created **`src/components/FolioChat.jsx`** with an early-return guard at component entry:

```js
if (!endpoint) {
  console.warn('FolioChat: endpoint prop is required')
  return null
}
```

This means:
- When the env var is missing the widget is simply not rendered — no broken requests,
  no UI error state.
- When the env var is present the full chat widget renders as expected.

### Additional changes

| File | Change |
|---|---|
| `src/components/FolioChat.jsx` | New file — floating chat widget with `endpoint` guard |
| `src/App.jsx` | Import `FolioChat` and render it with the env-var prop |
| `src/style.css` | Added `.foliochat-*` CSS variables / rules for the widget UI |
