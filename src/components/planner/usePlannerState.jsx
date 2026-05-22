import { useState, useCallback, useRef } from 'react';
import {
  getAIRecommendations,
  generateDynamicSteps,
  generateProjectBrief,
} from '@/services/generationService';

// Step 1: always static
export const FIRST_STEP = {
  id: 'projectType',
  title: 'What are you building?',
  subtitle: 'Choose the type of product you want to create.',
  type: 'select',
  options: [
    { value: 'web_app', label: 'Web Application', icon: '🌐', desc: 'Browser-based platform or dashboard' },
    { value: 'mobile_app', label: 'Mobile App', icon: '📱', desc: 'iOS and/or Android app' },
    { value: 'saas', label: 'SaaS Product', icon: '☁️', desc: 'Software as a service platform' },
    { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒', desc: 'Online store or marketplace' },
    { value: 'mvp', label: 'MVP / Prototype', icon: '🚀', desc: 'Quick validation of an idea' },
    { value: 'enterprise', label: 'Enterprise System', icon: '🏢', desc: 'Large-scale internal tool or portal' },
  ]
};

// Step 1b: type-specific refinement question inserted between step 1 and the description
function getTypeRefinementStep(projectType) {
  const steps = {
    mobile_app: {
      id: 'mobileplatform',
      title: 'What platform(s) do you need?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'android', label: 'Android', icon: '🤖', desc: 'Google Play Store' },
        { value: 'ios', label: 'iOS', icon: '🍎', desc: 'Apple App Store' },
        { value: 'both', label: 'Both (Cross-platform)', icon: '📱', desc: 'Flutter / React Native' },
        { value: 'pwa', label: 'Progressive Web App', icon: '🌐', desc: 'Web-based mobile experience' },
      ],
    },
    web_app: {
      id: 'webtype',
      title: 'What type of web application?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'dashboard', label: 'Dashboard / Portal', icon: '📊', desc: 'Data-driven internal tool' },
        { value: 'marketplace', label: 'Marketplace / Directory', icon: '🏪', desc: 'Connect buyers and sellers' },
        { value: 'social', label: 'Social / Community', icon: '👥', desc: 'User profiles and interactions' },
        { value: 'booking', label: 'Booking / Scheduling', icon: '📅', desc: 'Appointments or reservations' },
        { value: 'content', label: 'Content / Media Platform', icon: '📰', desc: 'Articles, videos, or courses' },
        { value: 'tool', label: 'Productivity Tool', icon: '🛠️', desc: 'Task, project, or workflow management' },
      ],
    },
    saas: {
      id: 'saasmodel',
      title: 'What best describes your SaaS model?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'b2b', label: 'B2B (Sell to businesses)', icon: '🏢', desc: 'Company subscriptions' },
        { value: 'b2c', label: 'B2C (Sell to consumers)', icon: '👤', desc: 'Individual subscriptions' },
        { value: 'multitenant', label: 'Multi-tenant Platform', icon: '🏗️', desc: 'Multiple isolated workspaces' },
        { value: 'api', label: 'API / Developer Tool', icon: '🔗', desc: 'Programmatic access for devs' },
        { value: 'vertical', label: 'Vertical SaaS', icon: '🏭', desc: 'Industry-specific solution' },
      ],
    },
    ecommerce: {
      id: 'ecommercetype',
      title: 'What type of e-commerce store?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'physical', label: 'Physical Products', icon: '📦', desc: 'Shipped goods and inventory' },
        { value: 'digital', label: 'Digital Products', icon: '💾', desc: 'Downloads, licenses, courses' },
        { value: 'subscription', label: 'Subscription / Box', icon: '🔁', desc: 'Recurring delivery model' },
        { value: 'marketplace', label: 'Multi-vendor Marketplace', icon: '🏪', desc: 'Multiple sellers on one platform' },
        { value: 'b2b', label: 'B2B / Wholesale', icon: '🏢', desc: 'Bulk orders and trade pricing' },
      ],
    },
    mvp: {
      id: 'mvpfocus',
      title: 'What is your MVP\'s primary focus?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'validate', label: 'Validate a business idea', icon: '🧪', desc: 'Test market demand quickly' },
        { value: 'fundraise', label: 'Raise investment / pitch', icon: '💰', desc: 'Demo for investors or stakeholders' },
        { value: 'users', label: 'Acquire early users', icon: '👥', desc: 'Launch and grow a waitlist' },
        { value: 'prototype', label: 'Working prototype', icon: '⚙️', desc: 'Functional proof of concept' },
        { value: 'automate', label: 'Automate a manual process', icon: '🤖', desc: 'Replace spreadsheets or manual work' },
      ],
    },
    enterprise: {
      id: 'enterprisetype',
      title: 'What type of enterprise system?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'erp', label: 'ERP / Operations', icon: '🏭', desc: 'Procurement, finance, logistics' },
        { value: 'crm', label: 'CRM / Sales', icon: '🤝', desc: 'Customer and pipeline management' },
        { value: 'hrm', label: 'HR / Workforce', icon: '👔', desc: 'People management and payroll' },
        { value: 'portal', label: 'Employee / Client Portal', icon: '🚪', desc: 'Self-service access and documents' },
        { value: 'analytics', label: 'Business Intelligence', icon: '📊', desc: 'Reporting dashboards and data' },
        { value: 'workflow', label: 'Workflow Automation', icon: '⚙️', desc: 'Approvals, routing, notifications' },
      ],
    },
  };
  return steps[projectType] || null;
}

// Step 2: always the project description — static but type-aware
function getProblemStep(projectType) {
  const configs = {
    web_app:    { title: 'Describe your web application.', subtitle: 'What problem does it solve? Who is it for? What makes it unique?', placeholder: 'e.g. A platform that helps marketing teams plan campaigns, track performance, and collaborate in one place...' },
    mobile_app: { title: 'Describe your mobile app.', subtitle: 'What does it do? What problem does it solve for users?', placeholder: 'e.g. A fitness tracking app that personalizes workout plans based on user progress and goals...' },
    saas:       { title: 'Describe your SaaS product.', subtitle: 'What does it do? What industry pain point does it solve?', placeholder: 'e.g. A subscription-based HR platform that automates onboarding, tracks employee performance, and integrates with payroll systems...' },
    ecommerce:  { title: 'Describe your e-commerce store.', subtitle: 'What are you selling? What makes your store different?', placeholder: 'e.g. A direct-to-consumer fashion brand with custom product configurator, size guide, and subscription boxes...' },
    mvp:        { title: 'What is your MVP idea?', subtitle: 'Describe your core concept and the hypothesis you want to validate.', placeholder: 'e.g. A two-sided marketplace connecting local handymen with homeowners — validating demand and pricing before full build...' },
    enterprise: { title: 'Describe the enterprise system.', subtitle: 'What process or workflow does it digitize or automate?', placeholder: 'e.g. A custom ERP for managing procurement, supplier relationships, and financial approvals across 15 regional offices...' },
  };
  const cfg = configs[projectType] || configs.web_app;
  return { id: 'problemStatement', type: 'textarea', ...cfg };
}

// Fallback steps in case AI generation fails
function getFallbackDynamicSteps(projectType) {
  return [
    {
      id: 'targetUsers',
      title: 'Who will use it?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'consumers', label: 'Consumers (B2C)', icon: '👥' },
        { value: 'businesses', label: 'Businesses (B2B)', icon: '🏢' },
        { value: 'enterprise', label: 'Enterprise Clients', icon: '🏛️' },
        { value: 'internal', label: 'Internal Teams', icon: '👨‍💼' },
        { value: 'developers', label: 'Developers', icon: '👨‍💻' },
        { value: 'startup', label: 'Startups / SMEs', icon: '🚀' },
      ]
    },
    {
      id: 'coreFeatures',
      title: 'What features do you need?',
      subtitle: 'Select all that apply.',
      type: 'multiselect',
      options: [
        { value: 'auth', label: 'User Authentication', icon: '🔐' },
        { value: 'dashboard', label: 'Admin Dashboard', icon: '📊' },
        { value: 'analytics', label: 'Analytics & Reporting', icon: '📈' },
        { value: 'notifications', label: 'Notifications', icon: '🔔' },
        { value: 'api', label: 'API Integrations', icon: '🔗' },
        { value: 'ai', label: 'AI / ML Features', icon: '🤖' },
        { value: 'search', label: 'Search & Filtering', icon: '🔍' },
        { value: 'roles', label: 'Roles & Permissions', icon: '🛡️' },
      ]
    },
    TIMELINE_STEP,
  ];
}

// Fixed timeline step — always the same regardless of project type
const TIMELINE_STEP = {
  id: 'timeline',
  title: 'What kind of project are you planning to build?',
  subtitle: 'This helps us scope the right level of effort and delivery plan.',
  type: 'select',
  options: [
    { value: 'mvp', label: 'MVP (Minimum Viable Product)', icon: '🚀', desc: 'Core features only, fast to market' },
    { value: 'full_release', label: 'Full Release Product', icon: '📦', desc: 'Complete product with all key features' },
    { value: 'enterprise', label: 'Enterprise Solution', icon: '🏢', desc: 'Large-scale, complex, mission-critical system' },
    { value: 'custom', label: 'Custom / Something Else', icon: '✏️', desc: 'Unique requirements or hybrid approach' },
  ],
};

// Map text icon names to emojis as fallback
const ICON_MAP = {
  user: '👤', users: '👥', graph: '📈', analytics: '📊', analytcis: '📊',
  check: '✅', currency: '💱', document: '📄', security: '🔐', notification: '🔔',
  mobile: '📱', integration: '🔗', ai: '🤖', workflow: '⚙️', dashboard: '📋',
  search: '🔍', chat: '💬', map: '📍', payment: '💳', audit: '🗂️',
  role: '🛡️', report: '📊', cloud: '☁️', api: '🔗', data: '🗄️',
  office: '🏢', partner: '🤝', manager: '👔', field: '🌍', customer: '👥',
  supplier: '🏭', finance: '💰', compliance: '📋', it: '💻', executive: '👔',
};

function resolveIcon(icon) {
  if (!icon) return '⚙️';
  // If it's already an emoji (non-ASCII), return as-is
  if (/\p{Emoji}/u.test(icon) && icon.length <= 4) return icon;
  // Otherwise map from text
  const key = icon.toLowerCase().replace(/[^a-z]/g, '');
  return ICON_MAP[key] || '⚙️';
}

function normalizeAiStepsPayload(raw) {
  if (!raw || typeof raw !== 'object') return {};
  if (raw.steps && typeof raw.steps === 'object') return raw.steps;
  return raw;
}

// Convert AI-generated step data into wizard step objects (fallback per section if LLM omits one)
function buildAISteps(aiSteps, projectType) {
  const normalized = normalizeAiStepsPayload(aiSteps);
  const fallback = getFallbackDynamicSteps(projectType);
  const fbTarget = fallback.find((s) => s.id === 'targetUsers');
  const fbFeatures = fallback.find((s) => s.id === 'coreFeatures');
  const steps = [];

  const targetUsers = normalized?.targetUsers;
  if (targetUsers?.options?.length) {
    steps.push({
      id: 'targetUsers',
      type: 'multiselect',
      title: targetUsers.title || fbTarget?.title || 'Who will use it?',
      subtitle: targetUsers.subtitle || fbTarget?.subtitle || 'Select all that apply.',
      options: targetUsers.options.map((o) => ({ ...o, icon: resolveIcon(o.icon) })),
    });
  } else if (fbTarget) {
    steps.push(fbTarget);
  }

  const coreFeatures = normalized?.coreFeatures;
  if (coreFeatures?.options?.length) {
    steps.push({
      id: 'coreFeatures',
      type: 'multiselect',
      title: coreFeatures.title || fbFeatures?.title || 'What features do you need?',
      subtitle: coreFeatures.subtitle || fbFeatures?.subtitle || 'Select all that apply.',
      options: coreFeatures.options.map((o) => ({ ...o, icon: resolveIcon(o.icon) })),
    });
  } else if (fbFeatures) {
    steps.push(fbFeatures);
  }

  steps.push(TIMELINE_STEP);

  return steps;
}

export function usePlannerState() {
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});
  const [aiData, setAiData] = useState({});
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [brief, setBrief] = useState(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [briefError, setBriefError] = useState('');
  const [phase, setPhase] = useState('wizard');
  const [currentStep, setCurrentStep] = useState(0);

  // AI-generated dynamic steps (set after problemStatement is answered)
  const [aiGeneratedSteps, setAiGeneratedSteps] = useState(null);
  const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);
  const aiStepsRef = useRef(null); // to avoid stale closure issues

  // Build the full step list
  const projectType = answers.projectType;
  const refinementStep = projectType ? getTypeRefinementStep(projectType) : null;
  const problemStep = projectType ? getProblemStep(projectType) : null;

  // After problemStatement, use AI steps (or fallback if still loading/failed)
  const postProblemSteps = aiGeneratedSteps || (isGeneratingSteps ? null : null);
  const preProblemSteps = [
    ...(refinementStep ? [refinementStep] : []),
    ...(problemStep ? [problemStep] : []),
  ];
  const dynamicSteps = projectType
    ? [...preProblemSteps, ...(postProblemSteps || getFallbackDynamicSteps(projectType))]
    : [];
  const allSteps = [FIRST_STEP, ...dynamicSteps];

  const submitAnswer = useCallback(async (stepId, value, note) => {
    const newAnswers = { ...answers, [stepId]: value };
    const newNotes = note ? { ...notes, [stepId]: note } : notes;
    setAnswers(newAnswers);
    if (note) setNotes(newNotes);
    setIsLoadingAI(true);

    // Fire AI recommendations for the live panel
    const aiRecsPromise = getAIRecommendations({
      step: stepId,
      answers: newAnswers,
      notes: newNotes,
    }).then(res => {
      if (res?.data?.data) {
        setAiData(prev => ({ ...prev, [stepId]: res.data.data }));
      }
    }).catch(() => {});

    // If user just answered the problem statement, generate personalized steps in parallel
    let stepsPromise = Promise.resolve();
    if (stepId === 'problemStatement' && newAnswers.projectType) {
      setIsGeneratingSteps(true);
      // Collect refinement answer (mobile platform, web type, etc.) if present
      const refinementKeys = ['mobileplatform','webtype','saasmodel','ecommercetype','mvpfocus','enterprisetype'];
      const refinementAnswer = refinementKeys.reduce((acc, k) => newAnswers[k] ? { ...acc, [k]: newAnswers[k] } : acc, {});
      stepsPromise = generateDynamicSteps({
        projectType: newAnswers.projectType,
        problemStatement: value,
        refinement: refinementAnswer,
      }).then(res => {
        const rawSteps = res?.data?.steps ?? res?.steps;
        if (rawSteps) {
          const built = buildAISteps(rawSteps, newAnswers.projectType);
          if (built.length > 0) {
            setAiGeneratedSteps(built);
            aiStepsRef.current = built;
          }
        }
      }).catch(() => {
        // Fallback steps remain
      }).finally(() => {
        setIsGeneratingSteps(false);
      });
    }

    // Wait for both
    await Promise.all([aiRecsPromise, stepsPromise]);
    setIsLoadingAI(false);

    // Small pause so user sees the AI insight before advancing
    await new Promise(r => setTimeout(r, 400));

    // Recalculate step count after AI steps may have loaded
    const currentAISteps = aiStepsRef.current;
    const updatedRefinement = newAnswers.projectType ? getTypeRefinementStep(newAnswers.projectType) : null;
    const updatedPreProblem = [
      ...(updatedRefinement ? [updatedRefinement] : []),
      getProblemStep(newAnswers.projectType),
    ];
    const updatedDynamic = newAnswers.projectType
      ? [...updatedPreProblem, ...(currentAISteps || getFallbackDynamicSteps(newAnswers.projectType))]
      : [];
    const updatedAllSteps = [FIRST_STEP, ...updatedDynamic];

    if (currentStep < updatedAllSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setPhase('review');
    }
  }, [answers, notes, currentStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const generateBrief = useCallback(async (contactInfo) => {
    setBriefError('');
    setIsGeneratingBrief(true);
    try {
      const allAnswers = { ...answers, ...contactInfo };
      const latestAIData = Object.values(aiData).pop() || {};
      const res = await generateProjectBrief({
        answers: allAnswers,
        aiSummary: latestAIData,
      });
      const maybeBrief =
        res?.data?.brief
        || res?.data?.data?.brief
        || res?.data?.result?.brief
        || res?.brief;

      if (maybeBrief) {
        setBrief(maybeBrief);
        setPhase('brief');
        return;
      }
      throw new Error('Could not generate the brief. Please try again in a moment.');
    } catch (err) {
      const msg =
        err?.response?.data?.error
        ?? err?.data?.error
        ?? err?.message
        ?? 'Could not generate the brief. Please try again.';
      setBriefError(typeof msg === 'string' ? msg : 'Could not generate the brief. Please try again.');
    } finally {
      setIsGeneratingBrief(false);
    }
  }, [answers, aiData]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setNotes({});
    setAiData({});
    setAiGeneratedSteps(null);
    aiStepsRef.current = null;
    setBrief(null);
    setPhase('wizard');
  }, []);

  // Pull timeline estimates from AI-generated timeline step
  const timelineStep = aiGeneratedSteps?.find(s => s.id === 'timeline');
  const aiTimelineEstimates = timelineStep?.timelineEstimates || null;

  // Aggregate latest AI insights
  const latestAI = Object.values(aiData).reduce((acc, cur) => ({
    ...acc,
    ...(cur.techStack?.length ? { techStack: cur.techStack } : {}),
    ...(cur.alternativeStack?.length ? { alternativeStack: cur.alternativeStack } : {}),
    ...(cur.missingElements?.length ? { missingElements: cur.missingElements } : {}),
    ...(cur.timelineWeeks ? { timelineWeeks: cur.timelineWeeks } : {}),
    latestRecommendation: cur.recommendation || acc.latestRecommendation,
  }), {
    // Pre-seed with AI timeline estimate for the selected option
    ...(aiTimelineEstimates && answers.timeline && aiTimelineEstimates[answers.timeline]
      ? { timelineWeeks: aiTimelineEstimates[answers.timeline] }
      : {}),
  });

  return {
    currentStep,
    allSteps,
    answers,
    notes,
    aiData,
    latestAI,
    isLoadingAI: isLoadingAI || isGeneratingSteps,
    isGeneratingSteps,
    brief,
    isGeneratingBrief,
    briefError,
    phase,
    setPhase,
    submitAnswer,
    goBack,
    generateBrief,
    restart,
  };
}