# QA Report

## Scope and environment

- Existing Next.js vendor app and iPhone 17 presentation frame; no framework or routing migration.
- Five primary tabs: Home, Products, Orders, Enquiries, and More.
- The app now contains 38 state-driven screens, including report, return/dispute, business-profile, and campaign details/editors.
- Browser interactions used the integrated browser; completed-screen and modal captures were also produced with local headless Edge.
- No physical device or mobile OS keyboard was used.

## Functional browser checks

Verified:

- All five primary tabs and nested-screen Back navigation.
- Analytics metric/chart drill-down, legend interaction, report search/empty state, date filtering, and invalid-date validation.
- Return detail, required-note validation, confirmed local status action, and Back to the return list.
- Dispute detail, local note/status update, and Back to the dispute list.
- Business profile editing, validation, local save, and updated profile display.
- Campaign creation/editing, local persistence, and updated campaign data.
- Product create/edit/save and delete cancel/confirmation.
- Inventory adjustment reflected in Stock History.
- Order details, invoice, and shipment navigation.
- Enquiry → RFQ detail → quotation save/detail → return to enquiries.
- Settlement breakdown, security settings, and support-ticket creation.
- Unsaved-form Stay / Discard choices and browser Back on a dirty form.

These are interactive browser checks, not a checked-in automated regression suite. `package.json` has no test script, and VS Code test discovery reported zero test controllers.

## Responsive, keyboard, and motion checks

| Requested CSS viewport | Measured browser CSS viewport | Checks |
|---|---:|---|
| 360 x 740 | 360 x 740 | Primary tabs, return detail, business form, discard modal |
| 402 x 874 | 403 x 874 | Primary tabs, return detail, business form, discard modal |
| 409 x 818 | 409 x 818 | Primary tabs, return detail, business form, discard modal |
| 430 x 932 | 430 x 933 | Primary tabs, return detail, business form, discard modal |

The integrated browser uses a 0.8 device scale factor, so 402 x 874 and 430 x 932 were represented by the nearest integer viewport dimensions. At each measured size, the document and app frame had no horizontal overflow; the long form scrolled to its last field, and both modal actions remained visible. This is browser emulation, not physical-device testing.

At 360 x 740, 409 x 818, and 430 x 933, the More screen also scrolled to its end with the final card above the fixed bottom navigation.

With `prefers-reduced-motion: reduce` emulated, the screen animation duration computed to `1e-05s`. Keyboard Tab reached the accessible home button and matched `:focus-visible`. A mobile OS keyboard was not opened.

## Screenshots

`docs/qa/after` contains the existing screen archive and captures of the completed flows:

- `analytics-report.png`
- `return-detail.png`
- `dispute-detail.png`
- `business-editor.png`
- `campaign-editor.png`
- `unsaved-changes.png`

The screenshots show simulated data and do not imply live service integrations.

## Static validation

| Command | Result |
|---|---|
| `npm.cmd run lint` | Passed |
| `.\node_modules\.bin\tsc.cmd --noEmit` | Passed |
| `npm.cmd run build` | Passed; Next.js compiled, type-checked, and generated static pages |
| VS Code test discovery | Unavailable: zero registered test controllers; no project test script |

The production build reports that `D:\java 2025\sunday_malls\package-lock.json` is outside the app repository and is ignored by Next.js. The parent lockfile was left unchanged. The development browser also reported unused-preload warnings for a font and the existing logo; the approved header was not changed to address them.

## Remaining limitations

- No real backend, authentication, payment, refund, courier, marketplace, OTP, or GST/PAN verification service is connected.
- Analytics, settlement data, campaign attribution, exports, messaging, ticket creation, and other service actions are local demo interactions.
- Responsive/keyboard checks were browser-emulated only; no physical device or mobile OS keyboard was tested.
- Browser checks were not committed as a Playwright test suite; rerun them manually in the browser or add a dedicated test runner in a separate task.
