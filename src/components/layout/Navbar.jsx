import { useState, useEffect, useRef } from 'react';
import Link from '@/components/navigation/AppLink';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Brain,
  Code2,
  Smartphone,
  GitBranch,
  Palette,
  ShoppingCart,
  LayoutGrid,
  Megaphone,
  Cloud,
  Monitor,
  Layers,
  LineChart,
  Database,
  Users,
  ShieldCheck,
  TrendingUp,
  LifeBuoy,
} from 'lucide-react';
import { SERVICES_DATA } from '../../lib/servicesData';
import { getTechnologyMegaMenuColumns } from '../../lib/technologyCategoriesData';
import { PARTNERSHIP_DATA } from '../../lib/partnershipData';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/all-services' },
  { label: 'Technologies', path: '/technologies' },
  { label: 'Partnership', path: '/partnership' },
  { label: 'Case Studies', path: '/case-study' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const TECH_NAV_ICON_MAP = {
  ShoppingCart,
  Monitor,
  Layers,
  Smartphone,
  LayoutGrid,
  Cloud,
  Palette,
  LineChart,
  Database,
  Brain,
  Code2,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [technologiesOpen, setTechnologiesOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTechnologiesOpen, setMobileTechnologiesOpen] = useState(false);
  const [mobilePartnershipOpen, setMobilePartnershipOpen] = useState(false);
  const pathname = usePathname();
  const servicesCloseTimer = useRef(null);
  const technologiesCloseTimer = useRef(null);
  const partnershipCloseTimer = useRef(null);

  const ICON_MAP = {
    Code2,
    Smartphone,
    GitBranch,
    Palette,
    ShoppingCart,
    LayoutGrid,
    Megaphone,
    Brain,
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setTechnologiesOpen(false);
    setPartnershipOpen(false);
    setMobileServicesOpen(false);
    setMobileTechnologiesOpen(false);
    setMobilePartnershipOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const openServices = () => {
    if (servicesCloseTimer.current) {
      window.clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    if (servicesCloseTimer.current) window.clearTimeout(servicesCloseTimer.current);
    servicesCloseTimer.current = window.setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 200);
  };

  const openTechnologies = () => {
    if (technologiesCloseTimer.current) {
      window.clearTimeout(technologiesCloseTimer.current);
      technologiesCloseTimer.current = null;
    }
    setTechnologiesOpen(true);
  };

  const scheduleCloseTechnologies = () => {
    if (technologiesCloseTimer.current) window.clearTimeout(technologiesCloseTimer.current);
    technologiesCloseTimer.current = window.setTimeout(() => {
      setTechnologiesOpen(false);
      technologiesCloseTimer.current = null;
    }, 200);
  };

  const openPartnership = () => {
    if (partnershipCloseTimer.current) {
      window.clearTimeout(partnershipCloseTimer.current);
      partnershipCloseTimer.current = null;
    }
    setPartnershipOpen(true);
  };

  const scheduleClosePartnership = () => {
    if (partnershipCloseTimer.current) window.clearTimeout(partnershipCloseTimer.current);
    partnershipCloseTimer.current = window.setTimeout(() => {
      setPartnershipOpen(false);
      partnershipCloseTimer.current = null;
    }, 200);
  };

  const { left: techLeft, right: techRight } = getTechnologyMegaMenuColumns();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-surface-dark/80 backdrop-blur-xl border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand-logo.png"
              alt="Crescentek"
              className="h-9 w-auto"
              loading="eager"
              onError={(e) => {
                // graceful fallback if logo file missing
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* <span className="font-heading text-2xl text-ivory tracking-wide">
            Crescentek
            </span> */}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isServices = link.path === '/all-services';
              const isTechnologies = link.path === '/technologies';
              const isPartnership = link.path === '/partnership';

              if (isServices) {
                const isActive =
                  pathname === '/all-services' || pathname.startsWith('/services');
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <button
                      type="button"
                      className={`relative text-sm tracking-wide transition-colors duration-300 inline-flex items-center gap-1.5 ${
                        isActive ? 'text-gold' : 'text-warmgray hover:text-ivory'
                      }`}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      Services
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-gold animate-gold-line" />
                      )}
                    </button>

                    {servicesOpen && (
                      <div
                        className="fixed left-1/2 -translate-x-1/2 top-20 w-[min(100vw-2rem,760px)] rounded-2xl border border-gold/10 bg-surface-dark/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                        role="menu"
                        onMouseEnter={openServices}
                        onMouseLeave={scheduleCloseServices}
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-2">
                            {SERVICES_DATA.map((s) => {
                              const Icon = ICON_MAP[s.icon] || Code2;
                              return (
                                <Link
                                  key={s.slug}
                                  to={`/services/${s.slug}`}
                                  role="menuitem"
                                  className="ctk-svc-item group flex items-start gap-3 rounded-xl px-3 py-3 border border-transparent transition-all duration-200"
                                  style={{ minHeight: '56px' }}
                                  onClick={() => setServicesOpen(false)}
                                >
                                  <span
                                    className="ctk-svc-icon w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${s.accent}1F`, border: `1px solid ${s.accent}35` }}
                                    aria-hidden="true"
                                  >
                                    <Icon size={18} style={{ color: s.accent }} strokeWidth={1.8} />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm text-ivory font-medium leading-tight truncate">
                                      {s.title}
                                    </span>
                                    <span className="block text-xs text-warmgray mt-0.5">
                                      {s.shortDescription}
                                    </span>
                                  </span>
                                  <ChevronRight
                                    size={16}
                                    className="ctk-svc-arrow text-warmgray/60 flex-shrink-0 transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                  />
                                </Link>
                              );
                            })}
                          </div>

                          <div className="mt-5 pt-5 border-t border-gold/10 flex items-center justify-between">
                            <span className="text-xs text-warmgray">Explore everything we offer.</span>
                            <Link
                              to="/all-services"
                              role="menuitem"
                              className="text-sm text-gold hover:text-gold-hover transition-colors duration-200"
                              onClick={() => setServicesOpen(false)}
                            >
                              View all services →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (isTechnologies) {
                const isTechActive = pathname.startsWith('/technologies');
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openTechnologies}
                    onMouseLeave={scheduleCloseTechnologies}
                  >
                    <button
                      type="button"
                      className={`relative text-sm tracking-wide transition-colors duration-300 inline-flex items-center gap-1.5 ${
                        isTechActive ? 'text-gold' : 'text-warmgray hover:text-ivory'
                      }`}
                      aria-haspopup="menu"
                      aria-expanded={technologiesOpen}
                      onClick={() => setTechnologiesOpen((v) => !v)}
                    >
                      Technologies
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${technologiesOpen ? 'rotate-180' : ''}`}
                      />
                      {isTechActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-gold animate-gold-line" />
                      )}
                    </button>

                    {technologiesOpen && (
                      <div
                        className="fixed left-1/2 -translate-x-1/2 top-20 w-[min(100vw-2rem,820px)] rounded-2xl border border-gold/10 bg-surface-dark/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                        role="menu"
                        onMouseEnter={openTechnologies}
                        onMouseLeave={scheduleCloseTechnologies}
                      >
                        <div className="p-6 lg:p-7">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="space-y-1">
                              {techLeft.map((cat) => {
                                const TIcon = TECH_NAV_ICON_MAP[cat.icon] || Code2;
                                return (
                                  <Link
                                    key={cat.slug}
                                    to={`/technologies/${cat.slug}`}
                                    role="menuitem"
                                    className="ctk-tech-item group flex items-start gap-3 rounded-xl px-3 py-3 border border-transparent transition-all duration-200"
                                    style={{ minHeight: '56px' }}
                                    onClick={() => setTechnologiesOpen(false)}
                                  >
                                    <span
                                      className="ctk-tech-icon w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                      style={{
                                        background: `${cat.accent}24`,
                                        border: `1px solid ${cat.accent}40`,
                                      }}
                                      aria-hidden="true"
                                    >
                                      <TIcon size={18} style={{ color: cat.accent }} strokeWidth={1.8} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm text-ivory font-medium leading-tight">
                                        {cat.title}
                                      </span>
                                      <span className="block text-xs text-warmgray mt-0.5">
                                        {cat.navDescription}
                                      </span>
                                    </span>
                                    <ChevronRight
                                      size={16}
                                      className="text-warmgray/60 flex-shrink-0 transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="space-y-1 md:border-l md:border-gold/10 md:pl-8">
                              {techRight.map((cat) => {
                                const TIcon = TECH_NAV_ICON_MAP[cat.icon] || Code2;
                                return (
                                  <Link
                                    key={cat.slug}
                                    to={`/technologies/${cat.slug}`}
                                    role="menuitem"
                                    className="ctk-tech-item group flex items-start gap-3 rounded-xl px-3 py-3 border border-transparent transition-all duration-200"
                                    style={{ minHeight: '56px' }}
                                    onClick={() => setTechnologiesOpen(false)}
                                  >
                                    <span
                                      className="ctk-tech-icon w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                      style={{
                                        background: `${cat.accent}24`,
                                        border: `1px solid ${cat.accent}40`,
                                      }}
                                      aria-hidden="true"
                                    >
                                      <TIcon size={18} style={{ color: cat.accent }} strokeWidth={1.8} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm text-ivory font-medium leading-tight">
                                        {cat.title}
                                      </span>
                                      <span className="block text-xs text-warmgray mt-0.5">
                                        {cat.navDescription}
                                      </span>
                                    </span>
                                    <ChevronRight
                                      size={16}
                                      className="text-warmgray/60 flex-shrink-0 transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-5 pt-5 border-t border-gold/10 flex items-center justify-between gap-4">
                            <span className="text-xs text-warmgray">Deep dives on tools we use.</span>
                            <Link
                              to="/technologies"
                              role="menuitem"
                              className="text-sm text-gold hover:text-gold-hover transition-colors duration-200 shrink-0"
                              onClick={() => setTechnologiesOpen(false)}
                            >
                              View all technologies →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (isPartnership) {
                const isPartnerActive = pathname === '/partnership' || pathname.startsWith('/partnership/');
                const PartnerIconMap = { Users, ShieldCheck, TrendingUp, LifeBuoy };
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openPartnership}
                    onMouseLeave={scheduleClosePartnership}
                  >
                    <button
                      type="button"
                      className={`relative text-sm tracking-wide transition-colors duration-300 inline-flex items-center gap-1.5 ${
                        isPartnerActive ? 'text-gold' : 'text-warmgray hover:text-ivory'
                      }`}
                      aria-haspopup="menu"
                      aria-expanded={partnershipOpen}
                      onClick={() => setPartnershipOpen((v) => !v)}
                    >
                      Partnership
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${partnershipOpen ? 'rotate-180' : ''}`}
                      />
                      {isPartnerActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-gold animate-gold-line" />
                      )}
                    </button>

                    {partnershipOpen && (
                      <div
                        className="fixed left-1/2 -translate-x-1/2 top-20 w-[720px] rounded-2xl border border-gold/10 bg-surface-dark/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                        role="menu"
                        onMouseEnter={openPartnership}
                        onMouseLeave={scheduleClosePartnership}
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-2">
                            {PARTNERSHIP_DATA.map((p) => {
                              const Icon = PartnerIconMap[p.icon] || Users;
                              return (
                                <Link
                                  key={p.slug}
                                  to={`/partnership/${p.slug}`}
                                  role="menuitem"
                                  className="ctk-svc-item group flex items-start gap-3 rounded-xl px-3 py-3 border border-transparent transition-all duration-200"
                                  style={{ minHeight: '56px' }}
                                  onClick={() => setPartnershipOpen(false)}
                                >
                                  <span
                                    className="ctk-svc-icon w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${p.accent}1F`, border: `1px solid ${p.accent}35` }}
                                    aria-hidden="true"
                                  >
                                    <Icon size={18} style={{ color: p.accent }} strokeWidth={1.8} />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm text-ivory font-medium leading-tight truncate">
                                      {p.title}
                                    </span>
                                    <span className="block text-xs text-warmgray mt-0.5">
                                      {p.navDescription}
                                    </span>
                                  </span>
                                  <ChevronRight
                                    size={16}
                                    className="ctk-svc-arrow text-warmgray/60 flex-shrink-0 transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                  />
                                </Link>
                              );
                            })}
                          </div>

                          <div className="mt-5 pt-5 border-t border-gold/10 flex items-center justify-between">
                            <span className="text-xs text-warmgray">Explore partnership models.</span>
                            <Link
                              to="/partnership"
                              role="menuitem"
                              className="text-sm text-gold hover:text-gold-hover transition-colors duration-200"
                              onClick={() => setPartnershipOpen(false)}
                            >
                              View all →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.path;
              return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-warmgray hover:text-ivory'
                }`}
              >
                {link.label}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-px bg-gold animate-gold-line" />}
              </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden md:block text-sm px-4 lg:px-6 py-2.5 bg-gold text-surface-dark font-medium tracking-wide hover:bg-gold-hover transition-all duration-300 whitespace-nowrap"
          >
            Start a Project
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ivory"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-surface-dark flex flex-col items-center overflow-y-auto py-24 gap-6">
          <div className="flex flex-col items-center w-full gap-6">
          {NAV_LINKS.map((link) => {
            const isServices = link.path === '/all-services';
            const isTechnologies = link.path === '/technologies';
            const isPartnership = link.path === '/partnership';

            if (isServices) {
              return (
                <div key={link.path} className="w-full max-w-md px-6">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 font-heading text-3xl text-ivory transition-colors duration-300 hover:text-gold"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-panel"
                  >
                    Services
                    <ChevronDown
                      size={22}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div id="mobile-services-panel" className="mt-4 grid gap-2">
                      {SERVICES_DATA.map((s) => {
                        const Icon = ICON_MAP[s.icon] || Code2;
                        return (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="ctk-svc-item-mobile group rounded-xl border border-gold/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/7 hover:border-gold/20"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${s.accent}1F`, border: `1px solid ${s.accent}35` }}
                                aria-hidden="true"
                              >
                                <Icon size={18} style={{ color: s.accent }} strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm text-ivory font-medium truncate">{s.title}</div>
                                <div className="text-xs text-warmgray mt-0.5 line-clamp-2">{s.shortDescription}</div>
                              </div>
                              <ChevronRight
                                size={16}
                                className="text-warmgray/60 ml-auto transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </div>
                          </Link>
                        );
                      })}

                      <Link
                        to="/all-services"
                        className="mt-2 text-center text-sm text-gold hover:text-gold-hover transition-colors duration-200"
                      >
                        View all services →
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (isTechnologies) {
              const allTechCats = [...techLeft, ...techRight];
              return (
                <div key={link.path} className="w-full max-w-md px-6">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 font-heading text-3xl text-ivory transition-colors duration-300 hover:text-gold"
                    onClick={() => setMobileTechnologiesOpen((v) => !v)}
                    aria-expanded={mobileTechnologiesOpen}
                    aria-controls="mobile-technologies-panel"
                  >
                    Technologies
                    <ChevronDown
                      size={22}
                      className={`transition-transform duration-200 ${mobileTechnologiesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileTechnologiesOpen && (
                    <div id="mobile-technologies-panel" className="mt-4 grid gap-2">
                      {allTechCats.map((cat) => {
                        const TIcon = TECH_NAV_ICON_MAP[cat.icon] || Code2;
                        return (
                          <Link
                            key={cat.slug}
                            to={`/technologies/${cat.slug}`}
                            className="ctk-tech-item-mobile group rounded-xl border border-gold/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/7 hover:border-gold/20"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: `${cat.accent}24`, border: `1px solid ${cat.accent}40` }}
                                aria-hidden="true"
                              >
                                <TIcon size={18} style={{ color: cat.accent }} strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm text-ivory font-medium truncate">{cat.title}</div>
                                <div className="text-xs text-warmgray mt-0.5 line-clamp-2">{cat.navDescription}</div>
                              </div>
                              <ChevronRight
                                size={16}
                                className="text-warmgray/60 ml-auto transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </div>
                          </Link>
                        );
                      })}
                      <Link
                        to="/technologies"
                        className="mt-2 text-center text-sm text-gold hover:text-gold-hover transition-colors duration-200"
                      >
                        View all technologies →
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (isPartnership) {
              const PartnerIconMap = { Users, ShieldCheck, TrendingUp, LifeBuoy };
              return (
                <div key={link.path} className="w-full max-w-md px-6">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 font-heading text-3xl text-ivory transition-colors duration-300 hover:text-gold"
                    onClick={() => setMobilePartnershipOpen((v) => !v)}
                    aria-expanded={mobilePartnershipOpen}
                    aria-controls="mobile-partnership-panel"
                  >
                    Partnership
                    <ChevronDown
                      size={22}
                      className={`transition-transform duration-200 ${mobilePartnershipOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobilePartnershipOpen && (
                    <div id="mobile-partnership-panel" className="mt-4 grid gap-2">
                      {PARTNERSHIP_DATA.map((p) => {
                        const Icon = PartnerIconMap[p.icon] || Users;
                        return (
                          <Link
                            key={p.slug}
                            to={`/partnership/${p.slug}`}
                            className="ctk-svc-item-mobile group rounded-xl border border-gold/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/7 hover:border-gold/20"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${p.accent}1F`, border: `1px solid ${p.accent}35` }}
                                aria-hidden="true"
                              >
                                <Icon size={18} style={{ color: p.accent }} strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm text-ivory font-medium truncate">{p.title}</div>
                                <div className="text-xs text-warmgray mt-0.5 line-clamp-2">{p.navDescription}</div>
                              </div>
                              <ChevronRight
                                size={16}
                                className="text-warmgray/60 ml-auto transition-all duration-200 group-hover:text-ivory/80 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </div>
                          </Link>
                        );
                      })}

                      <Link
                        to="/partnership"
                        className="mt-2 text-center text-sm text-gold hover:text-gold-hover transition-colors duration-200"
                      >
                        View all →
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              pathname === link.path ||
              (link.path === '/' && pathname === '/');
            return (
            <Link
              key={link.path}
              to={link.path}
              className={`font-heading text-3xl transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-ivory'
              }`}
            >
              {link.label}
            </Link>
            );
          })}
          <Link
            to="/contact"
            className="mt-4 mb-8 px-8 py-3 bg-gold text-surface-dark font-medium tracking-wide text-lg"
          >
            Start a Project
          </Link>
          </div>
        </div>
      )}

      <style>{`
        .ctk-svc-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(160,120,48,0.22);
          box-shadow: 0 14px 40px rgba(0,0,0,0.28);
          transform: translateY(-1px);
        }
        .ctk-svc-item:active {
          transform: translateY(0px);
        }
        .ctk-svc-item:hover .ctk-svc-icon {
          box-shadow: 0 14px 36px rgba(0,0,0,0.30);
        }
        .ctk-svc-item-mobile:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(160,120,48,0.22);
          box-shadow: 0 14px 40px rgba(0,0,0,0.28);
          transform: translateY(-1px);
        }
        .ctk-svc-item-mobile:active {
          transform: translateY(0px);
        }
        .ctk-svc-item-mobile:hover span[aria-hidden="true"] {
          box-shadow: 0 14px 36px rgba(0,0,0,0.30);
        }
        .ctk-tech-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(160,120,48,0.22);
          box-shadow: 0 14px 40px rgba(0,0,0,0.28);
          transform: translateY(-1px);
        }
        .ctk-tech-item:active { transform: translateY(0px); }
        .ctk-tech-item:hover .ctk-tech-icon {
          box-shadow: 0 14px 36px rgba(0,0,0,0.30);
        }
        .ctk-tech-item-mobile:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(160,120,48,0.22);
          box-shadow: 0 14px 40px rgba(0,0,0,0.28);
          transform: translateY(-1px);
        }
        .ctk-tech-item-mobile:active { transform: translateY(0px); }
        @media (hover: none) {
          .ctk-svc-item:hover,
          .ctk-svc-item-mobile:hover,
          .ctk-tech-item:hover,
          .ctk-tech-item-mobile:hover {
            transform: none;
            box-shadow: none;
          }
          .ctk-svc-item:active,
          .ctk-svc-item-mobile:active,
          .ctk-tech-item:active,
          .ctk-tech-item-mobile:active {
            transform: translateY(-1px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-svc-item,
          .ctk-svc-item-mobile,
          .ctk-tech-item,
          .ctk-tech-item-mobile {
            transition: none !important;
          }
          .ctk-svc-item:hover,
          .ctk-svc-item-mobile:hover,
          .ctk-tech-item:hover,
          .ctk-tech-item-mobile:hover {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}