import Link from '@/components/navigation/AppLink';
import { Phone, Mail, MapPin } from 'lucide-react';
import { PARTNERSHIP_DATA } from '../../lib/partnershipData';
import { TECHNOLOGY_CATEGORIES } from '../../lib/technologyCategoriesData';

const FOOTER_LINKS = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Technologies', path: '/technologies' },
  { label: 'Case Studies', path: '/case-study' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 lg:gap-10 xl:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/brand-logo.png"
                alt="Crescentek"
                className="h-10 w-auto"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="sr-only">Crescentek</h3>
            </div>
            <p className="text-warmgray text-sm leading-relaxed max-w-xs">
              Crescentek specialises in providing top-notch web design & development services, mobile app development
              services, and SEO services. Ever since our establishment in 2012, we have been offering digital solutions to
              businesses of all sizes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-gold mb-6">Navigation</p>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="ctk-footer-link text-warmgray text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Partnership */}
          <div>
            <p className="label-gold mb-6">Partnership</p>
            <div className="flex flex-col gap-3">
              {PARTNERSHIP_DATA.map((p) => (
                <Link
                  key={p.slug}
                  to={`/partnership/${p.slug}`}
                  className="ctk-footer-link text-warmgray text-sm transition-colors duration-300"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label-gold mb-6">Contact</p>
            <div className="flex flex-row gap-6 text-sm">
              <div>

              <div className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden />
                <div className="min-w-0">
                  <p className="text-ivory font-medium">Phone</p>
                  <a
                    href="tel:+919836900840"
                    className="mt-1 block text-warmgray leading-relaxed transition-colors duration-300 hover:text-gold"
                  >
                    +91 9836900840
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden />
                <div className="min-w-0">
                  <p className="text-ivory font-medium">Email</p>
                  <a
                    href="mailto:help@crescentek.com"
                    className="mt-1 block text-warmgray leading-relaxed transition-colors duration-300 hover:text-gold break-all"
                  >
                    help@crescentek.com
                  </a>
                </div>
              </div>
              </div>
              <div>

             
              </div>
            </div>
          </div>

          <div>
            <p className="label-gold mb-6">Address</p>
          <div className="flex gap-3 items-start pb-5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden />
                <div className="min-w-0">
                  <p className="text-ivory font-medium">Kolkata</p>
                  <p className="mt-1 text-warmgray leading-relaxed">
                    <span className="block">Godrej Genesis, Saltlake Sec V, Unit</span>
                    <span className="block">1505, Kolkata, West Bengal, 700091</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden />
                <div className="min-w-0">
                  <p className="text-ivory font-medium">Rajkot</p>
                  <p className="mt-1 text-warmgray leading-relaxed">
                    <span className="block">1207, The Spire, 150 Feet Ring Rd,</span>
                    <span className="block">Rajkot, Gujarat 360007</span>
                  </p>
                </div>
              </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warmgray text-xs">
            © {new Date().getFullYear()} Crescentek. All rights reserved.
          </p>
          <p className="text-warmgray text-xs">
            Crafted with precision.
          </p>
        </div>
      </div>

      <style>{`
        .ctk-footer-link {
          position: relative;
          width: fit-content;
          padding-bottom: 2px;
          transition: transform 220ms cubic-bezier(0.16,1,0.3,1), color 220ms ease, opacity 220ms ease;
          will-change: transform;
        }
        .ctk-footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(160,120,48,0.0), rgba(160,120,48,0.65), rgba(160,120,48,0.0));
          transform: scaleX(0);
          transform-origin: 50% 50%;
          transition: transform 240ms cubic-bezier(0.16,1,0.3,1);
          opacity: 0.9;
        }
        .ctk-footer-link:hover {
          color: #A07830;
          transform: translateX(2px);
        }
        .ctk-footer-link:hover::after {
          transform: scaleX(1);
        }
        .ctk-footer-link:active {
          transform: translateX(1px);
          opacity: 0.85;
        }

        .ctk-footer-cta {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #A07830;
          color: #0F0D08;
          box-shadow: 0 10px 26px rgba(0,0,0,0.22);
          transition: transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1), background-color 220ms ease, opacity 180ms ease;
          will-change: transform;
        }
        .ctk-footer-cta::before {
          content: "";
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 45%, transparent 70%);
          transform: translateX(-45%) rotate(12deg);
          transition: transform 520ms cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          opacity: 0.7;
        }
        .ctk-footer-cta:hover {
          transform: translateY(-2px);
          background: #B08535;
          box-shadow: 0 18px 44px rgba(160,120,48,0.22), 0 18px 44px rgba(0,0,0,0.28);
        }
        .ctk-footer-cta:hover::before {
          transform: translateX(40%) rotate(12deg);
        }
        .ctk-footer-cta:active {
          transform: translateY(-1px);
          box-shadow: 0 14px 34px rgba(0,0,0,0.26);
        }
        @media (hover: none) {
          .ctk-footer-cta:hover { transform: none; box-shadow: 0 10px 26px rgba(0,0,0,0.22); }
          .ctk-footer-cta:hover::before { transform: translateX(-45%) rotate(12deg); }
          .ctk-footer-cta:active { transform: translateY(-1px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctk-footer-cta,
          .ctk-footer-cta::before { transition: none !important; }
          .ctk-footer-link,
          .ctk-footer-link::after { transition: none !important; }
        }
      `}</style>
    </footer>
  );
}