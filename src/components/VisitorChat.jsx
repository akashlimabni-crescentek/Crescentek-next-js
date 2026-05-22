import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { visitorChat, chatLeadCapture, chatLeadCaptureSafe } from '@/services/chatbotService';
import { logToHubspot } from '@/services/hubspotService';
import { X, MessageCircle, Send, ChevronDown, Mail, MessageSquare, ExternalLink, Copy, Check, Pencil } from 'lucide-react';
import ChatStepInput from './ChatStepInput';

const PAGE_CONTEXT_MAP = {
  '/': 'home page',
  '/all-services': 'services overview page',
  '/technologies': 'technologies page',
  '/work': 'portfolio / our work page',
  '/about': 'about us page',
  '/contact': 'contact page',
  '/partnership': 'partnership page',
};

function getPageContext(pathname) {
  if (PAGE_CONTEXT_MAP[pathname]) return PAGE_CONTEXT_MAP[pathname];
  if (pathname.startsWith('/services/')) return `service detail page: ${pathname.replace('/services/', '').replace(/-/g, ' ')}`;
  if (pathname.startsWith('/technologies/')) return `technology page: ${pathname.replace('/technologies/', '').replace(/-/g, ' ')}`;
  if (pathname.startsWith('/partnership/')) return `partnership page: ${pathname.replace('/partnership/', '').replace(/-/g, ' ')}`;
  return pathname;
}

function getCurrentPageContent() {
  try {
    // Get all meaningful text from the page, skipping nav/chat widget
    const skipSelectors = ['[data-chat-widget]', 'script', 'style', 'noscript'];
    const clone = document.body.cloneNode(true);
    skipSelectors.forEach(sel => {
      clone.querySelectorAll(sel).forEach(el => el.remove());
    });
    const text = clone.innerText || clone.textContent || '';
    // Clean up excessive whitespace
    return text.replace(/\s+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, 4000);
  } catch {
    return '';
  }
}

const STEPS = [
  { field: 'firstName', label: 'First name', type: 'text', placeholder: 'John', required: true },
  { field: 'lastName', label: 'Last name', type: 'text', placeholder: 'Smith', required: true },
  { field: 'email', label: 'Email address', type: 'email', placeholder: 'you@company.com', required: true },
  { field: 'phone', label: 'Phone number', type: 'phone', optional: true },
  { field: 'company', label: 'Company name', type: 'text', placeholder: 'Your company', optional: true },
  { field: 'type', label: 'Project type', type: 'select', required: true },
  { field: 'budget', label: 'Budget range', type: 'select', required: true },
  { field: 'message', label: 'Project description', type: 'textarea', placeholder: 'Describe your project, goals, timeline…', required: true },
];

const STEP_PROMPTS = [
  "I'd love to help you! Let's start — what's your first name?",
  "Nice to meet you! And your last name?",
  "What's the best email address to reach you?",
  "What's your phone number? (optional — feel free to skip)",
  "Which company do you represent? (optional)",
  "What type of project are you looking to build?",
  "What budget range are you working with?",
  "Last one — tell us a bit about what you want to build or achieve.",
];

const WELCOME = {
  role: 'assistant',
  content: "Hi there! 👋 Welcome to Crescentek. I'm here to help you find the right solution — whether it's a web app, mobile project, or anything in between. What can I do for you today?",
};

function parseMessage(text) {
  let clean = text.replace(/\*\*(.+?)\*\*/g, '$1');
  const tokens = [];
  let m;
  const urlRe = /https?:\/\/[^\s)>"']+/g;
  const emailRe = /[\w.+-]+@[\w-]+\.[\w.]+/g;
  while ((m = urlRe.exec(clean)) !== null) tokens.push({ type: 'url', value: m[0], index: m.index, end: m.index + m[0].length });
  while ((m = emailRe.exec(clean)) !== null) {
    if (!tokens.some(t => m.index >= t.index && m.index < t.end))
      tokens.push({ type: 'email', value: m[0], index: m.index, end: m.index + m[0].length });
  }
  tokens.sort((a, b) => a.index - b.index);
  let displayText = clean;
  [...tokens].reverse().forEach(t => {
    displayText = displayText.slice(0, t.index).replace(/[:\s]+$/, '') + displayText.slice(t.end);
  });
  return { displayText: displayText.trim(), tokens };
}

function AssistantBubble({ content }) {
  const [copied, setCopied] = useState(false);
  const { displayText, tokens } = parseMessage(content);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      className="rounded-2xl px-3 py-2 text-sm max-w-[82%] leading-relaxed"
      style={{ background: '#FFFFFF', border: '1px solid rgba(160,120,48,0.12)', color: '#1A1710', borderBottomLeftRadius: 4 }}
    >
      <div className="whitespace-pre-wrap">{displayText}</div>
      {tokens.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tokens.map((token, i) => {
            const isWhatsApp = token.value.includes('wa.me');
            const isEmail = token.type === 'email';
            const href = isEmail ? `mailto:${token.value}` : token.value;
            const label = isWhatsApp ? 'WhatsApp Us' : isEmail ? token.value : token.value.replace(/^https?:\/\//, '').split('/')[0];
            const icon = isWhatsApp
              ? <MessageSquare size={11} className="flex-shrink-0" />
              : isEmail
                ? <Mail size={11} className="flex-shrink-0" />
                : <ExternalLink size={11} className="flex-shrink-0" />;
            return (
              <a key={i} href={href} target={isEmail ? undefined : '_blank'} rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-opacity hover:opacity-80"
                style={{ background: 'rgba(160,120,48,0.12)', color: '#A07830', border: '1px solid rgba(160,120,48,0.25)' }}
              >
                {icon}{label}
              </a>
            );
          })}
        </div>
      )}
      <button onClick={handleCopy} className="mt-1.5 flex items-center gap-1 text-[10px] transition-colors" style={{ color: copied ? '#A07830' : '#C4B89A' }}>
        {copied ? <Check size={10} /> : <Copy size={10} />}{copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function DataChip({ label, value, onEdit }) {
  const displayVal = value.length > 14 ? value.slice(0, 14) + '…' : value;
  return (
    <button
      onClick={onEdit}
      title={`Edit: ${value}`}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-opacity hover:opacity-75"
      style={{ background: 'rgba(160,120,48,0.1)', color: '#A07830', border: '1px solid rgba(160,120,48,0.22)' }}
    >
      <span className="max-w-[90px] truncate">{displayVal}</span>
      <Pencil size={8} />
    </button>
  );
}

const PROMPT_DELAY = 8000;
const GOLD = '#A07830';
const DARK = '#1A1710';

export default function VisitorChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [phase, setPhase] = useState('chatting'); // 'chatting' | 'collecting'
  const [currentStep, setCurrentStep] = useState(0);
  const [leadData, setLeadData] = useState({});
  const [sessionEnteredFields, setSessionEnteredFields] = useState(new Set()); // only fields the user typed THIS session
  const [contactId, setContactId] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [collectionDone, setCollectionDone] = useState(false);

  const [waitingForConsent, setWaitingForConsent] = useState(false);

  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const pathname = usePathname();
  const pageContext = getPageContext(pathname);

  useEffect(() => {
    if (bubbleDismissed || open) return;
    const t = setTimeout(() => setShowBubble(true), PROMPT_DELAY);
    return () => clearTimeout(t);
  }, [bubbleDismissed, open]);

  useEffect(() => {
    if (open) {
      setShowBubble(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase, currentStep]);

  const AFFIRMATIVE_RE = /\b(yes|sure|yeah|yep|go ahead|please|ok|okay|sounds good|absolutely|definitely|i'd like|connect me|reach out|do it|let's do it|lets do it|of course|why not|go for it)\b/i;

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setLoading(true);

    // Detect explicit consent: user said yes after bot asked the consent question
    const userExplicitlyConsented = waitingForConsent && AFFIRMATIVE_RE.test(text);
    if (waitingForConsent) setWaitingForConsent(false);

    try {
      const response = await visitorChat({
        messages: newMessages,
        pageContext,
        phase,
        collectionDone,
        pageContent: getCurrentPageContent(),
        userExplicitlyConsented,
      });
      const { reply, startCollection, askedConsent } = response?.data || {};
      const replyText = reply || "I'm here to help! Please reach us at help@crescentek.com";
      setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);

      // Bot just asked for consent — arm the detector for next user message
      if (askedConsent) setWaitingForConsent(true);

      if (startCollection && phase === 'chatting' && !collectionDone) {
        const firstUnfilled = STEPS.findIndex(s => !leadData[s.field]);
        setCurrentStep(firstUnfilled >= 0 ? firstUnfilled : 0);
        setTimeout(() => setPhase('collecting'), 400);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble right now. Please reach us at help@crescentek.com" }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleStepSubmit(value) {
    const stepIdx = editingStep !== null ? editingStep : currentStep;
    const step = STEPS[stepIdx];

    const newData = { ...leadData };
    if (value) {
      newData[step.field] = value;
    } else {
      delete newData[step.field];
    }
    setLeadData(newData);
    setMessages(prev => [...prev, { role: 'user', content: value || '(skipped)' }]);

    if (value) {
      setSessionEnteredFields(prev => new Set([...prev, step.field]));
    }

    if (editingStep !== null) {
      setEditingStep(null);
      if (newData.email) {
        chatLeadCaptureSafe({ action: 'save', leadData: newData, contactId })
          .then(res => { if (res?.data?.contactId) setContactId(res.data.contactId); })
          .catch(() => {});
      }
      setMessages(prev => [...prev, { role: 'assistant', content: `Got it! I've updated your ${step.label.toLowerCase()}.` }]);
      return;
    }

    if (step.field === 'email' && value) {
      setLoading(true);
      try {
        const lookupRes = await chatLeadCapture({
          action: 'lookup',
          leadData: { email: value },
        });
        const { found, contactId: cId, existingData } = lookupRes?.data || {};
        const mergedData = { ...newData };
        if (found && existingData) {
          // Silently pre-fill from HubSpot — do NOT expose data in the UI
          if (existingData.firstName && !mergedData.firstName) mergedData.firstName = existingData.firstName;
          if (existingData.lastName && !mergedData.lastName) mergedData.lastName = existingData.lastName;
          if (existingData.phone && !mergedData.phone) mergedData.phone = existingData.phone;
          if (existingData.company && !mergedData.company) mergedData.company = existingData.company;
          setLeadData(mergedData);
          setContactId(cId);
          await chatLeadCapture({ action: 'save', leadData: mergedData, contactId: cId });
          advanceStep(mergedData, stepIdx + 1, cId);
        } else {
          const saveRes = await chatLeadCapture({ action: 'save', leadData: mergedData });
          const newCId = saveRes?.data?.contactId;
          if (newCId) setContactId(newCId);
          addStepPromptAndAdvance(mergedData, stepIdx + 1, newCId);
        }
      } catch {
        addStepPromptAndAdvance(newData, stepIdx + 1, contactId);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (newData.email) {
      chatLeadCaptureSafe({ action: 'save', leadData: newData, contactId })
        .then(res => { if (res?.data?.contactId) setContactId(res.data.contactId); })
        .catch(() => {});
    }

    addStepPromptAndAdvance(newData, stepIdx + 1, contactId);
  }

  function shouldSkipStep(data, idx) {
    const step = STEPS[idx];
    // Skip if already collected (optional OR required)
    if (data[step.field]) return true;
    return false;
  }

  function getNextStepIdx(data, fromIdx) {
    let idx = fromIdx;
    while (idx < STEPS.length && shouldSkipStep(data, idx)) idx++;
    return idx;
  }

  function addStepPromptAndAdvance(data, fromIdx, cId) {
    const nextIdx = getNextStepIdx(data, fromIdx);
    if (nextIdx >= STEPS.length) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Almost there! Let me submit your details to the team…" }]);
      completeLead(data, cId || contactId);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: STEP_PROMPTS[nextIdx] }]);
      setCurrentStep(nextIdx);
    }
  }

  function advanceStep(data, fromIdx, cId) {
    const nextIdx = getNextStepIdx(data, fromIdx);
    if (nextIdx >= STEPS.length) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Almost there! Let me submit your details to the team…" }]);
      if (!collectionDone) completeLead(data, cId || contactId);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: STEP_PROMPTS[nextIdx] }]);
      setCurrentStep(nextIdx);
    }
  }

  async function completeLead(data, cId) {
    setCollectionDone(true);
    setLoading(true);
    try {
      await logToHubspot({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        company: data.company || '',
        type: data.type || '',
        budget: data.budget || '',
        message: data.message || '',
        fromChat: true,
      });
      setPhase('chatting');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "✅ All done! Your details have been sent to the Crescentek team. You'll receive a confirmation email and hear back within 24 hours. Feel free to ask me anything else in the meantime!",
      }]);
    } catch {
      setPhase('chatting');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Something went wrong submitting your details. Please reach us directly at help@crescentek.com",
      }]);
    } finally {
      setLoading(false);
    }
  }

  const activeStepObj = editingStep !== null ? STEPS[editingStep] : STEPS[currentStep];
  // Only show chips for fields the user actually typed this session (not silently pre-filled from HubSpot)
  const collectedFields = STEPS.filter(s => sessionEnteredFields.has(s.field));
  const progressPct = phase === 'collecting'
    ? Math.round((collectedFields.length / STEPS.length) * 100)
    : 0;

  return (
    <>
      {/* Proactive bubble */}
      {showBubble && !open && (
        <div
          className="fixed bottom-24 right-6 z-50 max-w-[240px] rounded-2xl px-4 py-3 shadow-xl text-sm animate-slide-up"
          style={{ background: '#FAF7F2', border: '1px solid rgba(160,120,48,0.2)', color: DARK }}
        >
          <button
            onClick={() => { setShowBubble(false); setBubbleDismissed(true); }}
            className="absolute top-2 right-2 transition-colors"
            style={{ color: '#6B6456' }}
          >
            <X size={12} />
          </button>
          <p className="pr-4 leading-snug">👋 Need help? I can answer your questions right away!</p>
          <button
            onClick={() => { setOpen(true); setShowBubble(false); setBubbleDismissed(true); }}
            className="mt-2 text-xs font-medium underline"
            style={{ color: GOLD }}
          >
            Start chatting →
          </button>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105"
        style={{ background: GOLD }}
        aria-label="Open chat"
      >
        {open ? <ChevronDown size={22} color="#fff" /> : (
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 2 C32 2 28 28 2 32 C28 32 32 62 32 62 C32 62 36 36 62 32 C36 32 32 2 32 2Z" fill="white"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            background: '#FAF7F2',
            border: '1px solid rgba(160,120,48,0.2)',
            height: 500,
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: GOLD }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 2 C32 2 28 28 2 32 C28 32 32 62 32 62 C32 62 36 36 62 32 C36 32 32 2 32 2Z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium leading-tight">Crescentek Assistant</p>
              <p className="text-white/70 text-[10px]">
                {phase === 'collecting' ? `Collecting your details — ${progressPct}% done` : 'Here to help you'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 items-end ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: 'rgba(160,120,48,0.12)', border: '1px solid rgba(160,120,48,0.25)' }} />
                )}
                {m.role === 'user' ? (
                  <div
                    className="rounded-2xl px-3 py-2 text-sm max-w-[82%] leading-relaxed"
                    style={{ background: GOLD, color: '#fff', borderBottomRightRadius: 4 }}
                  >
                    {m.content}
                  </div>
                ) : (
                  <AssistantBubble content={m.content} />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-end">
                <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: 'rgba(160,120,48,0.12)', border: '1px solid rgba(160,120,48,0.25)' }} />
                <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm" style={{ background: '#FFFFFF', border: '1px solid rgba(160,120,48,0.12)', color: '#6B6456' }}>
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Progress bar */}
          {phase === 'collecting' && (
            <div className="px-4 pt-2 flex-shrink-0">
              <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(160,120,48,0.12)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: GOLD }}
                />
              </div>
            </div>
          )}

          {/* Collected data chips */}
          {phase === 'collecting' && collectedFields.length > 0 && (
            <div className="px-4 pt-2 pb-1 flex-shrink-0 flex flex-wrap gap-1">
              {collectedFields.map(s => (
                <DataChip
                  key={s.field}
                  label={s.label}
                  value={s.field === 'message' ? 'Description ✓' : leadData[s.field]}
                  onEdit={() => {
                    setEditingStep(STEPS.indexOf(s));
                    setMessages(prev => [...prev, {
                      role: 'assistant',
                      content: `Sure! Let's update your ${s.label.toLowerCase()}.`,
                    }]);
                  }}
                />
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="flex-shrink-0" style={{ borderTop: '1px solid rgba(160,120,48,0.1)' }} />

          {/* Input area — collecting phase */}
          {phase === 'collecting' && activeStepObj && (
            <div className="flex-shrink-0">
              <ChatStepInput
                step={activeStepObj}
                onSubmit={handleStepSubmit}
                loading={loading}
              />
            </div>
          )}

          {/* Input area — chatting phase */}
          {phase === 'chatting' && (
            <>
              <div className="px-4 pb-2 pt-2 flex gap-2 flex-shrink-0">
                <a href="/contact" className="flex-1 text-center text-[10px] py-1.5 rounded-lg border font-medium tracking-wide transition-colors hover:opacity-80" style={{ borderColor: 'rgba(160,120,48,0.3)', color: GOLD, background: 'rgba(160,120,48,0.06)' }}>
                  Contact Us
                </a>
                <a href="mailto:help@crescentek.com" className="flex-1 text-center text-[10px] py-1.5 rounded-lg border font-medium tracking-wide transition-colors hover:opacity-80" style={{ borderColor: 'rgba(160,120,48,0.3)', color: GOLD, background: 'rgba(160,120,48,0.06)' }}>
                  Email Us
                </a>
                <a href="https://wa.me/919836900840" target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-[10px] py-1.5 rounded-lg border font-medium tracking-wide transition-colors hover:opacity-80" style={{ borderColor: 'rgba(160,120,48,0.3)', color: GOLD, background: 'rgba(160,120,48,0.06)' }}>
                  WhatsApp Us
                </a>
              </div>
              <form onSubmit={sendMessage} className="px-4 pb-4 flex gap-2 flex-shrink-0">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(160,120,48,0.2)', color: DARK }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
                  style={{ background: GOLD }}
                >
                  <Send size={15} color="#fff" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}