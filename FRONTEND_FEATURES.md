# Frontend Features Inventory

## Core experience implemented

### Primary navigation

- Five vendor tabs: Home, Products, Orders, Enquiries, and More
- 38 state-driven screens within the existing vendor shell; nested screens return to their originating screen with a safe parent fallback

### Vendor operations

- Home dashboard with merchant summary and business snapshot
- Product catalogue and listing management
- Inventory, warehouse, stock-adjustment history, and stock update flows
- Orders, invoice preview, shipment details, and status timeline
- Buyer enquiries, RFQ details, and local quotation create/save/detail workflow
- Payment and settlement summaries with settlement breakdown
- Shipping and logistics mock overview and shipment details
- Return and dispute lists plus dedicated case details, notes, timelines, validation, and local actions
- Interactive analytics metrics, chart legends, date filters, searchable report details, and empty states
- Business profile editor and campaign editor with validation, dirty-form confirmation, and local persistence
- Support, settings, Security, onboarding, pricing, and help screens

### Interaction patterns

- Tab-based navigation between major business areas
- Search and filter controls across reports, orders, products, and enquiries
- Toast messaging and local state updates
- Confirmation dialogs for destructive and unsaved-form actions
- Modal dialogs for stock edits, product save, and support requests
- Status updates consistent across inventory and order states
- Local mock-data persistence in browser localStorage
- Reduced-motion support and keyboard-visible focus states

### Visual patterns

- Premium card layout with strong hierarchy
- Large top banner for store performance summary
- Blue/amber accent styling for business actions
- Product imagery and product cards using realistic category photography
- Use of charts, stock summaries, and trend sections for operational trust

## Features intentionally simulated

- OTP verification flow
- Payment settlement transfers, refunds, and accounting exports
- Shipping carrier booking/tracking, return labels, and delivery status
- Business verification, GST/PAN checks, and OTP verification
- Notification delivery, quotation delivery, and buyer messaging
- Campaign publication/discounts and campaign analytics
- Support ticket submission and dispute resolution through external services

These flows are explicitly marked as simulated in the UI and are not connected to real services. Local approvals, notes, status updates, and exports do not contact external systems or move funds.
