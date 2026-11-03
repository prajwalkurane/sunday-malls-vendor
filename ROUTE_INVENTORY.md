# Route Inventory

## Next.js routes

- `/` — Vendor application, presented in the approved iPhone 17 frame.
- The project also contains separate marketplace/demo routes such as `/products/[id]`, `/orders/[id]`, and `/quotes/[id]`; these are not buyer-side screens in the vendor app.

## Vendor app screen state

The vendor experience is implemented in one state-driven app, not as 38 independent Next.js pages. Screen state is reflected in the URL hash, and nested screens use a visible Back control with a configured parent fallback.

### Primary navigation

| Screen state | Purpose |
|---|---|
| `home` | Vendor dashboard and business insights |
| `products` | Product catalogue and management |
| `orders` | Order management |
| `enquiries` | Buyer requests and quotations |
| `more` | Business tools and account entry points |

The bottom navigation is exactly Home, Products, Orders, Enquiries, and More.

### Business tools and account screens

`inventory`, `analytics`, `payments`, `settlements`, `logistics`, `returns`, `disputes`, `support`, `profile`, `settings`, `security`, `onboarding`, `pricing`, `promotions`, `notifications`, `warehouses`, `stock-history`, and `help`.

### Conversation and record screens

`chat`, `quotation`, `rfq-detail`, `quotation-detail`, `order-detail`, `invoice-detail`, `product-detail`, `warehouse-detail`, `shipment-detail`, and `settlement-detail`.

### Completed detail and editor screens

`analytics-report`, `return-detail`, `dispute-detail`, `business-editor`, and `campaign-editor`.

These groups total 38 state-driven screens. Bottom navigation is shown only on the five primary screens; every nested/tool screen provides a visible Back control. The approved header and frame are shared across screens.

## Simulation boundaries

Analytics/export, payments/settlements, shipping, returns/refunds, disputes, campaigns, verification, messaging, and support actions use local sample state only. They do not represent connected APIs or external services.
