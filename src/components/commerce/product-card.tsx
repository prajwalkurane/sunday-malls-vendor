'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Star } from 'lucide-react';
import type { Product } from '@/types/product';
import { Badge, Card, QuantityStepper } from '@/components/ui/primitives';

export function MOQBadge({ quantity, unit }: { quantity: number; unit: string }) {
  return <Badge tone="gold">MOQ {quantity}+ {unit}</Badge>;
}

export function BulkPrice({ product }: { product: Product }) {
  return <div className="rounded-lg bg-surface-alt px-3 py-2.5 text-caption text-text-soft">{product.priceTiers.map((tier) => <span key={`${tier.min}-${tier.max ?? 'max'}`} className="mr-3 whitespace-nowrap"><strong className="font-semibold text-text">{tier.min}+</strong> ₹{tier.price}</span>)}</div>;
}

export function PriceTier({ min, max, price }: { min: number; max: number | null; price: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2">
      <span className="text-caption text-text-soft">
        {min}–{max ?? '∞'} units
      </span>
      <span className="text-body font-medium text-text">₹{price}/unit</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden p-0 shadow-md">
      <div className="relative">
        <Image src={product.images[0].src} alt={product.images[0].alt} width={900} height={600} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.verified ? <Badge tone="success">Verified supplier</Badge> : null}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-caption text-text-soft">{product.brand}</p>
            <h4 className="mt-1 text-card-title font-semibold text-text"><Link href={`/products/${product.id}`} className="hover:text-brand-blue">{product.name}</Link></h4>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 border-y border-border py-3">
          <div>
            <p className="text-caption text-text-soft">Business price</p>
            <p className="text-large-price font-semibold text-brand-navy">₹{product.price}<span className="text-caption font-medium text-text-soft"> / {product.unit}</span></p>
          </div>
          <div className="rounded-lg bg-gold/10 px-2.5 py-2 text-right">
            <p className="text-caption text-text-soft">Minimum order</p>
            <p className="text-body font-semibold text-text">{product.minOrderQty} {product.unit}s</p>
          </div>
        </div>

        <BulkPrice product={product} />

        <div className="flex items-center justify-between gap-2 text-caption text-text-soft">
          <span className="flex min-w-0 items-center gap-1 truncate"><MapPin className="h-3.5 w-3.5 shrink-0" /> {product.brand} · {product.location}</span>
          <span className="flex shrink-0 items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {product.rating}</span>
        </div>
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <span className="flex flex-1 items-center gap-1 text-caption font-medium text-success"><CheckCircle2 className="h-3.5 w-3.5" /> GST verified</span>
          <Link href="/requirements/new" className="inline-flex h-9 items-center justify-center rounded-md px-2 text-xs font-medium text-brand-navy transition-colors hover:bg-surface-alt">Enquire</Link>
          <Link href="/cart" className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-brand-navy px-3 text-sm font-medium text-white transition-colors hover:bg-brand-blue">Add to cart</Link>
        </div>
      </div>
    </Card>
  );
}

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {product.images.map((image) => (
        <Image key={image.src} src={image.src} alt={image.alt} width={600} height={400} className="h-32 w-full rounded-xl object-cover" />
      ))}
    </div>
  );
}

export function QuantitySelector() {
  return <QuantityStepper initialValue={48} min={20} />;
}
