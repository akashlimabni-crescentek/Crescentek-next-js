import { useState, useEffect } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import ProjectTimeline from './ProjectTimeline';

const STEP_LABELS = {
  projectType: 'Project Type',
  problemStatement: 'Project Description',
  platform: 'Platforms',
  targetUsers: 'Target Users',
  coreFeatures: 'Core Features',
  timeline: 'Timeline',
};

const PROJECT_LABELS = { web_app: 'Web Application', mobile_app: 'Mobile App', saas: 'SaaS Product', ecommerce: 'E-commerce', mvp: 'MVP / Prototype', enterprise: 'Enterprise System' };
const TIMELINE_LABELS = { asap: 'ASAP (1–2 months)', '3months': '3 Months', '6months': '6 Months', '12months': '12 Months', flexible: 'Flexible / Not sure' };

function labelFor(stepId, value) {
  if (stepId === 'projectType') return PROJECT_LABELS[value] || value;
  if (stepId === 'timeline') return TIMELINE_LABELS[value] || value;
  if (stepId === 'problemStatement') return value;
  if (Array.isArray(value)) return value.map(v => v.replace(/_/g, ' ')).join(' · ');
  return String(value || '').replace(/_/g, ' ');
}

export default function ReviewScreen({ answers, latestAI, onGenerate, isGenerating, error }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isGenerating) { setElapsed(0); return; }
    setElapsed(0);
    const id = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [isGenerating]);

  const handleGenerate = () => onGenerate({});

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl lg:text-3xl text-ivory font-light mb-2">Review Your Project</h2>
        <p className="text-warmgray text-sm">Here's everything we've collected. Generate your AI-powered project brief below.</p>
      </div>

      {/* Answers summary */}
      <div className="rounded-xl border border-gold/15 divide-y divide-gold/10 overflow-hidden">
        {Object.entries(answers).filter(([k]) => STEP_LABELS[k]).map(([key, val]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-2 px-4 py-3">
            <span className="text-warmgray text-xs w-40 flex-shrink-0 pt-0.5">{STEP_LABELS[key]}</span>
            <span className="text-ivory text-sm">{labelFor(key, val)}</span>
          </div>
        ))}
      </div>

      {/* AI Summary */}
      {(latestAI.techStack?.length > 0 || latestAI.timelineWeeks) && (
        <div className="rounded-xl border border-gold/15 p-4" style={{ background: 'rgba(160,120,48,0.05)' }}>
          <p className="text-gold text-xs font-medium mb-3">AI Analysis Summary</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestAI.techStack?.length > 0 && (
              <div>
                <p className="text-warmgray text-xs mb-1.5">Recommended Stack</p>
                <div className="flex flex-wrap gap-1">
                  {latestAI.techStack.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(160,120,48,0.15)', color: '#A07830' }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
            {latestAI.timelineWeeks && (
              <div>
                {/* <p className="text-warmgray text-xs mb-1">Estimated Timeline</p> */}
                {/* <p className="text-ivory text-sm font-medium">{latestAI.timelineWeeks.min}–{latestAI.timelineWeeks.max} weeks</p> */}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Timeline visual */}
      <div className="rounded-xl border border-gold/15 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <ProjectTimeline phases={null} />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 hover:brightness-110 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
        style={{ background: '#A07830', color: '#FAF7F2' }}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating your brief… {elapsed}s
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            Generate My Project Brief
          </>
        )}
      </button>

      {!!error && (
        <p className="text-sm" style={{ color: '#DC2626' }}>
          {error}
        </p>
      )}
    </div>
  );
}