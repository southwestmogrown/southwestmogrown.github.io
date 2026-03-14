# DEVLOG

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
