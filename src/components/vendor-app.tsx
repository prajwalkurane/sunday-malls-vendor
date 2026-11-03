'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import {
  ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Banknote,
  BarChart3, Bell, Boxes, Building2, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronRight, CircleHelp, ClipboardList, Clock3, CreditCard,
  Download, FileCheck2, FileText, Filter, Headphones, ImagePlus,
  IndianRupee, Layers3, LifeBuoy, ListFilter, LockKeyhole, MapPin, MessageCircle,
  MessageSquare, MoreHorizontal, Package, PackageCheck, PackageOpen, Pencil,
  Plus, Search, Send, Settings, ShieldCheck, SlidersHorizontal, Sparkles, Store,
  Tag, TicketPercent, Trash2, TrendingDown, TrendingUp, Truck, Upload, UserRound,
  Wallet, Warehouse, X, Zap,
} from 'lucide-react';
import { VendorFooter, VendorHeader } from '@/components/vendor-shell';

type Screen =
  | 'home' | 'products' | 'orders' | 'enquiries' | 'more' | 'inventory'
  | 'analytics' | 'payments' | 'settlements' | 'logistics' | 'returns'
  | 'disputes' | 'support' | 'profile' | 'settings' | 'onboarding' | 'pricing'
  | 'promotions' | 'chat' | 'quotation' | 'notifications' | 'warehouses'
  | 'stock-history' | 'order-detail' | 'product-detail' | 'help' | 'security'
  | 'rfq-detail' | 'quotation-detail' | 'invoice-detail' | 'warehouse-detail'
  | 'shipment-detail' | 'settlement-detail' | 'analytics-report' | 'return-detail'
  | 'dispute-detail' | 'business-editor' | 'campaign-editor';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  moq: number;
  unit: string;
  status: 'Live' | 'In review' | 'Draft';
  art: string;
  image?: string;
};

type Order = {
  id: string;
  buyer: string;
  city: string;
  date: string;
  total: number;
  units: number;
  status: 'New' | 'Processing' | 'Ready to ship' | 'Shipped' | 'Delivered' | 'Cancelled';
};

type ReturnRequest = {
  id: string;
  buyer: string;
  product: string;
  status: 'Pending review' | 'Approved' | 'Rejected' | 'Refunded';
  amount: string;
  orderId: string;
  requestedOn: string;
  reason: string;
  note: string;
};

type DisputeCase = {
  id: string;
  subject: string;
  status: 'Open' | 'Under review' | 'Resolved';
  orderId: string;
  buyer: string;
  product: string;
  openedOn: string;
  reason: string;
  notes: { date: string; author: string; message: string }[];
};

type Quote = {
  id: string;
  buyer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  validUntil: string;
  status: string;
};

type WarehouseLocation = { name: string; city: string; kind: string; skuCount: number };
type Settlement = { id: string; date: string; total: string; status: 'Completed' | 'Pending' };
type Campaign = { id: string; name: string; offer: string; status: 'Active' | 'Scheduled' | 'Draft'; startDate: string; endDate: string; audience: string };
type BusinessProfile = { storeName: string; contactName: string; phone: string; email: string; address: string; city: string; gstin: string; pan: string };
type AnalyticsReportType = 'Revenue' | 'Orders' | 'Top products' | 'Sales by city';
type StockMovement = { id: string; productId: string; productName: string; change: number; reason: string; date: string };

const initialProducts: Product[] = [
  { id: 'P-1042', name: 'Wireless Over-Ear Headphones', sku: 'SM-LOT-MSIMQBI', category: 'Electronics', price: 3250, stock: 18, moq: 1, unit: 'piece', status: 'Live', art: '🎧', image: '/vendor-products/wireless-headphones.jpg' },
  { id: 'P-1038', name: 'Toreto Rolling Vibe Speaker', sku: 'SM-LOT-MSIM92R', category: 'Electronics', price: 1040, stock: 42, moq: 2, unit: 'piece', status: 'Live', art: '🔊', image: '/vendor-products/bluetooth-speaker.jpg' },
  { id: 'P-1029', name: 'Minimalist Floor Lamp', sku: 'SM-LOT-MSAC5ZL', category: 'Home & Kitchen', price: 4181, stock: 7, moq: 1, unit: 'piece', status: 'Live', art: '💡', image: '/vendor-products/ceiling-fan.jpg' },
  { id: 'P-1021', name: 'Performance Knit Running Shoes', sku: 'SM-LOT-MSABX6S', category: 'Fashion & Apparel', price: 3726, stock: 3, moq: 1, unit: 'pair', status: 'Live', art: '👟', image: '/vendor-products/sneakers.jpg' },
  { id: 'P-1015', name: 'Men’s Formal Shirt', sku: 'SM-LOT-MSTH28P', category: 'Fashion & Apparel', price: 1890, stock: 0, moq: 5, unit: 'piece', status: 'In review', art: '👔', image: '/vendor-products/apparel.jpg' },
  { id: 'P-1008', name: 'Accent Lounge Chair', sku: 'SM-LOT-MSAQ83F', category: 'Furniture', price: 16890, stock: 12, moq: 1, unit: 'piece', status: 'Live', art: '🪑', image: '/vendor-products/chair.jpg' },
  { id: 'P-1002', name: 'Cordless Impact Drill Kit', sku: 'SM-LOT-MSIDR42', category: 'Industrial supplies', price: 6890, stock: 24, moq: 2, unit: 'set', status: 'Live', art: '🛠️', image: '/vendor-products/power-drill.jpg' },
  { id: 'P-0996', name: 'Restorative Hair Mask', sku: 'SM-LOT-MSBYT18', category: 'Beauty & personal care', price: 780, stock: 64, moq: 6, unit: 'piece', status: 'Live', art: '🧴', image: '/vendor-products/skincare.jpg' },
  { id: 'P-0984', name: 'Assorted Indian Whole Spices', sku: 'SM-LOT-MSGRC27', category: 'Grocery & FMCG', price: 560, stock: 85, moq: 10, unit: 'pack', status: 'Live', art: '🌶️', image: '/vendor-products/spices.jpg' },
  { id: 'P-0972', name: 'Retail Smartphone, 128 GB', sku: 'SM-LOT-MSMOB12', category: 'Mobiles & accessories', price: 18999, stock: 16, moq: 1, unit: 'piece', status: 'Live', art: '📱', image: '/vendor-products/mobile-accessory.jpg' },
  { id: 'P-0961', name: 'Corrugated Shipping Cartons', sku: 'SM-LOT-MSPKG06', category: 'Packaging materials', price: 24, stock: 2400, moq: 100, unit: 'piece', status: 'Live', art: '📦', image: '/vendor-products/packaging-boxes.jpg' },
];

const initialOrders: Order[] = [
  { id: 'ORD-72841', buyer: 'Aarav Retail Co.', city: 'Pune', date: 'Today, 10:42 AM', total: 19475, units: 5, status: 'New' },
  { id: 'ORD-72838', buyer: 'Metro Electronics', city: 'Mumbai', date: 'Today, 9:18 AM', total: 12800, units: 8, status: 'Processing' },
  { id: 'ORD-72817', buyer: 'Shree Ganesh Stores', city: 'Nashik', date: 'Yesterday', total: 24750, units: 6, status: 'Ready to ship' },
  { id: 'ORD-72792', buyer: 'Citywide Distributors', city: 'Bengaluru', date: '28 Oct 2026', total: 38600, units: 12, status: 'Shipped' },
  { id: 'ORD-72761', buyer: 'Kumar Trading House', city: 'Surat', date: '27 Oct 2026', total: 8240, units: 3, status: 'Delivered' },
  { id: 'ORD-72750', buyer: 'QuickBuy Wholesale', city: 'Delhi', date: '26 Oct 2026', total: 5190, units: 2, status: 'Cancelled' },
];

const initialEnquiries = [
  { id: 'ENQ-3019', buyer: 'Vivek — Star Bazaar', item: 'Ceiling fans · 120 units', city: 'Pune', when: '12 min ago', amount: '₹4.2L', unread: true },
  { id: 'ENQ-3016', buyer: 'Neha — City Retail', item: 'Bluetooth speakers · 60 units', city: 'Mumbai', when: '1 hr ago', amount: '₹62,400', unread: true },
  { id: 'ENQ-3008', buyer: 'Rohan — Khandelwal Traders', item: 'Air coolers · 25 units', city: 'Nagpur', when: 'Yesterday', amount: '₹1.7L', unread: false },
];

const initialReturns: ReturnRequest[] = [
  { id: 'RET-2041', buyer: 'Aarav Retail Co.', product: 'Air Bag Foot Massager · 2 units', status: 'Pending review', amount: '₹6,500', orderId: 'ORD-72841', requestedOn: '2 Nov 2026', reason: 'Item arrived damaged', note: 'Buyer shared photos of a damaged outer carton. Product inspection is pending.' },
  { id: 'RET-2038', buyer: 'Metro Electronics', product: 'Wireless Headphones · 1 unit', status: 'Approved', amount: '₹1,890', orderId: 'ORD-72838', requestedOn: '31 Oct 2026', reason: 'Incorrect model received', note: 'Return approved in the local demo. Collection has not been arranged.' },
  { id: 'RET-2026', buyer: 'Citywide Distributors', product: 'Bluetooth Speaker · 3 units', status: 'Refunded', amount: '₹3,120', orderId: 'ORD-72792', requestedOn: '26 Oct 2026', reason: 'Transit damage', note: 'Sample case marked complete. No payment or refund was processed.' },
];

const initialDisputes: DisputeCase[] = [
  { id: 'DSP-0845', subject: 'Delivery confirmation', status: 'Open', orderId: 'ORD-72817', buyer: 'Shree Ganesh Stores', product: 'Minimalist Floor Lamp · 4 units', openedOn: '1 Nov 2026', reason: 'Buyer says only 3 of 4 cartons were received.', notes: [{ date: '1 Nov 2026 · 2:10 PM', author: 'Buyer', message: 'One carton appears to be missing from the delivery.' }] },
  { id: 'DSP-0842', subject: 'Delivery confirmation', status: 'Resolved', orderId: 'ORD-72792', buyer: 'Citywide Distributors', product: 'Wireless Headphones · 8 units', openedOn: '29 Oct 2026', reason: 'Buyer requested proof of delivery for the order.', notes: [{ date: '29 Oct 2026 · 11:40 AM', author: 'Vendor', message: 'Delivery confirmation was shared with the buyer in the demo.' }] },
  { id: 'DSP-0831', subject: 'Product condition query', status: 'Resolved', orderId: 'ORD-72761', buyer: 'Kumar Trading House', product: 'Toreto Rolling Vibe Speaker · 3 units', openedOn: '25 Oct 2026', reason: 'Buyer asked about a product condition mismatch.', notes: [{ date: '25 Oct 2026 · 4:05 PM', author: 'Vendor', message: 'The condition query was closed in the sample case.' }] },
];

const initialCampaigns: Campaign[] = [
  { id: 'CMP-1001', name: 'Diwali Wholesale Week', offer: '10% off · Orders above ₹10,000', status: 'Active', startDate: '2026-11-01', endDate: '2026-11-10', audience: 'All wholesale buyers' },
  { id: 'CMP-1002', name: 'First bulk order', offer: '₹500 off · New buyers', status: 'Scheduled', startDate: '2026-11-05', endDate: '2026-11-15', audience: 'New buyers' },
  { id: 'CMP-1003', name: 'Clearance picks', offer: 'Up to 15% off selected stock', status: 'Draft', startDate: '', endDate: '', audience: 'Selected products' },
];

const initialBusinessProfile: BusinessProfile = {
  storeName: 'Sunday Malls HQ',
  contactName: 'Sunday Malls Admin',
  phone: '9876543210',
  email: 'vendor@sundaymalls.example',
  address: '21 Market Road',
  city: 'Pune, Maharashtra',
  gstin: '27ABCDE1234F1Z5',
  pan: 'ABCDE1234F',
};

const initialStockMovements: StockMovement[] = [
  { id: 'MOV-1004', productId: 'P-1029', productName: 'Minimalist Floor Lamp', change: 12, reason: 'Restock received · Shipment GRN-204', date: 'Today, 9:20 AM' },
  { id: 'MOV-1003', productId: 'P-1021', productName: 'Performance Knit Running Shoes', change: -4, reason: 'Order fulfilment · ORD-72838', date: 'Yesterday, 3:15 PM' },
  { id: 'MOV-1002', productId: 'P-1042', productName: 'Wireless Over-Ear Headphones', change: 20, reason: 'Opening stock correction', date: '27 Oct, 11:08 AM' },
  { id: 'MOV-1001', productId: 'P-1015', productName: 'Men’s Formal Shirt', change: -2, reason: 'Buyer order · ORD-72792', date: '26 Oct, 4:32 PM' },
];

const analyticsRows: Record<AnalyticsReportType, { id: string; label: string; detail: string; date: string; value: number }[]> = {
  Revenue: [
    { id: 'ORD-72841', label: 'Aarav Retail Co.', detail: 'Order payout · Pune', date: '2026-11-02', value: 19475 },
    { id: 'ORD-72838', label: 'Metro Electronics', detail: 'Order payout · Mumbai', date: '2026-11-02', value: 12800 },
    { id: 'ORD-72817', label: 'Shree Ganesh Stores', detail: 'Order payout · Nashik', date: '2026-11-01', value: 24750 },
    { id: 'ORD-72792', label: 'Citywide Distributors', detail: 'Order payout · Bengaluru', date: '2026-10-28', value: 38600 },
    { id: 'ORD-72761', label: 'Kumar Trading House', detail: 'Order payout · Surat', date: '2026-10-27', value: 8240 },
  ],
  Orders: [
    { id: 'ORD-72841', label: 'Aarav Retail Co.', detail: 'New · Pune · 5 units', date: '2026-11-02', value: 19475 },
    { id: 'ORD-72838', label: 'Metro Electronics', detail: 'Processing · Mumbai · 8 units', date: '2026-11-02', value: 12800 },
    { id: 'ORD-72817', label: 'Shree Ganesh Stores', detail: 'Ready to ship · Nashik · 6 units', date: '2026-11-01', value: 24750 },
    { id: 'ORD-72792', label: 'Citywide Distributors', detail: 'Shipped · Bengaluru · 12 units', date: '2026-10-28', value: 38600 },
    { id: 'ORD-72761', label: 'Kumar Trading House', detail: 'Delivered · Surat · 3 units', date: '2026-10-27', value: 8240 },
  ],
  'Top products': [
    { id: 'P-1042', label: 'Wireless Over-Ear Headphones', detail: '32 units sold · Electronics', date: '2026-11-02', value: 104000 },
    { id: 'P-1038', label: 'Toreto Rolling Vibe Speaker', detail: '24 units sold · Electronics', date: '2026-11-01', value: 24960 },
    { id: 'P-1029', label: 'Minimalist Floor Lamp', detail: '18 units sold · Home & Kitchen', date: '2026-10-30', value: 75258 },
    { id: 'P-1021', label: 'Performance Knit Running Shoes', detail: '11 units sold · Fashion', date: '2026-10-28', value: 40986 },
  ],
  'Sales by city': [
    { id: 'Pune', label: 'Pune', detail: '36% of sample revenue', date: '2026-11-02', value: 36 },
    { id: 'Mumbai', label: 'Mumbai', detail: '28% of sample revenue', date: '2026-11-01', value: 28 },
    { id: 'Bengaluru', label: 'Bengaluru', detail: '19% of sample revenue', date: '2026-10-30', value: 19 },
    { id: 'Nashik', label: 'Nashik', detail: '12% of sample revenue', date: '2026-10-28', value: 12 },
  ],
};
const initialQuotes: Quote[] = [
  { id: 'QT-1028', buyer: 'Star Bazaar', product: 'Ceiling fans', quantity: 120, unitPrice: 3500, total: 420000, validUntil: '6 Nov 2026', status: 'Awaiting response' },
  { id: 'QT-1021', buyer: 'Metro Electronics', product: 'Bluetooth speakers', quantity: 60, unitPrice: 1040, total: 62400, validUntil: '4 Nov 2026', status: 'Negotiating' },
];

const initialWarehouses: WarehouseLocation[] = [
  { name: 'Gadgetopia Technologies', city: 'Pune, Maharashtra', kind: 'Primary', skuCount: 62 },
  { name: 'Sunday Malls Distribution', city: 'Mumbai, Maharashtra', kind: 'Secondary', skuCount: 24 },
];

const initialSettlements: Settlement[] = [
  { id: 'SET-1082', date: '29 Oct 2026', total: '₹48,920', status: 'Completed' },
  { id: 'SET-1081', date: '22 Oct 2026', total: '₹36,480', status: 'Completed' },
  { id: 'SET-1080', date: '15 Oct 2026', total: '₹52,150', status: 'Completed' },
];

const screenTitles: Record<Screen, string> = {
  home: 'Business insights', products: 'Product hub', orders: 'Order console',
  enquiries: 'Buyer enquiries', more: 'Your business', inventory: 'Inventory center',
  analytics: 'Store analytics', payments: 'Payments', settlements: 'Settlements',
  logistics: 'Shipping & logistics', returns: 'Return center', disputes: 'Disputes',
  support: 'Support centre', profile: 'Merchant profile', settings: 'Settings',
  onboarding: 'Vendor verification', pricing: 'Pricing & tiers', promotions: 'Promotions',
  chat: 'Buyer conversation', quotation: 'Create quotation', notifications: 'Notifications',
  warehouses: 'Warehouses', 'stock-history': 'Stock movement', 'order-detail': 'Order details',
  'product-detail': 'Product details', help: 'Help centre',
  security: 'Security', 'rfq-detail': 'Request details', 'quotation-detail': 'Quotation details',
  'invoice-detail': 'Invoice details', 'warehouse-detail': 'Warehouse details',
  'shipment-detail': 'Shipment details', 'settlement-detail': 'Settlement breakdown',
  'analytics-report': 'Report details', 'return-detail': 'Return request',
  'dispute-detail': 'Dispute details', 'business-editor': 'Business information',
  'campaign-editor': 'Campaign editor',
};

const screenConfig: Record<Screen, { parent: Screen; showBottomNav: boolean; title: string }> = {
  home: { parent: 'home', showBottomNav: true, title: screenTitles.home },
  products: { parent: 'home', showBottomNav: true, title: screenTitles.products },
  orders: { parent: 'home', showBottomNav: true, title: screenTitles.orders },
  enquiries: { parent: 'home', showBottomNav: true, title: screenTitles.enquiries },
  more: { parent: 'home', showBottomNav: true, title: screenTitles.more },
  inventory: { parent: 'more', showBottomNav: false, title: screenTitles.inventory },
  analytics: { parent: 'more', showBottomNav: false, title: screenTitles.analytics },
  payments: { parent: 'more', showBottomNav: false, title: screenTitles.payments },
  settlements: { parent: 'payments', showBottomNav: false, title: screenTitles.settlements },
  logistics: { parent: 'more', showBottomNav: false, title: screenTitles.logistics },
  returns: { parent: 'more', showBottomNav: false, title: screenTitles.returns },
  disputes: { parent: 'more', showBottomNav: false, title: screenTitles.disputes },
  support: { parent: 'more', showBottomNav: false, title: screenTitles.support },
  profile: { parent: 'home', showBottomNav: false, title: screenTitles.profile },
  settings: { parent: 'profile', showBottomNav: false, title: screenTitles.settings },
  onboarding: { parent: 'profile', showBottomNav: false, title: screenTitles.onboarding },
  pricing: { parent: 'more', showBottomNav: false, title: screenTitles.pricing },
  promotions: { parent: 'pricing', showBottomNav: false, title: screenTitles.promotions },
  chat: { parent: 'enquiries', showBottomNav: false, title: screenTitles.chat },
  quotation: { parent: 'enquiries', showBottomNav: false, title: screenTitles.quotation },
  notifications: { parent: 'home', showBottomNav: false, title: screenTitles.notifications },
  warehouses: { parent: 'inventory', showBottomNav: false, title: screenTitles.warehouses },
  'stock-history': { parent: 'inventory', showBottomNav: false, title: screenTitles['stock-history'] },
  'order-detail': { parent: 'orders', showBottomNav: false, title: screenTitles['order-detail'] },
  'product-detail': { parent: 'products', showBottomNav: false, title: screenTitles['product-detail'] },
  help: { parent: 'more', showBottomNav: false, title: screenTitles.help },
  security: { parent: 'settings', showBottomNav: false, title: screenTitles.security },
  'rfq-detail': { parent: 'enquiries', showBottomNav: false, title: screenTitles['rfq-detail'] },
  'quotation-detail': { parent: 'quotation', showBottomNav: false, title: screenTitles['quotation-detail'] },
  'invoice-detail': { parent: 'order-detail', showBottomNav: false, title: screenTitles['invoice-detail'] },
  'warehouse-detail': { parent: 'warehouses', showBottomNav: false, title: screenTitles['warehouse-detail'] },
  'shipment-detail': { parent: 'logistics', showBottomNav: false, title: screenTitles['shipment-detail'] },
  'settlement-detail': { parent: 'settlements', showBottomNav: false, title: screenTitles['settlement-detail'] },
  'analytics-report': { parent: 'analytics', showBottomNav: false, title: screenTitles['analytics-report'] },
  'return-detail': { parent: 'returns', showBottomNav: false, title: screenTitles['return-detail'] },
  'dispute-detail': { parent: 'disputes', showBottomNav: false, title: screenTitles['dispute-detail'] },
  'business-editor': { parent: 'profile', showBottomNav: false, title: screenTitles['business-editor'] },
  'campaign-editor': { parent: 'promotions', showBottomNav: false, title: screenTitles['campaign-editor'] },
};

const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

function StatusBadge({ children }: { children: string }) {
  const tone = /new|live|delivered|approved|paid|verified|complete|in stock/i.test(children)
    ? 'green'
    : /cancel|return|low|overdue|dispute|rejected/i.test(children)
      ? 'red'
      : /review|pending|processing|ship|draft|open/i.test(children)
        ? 'amber' : 'blue';
  return <span className={`va-badge va-badge-${tone}`}>{children}</span>;
}

function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <div className="va-section-title"><h2>{title}</h2>{action && <button type="button" className="va-link" onClick={onAction}>{action}<ChevronRight size={15} /></button>}</div>;
}

function Metric({ label, value, note, icon: Icon, tone = 'blue', onClick }: {
  label: string; value: string; note?: string; icon: typeof Package; tone?: string; onClick?: () => void;
}) {
  const content = <>
    <span className={`va-metric-icon va-icon-${tone}`}><Icon size={18} /></span>
    <span className="va-metric-label">{label}</span>
    <strong>{value}</strong>
    {note && <small>{note}</small>}
  </>;
  return onClick
    ? <button type="button" className="va-metric va-metric-button" aria-label={`${label}: ${value}. View report`} onClick={onClick}>{content}</button>
    : <article className="va-metric">{content}</article>;
}

function RevenueChart({ series, range, onSeriesChange }: {
  series: 'Revenue' | 'Orders';
  range: string;
  onSeriesChange: (series: 'Revenue' | 'Orders') => void;
}) {
  const revenuePath = 'M0,112 C22,105 24,85 51,88 S84,107 103,71 S141,92 160,55 S194,62 216,44 S252,72 271,38 S299,32 320,15';
  const ordersPath = 'M0,118 C24,104 31,113 51,96 S80,82 103,90 S139,72 160,76 S195,46 216,63 S251,37 271,51 S299,22 320,30';
  return <div className="va-chart-block">
    <div className="va-chart">
      <div className="va-chart-y">{series === 'Revenue' ? <><span>₹50k</span><span>₹35k</span><span>₹20k</span><span>₹0</span></> : <><span>50</span><span>35</span><span>20</span><span>0</span></>}</div>
      <svg viewBox="0 0 320 134" preserveAspectRatio="none" role="img" aria-label={`${series} trend for ${range}`}>
        <defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5268e8" stopOpacity=".22" /><stop offset="100%" stopColor="#5268e8" stopOpacity="0" /></linearGradient></defs>
        {series === 'Revenue' && <path d={`${revenuePath} L320,134 L0,134 Z`} fill="url(#revenue-fill)" />}
        <path d={series === 'Revenue' ? revenuePath : ordersPath} fill="none" stroke={series === 'Revenue' ? '#435bd5' : '#e98b36'} strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <circle cx="320" cy={series === 'Revenue' ? '15' : '30'} r="4" fill={series === 'Revenue' ? '#435bd5' : '#e98b36'} />
      </svg>
      <div className="va-chart-x"><span>{range === 'Today' ? '9 AM' : '27 Oct'}</span><span>{range === 'Today' ? '12 PM' : '29 Oct'}</span><span>{range === 'Today' ? '3 PM' : '31 Oct'}</span><span>{range === 'Today' ? 'Today' : '2 Nov'}</span></div>
    </div>
    <div className="va-chart-legend" aria-label="Chart series">
      {(['Revenue', 'Orders'] as const).map((item) => <button type="button" key={item} aria-pressed={series === item} className={series === item ? 'active' : ''} onClick={() => onSeriesChange(item)}><i className={`legend-${item.toLowerCase()}`} />{item}</button>)}
    </div>
  </div>;
}

const moreItems: { title: string; description: string; screen: Screen; icon: typeof Package; tone: string }[] = [
  { title: 'Enquiries & RFQ', description: 'Buyer requests, quotes & follow-ups', screen: 'enquiries', icon: MessageSquare, tone: 'blue' },
  { title: 'Inventory', description: 'Stock levels, warehouses & audit', screen: 'inventory', icon: Boxes, tone: 'mint' },
  { title: 'Analytics & reports', description: 'Sales, products & buyer insights', screen: 'analytics', icon: BarChart3, tone: 'lavender' },
  { title: 'Payments', description: 'Earnings & transaction history', screen: 'payments', icon: Wallet, tone: 'amber' },
  { title: 'Settlements', description: 'Payout schedule & breakdown', screen: 'settlements', icon: Banknote, tone: 'mint' },
  { title: 'Shipping', description: 'Packages, tracking & labels', screen: 'logistics', icon: Truck, tone: 'blue' },
  { title: 'Returns & refunds', description: 'Review buyer requests', screen: 'returns', icon: PackageOpen, tone: 'rose' },
  { title: 'Disputes', description: 'Resolution centre', screen: 'disputes', icon: ShieldCheck, tone: 'lavender' },
  { title: 'Pricing & promotions', description: 'Tier pricing and campaigns', screen: 'pricing', icon: TicketPercent, tone: 'amber' },
  { title: 'Support centre', description: 'Help, tickets & contact', screen: 'support', icon: Headphones, tone: 'blue' },
  { title: 'Business profile', description: 'Store, documents & verification', screen: 'profile', icon: Store, tone: 'mint' },
  { title: 'Settings', description: 'Account, alerts & preferences', screen: 'settings', icon: Settings, tone: 'lavender' },
];

export default function VendorApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [products, setProducts] = useState(initialProducts);
  const [stockMovements, setStockMovements] = useState(initialStockMovements);
  const [orders, setOrders] = useState(initialOrders);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [returns, setReturns] = useState(initialReturns);
  const [disputes, setDisputes] = useState(initialDisputes);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [campaignDraft, setCampaignDraft] = useState<Campaign | null>(null);
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile);
  const [selectedEnquiry, setSelectedEnquiry] = useState<(typeof initialEnquiries)[number]>(initialEnquiries[0]);
  const [selectedQuote, setSelectedQuote] = useState<Quote>(initialQuotes[0]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseLocation>(initialWarehouses[0]);
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement>(initialSettlements[0]);
  const [selectedReturnId, setSelectedReturnId] = useState(initialReturns[0].id);
  const [selectedDisputeId, setSelectedDisputeId] = useState(initialDisputes[0].id);
  const [selectedCampaignId, setSelectedCampaignId] = useState(initialCampaigns[0].id);
  const [reportType, setReportType] = useState<AnalyticsReportType>('Revenue');
  const [reportSearch, setReportSearch] = useState('');
  const [reportStartDate, setReportStartDate] = useState('2026-10-27');
  const [reportEndDate, setReportEndDate] = useState('2026-11-02');
  const [reportStartDraft, setReportStartDraft] = useState('2026-10-27');
  const [reportEndDraft, setReportEndDraft] = useState('2026-11-02');
  const [chartSeries, setChartSeries] = useState<'Revenue' | 'Orders'>('Revenue');
  const [disputeReply, setDisputeReply] = useState('');
  const [returnReviewNote, setReturnReviewNote] = useState('');
  const [returnFilter, setReturnFilter] = useState('All');
  const [disputeFilter, setDisputeFilter] = useState('All');
  const [campaignFilter, setCampaignFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [dialog, setDialog] = useState<'product' | 'stock' | 'quote' | 'support' | 'confirm' | 'delete-product' | ''>('');
  const [dialogDirty, setDialogDirty] = useState(false);
  const [discardPrompt, setDiscardPrompt] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order>(initialOrders[0]);
  const [productForm, setProductForm] = useState({ name: '', sku: '', category: 'Electronics', price: '', stock: '', moq: '1' });
  const [stockChange, setStockChange] = useState({ action: 'Add', quantity: '', reason: '' });
  const [stockTarget, setStockTarget] = useState<Product>(initialProducts[0]);
  const [message, setMessage] = useState('');
  const [range, setRange] = useState('7 Days');
  const [globalSearch, setGlobalSearch] = useState('');
  const [orderSort, setOrderSort] = useState('recent');
  const [otpSent, setOtpSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const scrollPositionsRef = useRef<Partial<Record<Screen, number>>>({});
  const pageDirtyRef = useRef(false);
  const pendingDiscardActionRef = useRef<(() => void) | null>(null);
  const ignoreHistoryPopRef = useRef(false);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'back'>('forward');

  const requestDiscard = useCallback((action: () => void) => {
    pendingDiscardActionRef.current = action;
    setDiscardPrompt(true);
  }, []);

  function navigateTo(next: Screen) {
    pageDirtyRef.current = false;
    if (screenContentRef.current) scrollPositionsRef.current[screen] = screenContentRef.current.scrollTop;
    setNavigationDirection('forward');
    setScreen(next);
    if (typeof window !== 'undefined') window.history.pushState({ screen: next, previous: screen }, '', `#${next}`);
    if (screenConfig[screen].showBottomNav && screenConfig[next].showBottomNav && screen !== next) {
      setQuery('');
      setGlobalSearch('');
      setFilter('All');
    }
  }

  function go(next: Screen, bypassDirtyCheck = false) {
    if (screen !== next && pageDirtyRef.current && !bypassDirtyCheck) {
      requestDiscard(() => navigateTo(next));
      return;
    }
    navigateTo(next);
  }

  function navigateBack(destination: Screen) {
    if (pageDirtyRef.current) {
      requestDiscard(() => navigateBack(destination));
      return;
    }
    pageDirtyRef.current = false;
    const currentEntry = window.history.state as { screen?: Screen; previous?: Screen } | null;
    setNavigationDirection('back');
    if (currentEntry?.screen === screen && currentEntry.previous && currentEntry.previous in screenTitles) {
      window.history.back();
      return;
    }
    window.history.replaceState({ screen: destination }, '', `#${destination}`);
    setScreen(destination);
  }

  useEffect(() => {
    const fromHash = window.location.hash.slice(1) as Screen;
    if (fromHash in screenTitles) setScreen(fromHash);
    const restore = () => {
      if (ignoreHistoryPopRef.current) {
        ignoreHistoryPopRef.current = false;
        return;
      }
      if (pageDirtyRef.current) {
        ignoreHistoryPopRef.current = true;
        window.history.forward();
        requestDiscard(() => window.history.back());
        return;
      }
      pageDirtyRef.current = false;
      const current = window.location.hash.slice(1) as Screen;
      setNavigationDirection('back');
      setScreen(current in screenTitles ? current : 'home');
    };
    window.addEventListener('popstate', restore);
    try {
      const saved = window.localStorage.getItem('sunday-vendor-demo');
      if (saved) {
        const demo = JSON.parse(saved) as {
          products?: Product[];
          stockMovements?: StockMovement[];
          orders?: Order[];
          returns?: ReturnRequest[];
          disputes?: DisputeCase[];
          quotes?: Quote[];
          campaigns?: Campaign[];
          businessProfile?: Partial<BusinessProfile>;
        };
        if (Array.isArray(demo.products)) {
          setProducts(demo.products.map((product) => {
            const seed = initialProducts.find((item) => item.id === product.id);
            return seed ? { ...seed, ...product, image: product.image ?? seed.image } : product;
          }));
        }
        if (Array.isArray(demo.stockMovements)) setStockMovements(demo.stockMovements);
        if (Array.isArray(demo.orders)) setOrders(demo.orders);
        if (Array.isArray(demo.returns)) setReturns(demo.returns);
        if (Array.isArray(demo.disputes)) setDisputes(demo.disputes);
        if (Array.isArray(demo.quotes)) setQuotes(demo.quotes);
        if (Array.isArray(demo.campaigns)) setCampaigns(demo.campaigns);
        if (demo.businessProfile) setBusinessProfile({ ...initialBusinessProfile, ...demo.businessProfile });
      }
    } catch {
      setToast('Saved demo changes could not be loaded. Starting with sample data.');
    }
    setLoaded(true);
    return () => window.removeEventListener('popstate', restore);
  }, [requestDiscard]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem('sunday-vendor-demo', JSON.stringify({
        products, stockMovements, orders, returns, disputes, quotes, campaigns, businessProfile,
      }));
    } catch {
      setToast('Demo changes could not be saved on this device.');
    }
  }, [products, stockMovements, orders, returns, disputes, quotes, campaigns, businessProfile, loaded]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!discardPrompt) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') stayOnForm();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [discardPrompt]);

  useEffect(() => {
    setDialogDirty(false);
  }, [dialog]);

  useEffect(() => {
    if (screenContentRef.current) screenContentRef.current.scrollTop = scrollPositionsRef.current[screen] ?? 0;
  }, [screen]);

  const liveProducts = products.filter((product) => product.status === 'Live');
  const lowStock = products.filter((product) => product.stock > 0 && product.stock <= 8);
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesText = `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || (filter === 'Low stock' ? product.stock > 0 && product.stock <= 8 : filter === 'Out of stock' ? product.stock === 0 : product.status === filter);
    return matchesText && matchesFilter;
  }), [products, query, filter]);
  const visibleOrders = useMemo(() => orders.filter((order) => {
    const matchesText = `${order.id} ${order.buyer} ${order.city}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (filter === 'All' || order.status === filter);
  }), [orders, query, filter]);

  function submitGlobalSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = globalSearch.trim();
    if (!term) {
      setToast('Enter an order, product, SKU or buyer to search.');
      return;
    }

    const normalizedTerm = term.toLowerCase();
    const matchesProduct = products.some((product) =>
      `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(normalizedTerm));
    const matchesOrder = orders.some((order) =>
      `${order.id} ${order.buyer} ${order.city}`.toLowerCase().includes(normalizedTerm));
    const matchesEnquiry = enquiries.some((enquiry) =>
      `${enquiry.buyer} ${enquiry.item} ${enquiry.city}`.toLowerCase().includes(normalizedTerm));
    const destination: Screen = matchesProduct ? 'products' : matchesOrder ? 'orders' : matchesEnquiry ? 'enquiries' : 'products';
    go(destination);
    setQuery(term);
    setGlobalSearch(term);
  }

  function showProduct(product?: Product) {
    setDialogDirty(false);
    setSelectedProduct(product ?? null);
    setProductForm(product
      ? { name: product.name, sku: product.sku, category: product.category, price: String(product.price), stock: String(product.stock), moq: String(product.moq) }
      : { name: '', sku: '', category: 'Electronics', price: '', stock: '', moq: '1' });
    setDialog('product');
  }

  function closeDialog() {
    if (dialogDirty) {
      requestDiscard(() => {
        setDialog('');
        setDialogDirty(false);
      });
      return;
    }
    setDialog('');
    setDialogDirty(false);
  }

  function stayOnForm() {
    pendingDiscardActionRef.current = null;
    setDiscardPrompt(false);
  }

  function discardFormChanges() {
    const action = pendingDiscardActionRef.current;
    pendingDiscardActionRef.current = null;
    pageDirtyRef.current = false;
    setDialogDirty(false);
    setDiscardPrompt(false);
    action?.();
  }

  function requestProductDelete(product: Product) {
    setProductToDelete(product);
    setDialogDirty(false);
    setDialog('delete-product');
  }

  function confirmProductDelete() {
    if (!productToDelete) return;
    setProducts((current) => current.filter((product) => product.id !== productToDelete.id));
    setToast('Product removed from the local demo catalogue.');
    setProductToDelete(null);
    setDialog('');
  }

  function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(productForm.price);
    const stock = Number(productForm.stock);
    const moq = Number(productForm.moq);
    if (!productForm.name.trim() || !productForm.sku.trim() || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0 || !Number.isInteger(moq) || moq < 1) {
      setToast('Enter a product name, SKU, valid price, stock and MOQ.');
      return;
    }
    if (selectedProduct) {
      const updatedProduct = { ...selectedProduct, ...productForm, price, stock, moq };
      setProducts((current) => current.map((item) => item.id === selectedProduct.id ? updatedProduct : item));
      setSelectedProduct(updatedProduct);
      setToast('Product updated in your demo catalogue.');
    } else {
      setProducts((current) => [{ id: `P-${Date.now().toString().slice(-5)}`, ...productForm, price, stock, moq, unit: 'piece', status: 'In review' as const, art: '📦' }, ...current]);
      setToast('Product saved as an in-review demo listing.');
    }
    setDialog('');
  }

  function adjustStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const quantity = Number(stockChange.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0 || !stockChange.reason.trim()) {
      setToast('Enter a positive quantity and a reason for the stock change.');
      return;
    }
    const updatedStock = stockChange.action === 'Set'
      ? quantity
      : stockChange.action === 'Remove'
        ? stockTarget.stock - quantity
        : stockTarget.stock + quantity;
    if (updatedStock < 0) {
      setToast('Quantity to remove is greater than available stock.');
      return;
    }
    setProducts((current) => current.map((item) => {
      if (item.id !== stockTarget.id) return item;
      return { ...item, stock: updatedStock };
    }));
    setStockMovements((current) => [{
      id: `MOV-${Date.now()}`,
      productId: stockTarget.id,
      productName: stockTarget.name,
      change: updatedStock - stockTarget.stock,
      reason: stockChange.reason.trim(),
      date: new Date().toLocaleString('en-IN'),
    }, ...current]);
    setDialog('');
    setToast('Stock updated locally. This demo does not sync to a warehouse.');
  }

  function updateOrder(id: string, status: Order['status']) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
    setSelectedOrder((current) => current.id === id ? { ...current, status } : current);
    setToast(`Order ${id} marked ${status.toLowerCase()} in the demo.`);
  }

  const openStock = (product: Product) => { setDialogDirty(false); setStockTarget(product); setStockChange({ action: 'Add', quantity: '', reason: '' }); setDialog('stock'); };
  const openOrder = (order: Order) => { setSelectedOrder(order); go('order-detail'); };
  const openAnalyticsReport = (type: AnalyticsReportType) => {
    setReportType(type);
    setReportSearch('');
    go('analytics-report');
  };
  function openCampaignEditor(campaign?: Campaign) {
    if (campaign) {
      setSelectedCampaignId(campaign.id);
      setCampaignDraft(null);
    } else {
      const draft: Campaign = {
        id: `CMP-${Date.now().toString().slice(-5)}`,
        name: '',
        offer: '',
        status: 'Draft',
        startDate: '',
        endDate: '',
        audience: 'All wholesale buyers',
      };
      setCampaignDraft(draft);
      setSelectedCampaignId(draft.id);
    }
    go('campaign-editor');
  }
  const sendMessage = () => {
    if (!message.trim()) { setToast('Write a message before sending.'); return; }
    setMessage('');
    setToast('Message added to this local demo conversation.');
  };

  const topNavigation = <VendorHeader
    query={globalSearch}
    onQueryChange={setGlobalSearch}
    onSearch={submitGlobalSearch}
    onHome={() => go('home')}
    onSaved={() => setToast('Saved products opened in this demo.')}
    onNotifications={() => go('notifications')}
    onProfile={() => go('profile')}
  />;

  function BackButton({ destination, label }: { destination: Screen; label?: string }) {
    const currentEntry = typeof window !== 'undefined'
      ? window.history.state as { screen?: Screen; previous?: Screen } | null
      : null;
    const previous = currentEntry?.screen === screen && currentEntry.previous && currentEntry.previous in screenTitles
      ? currentEntry.previous
      : destination;
    return (
      <button
        type="button"
        className="va-back-button"
        aria-label={label ?? `Back to ${screenTitles[previous]}`}
        onClick={() => navigateBack(previous)}
      >
        <ArrowLeft size={16} />
        <span>{label ?? `Back to ${screenTitles[previous]}`}</span>
      </button>
    );
  }

  function HomeScreen() {
    return <div className="va-page va-home">
      <div className="va-welcome">
        <div><span className="va-eyebrow">THURSDAY, OCTOBER 30</span><h1>Good morning,<br /><em>{businessProfile.storeName}.</em></h1></div>
        <span className="va-verified"><BadgeCheck size={15} /> Verified vendor</span>
      </div>
      <div className="va-banner">
        <div className="va-banner-copy"><span className="va-eyebrow">YOUR BUSINESS AT A GLANCE</span><h2>More buyers.<br />Better business.</h2><p>Your store is visible to wholesale buyers across India.</p><button className="va-white-button" type="button" onClick={() => go('profile')}>View storefront <ArrowRight size={15} /></button></div>
        <div className="va-banner-art" aria-hidden="true"><div className="va-orbit va-orbit-one" /><div className="va-orbit va-orbit-two" /><span>↗</span><div className="va-art-card"><Store size={25} /><small>YOUR STORE</small><strong>Sunday Malls</strong><i>● VERIFIED</i></div></div>
        <span className="va-banner-dots"><i /><i className="on" /><i /></span>
      </div>
      <div className="va-revenue-card">
        <div className="va-revenue-heading"><div><span className="va-eyebrow">GROSS REVENUE</span><strong>₹2,84,650</strong></div><span className="va-trend"><TrendingUp size={14} /> 12.8%</span></div>
        <div className="va-revenue-sub"><span>vs. last 7 days</span><button type="button" onClick={() => go('analytics')}>Details <ArrowUpRight size={14} /></button></div>
        <RevenueChart series={chartSeries} range={range} onSeriesChange={setChartSeries} />
      </div>
      <div className="va-metrics-grid">
        <Metric label="Orders" value={`${orders.length + 42}`} note="8 need attention" icon={PackageCheck} tone="blue" />
        <Metric label="Live products" value={`${liveProducts.length}`} note={`${lowStock.length} running low`} icon={Layers3} tone="mint" />
        <Metric label="Enquiries" value="18" note="3 new today" icon={MessageCircle} tone="amber" />
      </div>
      <div className="va-quick-row">
        <button type="button" onClick={() => showProduct()}><span><Plus size={19} /></span><b>Add product</b></button>
        <button type="button" onClick={() => go('orders')}><span><ClipboardList size={18} /></span><b>Process orders</b></button>
        <button type="button" onClick={() => go('quotation')}><span><FileText size={18} /></span><b>Send quote</b></button>
        <button type="button" onClick={() => go('analytics')}><span><BarChart3 size={18} /></span><b>View reports</b></button>
      </div>
      {lowStock.length > 0 && <button type="button" className="va-alert-strip" onClick={() => go('inventory')}><span><Zap size={17} /></span><b>{lowStock.length} products need a restock</b><ChevronRight size={17} /></button>}
      <SectionTitle title="Needs your attention" action="View orders" onAction={() => go('orders')} />
      {orders.filter((order) => order.status === 'New').slice(0, 1).map((order) => <button type="button" key={order.id} className="va-attention-card" onClick={() => openOrder(order)}><span className="va-attention-icon"><PackageCheck size={19} /></span><span><b>New order received</b><small>{order.id} · {order.buyer}</small></span><strong>{formatCurrency(order.total)}</strong><ChevronRight size={16} /></button>)}
      <SectionTitle title="Recent activity" />
      <div className="va-activity-list"><span className="va-activity-dot green" /><div><b>New order · ORD-72841</b><small>Aarav Retail Co. placed an order · 10:42 AM</small></div><span className="va-activity-dot blue" /><div><b>Enquiry received</b><small>Star Bazaar asked about 120 ceiling fans · 10:26 AM</small></div><span className="va-activity-dot amber" /><div><b>Settlement processed</b><small>₹24,850 payout sent to your bank · Yesterday</small></div></div>
      <div className="va-demo-note"><Sparkles size={16} /><span><b>Demo workspace</b><small>All figures and business actions are simulated locally.</small></span></div>
    </div>;
  }

  function ProductsScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="CATALOGUE" title="Your products" detail={`${products.length} listings · ${liveProducts.length} live`} action={<button type="button" className="va-primary-button" onClick={() => showProduct()}><Plus size={16} /> Add product</button>} />
      <div className="va-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, SKU or category" /><button type="button" aria-label="Filter products" onClick={() => setFilter(filter === 'All' ? 'Low stock' : 'All')}><SlidersHorizontal size={17} /></button></div>
      <FilterChips items={['All', 'Live', 'In review', 'Low stock', 'Out of stock']} value={filter} onChange={setFilter} />
      <div className="va-product-summary"><span><strong>{products.length}</strong><small>Total listings</small></span><span><strong>{liveProducts.length}</strong><small>Live</small></span><span><strong>{products.filter((item) => item.status === 'In review').length}</strong><small>In review</small></span></div>
      {visibleProducts.length === 0 ? <EmptyState title="No products found" detail="Try another search or filter." /> :
        <div className="va-product-grid">{visibleProducts.map((product, index) => <article className="va-product-card" key={product.id}>
          <div className={`va-product-art art-${product.category === 'Electronics' ? 'blue' : 'peach'}`}>{product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 45vw, 220px" loading={index === 0 ? 'eager' : 'lazy'} /> : <span>{product.art}</span>}<StatusBadge>{product.status}</StatusBadge><button type="button" aria-label={`Edit ${product.name}`} onClick={() => showProduct(product)}><Pencil size={14} /></button></div>
          <div className="va-product-info"><span className="va-product-sku">{product.sku}</span><button type="button" className="va-product-name" onClick={() => { setSelectedProduct(product); go('product-detail'); }}>{product.name}</button><span className="va-product-category">{product.category} · MOQ {product.moq}</span><div className="va-product-price-row"><strong>{formatCurrency(product.price)}</strong><span className={product.stock <= 8 ? 'is-low' : ''}>{product.stock} units</span></div><div className="va-product-actions"><button type="button" onClick={() => openStock(product)}>Update stock</button><button type="button" aria-label={`Delete ${product.name}`} onClick={() => requestProductDelete(product)}><Trash2 size={15} /></button></div></div>
        </article>)}</div>}
      <button type="button" className="va-upload-card" onClick={() => setToast('Bulk upload template prepared in this demo.')}><Upload size={19} /><span><b>Bulk upload catalogue</b><small>Import a spreadsheet to add multiple products</small></span><ChevronRight size={17} /></button>
    </div>;
  }

  function OrdersScreen() {
    const statuses = ['All', 'New', 'Processing', 'Ready to ship', 'Shipped', 'Delivered', 'Cancelled'];
    const counts = { New: orders.filter((order) => order.status === 'New').length, Processing: orders.filter((order) => order.status === 'Processing').length, Pending: orders.filter((order) => ['New', 'Processing', 'Ready to ship'].includes(order.status)).length };
    const sortedOrders = [...visibleOrders].sort((a, b) => orderSort === 'highest'
      ? b.total - a.total
      : orderSort === 'lowest'
        ? a.total - b.total
        : initialOrders.findIndex((order) => order.id === a.id) - initialOrders.findIndex((order) => order.id === b.id));
    return <div className="va-page">
      <PageIntro eyebrow="FULFILMENT" title="Orders" detail="Review, pack and fulfil buyer orders." action={<button type="button" className="va-icon-button" aria-label="Filter orders" onClick={() => setFilter(filter === 'All' ? 'New' : 'All')}><Filter size={17} /></button>} />
      <div className="va-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order ID or buyer" /><ListFilter size={17} /></div>
      <div className="va-order-stats"><span><Package size={17} /><b>{counts.New}</b><small>New</small></span><span><Clock3 size={17} /><b>{counts.Pending}</b><small>To fulfil</small></span><span><IndianRupee size={17} /><b>₹42.8k</b><small>Pending</small></span></div>
      <FilterChips items={statuses} value={filter} onChange={setFilter} />
      <label className="va-sort-control">Sort by<select value={orderSort} onChange={(event) => setOrderSort(event.target.value)}><option value="recent">Newest first</option><option value="highest">Highest value</option><option value="lowest">Lowest value</option></select></label>
      <div className="va-order-list">{sortedOrders.map((order) => <OrderCard key={order.id} order={order} onOpen={() => openOrder(order)} />)}</div>
      {visibleOrders.length === 0 && <EmptyState title="No matching orders" detail="New orders will appear here." />}
      <p className="va-footnote">Order activity shown here is sample data for the vendor demo.</p>
    </div>;
  }

  function EnquiriesScreen() {
    const filtered = enquiries.filter((enquiry) => {
      const matchesText = `${enquiry.buyer} ${enquiry.item} ${enquiry.city}`.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'All' || (filter === 'New' ? enquiry.unread : !enquiry.unread);
      return matchesText && matchesFilter;
    });
    return <div className="va-page">
      <PageIntro eyebrow="BUYER RELATIONSHIPS" title="Enquiries & RFQ" detail="Respond quickly to win more bulk orders." action={<button type="button" className="va-primary-button" onClick={() => go('quotation')}><Plus size={16} /> Create quote</button>} />
      <div className="va-enquiry-kpis"><div><strong>18</strong><small>Open enquiries</small></div><div><strong>6</strong><small>Quotes to follow up</small></div><div><strong>32%</strong><small>Conversion</small></div></div>
      <div className="va-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search buyer or requirement" /><MessageSquare size={17} /></div>
      <FilterChips items={['All', 'New', 'Quoted', 'Following up']} value={filter} onChange={setFilter} />
      <SectionTitle title="Buyer enquiries" action="Quotation history" onAction={() => go('quotation')} />
      <div className="va-enquiry-list">{filtered.map((item, index) => <article className="va-enquiry-card" key={item.id}>
        <button type="button" className="va-enquiry-main" onClick={() => { setEnquiries((current) => current.map((entry) => entry.id === item.id ? { ...entry, unread: false } : entry)); setSelectedEnquiry(item); go('rfq-detail'); }}>
          <span className={`va-buyer-avatar buyer-${index}`}>{item.buyer.slice(0, 1)}</span><span className="va-enquiry-copy"><span><b>{item.buyer}</b>{item.unread && <i />}</span><small>{item.item}</small><small><MapPin size={12} /> {item.city} · {item.when}</small></span><ChevronRight size={17} />
          </button>
        <div className="va-enquiry-footer"><span>Indicative value <b>{item.amount}</b></span><button type="button" onClick={() => { setSelectedEnquiry(item); go('quotation'); }}>Reply with quote <ArrowRight size={14} /></button></div>
        </article>)}</div>
      <div className="va-tip-card"><Sparkles size={17} /><div><b>Respond within 2 hours</b><small>Vendors who reply quickly are more likely to convert an enquiry.</small></div></div>
    </div>;
  }

  function MoreScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="SUNDAY MALLS VENDOR" title="Your business" detail="Everything you need to run your store." />
      <div className="va-store-card"><span className="va-store-emblem"><Store size={22} /></span><div><b>{businessProfile.storeName}</b><small><BadgeCheck size={13} /> Verified vendor · {businessProfile.city}</small></div><button type="button" aria-label="Open profile" onClick={() => go('profile')}><ChevronRight size={18} /></button></div>
      <div className="va-more-grid">{moreItems.map(({ title, description, screen: target, icon: Icon, tone }) => <button type="button" key={title} className="va-more-card" onClick={() => go(target)}><span className={`va-more-icon tone-${tone}`}><Icon size={20} /></span><b>{title}</b><small>{description}</small><span className="va-more-arrow"><ChevronRight size={16} /></span></button>)}</div>
      <div className="va-more-footer"><span>Sunday Malls Vendor · Demo version</span><button type="button" onClick={() => go('help')}>Help & support</button></div>
    </div>;
  }

  function InventoryScreen() {
    const stockItems = visibleProducts;
    return <div className="va-page">
      <PageIntro eyebrow="STOCK CONTROL" title="Inventory" detail="On-hand quantities across your catalogue." action={<button type="button" className="va-icon-button" aria-label="Open stock history" onClick={() => go('stock-history')}><Clock3 size={17} /></button>} />
      <div className="va-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product or SKU" /><Warehouse size={17} /></div>
      <div className="va-inventory-summary"><div><Boxes size={17} /><b>{products.reduce((sum, item) => sum + item.stock, 0)}</b><small>UNITS ON HAND</small></div><div><Warehouse size={17} /><b>02</b><small>WAREHOUSES</small></div><div><TrendingDown size={17} /><b className="red-text">{lowStock.length}</b><small>LOW STOCK</small></div><div><IndianRupee size={17} /><b>₹3.0L</b><small>STOCK VALUE</small></div></div>
      <div className="va-inline-heading"><span>WAREHOUSE</span><button type="button" onClick={() => go('warehouses')}>Manage <ChevronRight size={14} /></button></div>
      <button type="button" className="va-warehouse-select" onClick={() => go('warehouses')}><span><MapPin size={16} /> Gadgetopia Technologies</span><small>Pune · Primary <ChevronDown size={15} /></small></button>
      <FilterChips items={['All', 'Low stock', 'Out of stock']} value={filter} onChange={setFilter} />
      <div className="va-stock-list">{stockItems.map((product) => <article key={product.id} className="va-stock-card"><div className="va-stock-head"><span className="va-product-emoji">{product.art}</span><span><b>{product.name}</b><small>{product.sku}</small></span><strong className={product.stock <= 8 ? 'is-low' : ''}>{product.stock}<small> units</small></strong></div><div className="va-stock-foot"><StatusBadge>{product.stock === 0 ? 'Out of stock' : product.stock <= 8 ? 'Low stock' : 'In stock'}</StatusBadge><button type="button" onClick={() => openStock(product)}>Update stock <ChevronRight size={14} /></button></div></article>)}</div>
      <div className="va-info-card"><CircleHelp size={17} /><span>Low-stock reminders are sample insights. Stock changes stay on this device.</span></div>
    </div>;
  }

  function AnalyticsScreen() {
    function applyDateFilter(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!reportStartDraft || !reportEndDraft || reportStartDraft > reportEndDraft) {
        setToast('Choose a valid date range with the start date before the end date.');
        return;
      }
      setReportStartDate(reportStartDraft);
      setReportEndDate(reportEndDraft);
      setRange('Custom');
      setToast('Analytics date range updated for the local demo.');
    }

    function selectRange(nextRange: 'Today' | '7 Days' | '30 Days') {
      const endDate = '2026-11-02';
      const startDate = nextRange === 'Today' ? endDate : nextRange === '7 Days' ? '2026-10-27' : '2026-10-04';
      setRange(nextRange);
      setReportStartDate(startDate);
      setReportEndDate(endDate);
      setReportStartDraft(startDate);
      setReportEndDraft(endDate);
    }

    return <div className="va-page">
      <PageIntro eyebrow="PERFORMANCE DASHBOARD" title="Store analytics" detail="Understand what is growing your business." />
      <div className="va-segmented" role="group" aria-label="Analytics reporting period">{(['Today', '7 Days', '30 Days'] as const).map((item) => <button type="button" key={item} aria-pressed={range === item} className={range === item ? 'active' : ''} onClick={() => selectRange(item)}>{item}</button>)}</div>
      <SectionTitle title="Sales overview" />
      <div className="va-metrics-grid three">
        <Metric label="Revenue" value={range === 'Today' ? '₹18.4k' : range === '7 Days' ? '₹2.8L' : '₹8.2L'} note={range === 'Custom' ? 'Selected dates' : range} icon={IndianRupee} tone="mint" onClick={() => openAnalyticsReport('Revenue')} />
        <Metric label="Orders" value={range === 'Today' ? '7' : range === '7 Days' ? '48' : '186'} note="↑ 12.8%" icon={PackageCheck} tone="blue" onClick={() => openAnalyticsReport('Orders')} />
        <Metric label="Avg. order" value="₹5.9k" note="vs prior period" icon={TrendingUp} tone="amber" onClick={() => openAnalyticsReport('Revenue')} />
      </div>
      <section className="va-panel"><div className="va-panel-heading"><h2>{chartSeries} trend</h2><button type="button" aria-label={`View ${chartSeries.toLowerCase()} report`} onClick={() => openAnalyticsReport(chartSeries)}><ChevronRight size={17} /></button></div><RevenueChart series={chartSeries} range={range} onSeriesChange={setChartSeries} /></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Top products</h2><button type="button" aria-label="View top products report" onClick={() => openAnalyticsReport('Top products')}><ChevronRight size={17} /></button></div>{products.slice(0, 4).map((product, index) => <button type="button" className="va-rank-row va-rank-row-button" key={product.id} onClick={() => openAnalyticsReport('Top products')}><span>{index + 1}</span>{product.image ? <Image className="va-rank-image" src={product.image} alt="" width={34} height={34} /> : <span className="va-rank-image-fallback">{product.art}</span>}<span><b>{product.name}</b><small>{[32, 24, 18, 11][index]} units sold</small></span><strong>{formatCurrency(product.price * [32, 24, 18, 11][index])}</strong></button>)}</section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Sales by city</h2><button type="button" aria-label="View sales by city report" onClick={() => openAnalyticsReport('Sales by city')}><MapPin size={16} /></button></div>{[['Pune', 36], ['Mumbai', 28], ['Bengaluru', 19], ['Nashik', 12]].map(([city, value]) => <button type="button" className="va-bar-row va-bar-row-button" key={city} onClick={() => { openAnalyticsReport('Sales by city'); }}><span>{city}</span><span><i style={{ width: `${value}%` }} /></span><b>{value}%</b></button>)}</section>
      <form className="va-date-filter" onSubmit={applyDateFilter}>
        <label>From<input type="date" value={reportStartDraft} onChange={(event) => setReportStartDraft(event.target.value)} /></label>
        <label>To<input type="date" value={reportEndDraft} onChange={(event) => setReportEndDraft(event.target.value)} /></label>
        <button type="submit" className="va-secondary-button"><CalendarDays size={15} /> Apply dates</button>
      </form>
      <div className="va-report-actions"><button type="button" onClick={() => openAnalyticsReport('Revenue')}><Download size={16} /> View & export report</button></div>
      <div className="va-info-card"><CircleHelp size={17} /><span>Analytics, charts and export data are simulated sample metrics; no sales service is connected.</span></div>
    </div>;
  }

  function AnalyticsReportScreen() {
    const rows = analyticsRows[reportType].filter((row) =>
      row.date >= reportStartDate
      && row.date <= reportEndDate
      && `${row.id} ${row.label} ${row.detail}`.toLowerCase().includes(reportSearch.trim().toLowerCase()));
    const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    function openReportRow(id: string) {
      if (reportType === 'Revenue' || reportType === 'Orders') {
        const order = orders.find((item) => item.id === id);
        if (order) {
          setSelectedOrder(order);
          go('order-detail');
        }
        return;
      }
      if (reportType === 'Top products') {
        const product = products.find((item) => item.id === id);
        if (product) {
          setSelectedProduct(product);
          go('product-detail');
        }
        return;
      }
      setReportType('Orders');
      setReportSearch(id);
    }

    return <div className="va-page">
      <PageIntro eyebrow="SIMULATED SALES REPORT" title={reportType} detail={`${formatDate(reportStartDate)} – ${formatDate(reportEndDate)} · Local demo data`} />
      <label className="va-search"><Search size={16} /><input type="search" aria-label={`Filter ${reportType} report`} value={reportSearch} onChange={(event) => setReportSearch(event.target.value)} placeholder="Filter report rows" /></label>
      <section className="va-panel">
        <div className="va-panel-heading"><h2>{rows.length} {rows.length === 1 ? 'result' : 'results'}</h2><span>Sample data</span></div>
        {rows.length === 0
          ? <EmptyState title="No matching report rows" detail="Try a different search term or date range." />
          : rows.map((row) => <button type="button" className="va-report-row" key={row.id} onClick={() => openReportRow(row.id)}>
            <span><b>{row.label}</b><small>{row.detail} · {formatDate(row.date)}</small></span>
            <strong>{reportType === 'Sales by city' ? `${row.value}%` : formatCurrency(row.value)}</strong>
            <ChevronRight size={15} />
          </button>)}
      </section>
      <div className="va-info-card"><Download size={16} /><span>Export is simulated. This report is not sent to a server or accounting system.</span></div>
    </div>;
  }

  function PaymentsScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="EARNINGS" title="Payments" detail="A clear view of your vendor earnings." />
      <div className="va-balance-card"><span className="va-eyebrow">AVAILABLE BALANCE</span><strong>₹84,250<small>.00</small></strong><div><span><CheckCircle2 size={14} /> Demo account</span><button type="button" onClick={() => go('settlements')}>View settlements <ArrowRight size={14} /></button></div></div>
      <div className="va-metrics-grid"><Metric label="Pending" value="₹32,480" note="Next payout · 2 Nov" icon={Clock3} tone="amber" /><Metric label="Paid this month" value="₹1.8L" note="6 transactions" icon={CheckCircle2} tone="mint" /></div>
      <div className="va-info-card"><LockKeyhole size={17} /><span>Payment figures are simulated. No money is moved or payment provider connected.</span></div>
      <SectionTitle title="Recent transactions" action="All activity" onAction={() => go('settlements')} />
      <div className="va-transaction-list">{[['ORD-72817', 'Order payout · Aarav Retail Co.', '+₹18,740', 'Today'], ['ORD-72792', 'Order payout · Citywide Distributors', '+₹34,280', '29 Oct'], ['FEE-2091', 'Marketplace service fee', '−₹1,250', '28 Oct'], ['ORD-72761', 'Order payout · Kumar Trading House', '+₹7,820', '27 Oct']].map(([id, label, amount, date]) => <div className="va-transaction" key={id}><span className="va-transaction-icon"><IndianRupee size={17} /></span><span><b>{label}</b><small>{id} · {date}</small></span><strong className={amount.startsWith('−') ? '' : 'green-text'}>{amount}</strong></div>)}</div>
      <button type="button" className="va-outline-wide" onClick={() => go('profile')}><Building2 size={16} /> Manage bank details</button>
    </div>;
  }

  function SettlementsScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="PAYOUTS" title="Settlements" detail="Settlement schedule and demo transaction breakdown." />
      <section className="va-panel va-next-payout"><div className="va-next-icon"><Banknote size={22} /></div><div><span className="va-eyebrow">NEXT ESTIMATED SETTLEMENT</span><strong>₹32,480</strong><small>Expected 2 November · HDFC •••• 2841</small></div><StatusBadge>Pending</StatusBadge></section>
      <SectionTitle title="Settlement history" />
      {initialSettlements.map((settlement) => <article className="va-settlement-row" key={settlement.id}><span className="va-settlement-icon"><Banknote size={17} /></span><span><b>{settlement.total}</b><small>{settlement.date} · {settlement.id}</small></span><span><StatusBadge>{settlement.status}</StatusBadge><button type="button" onClick={() => { setSelectedSettlement(settlement); go('settlement-detail'); }}>Breakdown <ChevronRight size={13} /></button></span></article>)}
      <div className="va-info-card"><CircleHelp size={17} /><span>Amounts and payout dates are illustrative only; no actual settlement is initiated.</span></div>
    </div>;
  }

  function SettlementDetailScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="SETTLEMENT BREAKDOWN" title={selectedSettlement.id} detail={`${selectedSettlement.date} · ${selectedSettlement.status}`} action={<StatusBadge>{selectedSettlement.status}</StatusBadge>} />
      <div className="va-balance-card"><span className="va-eyebrow">PAYOUT AMOUNT</span><strong>{selectedSettlement.total}</strong><div><span><CheckCircle2 size={14} /> Demo settlement</span><span>HDFC · •••• 2841</span></div></div>
      <section className="va-panel"><div className="va-panel-heading"><h2>Breakdown</h2><span>Illustrative</span></div><div className="va-tier-line"><span>Order proceeds</span><b>{selectedSettlement.total}</b></div><div className="va-tier-line"><span>Marketplace fee</span><b>Included in demo total</b></div><div className="va-tier-line"><span>Settlement status</span><b>{selectedSettlement.status}</b></div></section>
      <div className="va-info-card"><LockKeyhole size={17} /><span>This payout breakdown is sample data. No funds or bank details are accessed.</span></div>
    </div>;
  }

  function LogisticsScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="FULFILMENT" title="Shipping & logistics" detail="Prepare labels and follow shipments in the demo." />
      <div className="va-shipment-overview"><div><strong>4</strong><small>To dispatch</small></div><div><strong>8</strong><small>In transit</small></div><div><strong>26</strong><small>Delivered</small></div></div>
      <FilterChips items={['All', 'Ready to ship', 'Shipped', 'Delivered']} value={filter} onChange={setFilter} />
      {orders.filter((order) => filter === 'All' || order.status === filter).map((order) => <article className="va-shipment-card" key={order.id}><div className="va-shipment-head"><span><b>{order.id}</b><small>{order.buyer}</small></span><StatusBadge>{order.status}</StatusBadge></div><div className="va-route"><span><i /> Pune · Dispatch</span><div /><span><MapPin size={13} /> {order.city}</span></div><div className="va-shipment-foot"><small>Sample tracking · SMX-{order.id.slice(-5)}</small><button type="button" onClick={() => { setSelectedOrder(order); go('shipment-detail'); }}>Label / tracking <ChevronRight size={14} /></button></div></article>)}
      <div className="va-info-card"><Truck size={17} /><span>Shipment creation and carrier tracking are mock interactions only.</span></div>
    </div>;
  }

  function ShipmentDetailScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="SHIPMENT TRACKING" title={selectedOrder.id} detail={`Sample tracking · SMX-${selectedOrder.id.slice(-5)}`} action={<StatusBadge>{selectedOrder.status}</StatusBadge>} />
      <section className="va-panel"><div className="va-panel-heading"><h2>Delivery route</h2><Truck size={17} /></div><div className="va-route"><span><i /> Pune · Dispatch</span><div /><span><MapPin size={13} /> {selectedOrder.city}</span></div><div className="va-tier-line"><span>Buyer</span><b>{selectedOrder.buyer}</b></div><div className="va-tier-line"><span>Order value</span><b>{formatCurrency(selectedOrder.total)}</b></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Shipment activity</h2><Clock3 size={17} /></div><div className="va-timeline"><div className="va-timeline-row done"><i /><span><b>Order prepared</b><small>Local demo shipment created</small></span></div><div className={`va-timeline-row ${['Shipped', 'Delivered'].includes(selectedOrder.status) ? 'done' : ''}`}><i /><span><b>Handed to carrier</b><small>Carrier updates are not connected</small></span></div><div className={`va-timeline-row ${selectedOrder.status === 'Delivered' ? 'done' : ''}`}><i /><span><b>Delivered</b><small>Final status is simulated</small></span></div></div></section>
      <button type="button" className="va-outline-wide" onClick={() => setToast('A sample shipping label is available in demo mode only.')}> <Download size={16} /> Preview sample label</button>
      <div className="va-info-card"><Truck size={17} /><span>Tracking and label actions do not contact a carrier or create a shipment.</span></div>
    </div>;
  }

  function ReturnsScreen() {
    const visibleReturns = returns.filter((item) => returnFilter === 'All' || item.status === returnFilter);
    return <div className="va-page">
      <PageIntro eyebrow="AFTER-SALES · DEMO CASES" title="Returns & refunds" detail="Review local sample requests; no courier or refund service is connected." />
      <FilterChips items={['All', 'Pending review', 'Approved', 'Rejected', 'Refunded']} value={returnFilter} onChange={setReturnFilter} />
      {visibleReturns.length === 0
        ? <EmptyState title="No return requests match" detail="Choose another status filter to review sample cases." />
        : visibleReturns.map(({ id, buyer, product, status, amount }) => <article className="va-return-card" key={id}><div className="va-return-top"><span><span className="va-eyebrow">RETURN REQUEST</span><b>{id}</b></span><StatusBadge>{status}</StatusBadge></div><b>{buyer}</b><small>{product}</small><div className="va-return-bottom"><strong>{amount}</strong><button type="button" onClick={() => { setSelectedReturnId(id); setReturnReviewNote(''); go('return-detail'); }}>Review request <ChevronRight size={14} /></button></div></article>)}
      <div className="va-info-card"><ShieldCheck size={17} /><span>Approvals, refunds and return labels are not connected to any real service.</span></div>
    </div>;
  }

  function ReturnDetailScreen() {
    const returnCase = returns.find((item) => item.id === selectedReturnId) ?? initialReturns[0];
    const completed = returnCase.status !== 'Pending review';
    const timeline = [
      { title: 'Request received', detail: returnCase.requestedOn, done: true },
      { title: 'Vendor review', detail: completed ? 'Reviewed in the local demo' : 'Awaiting your review', done: completed },
      { title: 'Return outcome', detail: returnCase.status === 'Refunded' ? 'Sample case marked complete' : returnCase.status, done: returnCase.status === 'Refunded' || returnCase.status === 'Rejected' },
    ];

    function updateReturn(status: ReturnRequest['status']) {
      const note = returnReviewNote.trim();
      if (note.length < 5) {
        setToast('Add a short review note (at least 5 characters) before updating this case.');
        return;
      }
      const confirmation = status === 'Refunded'
        ? `Mark ${returnCase.id} as refunded in this local demo? No money will be moved.`
        : `${status === 'Approved' ? 'Approve' : 'Decline'} return ${returnCase.id} in this local demo?`;
      if (!window.confirm(confirmation)) return;
      setReturns((current) => current.map((item) => item.id === returnCase.id
        ? { ...item, status, note: `${item.note} Review note: ${note}` }
        : item));
      setReturnReviewNote('');
      pageDirtyRef.current = false;
      setToast(`${returnCase.id} updated locally. No refund, pickup, or courier action was triggered.`);
    }

    return <div className="va-page">
      <PageIntro eyebrow="RETURN REQUEST · LOCAL DEMO" title={returnCase.id} detail={`Requested ${returnCase.requestedOn} · ${returnCase.orderId}`} action={<StatusBadge>{returnCase.status}</StatusBadge>} />
      <section className="va-panel"><div className="va-panel-heading"><h2>Request summary</h2><PackageOpen size={17} /></div><div className="va-tier-line"><span>Buyer</span><b>{returnCase.buyer}</b></div><div className="va-tier-line"><span>Order reference</span><b>{returnCase.orderId}</b></div><div className="va-tier-line"><span>Product</span><b>{returnCase.product}</b></div><div className="va-tier-line"><span>Request amount</span><b>{returnCase.amount}</b></div><div className="va-tier-line"><span>Reason</span><b>{returnCase.reason}</b></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Buyer notes</h2><MessageSquare size={16} /></div><p className="va-case-note">{returnCase.note}</p></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Case timeline</h2><Clock3 size={16} /></div><div className="va-timeline">{timeline.map((item) => <div className={`va-timeline-row ${item.done ? 'done' : ''}`} key={item.title}><i /><span><b>{item.title}</b><small>{item.detail}</small></span></div>)}</div></section>
      {returnCase.status === 'Pending review' && <form className="va-form" onSubmit={(event) => { event.preventDefault(); updateReturn('Approved'); }}>
        <label>Review note<textarea rows={3} value={returnReviewNote} onChange={(event) => setReturnReviewNote(event.target.value)} placeholder="Record the reason for your decision…" /></label>
        <div className="va-detail-actions"><button type="button" className="va-secondary-button" onClick={() => updateReturn('Rejected')}>Decline request</button><button type="submit" className="va-primary-button">Approve return</button></div>
      </form>}
      {returnCase.status === 'Approved' && <form className="va-form" onSubmit={(event) => { event.preventDefault(); updateReturn('Refunded'); }}><label>Completion note<textarea rows={2} value={returnReviewNote} onChange={(event) => setReturnReviewNote(event.target.value)} placeholder="Add a note before closing this sample case…" /></label><button type="submit" className="va-secondary-button">Mark sample refund complete</button></form>}
      <div className="va-info-card"><ShieldCheck size={17} /><span>Case updates are saved locally. Approval does not arrange a return, and marking refunded does not move funds.</span></div>
    </div>;
  }

  function DisputesScreen() {
    const visibleDisputes = disputes.filter((item) => disputeFilter === 'All' || item.status === disputeFilter);
    const activeCount = disputes.filter((item) => item.status !== 'Resolved').length;
    return <div className="va-page">
      <PageIntro eyebrow="RESOLUTION CENTRE · DEMO" title="Disputes" detail="Track sample buyer concerns and local resolution progress." />
      <div className="va-dispute-banner"><ShieldCheck size={20} /><span><b>{activeCount ? `${activeCount} case needs attention` : 'All caught up'}</b><small>{activeCount ? 'Open a case to review details and add a local update.' : 'There are no open sample cases.'}</small></span><StatusBadge>{activeCount ? 'Open' : 'Clear'}</StatusBadge></div>
      <FilterChips items={['All', 'Open', 'Under review', 'Resolved']} value={disputeFilter} onChange={setDisputeFilter} />
      <SectionTitle title="Recent cases" />
      {visibleDisputes.length === 0
        ? <EmptyState title="No dispute cases match" detail="Choose another status filter to view the sample case history." />
        : visibleDisputes.map((item) => <article className="va-ticket-card" key={item.id}><div><span className="va-ticket-icon"><ShieldCheck size={17} /></span><span><b>{item.subject}</b><small>{item.id} · {item.openedOn}</small></span><StatusBadge>{item.status}</StatusBadge></div><button type="button" onClick={() => { setSelectedDisputeId(item.id); setDisputeReply(''); go('dispute-detail'); }}>View case details <ChevronRight size={14} /></button></article>)}
      <button type="button" className="va-outline-wide" onClick={() => { setDialog('support'); }}>Contact resolution support</button>
      <div className="va-info-card"><CircleHelp size={17} /><span>Dispute communication and resolution are local demo interactions; no case is sent to a marketplace or support service.</span></div>
    </div>;
  }

  function DisputeDetailScreen() {
    const dispute = disputes.find((item) => item.id === selectedDisputeId) ?? initialDisputes[0];

    function addDisputeNote(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const message = disputeReply.trim();
      if (message.length < 10) {
        setToast('Enter at least 10 characters so the case update is useful.');
        return;
      }
      if (!window.confirm(`Add this note to ${dispute.id} in the local demo? It will not be sent to the buyer.`)) return;
      setDisputes((current) => current.map((item) => item.id === dispute.id
        ? { ...item, status: item.status === 'Open' ? 'Under review' : item.status, notes: [...item.notes, { date: new Date().toLocaleString('en-IN'), author: 'Vendor', message }] }
        : item));
      setDisputeReply('');
      pageDirtyRef.current = false;
      setToast('Case note added locally. No message was sent to the buyer.');
    }

    function resolveDispute() {
      if (disputeReply.trim()) {
        setToast('Save or clear the draft case note before resolving this dispute.');
        return;
      }
      if (!window.confirm(`Mark ${dispute.id} resolved in this local demo? No external dispute service will be updated.`)) return;
      setDisputes((current) => current.map((item) => item.id === dispute.id ? { ...item, status: 'Resolved' } : item));
      pageDirtyRef.current = false;
      setDisputeReply('');
      setToast(`${dispute.id} marked resolved locally.`);
    }

    return <div className="va-page">
      <PageIntro eyebrow="DISPUTE CASE · LOCAL DEMO" title={dispute.id} detail={`Opened ${dispute.openedOn} · ${dispute.orderId}`} action={<StatusBadge>{dispute.status}</StatusBadge>} />
      <section className="va-panel"><div className="va-panel-heading"><h2>Case summary</h2><ShieldCheck size={17} /></div><div className="va-tier-line"><span>Subject</span><b>{dispute.subject}</b></div><div className="va-tier-line"><span>Buyer</span><b>{dispute.buyer}</b></div><div className="va-tier-line"><span>Order reference</span><b>{dispute.orderId}</b></div><div className="va-tier-line"><span>Product</span><b>{dispute.product}</b></div><div className="va-tier-line"><span>Reason</span><b>{dispute.reason}</b></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Case notes & timeline</h2><Clock3 size={16} /></div><div className="va-timeline">{dispute.notes.map((note, index) => <div className={`va-timeline-row ${index === 0 || note.author === 'Vendor' ? 'done' : ''}`} key={`${note.date}${note.author}`}><i /><span><b>{note.author} · {note.date}</b><small>{note.message}</small></span></div>)}{dispute.status === 'Resolved' && <div className="va-timeline-row done"><i /><span><b>Case resolved</b><small>Resolution recorded in this demo only.</small></span></div>}</div></section>
      {dispute.status !== 'Resolved' && <form className="va-form" onSubmit={addDisputeNote}><label>Add a case update<textarea rows={3} value={disputeReply} onChange={(event) => setDisputeReply(event.target.value)} placeholder="Describe the information you are adding to this case…" /></label><button type="submit" className="va-primary-wide"><Send size={15} /> Save local case note</button><button type="button" className="va-secondary-button" onClick={resolveDispute}>Mark case resolved</button></form>}
      <div className="va-info-card"><ShieldCheck size={17} /><span>Notes and status changes remain in this browser. No dispute, courier, or buyer messaging API is connected.</span></div>
    </div>;
  }

  function SupportScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="HERE TO HELP" title="Support centre" detail="Find answers or talk to the vendor support team." />
      <div className="va-support-hero"><span><Headphones size={24} /></span><div><b>How can we help?</b><small>Our demo support desk is available 9 AM–6 PM.</small></div><button type="button" onClick={() => setDialog('support')}>New ticket</button></div>
      <SectionTitle title="Popular help topics" />
      {[['Listing a product', 'Product photos, categories and approval'], ['Order fulfilment', 'Accept, pack and dispatch an order'], ['Payments & settlements', 'Payouts, transaction status and fees'], ['Returns & disputes', 'Handle requests and resolve buyer issues']].map(([title, detail], index) => <button type="button" className="va-help-row" key={title} onClick={() => setToast(`Help article "${title}" opened in demo mode.`)}><span className={`va-help-icon help-${index}`}><FileText size={17} /></span><span><b>{title}</b><small>{detail}</small></span><ChevronRight size={16} /></button>)}
      <div className="va-ticket-summary"><div><b>Your support tickets</b><small>1 open · 3 resolved</small></div><button type="button" onClick={() => setToast('Support ticket history opened.')}>View history</button></div>
      <div className="va-disclaimer">Demo UI only — support requests are not sent to Sunday Malls.</div>
    </div>;
  }

  function ProfileScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="YOUR ACCOUNT" title="Merchant profile" detail="Keep your store and business information up to date." />
      <button type="button" className="va-profile-tools" onClick={() => go('more')}><span><MoreHorizontal size={19} /></span><span><b>More business tools</b><small>Analytics, payments, shipping and support</small></span><ChevronRight size={17} /></button>
      <section className="va-profile-hero"><span className="va-profile-logo"><Store size={25} /></span><div><h2>{businessProfile.storeName}</h2><p><BadgeCheck size={14} /> Verified vendor · {businessProfile.city}</p></div><button type="button" aria-label="Preview storefront" onClick={() => setToast('Storefront preview is simulated in this demo.')}><ArrowUpRight size={17} /></button></section>
      <div className="va-profile-progress"><div><span>Profile completion</span><b>82%</b></div><div className="va-progress-track"><i style={{ width: '82%' }} /></div><small>Add a storefront banner to complete your profile.</small></div>
      <ProfileGroup title="Business settings" rows={[['Outlet information', `${businessProfile.address}, ${businessProfile.city}`, Store], ['Company profile', businessProfile.contactName, Building2], ['Tax information', `GSTIN ${businessProfile.gstin}`, FileCheck2], ['Bank details', 'HDFC Bank · •••• 2841 · Demo', CreditCard]]} onClick={(label) => label === 'Bank details' ? go('payments') : go('business-editor')} />
      <ProfileGroup title="Operations" rows={[['Order preferences', 'Fulfilment & cancellation settings', PackageCheck], ['Return policy', 'Review your return settings', PackageOpen], ['Team access', '2 team members', UserRound]]} onClick={(label) => setToast(`${label} editor opened in the local demo.`)} />
      <ProfileGroup title="Support & information" rows={[['Contact manager', 'Your Sunday Malls point of contact', UserRound], ['Help centre', 'Guides and FAQs', CircleHelp], ['Privacy & security', 'Account safety and policies', ShieldCheck]]} onClick={(label) => label === 'Help centre' ? go('help') : label === 'Privacy & security' ? go('security') : setToast(`${label} details are simulated in this demo.`)} />
      <button type="button" className="va-logout" onClick={() => setDialog('confirm')}>Sign out of demo <ArrowRight size={16} /></button>
    </div>;
  }

  function BusinessEditorScreen() {
    function saveBusinessProfile(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const values = new FormData(event.currentTarget);
      const updatedProfile: BusinessProfile = {
        storeName: String(values.get('storeName')).trim(),
        contactName: String(values.get('contactName')).trim(),
        phone: String(values.get('phone')).trim(),
        email: String(values.get('email')).trim(),
        address: String(values.get('address')).trim(),
        city: String(values.get('city')).trim(),
        gstin: String(values.get('gstin')).trim().toUpperCase(),
        pan: String(values.get('pan')).trim().toUpperCase(),
      };
      if (updatedProfile.storeName.length < 2 || updatedProfile.contactName.length < 2) {
        setToast('Enter a business name and contact name with at least 2 characters.');
        return;
      }
      setBusinessProfile(updatedProfile);
      pageDirtyRef.current = false;
      setToast('Business information saved to this browser-only demo.');
      navigateBack('profile');
    }

    return <div className="va-page">
      <PageIntro eyebrow="BUSINESS PROFILE · LOCAL DEMO" title="Business information" detail="Update the vendor details shown across this demo workspace." />
      <form className="va-form" onSubmit={saveBusinessProfile}>
        <div className="va-form-section-heading"><b>Store & contact</b><small>Required fields are validated in your browser.</small></div>
        <label>Business / store name<input name="storeName" required minLength={2} maxLength={80} defaultValue={businessProfile.storeName} /></label>
        <div className="va-form-grid"><label>Contact person<input name="contactName" required minLength={2} maxLength={80} defaultValue={businessProfile.contactName} /></label><label>Mobile number<input name="phone" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} defaultValue={businessProfile.phone} /></label></div>
        <label>Business email<input name="email" required type="email" maxLength={120} defaultValue={businessProfile.email} /></label>
        <label>Address<input name="address" required minLength={4} maxLength={120} defaultValue={businessProfile.address} /></label>
        <label>City / state<input name="city" required minLength={2} maxLength={80} defaultValue={businessProfile.city} /></label>
        <div className="va-form-section-heading"><b>Tax identifiers</b><small>Format checks are local only; no GST or PAN service is contacted.</small></div>
        <div className="va-form-grid"><label>GSTIN<input name="gstin" required minLength={15} maxLength={15} pattern="[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z][1-9A-Za-z]Z[0-9A-Za-z]" defaultValue={businessProfile.gstin} /></label><label>PAN<input name="pan" required minLength={10} maxLength={10} pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" defaultValue={businessProfile.pan} /></label></div>
        <div className="va-detail-actions"><button type="button" className="va-secondary-button" onClick={() => navigateBack('profile')}>Cancel</button><button type="submit" className="va-primary-button"><Check size={15} /> Save business details</button></div>
      </form>
      <div className="va-info-card"><Building2 size={17} /><span>Saved values are kept in local browser storage and do not update a live business account.</span></div>
    </div>;
  }

  function SettingsScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="PREFERENCES" title="Settings" detail="Choose how your vendor workspace behaves." />
      <section className="va-panel"><div className="va-panel-heading"><h2>Notifications</h2><Bell size={17} /></div>{[['New order alerts', true], ['Buyer enquiry messages', true], ['Low-stock reminders', true], ['Product approval updates', false]].map(([label, checked]) => <label className="va-setting-row" key={String(label)}><span><b>{label}</b><small>In-app notification preference</small></span><input type="checkbox" defaultChecked={Boolean(checked)} onChange={() => setToast('Notification preference updated on this device.')} /></label>)}</section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Account & security</h2><LockKeyhole size={17} /></div>{[['Password & sign-in', 'Manage your demo credentials'], ['Team access', '2 members'], ['Privacy settings', 'Data & permissions']].map(([label, detail]) => <button type="button" className="va-setting-link" key={label} onClick={() => go('security')}><span><b>{label}</b><small>{detail}</small></span><ChevronRight size={16} /></button>)}</section>
      <button type="button" className="va-outline-wide" onClick={() => setToast('Demo settings restored to defaults.')}>Reset demo preferences</button>
      <p className="va-version">Sunday Malls Vendor · Demo build 1.0.4</p>
    </div>;
  }

  function SecurityScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="ACCOUNT PROTECTION" title="Security" detail="Review sign-in and privacy preferences for this demo workspace." />
      <section className="va-panel"><div className="va-panel-heading"><h2>Sign-in protection</h2><ShieldCheck size={17} /></div><label className="va-setting-row"><span><b>Two-step verification</b><small>Demo preference only; no OTP service is connected.</small></span><input type="checkbox" onChange={() => setToast('Demo sign-in preference updated on this device.')} /></label><label className="va-setting-row"><span><b>New sign-in alerts</b><small>Show alerts inside this local app.</small></span><input type="checkbox" defaultChecked onChange={() => setToast('Sign-in alert preference updated on this device.')} /></label></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Sessions & devices</h2><LockKeyhole size={17} /></div><div className="va-tier-line"><span>Current session</span><b>This browser · Active</b></div><div className="va-tier-line"><span>Last activity</span><b>Today · Demo session</b></div><button type="button" className="va-outline-wide" onClick={() => setToast('There are no other real sessions connected to this demo.')}>Review other sessions</button></section>
      <div className="va-info-card"><LockKeyhole size={17} /><span>Passwords, access controls, and session management are not connected to an authentication service.</span></div>
    </div>;
  }

  function OnboardingScreen() {
    const steps = [['Business details', `${businessProfile.storeName} · submitted`, 'done'], ['GST & PAN', 'Tax details received · simulated', 'done'], ['Bank account', 'HDFC Bank ·•••• 2841', 'done'], ['Document review', 'Verification in progress', 'active']];
    return <div className="va-page">
      <PageIntro eyebrow="VENDOR ONBOARDING" title="Let’s get you verified" detail="Set up your business to reach wholesale buyers." />
      <div className="va-onboarding-card"><span className="va-onboarding-symbol"><ShieldCheck size={27} /></span><div><StatusBadge>In review</StatusBadge><h2>Verification underway</h2><p>Your submitted business details are queued for a demo review.</p></div><div className="va-onboard-progress"><i /></div><small>Step 4 of 4 · Status is simulated for this frontend.</small></div>
      <div className="va-step-list">{steps.map(([title, desc, status], index) => <div className="va-step" key={title}><span className={status === 'done' ? 'step-done' : 'step-active'}>{status === 'done' ? <Check size={14} /> : index + 1}</span><div><b>{title}</b><small>{desc}</small></div><span className={status === 'done' ? 'va-step-check' : 'va-step-pending'}>{status === 'done' ? 'Complete' : 'In progress'}</span></div>)}</div>
      <form className="va-form va-onboarding-form" onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (formData.get('otp') !== '123456') {
          setToast('Enter the simulated OTP 123456 to continue.');
          return;
        }
        setBusinessProfile((current) => ({
          ...current,
          storeName: String(formData.get('business')).trim(),
          contactName: String(formData.get('contact')).trim(),
          phone: String(formData.get('mobile')).trim(),
          gstin: String(formData.get('gstin')).trim().toUpperCase(),
          pan: String(formData.get('pan')).trim().toUpperCase(),
        }));
        pageDirtyRef.current = false;
        setToast('Business details saved to this local demo.');
      }}>
        <div className="va-form-section-heading"><b>Business profile</b><small>These details are only for the frontend demo.</small></div>
        <label>Business / store name<input name="business" required defaultValue={businessProfile.storeName} /></label>
        <div className="va-form-grid"><label>Contact person<input name="contact" required defaultValue={businessProfile.contactName} /></label><label>Mobile number<input name="mobile" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} defaultValue={businessProfile.phone} /></label></div>
        {otpSent && <label>Demo OTP<input name="otp" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="Enter 123456" /></label>}
        <div className="va-form-section-heading"><b>Tax & bank information</b><small>Sample details for visual walkthrough only.</small></div>
        <div className="va-form-grid"><label>GSTIN<input name="gstin" required minLength={15} maxLength={15} defaultValue={businessProfile.gstin} /></label><label>PAN<input name="pan" required minLength={10} maxLength={10} defaultValue={businessProfile.pan} /></label></div>
        <label>Bank account number<input name="account" required inputMode="numeric" minLength={9} placeholder="Enter account number" /></label>
        <label>IFSC code<input name="ifsc" required minLength={11} maxLength={11} placeholder="e.g. HDFC0001234" /></label>
        {otpSent
          ? <button type="submit" className="va-primary-wide">Verify & save demo details</button>
          : <button type="button" className="va-primary-wide" onClick={(event) => {
            const form = event.currentTarget.form;
            const mobile = form ? new FormData(form).get('mobile') : '';
            if (typeof mobile !== 'string' || !/^\d{10}$/.test(mobile)) {
              setToast('Enter a valid 10-digit mobile number to request a demo OTP.');
              return;
            }
            setOtpSent(true);
            setToast('Demo OTP sent. Use 123456 to continue; no SMS was sent.');
          }}>Send demo OTP</button>}
      </form>
      <button type="button" className="va-primary-wide" onClick={() => setToast('Demo verification status refreshed. No document review was requested.')}>Refresh verification status</button>
      <div className="va-doc-upload"><Upload size={19} /><span><b>Upload a business document</b><small>PDF, JPG or PNG · 10 MB maximum</small></span><label className="va-upload-button">Choose file<input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => event.target.files?.[0] && setToast(`${event.target.files[0].name} selected for this demo only.`)} /></label></div>
      <div className="va-demo-note"><ShieldCheck size={16} /><span><b>Frontend simulation</b><small>OTP, GST checks, bank validation and verification are not connected to real services.</small></span></div>
    </div>;
  }

  function PricingScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="REVENUE TOOLS" title="Pricing & tier rates" detail="Give buyers a reason to order in bulk." action={<button type="button" className="va-primary-button" onClick={() => showProduct()}><Pencil size={15} /> Edit prices</button>} />
      <div className="va-pricing-highlight"><TicketPercent size={21} /><div><b>Bulk pricing can lift order size</b><small>Example tiers shown for your demo catalogue.</small></div></div>
      {products.slice(0, 4).map((product) => <article className="va-tier-card" key={product.id}><div><span>{product.art}</span><div><b>{product.name}</b><small>{product.sku} · Base {formatCurrency(product.price)}</small></div></div><div className="va-tier-rates"><span><small>10+ units</small><b>{formatCurrency(Math.round(product.price * .96))}</b></span><span><small>50+ units</small><b>{formatCurrency(Math.round(product.price * .91))}</b></span><button type="button" aria-label={`Edit tiers for ${product.name}`} onClick={() => setToast(`Bulk price tiers for ${product.name} opened.`)}><Pencil size={15} /></button></div></article>)}
      <button type="button" className="va-outline-wide" onClick={() => go('promotions')}><TicketPercent size={16} /> Manage discounts & campaigns</button>
      <div className="va-info-card"><IndianRupee size={17} /><span>All prices and tier discounts are local sample data and are not published to a marketplace.</span></div>
    </div>;
  }

  function PromotionsScreen() {
    const visibleCampaigns = campaigns.filter((campaign) => campaignFilter === 'All' || campaign.status === campaignFilter);
    return <div className="va-page">
      <PageIntro eyebrow="GROW YOUR STORE" title="Promotions" detail="Edit local sample campaigns and simulated performance." action={<button type="button" className="va-primary-button" onClick={() => openCampaignEditor()}><Plus size={16} /> New campaign</button>} />
      <div className="va-promo-stats"><div><span><TicketPercent size={17} /></span><b>{campaigns.filter((campaign) => campaign.status === 'Active').length}</b><small>Active campaigns · demo</small></div><div><span><TrendingUp size={17} /></span><b>₹42k</b><small>Attributed sales · simulated</small></div></div>
      <FilterChips items={['All', 'Active', 'Scheduled', 'Draft']} value={campaignFilter} onChange={setCampaignFilter} />
      {visibleCampaigns.length === 0
        ? <EmptyState title="No campaigns match" detail="Choose a different campaign status." />
        : visibleCampaigns.map((campaign) => {
          const dateLabel = campaign.startDate && campaign.endDate
            ? `${new Date(`${campaign.startDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}–${new Date(`${campaign.endDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
            : 'No dates set';
          return <article className="va-campaign-card" key={campaign.id}><div><span className="va-campaign-icon"><Tag size={18} /></span><span><b>{campaign.name || 'Untitled campaign'}</b><small>{campaign.offer || 'Add an offer in the campaign editor'}</small></span></div><div><StatusBadge>{campaign.status}</StatusBadge><span>{dateLabel} · {campaign.audience}</span></div><button type="button" onClick={() => openCampaignEditor(campaign)}>Edit campaign <ChevronRight size={14} /></button></article>;
        })}
      <button type="button" className="va-coupon-card" onClick={() => setToast('Coupon code SUNDAY10 is a demo value; it was not copied or applied to an order.')}><span><TicketPercent size={18} /> Coupon code</span><b>SUNDAY10 <span>Demo</span></b><small>Sample code only · No discount is applied</small></button>
      <div className="va-info-card"><CircleHelp size={17} /><span>Discounts, coupons and campaign analytics are simulated and will not be applied to orders.</span></div>
    </div>;
  }

  function CampaignEditorScreen() {
    const campaign = campaigns.find((item) => item.id === selectedCampaignId) ?? campaignDraft ?? initialCampaigns[0];
    function saveCampaign(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const values = new FormData(event.currentTarget);
      const name = String(values.get('name')).trim();
      const offer = String(values.get('offer')).trim();
      const status = String(values.get('status')) as Campaign['status'];
      const startDate = String(values.get('startDate'));
      const endDate = String(values.get('endDate'));
      if (name.length < 3 || offer.length < 3) {
        setToast('Enter a campaign name and offer with at least 3 characters.');
        return;
      }
      if (status !== 'Draft' && (!startDate || !endDate || startDate > endDate)) {
        setToast('Active and scheduled campaigns need valid start and end dates.');
        return;
      }
      const updatedCampaign: Campaign = {
        ...campaign,
        name,
        offer,
        status,
        startDate,
        endDate,
        audience: String(values.get('audience')),
      };
      setCampaigns((current) => current.some((item) => item.id === campaign.id)
        ? current.map((item) => item.id === campaign.id ? updatedCampaign : item)
        : [updatedCampaign, ...current]);
      setCampaignDraft(null);
      pageDirtyRef.current = false;
      setToast('Campaign saved in local demo storage. It was not published or applied to orders.');
      navigateBack('promotions');
    }

    return <div className="va-page">
      <PageIntro eyebrow="CAMPAIGN EDITOR · LOCAL DEMO" title={campaign.name || 'New campaign'} detail="Edit a draft or sample promotion; changes are not published." />
      <form className="va-form" onSubmit={saveCampaign}>
        <label>Campaign name<input name="name" required minLength={3} maxLength={70} defaultValue={campaign.name} placeholder="e.g. Monsoon bulk offer" /></label>
        <label>Offer details<input name="offer" required minLength={3} maxLength={100} defaultValue={campaign.offer} placeholder="e.g. 10% off orders above ₹10,000" /></label>
        <label>Audience<select name="audience" defaultValue={campaign.audience}><option>All wholesale buyers</option><option>New buyers</option><option>Returning buyers</option><option>Selected products</option></select></label>
        <div className="va-form-grid"><label>Start date<input name="startDate" type="date" defaultValue={campaign.startDate} /></label><label>End date<input name="endDate" type="date" defaultValue={campaign.endDate} /></label></div>
        <label>Status<select name="status" defaultValue={campaign.status}><option>Draft</option><option>Scheduled</option><option>Active</option></select></label>
        <div className="va-detail-actions"><button type="button" className="va-secondary-button" onClick={() => navigateBack('promotions')}>Cancel</button><button type="submit" className="va-primary-button"><Check size={15} /> Save campaign</button></div>
      </form>
      <div className="va-info-card"><TicketPercent size={17} /><span>Campaign dates, reach and attributed sales are sample values. No coupons, notifications, or discounts are sent to buyers.</span></div>
    </div>;
  }

  function QuotationScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="BUYER RESPONSE" title="Create a quotation" detail="Build a tailored bulk offer for a buyer." />
      <form className="va-form" onSubmit={(event) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const quantity = Number(values.get('quantity'));
        const unitPrice = Number(values.get('unitPrice'));
        const quote: Quote = {
          id: `QT-${Date.now().toString().slice(-4)}`,
          buyer: String(values.get('buyer')).trim(),
          product: String(values.get('product')),
          quantity,
          unitPrice,
          total: quantity * unitPrice,
          validUntil: String(values.get('validUntil')),
          status: 'Draft',
        };
        setQuotes((current) => [quote, ...current]);
        setSelectedQuote(quote);
        pageDirtyRef.current = false;
        go('quotation-detail', true);
      }}>
        <label>Buyer / company<input name="buyer" required defaultValue={selectedEnquiry.buyer} placeholder="e.g. Star Bazaar" /></label>
        <label>Product<select name="product" defaultValue=""><option value="" disabled>Select a product</option>{products.map((product) => <option key={product.id}>{product.name}</option>)}</select></label>
        <div className="va-form-grid"><label>Quantity<input name="quantity" required type="number" min="1" defaultValue="50" /></label><label>Price per unit (₹)<input name="unitPrice" required type="number" min="1" placeholder="Enter price" /></label></div>
        <div className="va-form-grid"><label>Valid until<input name="validUntil" type="date" defaultValue="2026-11-06" /></label><label>Delivery estimate<select name="delivery" defaultValue="5-7 days"><option>3-5 days</option><option>5-7 days</option><option>7-10 days</option></select></label></div>
        <label>Note for buyer<textarea rows={3} placeholder="Add delivery or payment terms…" /></label>
        <div className="va-info-card"><FileText size={16} /><span>Quote totals are illustrative; this will not create or send a real offer.</span></div>
        <button type="submit" className="va-primary-wide"><Send size={16} /> Save quotation</button>
      </form>
      <SectionTitle title="Recent quotations" />
      {quotes.map((quote) => <button type="button" className="va-quote-history" key={quote.id} onClick={() => { setSelectedQuote(quote); go('quotation-detail'); }}><span><b>{quote.buyer}</b><small>{quote.id} · {formatCurrency(quote.total)}</small></span><StatusBadge>{quote.status}</StatusBadge><ChevronRight size={16} /></button>)}
    </div>;
  }

  function RfqDetailScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="BUYER REQUEST" title="Request details" detail={`${selectedEnquiry.id} · ${selectedEnquiry.when}`} />
      <section className="va-panel"><div className="va-panel-heading"><h2>Buyer</h2><StatusBadge>{selectedEnquiry.unread ? 'New' : 'Open'}</StatusBadge></div><div className="va-buyer-detail"><span className="va-buyer-avatar">{selectedEnquiry.buyer[0]}</span><div><b>{selectedEnquiry.buyer}</b><small><MapPin size={12} /> {selectedEnquiry.city}, India</small><small>Verified wholesale buyer</small></div></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Requirement</h2><MessageSquare size={16} /></div><b>{selectedEnquiry.item}</b><div className="va-tier-line"><span>Indicative request value</span><b>{selectedEnquiry.amount}</b></div><div className="va-tier-line"><span>Received</span><b>{selectedEnquiry.when}</b></div></section>
      <div className="va-info-card"><FileText size={17} /><span>Buyer request details are sample data. No offer is sent until you choose to create a demo quotation.</span></div>
      <div className="va-detail-actions"><button type="button" className="va-secondary-button" onClick={() => go('chat')}><MessageCircle size={16} /> Open conversation</button><button type="button" className="va-primary-button" onClick={() => go('quotation')}><FileText size={16} /> Create quote</button></div>
    </div>;
  }

  function QuotationDetailScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="LOCAL DEMO QUOTATION" title={selectedQuote.id} detail={`Prepared for ${selectedQuote.buyer}`} action={<StatusBadge>{selectedQuote.status}</StatusBadge>} />
      <section className="va-panel"><div className="va-panel-heading"><h2>Offer summary</h2><FileCheck2 size={17} /></div><div className="va-quote-history"><span><b>{selectedQuote.product}</b><small>{selectedQuote.quantity} units · {formatCurrency(selectedQuote.unitPrice)} each</small></span><strong>{formatCurrency(selectedQuote.total)}</strong></div><div className="va-tier-line"><span>Valid until</span><b>{selectedQuote.validUntil || 'Not specified'}</b></div></section>
      <div className="va-info-card"><Send size={17} /><span>This quotation is stored in this browser only. It has not been sent to the buyer.</span></div>
      <button type="button" className="va-secondary-button" onClick={() => go('chat')}><MessageCircle size={16} /> Open buyer conversation</button>
    </div>;
  }

  function ChatScreen() {
    return <div className="va-page va-chat-page">
      <PageIntro eyebrow="BUYER CONVERSATION" title={selectedEnquiry.buyer} detail={`${selectedEnquiry.item} · ${selectedEnquiry.city}`} />
      <div className="va-chat-buyer"><span className="va-buyer-avatar">{selectedEnquiry.buyer[0]}</span><div><b>{selectedEnquiry.buyer}</b><small><span /> Usually replies in 20 min</small></div><button type="button" aria-label="Buyer request details" onClick={() => go('rfq-detail')}><MoreHorizontal size={19} /></button></div>
      <div className="va-chat-date">TODAY · 10:26 AM</div>
      <div className="va-chat-message received">Hi, we need 120 ceiling fans for our Pune stores. Can you share your best bulk price?<small>10:26 AM</small></div>
      <div className="va-chat-message sent">Hello Vivek! Thanks for reaching out. I can prepare a bulk quotation for you.<small>10:34 AM · ✓✓</small></div>
      <div className="va-chat-quote"><span><FileText size={17} /> QUOTATION · {selectedQuote.id}</span><b>{selectedQuote.product} · {selectedQuote.quantity} units</b><strong>{formatCurrency(selectedQuote.total)}</strong><StatusBadge>{selectedQuote.status}</StatusBadge><button type="button" onClick={() => go('quotation-detail')}>View quotation <ChevronRight size={14} /></button></div>
      <div className="va-chat-quick">{['Share catalogue', 'Delivery estimate', 'Payment terms'].map((reply) => <button type="button" key={reply} onClick={() => setMessage(reply)}>{reply}</button>)}</div>
      <div className="va-chat-composer"><button type="button" aria-label="Attach file" onClick={() => setToast('Attachment picker is simulated for this demo.')}><ImagePlus size={19} /></button><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message…" onKeyDown={(event) => event.key === 'Enter' && sendMessage()} /><button type="button" aria-label="Send message" onClick={sendMessage}><Send size={17} /></button></div>
      <div className="va-disclaimer">Buyer messages and attachments are local demo examples.</div>
    </div>;
  }

  function NotificationsScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="YOUR UPDATES" title="Notifications" detail="Stay on top of store activity." action={<button type="button" className="va-link" onClick={() => setToast('All notifications marked read.')}>Mark all read</button>} />
      <div className="va-notification-list">{[['New bulk order received', 'Aarav Retail Co. · ORD-72841 · ₹19,475', '10:42 AM', PackageCheck], ['Buyer sent an enquiry', 'Star Bazaar is looking for 120 ceiling fans.', '10:26 AM', MessageSquare], ['Product approved', 'Toreto Rolling Vibe Speaker is live.', 'Yesterday', BadgeCheck], ['Settlement processed', '₹24,850 payout marked complete.', 'Yesterday', Wallet]].map(([title, detail, time, Icon]) => { const NoticeIcon = Icon as typeof Package; return <button type="button" className="va-notice-row" key={String(title)} onClick={() => setToast(`${String(title)} opened in demo mode.`)}><span><NoticeIcon size={18} /></span><div><b>{String(title)}</b><small>{String(detail)}</small><time>{String(time)}</time></div><i /></button>; })}</div>
    </div>;
  }

  function WarehousesScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="STOCK LOCATIONS" title="Warehouses" detail="Manage locations used in the inventory demo." action={<button type="button" className="va-primary-button" onClick={() => setToast('Warehouse creation form opened in demo mode.')}><Plus size={16} /> Add</button>} />
      {initialWarehouses.map((warehouse) => <article className="va-warehouse-card" key={warehouse.name}><span><Warehouse size={21} /></span><div><b>{warehouse.name}</b><small><MapPin size={12} /> {warehouse.city}</small><small>{warehouse.skuCount} SKUs · {warehouse.kind} warehouse</small></div><button type="button" aria-label={`View ${warehouse.name} details`} onClick={() => { setSelectedWarehouse(warehouse); go('warehouse-detail'); }}><ChevronRight size={17} /></button></article>)}
      <div className="va-info-card"><Warehouse size={17} /><span>Warehouse locations and unit counts are mock business data.</span></div>
    </div>;
  }

  function WarehouseDetailScreen() {
    const warehouseProducts = products.slice(0, Math.min(5, products.length));
    return <div className="va-page">
      <PageIntro eyebrow={`${selectedWarehouse.kind.toUpperCase()} WAREHOUSE`} title={selectedWarehouse.name} detail={selectedWarehouse.city} />
      <div className="va-inventory-summary"><div><Boxes size={17} /><b>{selectedWarehouse.skuCount}</b><small>SKU LOCATIONS</small></div><div><Package size={17} /><b>{warehouseProducts.reduce((total, product) => total + product.stock, 0)}</b><small>UNITS SHOWN</small></div><div><MapPin size={17} /><b>{selectedWarehouse.kind}</b><small>LOCATION TYPE</small></div><div><Clock3 size={17} /><b>Local</b><small>DEMO DATA</small></div></div>
      <SectionTitle title="Sample stock at this location" />
      <div className="va-stock-list">{warehouseProducts.map((product) => <article className="va-stock-card" key={product.id}><div className="va-stock-head"><span className="va-product-emoji">{product.art}</span><span><b>{product.name}</b><small>{product.sku}</small></span><strong>{product.stock}<small> units</small></strong></div><div className="va-stock-foot"><StatusBadge>{product.stock <= 8 ? 'Low stock' : 'In stock'}</StatusBadge></div></article>)}</div>
      <div className="va-detail-actions"><button type="button" className="va-secondary-button" onClick={() => go('stock-history')}><Clock3 size={16} /> Stock history</button><button type="button" className="va-primary-button" onClick={() => go('inventory')}><Boxes size={16} /> All inventory</button></div>
      <div className="va-info-card"><Warehouse size={17} /><span>Location and stock figures are sample data and are not linked to warehouse operations.</span></div>
    </div>;
  }

  function StockHistoryScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="AUDIT TRAIL" title="Stock movement" detail="Local demo history of recent stock adjustments." />
      {stockMovements.length === 0
        ? <EmptyState title="No stock movements yet" detail="Stock adjustments will be recorded here in the local demo." />
        : stockMovements.map((movement) => <article className="va-history-row" key={movement.id}><span className={movement.change > 0 ? 'history-add' : 'history-remove'}>{movement.change > 0 ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}</span><div><b>{movement.productName}</b><small>{movement.reason} · {movement.productId}</small><time>{movement.date}</time></div><strong className={movement.change > 0 ? 'green-text' : ''}>{movement.change > 0 ? '+' : '−'}{Math.abs(movement.change)} units</strong></article>)}
      <div className="va-info-card"><Clock3 size={17} /><span>Audit history is for demo display only and is not an authoritative inventory ledger.</span></div>
    </div>;
  }

  function OrderDetailScreen() {
    const next = selectedOrder.status === 'New' ? 'Processing' : selectedOrder.status === 'Processing' ? 'Ready to ship' : selectedOrder.status === 'Ready to ship' ? 'Shipped' : selectedOrder.status;
    return <div className="va-page">
      <div className="va-detail-order-head"><div><span className="va-eyebrow">ORDER ID</span><h1>{selectedOrder.id}</h1><small>Placed {selectedOrder.date}</small></div><StatusBadge>{selectedOrder.status}</StatusBadge></div>
      <section className="va-panel"><div className="va-panel-heading"><h2>Buyer details</h2><button type="button" onClick={() => go('chat')}><MessageCircle size={16} /></button></div><div className="va-buyer-detail"><span className="va-buyer-avatar">{selectedOrder.buyer[0]}</span><div><b>{selectedOrder.buyer}</b><small><MapPin size={12} /> {selectedOrder.city}, India</small><small>Verified wholesale buyer</small></div></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Items ordered</h2><span>{selectedOrder.units} units</span></div>{initialProducts.slice(0, 2).map((product, index) => <div className="va-order-item" key={product.id}>{product.image ? <Image className="va-order-item-image" src={product.image} alt="" width={42} height={42} /> : <span className="va-product-emoji">{product.art}</span>}<span><b>{product.name}</b><small>{index === 0 ? 2 : selectedOrder.units - 2} × {formatCurrency(product.price)}</small></span><strong>{formatCurrency(product.price * (index === 0 ? 2 : selectedOrder.units - 2))}</strong></div>)}<div className="va-order-total"><span>Order total</span><strong>{formatCurrency(selectedOrder.total)}</strong></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Fulfilment timeline</h2><Clock3 size={16} /></div><div className="va-timeline">{[['Order placed', 'Buyer confirmed this order', true], ['Accepted by vendor', 'Awaiting vendor action', selectedOrder.status !== 'New'], ['Packed & dispatched', 'Shipment status updates are simulated', ['Shipped', 'Delivered'].includes(selectedOrder.status)], ['Delivered to buyer', 'Final delivery confirmation', selectedOrder.status === 'Delivered']].map(([title, detail, done]) => <div className={`va-timeline-row ${done ? 'done' : ''}`} key={String(title)}><i /><span><b>{String(title)}</b><small>{String(detail)}</small></span></div>)}</div></section>
      <div className="va-order-detail-actions">{selectedOrder.status === 'New' && <button type="button" className="va-secondary-button" onClick={() => updateOrder(selectedOrder.id, 'Cancelled')}>Reject</button>}{!['Delivered', 'Cancelled'].includes(selectedOrder.status) && <button type="button" className="va-primary-button" onClick={() => updateOrder(selectedOrder.id, next as Order['status'])}>{selectedOrder.status === 'New' ? 'Accept order' : selectedOrder.status === 'Processing' ? 'Mark packed' : selectedOrder.status === 'Ready to ship' ? 'Mark shipped' : 'Update status'} <ArrowRight size={15} /></button>}</div>
      <button type="button" className="va-outline-wide" onClick={() => go('invoice-detail')}> <FileText size={16} /> Preview invoice</button>
      <p className="va-disclaimer">Accepting, rejecting and fulfilment updates modify local demo state only.</p>
    </div>;
  }

  function InvoiceDetailScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="INVOICE PREVIEW · DEMO" title={`INV-${selectedOrder.id.slice(-5)}`} detail={`For order ${selectedOrder.id} · ${selectedOrder.date}`} />
      <section className="va-panel"><div className="va-panel-heading"><h2>Sunday Malls HQ</h2><FileCheck2 size={18} /></div><p className="va-footnote">Vendor invoice preview</p><div className="va-tier-line"><span>Bill to</span><b>{selectedOrder.buyer}</b></div><div className="va-tier-line"><span>Delivery city</span><b>{selectedOrder.city}</b></div><div className="va-tier-line"><span>Order reference</span><b>{selectedOrder.id}</b></div></section>
      <section className="va-panel"><div className="va-panel-heading"><h2>Invoice total</h2><span>{selectedOrder.units} units</span></div><div className="va-tier-line"><span>Wholesale goods</span><b>{formatCurrency(selectedOrder.total)}</b></div><div className="va-tier-line"><span>Taxes and fees</span><b>Included in sample total</b></div><div className="va-order-total"><span>Amount due</span><strong>{formatCurrency(selectedOrder.total)}</strong></div></section>
      <button type="button" className="va-primary-wide" onClick={() => setToast('Invoice export is simulated; no document was downloaded or sent.') }><Download size={16} /> Export sample invoice</button>
      <div className="va-info-card"><FileText size={17} /><span>This invoice is a local preview only and is not a tax document.</span></div>
    </div>;
  }

  function ProductDetailScreen() {
    const product = selectedProduct ?? products[0];
    return <div className="va-page">
      <div className="va-product-detail-art">{product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 90vw, 680px" preload /> : <span>{product.art}</span>}<button type="button" aria-label="Add product image" onClick={() => setToast('Product gallery is a local demo.')}><ImagePlus size={18} /></button><i>1 / 1</i></div>
      <div className="va-product-detail-title"><div><span className="va-eyebrow">{product.category} · {product.sku}</span><h1>{product.name}</h1></div><StatusBadge>{product.status}</StatusBadge></div>
      <div className="va-product-detail-price"><strong>{formatCurrency(product.price)}</strong><span>per {product.unit} · MOQ {product.moq}</span></div>
      <div className="va-product-summary"><span><small>AVAILABLE STOCK</small><b>{product.stock} units</b></span><span><small>GST</small><b>18%</b></span><span><small>UOM</small><b>{product.unit}</b></span></div>
      <section className="va-panel"><div className="va-panel-heading"><h2>Bulk price tiers</h2><button type="button" onClick={() => go('pricing')}><Pencil size={15} /></button></div><div className="va-tier-line"><span>1–9 units</span><b>{formatCurrency(product.price)}</b></div><div className="va-tier-line"><span>10–49 units</span><b>{formatCurrency(Math.round(product.price * .96))}</b></div><div className="va-tier-line"><span>50+ units</span><b>{formatCurrency(Math.round(product.price * .91))}</b></div></section>
      <div className="va-detail-actions"><button type="button" className="va-primary-button" onClick={() => showProduct(product)}><Pencil size={16} /> Edit listing</button><button type="button" className="va-secondary-button" onClick={() => openStock(product)}>Update stock</button></div>
      <div className="va-info-card"><FileCheck2 size={17} /><span>Product listing details are mock data stored locally in this browser.</span></div>
    </div>;
  }

  function HelpScreen() {
    return <div className="va-page">
      <PageIntro eyebrow="SUNDAY MALLS" title="Help & information" detail="Vendor app guides and demo contact information." />
      <div className="va-help-center-card"><LifeBuoy size={25} /><div><b>Vendor help centre</b><small>Browse support topics or create a demo ticket.</small></div><button type="button" onClick={() => go('support')}>Explore <ArrowRight size={14} /></button></div>
      {[['About Sunday Malls', 'A B2B marketplace for businesses and suppliers.'], ['Terms of service', 'View the demo terms and vendor policies.'], ['Privacy & data', 'Learn how the demo handles local data.'], ['Contact support', 'Reach the vendor assistance team.']].map(([title, detail]) => <button className="va-help-row" type="button" key={title} onClick={() => title === 'Contact support' ? go('support') : setToast(`${title} information opened.`)}><span className="va-help-icon help-1"><FileText size={17} /></span><span><b>{title}</b><small>{detail}</small></span><ChevronRight size={16} /></button>)}
      <p className="va-version">Sunday Malls Vendor · Demo build 1.0.4</p>
    </div>;
  }

  function PageIntro({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail: string; action?: ReactNode }) {
    return <div className="va-page-intro"><div><span className="va-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{detail}</p></div>{action}</div>;
  }

  function FilterChips({ items, value, onChange }: { items: string[]; value: string; onChange: (item: string) => void }) {
    return <div className="va-filter-chips" role="tablist">{items.map((item) => <button type="button" role="tab" aria-selected={value === item} key={item} className={value === item ? 'active' : ''} onClick={() => onChange(item)}>{item}</button>)}</div>;
  }

  function EmptyState({ title, detail }: { title: string; detail: string }) {
    return <div className="va-empty"><span><PackageOpen size={22} /></span><b>{title}</b><small>{detail}</small></div>;
  }

  function OrderCard({ order, onOpen }: { order: Order; onOpen: () => void }) {
    return <button type="button" className="va-order-card" onClick={onOpen}><div className="va-order-top"><span><b>{order.id}</b><small>{order.date}</small></span><StatusBadge>{order.status}</StatusBadge></div><div className="va-order-buyer"><span className="va-buyer-avatar">{order.buyer[0]}</span><span><b>{order.buyer}</b><small><MapPin size={12} /> {order.city} · {order.units} items</small></span><strong>{formatCurrency(order.total)}</strong></div><div className="va-order-bottom"><span className="va-order-preview">{initialProducts.slice(0, 2).map((product) => product.image ? <Image key={product.id} src={product.image} alt="" width={22} height={22} /> : <span key={product.id}>{product.art}</span>)}<span>View order details</span></span><ChevronRight size={15} /></div></button>;
  }

  function ProfileGroup({ title, rows, onClick }: { title: string; rows: [string, string, typeof Package][]; onClick: (label: string) => void }) {
    return <section className="va-profile-group"><h3>{title}</h3><div>{rows.map(([label, detail, Icon]) => <button type="button" className="va-profile-row" key={label} onClick={() => onClick(label)}><span className="va-profile-row-icon"><Icon size={17} /></span><span><b>{label}</b><small>{detail}</small></span><ChevronRight size={16} /></button>)}</div></section>;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home': return HomeScreen();
      case 'products': return ProductsScreen();
      case 'orders': return OrdersScreen();
      case 'enquiries': return EnquiriesScreen();
      case 'more': return MoreScreen();
      case 'inventory': return InventoryScreen();
      case 'analytics': return AnalyticsScreen();
      case 'payments': return PaymentsScreen();
      case 'settlements': return SettlementsScreen();
      case 'logistics': return LogisticsScreen();
      case 'returns': return ReturnsScreen();
      case 'disputes': return DisputesScreen();
      case 'support': return SupportScreen();
      case 'profile': return ProfileScreen();
      case 'settings': return SettingsScreen();
      case 'onboarding': return OnboardingScreen();
      case 'pricing': return PricingScreen();
      case 'promotions': return PromotionsScreen();
      case 'chat': return ChatScreen();
      case 'quotation': return QuotationScreen();
      case 'notifications': return NotificationsScreen();
      case 'warehouses': return WarehousesScreen();
      case 'stock-history': return StockHistoryScreen();
      case 'order-detail': return OrderDetailScreen();
      case 'product-detail': return ProductDetailScreen();
      case 'help': return HelpScreen();
      case 'security': return SecurityScreen();
      case 'rfq-detail': return RfqDetailScreen();
      case 'quotation-detail': return QuotationDetailScreen();
      case 'invoice-detail': return InvoiceDetailScreen();
      case 'warehouse-detail': return WarehouseDetailScreen();
      case 'shipment-detail': return ShipmentDetailScreen();
      case 'settlement-detail': return SettlementDetailScreen();
      case 'analytics-report': return AnalyticsReportScreen();
      case 'return-detail': return ReturnDetailScreen();
      case 'dispute-detail': return DisputeDetailScreen();
      case 'business-editor': return BusinessEditorScreen();
      case 'campaign-editor': return CampaignEditorScreen();
    }
  };

  return <div className="vendor-app">
    {topNavigation}
    <div className={`va-screen-content ${navigationDirection === 'back' ? 'is-returning' : ''}`} ref={screenContentRef} key={screen} onChange={(event) => {
      if ((event.target as HTMLElement).closest('.va-form')) pageDirtyRef.current = true;
    }}>
      {screenConfig[screen].showBottomNav ? renderScreen() : <div className="va-page-shell"><div className="va-context-toolbar"><BackButton destination={screenConfig[screen].parent} /></div>{renderScreen()}</div>}
    </div>
    {screenConfig[screen].showBottomNav && <VendorFooter activeScreen={screen} hasNewOrders={orders.some((order) => order.status === 'New')} onNavigate={go} />}
    {toast && <div className="va-toast" role="status"><CheckCircle2 size={17} />{toast}<button type="button" aria-label="Dismiss notification" onClick={() => setToast('')}><X size={15} /></button></div>}
    {dialog && <div className="va-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeDialog()}><section className="va-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onChange={() => setDialogDirty(true)}><div className="va-modal-head"><h2 id="modal-title">{dialog === 'product' ? selectedProduct ? 'Edit product' : 'Add a product' : dialog === 'stock' ? 'Update stock' : dialog === 'delete-product' ? 'Remove product?' : dialog === 'confirm' ? 'Sign out of demo' : 'Create a support ticket'}</h2><button type="button" aria-label="Close dialog" onClick={closeDialog}><X size={19} /></button></div>
      {dialog === 'product' && <form className="va-form" onSubmit={saveProduct}><label>Product name<input required value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} placeholder="e.g. Bluetooth speaker" /></label><label>SKU / lot number<input required value={productForm.sku} onChange={(event) => setProductForm({ ...productForm, sku: event.target.value })} placeholder="SM-LOT-12345" /></label><label>Category<select value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}><option>Electronics</option><option>Mobiles & accessories</option><option>Home & Kitchen</option><option>Furniture</option><option>Fashion & Apparel</option><option>Industrial supplies</option><option>Beauty & personal care</option><option>Grocery & FMCG</option><option>Packaging materials</option></select></label><div className="va-form-grid"><label>Unit price (₹)<input required type="number" min="1" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} placeholder="0.00" /></label><label>MOQ<input required type="number" min="1" value={productForm.moq} onChange={(event) => setProductForm({ ...productForm, moq: event.target.value })} /></label></div><div className="va-form-grid"><label>Stock units<input required type="number" min="0" value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} placeholder="0" /></label><label>GST rate<select defaultValue="18%"><option>5%</option><option>12%</option><option>18%</option><option>28%</option></select></label></div><button type="button" className="va-upload-placeholder" onClick={() => setToast('Image picker opened. Images are not uploaded to a server.')}><ImagePlus size={18} /> Add product images <span>Up to 5 photos</span></button><button type="submit" className="va-primary-wide">{selectedProduct ? 'Save changes' : 'Submit for review'}</button><small className="va-disclaimer">New listings are marked in review in local demo state.</small></form>}
      {dialog === 'stock' && <form className="va-form" onSubmit={adjustStock}><p className="va-stock-current"><b>{stockTarget.name}</b><small>Current stock: {stockTarget.stock} units</small></p><span className="va-form-label">ACTION</span><div className="va-action-choice">{['Add', 'Remove', 'Set'].map((action) => <button type="button" className={stockChange.action === action ? 'selected' : ''} key={action} onClick={() => setStockChange({ ...stockChange, action })}>{action === 'Add' ? '+ ' : action === 'Remove' ? '− ' : '↻ '}{action}</button>)}</div><label>Quantity<input required type="number" min="1" value={stockChange.quantity} onChange={(event) => setStockChange({ ...stockChange, quantity: event.target.value })} placeholder="Enter quantity" /></label><label>Reason<textarea required rows={3} value={stockChange.reason} onChange={(event) => setStockChange({ ...stockChange, reason: event.target.value })} placeholder="New stock received, damaged goods…" /></label><button type="submit" className="va-primary-wide">Confirm update</button><small className="va-disclaimer">Update is recorded in local demo state only.</small></form>}
      {dialog === 'support' && <form className="va-form" onSubmit={(event) => { event.preventDefault(); setDialog(''); setToast('Support ticket created in local demo mode.'); }}><label>Topic<select><option>Order fulfilment</option><option>Product listing</option><option>Payment question</option><option>Other</option></select></label><label>Subject<input required placeholder="How can we help?" /></label><label>Details<textarea required rows={4} placeholder="Describe the issue…" /></label><button className="va-primary-wide" type="submit">Create demo ticket</button><small className="va-disclaimer">This ticket is not sent to a support team.</small></form>}
      {dialog === 'confirm' && <div className="va-confirm-body"><p>Sign out of this local demo workspace?</p><button type="button" className="va-primary-wide" onClick={() => { setDialog(''); setToast('You are still in the local demo workspace.'); }}>Stay in demo</button></div>}
      {dialog === 'delete-product' && <div className="va-confirm-body"><p>Remove <b>{productToDelete?.name}</b> from your local demo catalogue? This cannot be undone.</p><div className="va-confirm-actions"><button type="button" className="va-secondary-button" onClick={closeDialog}>Keep product</button><button type="button" className="va-destructive-button" onClick={confirmProductDelete}><Trash2 size={15} /> Remove product</button></div></div>}
      </section></div>}
    {discardPrompt && <div className="va-discard-backdrop"><section className="va-discard-dialog" role="alertdialog" aria-modal="true" aria-labelledby="discard-title" aria-describedby="discard-description"><span className="va-discard-icon"><X size={18} /></span><h2 id="discard-title">Discard unsaved changes?</h2><p id="discard-description">Your edits have not been saved. Stay here to keep editing, or discard them and leave this screen.</p><div className="va-confirm-actions"><button type="button" className="va-secondary-button" autoFocus onClick={stayOnForm}>Stay</button><button type="button" className="va-destructive-button" onClick={discardFormChanges}>Discard changes</button></div></section></div>}
  </div>;
}
