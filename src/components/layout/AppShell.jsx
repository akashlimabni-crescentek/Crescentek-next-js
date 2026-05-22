'use client';

import SiteLayout from './SiteLayout';

/** Client boundary: navbar, footer, preloader, and page content. */
export default function AppShell({ children }) {
  return <SiteLayout>{children}</SiteLayout>;
}
