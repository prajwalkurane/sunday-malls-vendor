# Demo Features and Limitations

## Vendor frontend capabilities

- Five-tab vendor navigation: Home, Products, Orders, Enquiries, and More.
- Product and order details, invoice preview, shipment tracking display, warehouse details, stock adjustments, and Stock History.
- RFQ details and local quotation creation, saving, history, and detail views.
- Interactive analytics metrics, chart legends, date filters, report search, empty states, and drill-down rows.
- Return and dispute case details, including references, order/product context, reasons, notes, timelines, and permitted local status actions.
- Business information and campaign editors with browser-side validation, cancel/save actions, dirty-form Stay / Discard confirmation, and local persistence.
- Search and filters across supported screens; keyboard focus indicators and reduced-motion behavior.

The vendor workspace is a frontend demonstration, not a live marketplace integration.

## Local demo persistence

The app uses browser `localStorage` under `sunday-vendor-demo` for supported sample changes, including products and stock movements, quotes, return/dispute updates, campaigns, and business profile fields. This is local to the browser profile; it is not a database or shared account. Clearing browser storage resets those demo changes.

Analytics, report export, campaign performance, and other sample figures are illustrative and are not calculated from a live service.

## Simulation boundaries

The following are not connected to external services:

- OTP request or verification and GST/PAN/business verification.
- Payments, settlements, refunds, invoices sent to buyers, and accounting exports.
- Courier booking, shipment tracking, return labels, and delivery status.
- Buyer messaging, quotation delivery, campaign publication/discounts, and support tickets.
- Dispute resolution, marketplace actions, and inventory synchronization.

Status changes, approvals, quotes, notes, tickets, reports, and campaign edits are local demo interactions only. For example, approving a return does not arrange a courier, and marking it refunded does not move funds.

## Product and test limitations

- No real authentication, backend, database, or live inventory synchronization.
- No payment gateway, refund service, carrier API, external support system, or verification provider.
- No physical-device or mobile OS keyboard testing was performed.
- `package.json` has no automated-test script; the interactive browser checks are not a committed regression suite.
- No public deployment is configured.

## Future integration path

Replace the local demo persistence with authenticated APIs and server-validated workflows before treating any payment, refund, verification, logistics, campaign, quotation, or support action as operational. Preserve the current vendor navigation and UI while integrating service behavior.
