'use client';

import { forwardRef } from 'react';
import NextLink from 'next/link';

/**
 * Drop-in for react-router-dom Link (`to` prop) using Next.js routing.
 */
const AppLink = forwardRef(function AppLink(
  { to, href, children, className, ...props },
  ref
) {
  const path = href ?? to ?? '/';
  return (
    <NextLink ref={ref} href={path} className={className} {...props}>
      {children}
    </NextLink>
  );
});

export default AppLink;
