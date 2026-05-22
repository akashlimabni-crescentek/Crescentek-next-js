import AppShell from '@/components/layout/AppShell';
import Work from '@/views/Work';
import { buildWorkMetadata } from '@/lib/workSeo';

export function generateMetadata() {
  return buildWorkMetadata();
}

export default function WorkPage() {
  return (
    <AppShell>
      <Work />
    </AppShell>
  );
}
