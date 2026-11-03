import type { Metadata } from 'next';
import MobileMarketplace from '@/components/mobile-marketplace';

export const metadata: Metadata = {
  title: 'Sunday Malls | Buyer Marketplace',
  description: 'Wholesale, surplus, and bulk buying for Indian businesses.',
};

export default function MarketplacePage() {
  return <MobileMarketplace />;
}
