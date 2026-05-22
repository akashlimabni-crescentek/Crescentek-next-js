'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { portfolioAppImage, portfolioSiteImage, resolveAssetUrl } from '@/lib/assetUrl';

const coachplusImg = portfolioAppImage('coachplus.jpg');
const beefplanMovementImg = portfolioAppImage('beefplan-movement.png');
const cercaSchoolImg = portfolioAppImage('cerca-school.png');
const cercaStudentImg = portfolioAppImage('cerca-student.png');
const foodWineWithLoveImg = portfolioAppImage('food-wine-with-love.png');
const solarflowImg = portfolioAppImage('solarflow.png');
const riliAiImg = portfolioAppImage('rili-ai.png');
const nationalEmploymentRecordImg = portfolioAppImage('national-employment-record.png');
const driverCheckImg = portfolioAppImage('driver-check.png');
const ccnImg = portfolioAppImage('ccn.png');
const optraStaffImg = portfolioAppImage('optra-staff.png');
const priorityWinePassImg = portfolioAppImage('priority-wine-pass.png');
const macfayeAutomationImg = portfolioSiteImage('macfaye-automation.png');
const vollerelanImg = portfolioSiteImage('vollerelan.png');
const yuEnergyImg = portfolioSiteImage('yu-energy.png');
const boxedStorageImg = portfolioSiteImage('boxed-storage.png');
const richieBagsImg = portfolioSiteImage('richie-bags.png');
const igniteCompsImg = portfolioSiteImage('ignite-comps.png');
const indianNutritionistImg = portfolioSiteImage('indian-nutritionist.png');
const cityDentalImg = portfolioSiteImage('city-dental.png');
const crazyMonkeyImg = portfolioSiteImage('crazy-monkey.png');
const rugshopImg = portfolioSiteImage('rugshop.png');
const plusPromotionsImg = portfolioSiteImage('plus-promotions.png');
const powernsunImg = portfolioSiteImage('powernsun.png');
const mortgageDepotImg = portfolioSiteImage('mortgage-depot.png');
const domainBrokerImg = portfolioSiteImage('domain-broker.png');
const dynamostolImg = portfolioSiteImage('dynamostol.png');
const dynamostolDeImg = portfolioSiteImage('dynamostol-de.png');
const dynamostolDkImg = portfolioSiteImage('dynamostol-dk.png');
const dynamostolSeImg = portfolioSiteImage('dynamostol-se.png');
const evaLastImg = portfolioSiteImage('eva-last.png');
const evaLastDeImg = portfolioSiteImage('eva-last-de.png');
const evaLastFrImg = portfolioSiteImage('eva-last-fr.png');
const evaLastKrImg = portfolioSiteImage('eva-last-kr.png');
const evaLastNlImg = portfolioSiteImage('eva-last-nl.png');
const evaLastMxImg = portfolioSiteImage('eva-last-mx.png');
const evaLastNzImg = portfolioSiteImage('eva-last-nz.png');
const evaLastUkImg = portfolioSiteImage('eva-last-uk.png');
const evaLastZaImg = portfolioSiteImage('eva-last-za.png');
const executiveServicesImg = portfolioSiteImage('executive-services.png');
const farrelySouthernImg = portfolioSiteImage('farrely-southern.png');
const ftLauderdaleRealtyImg = portfolioSiteImage('ft-lauderdale-realty.png');
const myHeadHunterImg = portfolioSiteImage('my-head-hunter.png');
const myGugImg = portfolioSiteImage('mygug.png');
const jamaicaEstatesRealtyImg = portfolioSiteImage('jamaica-estates-realty.png');
const johnDowlingShoesImg = portfolioSiteImage('john-dowling-shoes.png');
const keyniusImg = portfolioSiteImage('keynius.png');
const getHealthcareImg = portfolioSiteImage('get-healthcare.png');
const livGastroImg = portfolioSiteImage('liv-gastro.png');
const olssenImg = portfolioSiteImage('olssen.png');
const olssenBeImg = portfolioSiteImage('olssen-be.png');
const olssenEuImg = portfolioSiteImage('olssen-eu.png');
const olssenFrImg = portfolioSiteImage('olssen-fr.png');
const olssenNlImg = portfolioSiteImage('olssen-nl.png');
import Link from '@/components/navigation/AppLink';
import RevealSection from '../components/shared/RevealSection';
import TechnologyLogo from '../components/technologies/TechnologyLogo';
import { TECHNOLOGIES } from '../lib/technologiesData';
import { TECHNOLOGY_CATEGORIES } from '../lib/technologyCategoriesData';
import { SITE_GOLD, SITE_INK, SITE_MUTED, goldAlpha } from '../lib/siteCardTheme';
import { ArrowUpRight, ExternalLink, Smartphone, Monitor, ShoppingCart, Layers, LayoutGrid, Cloud, Palette, LineChart, Database, Code2, Brain } from 'lucide-react';

const BRAND_LOGO_PUBLIC_PATH = '/brand-logo.png';

const PORTFOLIO_MEDIA_ROUNDED_TOP = 'rounded-t-[18px] sm:rounded-t-[20px]';
const PORTFOLIO_CARD_ROUNDED = 'rounded-[18px] sm:rounded-[20px]';

/** Placeholder: Crescentek wordmark when no project image */
function PortfolioFallbackLogo() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center ${PORTFOLIO_MEDIA_ROUNDED_TOP} border border-dashed border-[#D4C4A8]/80 bg-[#EDE6DC]/95`}
        role="img"
        aria-label="Image coming soon"
      >
        <span className="px-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8478]">Image soon</span>
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-[#EDE6DC] ${PORTFOLIO_MEDIA_ROUNDED_TOP}`}>
      <img
        src={BRAND_LOGO_PUBLIC_PATH}
        alt="Crescentek"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="max-h-[min(88%,12rem)] w-auto max-w-[min(88%,14rem)] object-contain object-center opacity-[0.94]"
      />
    </div>
  );
}

/** Page wash behind portfolio grid — slightly cooler than cards (reference) */
const LIGHT_SECTION_BG = 'linear-gradient(180deg, #FDFBF7 0%, #F8F4ED 48%, #F2EBE2 100%)';
const LIGHT_SECTION_VEIL =
  'radial-gradient(ellipse 90% 60% at 20% 0%, rgba(160,120,48,0.10), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(160,120,48,0.06), transparent 50%)';

/** Portfolio grid: full-width feel without oversized gutters; 1200–1400px editorial measure */
const PORTFOLIO_SHELL = 'mx-auto w-full max-w-[min(100%,1340px)] px-4 sm:px-5 lg:px-8';
const PORTFOLIO_GRID =
  'grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 [&>div]:min-h-0 [&>div]:h-full';
/** Card surface — warm beige vs page cream (reference ~#F7F2E9) */
/** `transition-all duration-300` matches file.jsx `.work-card` hover feel */
const PORTFOLIO_CARD_BASE = `portfolio-card group relative flex h-full min-h-0 flex-col overflow-hidden border border-[#E8E0D4] bg-[#F7F2E9] shadow-[0_10px_32px_rgba(42,38,32,0.07)] transition-all duration-300 ${PORTFOLIO_CARD_ROUNDED}`;
/** Media strip — soft neutral behind cover images */
const PORTFOLIO_MEDIA_SHELL = `portfolio-card-media relative z-[1] isolate w-full shrink-0 aspect-[4/3] overflow-hidden bg-[#EDE6DC] ${PORTFOLIO_MEDIA_ROUNDED_TOP}`;
/** Project image: full width/height of frame, centered crop, no letterboxing */
const PORTFOLIO_PROJECT_IMG =
  'portfolio-card-project-img absolute inset-0 block h-full w-full object-cover object-center';
/** ~24–32px horizontal padding (reference) */
const PORTFOLIO_BODY_SHELL =
  'portfolio-card-body relative z-[1] flex min-h-0 flex-1 flex-col px-6 pb-6 pt-5 text-left sm:px-8 sm:pb-7 sm:pt-6';

/** Gold gradient frame on hover — from file.jsx `MobileAppCard` / `.work-card` */
function PortfolioCardHoverRing() {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${PORTFOLIO_CARD_ROUNDED}`}
      style={{
        padding: '1px',
        background: 'linear-gradient(135deg, #A07830, rgba(160,120,48,0.3))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
      }}
      aria-hidden
    />
  );
}
/** Tag pills — light tan wash, muted golden-brown text (reference) */
const PORTFOLIO_TAG_PILL =
  'rounded-full border border-[#D4C4A8] bg-[rgba(166,139,103,0.12)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#8B6F47]';
/** Store / site links — full pill (rounded-full) like reference App Store / Play Store */
const PORTFOLIO_ACTION_BTN =
  'store-btn portfolio-card-action inline-flex min-h-[2.5rem] flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full border border-[rgba(160,120,48,0.22)] bg-[rgba(160,120,48,0.1)] px-4 py-2.5 text-center text-[11px] font-medium leading-tight text-[#A07830] transition-all duration-200 active:scale-[0.99] sm:min-h-[2.65rem] sm:text-xs [&_svg]:shrink-0';
/** Divider above actions */
const PORTFOLIO_ACTION_ROW =
  'mt-auto mt-5 flex w-full shrink-0 flex-wrap gap-2 border-t border-[#E5DCCD] pt-4';
/** Fixed 4-line description block — short copy still uses same height (no scroll, no uneven cards) */
const PORTFOLIO_DESC_TEXT =
  'portfolio-card-desc line-clamp-4 overflow-hidden text-left text-sm leading-relaxed text-[#6B6560] sm:text-[15px] sm:leading-relaxed';
const PORTFOLIO_DESC_BLOCK = 'min-h-[5.75rem] shrink-0 sm:min-h-[6.35rem]';

/** Curated short descriptions for web portfolio cards (existing site data + overrides) */
const WEB_MICRO_BY_NAME = {
  'MacFaye Automation': 'AI-powered workflow automation for modern businesses',
  'Stephen Hayes Automation': 'Industrial automation and smart control solutions',
  'The Tech Partner': 'Technology partnership and delivery, clearly communicated',
  'AgentSnap': 'Agent and workflow tooling with a crisp product story',
  'Keynius': 'Enterprise access and smart-lock experience on the web',
  'Indian Nutritionist': 'Nutrition guidance and programmes with a trusted voice',
  'YU Energy': 'Energy supplier digital experience built for clarity',
};
const WEB_MICRO_BY_CATEGORY = {
  Business: 'Professional web presence built for growth',
  Hospitality: 'Warm, inviting hospitality experience online',
  'E-commerce': 'Modern eCommerce storefront and brand experience',
  SaaS: 'Focused SaaS marketing and product story',
  Aviation: 'Aviation services with a clear, confident presence',
  Travel: 'Travel storytelling with practical discovery paths',
  Services: 'Service-first website that builds trust fast',
  Marketing: 'Performance-led agency and marketing presence',
  Health: 'Healthcare and wellness positioning done right',
  Energy: 'Energy sector branding with clarity and scale',
  'Real Estate': 'Property and real estate discovery experience',
  'Food & Drink': 'Food & drink brand experience customers taste first',
  'Multi-language': 'Global-ready localized product experience',
  Entertainment: 'Bold entertainment presence that engages fans',
};

function websiteCardMicro(site) {
  if (site.summary?.trim()) return site.summary.trim();
  if (site.micro?.trim()) return site.micro.trim();
  return WEB_MICRO_BY_NAME[site.name] ?? WEB_MICRO_BY_CATEGORY[site.category] ?? 'Tailored web experience for your audience';
}

const techNameMap = Object.fromEntries(TECHNOLOGIES.map(t => [t.slug, t.name]));
const CATEGORY_ICON_MAP = { ShoppingCart, Monitor, Layers, Smartphone, LayoutGrid, Cloud, Palette, LineChart, Database, Brain, Code2 };

const MOBILE_APPS = [
  { name: 'CoachPlus', desc: 'A comprehensive coaching and fitness management platform connecting coaches with athletes for training plans, performance tracking, and real-time communication.', ios: 'https://apps.apple.com/in/app/coachplus/id1576158679', android: 'https://play.google.com/store/apps/details?id=com.coachplus.app', tags: ['Health & Fitness', 'React Native'], image: coachplusImg },
  { name: 'RILI – AI App', desc: 'An AI-powered companion app that uses advanced machine learning to deliver personalised experiences, smart recommendations, and conversational intelligence.', ios: 'https://apps.apple.com/in/app/rili/id6463419831', android: 'https://play.google.com/store/apps/details?id=ai.riliai.Rili', tags: ['Artificial Intelligence', 'Flutter'], image: riliAiImg },
  { name: 'National Employment Record', desc: 'An official national employment record system for Ireland, enabling seamless digital management of employment data for HSE and government stakeholders.', ios: 'https://apps.apple.com/ie/app/national-employment-record/id6443563837', android: 'https://play.google.com/store/apps/details?id=ie.hse.nchder', tags: ['Government', 'React Native'], image: nationalEmploymentRecordImg },
  { name: 'Driver Check', desc: 'A professional driver verification and compliance platform used by fleet operators and transport companies to ensure driver credentials and road safety standards.', ios: 'https://apps.apple.com/ie/app/driver-check/id596979333', android: 'https://play.google.com/store/apps/details?id=com.osds.cabs2', tags: ['Fleet & Transport', 'React Native'], image: driverCheckImg },
  { name: 'Findmyguide', desc: 'A travel discovery platform that connects tourists with local guides for authentic, personalised experiences. Available across major travel destinations worldwide.', ios: 'https://apps.apple.com/in/app/findmyguide/id1564383542', android: 'https://play.google.com/store/apps/details?id=com.findmyguide.app', tags: ['Travel & Tourism', 'Flutter'] },
  { name: 'GreenBike', desc: 'An eco-friendly bike sharing and rental platform promoting sustainable urban mobility. Features real-time bike tracking, route planning, and cashless payments.', ios: 'https://apps.apple.com/in/app/greenbike/id1580123456', android: 'https://play.google.com/store/apps/details?id=com.greenbike.app', tags: ['Sustainability', 'React Native'] },
  { name: 'SolarFlow', desc: 'A solar energy management app helping users monitor and optimise their solar power systems with real-time data and intelligent insights.', ios: 'https://apps.apple.com/in/app/solar-flow/id6742647715', android: 'https://play.google.com/store/search?q=solarflow&c=apps&hl=en_IN', tags: ['Energy', 'React Native'], image: solarflowImg },
  { name: 'Beef Plan Movement', desc: 'A dedicated platform for the Beef Plan Movement, enabling farmers and stakeholders to stay connected, access resources, and coordinate industry activities.', ios: null, android: 'https://play.google.com/store/apps/details?id=com.beefplan&hl=en_IN', tags: ['Agriculture', 'React Native'], image: beefplanMovementImg },
  { name: 'CCN', desc: 'A collectible alerts and notifications app keeping collectors informed about new drops, price changes, and marketplace activity in real time.', ios: 'https://apps.apple.com/us/app/ccn-tcg-collectible-alerts/id1609983545', android: 'https://play.google.com/store/apps/details?id=com.crepchiefnotify.android&listing=website', tags: ['Collectibles', 'Flutter'], image: ccnImg },
  { name: 'Priority Wine Pass', desc: 'A premium wine discovery and membership app offering exclusive access to curated wine selections, tastings, and special offers for wine enthusiasts.', ios: 'https://apps.apple.com/in/app/priority-wine-pass/id1264985049', android: 'https://play.google.com/store/apps/details?id=com.prioritywinepass.app', tags: ['Food & Drink', 'React Native'], image: priorityWinePassImg },
  { name: 'Cerca Student', desc: 'A student-focused companion app enabling students to manage their learning journey, connect with educators, and track academic progress.', ios: 'https://apps.apple.com/in/app/cerca-student/id6504777209', android: 'https://play.google.com/store/apps/details?id=com.cerca.parent&pcampaignid=web_share', tags: ['Education', 'Flutter'], image: cercaSchoolImg },
  { name: 'Cerca', desc: 'A comprehensive school management platform connecting staff, parents, and administrators for seamless communication and institutional management.', ios: 'https://apps.apple.com/in/app/cerca-school/id6739522786', android: 'https://play.google.com/store/apps/details?id=com.cerca.staff&pcampaignid=web_share', tags: ['Education', 'Flutter'], image: cercaStudentImg },
  { name: 'Optra Staff', desc: 'A workforce management app empowering staff with scheduling, task management, and real-time communication tools for operational efficiency.', ios: 'https://apps.apple.com/in/app/optraa-staff/id1638178468', android: 'https://play.google.com/store/apps/details?id=com.optra.staff&pcampaignid=web_share', tags: ['Workforce', 'React Native'], image: optraStaffImg },
  { name: 'Optra Parent', desc: "A parent engagement app keeping parents informed and connected with their children's school activities and progress.", ios: 'https://apps.apple.com/in/app/optraa-parent/id1103262226', android: 'https://play.google.com/store/apps/details?id=com.optraindia.parent&pcampaignid=web_share', tags: ['Education', 'React Native'] },
  { name: 'Food and Wine with Love', desc: 'A culinary lifestyle app celebrating the art of food and wine pairing, offering recipes, expert recommendations, and curated dining experiences.', ios: 'https://apps.apple.com/in/app/food-and-wine-with-love/id1543690100', android: 'https://play.google.com/store/apps/details?id=app.fwl.com', tags: ['Food & Drink', 'Flutter'], image: foodWineWithLoveImg },
];

const WEBSITES = [
  { name: 'MacFaye Automation', url: 'https://macfayeautomation.ie', category: 'Business', image: macfayeAutomationImg },
  { name: 'The Tech Partner', url: 'https://thetechpartner.ie', category: 'Business' },
  { name: 'House of Cork', url: 'https://houseofcork.ie', category: 'Hospitality' },
  { name: 'Miami Beach Bar', url: 'https://miamibeachbar.ie', category: 'Hospitality' },
  { name: 'MyGug', url: 'https://mygug.eu', category: 'E-commerce', image: myGugImg },
  { name: 'Toys & Games', url: 'https://toysandgames.ie', category: 'E-commerce' },
  { name: 'Crazy Monkey', url: 'https://www.crazymonkey.ie', category: 'E-commerce', image: crazyMonkeyImg },
  { name: 'Boxed Storage', url: 'https://boxedstorage.ie', category: 'E-commerce', image: boxedStorageImg },
  { name: 'Richie Bags', url: 'https://www.richiebags.com', category: 'E-commerce', image: richieBagsImg },
  { name: 'Rugshop', url: 'https://rugshop.ie', category: 'E-commerce', image: rugshopImg },
  { name: 'AgentSnap', url: 'https://agentsnap.io', category: 'SaaS' },
  { name: 'Keynius', url: 'https://keynius.eu', category: 'SaaS', image: keyniusImg },
  { name: 'Ignite Comps', url: 'https://ignitecomps.co.uk', category: 'SaaS', image: igniteCompsImg },
  { name: 'Premier Flight', url: 'https://premierflight.ie', category: 'Aviation' },
  { name: 'Colours of Ireland', url: 'https://coloursofireland.ie', category: 'Travel' },
  { name: 'Galway Cleaners', url: 'https://galwaycleaners.ie', category: 'Services' },
  { name: 'Executive Services', url: 'https://executiveservices.hu', category: 'Services', image: executiveServicesImg },
  { name: 'Farrely Southern', url: 'https://farrellysouthern.ie', category: 'Services', image: farrelySouthernImg },
  { name: 'John Dowling Shoes', url: 'https://johndowlingshoes.ie', category: 'Services', image: johnDowlingShoesImg },
  { name: 'Plus Promotions', url: 'https://pluspromotions.ie', category: 'Marketing', image: plusPromotionsImg },
  { name: 'Indian Nutritionist', url: 'https://indiannutritionist.com', category: 'Health', image: indianNutritionistImg },
  { name: 'Get Healthcare', url: 'https://gethealthcare.ie', category: 'Health', image: getHealthcareImg },
  { name: 'City Dental', url: 'https://citydental.com', category: 'Health', image: cityDentalImg },
  { name: 'YU Energy', url: 'https://www.yuenergy.co.uk', category: 'Energy', image: yuEnergyImg },
  { name: 'Powernsun', url: 'https://powernsun.com', category: 'Energy', image: powernsunImg },
  { name: 'Mortgage Depot', url: 'https://mortgagedepot.com', category: 'Real Estate', image: mortgageDepotImg },
  { name: 'Jamaica Estates Realty', url: 'https://jamaicaestatesrealty.com', category: 'Real Estate', image: jamaicaEstatesRealtyImg },
  { name: 'My Head Hunter', url: 'https://myheadhunter.com', category: 'Real Estate', image: myHeadHunterImg },
  { name: 'Domain Broker', url: 'https://domainbroker.org', category: 'Real Estate', image: domainBrokerImg },
  { name: 'Ft Lauderdale Realty', url: 'https://ftlauderdalerealty.com', category: 'Real Estate', image: ftLauderdaleRealtyImg },
  { name: 'Liv Gastro', url: 'https://livgastro.in', category: 'Food & Drink', image: livGastroImg },
  { name: 'Vollerelan', url: 'https://www.vollerelan.de', category: 'Food & Drink', image: vollerelanImg },
  { name: 'EVA Last', url: 'https://www.eva-last.com', category: 'Multi-language', image: evaLastImg },
  { name: 'EVA Last ZA', url: 'https://www.eva-last.co.za', category: 'Multi-language', image: evaLastZaImg },
  { name: 'EVA Last UK', url: 'https://www.eva-last.co.uk', category: 'Multi-language', image: evaLastUkImg },
  { name: 'EVA Last AU', url: 'https://au.eva-last.com', category: 'Multi-language' },
  { name: 'EVA Last NZ', url: 'https://www.eva-last.co.nz', category: 'Multi-language', image: evaLastNzImg },
  { name: 'EVA Last FR', url: 'https://www.eva-last.fr', category: 'Multi-language', image: evaLastFrImg },
  { name: 'EVA Last DE', url: 'https://www.eva-last.de', category: 'Multi-language', image: evaLastDeImg },
  { name: 'EVA Last KR', url: 'https://www.eva-last.kr', category: 'Multi-language', image: evaLastKrImg },
  { name: 'EVA Last NL', url: 'https://www.eva-last.nl', category: 'Multi-language', image: evaLastNlImg },
  { name: 'EVA Last MX', url: 'https://www.eva-last.mx', category: 'Multi-language', image: evaLastMxImg },
  { name: 'Dynamostol', url: 'https://dynamostol.com', category: 'Multi-language', image: dynamostolImg },
  { name: 'Dynamostol DK', url: 'https://dynamostol.dk', category: 'Multi-language', image: dynamostolDkImg },
  { name: 'Dynamostol SE', url: 'https://dynamostol.se', category: 'Multi-language', image: dynamostolSeImg },
  { name: 'Dynamostol DE', url: 'https://dynamostol.de', category: 'Multi-language', image: dynamostolDeImg },
  { name: 'Olssen', url: 'https://olssen.nl', category: 'Multi-language', image: olssenImg },
  { name: 'Olssen NL', url: 'https://www.olssen.nl/nl', category: 'Multi-language', image: olssenNlImg },
  { name: 'Olssen BE', url: 'https://www.olssen.be/be', category: 'Multi-language', image: olssenBeImg },
  { name: 'Olssen EU', url: 'https://www.olssen.eu/eu', category: 'Multi-language', image: olssenEuImg },
  { name: 'Olssen FR', url: 'https://www.olssen.fr', category: 'Multi-language', image: olssenFrImg },

];

const STATS = [
  { value: '3200+', label: 'Websites Delivered' },
  { value: '50+', label: 'Mobile Apps Launched' },
  { value: '25+', label: 'Countries Served' },
  { value: '14+', label: 'Industry Experience' },
];

/** Main portfolio tabs */
const PORTFOLIO_MAIN_TABS = ['All', 'Web Projects', 'Mobile Apps', 'Tech Stack'];
/** Web sub-filters: unique `category` from site data */
const WEB_CATEGORY_FILTERS = ['All', ...new Set(WEBSITES.map(w => w.category))];

/** Primary category for mobile apps = first tag (industry / vertical) */
function mobileAppPrimaryCategory(app) {
  const t = app.tags?.[0]?.trim();
  return t || 'Other';
}

/**
 * Single “All” tab bucket for overlapping web vs mobile labels.
 * Web uses “Health”; several apps use “Health & Fitness” — one chip filters both.
 */
function portfolioUnifiedCategory(raw) {
  const t = (raw || '').trim();
  if (!t) return 'Other';
  const lower = t.toLowerCase();
  if (lower === 'health' || lower === 'health & fitness' || lower === 'health and fitness') {
    return 'Health & Fitness';
  }
  return t;
}

const MOBILE_CATEGORY_FILTERS = [
  'All',
  ...Array.from(new Set(MOBILE_APPS.map(mobileAppPrimaryCategory))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  ),
];

/** “All” tab only: one category dimension across web + mobile (unified labels) */
const ALL_PORTFOLIO_CATEGORY_FILTERS = [
  'All',
  ...Array.from(
    new Set([
      ...WEBSITES.map(w => portfolioUnifiedCategory(w.category)),
      ...MOBILE_APPS.map(a => portfolioUnifiedCategory(mobileAppPrimaryCategory(a))),
    ])
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
];

const chipActiveStyle = { background: '#A07830', color: '#FAF7F2' };
const chipIdleStyle = {
  background: 'rgba(160,120,48,0.07)',
  color: '#6B6456',
  border: '1px solid rgba(160,120,48,0.18)',
};

const CHIP_BTN_CLASS =
  'px-3.5 py-1.5 text-xs tracking-wide transition-all duration-200 rounded-full font-medium sm:px-4';

function PortfolioChipFilters({ values, value, onChange, className = '', legend, groupAriaLabel }) {
  return (
    <div className={className}>
      {legend ? (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8270]">{legend}</p>
      ) : null}
      <div className="flex flex-wrap gap-2" role="group" aria-label={groupAriaLabel || 'Category filters'}>
        {values.map(v => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={CHIP_BTN_CLASS}
            style={value === v ? chipActiveStyle : chipIdleStyle}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

function WebsiteCard({ site }) {
  const description = websiteCardMicro(site);
  const [imgError, setImgError] = useState(false);
  const useProjectImage = Boolean(site.image) && !imgError;

  return (
    <article className={PORTFOLIO_CARD_BASE} aria-label={site.name}>
      <PortfolioCardHoverRing />
      <div className={PORTFOLIO_MEDIA_SHELL}>
        {useProjectImage ? (
          <img
            src={resolveAssetUrl(site.image)}
            alt={`${site.name} preview`}
            className={PORTFOLIO_PROJECT_IMG}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <PortfolioFallbackLogo />
        )}
      </div>

      <div className={`${PORTFOLIO_BODY_SHELL} flex min-h-0 flex-1 flex-col`}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <span className={PORTFOLIO_TAG_PILL}>Web</span>
            <span className={PORTFOLIO_TAG_PILL}>{site.category}</span>
          </div>
          <h3 className="portfolio-card-title shrink-0 font-heading text-lg font-semibold leading-snug tracking-tight text-[#2A2620] transition-colors duration-300 group-hover:text-gold sm:text-xl">
            {site.name}
          </h3>
          <div className={PORTFOLIO_DESC_BLOCK}>
            <p className={PORTFOLIO_DESC_TEXT}>{description}</p>
          </div>
        </div>
        <div className={PORTFOLIO_ACTION_ROW}>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className={`${PORTFOLIO_ACTION_BTN} w-full`}>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
            Visit Website
          </a>
        </div>
      </div>
    </article>
  );
}

function MobileAppCard({ app }) {
  const [localImgError, setLocalImgError] = useState(false);
  const useProjectImage = Boolean(app.image) && !localImgError;
  const hasIos = Boolean(app.ios);
  const hasAndroid = Boolean(app.android);

  return (
    <article className={PORTFOLIO_CARD_BASE} aria-label={app.name}>
      <PortfolioCardHoverRing />
      <div className={PORTFOLIO_MEDIA_SHELL}>
        {useProjectImage ? (
          <img
            src={resolveAssetUrl(app.image)}
            alt={`${app.name} preview`}
            className={PORTFOLIO_PROJECT_IMG}
            loading="lazy"
            decoding="async"
            onError={() => setLocalImgError(true)}
          />
        ) : (
          <PortfolioFallbackLogo />
        )}
      </div>

      <div className={`${PORTFOLIO_BODY_SHELL} flex min-h-0 flex-1 flex-col`}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {app.tags?.map(tag => (
              <span key={tag} className={PORTFOLIO_TAG_PILL}>
                {tag}
              </span>
            ))}
          </div>
          <h3 className="portfolio-card-title shrink-0 font-heading text-lg font-semibold leading-snug tracking-tight text-[#2A2620] transition-colors duration-300 group-hover:text-gold sm:text-xl">
            {app.name}
          </h3>
          <div className={PORTFOLIO_DESC_BLOCK}>
            <p className={PORTFOLIO_DESC_TEXT}>{app.desc}</p>
          </div>
        </div>
        {(hasIos || hasAndroid) && (
          <div className={PORTFOLIO_ACTION_ROW}>
            {hasIos ? (
              <a href={app.ios} target="_blank" rel="noopener noreferrer" className={PORTFOLIO_ACTION_BTN} onClick={e => e.stopPropagation()}>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
                App Store
              </a>
            ) : null}
            {hasAndroid ? (
              <a
                href={app.android}
                target="_blank"
                rel="noopener noreferrer"
                className={PORTFOLIO_ACTION_BTN}
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
                Play Store
              </a>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const router = useRouter();
  const [portfolioTab, setPortfolioTab] = useState('All');
  const [allCategoryFilter, setAllCategoryFilter] = useState('All');
  const [webSubFilter, setWebSubFilter] = useState('All');
  const [mobileSubFilter, setMobileSubFilter] = useState('All');

  const filteredSites = useMemo(
    () => (webSubFilter === 'All' ? WEBSITES : WEBSITES.filter(w => w.category === webSubFilter)),
    [webSubFilter]
  );

  const filteredMobileApps = useMemo(
    () =>
      mobileSubFilter === 'All'
        ? MOBILE_APPS
        : MOBILE_APPS.filter(a => mobileAppPrimaryCategory(a) === mobileSubFilter),
    [mobileSubFilter]
  );

  /** “All” tab: one merged list, single category filter (unified labels, e.g. Health + Health & Fitness) */
  const allTabFilteredRows = useMemo(() => {
    const rows = [
      ...WEBSITES.map(site => ({
        kind: 'web',
        key: `web:${site.name}`,
        category: portfolioUnifiedCategory(site.category),
        site,
      })),
      ...MOBILE_APPS.map(app => ({
        kind: 'mobile',
        key: `mobile:${app.name}`,
        category: portfolioUnifiedCategory(mobileAppPrimaryCategory(app)),
        app,
      })),
    ];
    const filtered =
      allCategoryFilter === 'All' ? rows : rows.filter(r => r.category === allCategoryFilter);
    return [...filtered].sort((a, b) => {
      const na = a.kind === 'web' ? a.site.name : a.app.name;
      const nb = b.kind === 'web' ? b.site.name : b.app.name;
      return na.localeCompare(nb, undefined, { sensitivity: 'base' });
    });
  }, [allCategoryFilter]);

  const showTech = portfolioTab === 'All' || portfolioTab === 'Tech Stack';
  const gridAnimKey = `${portfolioTab}|${allCategoryFilter}|${webSubFilter}|${mobileSubFilter}`;

  const setMainTab = tab => {
    setPortfolioTab(tab);
    setAllCategoryFilter('All');
    setWebSubFilter('All');
    setMobileSubFilter('All');
  };

  return (
    <div className="bg-surface-dark">
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-gold/10">
        <div className="pointer-events-none absolute inset-0 opacity-25"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(160,120,48,0.14), transparent 70%)' }} aria-hidden />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(rgba(160,120,48,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(160,120,48,0.15) 1px, transparent 1px)', backgroundSize: '56px 56px' }} aria-hidden />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <RevealSection revealStyle="fade-up">
            <div className="text-center">
              <span className="label-gold">Work</span>
              <h1 className="mt-6 font-heading text-5xl md:text-6xl lg:text-8xl text-ivory font-light leading-none tracking-tight">
                Our <span className="italic text-gold">Work</span>
              </h1>
              <p className="mt-8 text-warmgray text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
                Over a decade of delivering world-class digital products — from mobile apps used by thousands to enterprise web platforms spanning 6+ countries.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={200} revealStyle="scale-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-gold/10 rounded-[18px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  style={{ background: 'rgba(160,120,48,0.04)' }}>
                  <span className="font-heading text-4xl md:text-5xl text-gold font-light">{s.value}</span>
                  <span className="text-warmgray text-xs mt-2 tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Top Tab Navigation */}
      <div
        className="sticky top-0 z-30 border-b border-gold/10 shadow-[0_8px_32px_rgba(26,23,16,0.06)]"
        style={{
          background: 'linear-gradient(180deg, rgba(250,247,242,0.94) 0%, rgba(250,247,242,0.88) 100%)',
          backdropFilter: 'blur(20px) saturate(1.2)',
        }}
      >
        <div className={`${PORTFOLIO_SHELL} pb-1`}>
          <div className="flex gap-0 overflow-x-auto scrollbar-none border-b border-transparent">
            {PORTFOLIO_MAIN_TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setMainTab(tab)}
                className="relative px-5 py-4 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ease-in-out flex-shrink-0 hover:text-gold/80"
                style={{ color: portfolioTab === tab ? '#A07830' : '#6B6456' }}
              >
                {tab}
                {portfolioTab === tab && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full transition-all duration-300 ease-in-out"
                    style={{ background: 'linear-gradient(90deg, transparent, #A07830, transparent)', boxShadow: '0 0 16px rgba(160,120,48,0.35)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All: single merged list + one cross-type category filter */}
      {portfolioTab === 'All' && (
        <section className="relative overflow-hidden border-b border-gold/10 py-20 lg:py-28" style={{ background: LIGHT_SECTION_BG }}>
          <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: LIGHT_SECTION_VEIL }} aria-hidden />
          <div className={`relative ${PORTFOLIO_SHELL}`}>
            <RevealSection revealStyle="fade-up">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 rounded-full bg-gold/50" aria-hidden />
                    <span className="label-gold">Portfolio</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-light leading-tight tracking-tight text-ivory md:text-4xl lg:text-[2.75rem]">
                    All <span className="italic text-gold">projects</span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-warmgray md:text-base max-w-xl">
                    Websites and apps in one grid. One category control: the same label filters web projects by their sector and mobile apps by their primary vertical tag.
                  </p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-gold/15 bg-gold/[0.06] px-4 py-2 text-warmgray text-xs font-medium tracking-wide backdrop-blur-sm">
                  {allTabFilteredRows.length} projects
                </span>
              </div>
            </RevealSection>
            <RevealSection delay={40} revealStyle="fade-up">
              <PortfolioChipFilters
                className="mt-8 mb-10"
                groupAriaLabel="Project categories (web and mobile)"
                values={ALL_PORTFOLIO_CATEGORY_FILTERS}
                value={allCategoryFilter}
                onChange={setAllCategoryFilter}
              />
            </RevealSection>
            <div key={gridAnimKey} className={`${PORTFOLIO_GRID} portfolio-filter-grid`}>
              {allTabFilteredRows.map((row, i) => (
                <RevealSection
                  key={row.key}
                  className="h-full min-h-0"
                  delay={Math.min(i * 28, 280)}
                  revealStyle={i % 3 === 1 ? 'scale-in' : 'fade-up'}
                >
                  {row.kind === 'web' ? <WebsiteCard site={row.site} /> : <MobileAppCard app={row.app} />}
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Web Projects only */}
      {portfolioTab === 'Web Projects' && (
        <section className="relative overflow-hidden border-b border-gold/10 py-20 lg:py-28" style={{ background: LIGHT_SECTION_BG }}>
          <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: LIGHT_SECTION_VEIL }} aria-hidden />
          <div className={`relative ${PORTFOLIO_SHELL}`}>
            <RevealSection revealStyle="fade-up">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 rounded-full bg-gold/50" aria-hidden />
                    <span className="label-gold">Web Projects</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-ivory font-light leading-tight tracking-tight">
                    Live <span className="italic text-gold">Websites & Platforms</span>
                  </h2>
                  <p className="mt-3 text-warmgray text-sm md:text-base max-w-xl leading-relaxed">
                    A selection of live client websites — from e-commerce stores to SaaS products, built across Ireland, the UK, India, and beyond.
                  </p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-gold/15 bg-gold/[0.06] px-4 py-2 text-warmgray text-xs font-medium tracking-wide backdrop-blur-sm">
                  {filteredSites.length} projects
                </span>
              </div>
            </RevealSection>
            <RevealSection delay={60} revealStyle="fade-up">
              <PortfolioChipFilters
                className="mt-8 mb-10"
                groupAriaLabel="Web project categories"
                values={WEB_CATEGORY_FILTERS}
                value={webSubFilter}
                onChange={setWebSubFilter}
              />
            </RevealSection>
            <div key={gridAnimKey} className={`${PORTFOLIO_GRID} portfolio-filter-grid`}>
              {filteredSites.map((site, i) => (
                <RevealSection
                  key={site.name}
                  className="h-full min-h-0"
                  delay={Math.min(i * 40, 320)}
                  revealStyle={i % 3 === 1 ? 'scale-in' : 'fade-up'}
                >
                  <WebsiteCard site={site} />
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Apps only */}
      {portfolioTab === 'Mobile Apps' && (
        <section className="relative overflow-hidden border-b border-gold/10 py-20 lg:py-28" style={{ background: LIGHT_SECTION_BG }}>
          <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: LIGHT_SECTION_VEIL }} aria-hidden />
          <div className={`relative ${PORTFOLIO_SHELL}`}>
            <RevealSection revealStyle="fade-up">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <header className="max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 rounded-full bg-gold/45" aria-hidden />
                    <span className="label-gold">Mobile Applications</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-light leading-[1.1] tracking-tight text-ivory md:text-4xl lg:text-[2.75rem]">
                    Apps on the <span className="italic text-gold">App Store & Play Store</span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-warmgray md:text-base">
                    Native and cross-platform mobile applications live in production — built in React Native and Flutter, serving users across iOS and Android worldwide.
                  </p>
                </header>
                <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-gold/15 bg-gold/[0.06] px-4 py-2 text-warmgray text-xs font-medium tracking-wide backdrop-blur-sm">
                  {filteredMobileApps.length} projects
                </span>
              </div>
            </RevealSection>
            <RevealSection delay={60} revealStyle="fade-up">
              <PortfolioChipFilters
                className="mt-8 mb-10"
                groupAriaLabel="Mobile app categories"
                values={MOBILE_CATEGORY_FILTERS}
                value={mobileSubFilter}
                onChange={setMobileSubFilter}
              />
            </RevealSection>
            <div key={gridAnimKey} className={`${PORTFOLIO_GRID} portfolio-filter-grid`}>
              {filteredMobileApps.map((app, i) => (
                <RevealSection
                  key={app.name}
                  className="h-full min-h-0"
                  delay={Math.min(i * 40, 320)}
                  revealStyle={i % 3 === 1 ? 'scale-in' : 'fade-up'}
                >
                  <MobileAppCard app={app} />
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {showTech && (
        <section className="py-20 lg:py-28 border-b border-gold/10" style={{ background: '#FAF7F2' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealSection revealStyle="fade-up">
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-10 rounded-full bg-gold/40" aria-hidden />
                  <span className="label-gold">Technology</span>
                  <span className="h-px w-10 rounded-full bg-gold/40" aria-hidden />
                </div>
                <h2 className="mt-4 font-heading text-3xl md:text-4xl font-light mb-3 tracking-tight" style={{ color: '#1A1710' }}>
                  Our <span className="italic text-gold">Tech Stack</span>
                </h2>
                <p className="max-w-2xl leading-relaxed mx-auto text-sm md:text-base" style={{ color: '#6B6456' }}>
                  We select the right technology for each challenge — from lightweight MVPs to enterprise-grade platforms.
                </p>
              </div>
            </RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {TECHNOLOGY_CATEGORIES.map((stack, i) => (
                <RevealSection key={stack.slug} delay={i * 80} revealStyle={i % 2 === 0 ? 'fade-up' : 'scale-in'}>
                  <div
                    role="link"
                    tabIndex={0}
                    onClick={() => router.push(`/technologies/${stack.slug}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push(`/technologies/${stack.slug}`);
                      }
                    }}
                    className="tech-stack-card relative rounded-[20px] border overflow-hidden h-full block cursor-pointer transition-shadow duration-500 ease-in-out hover:shadow-[0_20px_50px_rgba(26,23,16,0.08),0_0_0_1px_rgba(160,120,48,0.2),0_0_40px_rgba(160,120,48,0.08)]"
                    style={{ background: 'rgba(255,255,255,0.72)', borderColor: 'rgba(160,120,48,0.16)', boxShadow: '0 4px 24px rgba(26,23,16,0.07)', minHeight: '280px' }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px 180px at 30% 0%, rgba(160,120,48,0.07), transparent 60%)' }} aria-hidden />
                    <div className="relative p-6 lg:p-7">
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: `linear-gradient(180deg, ${SITE_GOLD}, ${goldAlpha('30')})` }} aria-hidden />
                          {(() => { const Icon = CATEGORY_ICON_MAP[stack.icon] || Code2; return (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: goldAlpha('12'), border: `1px solid ${goldAlpha('28')}` }}>
                              <Icon size={18} style={{ color: SITE_GOLD }} strokeWidth={1.8} />
                            </div>
                          ); })()}
                          <div>
                            <h3 className="font-heading font-light leading-tight" style={{ fontSize: '1.05rem', color: SITE_INK }}>{stack.title}</h3>
                            <p className="mt-0.5 text-[10px] tracking-wide" style={{ color: SITE_MUTED }}>{stack.techSlugs.length} technologies</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full border text-[9px] tracking-[0.22em] uppercase flex-shrink-0"
                          style={{ borderColor: goldAlpha('28'), color: SITE_GOLD, background: goldAlpha('08') }}>{stack.tag}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {stack.techSlugs.map(slug => (
                          <Link key={slug} to={`/technologies/${slug}`} onClick={e => e.stopPropagation()}
                            className="tech-work-item flex items-center gap-2.5 px-3 rounded-xl border transition-all duration-200"
                            style={{ borderColor: 'rgba(26,23,16,0.10)', background: 'rgba(250,247,242,0.80)', height: '52px' }}>
                            <span className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0"
                              style={{ borderColor: 'rgba(160,120,48,0.25)', background: 'rgba(255,255,255,0.92)' }}>
                              <TechnologyLogo slug={slug} color="#A07830" size={18} />
                            </span>
                            <span className="min-w-0 flex flex-col justify-center">
                              <span className="block text-[11px] font-medium truncate" style={{ color: '#1A1710', lineHeight: 1.3 }}>{techNameMap[slug] || slug}</span>
                              <span className="block text-[9px] tracking-wide" style={{ color: '#A07830' }}>View details</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealSection>
            <span className="label-gold">Start Building</span>
            <h2 className="mt-6 font-heading text-4xl md:text-6xl text-ivory font-light leading-tight mb-6">
              Ready to add your project<br />to this <span className="italic text-gold">list?</span>
            </h2>
            <p className="text-warmgray leading-relaxed mb-10 max-w-xl mx-auto">
              Whether it's a web platform, mobile app, or a full digital solution — let's build something remarkable together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gold text-surface-dark text-sm font-medium tracking-wider hover:bg-gold-hover transition-all duration-300">
                Start a Conversation
              </Link>
              <Link to="/all-services" className="px-8 py-4 border border-gold/30 text-gold text-sm font-medium tracking-wider hover:border-gold/60 transition-all duration-300 flex items-center justify-center gap-2">
                Explore Our Services <ArrowUpRight size={14} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        @keyframes portfolioFilterGridIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .portfolio-filter-grid {
          animation: portfolioFilterGridIn 0.38s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-filter-grid { animation: none; }
        }
        .tech-stack-card { transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease; }
        .tech-stack-card:hover { transform: translateY(-5px); }
        .tech-work-item:hover { background: rgba(255,255,255,1) !important; border-color: rgba(160,120,48,0.35) !important; transform: translateY(-2px); box-shadow: 0 4px 14px rgba(160,120,48,0.12); }
        /* file.jsx .store-btn:hover — light gold wash, stronger border, keep gold text */
        .portfolio-card .store-btn:hover {
          background: rgba(160, 120, 48, 0.25) !important;
          border-color: rgba(160, 120, 48, 0.6) !important;
        }
        .portfolio-card .store-btn:hover svg {
          stroke: #A07830;
          opacity: 1;
        }
        .scrollbar-none { scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        @media (hover: none) {
          .portfolio-card:hover,
          .tech-stack-card:hover {
            transform: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-card,
          .portfolio-card-media img,
          .portfolio-card-project-img,
          .tech-stack-card {
            transition-duration: 0.01ms !important;
          }
        }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
        .portfolio-card-project-img {
          object-fit: cover;
          object-position: center;
          backface-visibility: hidden;
        }

        /* Portfolio card hover — file.jsx .work-card:hover (lift + dual shadow + border) */
        @media (hover: hover) and (min-width: 768px) {
          .portfolio-card {
            transition:
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
          }
          .portfolio-card:hover {
            transform: translateY(-5px);
            box-shadow:
              0 20px 50px rgba(26, 23, 16, 0.1),
              0 0 28px rgba(160, 120, 48, 0.07);
            border-color: rgba(160, 120, 48, 0.22) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @media (hover: hover) and (min-width: 768px) {
            .portfolio-card:hover {
              transform: none !important;
            }
          }
        }
      `}</style>
    </div>
  );
}