# Code Review Issues

Generated from a full code review of the repo. Issues are ordered by priority.

---

## FAIL — 7 issues found

---

### Issue 1 — `endpoint` can be `undefined` with no guard
**File:** `src/components/FolioChat.tsx` | **Severity:** High

`App.jsx:20` passes `endpoint={import.meta.env.VITE_FOLIOCHAT_API_URL}`. If the env var is missing (local dev without `.env`, or unset CI secret), this resolves to `undefined`. The TypeScript type declares `endpoint: string`, but at runtime `fetch(\`undefined/context\`)` will fire, fail silently, and lock the widget into a permanent error state.

**Fix:** Add a guard at component entry:
```ts
if (!endpoint) {
  console.warn("FolioChat: endpoint prop is required");
  return null;
}
```

---

### Issue 2 — Wrong import: `App.jsx` imports `FolioChat` from `@foliochat/react`, not the local file
**File:** `src/App.jsx:8` | **Severity:** High

`App.jsx` imports from `@foliochat/react` (an external npm package). `src/components/FolioChat.tsx` is a separate local file. These are not the same module. If `@foliochat/react` is not installed, the build fails entirely. If it is installed, the local `FolioChat.tsx` is dead code.

**Fix:** Decide which is the intended source of truth:
- If the local file is the component: change the import to `'./components/FolioChat'`
- If the npm package is correct: delete `src/components/FolioChat.tsx`

---

### Issue 3 — `error` state permanently disables input with no recovery path
**File:** `src/components/FolioChat.tsx:93–95`, `356` | **Severity:** High

When the `/context` fetch fails on mount, `setError(...)` is called. The input and send button are permanently disabled (`disabled={loading || !!error}`). Closing and reopening the widget does not help — the context fetch runs only once on mount, so the error state is never cleared. The widget is bricked for the rest of the session.

**Fix:** Either re-trigger the context fetch when the widget is reopened (add `open` as a dependency to the context `useEffect`), or add a visible "Retry" button that re-runs the fetch and clears the error.

---

### Issue 4 — No `AbortController` on context fetch — state updates after unmount
**File:** `src/components/FolioChat.tsx:85–96` | **Severity:** Medium

The `fetch` in the context `useEffect` has no abort signal. If the component unmounts before the fetch resolves, `setContext`, `setMessages`, or `setError` are called on an unmounted component. This also fires twice in development due to React 18 Strict Mode's intentional double-invocation of effects.

**Fix:** Create an `AbortController` inside the effect and clean it up on unmount:
```ts
useEffect(() => {
  const controller = new AbortController();
  fetch(`${endpoint}/context`, { signal: controller.signal })
    .then(...)
    .catch((err) => {
      if (err.name !== "AbortError") setError("Could not connect to FolioChat server.");
    });
  return () => controller.abort();
}, [endpoint, greeting]);
```

---

### Issue 5 — Nav scroll listener is not passive — blocks compositor thread
**File:** `src/components/Nav.jsx:24` | **Severity:** Medium

`window.addEventListener('scroll', handleScroll)` has no `{ passive: true }` option. The browser must hold the compositor thread waiting for this handler before every scroll frame, since it cannot know whether `preventDefault()` will be called. This degrades scroll performance, particularly on lower-end devices.

**Fix:**
```js
window.addEventListener('scroll', handleScroll, { passive: true })
// and the corresponding cleanup:
return () => window.removeEventListener('scroll', handleScroll, { passive: true })
```

---

### Issue 6 — Contact form inputs lack accessible labels
**File:** `src/components/Contact.jsx:62–92` | **Severity:** Medium

All four form inputs (`name`, `email`, `subject`, `message`) use only `placeholder` as a label. `placeholder` text disappears once the user focuses and starts typing — at that point there is no programmatic label for screen readers or for users who cannot see placeholder text. This fails WCAG 2.1 SC 1.3.1 (Info and Relationships).

**Fix:** Add `<label>` elements paired via `htmlFor`/`id`. They can be visually hidden with a CSS utility class if needed. Alternatively, add `aria-label` attributes to each input.

---

### Issue 7 — Missing CI validation for required secret — broken build ships silently
**File:** `.github/workflows/deploy.yml:36–38` | **Severity:** Medium

If the `VITE_FOLIOCHAT_API_URL` GitHub Secret is not configured, Vite builds with `endpoint=""`. The build succeeds, deployment looks clean, but the FolioChat widget fails on every request at runtime. There is no early-warning signal in CI.

**Fix:** Add a validation step before the build:
```yaml
- name: Validate required secrets
  run: |
    if [ -z "$VITE_FOLIOCHAT_API_URL" ]; then
      echo "Error: VITE_FOLIOCHAT_API_URL secret is not set"; exit 1
    fi
  env:
    VITE_FOLIOCHAT_API_URL: ${{ secrets.VITE_FOLIOCHAT_API_URL }}
```
