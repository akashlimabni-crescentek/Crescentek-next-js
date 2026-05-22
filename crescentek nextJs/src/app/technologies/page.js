import AppShell from '@/components/layout/AppShell';
import Technologies from '@/views/Technologies';
import { buildTechnologiesHubMetadata } from '@/lib/technologiesSeo';

export function generateMetadata() {
  return buildTechnologiesHubMetadata();
}

export default function TechnologiesPage() {
  return (
    <AppShell>
      <Technologies />
    </AppShell>
  );
}
