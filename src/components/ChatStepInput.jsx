import { useState, useRef, useEffect } from 'react';
import { COUNTRY_CODES } from '../lib/countryCodes';

const PROJECT_TYPES = [
  'Web Application', 'Mobile App', 'DevOps',
  'UI/UX Design', 'E-commerce', 'CMS', 'Digital Marketing',
];
const BUDGETS = [
  'Less than $25,000', '$25,000 – $50,000', '$50,000 – $100,000',
  '$100,000 – $250,000', '$250,000+',
];

const GOLD = '#A07830';
const DARK = '#1A1710';

function validateStep(step, value) {
  const v = (value || '').trim();
  if (!v) return step.optional ? null : `${step.label} is required`;
  if (step.field === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address';
  }
  if (step.field === 'firstName' || step.field === 'lastName') {
    if (v.length < 2) return 'Must be at least 2 characters';
  }
  if (step.field === 'message') {
    if (v.length < 10) return 'Please provide more detail (at least 10 characters)';
  }
  if (step.field === 'phone') {
    const digits = v.replace(/\D/g, '');
    if (digits.length < 6) return 'Please enter a valid phone number';
  }
  return null;
}

export default function ChatStepInput({ step, onSubmit, loading }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [country, setCountry] = useState(() => COUNTRY_CODES.find(c => c.label === 'India') || COUNTRY_CODES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const inputRef = useRef(null);
  const countryRef = useRef(null);

  useEffect(() => {
    setValue('');
    setError('');
    setTimeout(() => inputRef.current?.focus(), 80);
  }, [step.field]);

  useEffect(() => {
    const handler = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) setCountryOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-detect country from IP on mount
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const match = COUNTRY_CODES.find(c => c.label === data.country_name);
        if (match) setCountry(match);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    let finalValue = value.trim();
    if (step.type === 'phone' && finalValue) {
      finalValue = `${country.code} ${finalValue}`;
    }
    const err = validateStep(step, finalValue);
    if (err) { setError(err); return; }
    setError('');
    onSubmit(finalValue || '');
  };

  const filteredCountries = countrySearch
    ? COUNTRY_CODES.filter(c =>
        c.label.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)
      )
    : COUNTRY_CODES;

  // ─── SELECT TYPE (Project Type / Budget) ─────────────────────────────────
  if (step.type === 'select') {
    const options = step.field === 'type' ? PROJECT_TYPES : BUDGETS;
    return (
      <div className="px-4 pb-4 pt-2">
        <p className="text-xs mb-2" style={{ color: '#6B6456' }}>
          {step.label}
        </p>
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-0.5" style={{ scrollbarWidth: 'thin' }}>
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { setError(''); onSubmit(opt); }}
              disabled={loading}
              className="text-left px-3 py-2 rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: 'rgba(160,120,48,0.07)',
                border: '1px solid rgba(160,120,48,0.18)',
                color: DARK,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        {step.optional && (
          <button onClick={() => onSubmit('')} className="mt-2 text-xs underline" style={{ color: '#6B6456' }}>
            Skip for now
          </button>
        )}
      </div>
    );
  }

  // ─── TEXT / EMAIL / PHONE / TEXTAREA ─────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
      <p className="text-xs mb-1.5" style={{ color: '#6B6456' }}>
        {step.label}
        {step.optional && <span style={{ color: GOLD }}> (optional)</span>}
      </p>

      {step.type === 'phone' ? (
        <div
          className="flex items-center rounded-xl mb-2 border"
          style={{ background: '#FFFFFF', borderColor: error ? '#e53e3e' : 'rgba(160,120,48,0.2)' }}
        >
          {/* Country picker */}
          <div ref={countryRef} className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setCountryOpen(!countryOpen)}
              className="flex items-center gap-1 px-2.5 py-2.5 text-sm"
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span className="text-xs" style={{ color: GOLD }}>{country.code}</span>
              <svg
                className="w-2.5 h-2.5 transition-transform"
                style={{ color: '#6B6456', transform: countryOpen ? 'rotate(180deg)' : '' }}
                viewBox="0 0 10 10" fill="none"
              >
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {countryOpen && (
              <div
                className="absolute left-0 top-full mt-1 z-50 rounded-xl overflow-hidden"
                style={{
                  background: '#FAF7F2',
                  border: '1px solid rgba(160,120,48,0.2)',
                  width: 230,
                  maxHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 28px rgba(26,23,16,0.14)',
                }}
              >
                <div className="p-2" style={{ borderBottom: '1px solid rgba(160,120,48,0.1)' }}>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={e => setCountrySearch(e.target.value)}
                    placeholder="Search country..."
                    className="w-full text-xs px-2 py-1.5 rounded-lg outline-none"
                    style={{ background: 'rgba(160,120,48,0.06)', color: DARK, border: '1px solid rgba(160,120,48,0.15)' }}
                  />
                </div>
                <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
                  {filteredCountries.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setCountry(c); setCountryOpen(false); setCountrySearch(''); }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-left transition-colors hover:bg-amber-50"
                    >
                      <span className="text-sm flex-shrink-0">{c.flag}</span>
                      <span className="text-xs flex-1 truncate" style={{ color: DARK }}>{c.label}</span>
                      <span className="text-xs flex-shrink-0 font-medium" style={{ color: GOLD }}>{c.code}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <p className="text-xs px-3 py-2" style={{ color: '#6B6456' }}>No results</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <span style={{ color: 'rgba(160,120,48,0.25)', marginRight: 4 }}>|</span>
          <input
            ref={inputRef}
            type="tel"
            value={value}
            onChange={e => { setValue(e.target.value); setError(''); }}
            placeholder="Phone number"
            className="flex-1 py-2.5 pr-3 text-sm bg-transparent outline-none"
            style={{ color: DARK }}
          />
        </div>
      ) : step.type === 'textarea' ? (
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => { setValue(e.target.value); setError(''); }}
          rows={3}
          placeholder={step.placeholder || ''}
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border resize-none mb-2"
          style={{
            background: '#FFFFFF',
            borderColor: error ? '#e53e3e' : 'rgba(160,120,48,0.2)',
            color: DARK,
          }}
        />
      ) : (
        <input
          ref={inputRef}
          type={step.type}
          value={value}
          onChange={e => { setValue(e.target.value); setError(''); }}
          placeholder={step.placeholder || ''}

          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border mb-2"
          style={{
            background: '#FFFFFF',
            borderColor: error ? '#e53e3e' : 'rgba(160,120,48,0.2)',
            color: DARK,
          }}
        />
      )}

      {error && (
        <p className="text-xs mb-2 mt-0.5" style={{ color: '#e53e3e' }}>
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 mt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-50"
          style={{ background: GOLD }}
        >
          {loading ? 'Saving…' : 'Continue →'}
        </button>
        {step.optional && (
          <button
            type="button"
            onClick={() => onSubmit('')}
            className="px-3 py-2 rounded-xl text-xs transition-opacity hover:opacity-70"
            style={{ color: '#6B6456', border: '1px solid rgba(160,120,48,0.2)' }}
          >
            Skip
          </button>
        )}
      </div>
    </form>
  );
}