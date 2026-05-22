import AppShell from '@/components/layout/AppShell';
import Partnership from '@/views/Partnership';
import { buildPartnershipHubMetadata } from '@/lib/partnershipSeo';

export function generateMetadata() {
  return buildPartnershipHubMetadata();
}

export default function PartnershipPage() {
  return (
    <AppShell>
      <Partnership />
    </AppShell>
  );
}
