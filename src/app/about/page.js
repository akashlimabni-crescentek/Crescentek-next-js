import AppShell from '@/components/layout/AppShell';
import About from '@/views/About';
import { buildAboutMetadata } from '@/lib/aboutSeo';

export function generateMetadata() {
  return buildAboutMetadata();
}

export default function AboutPage() {
  return (
    <AppShell>
      <About />
    </AppShell>
  );
}
