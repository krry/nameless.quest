# 🔍 Bug Hunt Report: nameless.quest Codebase

**Scout:** Wesley  
**Date:** 2026-02-06  
**Status:** Needle hunt complete. Several sharp ones found.

---

## Executive Summary

This codebase is well-structured and thoughtfully composed, but has **5-7 medium-severity bugs** and **several code quality issues** that warrant attention:

- **Memory leaks** from unremoved event listeners
- **Logic bugs** in array manipulation and event cleanup
- **Global state issues** in authentication handlers
- **Console masking** that hides production errors
- **Hardcoded Firebase credentials** (client-side, acceptable but worth noting)

The author clearly knows their craft—there's evidence of past bug fixes and awareness of issues (TODOs, commented-out cleanup code). But some cleanup remains incomplete.

---

## 🐛 Critical Findings

### 1. **Memory Leak: Event Listeners Never Removed** (HIGH)

**Files affected:**

- `src/directives/autoresize.ts` (Line 5)
- `src/composables/spinnable.ts` (Line 130)
- `src/composables/draggable.ts` (Line 93, with commented-out cleanup on line 98-99)
- `src/App.vue` (Line 50)

**Issue:**
Event listeners are added but never removed on component unmount, causing memory leaks especially on SPAs with navigation:

```typescript
// autoresize.ts:5
el.addEventListener('input', OnInput, false);
// ^ No unmounted() hook to removeEventListener

// spinnable.ts:130
element.addEventListener('keydown', giveItAWhirl);
// ^ Never removed, composable doesn't cleanup

// draggable.ts:93
element.addEventListener('mousedown', onMouseDown);
// ^ Author noticed (line 98-99) but left cleanup commented out:
// onCleanup(() => {
//   do cleanup
// });

// App.vue:50
window.addEventListener('touchstart', () => set('navvy', true), {...});
// ^ Only scroll listener is removed (line 52), not this touchstart
```

**Impact:** Repeated navigation (especially on journal/oracle views) accumulates listeners → memory growth → eventually browser slowdown.

**Fix:** Add `unmounted()` hook or proper cleanup in watch/onCleanup:

```typescript
// For directives, add unmounted
unmounted(el) {
  el.removeEventListener('input', OnInput, false);
}

// For composables, use onUnmounted from vue
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.removeEventListener('keydown', giveItAWhirl);
});
```

---

### 2. **Logic Bug: Array Splice Assignment** (MEDIUM)

**File:** `src/views/Journal.vue` (Line 184)

**Issue:**

```typescript
rolls.value = rolls.value.splice(deletedRollIndex, 1);
```

`splice()` modifies the array in place and returns the **deleted elements**, not the remaining array. After this line, `rolls.value` becomes a 1-element array (the deleted roll), not the remaining rolls.

**Expected:** Remove the deleted roll from the UI  
**Actual:** Displays only the deleted roll, then removes it, leaving the view empty (unless user refreshes)

**Fix:**

```typescript
// Option 1: Don't reassign
rolls.value.splice(deletedRollIndex, 1);

// Option 2: Use filter (cleaner)
rolls.value = rolls.value.filter(r => r.id !== id);
```

---

### 3. **Memory Leak: Infinite addEventListener Stacking** (MEDIUM)

**File:** `src/router/guards.ts` (Lines 100-107)

**Issue:**
`afterEach()` runs on **every route change** and adds 3 global event listeners:

```typescript
export function afterEach(): void {
	// ...setup code...
	document.addEventListener('touchstart', activate, { passive: true });
	document.addEventListener('mousemove', activate);
	document.addEventListener('keydown', activate);

	setTimeout(() => {
		cfg.drawer && !active && drawer.close();
	}, 777);
}
```

Each route change adds another set of listeners. The `relax()` function removes them **after** activity or after 777ms, but rapid navigation can accumulate listeners.

**Impact:** Frequent navigation (orbit tab, click through pages) → multiple listeners on the same events → duplicate handler invocations → slight memory/performance degradation.

**Fix:** Track if listeners are already added, or use `{ once: true }` for the activate callback.

---

### 4. **Event Listener Matching Bug: spinnable.ts** (MEDIUM)

**File:** `src/composables/spinnable.ts` (Lines 92, 97, 102-103)

**Issue:**

```typescript
// Line 92: added
document.addEventListener(
	'touchstart',
	() => {
		/**/
	},
	{ passive: true, capture: true }
);

// Line 97: attempting to remove
document.removeEventListener(
	'touchstart',
	() => {
		/**/
	},
	true
);
```

These are **different anonymous functions**. The remove call won't match the add call, so the listener is never removed.

Similarly:

```typescript
// Lines 102-103: added with { once: true }
document.addEventListener('mousemove', onMouseMove, { once: true });
document.addEventListener('touchmove', onTouchMove, { once: true });

// Line 105: trying to remove
document.removeEventListener(moveEvent.value, fluctuateSpinner);
```

The `{ once: true }` listeners auto-remove, but the code tries to manually remove `fluctuateSpinner` which wasn't the listener added—this is confusing and brittle.

**Fix:** Save references to callback functions or don't try to remove listeners that have `{ once: true }`.

---

### 5. **Global State Leak in LoginPhone.vue** (MEDIUM)

**File:** `src/components/LoginPhone.vue` (Lines 27-30, 150-158)

**Issue:**

```typescript
let confirmResult: ConfirmationResult;
let recaptchaVerifier: RecaptchaVerifier;
let recaptchaResponse: Response;
```

These are **module-level variables** (not inside the component). If the component is mounted multiple times or instances overlap, they could be shared/corrupted.

Also, if a user navigates away and back to login, old `confirmResult` from a previous session might still be used.

**Impact:** Race conditions in login flow, especially if user goes back/forward or opens login in multiple tabs.

**Fix:** Move these into the component's reactive state:

```typescript
const rx = reactive({
	confirmResult: null as ConfirmationResult | null,
	recaptchaVerifier: null as RecaptchaVerifier | null,
	recaptchaResponse: null as Response | null,
});
```

---

### 6. **Unhandled Promise Rejection** (MEDIUM)

**File:** `src/components/LoginPhone.vue` (Line 144)

**Issue:**

```typescript
} else throw new Error('not ready to accept a confirmation code');
```

This error is thrown inside a function but likely never caught. If `acceptConfirmationCode()` is called in an edge case where `!rx.acceptingCode`, it will cause an unhandled promise rejection.

**Fix:** Guard the condition or return early:

```typescript
async function acceptConfirmationCode() {
	if (!rx.acceptingCode) {
		console.error('not ready to accept a confirmation code');
		return; // or throw in a try-catch at the call site
	}
	// ... rest of function
}
```

---

## ⚠️ Code Quality Issues

### 7. **Problematic hideLogsInProd() Implementation** (MEDIUM)

**File:** `src/utils/index.ts` (Lines 55-61) → called in `src/main.ts` (Line 11)

**Issue:**

```typescript
export function hideLogsInProd(): void {
	if (process.env.NODE_ENV === 'production') {
		console.log = () => false;
		console.info = () => false;
		console.warn = () => false;
		console.error = () => false; // ← This is the problem
	}
}
```

**Problems:**

1. Globally reassigning `console` is fragile and can break third-party libraries
2. **Hiding `console.error` masks real production bugs**—no visibility into what went wrong
3. Better to use a logger abstraction or sourcemap upload service

**Impact:** Production errors go silent; bugs are invisible until users complain.

**Fix:** Use a proper logging strategy:

```typescript
// Option 1: Conditional logging with a wrapper
const log = (msg: any) => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(msg);
	}
	// Optionally send critical errors to a service
};

// Option 2: Use Sentry or similar error tracking
// Option 3: Only hide console.log/info, not error/warn
```

---

### 8. **TODOs Left in Code** (LOW/MEDIUM)

**Found 6 TODOs:**

| File                             | Line | Task                                               |
| -------------------------------- | ---- | -------------------------------------------------- |
| `src/components/OracleQuery.vue` | 85   | Focus the query again after validation fails       |
| `src/components/OracleQuery.vue` | 124  | Make font bigger with fancy placeholder            |
| `src/components/OracleCast.vue`  | 34   | Style non-allowed characters red on change         |
| `src/views/Journal.vue`          | 140  | Re-run getRolls when Journal view shows            |
| `src/store/rolls.ts`             | 17   | Check collection for duplicate rolls before adding |
| `src/store/rolls.ts`             | 97   | Refresh journal entries after delete               |

**Note:** These are known-good TODOs (not bugs per se), but they suggest incomplete features.

---

## 🔐 Security Observations

### 9. **Hardcoded Firebase Config** (LOW)

**File:** `src/firebase.ts` (Lines 7-13)

This is a **hardcoded public API key**, but this is actually **expected** for Firebase client-side apps. Firebase keys are meant to be public; the real security is in Firestore rules.

**However:** Verify that Firestore rules properly restrict access (e.g., users can only read/write their own `/users/{uid}/rolls` collection). ✓ (Appears to be the case from `src/store/rolls.ts` logic)

**Note:** Not a vulnerability, just worth verifying rules on the Firebase console.

---

### 10. **XSS Analysis: Safe** ✓

- User input (queries) are stored in localStorage and rendered via Vue template interpolation `{{ }}`, which escapes HTML ✓
- v-html is used **only** on static data from `hexagrams.json` (judgments/images), not user input ✓
- No dangerouslySetInnerHTML patterns found ✓

**Verdict:** No XSS vulnerabilities detected.

---

## 🧪 Testing & Past Bug Fixes

**Evidence of good engineering:**

- Commit `b6947eb` (Jan 29, 2022): Fixed endless while loop in theme switcher

  - Used a `for` loop instead of `while` to prevent infinite iteration
  - Shows the author **catches and fixes nasty issues**

- Commit `65ea41a` (Jan 4, 2022): Added production log suppression
  - Attempted to hide console in prod (though the implementation could be better)

**Pattern:** Author is debugging-aware but may have incomplete cleanup on some features.

---

## 📝 Uncertainties & Questions

1. **Performance under rapid navigation:** Have users reported memory issues or slowdowns? The listener accumulation could be subtle.
2. **Journal delete behavior:** Is the array splice bug intentional (some custom logic I'm missing)? Or is it a real bug?
3. **Firebase rules:** Are Firestore security rules strict enough to prevent unauthorized access? Should verify in Firebase console.
4. **Service Worker state:** Commit mentions "let workbox use its defaults to avoid caching hangs"—are there still cache-related issues?
5. **Testing coverage:** Any e2e tests for the login flow (especially phone auth) and journal operations?

---

## 🎯 Recommended Priority

| Priority      | Issue                             | Effort | Impact                    |
| ------------- | --------------------------------- | ------ | ------------------------- |
| 🔴 **HIGH**   | Array splice bug (Journal)        | 5 min  | Deletes break journal UI  |
| 🟠 **HIGH**   | autoresize/spinnable listeners    | 20 min | Memory leak on navigation |
| 🟠 **HIGH**   | hideLogsInProd hides errors       | 10 min | Invisible production bugs |
| 🟡 **MEDIUM** | LoginPhone global state           | 30 min | Race conditions in login  |
| 🟡 **MEDIUM** | router/guards afterEach listeners | 20 min | Subtle memory leak        |
| 🟡 **MEDIUM** | App.vue touchstart listener       | 5 min  | Unbalanced add/remove     |
| 🟢 **LOW**    | spinnable event matching          | 15 min | Code clarity              |
| 🟢 **LOW**    | TODOs                             | varies | Feature completeness      |

---

## 🛠️ Suggested Next Steps

1. **Fix array splice** immediately (1 line change, big impact)
2. **Add unmounted hooks** to directives and composables (most important memory fix)
3. **Improve hideLogsInProd** to preserve console.error
4. **Add cleanup to router/guards.ts** afterEach behavior
5. **Move LoginPhone state** into reactive()
6. **Consider adding tests** for delete, navigation, and login flows

---

## Final Thoughts

This is a **well-crafted, thoughtfully designed codebase**. The bugs found are not architectural sins but rather incomplete cleanup and edge cases in an evolving project. The author clearly understands Vue, composition patterns, and Firebase integration.

The biggest concern is **silent error masking in production** (hideLogsInProd) combined with **memory leaks from listeners**. Both can make production issues invisible and hard to debug.

A focused round of cleanup would take ~2-3 hours and catch ~90% of these issues.

---

**Scout signing off.**

— Wesley 🔭
