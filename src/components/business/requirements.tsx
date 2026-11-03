import type { ReactNode } from 'react';
import { CalendarClock, MapPin, Sparkles } from 'lucide-react';
import { Badge, Card } from '@/components/ui/primitives';
import type { Order } from '@/types/order';
import type { Quote } from '@/types/quote';
import type { Requirement } from '@/types/requirement';

export function RequirementCard({ requirement }: { requirement: Requirement }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-caption text-text-soft">{requirement.category}</p>
          <h4 className="mt-1 text-card-title font-semibold text-text">{requirement.title}</h4>
        </div>
        <Badge tone={requirement.urgency === 'High' ? 'danger' : requirement.urgency === 'Medium' ? 'warning' : 'success'}>
          {requirement.urgency}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-caption text-text-soft">
        <div>
          <p>Quantity</p>
          <p className="mt-1 font-medium text-text">{requirement.quantity}</p>
        </div>
        <div>
          <p>Budget</p>
          <p className="mt-1 font-medium text-text">{requirement.budget}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-caption text-text-soft">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {requirement.location}</span>
        <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {requirement.postedAt}</span>
      </div>
    </Card>
  );
}

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-caption text-text-soft">{quote.supplierName}</p>
          <h4 className="mt-1 text-card-title font-semibold text-text">{quote.productName}</h4>
        </div>
        {quote.isPreferred ? <Badge tone="success">Preferred</Badge> : null}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-caption text-text-soft">Quoted</p>
          <p className="text-large-price text-text">₹{quote.price}</p>
        </div>
        <div className="text-right">
          <p className="text-caption text-text-soft">MOQ</p>
          <p className="text-body font-medium text-text">{quote.moq} units</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-caption text-text-soft">
        <span>Lead time: {quote.leadTime}</span>
        <span>Valid {quote.validity}</span>
      </div>
    </Card>
  );
}

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-caption text-text-soft">{order.supplierName}</p>
          <h4 className="mt-1 text-card-title font-semibold text-text">{order.productName}</h4>
        </div>
        <Badge tone="neutral">{order.status}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-caption text-text-soft">
        <div>
          <p>Qty</p>
          <p className="mt-1 font-medium text-text">{order.quantity}</p>
        </div>
        <div>
          <p>Amount</p>
          <p className="mt-1 font-medium text-text">₹{order.amount}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-caption text-text-soft">
        <span>{order.orderDate}</span>
        <span>{order.eta}</span>
      </div>
    </Card>
  );
}

export function ReorderCard({ order }: { order: Order }) {
  return (
    <Card className="flex items-center justify-between gap-3">
      <div>
        <p className="text-caption text-text-soft">Repeat order</p>
        <h4 className="text-card-title font-semibold text-text">{order.productName}</h4>
      </div>
      <button type="button" className="rounded-lg bg-brand-navy px-3 py-2 text-caption font-medium text-white">Reorder</button>
    </Card>
  );
}

export function CategoryCard({ icon, name, description, count }: { icon: ReactNode; name: string; description: string; count: number }) {
  return (
    <Card className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-navy">{icon}</div>
        <div>
          <h4 className="text-card-title font-semibold text-text">{name}</h4>
          <p className="text-caption text-text-soft">{description}</p>
        </div>
      </div>
      <span className="rounded-full bg-surface-alt px-2 py-1 text-caption text-text-soft">{count}</span>
    </Card>
  );
}

export function BusinessSummary({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-label text-text-soft">Business</p>
          <h3 className="mt-2 text-card-title font-semibold text-text">{title}</h3>
          <p className="mt-1 text-caption text-text-soft">{subtitle}</p>
        </div>
        {action}
      </div>
    </div>
  );
}

export function EmptyCollection({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white p-6 text-center">
      <Sparkles className="mx-auto h-8 w-8 text-text-soft" />
      <p className="mt-3 text-card-title font-semibold text-text">{title}</p>
      <p className="mt-1 text-body text-text-soft">{description}</p>
    </div>
  );
}
