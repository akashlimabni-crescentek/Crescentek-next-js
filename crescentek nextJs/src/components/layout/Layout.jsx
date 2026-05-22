import { useState } from 'react';
import VisitorChat from '../VisitorChat.jsx';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import Preloader from '../effects/Preloader';
import CustomCursor from '../effects/CustomCursor';

export default function Layout() {
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
        <Outlet />
      </main>
      <Footer />
      <VisitorChat />
    </div>
  );
}