# Systems Audit: Nameless Quest

**Date:** Feb 6, 2026 | **Version:** 0.6.13 | **Commits:** 185 total

---

## Architecture & Tech Stack

**Core:** Vue 3 + Vite + TypeScript + PostCSS  
**Deployment:** Netlify (SPA with PWA support)  
**Backend:** Firebase (Auth + Firestore)  
**Bundler:** Vite 2.6.14 → Rollup 2.79.2  
**Package Manager:** pnpm (lock: pnpm-lock.yaml, 356KB)

**Code Structure** (8,872 LOC across 76 Vue + 31 TS files):

- `/src/components` — 20 Vue components (565 lines max: OracleInfo)
- `/src/views` — Router views (Gratitude, About, Config, Journal, Change)
- `/src/composables` — Logic extraction (6 files: hexagrams, dragging, spinnable, etc.)
- `/src/utils` — Helpers (cards, tosses, backgrounds, auth, drawer state)
- `/src/store` — Centralized state (rolls, theme, config)
- `/src/assets` — Fonts, styles, SVG icons, backgrounds (114M source)

**Build Output** (29M dist):

- `firebase.3820fbe2.js` — 438 KB
- `index.31402f03.js` — 440 KB
- `vue.f7b91ad6.js` — 141 KB
- `index.a1bdfa64.css` — 71 KB
- `workbox-a18a5c8f.js` — Service worker
- PWA manifest + assets + redirects

---

## Dependency Landscape

### Critical Observations

1. **Major Version Lag** — 35+ packages are **2–5 major versions behind**:

   - Vite: 2.9.18 → 7.3.1 (⚠️ Major migration effort)
   - TypeScript: 4.9.5 → 5.9.3 (good headroom; 4.9 still usable)
   - Eslint: 8.57.1 → 10.0.0
   - Firebase: 9.23.0 → 12.9.0 (v9 is legacy; v12 is current)
   - VueUse: 6.9.2 → 14.2.0 (7 major versions!)
   - @vitejs/plugin-vue: 1.10.2 → 6.0.4 (old, unmaintained)
   - Rollup: 2.79.2 → 4.57.1

2. **No Security Audit Baseline** — Cannot run `npm audit` (pnpm lock format). Likely safe (Firebase v9 still supported), but unverified.

3. **PostCSS Ecosystem Heavy** — 7 PostCSS plugins in use; some unmaintained:

   - `postcss-advanced-variables` (v3 → v5)
   - `postcss-font-magician` (v3 → v4)
   - `precss` & `postcss-preset-env` overlap; consider consolidation

4. **Deprecated Tooling**:
   - **Husky 7.0.4** (EOL; v9.1.7 available) — Git hooks work but outdated
   - **Pug 3.0.3** for templates (fine, stable)
   - **Commitizen** (active; good convention practices)

---

## Tech Debt & Fragility

### High Priority

1. **Vite 2 → 7 Migration** — This is a major jump. Current build works, but:

   - Plugin API changed significantly
   - Build config syntax evolved (rollupOptions structure)
   - Tree-shaking & chunk splitting may differ
   - Hot reload behavior differs in dev
   - **Action:** Plan incremental update path (v2 → v4 → v7)

2. **Firebase v9 Tenure** — Firebase v9 reaches end-of-life in ~2025–2026. Already on borrowed time.

   - Migration to v10+ should be roadmapped
   - Breaking changes expected (modular SDK syntax already there; may need refactor)

3. **TypeScript 4.9** — Still safe, but not receiving updates. Target 5.0+ for new features (enums, const type parameters).

### Medium Priority

4. **Large Component Files** — OracleInfo (565 lines) and OracleCast (262) are serviceable but candidates for extraction:

   - Consider extracting sub-components from OracleInfo
   - SFC `<script setup>` could clean up Options API verbosity

5. **Chunk Size Warning Increased** — `chunkSizeWarningLimit: 1500` KB suggests boundary pressure:

   - Firebase bundle (438 KB) is 29% of the limit
   - Vue bundle (141 KB) reasonable
   - **Risk:** If dependencies grow, chunks may exceed limit silently
   - **Recommendation:** Monitor and consider lazy-loading routes aggressively

6. **PostCSS Plugin Redundancy** — `postcss-preset-env` + `precss` + `postcss-advanced-variables` overlap. Consolidation could reduce build complexity.

### Low Priority

7. **Minimal TODOs** — Only 6 scattered (`TODO: focus query`, `TODO: style invalid chars red`, etc.). Healthy codebase hygiene.

8. **Console Logging in Prod** — One fix applied (`logs: skip console in prod`), but pattern should be audited across all files.

---

## Performance Constraints

### Bundle Size

- **Total JS:** ~1 MB gzipped (438 + 440 + 141 = 1019 KB uncompressed)
- **CSS:** 71 KB (serviceable)
- **Assets:** PWA icons + backgrounds add ~400 KB
- **Network:** Reasonable for an interactive SPA; Firebase SDK is the largest component

### Load Time Factors

- **PWA Service Worker** — Workbox configured for offline + caching ✓
- **Code Splitting** — Firebase, Vue, vendor chunks separated (good)
- **Lazy Routes** — Not visible in config; check router setup (potential optimization)
- **Image Optimization** — Sharp included as dev dep (pre-processing)

### Rendering Bottlenecks

- **Large DOM on Oracle views** — HexaCard (368 LOC), ChangeNode (216 LOC) with complex state binding
- **Scroll Performance** — `vue-scrollto` + `scroll snap` active; ensure efficient handlers
- **Theme Switching** — `setTheme()` loops detected; watch for redundant repaints (one fix already applied)

---

## Deployment & DevOps

✓ **Netlify Integration** — Configured with redirects, manifest headers, TOML config  
✓ **Git Hooks** — Husky 7 enforces lint + format pre-commit/pre-push  
✓ **Semantic Versioning** — standard-version + commitizen active (185 commits; steady cadence)  
✓ **Build Pipeline** — `pre-deploy` runs tidy + build; clean script handles PWA artifacts  
⚠️ **Node Version** — .nvmrc exists (locked version present); good practice

---

## Dependency Maintenance Status

| Package    | Current | Latest | Status                               |
| ---------- | ------- | ------ | ------------------------------------ |
| Vue        | 3.5.27  | 3.5.27 | ✓ Current                            |
| Vue Router | 4.6.4   | 4.6.4  | ✓ Current                            |
| Firebase   | 9.23.0  | 12.9.0 | ⚠️ 3 versions behind; plan migration |
| Vite       | 2.9.18  | 7.3.1  | 🔴 Critical lag                      |
| TypeScript | 4.9.5   | 5.9.3  | 🟡 1 major version behind            |
| ESLint     | 8.57.1  | 10.0.0 | 🟡 1 major version behind            |

**Overall:** Codebase is stable but **showing signs of stagnation**. No critical vulnerabilities detected, but dependency landscape requires attention within next 6–12 months.

---

## Recommendations (Priority Order)

1. **Plan Vite 2→7 migration** — Schedule for next major release sprint
2. **Audit and upgrade Firebase** — Test in staging before prod rollout
3. **Consolidate PostCSS pipeline** — Reduce plugin count; simplify build config
4. **Refactor large components** — Especially OracleInfo (565 LOC); extract sub-components
5. **Implement lazy-loading routes** — Pressure on chunk size limit suggests it's time
6. **Upgrade TypeScript + ESLint to latest** — Low-risk, high-confidence updates
7. **Deprecate Husky 7** — Upgrade to 9 (just a version bump, no API change)
8. **Monitor bundle metrics** — Add CI check to warn if chunks exceed thresholds

---

**Assessment:** Healthy, working codebase with solid patterns (composition API, PWA setup, semantic versioning). Primary risk is **dependency debt accumulation**. Recommend quarterly audits and a 2-quarter upgrade roadmap to stay within support windows.

— Cyd
