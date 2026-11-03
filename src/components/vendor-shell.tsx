'use client';

import Image from 'next/image';
import type { FormEvent } from 'react';
import { Gem, Heart, House, MessageSquare, MoreHorizontal, Search, ShoppingBag, Tag } from 'lucide-react';

export type VendorTabId = 'home' | 'products' | 'orders' | 'enquiries' | 'more';

type VendorHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onHome: () => void;
  onSaved: () => void;
  onNotifications: () => void;
  onProfile: () => void;
};

export function VendorHeader({ query, onQueryChange, onSearch, onHome, onSaved, onNotifications, onProfile }: VendorHeaderProps) {
  return <header className="va-topbar">
    <div className="va-status-bar" aria-hidden="true">
      <time>06:54 PM</time>
      <svg viewBox="0 0 70 18">
        <path d="M2 14h2V8H2zm5 0h2V5H7zm5 0h2V2h-2z" fill="currentColor" />
        <path d="M28 14a8 8 0 0 1 16 0M31 14a5 5 0 0 1 10 0M35 14a1 1 0 0 1 2 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <rect x="51" y="4" width="17" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M69 7v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="53" y="6" width="12" height="6" rx="1" fill="currentColor" />
      </svg>
    </div>
    <div className="va-header-main">
      <button type="button" className="va-logo" aria-label="Sunday Malls home" onClick={onHome}>
        <Image src="/sunday-malls-logo.png" alt="Sunday Malls" width={82} height={39} priority />
      </button>
      <div className="va-top-actions">
        <button type="button" className="va-header-action" aria-label="Saved products" onClick={onSaved}><Heart size={20} /></button>
        <button type="button" className="va-header-action va-notify" aria-label="Notifications" onClick={onNotifications}><Gem size={20} /><i /></button>
        <button type="button" className="va-avatar" aria-label="Business profile" onClick={onProfile}>AR</button>
      </div>
    </div>
    <form className="va-global-search" role="search" onSubmit={onSearch}>
      <Search size={19} aria-hidden="true" />
      <input aria-label="Search orders, products, SKU or buyers" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search orders, products, SKU or buyers" />
    </form>
  </header>;
}

const tabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'products', label: 'Products', icon: Tag },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
  { id: 'more', label: 'More', icon: MoreHorizontal },
] as const;

export function VendorFooter({ activeScreen, hasNewOrders, onNavigate }: {
  activeScreen: string;
  hasNewOrders: boolean;
  onNavigate: (tab: VendorTabId) => void;
}) {
  return <nav className="va-bottom-nav" aria-label="Primary navigation">
    {tabs.map(({ id, label, icon: Icon }) => <button type="button" key={id} onClick={() => onNavigate(id)} className={activeScreen === id ? 'active' : ''}>
      <Icon size={20} strokeWidth={activeScreen === id ? 2.4 : 1.9} />
      <span>{label}</span>
      {id === 'orders' && hasNewOrders && <i />}
    </button>)}
  </nav>;
}