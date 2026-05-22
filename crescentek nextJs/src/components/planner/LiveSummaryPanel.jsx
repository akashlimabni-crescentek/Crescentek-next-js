import { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, Clock, AlertTriangle, Brain, Zap } from 'lucide-react';

function Tag({ children, color = 'gold' }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: color === 'gold' ? 'rgba(160,120,48,0.15)' : 'rgba(30,138,110,0.15)',
        color: color === 'gold' ? '#A07830' : '#1E8A6E',
        border: `1px solid ${color === 'gold' ? 'rgba(160,120,48,0.3)' : 'rgba(30,138,110,0.3)'}`
      }}>
      {children}
    </span>
  );
}

function AIInsightCard({ rec, isNew }) {
  const [showWhy, setShowWhy] = useState(false);
  if (!rec?.recommendation) return null;

  return (
    <div className="rounded-xl border overflow-hidden transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(160,120,48,0.12) 0%, rgba(160,120,48,0.05) 100%)',
        borderColor: 'rgba(160,120,48,0.35)',
        boxShadow: isNew ? '0 0 20px rgba(160,120,48,0.2)' : 'none',
      }}>
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gold/15">
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(160,120,48,0.2)' }}>
          <Brain className="w-3.5 h-3.5 text-gold" />
        </div>
        <p className="text-xs font-bold tracking-wide flex-1" style={{ color: '#A07830' }}>AI INSIGHT</p>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10px] text-gold/60 font-medium">Live</span>
        </div>
        {rec.whyThisRecommendation && (
          <button onClick={() => setShowWhy(!showWhy)}
            className="text-[10px] text-warmgray hover:text-gold transition-colors ml-1">
            Why?
          </button>
        )}
      </div>
      <div className="p-3.5">
        <p className="text-sm leading-relaxed font-medium" style={{ color: '#2A2010' }}>
          {rec.recommendation}
        </p>
        {showWhy && rec.whyThisRecommendation && (
          <div className="mt-3 pt-3 border-t border-gold/10">
            <p className="text-xs text-warmgray leading-relaxed italic">{rec.whyThisRecommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyzingIndicator() {
  return (
    <div className="rounded-xl border border-gold/30 p-4" style={{ background: 'rgba(160,120,48,0.08)' }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(160,120,48,0.15)' }}>
          <Brain className="w-4 h-4 text-gold" />
        </div>
        <div>
          <p className="text-xs font-bold text-gold">AI is analyzing your input…</p>
          <p className="text-[10px] text-warmgray mt-0.5">Generating expert recommendations</p>
        </div>
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(160,120,48,0.15)' }}>
        <div className="h-full rounded-full bg-gold/60"
          style={{ animation: 'loading-bar 2s ease-in-out infinite', width: '60%' }} />
      </div>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes loading-bar { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
      `}</style>
    </div>
  );
}

function AnswerDigest({ answers }) {
  const LABELS = {
    projectType: '🏗️ Type',
    problemStatement: '🎯 Idea',
    targetUsers: '👥 Users',
    coreFeatures: '⚙️ Features',
    platform: '📱 Platform',
    timeline: '📅 Timeline',
  };
  const PROJECT_LABELS = { web_app: 'Web App', mobile_app: 'Mobile App', saas: 'SaaS', ecommerce: 'E-commerce', mvp: 'MVP', enterprise: 'Enterprise' };
  const TIMELINE_LABELS = { asap: 'ASAP', '3months': '3 Months', '6months': '6 Months', '12months': '12 Months', flexible: 'Flexible' };

  const formatValue = (key, val) => {
    if (key === 'timeline') return TIMELINE_LABELS[val] || val;
    if (key === 'projectType') return PROJECT_LABELS[val] || val;
    if (Array.isArray(val)) return val.map(v => v.replace(/_/g, ' ')).join(', ');
    if (typeof val === 'string' && val.length > 60) return val.slice(0, 60) + '…';
    return String(val).replace(/_/g, ' ');
  };

  const entries = Object.entries(answers).filter(([k]) => LABELS[k]);
  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl border border-gold/10 overflow-hidden">
      <div className="px-3 py-2 border-b border-gold/10" style={{ background: 'rgba(160,120,48,0.05)' }}>
        <p className="text-xs font-semibold text-warmgray">Your Answers So Far</p>
      </div>
      <div className="divide-y divide-gold/5">
        {entries.map(([key, val]) => (
          <div key={key} className="px-3 py-2 flex gap-2">
            <span className="text-xs text-warmgray/60 flex-shrink-0 w-20">{LABELS[key]}</span>
            <span className="text-xs text-ivory break-words">{formatValue(key, val)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiveSummaryPanel({ answers, latestAI, aiData, isLoadingAI, currentStepLabel }) {
  const hasContent = Object.keys(answers).length > 0;
  const allStepKeys = Object.keys(aiData);
  const lastStepKey = allStepKeys[allStepKeys.length - 1];
  const latestRec = lastStepKey ? aiData[lastStepKey] : null;

  const [newKey, setNewKey] = useState(null);
  const prevLastKey = useRef(null);
  useEffect(() => {
    if (lastStepKey && lastStepKey !== prevLastKey.current) {
      prevLastKey.current = lastStepKey;
      setNewKey(lastStepKey);
      const t = setTimeout(() => setNewKey(null), 8000);
      return () => clearTimeout(t);
    }
  }, [lastStepKey]);

  return (
    <div className="rounded-2xl border border-gold/20 p-4 h-full flex flex-col gap-4"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(250,247,242,0.03) 100%)',
        boxShadow: '0 4px 24px rgba(160,120,48,0.08)',
      }}>

      <div className="flex items-center gap-2 pb-2 border-b border-gold/10">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(160,120,48,0.15)', border: '1px solid rgba(160,120,48,0.25)' }}>
          <Sparkles className="w-4 h-4 text-gold" />
        </div>
        <div>
          <h3 className="font-semibold text-ivory text-sm leading-none">AI Live Analysis</h3>
          <p className="text-[10px] text-warmgray mt-0.5">Powered by Crescentek AI</p>
        </div>
        {isLoadingAI && (
          <div className="ml-auto w-4 h-4 border-2 rounded-full animate-spin flex-shrink-0"
            style={{ borderColor: 'rgba(160,120,48,0.25)', borderTopColor: '#A07830' }} />
        )}
      </div>

      {!hasContent ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(160,120,48,0.1)', border: '1px solid rgba(160,120,48,0.2)' }}>
            <Brain className="w-8 h-8" style={{ color: '#A07830', opacity: 0.5 }} />
          </div>
          <p className="text-warmgray text-xs leading-relaxed max-w-[180px]">
            Answer the first question to see real-time AI analysis and expert recommendations.
          </p>
          <div className="mt-4 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-gold/50" />
            <span className="text-[10px] text-gold/50 font-medium">Instant AI insights after each step</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-0.5">
          {isLoadingAI && <AnalyzingIndicator />}

          {!isLoadingAI && latestRec && (
            <AIInsightCard rec={latestRec} isNew={newKey === lastStepKey} />
          )}

          {latestAI.techStack?.length > 0 && (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(160,120,48,0.2)' }}>
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gold/10"
                style={{ background: 'rgba(160,120,48,0.08)' }}>
                <Code2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <p className="text-xs font-bold text-gold flex-1">AI Recommended Stack</p>
              </div>
              <div className="p-3" style={{ background: 'rgba(160,120,48,0.03)' }}>
                <div className="flex flex-wrap gap-1.5">
                  {latestAI.techStack.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                {latestAI.alternativeStack?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gold/10">
                    <p className="text-[10px] text-warmgray/70 font-semibold uppercase tracking-wide mb-1.5">Alternative Approach</p>
                    <div className="flex flex-wrap gap-1.5">
                      {latestAI.alternativeStack.map(t => <Tag key={t} color="green">{t}</Tag>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {latestAI.timelineWeeks && (
            <div className="rounded-xl p-3 border border-gold/15" style={{ background: 'rgba(160,120,48,0.05)' }}>
              <div className="flex items-center gap-1 mb-1.5">
                <Clock className="w-3 h-3 text-gold" />
                <p className="text-xs text-warmgray font-medium">Estimated Timeline</p>
              </div>
              <p className="text-ivory text-sm font-bold">
                {latestAI.timelineWeeks.min}–{latestAI.timelineWeeks.max}
                <span className="text-warmgray font-normal text-xs"> weeks</span>
              </p>
            </div>
          )}

          {latestAI.missingElements?.length > 0 && (
            <div className="rounded-xl p-3 border border-amber-400/20" style={{ background: 'rgba(251,191,36,0.05)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <p className="text-xs font-semibold text-warmgray">Also Consider</p>
              </div>
              <ul className="space-y-1">
                {latestAI.missingElements.map((el, i) => (
                  <li key={i} className="text-xs text-warmgray flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span> {el}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AnswerDigest answers={answers} />
        </div>
      )}
    </div>
  );
}