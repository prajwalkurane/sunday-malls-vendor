# Sunday Malls Vendor App Frontend Audit

## Inspection basis

- Inspected the running app at `http://localhost:3000/#home` in the existing iPhone presentation.
- Captured the Home screen in the shared browser at the 402 x 874 CSS-pixel preview size.
- Visited each of the 26 state-driven screens at 402 x 874 and measured the app viewport, screen content width, horizontal scroll width, title, Back control, and bottom navigation visibility.
- Existing baseline archive contains 25 screen captures under `docs/qa/before`; `more.png` is absent. `docs/qa/after` was empty at audit time.
- Previous interaction checks verified all five bottom tabs, all 18 existing nested screen fallback destinations, plus product, order, stock-history, settlement, and settings return paths.

## Screen inventory

| Screen | Screen title observed | Back control | Bottom nav | Baseline capture |
| --- | --- | --- | --- | --- |
| Home | Good morning, Sunday Malls HQ. | N/A | Yes | Yes |
| Products | Your products | N/A | Yes | Yes |
| Orders | Orders | N/A | Yes | Yes |
| Enquiries / RFQ list | Enquiries & RFQ | N/A | Yes | Yes |
| More / business tools | Your business | N/A | Yes | No |
| Inventory | Inventory | N/A | Yes | Yes |
| Analytics | Store analytics | N/A | Yes | Yes |
| Payments | Payments | Yes | No | Yes |
| Settlements | Settlements | Yes | No | Yes |
| Logistics | Shipping & logistics | Yes | No | Yes |
| Returns | Returns & refunds | Yes | No | Yes |
| Disputes | Disputes | Yes | No | Yes |
| Support | Support centre | Yes | No | Yes |
| Profile | Merchant profile | N/A | Yes | Yes |
| Settings | Settings | Yes | No | Yes |
| Onboarding | Let’s get you verified | Yes | No | Yes |
| Pricing | Pricing & tier rates | Yes | No | Yes |
| Promotions | Promotions | Yes | No | Yes |
| Chat | No screen-level H1; buyer name is visible | Yes | No | Yes |
| Quotation form/history | Create a quotation | Yes | No | Yes |
| Notifications | Notifications | Yes | No | Yes |
| Warehouses | Warehouses | Yes | No | Yes |
| Stock history | Stock movement | Yes | No | Yes |
| Order details | Order ID is the H1 | Yes | No | Yes |
| Product details | Product name is the H1 | Yes | No | Yes |
| Help | Help & information | Yes | No | Yes |

## Measured layout

- All 26 screens measured 400 CSS pixels of content width inside the 402-pixel presentation; none had horizontal overflow.
- The 18 nested screens exposed a visible Back control and did not show bottom navigation. The eight main screens showed bottom navigation.
- Long screens use the internal scroll area; the Home screen measured 1,239 pixels of content in a 603-pixel scroll viewport, with no horizontal overflow.

## Verified issues before implementation

1. Several business-record actions stop at a toast instead of opening details: invoice preview, warehouse details, settlement breakdown, RFQ details, and quotation-history details.
2. Settings has no Security screen; its account/security links only show demo toasts.
3. Enquiry rows open Chat directly, so the RFQ context has no dedicated detail page.
4. Chat has no screen-level title/H1; only the buyer name is shown.
5. Product deletion happens immediately without confirmation.
6. Product, stock, and support dialogs can close from the close button or backdrop without warning about entered changes.
7. Some profile operations and campaign controls report that an editor opened, but no editor is shown.
8. The baseline screenshot archive is missing the More screen capture; no after archive existed at audit time.
9. The package scripts configure lint and build but no automated test command.

## Known simulation boundaries

Payments, settlement values, OTP, verification, shipping, support, messaging, campaign operations, and document actions are local demo interactions, not connected services. Those boundaries are communicated by the app UI and must remain explicit.

## Follow-up implementation and verification

- Expanded the app from 26 to 33 state screens with Security, RFQ details, quotation details, invoice details, warehouse details, shipment details, and settlement breakdown.
- All 25 nested screens now show the shared 44px Back button; the eight main screens retain bottom navigation.
- Added local quote creation and history records, selected-record detail views, invoice preview, warehouse navigation, shipment timeline, settlement breakdown, and Security preferences.
- Product edits now refresh the open detail record. Delete requires confirmation. Product, stock, and support modal forms warn before discarding dirty input. Quotation and onboarding page forms warn on app navigation and browser Back.
- Verified Products → Product Details → Edit → Save → Product Details → Back, including preserved catalogue search and refreshed selected-record data.
- Verified Orders → Order Details → Invoice → Order Details → Orders.
- Verified Enquiries → RFQ Details → Create Quotation → Save → Quotation Details → Back to RFQ → Enquiries.
- Verified Inventory → Warehouses → Warehouse Details → Stock History → Warehouse → Warehouses → Inventory.
- Verified More → Settings → Security → Settings → More, plus Settlement Breakdown and Shipment Details return paths.
- Verified dirty-form prompt dismiss/accept for product edit, quotation, onboarding, and browser Back; verified product delete cancel/confirm.
- Captured 33 screen states and four modal states under `docs/qa/after`. The integrated browser's actual CSS viewport was 409 x 818, and all 33 screens measured equal content and scroll widths. The earlier 26-screen layout audit also ran at 402 x 874.
- The final screenshot capture reported one Next.js development LCP warning for the first product image. The first visible catalogue image now loads eagerly, remaining cards stay lazy, and the product detail image uses Next.js 16's `preload` prop.

## Final completion · 2026-11-02

- The state-driven app now has 38 screens. The five additions are Analytics report details, Return request details, Dispute details, Business information editor, and Campaign editor.
- Primary navigation is Home, Products, Orders, Enquiries, and More. Nested screens use a visible Back control and return to their originating screen, with a configured parent fallback.
- Analytics metrics, chart legends, date ranges, report rows, search, empty results, and report details are interactive. Metrics and report exports remain clearly labeled sample/simulated data.
- Return and dispute cases expose references, order/product context, reasons, notes, timelines, validation, and local actions. These actions do not contact refund, courier, marketplace, or dispute services.
- Business and campaign editors validate input, warn before discarding dirty forms, support Stay / Discard, and persist demo values locally. Business profile changes are reflected in related profile views.
- Inventory adjustments now appear in persisted Stock History. Existing product, order, invoice, shipment, RFQ/quotation, settlement, security, and support flows remain available.
- Browser interaction checks covered all five primary tabs; the above detail/editor flows; product create/edit/save/delete confirmation; inventory adjustment/history; order/invoice and shipment navigation; RFQ/quotation save and detail; settlement breakdown; security; support tickets; validation; empty search results; dirty-form Stay/Discard; and browser Back.
- Responsive browser checks covered the primary tabs, return details, long business form, and dirty-form dialog at 360 x 740, 403 x 874 (nearest representable to 402 x 874 in the integrated browser), 409 x 818, and 430 x 933 (nearest representable to 430 x 932). No document or app-frame horizontal overflow was measured; form fields and modal actions remained visible/reachable.
- Reduced-motion emulation applied the near-zero animation duration, and keyboard Tab navigation reached the accessible home button with a visible focus indicator.
- New QA captures are in `docs/qa/after`: `return-detail.png`, `dispute-detail.png`, `business-editor.png`, `campaign-editor.png`, and `unsaved-changes.png`. The earlier `analytics-report.png` capture remains available.
- `npm.cmd run lint`, `.\node_modules\.bin\tsc.cmd --noEmit`, and `npm.cmd run build` passed. The repository has no configured automated-test script; VS Code test discovery found no test controllers. Browser checks were interactive/manual automation, not a committed regression suite.

## Remaining limitations

- No physical-device or virtual-keyboard testing was performed. Browser keyboard navigation was checked, but opening a mobile OS keyboard was not.
- The package build warns that the parent-directory lockfile is outside this app repository; it was left unchanged. The development browser also reported unused preload warnings for a font and the existing logo. The approved header and frame were not changed to address those warnings.
- Product, profile, campaign, return/dispute, analytics, payment, settlement, OTP, GST/PAN verification, shipping, quotation delivery, and support behavior remains local demo functionality. There is no live backend, authentication, payment, refund, courier, or marketplace integration.
