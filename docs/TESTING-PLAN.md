# Testing Plan: Nameless Quest (B2 Quality Phase)

**Status:** Planning  
**Signed:** Sophie (Quality Agent)  
**Created:** 2026-02-06  
**Target:** 20–30 tests, 30–40% coverage on critical paths

---

## 1. Infrastructure Choices & Rationale

### Test Runner: **Vitest**

**Why Vitest?**
- ✅ Vite-first test runner (native support for Vue 3, TypeScript, ESM)
- ✅ Jest-compatible API (zero learning curve)
- ✅ Instant feedback (file-watching, fast re-runs)
- ✅ Native support for `.vue` files via `@vitejs/plugin-vue`
- ✅ Excellent TypeScript support (already in `tsconfig.json`)
- ✅ Plays well with the existing Vite config

### Test Libraries

| Library | Purpose | Why |
|---------|---------|-----|
| **vitest** | Test runner | Fast, Vite-native, Jest-compatible |
| **@vue/test-utils@^2** | Vue component testing | Official Vue 3 testing utility |
| **happy-dom** | DOM polyfill | Lightweight, no browser overhead |
| **vi** (built-in) | Mocking framework | Native Vitest mocking (spy, mock, stub) |
| **firebase-mock** | Firebase mocking | Mock `auth` and `firestore` operations |

### Alternative: jsdom?
We'll use **happy-dom** over jsdom because:
- Lighter weight (important for fast test runs)
- Sufficient for our DOM needs (no complex browser APIs required)
- Faster startup time

---

## 2. Test File Structure

### Location Convention: `.test.ts` (colocated)

Tests live **next to their source files** with the `.test.ts` suffix:

```
src/
├── utils/
│   ├── tosses.ts
│   ├── tosses.test.ts          ← Unit tests for hex logic
│   ├── cards.ts
│   ├── cards.test.ts
│   └── ...
├── store/
│   ├── rolls.ts
│   ├── rolls.test.ts           ← Unit tests for CRUD ops
│   ├── cache.ts
│   ├── cache.test.ts
│   └── ...
├── components/
│   ├── LoginEmail.vue
│   ├── LoginEmail.test.ts      ← Component tests
│   ├── OracleResponse.vue
│   ├── OracleResponse.test.ts
│   └── ...
├── composables/
│   ├── hexagrams.ts
│   ├── hexagrams.test.ts       ← Composable tests
│   └── ...
└── firebase.ts (no test—use mocks where needed)

tests/                          ← Optional: integration tests
├── integration/
│   ├── auth-flow.test.ts       ← Test email sign-in → journal save
│   └── oracle-flow.test.ts     ← Test query → toss → save
└── mocks/
    ├── firebase.ts             ← Firebase mock helpers
    └── fixtures.ts             ← Test data
```

### Test Naming Pattern

```typescript
describe('TossToBinary', () => {
  it('should parse valid 6-digit toss to binary pair', () => { ... })
  it('should return single binary when both halves are equal', () => { ... })
  it('should return [""] for invalid toss', () => { ... })
})
```

---

## 3. How to Run Tests

### Setup (one-time)

```bash
# Install dev dependencies
pnpm install

# No extra setup needed—Vitest uses existing vite.config.ts
```

### Run Tests

```bash
# Run all tests
pnpm run test

# Run tests in watch mode (file changes auto-rerun)
pnpm run test:watch

# Run tests with UI dashboard
pnpm run test:ui

# Run specific file
pnpm run test src/utils/tosses.test.ts

# Run with coverage
pnpm run test:coverage
```

### Add to `package.json`

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 4. Mock Patterns

### Firebase Auth Mocking

**Goal:** Mock `sendSignInLinkToEmail()` and `getAuth()` without real API calls.

#### Pattern: Mock Module

```typescript
// src/firebase.ts
export const auth = getAuth(firebaseApp);

// In test file:
import { vi } from 'vitest';
import * as firebase from '../firebase';

vi.mock('../firebase', () => ({
  auth: {
    useDeviceLanguage: vi.fn(),
  },
  db: null, // or mock a Firestore instance
  firebaseApp: {},
}));
```

#### Pattern: Mock Function

```typescript
import { vi } from 'vitest';
import { sendSignInLinkToEmail } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  sendSignInLinkToEmail: vi.fn()
    .mockResolvedValueOnce(undefined) // success
    .mockRejectedValueOnce({ code: 'auth/invalid-email' }), // error
}));
```

#### Usage in LoginEmail Test

```typescript
it('should call sendSignInLinkToEmail with correct params', async () => {
  const mockSendLink = vi.fn().mockResolvedValueOnce(undefined);
  vi.mocked(sendSignInLinkToEmail).mockImplementation(mockSendLink);

  // ... test component
  await emailLinkSend();

  expect(mockSendLink).toHaveBeenCalledWith(
    expect.any(Object), // auth
    'test@example.com',
    expect.objectContaining({
      url: expect.stringContaining('/journal'),
      handleCodeInApp: true,
    })
  );
});
```

### Firestore Mocking (for `rolls.ts`)

```typescript
import { vi } from 'vitest';
import { collection, addDoc, getDocs } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn().mockResolvedValueOnce({ id: 'doc-123' }),
  getDocs: vi.fn().mockResolvedValueOnce({
    docs: [
      {
        id: 'doc-1',
        data: () => ({
          query: 'Should I begin?',
          toss: '789678',
          moment: { seconds: 123456 },
        }),
      },
    ],
  }),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  getDoc: vi.fn(),
  doc: vi.fn(),
}));
```

### Vue Store Mocking (Reactive State)

```typescript
import { ref, reactive } from 'vue';

// Mock the reactive store
const mockCfg = reactive({
  saved: false,
  loading: false,
  // ... other flags
});

const mockCached = reactive({
  uid: 'test-user-123',
  query: 'Should I proceed?',
  toss: '678789',
  // ...
});

// In test:
vi.mock('../store', () => ({
  cfg: mockCfg,
  cached: mockCached,
}));
```

### localStorage Mocking

```typescript
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Reset localStorage mock before each test
  const localStorageMock = {
    getItem: vi.fn((key) => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});
```

---

## 5. Critical Paths to Test (20–30 tests)

### A. Utils Layer (8–10 tests)

#### `tosses.ts` - Hex logic
- ✅ `parseTossToBinary()`
  - Valid 6-digit toss → correct binary pair
  - Equal halves → single binary
  - Invalid input → [""]
  - Edge case: non-numeric chars
  
- ✅ `generateRandomToss()`
  - Returns valid 6-digit number
  - Uses yarrow odds correctly (distribution test)
  - Result in range [600000, 999999]

#### `cards.ts`, `drawer.ts`, `bkgds.ts` (basic coverage)
- ✅ Utility functions return expected types
- ✅ No errors on empty/null input

### B. Store Layer (6–8 tests)

#### `cache.ts` - Cache operations
- ✅ `cache()` sets value in reactive store + localStorage
- ✅ `uncache()` clears value from store + localStorage
- ✅ `cacheUser()` populates all user fields
- ✅ Error on null/undefined nym or val

#### `rolls.ts` - CRUD operations
- ✅ `addRoll()` - Firebase addDoc called, deduplication check
- ✅ `getRolls()` - Firestore getDocs called, array populated
- ✅ `updateRoll()` - updateDoc called with correct ID
- ✅ `deleteRoll()` - deleteDoc called, subsequent getRolls

#### `store/index.ts` - Config flags
- ✅ `set()` updates cfg + localStorage
- ✅ `tog()` toggles boolean and persists
- ✅ `lsd()` retrieves from localStorage, parses JSON

### C. Component Layer (6–8 tests)

#### `LoginEmail.vue`
- ✅ Renders input field + submit button
- ✅ `emailLinkSend()` calls `sendSignInLinkToEmail()`
- ✅ Shows success message after email sent
- ✅ Handles Firebase error gracefully
- ✅ Caches email on success

#### `OracleResponse.vue`
- ✅ Renders hexagrams from active lots
- ✅ `clearBoth()` uncaches query + toss on confirm
- ✅ `saveToJournal()` calls `addRoll()` + routes
- ✅ Displays correct binary toss as icons

#### `OracleCast.vue`, `HexaGrid.vue` (basic)
- ✅ Render without errors
- ✅ Props passed correctly to children

### D. Composables (2–4 tests)

#### `hexagrams.ts`
- ✅ `getHexagramByBin()` returns correct hexagram
- ✅ `getHexagrams()` returns Map, sorted by kingwen/octal
- ✅ `getEnglishNameByBin()` returns correct English name

#### `trigrams.ts`, `quadrants.ts`
- ✅ Basic function calls return expected shapes

### E. Integration (2–3 tests)

#### Auth flow
- ✅ User enters email → `sendSignInLinkToEmail()` called → success message
- ✅ Error path: invalid email → error shown

#### Oracle flow
- ✅ User queries → toss generated → hexagrams displayed → save to journal
- ✅ Unauthenticated user can toss but can't save (cachedRoll used instead)

---

## 6. Test Patterns & Examples

### Pattern 1: Unit Test (Pure Function)

```typescript
import { describe, it, expect } from 'vitest';
import { parseTossToBinary } from '../utils/tosses';

describe('parseTossToBinary', () => {
  it('should parse valid 6-digit toss to binary pair', () => {
    const result = parseTossToBinary('678789');
    expect(result).toEqual(['0b010101', '0b101010']);
  });

  it('should return single binary when both halves are equal', () => {
    const result = parseTossToBinary('777777');
    expect(result).toEqual(['0b111111']);
  });

  it('should return [""] for empty/invalid toss', () => {
    expect(parseTossToBinary('')).toEqual(['']);
    expect(parseTossToBinary('123')).toEqual(['']);
    expect(parseTossToBinary('abcdef')).toEqual(['']);
  });
});
```

### Pattern 2: Component Test (Vue + Mocks)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import LoginEmail from '../LoginEmail.vue';
import { sendSignInLinkToEmail } from 'firebase/auth';

// Mock Firebase
vi.mock('firebase/auth', () => ({
  sendSignInLinkToEmail: vi.fn(),
}));

vi.mock('../store/cache', () => ({
  cache: vi.fn(),
}));

describe('LoginEmail', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(LoginEmail);
  });

  it('should render email input and submit button', () => {
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#email_butt').exists()).toBe(true);
  });

  it('should call sendSignInLinkToEmail when form submitted', async () => {
    const mockSendLink = vi.mocked(sendSignInLinkToEmail);
    mockSendLink.mockResolvedValueOnce(undefined);

    // Set email and submit
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#email_butt').trigger('click');
    await nextTick();

    expect(mockSendLink).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      expect.any(Object)
    );
  });

  it('should show success message after email sent', async () => {
    vi.mocked(sendSignInLinkToEmail).mockResolvedValueOnce(undefined);

    await wrapper.find('#email').setValue('user@test.com');
    await wrapper.find('#email_butt').trigger('click');
    await nextTick();

    expect(wrapper.vm.emailSuccessMsg).toBe(true);
    expect(wrapper.find('label.alert').text()).toContain('magic link');
  });
});
```

### Pattern 3: Store Test (Reactive State)

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addRoll, getRolls, activeRolls } from '../store/rolls';
import { collection, addDoc, getDocs } from 'firebase/firestore';

vi.mock('firebase/firestore');
vi.mock('../firebase');
vi.mock('../store/cache');

describe('rolls store', () => {
  beforeEach(() => {
    activeRolls.value = [];
    vi.clearAllMocks();
  });

  it('should add roll to Firestore', async () => {
    const mockAddDoc = vi.mocked(addDoc);
    mockAddDoc.mockResolvedValueOnce({ id: 'roll-123' } as any);

    const roll = {
      uid: 'user-1',
      query: 'What next?',
      toss: '678789',
      moment: { seconds: 123456, nanoseconds: 0 },
    };

    await addRoll(roll);

    expect(mockAddDoc).toHaveBeenCalled();
  });

  it('should fetch rolls from Firestore into activeRolls', async () => {
    const mockGetDocs = vi.mocked(getDocs);
    mockGetDocs.mockResolvedValueOnce({
      docs: [
        {
          id: 'roll-1',
          data: () => ({
            query: 'Should I?',
            toss: '789678',
            moment: { seconds: 100000 },
            uid: 'user-1',
          }),
        },
      ],
    } as any);

    await getRolls();

    expect(activeRolls.value).toHaveLength(1);
    expect(activeRolls.value[0].query).toBe('Should I?');
  });
});
```

### Pattern 4: Integration Test (Multi-layer)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import OracleResponse from '../OracleResponse.vue';
import { addRoll } from '../store/rolls';

vi.mock('../store/rolls');

describe('Oracle response flow', () => {
  it('should save roll to journal on user click', async () => {
    const wrapper = mount(OracleResponse, {
      props: {
        // Hexagrams provided via store
      },
    });

    const saveBtn = wrapper.find('button:contains("Save to your Journal")');
    await saveBtn.trigger('click');

    // Verify addRoll was called
    expect(addRoll).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.any(String),
        toss: expect.any(String),
      })
    );
  });
});
```

---

## 7. Vitest Configuration

### Create `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // use describe/it/expect without imports
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'src/**/*.d.ts',
        'src/main.ts',
        'src/firebase.ts', // No tests for Firebase config
      ],
      lines: 30,
      functions: 30,
      branches: 20,
      statements: 30,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

### Or, merge into existing `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// ... other imports

export default defineConfig({
  plugins: [vue(), /* ... */],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
```

---

## 8. Dependencies to Install

```bash
pnpm add -D \
  vitest \
  @vue/test-utils@^2 \
  happy-dom \
  @vitest/ui \
  @vitest/coverage-v8
```

### Updated `package.json`

```json
{
  "devDependencies": {
    "vitest": "^0.34.0",
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^12.0.0",
    "@vitest/ui": "^0.34.0",
    "@vitest/coverage-v8": "^0.34.0"
  }
}
```

---

## 9. Example: First Passing Test (tosses.test.ts)

### File: `src/utils/tosses.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { parseTossToBinary, generateRandomToss } from './tosses';

describe('Tosses Utility', () => {
  describe('parseTossToBinary', () => {
    it('should convert a valid 6-digit toss to binary pair', () => {
      // Arrange
      const toss = '678789';
      const expected = ['0b010101', '0b101010'];

      // Act
      const result = parseTossToBinary(toss);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should return single binary when both halves match', () => {
      const toss = '666666';
      const result = parseTossToBinary(toss);
      expect(result.length).toBe(1);
      expect(result[0]).toMatch(/^0b[01]+$/);
    });

    it('should return [""] for invalid input', () => {
      expect(parseTossToBinary('')).toEqual(['']);
      expect(parseTossToBinary('123')).toEqual(['']);
      expect(parseTossToBinary('abcdef')).toEqual(['']);
    });
  });

  describe('generateRandomToss', () => {
    it('should generate a 6-digit number', () => {
      const toss = generateRandomToss();
      const str = toss.toString();
      expect(str.length).toBe(6);
    });

    it('should only generate digits 6, 7, 8, 9', () => {
      for (let i = 0; i < 10; i++) {
        const toss = generateRandomToss();
        const digits = toss.toString().split('');
        digits.forEach(d => {
          expect(['6', '7', '8', '9']).toContain(d);
        });
      }
    });
  });
});
```

**Run it:**

```bash
pnpm test src/utils/tosses.test.ts
```

**Expected output:**

```
✓ src/utils/tosses.test.ts (3 tests) 45ms

PASS  src/utils/tosses.test.ts

✓ Tosses Utility › parseTossToBinary › should convert a valid 6-digit toss to binary pair
✓ Tosses Utility › parseTossToBinary › should return single binary when both halves match
✓ Tosses Utility › parseTossToBinary › should return [""] for invalid input
✓ Tosses Utility › generateRandomToss › should generate a 6-digit number
✓ Tosses Utility › generateRandomToss › should only generate digits 6, 7, 8, 9

Tests: 5 passed (5)
Duration: 45ms
```

---

## 10. Test Implementation Roadmap

### Phase 1: Setup (Day 1)
- ✅ Install Vitest + dependencies
- ✅ Create `vitest.config.ts`
- ✅ Update `package.json` with test scripts
- ✅ Create `tests/mocks/` directory structure
- ✅ Document mock patterns (Firebase, localStorage)

### Phase 2: Utils Tests (Days 2–3)
- ✅ `tosses.test.ts` - 5 tests
- ✅ `cache.test.ts` - 4 tests
- ✅ `cards.test.ts`, `drawer.test.ts` - 3 tests each
- **Subtotal: 8–10 tests**

### Phase 3: Store Tests (Days 4–5)
- ✅ `rolls.test.ts` - 6 tests (CRUD with Firebase mocks)
- ✅ `store/index.test.ts` - 3 tests (cfg, tog, lsd)
- **Subtotal: 8–10 tests**

### Phase 4: Component Tests (Days 6–8)
- ✅ `LoginEmail.test.ts` - 4 tests
- ✅ `OracleResponse.test.ts` - 3 tests
- ✅ `OracleCast.test.ts`, `HexaGrid.test.ts` - 2 tests each
- **Subtotal: 8–12 tests**

### Phase 5: Composables & Integration (Days 9–10)
- ✅ `hexagrams.test.ts` - 3 tests
- ✅ `integration/auth-flow.test.ts` - 2 tests
- ✅ `integration/oracle-flow.test.ts` - 1 test
- **Subtotal: 6 tests**

### **Total: 20–30 passing tests, 30–40% coverage**

---

## 11. What's NOT Covered Yet

These can be added in **B3 Implementation Phase** if time permits:

- ❌ E2E tests (Cypress/Playwright) — full user journeys in real browser
- ❌ Performance/load tests — toss generation speed, render times
- ❌ Visual regression tests — screenshot comparisons
- ❌ Firebase emulator integration — real Firestore in tests (advanced)
- ❌ Accessibility tests — a11y audit

---

## 12. Success Criteria

A test is **passing** when:

1. ✅ All test files run without errors (`pnpm test`)
2. ✅ Coverage reports generated (`pnpm test:coverage`)
3. ✅ At least **20 tests** pass across utils, store, components
4. ✅ **Critical paths** covered: tosses → rolls → auth → oracle → journal
5. ✅ Firebase mocks work correctly (no real API calls)
6. ✅ Test patterns documented with examples

---

## 13. Quick Ref: Mock Setup

### For LoginEmail (Firebase Auth)

```typescript
vi.mock('firebase/auth', () => ({
  sendSignInLinkToEmail: vi.fn(),
  getAuth: vi.fn(() => ({ useDeviceLanguage: vi.fn() })),
}));
```

### For OracleResponse (Rolls CRUD)

```typescript
vi.mock('../store/rolls', () => ({
  addRoll: vi.fn(),
  cachedRoll: { value: null },
  activeRolls: { value: [] },
}));
```

### For Cache Operations

```typescript
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
});
```

---

## 14. Collaboration Notes

**When Cyd + Nakai merge to `main`:**

1. Pull the latest `main`
2. Run `pnpm install` (in case deps changed)
3. Start with **Phase 1 setup** (no branch yet, just in-progress docs)
4. Once Cyd + Nakai confirm blocking fixes are stable, **create feature branch** `feature/b2-testing`
5. Implement tests following this plan, commit after each phase
6. PR → code review → merge back to `main`

**Success signal:** All 20–30 tests pass, coverage > 30%, Firebase/auth flows verified.

---

## 15. References

- **Vitest Docs:** https://vitest.dev
- **Vue Test Utils:** https://test-utils.vuejs.org
- **Firebase Testing:** https://firebase.google.com/docs/emulator-suite
- **Happy DOM:** https://github.com/capricorn86/happy-dom

---

**Next Steps:**
1. Install dependencies
2. Create `vitest.config.ts`
3. Write first test: `tosses.test.ts` ✓
4. Verify `pnpm test` works
5. Wait for Cyd + Nakai merge signal

**Signed:** Sophie (Quality Agent)  
**Date:** 2026-02-06  
**Status:** Ready for B2 Phase → Cyd + Nakai finish, then B3 kicks off
