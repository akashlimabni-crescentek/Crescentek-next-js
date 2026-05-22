import AppShell from '@/components/layout/AppShell';
import AllServices from '@/views/AllServices';
import { buildAllServicesMetadata } from '@/lib/servicesSeo';

export function generateMetadata() {
  return buildAllServicesMetadata();
}

export default function AllServicesPage() {
  return (
    <AppShell>
      <AllServices />
    </AppShell>
  );
}
