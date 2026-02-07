# Nameless Quest: Work Queue

**Status:** Ship-ready (low-traffic). Test coverage required for growth.  
**Queue Generated:** 2026-02-06  
**Conductor:** Dudamel (routing & protocol)

---

## 🔴 BLOCKING (Ship-Stopping)

These must complete before deployment. They are dependencies for all downstream work.

### B1: Array Splice Bug (Journal Delete)

- **Owner:** @cyd (Systems)
- **Priority:** P0 (Critical)
- **Estimate:** 1 min
- **Status:** Unstarted
- **File:** `src/components/Journal.vue:184`
- **Description:**  
  Journal delete returns deleted element instead of remaining array. After delete, UI shows only deleted roll then empties.
  ```
  rolls.value = rolls.value.splice(...) // WRONG: splice returns [deleted]
  ```
  **Fix:** Replace with `.splice(...); return rolls.value` or use `.filter()`.
- **Dependencies:** None
- **Unblocks:** B3 (test infrastructure can then test this)
- **Risk:** High visibility bug; user-facing on every journal delete

### B2: Add Test Infrastructure

- **Owner:** @sophie (Quality)
- **Priority:** P0 (Critical)
- **Estimate:** 1–2 weeks
- **Status:** Unstarted
- **Scope:**
  - Set up Vitest + component test harness
  - 20–30 core tests across:
    - `utils/tosses.ts` (hex logic)
    - `utils/rolls.ts` (CRUD)
    - `components/LoginEmail.vue` (auth flow)
    - `components/OracleResponse.vue` (rendering)
    - `stores/journal.ts` (state mutations)
- **Description:**  
  Zero test coverage is HIGH RISK for refactoring and growth. Firebase integration, state mutations, and auth flows are untested. Test infrastructure must be in place before allowing dependency upgrades or major feature work.
- **Dependencies:** None (can start immediately)
- **Unblocks:** B3 (auth race guard), unblocked work on memory leaks, all future refactoring
- **Risk:** Effort-heavy but necessary gate

### B3: Fix Passwordless Auth Race Condition

- **Owner:** @nakai (Experience)
- **Priority:** P0 (Critical)
- **Estimate:** 1–2 days
- **Status:** Unstarted
- **File:** `src/router/guards.ts` (and/or `LoginPhone.vue`)
- **Description:**  
  Magic link lands in `/login` instead of `/journal`. Root cause: missing `onAuthStateChanged()` guard that waits for auth state to settle before routing. User sends magic link → opens link in new tab → router fires before Firebase auth state resolves → redirects to wrong page.

  **Fix:** Add guard that:

  1. Wraps route navigation in `onAuthStateChanged()` listener
  2. Waits for Firebase to confirm auth state
  3. Redirects authenticated users to `/journal` immediately

- **Dependencies:** B2 (test infrastructure should cover this)
- **Unblocks:** Ship release
- **Risk:** Auth flow is critical; needs test coverage post-fix

---

## 🟢 UNBLOCKED (Run in Parallel)

These can execute concurrently with blocking work. No dependencies on blocking items.

### U1: Memory Leak: Event Listener Cleanup

- **Owner:** @cyd (Systems)
- **Priority:** P1 (High)
- **Estimate:** 1–2 hours
- **Status:** Unstarted
- **Files:**
  - `src/lib/autoresize.ts`
  - `src/lib/spinnable.ts`
  - `src/lib/draggable.ts`
  - `src/App.vue` (touchstart handler)
  - `src/router/guards.ts` (afterEach adds 3 listeners per route change)
- **Description:**  
  Event listeners are added but never removed. Repeated navigation accumulates listeners → browser slowdown over time. High-impact, low-risk fix.

  **Solutions:**

  - Add `onUnmounted()` cleanup where Vue components own listeners
  - Add `{ once: true }` for one-off events
  - Refactor `guards.ts` to store and unsubscribe from router listeners

  Example:

  ```typescript
  onMounted(() => {
  	element.addEventListener('resize', handler);
  });
  onUnmounted(() => {
  	element.removeEventListener('resize', handler);
  });
  ```

- **Dependencies:** None
- **Unblocks:** Nothing; improves runtime performance
- **Risk:** Low (straightforward cleanup pattern)

### U2: Remove `hideLogsInProd()` Logging Masking

- **Owner:** @sophie (Quality)
- **Priority:** P2 (Medium)
- **Estimate:** 10 min
- **Status:** Unstarted
- **File:** `src/lib/hideLogsInProd.ts` (and all call sites)
- **Description:**  
  Currently reassigns `console.error = () => false`. This hides production errors entirely, blocking visibility into bugs after deploy.

  **Fix Options:**

  1. Remove function entirely (prefer error visibility)
  2. Replace with logger abstraction (send errors to Sentry/Rollbar instead of hiding)
  3. At minimum: preserve `console.error`, only suppress `console.log` / `console.warn`

  Current masking prevents debugging production issues.

- **Dependencies:** None
- **Unblocks:** Post-deployment visibility
- **Risk:** Low; improves observability

### U3: Plan Vite & Firebase Dependency Migration

- **Owner:** @cyd (Systems)
- **Priority:** P3 (Roadmap)
- **Estimate:** 2–4 hours (planning), 2–3 weeks (execution)
- **Status:** Planning
- **Scope:**
  - **Vite 2.9 → 7.3** (5 major versions)
    - Assess breaking changes
    - Test bundle output
    - Validate build pipeline
  - **Firebase v9 → v12** (3 major versions)
    - Review API changes (tree-shake, bundle impact)
    - Plan phased rollout (mid-2026)
- **Description:**  
  Current versions are 5 (Vite) and 3 (Firebase) major versions behind. Migrations should be incremental (2.9 → 4 → 5 → 6 → 7; v9 → v10 → v11 → v12).

  Does NOT block ship; planned for Q2 2026.

- **Dependencies:** None (planning only)
- **Unblocks:** Future feature work, perf improvements
- **Risk:** Medium; requires integration testing post-upgrade

---

## 📊 Queue Summary

| Task                    | Owner   | Priority | Estimate | Status | Blocker? |
| ----------------------- | ------- | -------- | -------- | ------ | -------- |
| B1: Array Splice        | @cyd    | P0       | 1 min    | —      | YES      |
| B2: Test Infrastructure | @sophie | P0       | 1–2 wks  | —      | YES      |
| B3: Auth Race Fix       | @nakai  | P0       | 1–2 days | —      | YES      |
| U1: Memory Leaks        | @cyd    | P1       | 1–2 hrs  | —      | NO       |
| U2: Logging Masking     | @sophie | P2       | 10 min   | —      | NO       |
| U3: Dependency Plan     | @cyd    | P3       | 2–4 hrs  | —      | NO       |

---

## 🔗 Dependency Graph

```
B1 (Array Splice)  ──┐
                     ├──> SHIP GATE
B2 (Tests)  ────────┤
                     ├──> Unblocks all refactoring
B3 (Auth Race)  ────┘

U1 (Memory Leaks) ──> Parallel (post-B3)
U2 (Logging)  ─────> Parallel (post-B3)
U3 (Deps Plan) ────> Q2 2026 roadmap
```

**Critical Path:** B1 → B2 → B3 = ~2–3 weeks minimum to ship  
**Non-Critical Path:** U1, U2 can run alongside B2/B3

---

## ✅ Ship Criteria

- [ ] B1: Array splice bug fixed & verified
- [ ] B2: Test infrastructure in place with 20+ core tests passing
- [ ] B3: Auth race condition resolved & tested
- [ ] U2: Logging masking removed or abstracted (visibility restored)
- [ ] All CI/CD checks passing (lint, build, E2E)

**After these clear:** Deploy to production with confidence.

---

**Routed by:** Dudamel, Conductor  
**Authority:** Protocol & Organization (no decisions)  
**Last Updated:** 2026-02-06 23:37 CST
