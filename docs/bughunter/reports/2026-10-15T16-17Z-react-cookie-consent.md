# BugHunter audit: React example cookie-consent lifecycle

- **Audit time:** 2026-10-15 16:17 UTC
- **Repository / audited base:** `qrati-connect-react-example` / `e8d21220825b878876a992621a30ca54b2da7843`
- **Workflow:** Initialize cookie consent, apply visitor preference to Google Consent Mode, and allow opening preferences from the footer.
- **Outcome:** No verified production defect; report-only PR. Severity: informational / no confirmed defect.

## Control and data flow

`src/App.tsx` mounts `CookieConsentBanner`. Its effect loads GTM through `initGtm()`, exposes `window.showCookiePreferences`, requests the geo requirement through `checkConsentRequired()`, and passes the resolved policy into `ensureCookieConsentInitialized(required)`. `src/lib/cookieConsent.ts` caches the geo result in `sessionStorage`, falls back to requiring consent on lookup errors, configures CookieConsent in opt-in or opt-out mode, and maps consent callbacks to Consent Mode updates. The footer also invokes the preferences helper.

Google documents consent defaults/updates as the integration mechanism, and CookieConsent documents its consent lifecycle callbacks.[1][2]

## Bounded related-code cone

Included: React app mount/footer call site (`src/App.tsx`), banner lifecycle (`src/components/CookieConsentBanner.tsx`), consent/geo/GTM implementation (`src/lib/cookieConsent.ts`), relevant package scripts and locked dependency versions. Adjacent backend geo endpoint, actual GTM container configuration, and the upstream copied implementation in `qrati-web` are outside this example repository and were not independently validated. No adjacent-repo comparison was made because `qrati-web` already has open BugHunter PRs and the available scope is this single coherent example integration.

## Findings

- No verified defect was established from current source inspection. Geo lookup failure defaults to requiring consent; banner unmount cancels follow-on initialization; consent initialization is shared by a module-level promise; and preference opening awaits initialization.
- Operational risk to monitor: a rejected `CookieConsent.run()` leaves the module-level `initPromise` rejected, preventing subsequent calls from retrying initialization. No evidence established that the library call rejects in ordinary operation, so this is not classified as a confirmed bug or changed without a reproducible failure.
- `initGtm()` queues global granted defaults and region-specific denied defaults before loading GTM. Correctness depends on deployment GTM configuration and visitor region behavior; no live tag container or browser network behavior was available to validate. No legal-compliance conclusion is made.

## Tests and quality

- No test suite or test script is present in the repository package manifest; no tests were added because this audit did not verify a defect or a safely testable change that would establish intended behavior.
- Unit tests: none present / not run. Integration tests: none present / not run. E2E tests: none found / not run. Coverage: not measured.
- Dependencies are not installed and `pnpm` is unavailable in the environment. Therefore build/typecheck and lint could not be run. No substitute test result is claimed.
- Performance: not measured.

## Recommendations

1. Add an isolated unit-test seam for geo lookup and consent initialization before changing retry semantics; test rejected initialization, subsequent retry, and concurrent calls against the real package contract.
2. Validate deployed GTM container behavior with Google Tag Assistant and a browser network trace for both consent-required and non-required regions.
3. Add a lightweight React integration test for banner unmount during the geo request and footer preference invocation.

## Verification

- Preflight confirmed the original checkout was clean on `main`, fetched, and at the audited SHA. Work was isolated in `bughunter/automation-react-cookie-consent-20261015` from `origin/main`.
- CodeGraph: initialized for this repository and queried the React integration/cookie-consent flow; it indexed 11 files and returned relevant entry points and dependencies. The generated `.codegraph/` directory was untracked in the original checkout and was not copied into the worktree/PR.
- `git diff --check`: pending final PR preparation.
- Build/lint/tests: blocked because `node_modules` is absent and `pnpm` is not installed.
- No production code or runtime data changed.

## Sources

[1] https://developers.google.com/tag-platform/security/guides/consent — Set up consent mode on websites | Google for Developers
[2] https://cookieconsent.orestbida.com/advanced/callbacks-events.html — Callbacks and Events | CookieConsent
