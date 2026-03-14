# DEVLOG

## 2026-03-14 — FolioChat is live

All 7 issues from the code review have been resolved and FolioChat is confirmed working in production. Issues fixed across two sessions:

- **Issue 1** — Guard against undefined `endpoint` prop
- **Issue 2** — Corrected import to use local `FolioChat.tsx` instead of `@foliochat/react`
- **Issue 3** — Error state recovery: added Retry button and re-fetch on widget open
- **Issue 4** — AbortController on context fetch to prevent stale state updates after unmount
- **Issue 5** — Passive scroll listener in Nav to unblock compositor thread
- **Issue 6** — Accessible `<label>` elements on all Contact form inputs (WCAG 2.1 SC 1.3.1)
- **Issue 7** — CI secret validation step to fail fast if `VITE_FOLIOCHAT_API_URL` is unset

**Next:** UI/UX redesign.

---

## 2026-03-14 — Fix Issue 5: Nav scroll listener is not passive — blocks compositor thread

**File:** `src/components/Nav.jsx:24`
**Issue:** `window.addEventListener('scroll', handleScroll)` had no `{ passive: true }` option.
The browser must hold the compositor thread waiting for this handler before every scroll frame,
because it cannot know whether `preventDefault()` will be called. This degrades scroll
performance, particularly on lower-end devices.

### Changes Made

- **Added `{ passive: true }`** to the `window.addEventListener('scroll', handleScroll, { passive: true })`
  call in the `useEffect` hook inside `Nav.jsx`. This signals to the browser that the handler
  will never call `preventDefault()`, allowing the compositor thread to proceed immediately
  without blocking on each scroll event.

---

## 2026-03-14 — Fix Issue 4: no `AbortController` on context fetch — state updates after unmount

**File:** `src/components/FolioChat.tsx`
**Issue:** The `/context` fetch lacked an abort mechanism. If the component unmounted before
the fetch resolved, `setContext`, `setMessages`, or `setError` would be called on an unmounted
component. This also caused React 18 Strict Mode to fire a redundant in-flight fetch on the
second effect invocation with no way to cancel the first. Additionally, the "Retry" button path
called `fetchContext()` without any signal, leaving those fetches permanently unabortable.

### Changes Made

- **Added `fetchControllerRef`** — a `useRef<AbortController | null>(null)` that tracks the
  active controller for any in-flight `/context` request.
- **`fetchContext` now owns its `AbortController`** — on every call it first aborts any
  previous in-flight request (`fetchControllerRef.current?.abort()`), then creates a fresh
  `AbortController`, stores it in the ref, and passes its signal to `fetch`. This covers both
  the effect-triggered fetch and the manual Retry path without needing to thread a signal
  parameter through the call site.
- **`useEffect` cleanup uses the ref** — `return () => fetchControllerRef.current?.abort()`
  ensures that when the widget is closed or the component unmounts, the active fetch is
  cancelled and no stale state updates can fire.
- **`AbortError` guard remains** — the `.catch` handler still checks `err.name !== "AbortError"`
  so only genuine network failures surface to the UI.

---

## 2026-03-14 — Fix Issue 3: error state permanently disables input with no recovery path

**File:** `src/components/FolioChat.tsx`
**Issue:** When the `/context` fetch failed on mount, `setError(...)` was called and the
input + send button were permanently disabled (`disabled={loading || !!error}`). Closing
and reopening the widget did not help because the context fetch ran only once on mount.

### Changes Made

- **Extracted context fetch into `fetchContext` useCallback** — makes the fetch logic
  reusable for both the effect and the manual Retry button.
- **Added `open` as a useEffect dependency** — the effect now fires whenever the widget
  is opened. A `if (!open || context) return;` guard ensures the fetch only runs when
  the widget is open AND context has not yet been loaded successfully, preventing
  redundant re-fetches during a working session.
- **Added "Retry" button in error state** — when the error banner is shown, a styled
  "Retry" button appears that clears the error and re-runs the context fetch, giving
  the user an explicit recovery path without needing to close/reopen the widget.
