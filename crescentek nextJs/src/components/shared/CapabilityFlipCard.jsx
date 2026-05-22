import { LayoutGrid, BarChart3, Cloud, Code2, GitBranch, ShoppingCart } from 'lucide-react';
import { TP, tpGold } from '../technologies/technologyPageTheme';
import { goldAlpha, cardSurfaceGradient, cardShadowNeutral } from '../../lib/siteCardTheme';

const SD_CAP_ICONS = [LayoutGrid, BarChart3, Cloud, Code2, GitBranch, ShoppingCart];

const SD_CAP_FRONT_THIRD = [
  'Governance and ownership stay explicit across teams.',
  'Instrumentation hooks so you can prove value, not guess it.',
  'Hardening passes before anything touches production traffic.',
  'Accessibility and resilience treated as first-class requirements.',
  'Change logs and runbooks your stakeholders can actually use.',
  'Scope tied to milestones — no silent scope creep.',
];

const SD_CAP_FRONT_FALLBACK = [
  ['Architected for reliability, tenancy, and sane operational overhead.', 'Product and engineering stay aligned from discovery through launch.', 'Handoffs include documentation your team can run without us in the room.'],
  ['Narrative and metrics designed for decisions — not vanity charts.', 'Performance budgets and empty states handled with the same care as hero flows.', 'Exports and APIs so insights can live where your org already works.'],
  ['Contracts, versioning, and error semantics your integrators will thank you for.', 'AuthN/AuthZ, rate limits, and observability planned before the first consumer.', 'Regression suites that protect public surfaces as you iterate.'],
  ['Least-privilege models, audit-friendly patterns, and clear role matrices.', 'Flows reviewed for edge cases — invite, recovery, and escalation paths.', 'Security posture you can explain to compliance without hand-waving.'],
  ['Profiling, caching, and payload discipline as part of the definition of done.', 'Budgets agreed up front so optimizations are targeted, not frantic.', 'Before/after evidence so stakeholders see the impact in hard numbers.'],
  ['Roadmaps, SLAs, and upgrade paths that respect uptime and your users.', 'Debt paydown scheduled — not deferred until it becomes an emergency.', 'Knowledge transfer so velocity does not walk out the door with a vendor.'],
];

const SD_CAP_BACK_PREMIUM = [
  ['Executive-ready demos at every milestone — no surprises in the final week.', 'Release playbooks with rollback paths tested before go-live.'],
  ['Metric definitions agreed before build so dashboards survive the first real quarter.', 'Drill-downs and alerts tuned to how your team actually decides.'],
  ['Consumer SDKs and internal tools treated with the same rigor as the product UI.', 'Staging environments that mirror prod contracts — fewer "works on my machine" gaps.'],
  ['Threat modeling on sensitive journeys — not a checkbox after launch.', 'Session, device, and recovery flows validated under realistic abuse cases.'],
  ['Core Web Vitals and real-user monitoring folded into acceptance criteria.', 'A performance story you can defend in boardrooms and RFPs.'],
  ['Predictable cadence: triage, patch, and communicate — not heroic fire drills.', 'Deprecation and LTS thinking so upgrades feel boring (in the best way).'],
];

function processStepBullets(desc) {
  if (!desc || !String(desc).trim()) return [];
  const t = String(desc).trim().replace(/\.\s*$/, '');
  const commaParts = t.split(/,\s*/).map((s) => s.replace(/^(and\s+)/i, '').trim()).filter(Boolean);
  if (commaParts.length >= 2 && commaParts.length <= 6) return commaParts.slice(0, 3);
  const withParts = t.split(/\s+with\s+/i).map((s) => s.trim()).filter(Boolean);
  if (withParts.length === 2) return withParts.slice(0, 3);
  const andParts = t.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
  if (andParts.length >= 2) return andParts.slice(0, 3);
  const sentences = t.split(/\.\s+/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length >= 2) return sentences.slice(0, 3);
  return [t];
}

function capabilityKeywordTriplets(lower) {
  if (/(saas|subscription|tenant|platform)/i.test(lower)) return ['Multi-tenant boundaries, billing hooks, and admin ergonomics by design.', 'Feature flags and safe rollout paths for a product that never truly "ships once."', 'Operational dashboards for support, success, and engineering on-call.'];
  if (/(dashboard|analytic|report|metric)/i.test(lower)) return ['Signal over noise: cohorts, funnels, and dimensions that match how you sell.', 'Role-aware views so executives and operators each get the right altitude.', 'Export and API paths when spreadsheets and warehouses are part of the truth.'];
  if (/(api|graphql|integration|webhook)/i.test(lower)) return ['Versioned contracts, idempotency, and error models integrators can trust.', 'Load and abuse scenarios modeled before your first partner goes live.', 'Documentation and sandboxes that reduce back-and-forth with client teams.'];
  if (/(auth|role|permission|access|sso)/i.test(lower)) return ['Identity flows that survive real-world recovery, invite, and offboarding cases.', 'Policy and audit trails that stand up to security and compliance questions.', 'Progressive enhancement — from email/password to enterprise SSO when you need it.'];
  if (/(performance|speed|optimize|vitals|seo)/i.test(lower)) return ['Profiling-led fixes: fewer guesses, more measurable wins per sprint.', 'Caching, payload, and render strategies aligned to your traffic profile.', 'Monitoring and budgets so regressions are caught before customers do.'];
  if (/(maintenance|upgrade|support|sustain)/i.test(lower)) return ['Roadmaps that balance new capability with stability and debt paydown.', 'Runbooks, ownership, and escalation paths your team can operate day two.', 'Release hygiene: changelogs, migrations, and comms your users expect.'];
  if (/(mobile|ios|android|app store|push|offline)/i.test(lower)) return ['Store readiness: guidelines, assets, and review cycles factored into the plan.', 'Offline, sync, and notification behavior that feels intentional — not bolted on.', 'Device labs and real-network testing so polish survives the commute.'];
  if (/(ci\/cd|pipeline|devops|kubernetes|terraform|docker|infra)/i.test(lower)) return ['Pipelines with quality gates that match your risk tolerance — not generic templates.', 'Infrastructure as code with reviewable diffs and reproducible environments.', 'Observability and incident hooks so on-call is informed, not blind.'];
  if (/(design|ux|ui|wireframe|prototype|wcag|accessibility|figma)/i.test(lower)) return ['Research-backed flows — validated before pixels are locked.', 'Design systems and tokens that keep product and marketing visually coherent.', 'Accessibility treated as a release criterion, not a late audit surprise.'];
  if (/(shop|checkout|commerce|payment|storefront|e-?commerce)/i.test(lower)) return ['Checkout and catalog flows optimized for trust, speed, and fewer abandoned carts.', 'Payments, tax, and fulfillment integrations with clear failure handling.', 'Merchandising and search tuned for discovery — not just pretty grids.'];
  if (/(cms|wordpress|content|headless|editor|migration)/i.test(lower)) return ['Editor workflows that real marketers can own — without filing tickets for typos.', 'Structured content models that scale to new locales and channels.', 'Migrations with redirects, SEO continuity, and rollback plans.'];
  if (/(market|seo|campaign|ads|landing|conversion|content plan)/i.test(lower)) return ['Attribution and experiments you can defend when budgets get scrutinized.', 'Landing and funnel copy engineered for clarity — not jargon.', 'Reporting cadences leadership can rely on week over week.'];
  return null;
}

function capabilityBackKeywordLines(lower, i) {
  if (/(saas|subscription|tenant|platform)/i.test(lower)) return ['Tenant-safe releases with feature flags and observability baked in.', 'Executive narrative: velocity, risk, and runway on one page.'];
  if (/(dashboard|analytic|report|metric)/i.test(lower)) return ['Metric contracts agreed with finance and product — not invented in the BI tool.', 'Drill paths that answer "why?" in two clicks, not twenty.'];
  if (/(api|graphql|integration|webhook)/i.test(lower)) return ['Partner-ready docs and sandboxes that shorten integration time.', 'SLOs and error budgets that keep public APIs trustworthy at scale.'];
  if (/(auth|role|permission|access|sso)/i.test(lower)) return ['Security review artifacts your CISO can file without rework.', 'Recovery and audit stories that survive real incidents.'];
  if (/(performance|speed|optimize|vitals|seo)/i.test(lower)) return ['Before/after evidence tied to revenue and retention — not vanity scores.', 'Guardrails in CI so performance does not regress by accident.'];
  if (/(maintenance|upgrade|support|sustain)/i.test(lower)) return ['Upgrade windows that respect users in every timezone.', 'Knowledge transfer so your team owns the roadmap — not the backlog.'];
  if (/(mobile|ios|android|app store|push|offline)/i.test(lower)) return ['Release trains that handle store review and staged rollouts calmly.', 'Crash and ANR budgets tracked like any other product KPI.'];
  if (/(ci\/cd|pipeline|devops|kubernetes|terraform|docker|infra)/i.test(lower)) return ['Blast radius contained: progressive delivery and automated rollback.', 'Cost and reliability trade-offs documented — not discovered in invoices.'];
  if (/(design|ux|ui|wireframe|prototype|wcag|accessibility|figma)/i.test(lower)) return ['Design QA that catches drift before it ships to customers.', 'Accessibility sign-off as part of the definition of done.'];
  if (/(shop|checkout|commerce|payment|storefront|e-?commerce)/i.test(lower)) return ['Checkout experiments with guardrails — fewer "hero" rewrites.', 'Ops-ready playbooks for peak traffic and payment edge cases.'];
  if (/(cms|wordpress|content|headless|editor|migration)/i.test(lower)) return ['Editor training and governance so content quality holds over time.', 'SEO and redirect discipline through migration weekend — and after.'];
  if (/(market|seo|campaign|ads|landing|conversion|content plan)/i.test(lower)) return ['Experiment backlog prioritized by expected lift — not loudest stakeholder.', 'Board-ready summaries: pipeline, CAC, and channel efficiency.'];
  return SD_CAP_BACK_PREMIUM[i % SD_CAP_BACK_PREMIUM.length];
}

function featureCapabilityLines(text, i) {
  const raw = String(text || '').trim();
  const t = raw.replace(/&/g, ' and ');
  const parts = processStepBullets(t);
  if (parts.length >= 2) {
    const out = parts.slice(0, 3);
    if (out.length === 2) out.push(SD_CAP_FRONT_THIRD[i % SD_CAP_FRONT_THIRD.length]);
    return out;
  }
  const kw = capabilityKeywordTriplets(raw.toLowerCase());
  if (kw) return kw;
  return SD_CAP_FRONT_FALLBACK[i % SD_CAP_FRONT_FALLBACK.length];
}

function featureCapabilityBackLines(text, i) {
  return capabilityBackKeywordLines(String(text || '').trim().toLowerCase(), i);
}

export default function CapabilityFlipCard({ text, index }) {
  const Icon = SD_CAP_ICONS[index % SD_CAP_ICONS.length];
  const frontLines = featureCapabilityLines(text, index);
  const backLines = featureCapabilityBackLines(text, index);
  const labelId = `cap-title-${index}-${text.slice(0, 8).replace(/\s/g, '')}`;

  return (
    <div className="sd-cap-glow-wrap relative h-full w-full flex flex-col">
      <div
        className="sd-cap-flip group relative flex h-full min-h-[12rem] w-full flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#A07830]"
        style={{ perspective: '1180px', WebkitPerspective: '1180px' }}
        tabIndex={0}
        aria-labelledby={labelId}
      >
        <div className="sd-cap-flip-inner relative h-full min-h-[12rem] w-full rounded-2xl [transform-style:preserve-3d] transition-transform duration-500 ease-out">
          {/* Front */}
          <div
            className="sd-cap-flip-face sd-cap-flip-face-front relative z-[1] flex min-h-full flex-col rounded-2xl border overflow-hidden p-5 sm:p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
            style={{
              borderColor: goldAlpha('1C'),
              background: cardSurfaceGradient,
              boxShadow: `${cardShadowNeutral}, inset 0 1px 0 rgba(255,255,255,0.92)`,
            }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: tpGold('0E'), border: `1px solid ${goldAlpha('28')}`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)' }}
              aria-hidden
            >
              <Icon size={22} strokeWidth={1.45} style={{ color: TP.gold }} />
            </div>
            <p className="mt-4 text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: TP.gold }}>
              Engagement scope
            </p>
            <h3 id={labelId} className="mt-2 font-heading font-semibold text-base sm:text-[1.05rem] leading-snug tracking-tight pr-1" style={{ color: TP.ink }}>
              {text}
            </h3>
            <ul className="mt-3 space-y-2.5 list-none m-0 p-0 shrink-0">
              {frontLines.map((line, j) => (
                <li key={j} className="flex gap-2 text-[13px] sm:text-sm leading-relaxed" style={{ color: TP.muted }}>
                  <span className="shrink-0 font-medium select-none mt-0.5" style={{ color: TP.gold }}>·</span>
                  <span className="min-w-0 break-words">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back */}
          <div
            className="sd-cap-flip-face sd-cap-flip-face-back absolute inset-0 flex flex-col rounded-2xl border overflow-hidden p-5 sm:p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{
              borderColor: goldAlpha('40'),
              background: `linear-gradient(158deg, rgba(253,248,240,0.98) 0%, rgba(250,244,232,0.96) 42%, ${tpGold('18')} 120%)`,
              boxShadow: `inset 0 0 0 1px ${goldAlpha('18')}, inset 0 -24px 48px ${tpGold('08')}`,
            }}
            aria-hidden
          >
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(100% 80% at 100% 0%, ${tpGold('22')}, transparent 55%)` }} aria-hidden />
            <div className="relative z-[1] flex flex-col flex-1">
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: TP.gold }}>Delivery lens</p>
              <h3 className="mt-2 font-heading font-semibold text-base sm:text-[1.05rem] leading-snug text-balance" style={{ color: TP.ink }}>{text}</h3>
              <ul className="mt-4 space-y-2.5 list-none m-0 p-0">
                {backLines.map((line, j) => (
                  <li key={j} className="flex gap-2 text-[13px] sm:text-sm leading-relaxed" style={{ color: TP.muted }}>
                    <span className="shrink-0 select-none mt-0.5" style={{ color: TP.gold }}>✦</span>
                    <span className="min-w-0 break-words">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
