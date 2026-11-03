'use client';

import {
  ArrowRight,
  Bell,
  ChevronRight,
  FolderOpen,
  Home,
  Package,
  Search,
  TrendingUp,
} from 'lucide-react';
import {
  AppHeader,
  BackHeader,
  BottomNavigation,
  TabsRow,
} from '@/components/layout/navigation';
import {
  Badge,
  Banner,
  Button,
  Checkbox,
  Chip,
  EmptyState,
  ErrorState,
  IconButton,
  InlineAlert,
  LoadingState,
  ProductSkeleton,
  QuantityStepper,
  Radio,
  SearchBar,
  SectionHeader,
  SegmentedControl,
  SuccessState,
  Switch,
  TextInput,
  Textarea,
  Toast,
} from '@/components/ui/primitives';
import { CategoryCard, RequirementCard, QuoteCard, OrderCard } from '@/components/business/requirements';
import { ProductCard, MOQBadge, BulkPrice, PriceTier } from '@/components/commerce/product-card';
import { SupplierCard } from '@/components/supplier/supplier-card';
import { products } from '@/data/products';
import { suppliers } from '@/data/suppliers';
import { categories } from '@/data/categories';
import { requirements } from '@/data/requirements';
import { quotes } from '@/data/quotes';
import { orders } from '@/data/orders';

export default function DesignSystemPage() {
  const primaryProduct = products[0];
  const primarySupplier = suppliers[0];

  return (
    <main className="min-h-screen bg-surface-page px-4 py-6 text-text sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <AppHeader
          title="Design System"
          subtitle="Sunday Malls • Internal QA"
          actions={
            <>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-soft">
                <Bell className="h-4 w-4" />
              </button>
              <button type="button" className="rounded-lg bg-brand-navy px-3 py-2 text-caption font-medium text-white">
                Publish
              </button>
            </>
          }
        />

        <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-label text-text-soft">Product foundation</p>
              <h2 className="mt-2 text-heading-m">Premium B2B marketplace UI</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone="success">Production ready</Badge>
              <Badge tone="gold">Mobile first</Badge>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Typography" />
              <div className="space-y-3">
                <p className="text-display">Display</p>
                <p className="text-heading-xl">Heading XL</p>
                <p className="text-heading-l">Heading L</p>
                <p className="text-heading-m">Heading M</p>
                <p className="text-section-title">Section Title</p>
                <p className="text-card-title">Card Title</p>
                <p className="text-body">Body text with readable hierarchy and comfortable line height.</p>
                <p className="text-body-small">Body small</p>
                <p className="text-caption">Caption and system labels</p>
                <p className="text-price">₹549 / unit</p>
                <p className="text-large-price">₹12,450</p>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Color tokens" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['brand-navy', '#0F172A'],
                  ['brand-blue', '#2F5DF6'],
                  ['brand-gold', '#D0A857'],
                  ['success', '#1F8A5F'],
                  ['warning', '#D17B00'],
                  ['danger', '#C24141'],
                  ['surface-page', '#F4F7FB'],
                  ['surface-alt', '#EDF2F7'],
                  ['text', '#1A2333'],
                  ['text-soft', '#5D697D'],
                ].map(([name, value]) => (
                  <div key={name} className="flex items-center gap-3 rounded-xl border border-border bg-surface-page p-3">
                    <div className="h-10 w-10 rounded-lg border border-border" style={{ backgroundColor: value }} />
                    <div>
                      <p className="text-caption uppercase tracking-[0.08em] text-text-soft">{name}</p>
                      <p className="text-body font-medium text-text">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Buttons" />
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="text">Text</Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Icon buttons" />
              <div className="flex flex-wrap gap-3">
                <IconButton aria-label="Home"><Home className="h-4 w-4" /></IconButton>
                <IconButton variant="primary" aria-label="Search"><Search className="h-4 w-4" /></IconButton>
                <IconButton variant="secondary" aria-label="Bell"><Bell className="h-4 w-4" /></IconButton>
                <IconButton variant="ghost" aria-label="Add"><ChevronRight className="h-4 w-4" /></IconButton>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Inputs & search" />
              <div className="space-y-4">
                <TextInput label="Business name" placeholder="Enter company name" />
                <Textarea label="Requirement notes" placeholder="Describe what you need" />
                <SearchBar value="Packaging" state="filled" />
                <SearchBar placeholder="Search suppliers" state="focused" />
                <SearchBar placeholder="Loading results" state="loading" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Checkbox label="GST registered" checked />
                  <Radio label="B2B account" checked />
                </div>
                <Switch checked />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Chips & badges" />
              <div className="flex flex-wrap gap-2">
                <Chip active>Packaging</Chip>
                <Chip>Electronics</Chip>
                <Chip>Storage</Chip>
                <Badge tone="success">Verified</Badge>
                <Badge tone="warning">Pending</Badge>
                <Badge tone="danger">Urgent</Badge>
                <Badge tone="gold">Gold supplier</Badge>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Cards & product" />
              <div className="grid gap-4 lg:grid-cols-2">
                <ProductCard product={primaryProduct} />
                <SupplierCard supplier={primarySupplier} />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="MOQ & bulk pricing" />
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <MOQBadge quantity={50} unit="boxes" />
                  <BulkPrice product={primaryProduct} />
                </div>
                <div className="space-y-2">
                  <PriceTier min={20} max={49} price={549} />
                  <PriceTier min={50} max={99} price={519} />
                  <PriceTier min={100} max={null} price={489} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Quantity stepper" />
              <QuantityStepper initialValue={48} min={20} />
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Alerts & feedback" />
              <div className="space-y-3">
                <InlineAlert title="Supplier quote received" description="Three quotes were added to your comparison tray." tone="info" />
                <SuccessState title="Order submitted" description="Your procurement request is now visible to verified suppliers." />
                <ErrorState title="Delivery window unavailable" description="This product is temporarily unavailable for the selected location." />
                <Toast title="Saved item added" description="Added to your shortlist" tone="success" />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Loading skeletons" />
              <div className="grid gap-3 md:grid-cols-3">
                <ProductSkeleton />
                <LoadingState title="Fetching supplier profile" />
                <ProductSkeleton />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Empty states" />
              <div className="grid gap-3 md:grid-cols-2">
                <EmptyState icon={<Search className="h-5 w-5" />} title="No search results" description="Try a different keyword or broaden your selection." action={<Button size="sm">Reset</Button>} />
                <EmptyState icon={<FolderOpen className="h-5 w-5" />} title="No requirements" description="Create a buying request to compare suppliers and quotes." action={<Button size="sm">Post requirement</Button>} />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Navigation" />
              <div className="space-y-4">
                <BackHeader title="Supplier details" action={<Button size="sm">Contact</Button>} />
                <BottomNavigation />
                <TabsRow tabs={['Overview', 'Pricing', 'Reviews', 'Info']} active="Pricing" onChange={() => undefined} />
                <SegmentedControl items={['Retail', 'Wholesale', 'Bulk']} value="Wholesale" onChange={() => undefined} />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Bottom sheets" />
              <div className="space-y-3">
                <Banner title="Active buyer request" description="Three shortlisted suppliers are ready for follow-up." action={<Button size="sm">Review</Button>} />
                <Button variant="outline">Open sheet</Button>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Quick actions" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Button className="justify-between"><span>Post requirement</span><ArrowRight className="h-4 w-4" /></Button>
                <Button variant="secondary" className="justify-between"><span>Compare prices</span><TrendingUp className="h-4 w-4" /></Button>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Requirements" />
              <div className="space-y-3">
                {requirements.map((requirement) => (
                  <RequirementCard key={requirement.id} requirement={requirement} />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Quotes" />
              <div className="space-y-3">
                {quotes.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Orders" />
              <div className="space-y-3">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <SectionHeader title="Categories" />
              <div className="space-y-3">
                {categories.map((category) => (
                  <CategoryCard key={category.id} icon={<Package className="h-5 w-5" />} name={category.name} description={category.description} count={category.count} />
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
