---
name: unit-testing
description: Conventions for writing and reviewing unit tests in petfinder-web (Vitest + Testing Library). Use this whenever writing a new test, adding test coverage for a component/hook/util in petfinder-web, or reviewing whether existing test coverage is sensible. Covers what to test, what to deliberately skip, file placement, provider/mocking setup, and query priority — read this before writing any *.test.tsx/ts file in this app.
---

# petfinder-web unit testing

The goal of a test here is to catch a real regression a future refactor could introduce, not
to maximize a coverage number. Every test should answer "what breaks if this is wrong?" — if
you can't answer that concretely, don't write the test.

## Stack (already configured, don't re-set-up)

- Runner: **Vitest** (`yarn test` → `vitest run`), jsdom environment, globals on (no need to
  import `describe`/`it`/`expect`).
- `@testing-library/react` + `@testing-library/dom` for rendering/querying.
- `@testing-library/jest-dom` matchers (`toBeInTheDocument`, `toHaveClass`, `toBeDisabled`, …)
  are loaded globally via `src/setupTests.ts` — don't re-import them per test.
- File placement: co-locate as `index.test.tsx` (or `<file>.test.ts`) next to the file under
  test, matching `src/components/Input/index.test.tsx`, `src/pages/SignIn/index.test.tsx`,
  `src/pages/SignUp/index.test.tsx`, and `src/routes/index.test.tsx`. Treat those four files as
  the canonical style reference for structure and tone.

## What to test

Test **observable behavior**, from the point of view of a user or of the code that calls this
module — not internal implementation.

- **Conditional rendering / branching**: different UI for loading vs. loaded, error vs. success
  vs. info, empty vs. filled optional field, authenticated vs. not.
- **User interaction outcomes**: clicking, focusing, submitting leads to the expected DOM change
  or callback call (see the Input focus test).
- **Hooks that hold real logic**: state transitions, side effects with real consequences
  (reading/writing `localStorage`, calling `api`, setting/clearing timers). `useAuth` and
  `useToast` both qualify — sign-in/sign-out persist and clear `localStorage` and the axios
  auth header; toasts get added, auto-dismissed after a timeout, and removed on demand.
- **Guard/routing logic**: redirect behavior for private routes (already covered).
- **Utility functions with actual branching or transformation logic**: parsing, formatting,
  validation — anything with more than one possible output for different inputs.

## What NOT to test (and why)

Writing a test for these mostly restates the implementation, adds no protection against real
bugs, and breaks on harmless refactors — treat that as a cost, not diligence.

- **Third-party library internals** (react-router, unform, leaflet, axios, @react-spring).
  Trust that they work; only test _your_ usage of them (e.g., that `PrivateRoute` redirects —
  not that `react-router` itself redirects).
- **Pure type-cast / re-export shims with no runtime branching** — e.g. `utils/icon.ts`,
  `utils/unformCompat.ts`. They exist to satisfy TypeScript, not to run logic; a test would only
  ever assert "returns the same reference," which is not a real regression risk.
- **Static config/wiring built with no conditionals** — e.g. `services/api.ts` (one
  `axios.create` call), `utils/mapIcon.ts`, `utils/pointIcon.ts` (constructing a `Leaflet.icon`
  with fixed props). Nothing to branch on; a test just duplicates the source line.
- **Generated CSS-in-JS output** (Panda `styled-system`, `styles.ts` files). Don't assert on the
  literal generated class name string. If a class needs to change conditionally, assert on the
  _change_ the way the Input test does (`className` before vs. after focus), not on the string
  itself.
- **Implementation details**: internal state variable names, number of hook calls, component
  internals not exposed through rendered output or public API. If it's not visible to a user or
  a caller, it's not a stable thing to assert on.
- **Snapshot tests.** Broad snapshots are low-signal and brittle here — prefer specific,
  intention-revealing assertions instead.
- **Exhaustive prop matrices for simple presentational components.** For something like
  `Tooltip` or `Button`, one or two representative cases (default + one variant) are enough;
  don't enumerate every prop combination.

When in doubt: if the only way to make a test fail is to change the source line-for-line, skip
it — that's implementation coverage, not behavior coverage.

## Rendering setup

Wrap components in only the providers they actually need, following the existing tests:

- Router-dependent code (uses `Link`, `useNavigate`, private routes): wrap in `<MemoryRouter>`,
  set `initialEntries` when the starting path matters.
- Code that consumes `useAuth`: wrap in `<AppUser>` (from `src/hooks`).
- Code that consumes `useToast`: wrap in `<ToastProvider>` (from `src/hooks/toast`).
- Form fields built on unform (`Input`, etc.): wrap in the `Form` from
  `src/utils/unformCompat`, not `@unform/web` directly.

## Query priority

Prefer queries in this order, matching Testing Library's own guidance and the existing tests:
`getByRole` / `getByLabelText` / `getByPlaceholderText` / `getByText`, and only fall back to
`getByTestId` for elements with no semantic role or accessible text (e.g. the `input-container`
wrapper `div` in `Input`). Reaching for `data-testid` first is a sign the test may be checking
the wrong thing.

## Mocking

- **Network calls**: `vi.mock('../../services/api')` (adjust the relative path) and assert on
  how the mocked `post`/`get` was called, or control what it resolves to. Don't hit the real
  `axios` instance.
- **Timers**: components with a `setTimeout`/`setInterval` (e.g. `Toast`'s 3s auto-dismiss) need
  `vi.useFakeTimers()` at the start of the test and `vi.useRealTimers()` (or
  `vi.runOnlyPendingTimers()`) afterward — don't let a real 3-second timer run in the suite.
- **`localStorage`**: jsdom provides a real implementation; no mock needed, but call
  `localStorage.clear()` in `beforeEach`/`afterEach` so tests don't leak state into each other.
- **`@react-spring/web` (`useTransition`/`animated`)**: its leave transition keeps an element
  mounted until a real animation frame finishes, which jsdom won't drive for you — combined with
  fake timers it can hang forever. Mock the module (see `src/hooks/toast.test.tsx`) so
  `useTransition` renders items synchronously; that tests your own state logic (item added/
  removed from the list) instead of react-spring's animation timing, which is exactly the kind
  of third-party internal this suite shouldn't be asserting on.

## Naming

`describe('ComponentOrHookName', () => { it('does one specific observable thing', () => {}) })`.
Write `it` descriptions as plain English sentences describing behavior (not "test 1" or
mirroring the implementation), consistent with the existing suite.
