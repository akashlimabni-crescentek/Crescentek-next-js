import { headingFont, bodyFont } from '@/lib/fonts';
import { rootMetadata } from '@/lib/rootMetadata';
import '@/index.css';

export const metadata = rootMetadata;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
