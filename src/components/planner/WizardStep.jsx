import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, PenLine, MessageSquarePlus } from 'lucide-react';

const OTHER_VALUE = '__other__';

export default function WizardStep({ step, currentAnswer, currentNote, onSubmit, onBack, isFirst, isLast, isLoadingAI }) {
  const [selected, setSelected] = useState(
    currentAnswer !== undefined ? currentAnswer : (step.type === 'multiselect' ? [] : '')
  );
  const [otherText, setOtherText] = useState('');
  const [note, setNote] = useState(currentNote || '');
  const [showNote, setShowNote] = useState(!!currentNote);
  const otherRef = useRef(null);
  const noteRef = useRef(null);

  // Reset local state whenever the step changes to prevent bleed-over from previous answers
  useEffect(() => {
    setSelected(currentAnswer !== undefined ? currentAnswer : (step.type === 'multiselect' ? [] : ''));
    setOtherText('');
    setNote(currentNote || '');
    setShowNote(!!currentNote);
  }, [step.id]);

  useEffect(() => {
    const isOtherSelected = step.type === 'select'
      ? selected === OTHER_VALUE
      : Array.isArray(selected) && selected.includes(OTHER_VALUE);
    if (isOtherSelected && otherRef.current) otherRef.current.focus();
  }, [selected, step.type]);

  useEffect(() => {
    if (showNote && noteRef.current) noteRef.current.focus();
  }, [showNote]);

  const toggleMulti = (value) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const resolveSubmitValue = () => {
    if (step.type === 'select') {
      return selected === OTHER_VALUE ? otherText.trim() : selected;
    }
    if (step.type === 'multiselect') {
      if (!selected.includes(OTHER_VALUE)) return selected;
      const withoutOther = selected.filter(v => v !== OTHER_VALUE);
      return otherText.trim() ? [...withoutOther, otherText.trim()] : withoutOther;
    }
    return selected;
  };

  const isOtherSelected = step.type === 'select'
    ? selected === OTHER_VALUE
    : Array.isArray(selected) && selected.includes(OTHER_VALUE);

  const canProceed = (() => {
    if (step.type === 'textarea') return selected && selected.toString().trim().length > 0;
    if (step.type === 'select') {
      if (selected === OTHER_VALUE) return otherText.trim().length > 0;
      return !!selected;
    }
    if (step.type === 'multiselect') {
      if (selected.length === 0) return false;
      if (selected.includes(OTHER_VALUE) && otherText.trim().length === 0) return false;
      return true;
    }
    return false;
  })();

  const handleSubmit = () => {
    if (canProceed) onSubmit(step.id, resolveSubmitValue(), note.trim());
  };

  const CheckMark = () => (
    <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: '#A07830' }}>
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  const SmallCheckMark = () => (
    <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: '#A07830' }}>
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-5">
        <div>
          <h2 className="font-heading text-2xl lg:text-3xl text-ivory font-light mb-1.5">{step.title}</h2>
          <p className="text-warmgray text-sm">{step.subtitle}</p>
        </div>

        {/* SELECT */}
        {step.type === 'select' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelected(opt.value)}
                  className="text-left p-4 rounded-xl border transition-all duration-200 group hover:scale-[1.01] hover:shadow-md"
                  style={{
                    background: selected === opt.value ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)',
                    borderColor: selected === opt.value ? '#A07830' : 'rgba(160,120,48,0.2)',
                  }}
                  onMouseEnter={e => { if (selected !== opt.value) e.currentTarget.style.borderColor = 'rgba(160,120,48,0.5)'; e.currentTarget.style.background = selected === opt.value ? 'rgba(160,120,48,0.15)' : 'rgba(160,120,48,0.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = selected === opt.value ? '#A07830' : 'rgba(160,120,48,0.2)'; e.currentTarget.style.background = selected === opt.value ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)'; }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl leading-none flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200" style={{ background: 'rgba(160,120,48,0.1)', fontSize: '18px' }}>{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-ivory text-sm font-body leading-snug">{opt.label.replace(/\s*weeks?\b/gi, '').trim()}</div>
                      {opt.desc && <div className="text-warmgray text-xs mt-0.5 leading-snug">{opt.desc}</div>}
                    </div>
                    {selected === opt.value && <CheckMark />}
                  </div>
                </button>
              ))}
              {/* Other option */}
              <button
                onClick={() => setSelected(OTHER_VALUE)}
                className="text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 hover:scale-[1.01] hover:shadow-md"
                style={{
                  background: isOtherSelected ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)',
                  borderColor: isOtherSelected ? '#A07830' : 'rgba(160,120,48,0.2)',
                  borderStyle: 'dashed',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(160,120,48,0.5)'; e.currentTarget.style.background = isOtherSelected ? 'rgba(160,120,48,0.15)' : 'rgba(160,120,48,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isOtherSelected ? '#A07830' : 'rgba(160,120,48,0.2)'; e.currentTarget.style.background = isOtherSelected ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)'; }}
              >
                <PenLine className="w-5 h-5 flex-shrink-0" style={{ color: isOtherSelected ? '#A07830' : '#6B6456' }} />
                <div className="flex-1">
                  <div className="font-medium text-sm" style={{ color: isOtherSelected ? '#A07830' : '#6B6456' }}>Something else</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6B6456' }}>Describe your own requirement</div>
                </div>
                {isOtherSelected && <CheckMark />}
              </button>
            </div>

            {isOtherSelected && (
              <div className="rounded-xl border border-gold/40 overflow-hidden" style={{ background: 'rgba(160,120,48,0.06)' }}>
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gold/15">
                  <PenLine className="w-3 h-3 text-gold" />
                  <span className="text-gold text-xs font-medium">Tell us about your project</span>
                </div>
                <textarea
                  ref={otherRef}
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  placeholder={step.otherPlaceholder || 'Describe what you have in mind...'}
                  rows={3}
                  className="w-full bg-transparent p-4 text-sm resize-none outline-none text-ivory placeholder-warmgray/40"
                />
              </div>
            )}
          </div>
        )}

        {/* MULTISELECT */}
        {step.type === 'multiselect' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {step.options.map(opt => {
                const isActive = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleMulti(opt.value)}
                    className="text-left p-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                    style={{
                      background: isActive ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)',
                      borderColor: isActive ? '#A07830' : 'rgba(160,120,48,0.2)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = isActive ? '#A07830' : 'rgba(160,120,48,0.5)'; e.currentTarget.style.background = isActive ? 'rgba(160,120,48,0.15)' : 'rgba(160,120,48,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = isActive ? '#A07830' : 'rgba(160,120,48,0.2)'; e.currentTarget.style.background = isActive ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)'; }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{opt.icon}</span>
                      <span className="font-medium text-ivory text-xs flex-1">{opt.label}</span>
                      {isActive && <SmallCheckMark />}
                    </div>
                  </button>
                );
              })}
              <button
                onClick={() => toggleMulti(OTHER_VALUE)}
                className="text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-2 hover:scale-[1.02] hover:shadow-sm"
                style={{
                  background: isOtherSelected ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)',
                  borderColor: isOtherSelected ? '#A07830' : 'rgba(160,120,48,0.2)',
                  borderStyle: 'dashed',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(160,120,48,0.5)'; e.currentTarget.style.background = isOtherSelected ? 'rgba(160,120,48,0.15)' : 'rgba(160,120,48,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isOtherSelected ? '#A07830' : 'rgba(160,120,48,0.2)'; e.currentTarget.style.background = isOtherSelected ? 'rgba(160,120,48,0.12)' : 'rgba(255,255,255,0.04)'; }}
              >
                <PenLine className="w-4 h-4 flex-shrink-0" style={{ color: isOtherSelected ? '#A07830' : '#6B6456' }} />
                <span className="font-medium text-xs flex-1" style={{ color: isOtherSelected ? '#A07830' : '#6B6456' }}>Other</span>
                {isOtherSelected && <SmallCheckMark />}
              </button>
            </div>

            {isOtherSelected && (
              <div className="rounded-xl border border-gold/40 overflow-hidden" style={{ background: 'rgba(160,120,48,0.06)' }}>
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gold/15">
                  <PenLine className="w-3 h-3 text-gold" />
                  <span className="text-gold text-xs font-medium">Describe what else you need</span>
                </div>
                <textarea
                  ref={otherRef}
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  placeholder={step.otherPlaceholder || 'e.g. Voice interface, AR features, custom hardware integration...'}
                  rows={2}
                  className="w-full bg-transparent p-4 text-sm resize-none outline-none text-ivory placeholder-warmgray/40"
                />
              </div>
            )}
          </div>
        )}

        {/* TEXTAREA */}
        {step.type === 'textarea' && (
          <textarea
            value={selected}
            onChange={e => setSelected(e.target.value)}
            placeholder={step.placeholder}
            rows={5}
            className="w-full rounded-xl border p-4 text-sm resize-none outline-none transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: selected ? '#A07830' : 'rgba(160,120,48,0.2)',
              color: '#1A1710'
            }}
          />
        )}

        {/* Add a note — available on all non-textarea steps */}
        {step.type !== 'textarea' && (
          <div>
            {!showNote ? (
              <button
                onClick={() => setShowNote(true)}
                className="flex items-center gap-2 text-xs transition-colors py-1"
                style={{ color: '#6B6456' }}
                onMouseEnter={e => e.currentTarget.style.color = '#A07830'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B6456'}
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Add context or extra details for AI
              </button>
            ) : (
              <div className="rounded-xl border border-gold/20 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center justify-between px-3 py-2 border-b border-gold/10">
                  <div className="flex items-center gap-1.5">
                    <MessageSquarePlus className="w-3 h-3 text-gold" />
                    <span className="text-xs font-medium" style={{ color: '#A07830' }}>Extra context for AI</span>
                  </div>
                  <button
                    onClick={() => { setShowNote(false); setNote(''); }}
                    className="text-xs text-warmgray hover:text-ivory transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  ref={noteRef}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Any additional details, constraints, or context that might help the AI give better suggestions..."
                  rows={2}
                  className="w-full bg-transparent px-3 py-2.5 text-xs resize-none outline-none text-ivory placeholder-warmgray/40"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-gold/10">
        {!isFirst && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gold/20 text-warmgray text-sm hover:border-gold/50 hover:text-ivory hover:bg-gold/5 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!canProceed || isLoadingAI}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: canProceed ? '#A07830' : 'rgba(160,120,48,0.3)', color: '#FAF7F2' }}
        >
          {isLoadingAI ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {step?.id === 'problemStatement' ? 'Personalizing your questions…' : 'AI is analyzing…'}
            </>
          ) : (
            <>
              {isLast ? 'Review Project' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}