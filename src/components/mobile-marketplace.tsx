'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from 'next/image';
import { useState } from 'react';
import {
  Bell, BriefcaseBusiness, CheckCircle2, ChevronDown, ChevronRight, ClipboardList,
  Home, LayoutGrid, MapPin, Package, Plus, Search, ShoppingBag, ShoppingCart,
  SlidersHorizontal, Sparkles, Truck, UserRound, Wallet, X,
} from 'lucide-react';
import { requirements } from '@/data/requirements';
import { orders } from '@/data/orders';

const categoryItems = [
  ['Electronics', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'],
  ['Fashion & Apparel', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80'],
  ['Home & Kitchen', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80'],
  ['Grocery', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80'],
  ['Beauty', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80'],
  ['Health', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80'],
  ['Industrial', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=500&q=80'],
  ['Office Supplies', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80'],
  ['Packaging', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80'],
  ['Automotive', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=500&q=80'],
  ['Sports', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80'],
  ['Travel', 'Wholesale catalogue', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80'],
] as const;

const productImage = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80';
const navItems = [
  { label: 'Home', icon: Home },
  { label: 'Categories', icon: LayoutGrid },
  { label: 'Requirements', icon: ClipboardList },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Profile', icon: UserRound },
];

function IconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <button type="button" aria-label={label} onClick={onClick} className="sm-icon-button">{children}</button>;
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return <div className="sm-section-heading"><h2>{title}</h2>{action ? <button type="button" className="sm-text-action">{action}<ChevronRight size={15} /></button> : null}</div>;
}

function SearchControl({ value, onChange, placeholder = 'Search products, brands, SKU or suppliers' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="sm-search"><Search size={19} aria-hidden="true" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /><button type="button" aria-label="Voice search" className="sm-search-icon"><span className="sm-mic-mark">•••</span></button><button type="button" aria-label="Scan product" className="sm-search-icon"><SlidersHorizontal size={17} /></button></label>;
}

function BottomNavigation({ active, onChange }: { active: number; onChange: (index: number) => void }) {
  return <nav className="sm-bottom-nav" aria-label="Primary navigation">{navItems.map(({ label, icon: Icon }, index) => <button type="button" key={label} onClick={() => onChange(index)} className={active === index ? 'is-active' : ''}><span className="sm-nav-icon"><Icon size={20} />{label === 'Requirements' ? <b>3</b> : null}</span><span>{label}</span></button>)}</nav>;
}
function Header({ onProfile, onCart }: { onProfile: () => void; onCart: () => void }) {
  return <header className="sm-header"><div className="sm-brand"><span className="sm-brand-mark">S</span><span>SUNDAY <strong>MALLS</strong></span></div><div className="sm-header-actions"><IconButton label="Notifications"><Bell size={19} /></IconButton><IconButton label="Cart" onClick={onCart}><ShoppingCart size={19} /><b className="sm-cart-count">2</b></IconButton><button type="button" aria-label="Business profile" onClick={onProfile} className="sm-avatar">ST</button></div></header>;
}

function BusinessContext() {
  return <button type="button" className="sm-business-context"><div><span className="sm-eyebrow">Buying for</span><strong>Shree Traders <ChevronDown size={15} /></strong><small><MapPin size={13} /> Kolhapur, Maharashtra</small></div><span className="sm-verified"><CheckCircle2 size={15} /> GST verified</span></button>;
}

function QuickActions({ onRequirement }: { onRequirement: () => void }) {
  const actions = [{ label: 'Bulk Buy', icon: Package }, { label: 'Post Requirement', icon: ClipboardList }, { label: 'Best Deals', icon: Sparkles }, { label: 'Verified Suppliers', icon: CheckCircle2 }];
  return <div className="sm-quick-actions">{actions.map(({ label, icon: Icon }) => <button type="button" key={label} onClick={label === 'Post Requirement' ? onRequirement : undefined} className={label === 'Post Requirement' ? 'is-emphasis' : ''}><span><Icon size={19} /></span><strong>{label}</strong></button>)}</div>;
}

function DealCard() {
  return <article className="sm-deal-card"><Image src={productImage} alt="Wholesale travel luggage" fill sizes="393px" priority /><div className="sm-deal-overlay" /><div className="sm-deal-content"><span className="sm-eyebrow">DEAL OF THE DAY</span><h2>Wholesale Travel Essentials</h2><p>Bulk pricing from <strong>₹499</strong> <i /> MOQ from 10 units</p><button type="button" className="sm-amber-button">Explore deals <ChevronRight size={16} /></button></div></article>;
}

function HomeScreen({ goTo }: { goTo: (index: number) => void }) {
  const [query, setQuery] = useState('');
  return <><Header onProfile={() => goTo(4)} onCart={() => goTo(3)} /><div className="sm-home-content"><BusinessContext /><SearchControl value={query} onChange={setQuery} /><div className="sm-chips">{['Office chairs', 'Packaging boxes', 'LED lights'].map((chip) => <button type="button" key={chip} onClick={() => setQuery(chip)}>{chip}</button>)}</div><QuickActions onRequirement={() => goTo(2)} /><div className="sm-insight"><Sparkles size={18} /><div><strong>Good morning, Shree Traders</strong><span>3 opportunities match your recent purchases</span></div></div><article className="sm-profile-card"><div><span className="sm-eyebrow">BUSINESS PROFILE</span><h2>Complete your business profile</h2><p>Unlock better pricing and faster checkout.</p></div><button type="button" className="sm-outline-button" onClick={() => goTo(4)}>Update now</button><div className="sm-progress"><span /><b>60%</b></div></article><DealCard /><SectionHeading title="Shop by category" action="View all" /><div className="sm-category-scroller">{categoryItems.slice(0, 6).map(([name, subtitle, image]) => <button type="button" key={name} onClick={() => goTo(1)}><span className="sm-category-image"><Image src={image} alt="" fill sizes="104px" /></span><strong>{name}</strong></button>)}</div><SectionHeading title="Best bulk deals" action="View all" /><div className="sm-product-card"><Image src={productImage} alt="Travel backpack" width={720} height={520} /><div className="sm-product-info"><span className="sm-eyebrow">METRO WHOLESALE HUB · PUNE</span><h3>Premium Travel Backpack</h3><div className="sm-price-row"><strong>₹549 <small>/ unit</small></strong><span>MOQ 20 units</span></div><div className="sm-tiers"><b>50+ ₹519</b><b>100+ ₹489</b></div><span className="sm-supplier"><CheckCircle2 size={15} /> Verified supplier</span><button type="button" className="sm-navy-button">Add to cart</button></div></div><SectionHeading title="Buy again" action="View all" /><div className="sm-reorder-row"><div className="sm-reorder-thumb"><Image src={productImage} alt="Premium packaging kit" fill sizes="64px" /></div><div><strong>Premium Packaging Kit</strong><span>Last purchased 3 weeks ago</span></div><button type="button" className="sm-outline-button">Reorder</button></div></div></>;
}

function CategoriesScreen() {
  const [query, setQuery] = useState('');
  const visible = categoryItems.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  return <><div className="sm-inner-header"><h1>Categories</h1><IconButton label="Clear search" onClick={() => setQuery('')}><X size={19} /></IconButton></div><div className="sm-screen-content"><SearchControl value={query} onChange={setQuery} placeholder="Search categories or products" /><SectionHeading title="Popular categories" /><div className="sm-category-grid">{visible.map(([name, subtitle, image]) => <button type="button" key={name} onClick={() => setQuery(name)}><span className="sm-category-image"><Image src={image} alt="" fill sizes="104px" /></span><strong>{name}</strong><small>{subtitle}</small></button>)}</div><div className="sm-filter-chips">{['Low MOQ', 'Best bulk price', 'New suppliers', 'Trending categories'].map((label) => <button type="button" key={label} onClick={() => setQuery(label)}>{label}</button>)}</div></div></>;
}

function RequirementsScreen() {
  const [tab, setTab] = useState('Active');
  return <><div className="sm-inner-header"><div><span className="sm-eyebrow">PROCUREMENT</span><h1>Requirements</h1></div><button type="button" className="sm-header-plus"><Plus size={19} /> Post Requirement</button></div><div className="sm-screen-content"><div className="sm-tabs">{['Active', 'Quotes received', 'Closed'].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={tab === item ? 'is-active' : ''}>{item}</button>)}</div><div className="sm-requirement-list">{requirements.map((item) => <article className="sm-requirement-card" key={item.id}><div className="sm-card-top"><span className="sm-status"><span /> {tab === 'Active' ? 'Active' : tab}</span><small>{item.postedAt}</small></div><span className="sm-eyebrow">{item.category}</span><h2>{item.title}</h2><div className="sm-requirement-meta"><span><strong>{item.quantity}</strong> quantity</span><span><strong>{item.budget}</strong> budget</span><span><MapPin size={14} /> {item.location}</span></div><button type="button" className="sm-navy-button">View {item.responses} quotes <ChevronRight size={16} /></button></article>)}</div></div></>;
}

function OrdersScreen() {
  const [tab, setTab] = useState('Active');
  return <><div className="sm-inner-header"><h1>Orders</h1><IconButton label="Filter"><SlidersHorizontal size={19} /></IconButton></div><div className="sm-screen-content"><div className="sm-tabs">{['Active', 'Completed', 'Cancelled'].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={tab === item ? 'is-active' : ''}>{item}</button>)}</div><div className="sm-order-list">{orders.slice(0, 3).map((order) => <article className="sm-order-card" key={order.id}><div className="sm-card-top"><span className="sm-eyebrow">ORDER {order.id}</span><span className="sm-status sm-status-blue">{tab === 'Active' ? order.status : tab}</span></div><h2>{order.supplierName}</h2><p>{order.productName}</p><div className="sm-order-total"><span>{order.quantity} units</span><strong>₹{order.amount.toLocaleString('en-IN')}</strong></div><button type="button" className="sm-outline-button"><Truck size={15} /> Track order</button></article>)}</div></div></>;
}

function ProfileScreen() {
  return <><div className="sm-profile-hero"><div className="sm-avatar sm-avatar-large">ST</div><div><span className="sm-eyebrow">BUSINESS ACCOUNT</span><h1>Shree Traders</h1><p>GSTIN: 27AABCS1234F1Z5</p></div><IconButton label="Edit profile"><ChevronRight size={19} /></IconButton></div><div className="sm-screen-content"><article className="sm-profile-score"><div><span className="sm-eyebrow">PROFILE COMPLETION</span><strong>60%</strong></div><div className="sm-progress"><span /></div><p>Add your business details to unlock better wholesale pricing.</p></article><div className="sm-profile-links">{[['My Business', BriefcaseBusiness], ['Payment Methods', Wallet], ['Address Book', MapPin], ['Settings', SlidersHorizontal]].map(([label, Icon]) => <button type="button" key={label as string}><span><Icon size={19} /></span><strong>{label as string}</strong><ChevronRight size={17} /></button>)}</div><button type="button" className="sm-logout">Log out</button></div></>;
}

export default function MobileMarketplace() {
  const [active, setActive] = useState(0);
  const screens = [<HomeScreen key="home" goTo={setActive} />, <CategoriesScreen key="categories" />, <RequirementsScreen key="requirements" />, <OrdersScreen key="orders" />, <ProfileScreen key="profile" />];
  return <main className="sm-app"><div className="sm-phone-shell"><div className="sm-status-bar"><span>9:41</span><span>● ● ▰</span></div><div className="sm-screen">{screens[active]}</div><BottomNavigation active={active} onChange={setActive} /></div></main>;
}
