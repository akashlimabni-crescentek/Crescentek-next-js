import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';

export const metadata = {
  title: 'Page not found | Crescentek',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <AppShell>
      <div className="min-h-[60vh] bg-surface flex flex-col items-center justify-center text-center px-6">
        <span className="font-heading text-8xl text-gold/20 font-light">404</span>
        <h1 className="mt-4 font-heading text-3xl font-light text-ivory">Page not found</h1>
        <p className="mt-3 text-sm text-muted-warm">The page you requested does not exist.</p>
        <Link
          href="/"
          className="mt-8 text-sm tracking-wide text-gold hover:text-gold-hover transition-colors"
        >
          Back to home
        </Link>
      </div>
    </AppShell>
  );
}
