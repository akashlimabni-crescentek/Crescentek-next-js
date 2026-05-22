import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const VIEWPORT_PADDING = 8;

/**
 * Shared positioning + outside-click for portal dropdowns (country, form selects).
 */
export function useFloatingPicker({ open, setOpen, menuWidth = 260, menuMaxHeight = 280 }) {
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: menuWidth, placement: 'bottom' });

  const updatePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const width = Math.max(rect.width, menuWidth);
    const spaceBelow = vh - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;
    const placeBelow = spaceBelow >= Math.min(menuMaxHeight, 200) || spaceBelow >= spaceAbove;

    let left = rect.left;
    if (left + width > vw - VIEWPORT_PADDING) {
      left = Math.max(VIEWPORT_PADDING, vw - width - VIEWPORT_PADDING);
    }

    const top = placeBelow ? rect.bottom + 4 : Math.max(VIEWPORT_PADDING, rect.top - 4);
    setMenuPos({ top, left, width, placement: placeBelow ? 'bottom' : 'top' });
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
      if (wrapper?.contains(e.target)) return;
      if (menu?.contains(e.target)) return;
      setOpen(false);
    };
    const esc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [open, setOpen]);

  return { wrapperRef, buttonRef, menuRef, menuPos, updatePosition };
}
