'use client';

import { useState, useEffect, useRef } from 'react';



import RevealSection from '@/components/shared/RevealSection';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { logToHubspot } from '@/services/hubspotService';
import CountryCodePicker from '@/components/forms/CountryCodePicker';
import FormSelectPicker from '@/components/forms/FormSelectPicker';
import { COUNTRY_CODES } from '@/lib/countryCodes';
import { CONTACT_PROJECT_TYPES, CONTACT_BUDGET_RANGES } from '@/lib/contactFormOptions';

/** Public site key (same as legacy Base44 app — not stored in .env) */
const RECAPTCHA_SITE_KEY = '6LcaJ7MsAAAAACoa_IENmDdOQ1dkd6MOdC9tVvNV';

function loadRecaptcha(siteKey) {
  return new Promise((resolve) => {
    if (window.grecaptcha) { resolve(); return; }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

function getSystemDetails() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';
  const deviceType = /Mobi|Android/i.test(ua) ? 'Mobile' : /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Desktop';

  if (/Chrome\//.test(ua) && !/Edge\/|Edg\//.test(ua)) browser = 'Chrome';
  else if (/Firefox\//.test(ua)) browser = 'Firefox';
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
  else if (/Edge\/|Edg\//.test(ua)) browser = 'Edge';
  else if (/MSIE|Trident/.test(ua)) browser = 'IE';

  if (/Windows NT/.test(ua)) os = 'Windows';
  else if (/Mac OS X/.test(ua)) os = 'macOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
  else if (/Linux/.test(ua)) os = 'Linux';

  const utmParams = {};
  const urlParams = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const val = urlParams.get(key) || sessionStorage.getItem(key);
    if (val) utmParams[key] = val;
  });

  return {
    browser,
    os,
    deviceType,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    userAgent: ua,
    referrer: document.referrer || 'Direct',
    pageUrl: window.location.href,
    ...utmParams,
  };
}

const fieldClass = "w-full bg-transparent border-b border-gold/20 focus:border-gold text-ivory py-3 text-sm outline-none transition-colors duration-300 placeholder-warmgray/40";
const labelClass = "block text-warmgray text-xs mb-2 tracking-wide";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', selectedCountry: null, phoneNumber: '', company: '', type: '', budget: '', message: '',
    honeypot: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const formLoadTime = useRef(Date.now());

  useEffect(() => {
    // Store UTM params in session storage so they persist across navigations
    const urlParams = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const val = urlParams.get(key);
      if (val) sessionStorage.setItem(key, val);
    });

    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        const match = COUNTRY_CODES.find((c) => c.label === data.country_name)
          || COUNTRY_CODES.find((c) => c.code === `+${data.country_calling_code?.replace('+', '')}`);
        if (match) setForm((prev) => ({ ...prev, selectedCountry: match }));
      })
      .catch(() => {});

    // reCAPTCHA loads on submit only (avoids badge overlapping chat widget in corner)
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    let recaptchaToken = '';
    try {
      await loadRecaptcha(RECAPTCHA_SITE_KEY);
      recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' });
    } catch (_) {}

    const country = form.selectedCountry || COUNTRY_CODES.find((c) => c.label === 'United States');
    const systemDetails = getSystemDetails();

    const payload = {
      ...form,
      phone: `${country?.code || ''}${form.phoneNumber}`,
      recaptchaToken,
      formLoadTime: formLoadTime.current,
      ...systemDetails,
    };
    try {
      setFormError('');
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 30000));
      const res = await Promise.race([logToHubspot(payload), timeout]);
      if (res?.data?.error) {
        setFormError(res.data.error);
        setSending(false);
        return;
      }
      setSending(false);
      setSubmitted(true);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Something went wrong. Please try again.';
      setFormError(msg === 'timeout' ? 'Request timed out. Please try again.' : msg);
      setSending(false);
    }
  };

  return (
    <div className="bg-surface-dark">
            {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection>
            <span className="label-gold">Contact</span>
            <h1 className="mt-6 font-heading text-5xl md:text-6xl lg:text-7xl text-ivory font-light leading-tight">
              Let's create <span className="italic text-gold">together</span>
            </h1>
          </RevealSection>
        </div>
      </section>

   

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Left — Info */}
            <div className="lg:col-span-2">
              <RevealSection>
                <p className="text-warmgray leading-relaxed mb-12">
                  Every exceptional project begins with a conversation.
                  Tell us about your vision, and we'll show you the path forward.
                </p>
                <div className="mt-8 pt-8 border-t border-gold/10">
                  <p className="label-gold mb-4">Follow Us</p>
                  <div className="flex gap-6">
                    {[
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/crescentek' },
                      { label: 'Twitter', href: 'https://twitter.com/crescentekhq' },
                      { label: 'Instagram', href: 'https://www.instagram.com/crescentekhq/' },
                    ].map((social) => (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-warmgray text-sm hover:text-gold transition-colors duration-300 flex items-center gap-1">
                        {social.label}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <RevealSection delay={200}>
                {submitted ? (
                  <div className="bg-surface border border-gold/20 p-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">
                      <span className="text-gold text-2xl">✓</span>
                    </div>
                    <h3 className="font-heading text-3xl text-ivory">Thank you.</h3>
                    <p className="mt-4 text-warmgray">
                      We've received your message and will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Honeypot — hidden from real users, bots will fill it */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true" tabIndex={-1}>
                      <input
                        type="text"
                        name="website_url"
                        value={form.honeypot}
                        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    {/* Row 1: First Name + Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="John" className={fieldClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" className={fieldClass} />
                      </div>
                    </div>

                    {/* Row 2: Email + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" className={fieldClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <div className="flex items-center border-b border-gold/20 focus-within:border-gold transition-colors duration-300">
                          <CountryCodePicker
                            value={form.selectedCountry}
                            onChange={(country) => setForm({ ...form, selectedCountry: country })}
                          />
                          <span className="text-gold/30 mx-2">|</span>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            required
                            placeholder="Phone number"
                            className="flex-1 bg-transparent text-ivory py-3 text-sm outline-none placeholder-warmgray/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Company (full width) */}
                    <div>
                      <label className={labelClass}>Company Name *</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Your Company" className={fieldClass} />
                    </div>

                    {/* Row 4: Project Type + Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Project Type *</label>
                        <FormSelectPicker
                          name="type"
                          value={form.type}
                          onChange={(type) => setForm({ ...form, type })}
                          options={CONTACT_PROJECT_TYPES}
                          placeholder="Select type"
                          required
                          aria-label="Project type"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Budget Range *</label>
                        <FormSelectPicker
                          name="budget"
                          value={form.budget}
                          onChange={(budget) => setForm({ ...form, budget })}
                          options={CONTACT_BUDGET_RANGES}
                          placeholder="Select budget"
                          required
                          aria-label="Budget range"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>Tell us about your project *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4} required placeholder="Describe your project, goals, timeline..." className={`${fieldClass} resize-none`} />
                    </div>

                    {formError && (
                      <div className="border border-red-400/30 bg-red-50/10 rounded-lg px-4 py-3 text-sm text-red-400">
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-gold text-surface-dark py-4 text-sm font-medium tracking-wider hover:bg-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </RevealSection>
            </div>
          </div>
        </div>
      </section>
         {/* Contact Info Cards */}
         <section className="py-12 lg:py-16 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                title: 'Human Resource',
                lines: [
                  { label: 'Mobile', value: '+91 9330933050', href: 'tel:+919330933050' },
                  { label: 'Email', value: 'hr@crescentek.com', href: 'mailto:hr@crescentek.com' },
                ],
              },
              {
                icon: <Phone className="w-5 h-5" />,
                title: 'Sales & Support',
                lines: [
                  { label: 'India', value: '+91 9836900840', href: 'tel:+919836900840' },
                  { label: 'Email', value: 'help@crescentek.com', href: 'mailto:help@crescentek.com' },
                ],
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: 'Kolkata',
                lines: [
                  { label: null, value: 'Godrej Genesis, Saltlake Sec V, Unit 1505, Kolkata, WB 700091', href: 'https://goo.gl/maps/WsYkDZQz4Spy2uxv7' },
                ],
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: 'Rajkot',
                lines: [
                  { label: null, value: '1207, The Spire, 150 Feet Ring Rd, Rajkot, Gujarat 360007', href: 'https://goo.gl/maps/BVJxLhxGqBvuC7oF8' },
                ],
              },
            ].map((card, i) => (
              <RevealSection key={card.title} delay={i * 80}>
                <div
                  className="contact-info-card group rounded-2xl border border-gold/10 p-6 h-full flex flex-col items-center text-center gap-4 transition-all duration-300 relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.04), rgba(255,255,255,0.02))' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(160,120,48,0.10) 0%, rgba(160,120,48,0.03) 50%, rgba(160,120,48,0.07) 100%)' }} aria-hidden />
                  <div className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(160,120,48,0.8), transparent)' }} aria-hidden />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ padding: '1px', background: 'linear-gradient(135deg, rgba(160,120,48,0.55), rgba(160,120,48,0.15), rgba(160,120,48,0.45))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} aria-hidden />
                  <div
                    className="relative z-[1] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(160,120,48,0.12)', border: '1px solid rgba(160,120,48,0.22)', color: '#A07830' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="relative z-[1] text-ivory font-medium text-base">{card.title}</h3>
                  <ul className="relative z-[1] space-y-2 flex-1 flex flex-col items-center">
                    {card.lines.map((line, j) => (
                      <li key={j} className="text-xs leading-relaxed text-center">
                        {line.label && <span className="text-warmgray/50 mr-1">{line.label}:</span>}
                        <a
                          href={line.href}
                          target={line.href.startsWith('http') ? '_blank' : undefined}
                          rel={line.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-warmgray hover:text-gold transition-colors duration-200 break-words"
                        >
                          {line.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}