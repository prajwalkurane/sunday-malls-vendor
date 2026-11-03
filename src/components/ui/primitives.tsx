'use client';

import Image from 'next/image';
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Info,
  Microscope,
  Mic,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-brand-navy text-white hover:bg-navy-700 focus-visible:ring-brand-navy',
    secondary: 'bg-brand-blue text-white hover:bg-blue-700 focus-visible:ring-brand-blue',
    outline: 'border border-border bg-white text-text hover:bg-surface-alt focus-visible:ring-brand-blue',
    ghost: 'bg-transparent text-text hover:bg-surface-alt focus-visible:ring-brand-blue',
    danger: 'bg-danger text-white hover:bg-danger-700 focus-visible:ring-danger',
    text: 'bg-transparent text-brand-navy hover:bg-surface-alt focus-visible:ring-brand-blue',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({
  className,
  variant = 'outline',
  size = 'md',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const variantClasses = {
    primary: 'bg-brand-navy text-white',
    secondary: 'bg-brand-blue text-white',
    outline: 'border border-border bg-white text-text hover:bg-surface-alt',
    ghost: 'bg-transparent text-text hover:bg-surface-alt',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

interface BaseFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  leftSlot?: ReactNode;
}

export function TextInput({
  label,
  helperText,
  error,
  leftSlot,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & BaseFieldProps) {
  return (
    <label className="block w-full">
      {label ? <span className="mb-2 block text-label text-text-soft">{label}</span> : null}
      <div className={cn(
        'flex items-center gap-2 rounded-lg border border-border bg-white px-3 transition focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20',
        error ? 'border-danger bg-danger/5' : '',
      )}>
        {leftSlot}
        <input
          className={cn('h-11 w-full border-0 bg-transparent text-body text-text outline-none placeholder:text-muted', className)}
          {...props}
        />
      </div>
      {helperText ? <span className="mt-2 block text-caption text-text-soft">{helperText}</span> : null}
      {error ? <span className="mt-2 block text-caption text-danger">{error}</span> : null}
    </label>
  );
}

export function Textarea({
  label,
  helperText,
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps) {
  return (
    <label className="block w-full">
      {label ? <span className="mb-2 block text-label text-text-soft">{label}</span> : null}
      <textarea
        className={cn(
          'min-h-28 w-full resize-none rounded-lg border border-border bg-white px-3 py-3 text-body text-text outline-none transition placeholder:text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
          error ? 'border-danger bg-danger/5' : '',
          className,
        )}
        {...props}
      />
      {helperText ? <span className="mt-2 block text-caption text-text-soft">{helperText}</span> : null}
      {error ? <span className="mt-2 block text-caption text-danger">{error}</span> : null}
    </label>
  );
}

export function Select({
  label,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: ReactNode }) {
  return (
    <label className="block w-full">
      {label ? <span className="mb-2 block text-label text-text-soft">{label}</span> : null}
      <div className="relative">
        <select
          className={cn(
            'h-11 w-full appearance-none rounded-lg border border-border bg-white px-3 pr-10 text-body text-text outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
      </div>
    </label>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search products, suppliers, categories',
  state = 'default',
  className,
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  state?: 'default' | 'focused' | 'filled' | 'loading' | 'disabled';
  className?: string;
}) {
  const isDisabled = state === 'disabled';

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border bg-white px-3 transition-colors',
        state === 'focused' ? 'border-brand-blue ring-2 ring-brand-blue/20' : 'border-border',
        state === 'filled' ? 'border-brand-blue/60' : '',
        state === 'disabled' ? 'cursor-not-allowed bg-surface-alt text-text-soft' : '',
        className,
      )}
    >
      <Search className="h-4 w-4 text-text-soft" />
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={isDisabled}
        placeholder={placeholder}
        className="h-11 flex-1 border-0 bg-transparent text-body outline-none placeholder:text-muted disabled:cursor-not-allowed"
      />
      <div className="flex items-center gap-2">
        {state === 'loading' ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-blue border-t-transparent" />
        ) : (
          <>
            <button type="button" className="rounded-md p-1 text-text-soft hover:bg-surface-alt" aria-label="Voice search">
              <Mic className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-md p-1 text-text-soft hover:bg-surface-alt" aria-label="Scan search">
              <Microscope className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Checkbox({ label, checked = false, ...props }: { label: string; checked?: boolean } & Record<string, unknown>) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input type="checkbox" checked={checked} className="h-4 w-4 rounded border-border text-brand-navy" {...props} />
      <span className="text-body text-text">{label}</span>
    </label>
  );
}

export function Radio({ label, checked = false, ...props }: { label: string; checked?: boolean } & Record<string, unknown>) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input type="radio" checked={checked} className="h-4 w-4 border-border text-brand-navy" {...props} />
      <span className="text-body text-text">{label}</span>
    </label>
  );
}

export function Switch({ checked = false, onChange }: { checked?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      aria-label="Toggle switch"
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        checked ? 'bg-brand-blue' : 'bg-surface-alt',
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-5' : 'translate-x-1',
        )}
      />
    </button>
  );
}

export function Chip({ children, active = false, className }: { children: ReactNode; active?: boolean; className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1.5 text-caption font-medium transition-colors',
        active ? 'border-brand-blue bg-brand-blue/10 text-brand-navy' : 'border-border bg-white text-text-soft',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'gold';
}) {
  const tones = {
    neutral: 'bg-surface-alt text-text-soft',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
    gold: 'bg-gold/10 text-gold',
  };

  return <span className={cn('inline-flex items-center rounded-full px-2 py-1 text-caption font-medium', tones[tone])}>{children}</span>;
}

export function Avatar({ src, alt, initials, size = 'md' }: { src?: string; alt?: string; initials?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base' };

  if (src) {
    return <Image src={src} alt={alt ?? initials ?? 'profile'} width={64} height={64} className={cn('rounded-full object-cover', sizeMap[size])} />;
  }

  return (
    <div className={cn('flex items-center justify-center rounded-full bg-brand-blue/10 font-medium text-brand-navy', sizeMap[size])}>
      {initials ?? 'SM'}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-border', className)} />;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-xl border border-border bg-white p-4 shadow-sm', className)}>{children}</div>;
}

export function SectionHeader({ title, action, subtitle }: { title: string; action?: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h3 className="text-section-title text-text">{title}</h3>
        {subtitle ? <p className="mt-1 text-caption text-text-soft">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Tabs({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex gap-2 rounded-xl bg-surface-alt p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            'flex-1 rounded-lg px-3 py-2 text-caption font-medium transition-colors',
            value === tab ? 'bg-white text-brand-navy shadow-sm' : 'text-text-soft',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControl({ items, value, onChange }: { items: string[]; value: string; onChange: (item: string) => void }) {
  return (
    <div className="flex gap-2 rounded-xl border border-border bg-white p-1">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            'flex-1 rounded-lg px-3 py-2 text-caption font-medium transition-colors',
            value === item ? 'bg-brand-navy text-white' : 'text-text-soft',
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function Toast({ title, description, tone = 'success' }: { title: string; description?: string; tone?: 'success' | 'warning' | 'danger' }) {
  const toneClasses = {
    success: 'border-success/20 bg-success/5 text-success',
    warning: 'border-warning/20 bg-warning/5 text-warning',
    danger: 'border-danger/20 bg-danger/5 text-danger',
  };

  return (
    <div className={cn('flex items-start gap-3 rounded-xl border p-3', toneClasses[tone])}>
      <CheckCircle2 className="mt-0.5 h-5 w-5" />
      <div>
        <p className="text-body font-medium">{title}</p>
        {description ? <p className="mt-1 text-caption opacity-80">{description}</p> : null}
      </div>
    </div>
  );
}

export function Banner({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-3">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 text-brand-blue" />
        <div>
          <p className="text-body font-medium text-text">{title}</p>
          {description ? <p className="text-caption text-text-soft">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}

export function InlineAlert({
  title,
  description,
  tone = 'info',
}: {
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
}) {
  const toneClasses = {
    info: 'bg-surface-alt text-text',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <div className={cn('flex items-start gap-3 rounded-lg p-3', toneClasses[tone])}>
      <Info className="mt-0.5 h-4 w-4" />
      <div>
        <p className="text-body font-medium">{title}</p>
        {description ? <p className="mt-1 text-caption opacity-80">{description}</p> : null}
      </div>
    </div>
  );
}

export function SuccessState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-success/20 bg-success/5 p-8 text-center">
      <CheckCircle2 className="h-10 w-10 text-success" />
      <h4 className="mt-3 text-card-title text-text">{title}</h4>
      {description ? <p className="mt-2 max-w-xs text-body text-text-soft">{description}</p> : null}
    </div>
  );
}

export function ErrorState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-danger/20 bg-danger/5 p-8 text-center">
      <AlertCircle className="h-10 w-10 text-danger" />
      <h4 className="mt-3 text-card-title text-text">{title}</h4>
      {description ? <p className="mt-2 max-w-xs text-body text-text-soft">{description}</p> : null}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-alt text-brand-navy">{icon}</div>
      <h4 className="mt-4 text-card-title text-text">{title}</h4>
      <p className="mt-2 max-w-xs text-body text-text-soft">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ title = 'Loading catalogue' }: { title?: string }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-4">
      <div className="h-4 w-24 animate-pulse rounded bg-surface-alt" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-28 animate-pulse rounded-xl bg-surface-alt" />
        <div className="h-28 animate-pulse rounded-xl bg-surface-alt" />
      </div>
      <p className="text-caption text-text-soft">{title}</p>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-white p-3">
      <div className="h-28 animate-pulse rounded-lg bg-surface-alt" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-surface-alt" />
      <div className="h-3 w-1/2 animate-pulse rounded bg-surface-alt" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-surface-alt" />
    </div>
  );
}

export function SkeletonRow() {
  return <div className="h-3 animate-pulse rounded bg-surface-alt" />;
}

export function Modal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-card-title text-text">{title}</h3>
          <button type="button" onClick={() => onOpenChange(false)} className="rounded-md p-1 hover:bg-surface-alt">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function BottomSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/40">
      <div className="w-full rounded-t-2xl bg-white p-4 shadow-lg">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-surface-alt" />
        <button type="button" onClick={() => onOpenChange(false)} className="mb-4 ml-auto block rounded-md p-1 hover:bg-surface-alt">
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function Dropdown({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-border bg-white p-2 shadow-sm">{children}</div>;
}

export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
      <span className="text-caption font-medium text-text">{value.toFixed(1)}</span>
    </div>
  );
}

export function QuantityStepper({ initialValue = 1, min = 1, onChange }: { initialValue?: number; min?: number; onChange?: (value: number) => void }) {
  const [value, setValue] = useState(initialValue);
  const updateValue = (nextValue: number) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-white p-1">
      <button type="button" aria-label="Decrease quantity" onClick={() => updateValue(Math.max(min, value - 1))} className="rounded-md p-1.5 hover:bg-surface-alt">
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-8 text-center text-body font-medium">{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => updateValue(value + 1)} className="rounded-md p-1.5 hover:bg-surface-alt">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function AppLabel({ children }: { children: ReactNode }) {
  return <span className="text-label uppercase tracking-[0.12em] text-text-soft">{children}</span>;
}

export function DotPattern() {
  return useMemo(
    () => (
      <svg className="h-8 w-8" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="2" cy="2" r="1.2" fill="currentColor" fillOpacity="0.18" />
        <circle cx="8" cy="2" r="1.2" fill="currentColor" fillOpacity="0.12" />
        <circle cx="14" cy="2" r="1.2" fill="currentColor" fillOpacity="0.18" />
        <circle cx="2" cy="8" r="1.2" fill="currentColor" fillOpacity="0.12" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" fillOpacity="0.18" />
        <circle cx="14" cy="8" r="1.2" fill="currentColor" fillOpacity="0.12" />
      </svg>
    ),
    [],
  );
}

export function SettingRow({ label, value, trailing }: { label: string; value?: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-3 py-2">
      <div>
        <p className="text-body text-text">{label}</p>
        {value ? <p className="text-caption text-text-soft">{value}</p> : null}
      </div>
      {trailing}
    </div>
  );
}

export function InlineIconButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button type="button" className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-body text-text">
      {icon}
      {label}
    </button>
  );
}

export function PricePill({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="rounded-lg bg-brand-blue/5 px-2 py-1.5 text-center">
      <p className="text-caption text-text-soft">{label}</p>
      <p className="mt-0.5 text-body font-semibold text-text">{amount}</p>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-section-title text-text">{children}</h2>;
}

export function StepBadge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-brand-blue/10 px-2 py-1 text-caption font-medium text-brand-navy">{children}</span>;
}

export function FilterChip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-caption font-medium',
        active ? 'border-brand-navy bg-brand-navy text-white' : 'border-border bg-white text-text-soft',
      )}
    >
      {children}
    </button>
  );
}

export function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-sm font-semibold text-white">S</div>
      <div>
        <p className="text-label uppercase tracking-[0.12em] text-text-soft">Sunday</p>
        <p className="text-card-title font-semibold text-text">Malls</p>
      </div>
    </div>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 md:grid-cols-2">{children}</div>;
}

export function DataPill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-surface-alt px-2.5 py-1 text-caption font-medium text-text">{children}</span>;
}

export function VerifiedPill() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-caption font-medium text-success">
      <ShieldCheck className="h-3.5 w-3.5" />
      Verified
    </span>
  );
}

export function QuickAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button type="button" className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-3 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-alt text-brand-navy">{icon}</div>
      <span className="text-caption text-text-soft">{label}</span>
    </button>
  );
}

export function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <p className="text-caption text-text-soft">{label}</p>
      <p className="mt-1 text-card-title font-semibold text-text">{value}</p>
    </div>
  );
}

export const fieldStyles = 'h-11 rounded-lg border border-border bg-white px-3 text-body text-text outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20';

export const iconButtonBase = 'inline-flex items-center justify-center rounded-md border border-border bg-white text-text-soft transition hover:bg-surface-alt';

export { cn, Check, ChevronRight, ArrowRight, SlidersHorizontal, Search, Plus, Minus, X, AlertCircle, CheckCircle2, Info, Star, ShieldCheck };
