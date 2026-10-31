# Sunday Malls Vendor App Audit

## Scope and current state

The repository already contains a substantial vendor-first experience centered around `src/components/vendor-app.tsx` and `src/components/vendor-shell.tsx`. The app is presented inside the iPhone 17 shell implemented via `src/components/IPhone17Frame.tsx` and styled in `src/app/mobile-marketplace.css` and `src/app/vendor-app.css`.

### Key findings

- The app is not a buyer shopping app; it is a vendor workspace.
- The principal implementation is a state-driven vendor app rather than route-per-screen app pages.
- The main navigation and screen state are centralized in the vendor app shell.
- The device frame is already implemented and preserved.
- The `public/sunday-malls-logo.png` asset exists; the referenced `Header.png` and `footer.png` assets do not currently exist in the repo.
- The app already contains the main vendor flows: dashboard, products, orders, enquiries, inventory, analytics, support, settings, etc.

---

## 1) Screen inventory

| Screen | Parent | Entry point | Back destination | Header type | Bottom nav | Scroll container | Main actions | Empty/Loading/Error states | Dead controls | Issues |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | vendor app root | `go('home')` | n/a | Dashboard | Y | `va-screen-content` | add product, process orders, send quote, view reports | no dedicated empty state | none obvious | good business summary |
| Products | vendor app root | `go('products')` | `Home` | MainTab | Y | `va-screen-content` | add/edit/delete/update stock | empty state exists | delete action works via local state | search/filter in place |
| Orders | vendor app root | `go('orders')` | `Home` | MainTab | Y | `va-screen-content` | sort, view order, accept/reject | empty state exists | none obvious | fulfilment states present |
| Enquiries & RFQ | vendor app root | `go('enquiries')` | `Home` | MainTab | Y | `va-screen-content` | quote reply, create quote | no empty state in current list | none obvious | buyer flow exists |
| Inventory | vendor app root | `go('inventory')` | `Home` | MainTab | Y | `va-screen-content` | search stock, update stock, warehouse | empty state not explicit | none obvious | stock updates local state |
| Analytics | vendor app root | `go('analytics')` | `Home` | MainTab | Y | `va-screen-content` | report export, date range | no empty list | none obvious | charts present |
| Payments | vendor app root | `go('payments')` | `Home` | MainTab | Y | `va-screen-content` | view settlements | no explicit error state | none obvious | demo-only labels present |
| Settlements | vendor app root | `go('settlements')` | `Home` | MainTab | Y | `va-screen-content` | review breakdown | no empty state | none obvious | demo-only labels |
| Logistics | vendor app root | `go('logistics')` | `Home` | MainTab | Y | `va-screen-content` | view shipment labels | no explicit empty state | none obvious | shipping is simulated |
| Returns & refunds | vendor app root | `go('returns')` | `Home` | MainTab | Y | `va-screen-content` | approve/decline request | empty state not explicit | none obvious | status change works |
| Disputes | vendor app root | `go('disputes')` | `Home` | MainTab | Y | `va-screen-content` | contact resolution support | no empty state | none obvious | not fully enriched |
| Support centre | vendor app root | `go('support')` | `Home` | MainTab | Y | `va-screen-content` | help topics, new ticket | not explicit | none obvious | demo mode clearly labelled |
| Merchant profile | vendor app root | `go('profile')` | `Home` | MainTab | Y | `va-screen-content` | more business tools | no empty state | none obvious | good profile configuration |
| Settings | vendor app root | `go('settings')` | `Profile` | MainTab | Y | `va-screen-content` | toggles, reset preferences | no empty state | none obvious | account preferences UI present |
| Onboarding | vendor app root | `go('onboarding')` | `Profile` | Form | N | `va-screen-content` | send demo OTP, verify details | not explicit | OTP is demo only | simulated verification |
| Pricing & tiers | vendor app root | `go('pricing')` | `More` | MainTab | Y | `va-screen-content` | edit prices, manage campaigns | no empty state | none obvious | pricing cards exist |
| Promotions | vendor app root | `go('promotions')` | `More` | MainTab | Y | `va-screen-content` | new campaign | no empty state | none obvious | marketing demo |
| Create quotation | vendor app root | `go('quotation')` | `Enquiries` | Detail | Y | `va-screen-content` | save quotation | no empty state | none obvious | form works |
| Buyer chat | vendor app root | `go('chat')` | `Enquiries` | Detail | Y | `va-screen-content` | send message | no empty state | none obvious | message composer works |
| Notifications | vendor app root | `go('notifications')` | `Home` | MainTab | Y | `va-screen-content` | mark notifications read | no empty state | none obvious | list present |
| Warehouses | vendor app root | `go('warehouses')` | `Inventory` | MainTab | Y | `va-screen-content` | add warehouse | no empty state | none obvious | demo-only |
| Stock history | vendor app root | `go('stock-history')` | `Inventory` | Detail | Y | `va-screen-content` | audit movement log | no empty state | none obvious | history list present |
| Order detail | vendor app root | `go('order-detail')` | `Orders` | Detail | N | `va-screen-content` | accept/order status update, invoice preview | no error state | none obvious | state transitions work |
| Product detail | vendor app root | `go('product-detail')` | `Products` | Detail | N | `va-screen-content` | edit listing, stock update | no error state | none obvious | product detail present |
| Help centre | vendor app root | `go('help')` | `More` | Detail | Y | `va-screen-content` | support info | no empty state | none obvious | info section present |
| More | vendor app root | `go('more')` | `Home` | MainTab | Y | `va-screen-content` | module access | no empty state | none obvious | business modules list |

### Missing items recorded

- `Header.png` asset: missing
- `footer.png` asset: missing
- `src/app/design-system` exists but not used as a product shell; it is a design registry page
- No separate route files for the vendor stack beyond the root app shell and local state screens
- No dedicated `docs/qa/before` or `docs/qa/after` folder existed before this audit

---

## 2) Navigation map

### Central app state

The vendor app uses a single component tree with a `screen` state and called helper functions such as `go(...)` and `renderScreen()` in `src/components/vendor-app.tsx`.

### Main transitions

- `Home` -> `Products`, `Orders`, `Enquiries`, `Notifications`, `Profile`, `Analytics`, `Onboarding`, `More`
- `Products` -> `Product detail` -> `Edit product` modal -> back to `Products`
- `Orders` -> `Order detail` -> `Chat` / `Invoice preview` / `Status update` -> back to `Orders`
- `Enquiries` -> `Quotation`, `Chat`
- `Inventory` -> `Warehouses`, `Stock history`, `Product detail`
- `Profile` -> `More`, `Settings`, `Onboarding`, `Help`
- `More` -> every secondary module: payments, settlements, logistics, returns, disputes, pricing, support, profile, settings

### Back behavior

The app mostly uses explicit `go('...')` navigation and not `history.back()`. This is the safer pattern for the single-screen vendor app and should be preserved.

---

## 3) Dead-control list

The audit identified all visible interface controls that would be dead or simulated without meaningful behavior. The project already includes clear demo-only labels for many simulation points, and those should remain as-is.

- `src/components/vendor-app.tsx:343` — `onSaved={() => setToast('Saved products opened in this demo.')}`
- `src/components/vendor-app.tsx:388` — `setToast('Bulk upload template prepared in this demo.')`
- `src/components/vendor-app.tsx:408` — `onClick={() => setFilter(filter === 'All' ? 'New' : 'All')}` (filter only toggles; not a special control)
- `src/components/vendor-app.tsx:433` — `go('quotation')` on quote reply, works albeit route-based demo
- `src/components/vendor-app.tsx:445` — `setToast('Storefront preview opened in this demo.')`
- `src/components/vendor-app.tsx:468` — `setToast('Revenue report prepared for this demo.')`
- `src/components/vendor-app.tsx:520` — `setDialog('support')` for disputes support contact
- `src/components/vendor-app.tsx:534` — `setToast('Support ticket history opened.')`
- `src/components/vendor-app.tsx:579` — `setToast('Demo verification status refreshed...')`
- `src/components/vendor-app.tsx:626` — `showProduct()` action in pricing screen uses modal workflow
- `src/components/vendor-app.tsx:649` — quick-message buttons are local state, not server messaging
- `src/components/vendor-app.tsx:675` — warehouse creation action is demo-only
- `src/components/vendor-app.tsx:694` — invoice preview is a local toast viewer
- `src/components/vendor-app.tsx:737` — `renderScreen` switch is exhaustive but contains several state-only demos
- `src/components/vendor-app.tsx:818` — `setToast('Image picker opened...')` in product modal
- `src/components/vendor-app.tsx:872` — `setToast('Support ticket created in local demo mode.')`
- `src/components/vendor-app.tsx:890` — `setToast('Demo settings restored to defaults.')`

### Unimplemented controls that need explicit labels

- Any screen using `setToast(...)` without real persistence is functioning only as a demo.
- `product` modal `Choose file` is a file picker UI without upload service.
- `OTP` flows are simulated and labelled as such.
- `invoice preview`, `shipping label preview`, and `settlement breakdown` are local UI-driven only.

---

## 4) CSS conflicts / duplicate styles / hardcoded colours

### Main CSS files inspected

- `src/app/mobile-marketplace.css`
- `src/app/vendor-app.css`
- `src/app/globals.css`
- `src/app/layout.tsx`

### Conflicts and issues

1. `src/app/mobile-marketplace.css` contains the outer iPhone 17 device frame and is intentionally distinct from the app chrome.
2. `src/app/vendor-app.css` contains a large amount of vendor app styling using hardcoded colours and static values. These are not yet centralized as CSS variables.
3. `src/app/globals.css` currently contains a global foundation and resets; not all tokens are unified yet.
4. Some hardcoded values are repeated across vendor app CSS. This is a design-system gap and should be centralized.

### Example hardcoded colours observed

- `#2134c3` — `--va-blue`
- `#101933` — `--va-navy`
- `#171d31` — `--va-ink`
- `#f7f8fc` — `--va-page`
- `#e3e7ef` — `--va-border`
- multiple hex values in the app CSS for success, amber, danger, blue fills

### Duplicate style risk

The app includes both device presentation CSS and vendor app product CSS. They are not the same system, but they are intentionally separated. The more important issue is that the vendor CSS is still partly using raw hex values rather than a single token set.

---

## 5) Screens that do not exist or are missing

The following are currently missing from the repo and should be acknowledged as gaps rather than invented without need:

- `Header.png` — missing
- `footer.png` — missing
- A design/asset reference that matches the exact “footer” header mockup from the task description is absent
- A dedicated, route-based `More` page file does not exist; it is a state screen within the vendor app
- There is no separate route file for the onboarding flow beyond the state screen
- There is no route-level screen for each vendor module in the app directory; the app is centralized under a single state-driven app shell

This is acceptable because the current app is centrally structured and uses a single vendor app state machine, but it should be documented as a design choice rather than a missing feature.

---

## 6) Architectural summary

### Current architecture

- Next.js app router shell in `src/app`
- Real app experience in `src/components/vendor-app.tsx`
- Shared shell in `src/components/vendor-shell.tsx`
- Smarter iPhone 17 device shell in `src/components/IPhone17Frame.tsx`
- App-specific CSS in `src/app/vendor-app.css`
- Device frame CSS in `src/app/mobile-marketplace.css`

### Strengths

- Main navigation and flows are already present.
- The app is clearly vendor-oriented and free from buyer shopping flows.
- The app uses local mock state and toast-based interactions.
- The iPhone frame and mobile viewport are working and preserved.

### Gaps to continue on from here

- Consolidate CSS tokens to a single design system source of truth.
- Standardize component reuse across screens.
- Improve edge-case accessibility and ensure no dead controls remain.
- Confirm every screen has empty/loading/error states and a working back path.
- Document and preserve simulated-only actions where real external services are not present.
