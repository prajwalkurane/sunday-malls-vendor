'use client';

import { ArrowLeft, Bell, BriefcaseBusiness, ChevronRight, Home, LayoutGrid, MessageSquareText, ShoppingBag, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function AppHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div>
          <p className="text-label uppercase tracking-[0.12em] text-text-soft">Sunday Malls</p>
          <h1 className="text-card-title font-semibold text-text">{title}</h1>
          {subtitle ? <p className="text-caption text-text-soft">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </header>
  );
}

export function BackHeader({ title, action }: { title: string; action?: ReactNode }) {
  const router = useRouter();

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <button type="button" aria-label="Go back" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-soft transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <h2 className="text-card-title font-semibold text-text">{title}</h2>
        </div>
        {action}
      </div>
    </header>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();
  const tabs = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Categories', icon: LayoutGrid, href: '/categories' },
    { label: 'Requirements', icon: BriefcaseBusiness, href: '/requirements' },
    { label: 'Orders', icon: ShoppingBag, href: '/orders' },
    { label: 'Profile', icon: UserRound, href: '/profile' },
  ];

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-1 px-2 py-2 sm:px-6">
        {tabs.map(({ label, icon: Icon, href }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return <Link key={label} href={href} className="flex-1 rounded-xl px-1 py-1.5 text-center transition-colors hover:bg-surface-alt">
            <div className={active ? 'relative mx-auto flex h-8 w-10 items-center justify-center rounded-xl bg-brand-navy/10' : 'relative mx-auto flex h-8 w-10 items-center justify-center rounded-xl'}>
              <Icon className={active ? 'h-5 w-5 text-brand-navy' : 'h-5 w-5 text-text-soft'} />
              {label === 'Requirements' ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-medium text-white">
                  3
                </span>
              ) : null}
            </div>
            <p className={active ? 'mt-1 text-[11px] font-semibold text-brand-navy' : 'mt-1 text-[11px] text-text-soft'}>{label}</p>
          </Link>;
        })}
      </div>
    </nav>
  );
}

export function TabsRow({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={active === tab ? 'rounded-full bg-brand-navy px-3 py-2 text-caption font-medium text-white' : 'rounded-full border border-border bg-white px-3 py-2 text-caption font-medium text-text-soft'}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function InfoStrip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <p className="text-caption text-text-soft">{label}</p>
      <p className="mt-1 text-body font-medium text-text">{value}</p>
    </div>
  );
}

export function NotificationBell() {
  return (
    <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-soft hover:bg-surface-alt">
      <Bell className="h-4 w-4" />
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
    </button>
  );
}

export function TopAction({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export function LabeledLink({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2">
      <span className="text-body text-text-soft">{label}</span>
      <span className="flex items-center gap-1 text-body font-medium text-text">
        {value}
        <ChevronRight className="h-4 w-4 text-text-soft" />
      </span>
    </div>
  );
}

export function StatusBadge({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' }) {
  const tones = {
    neutral: 'bg-surface-alt text-text-soft',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return <span className={`inline-flex rounded-full px-2 py-1 text-caption font-medium ${tones[tone]}`}>{label}</span>;
}

export function UtilityRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

export function SectionNote({ children }: { children: ReactNode }) {
  return <p className="text-caption text-text-soft">{children}</p>;
}

export function FilterAction() {
  return (
    <button type="button" className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-body text-text-soft">
      <MessageSquareText className="h-4 w-4" />
      Filter
    </button>
  );
}

export function EmptyOrdersState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white p-6 text-center">
      <ShoppingBag className="mx-auto h-8 w-8 text-text-soft" />
      <p className="mt-3 text-card-title font-semibold text-text">No orders yet</p>
      <p className="mt-1 text-body text-text-soft">Track active procurement and repeat orders here.</p>
    </div>
  );
}

export function ProfileRow({ label, value, badge }: { label: string; value: string; badge?: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2.5">
      <div>
        <p className="text-caption text-text-soft">{label}</p>
        <p className="mt-1 text-body font-medium text-text">{value}</p>
      </div>
      {badge ? <div>{badge}</div> : null}
    </div>
  );
}
