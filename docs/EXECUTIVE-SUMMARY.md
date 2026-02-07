# Nameless Quest: Executive Summary

**Nameless Quest** is a Vue 3 I Ching oracle app with Firebase auth/Firestore, polished UI, and solid engineering—functionally ship-ready but carrying dependency debt and zero test coverage.

---

## System Health

**Architecture:** Clean Vue 3 + Vite + TypeScript + Firebase. Well-structured (components, composables, store, router); 8,872 LOC across 76 Vue + 31 TS files. Build pipeline solid (Netlify, PWA, pre-deploy hooks). ✓

**Tech Debt:**

- 🔴 **Vite 2.9 → 7.3** (5 major versions behind; migration effort ~1–2 weeks)
- 🔴 **Firebase v9 → v12** (legacy → current; plan migration within 12 mo)
- 🟡 **TypeScript 4.9 → 5.9** (1 version behind; low risk)
- 🟡 **ESLint, Husky, PostCSS plugins** partially stale; consolidation recommended

**Performance:** Bundle ~1 MB gzipped (438 KB Firebase, 440 KB Vue, 141 KB vendor). Chunk limit at 1500 KB (pressure starting). PWA service worker + offline caching configured. Rendering bottlenecks possible on large Oracle views; scroll performance depends on handler efficiency.

---

## Quality Assessment

**What Works:**

- ✓ Builds, deploys, runs cleanly (zero lint errors, hot-reload functional)
- ✓ Features complete (oracle toss, journal CRUD, Firebase auth, theme switching, responsive UI)
- ✓ Code quality good (Composition API consistent, try-catch error handling, 6 TODOs only)
- ✓ Documentation adequate (README accurate, design/schema docs present)

**What's Broken:**

- 🔴 **Zero test coverage** (0 unit, component, or E2E tests). Firebase integration, state mutations, auth flows untested. HIGH RISK for refactoring.
- 🟡 **Passwordless auth race condition** (magic link lands in `/login` instead of `/journal`; fix: `onAuthStateChanged()` guard)
- 🟡 **Journal delete race condition** (UI may not auto-refresh; TODO exists; likely minor)

**Ship-Ready Verdict:** ⚠️ **CLOSE**. Can deploy today if low-stakes (hobby/portfolio). Do not ship if expecting growth or need zero downtime—test coverage needed first.

---

## Hidden Risks (Bugs & Edge Cases)

**Memory Leaks (HIGH):**

- Event listeners added but never removed in `autoresize.ts`, `spinnable.ts`, `draggable.ts`, `App.vue` (touchstart), `router/guards.ts` (afterEach adds 3 listeners per route change)
- Impact: Repeated navigation → listener accumulation → browser slowdown over time
- Fix: Add `onUnmounted()` cleanup or `{ once: true }` where applicable (~1 hour)

**Logic Bugs (MEDIUM):**

- **Array splice bug (Journal.vue:184):** `rolls.value = rolls.value.splice(...)` returns deleted element, not remaining array. After delete, UI shows only deleted roll then empties. _Fix: 1 line, use `splice()` without reassign or `.filter()`._
- **spinnable.ts event listener matching:** Anonymous functions added/removed don't match; listeners never removed. Code clarity issue + potential leak.
- **LoginPhone global state leak:** Module-level `confirmResult`, `recaptchaVerifier`, `recaptchaResponse` variables. Race condition if component mounts multiple times or across tab opens.

**Console Masking (MEDIUM):**

- `hideLogsInProd()` reassigns `console.error = () => false`. Hides production errors entirely. No visibility into bugs after deploy.
- Fix: Use logger abstraction, preserve console.error, or use Sentry.

**Unhandled Promise Rejection (MINOR):**

- `LoginPhone.vue:144` throws error uncaught if `acceptConfirmationCode()` called in invalid state.

**Security:** No XSS vulnerabilities (user input escaped). Hardcoded Firebase config is expected (public SPA); verify Firestore rules on console are restrictive. ✓

---

## What Needs to Happen Next

### Blocking (Ship-Stopping)

1. **Fix array splice bug** (Journal delete) — 5 min, high visibility
2. **Add test infrastructure** (Vitest + 20–30 core tests for utils, store, auth) — 1–2 weeks, required for growth
   - Priority: tosses.ts (hex logic), rolls.ts (CRUD), LoginEmail, OracleResponse
3. **Fix passwordless auth race** (onAuthStateChanged guard) — 1–2 days

### Unblocked (Can Work in Parallel)

4. **Remove event listeners** (memory leak cleanup) — 1 hour (low risk, high impact)
5. **Improve hideLogsInProd()** (preserve error logging) — 30 min
6. **Plan Vite 2 → 4 incremental migration** (not urgent; roadmap for Q2 2026)
7. **Plan Firebase v9 → v10+ migration** (roadmap; execute mid-2026)
8. **Add contributing/architecture docs** (onboarding helper)

---

**Ship Status:** Deploy for low-traffic use (hobby/portfolio). Add tests before major feature work or user growth.

— Djehuti, archivist
