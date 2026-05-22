import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { COUNTRY_CODES } from '@/lib/countryCodes';

const MENU_WIDTH = 260;
const MENU_MAX_HEIGHT = 280;
const VIEWPORT_PADDING = 8;

export default function CountryCodePicker({
  value,
  onChange,
  tone = 'dark', // 'dark' (default, like Contact) | 'light' (for white inputs e.g. modals)
  buttonClassName,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, placement: 'bottom' });
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const selected = value || COUNTRY_CODES.find((c) => c.label === 'United States') || COUNTRY_CODES[0];

  const filtered = search
    ? COUNTRY_CODES.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search))
    : COUNTRY_CODES;

  const updatePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const spaceBelow = vh - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;
    const placeBelow = spaceBelow >= Math.min(MENU_MAX_HEIGHT, 200) || spaceBelow >= spaceAbove;

    let left = rect.left;
    if (left + MENU_WIDTH > vw - VIEWPORT_PADDING) {
      left = Math.max(VIEWPORT_PADDING, vw - MENU_WIDTH - VIEWPORT_PADDING);
    }

    const top = placeBelow ? rect.bottom + 4 : Math.max(VIEWPORT_PADDING, rect.top - 4);
    setMenuPos({ top, left, placement: placeBelow ? 'bottom' : 'top' });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      const wrapper = wrapperRef.current;
      const menu = menuRef.current;
      if (wrapper && wrapper.contains(e.target)) return;
      if (menu && menu.contains(e.target)) return;
      setOpen(false);
    };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const select = (country) => {
    onChange(country);
    setOpen(false);
    setSearch('');
  };

  const placement = menuPos.placement;

  return (
    <div ref={wrapperRef} className="relative flex-shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={
          buttonClassName
          || `flex items-center gap-1.5 py-3 pr-2 ${tone === 'light' ? 'text-[#1A1710]' : 'text-ivory'} text-sm outline-none cursor-pointer whitespace-nowrap`
        }
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-xs" style={{ color: '#A07830' }}>{selected.code}</span>
        <svg
          className="w-3 h-3 transition-transform"
          style={{ color: '#6B6456', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          className="rounded-xl overflow-hidden"
          style={{
            position: 'fixed',
            top: placement === 'bottom' ? menuPos.top : undefined,
            bottom: placement === 'top' ? `calc(100vh - ${menuPos.top}px)` : undefined,
            left: menuPos.left,
            width: MENU_WIDTH,
            maxHeight: MENU_MAX_HEIGHT,
            background: '#FAF7F2',
            border: '1px solid rgba(160,120,48,0.2)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 16px 40px rgba(26,23,16,0.15), 0 0 0 1px rgba(160,120,48,0.08)',
            zIndex: 250,
          }}
        >
          <div className="p-2" style={{ borderBottom: '1px solid rgba(160,120,48,0.12)' }}>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full text-xs px-3 py-1.5 rounded-lg outline-none"
              style={{ background: 'rgba(160,120,48,0.06)', color: '#1A1710', border: '1px solid rgba(160,120,48,0.15)' }}
            />
          </div>
          <div className="overflow-y-auto" style={{ flex: 1 }}>
            {filtered.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => select(c)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors"
                style={{
                  background: selected?.label === c.label ? 'rgba(160,120,48,0.1)' : 'transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(160,120,48,0.07)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = selected?.label === c.label ? 'rgba(160,120,48,0.1)' : 'transparent'; }}
              >
                <span className="text-base leading-none flex-shrink-0">{c.flag}</span>
                <span className="text-xs flex-1 truncate" style={{ color: '#1A1710' }}>{c.label}</span>
                <span className="text-xs flex-shrink-0" style={{ color: '#A07830' }}>{c.code}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-xs px-3 py-3" style={{ color: '#6B6456' }}>No results</p>}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
