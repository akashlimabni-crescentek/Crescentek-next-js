'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { normalizePickerOptions } from '@/lib/contactFormOptions';
import { useFloatingPicker } from '@/components/forms/useFloatingPicker';

const MENU_MAX_HEIGHT = 280;

/**
 * Themed dropdown matching CountryCodePicker (portal menu, button trigger, custom cursor).
 */
export default function FormSelectPicker({
  value = '',
  onChange,
  options = [],
  placeholder = 'Select…',
  tone = 'dark',
  required = false,
  name,
  searchable = false,
  searchPlaceholder = 'Search…',
  className = '',
  buttonClassName,
  'aria-label': ariaLabel,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const items = normalizePickerOptions(options);
  const selected = items.find((o) => o.value === value) || null;

  const { wrapperRef, buttonRef, menuRef, menuPos } = useFloatingPicker({
    open,
    setOpen,
    menuWidth: 260,
    menuMaxHeight: MENU_MAX_HEIGHT,
  });

  const filtered = search
    ? items.filter(
        (o) =>
          o.label.toLowerCase().includes(search.toLowerCase())
          || o.value.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  const select = (option) => {
    onChange(option.value);
    setOpen(false);
    setSearch('');
  };

  const placement = menuPos.placement;
  const textColor = tone === 'light' ? 'text-[#1A1710]' : 'text-ivory';
  const placeholderColor = tone === 'light' ? 'text-[#6B6456]/60' : 'text-warmgray/40';

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full border-b border-gold/20 transition-colors duration-300 focus-within:border-gold ${className}`}
    >
      {required && (
        <input
          tabIndex={-1}
          name={name}
          required
          value={value}
          readOnly
          onChange={() => {}}
          className="absolute opacity-0 w-0 h-0 pointer-events-none"
          aria-hidden
        />
      )}

      <button
        ref={buttonRef}
        type="button"
        data-form-picker-trigger
        aria-label={ariaLabel || placeholder}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        className={
          buttonClassName
          || `w-full flex items-center justify-between gap-2 py-3 text-sm outline-none cursor-pointer ${textColor}`
        }
      >
        <span className={`truncate text-left ${selected ? '' : placeholderColor}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className="w-3 h-3 flex-shrink-0 transition-transform"
          style={{ color: '#6B6456', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          role="listbox"
          className="rounded-xl overflow-hidden"
          style={{
            position: 'fixed',
            top: placement === 'bottom' ? menuPos.top : undefined,
            bottom: placement === 'top' ? `calc(100vh - ${menuPos.top}px)` : undefined,
            left: menuPos.left,
            width: menuPos.width,
            maxHeight: MENU_MAX_HEIGHT,
            background: '#FAF7F2',
            border: '1px solid rgba(160,120,48,0.2)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 16px 40px rgba(26,23,16,0.15), 0 0 0 1px rgba(160,120,48,0.08)',
            zIndex: 250,
          }}
        >
          {searchable && (
            <div className="p-2" style={{ borderBottom: '1px solid rgba(160,120,48,0.12)' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full text-xs px-3 py-1.5 rounded-lg outline-none"
                style={{
                  background: 'rgba(160,120,48,0.06)',
                  color: '#1A1710',
                  border: '1px solid rgba(160,120,48,0.15)',
                }}
              />
            </div>
          )}
          <div className="overflow-y-auto" style={{ flex: 1 }}>
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => select(option)}
                className="w-full flex items-center px-3 py-2.5 text-left text-sm transition-colors cursor-pointer"
                style={{
                  background: value === option.value ? 'rgba(160,120,48,0.1)' : 'transparent',
                  color: '#1A1710',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(160,120,48,0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = value === option.value ? 'rgba(160,120,48,0.1)' : 'transparent';
                }}
              >
                <span className="truncate">{option.label}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs px-3 py-3" style={{ color: '#6B6456' }}>
                No results
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
