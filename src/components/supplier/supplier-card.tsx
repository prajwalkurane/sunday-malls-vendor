'use client';

import { Clock3, MapPin, Star } from 'lucide-react';
import type { Supplier } from '@/types/supplier';
import { Avatar, Badge, Card } from '@/components/ui/primitives';

export function SupplierAvatar({ supplier }: { supplier: Supplier }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={supplier.avatar} alt={supplier.name} size="lg" />
      <div>
        <p className="text-card-title font-semibold text-text">{supplier.company}</p>
        <p className="text-caption text-text-soft">{supplier.location}</p>
      </div>
    </div>
  );
}

export function SupplierVerification({ supplier }: { supplier: Supplier }) {
  if (!supplier.verified) return <Badge tone="warning">Pending verification</Badge>;
  return <Badge tone="success">Verified</Badge>;
}

export function SupplierRating({ supplier }: { supplier: Supplier }) {
  return (
    <div className="flex items-center gap-1 text-caption text-text-soft">
      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
      <span className="font-medium text-text">{supplier.rating}</span>
      <span>({supplier.reviews})</span>
    </div>
  );
}

export function SupplierLocation({ supplier }: { supplier: Supplier }) {
  return (
    <div className="flex items-center gap-1 text-caption text-text-soft">
      <MapPin className="h-3.5 w-3.5" />
      {supplier.location}
    </div>
  );
}

export function SupplierResponseTime({ supplier }: { supplier: Supplier }) {
  return (
    <div className="flex items-center gap-1 text-caption text-text-soft">
      <Clock3 className="h-3.5 w-3.5" />
      Response {supplier.responseTime}
    </div>
  );
}

export function SupplierStats({ supplier }: { supplier: Supplier }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-lg bg-surface-alt p-2 text-center">
        <p className="text-caption text-text-soft">Years</p>
        <p className="text-body font-semibold text-text">{supplier.yearsEstablished}</p>
      </div>
      <div className="rounded-lg bg-surface-alt p-2 text-center">
        <p className="text-caption text-text-soft">Volume</p>
        <p className="text-body font-semibold text-text">{supplier.monthlyVolume}</p>
      </div>
      <div className="rounded-lg bg-surface-alt p-2 text-center">
        <p className="text-caption text-text-soft">Gst</p>
        <p className="text-body font-semibold text-text">{supplier.gstRegistered ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <SupplierAvatar supplier={supplier} />
        <SupplierVerification supplier={supplier} />
      </div>

      <div className="flex items-center justify-between">
        <SupplierRating supplier={supplier} />
        <SupplierResponseTime supplier={supplier} />
      </div>

      <div className="flex flex-wrap gap-2">
        {supplier.specialties.map((specialty) => (
          <span key={specialty} className="rounded-full bg-surface-alt px-2 py-1 text-caption text-text-soft">{specialty}</span>
        ))}
      </div>

      <SupplierStats supplier={supplier} />
    </Card>
  );
}
