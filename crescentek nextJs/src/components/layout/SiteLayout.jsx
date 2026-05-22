'use client';

import { useState } from 'react';
import VisitorChat from '../VisitorChat.jsx';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from '../effects/Preloader';
import CustomCursor from '../effects/CustomCursor';

/** Site chrome shared by home, services, and other marketing pages. */
export default function SiteLayout({ children }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="min-h-screen bg-surface-dark" style={{ cursor: 'none' }}>
      <CustomCursor />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <Navbar />
      <main
        style={{
          opacity: preloaderDone ? 1 : 0,
          transform: preloaderDone ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {children}
      </main>
      <Footer />
      <VisitorChat />
    </div>
  );
}
