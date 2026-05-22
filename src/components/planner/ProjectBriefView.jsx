import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, CheckCircle, RotateCcw, ChevronDown, ChevronUp, Loader2, X, Send } from 'lucide-react';
import { jsPDF, GState } from 'jspdf';
import ProjectTimeline from './ProjectTimeline';
import { sendBriefEmail, uploadBriefPdf } from '@/services/generationService';
import CountryCodePicker from '@/components/forms/CountryCodePicker';
import { COUNTRY_CODES } from '@/lib/countryCodes';
import { SITE_BRAND_LABEL } from '@/lib/siteSeo';

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gold/15 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gold/5 transition-colors">
        <h3 className="font-heading text-base font-medium text-ivory">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-warmgray" /> : <ChevronDown className="w-4 h-4 text-warmgray" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}



function isValidEmail(value) {
  const v = String(value || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function normalizePhone(value) {
  return String(value || '').trim();
}

function sanitizePhoneInput(value) {
  return String(value || '').replace(/[^\d\s()+-]/g, '');
}

function isValidPhone(value) {
  return normalizePhone(value).replace(/\D/g, '').length >= 6;
}

export default function ProjectBriefView({ brief, onRestart, answers, aiData: _aiData = {}, latestAI: _latestAI = {} }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalCountry, setModalCountry] = useState(() => COUNTRY_CODES.find((c) => c.label === 'United States') || COUNTRY_CODES[0]);
  const [modalBusy, setModalBusy] = useState(false);
  const [modalPhase, setModalPhase] = useState(null); // 'prepare' | 'sending'
  const [modalError, setModalError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const [pdfSeconds, setPdfSeconds] = useState(0);

  useEffect(() => {
    if (!pdfModalOpen) return undefined;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [pdfModalOpen]);

  // Match Contact page behavior: auto-detect country code when the modal opens.
  useEffect(() => {
    if (!pdfModalOpen) return;
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        const match = COUNTRY_CODES.find((c) => c.label === data.country_name)
          || COUNTRY_CODES.find((c) => c.code === `+${String(data.country_calling_code || '').replace('+', '')}`);
        if (match) setModalCountry(match);
      })
      .catch(() => {});
  }, [pdfModalOpen]);

  // Generates the PDF and returns it as a base64 string (does NOT trigger a browser download)
  const generatePdfBase64 = async () => {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      // ── COLOR PALETTE ────────────────────────────────────────────────────
      /** @type {[number, number, number]} */ const GOLD       = [160, 120, 48];
      /** @type {[number, number, number]} */ const GOLD_LIGHT = [201, 169, 110];
      /** @type {[number, number, number]} */ const DARK       = [26, 23, 16];
      /** @type {[number, number, number]} */ const GRAY       = [107, 100, 86];
      /** @type {[number, number, number]} */ const WHITE      = [255, 255, 255];
      /** @type {[number, number, number]} */ const CREAM      = [245, 240, 232];
      /** @type {[number, number, number]} */ const CREAM_DARK = [237, 232, 222];

      const PAGE_W    = 210;
      const PAGE_H    = 297;
      const MARGIN    = 18;
      const CONTENT_W = PAGE_W - MARGIN * 2;
      let y = 0;

      const drawRunningHeader = () => {
        // Subtle running header used on pages after cover
        doc.setFillColor(248, 244, 238);
        doc.rect(0, 0, PAGE_W, 16, 'F');
        doc.setFillColor(...GOLD_LIGHT);
        doc.rect(0, 15.3, PAGE_W, 0.7, 'F');

        if (logoDataUrl) {
          const dims = computeLogoMm(9, 42);
          doc.addImage(logoDataUrl, 'PNG', MARGIN, (16 - (dims?.h ?? 9)) / 2, dims?.w ?? 28, dims?.h ?? 9);
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...GRAY);
        doc.text(`Project Brief  \u2022  ${SITE_BRAND_LABEL}`, PAGE_W - MARGIN, 10, { align: 'right' });
      };

      const loadLogoDataUrl = async () => {
        try {
          // Use local public asset (served by Vite)
          const logoResp = await fetch('/brand-logo.png', { cache: 'no-cache' });
          const logoBlob = await logoResp.blob();
          return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(logoBlob);
          });
        } catch {
          return null;
        }
      };

      const logoDataUrl = await loadLogoDataUrl();

      const getImageIntrinsicSize2 = async (dataUrl) => {
        if (!dataUrl) return null;
        return await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ w: img.naturalWidth || img.width, h: img.naturalHeight || img.height });
          img.onerror = () => resolve(null);
          img.src = dataUrl;
        });
      };
      // Keep import referenced even when watermark is commented out.
      void GState;
      const logoIntrinsicForWatermark = await getImageIntrinsicSize2(logoDataUrl);

      // ── WATERMARK HELPER — draws OVER all content on the CURRENT page ──────
      // Key insight: watermark must be drawn LAST on each page (foreground),
      // not first (background), so solid table/section fills don't cover it.
      const drawWatermark = () => {
        // WATERMARK DISABLED (commented out per instruction)
        /*
        const cx = PAGE_W / 2;
        const cy = 148.5;
        doc.saveGraphicsState();
        if (logoDataUrl) {
          const ratio = logoIntrinsicForWatermark?.w && logoIntrinsicForWatermark?.h
            ? (logoIntrinsicForWatermark.w / logoIntrinsicForWatermark.h)
            : 3.2;
          // Larger mark, theme gold tint — readable content stays clear at ~12% opacity
          const wmW = 158;
          const wmH = wmW / ratio;
          doc.setGState(new GState({ opacity: 0.12 }));
          doc.addImage(logoDataUrl, 'PNG', cx - wmW / 2, cy - wmH / 2, wmW, wmH);
        } else {
          // Text fallback: diagonal brand — slightly stronger, theme gold
          doc.setGState(new GState({ opacity: 0.09 }));
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(62);
          doc.setTextColor(160, 120, 48);
          doc.text('CRESCENTEK', cx, cy, { align: 'center', angle: 45 });
        }
        doc.restoreGraphicsState();
        */
      };

      const logoIntrinsic = logoIntrinsicForWatermark;
      const computeLogoMm = (targetH, maxW) => {
        if (!logoDataUrl) return null;
        const ratio = logoIntrinsic?.w && logoIntrinsic?.h ? (logoIntrinsic.w / logoIntrinsic.h) : 3.2;
        const h = targetH;
        const w = Math.min(maxW, Math.max(12, h * ratio));
        return { w, h };
      };

      // ── HELPERS ──────────────────────────────────────────────────────────
      /** Bottom safe line (mm): no footer — use almost full page, leave small trim. */
      const CONTENT_BOTTOM_Y = 292;

      // finalizeCurrentPage: watermark LAST so it stays visible over table/section fills
      const finalizeCurrentPage = () => {
        // drawWatermark();
      };

      const newPage = () => {
        finalizeCurrentPage();
        doc.addPage();
        drawRunningHeader();
        y = 28; // start below running header
      };
      const guard = (needed = 14) => { if (y + needed > CONTENT_BOTTOM_Y) newPage(); };

      const setFill = (c) => doc.setFillColor(c[0], c[1], c[2]);
      const setDraw = (c) => doc.setDrawColor(c[0], c[1], c[2]);
      const setText = (c) => doc.setTextColor(c[0], c[1], c[2]);

      const setStyle = (size, color, bold = false) => {
        doc.setFontSize(size);
        setText(color);
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
      };

      const writeWrapped = (text, x, maxW, lineH = 5) => {
        const lines = doc.splitTextToSize(String(text || ''), maxW);
        lines.forEach((ln, i) => {
          doc.text(ln, x, y + i * lineH);
        });
        y += lines.length * lineH;
        return lines.length;
      };

      /** Stable multi-line draw (jsPDF array text spacing varies by version). Returns bottom y (baseline of last line). */
      const sectionHeading = (label, minAfter = 18, fontSize = 9) => {
        // Avoid orphan headings at the bottom of a page
        guard(16 + minAfter);
        y += 6;
        // Gold left bar
        doc.setFillColor(...GOLD);
        doc.rect(MARGIN, y - 4, 3.5, 7, 'F');
        // Label
        setStyle(fontSize, GOLD, true);
        doc.text(label.toUpperCase(), MARGIN + 7, y);
        y += 4;
        // Divider line
        doc.setDrawColor(...GOLD_LIGHT);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y, PAGE_W - MARGIN, y);
        y += 5;
      };

      // ══════════════════════════════════════════════════════════════════
      // COVER PAGE — Framed Centered Editorial Hero
      // Cream canvas with a fine inset gold double-frame and tiny gold L
      // corner ornaments. Fully-centred typographic hero block:
      // logo → eyebrow → title → ornament → byline → overview excerpt →
      // bottom 3-column meta band. NO contact information on the cover.
      // ══════════════════════════════════════════════════════════════════

      // ── Cream canvas ──────────────────────────────────────────────────
      doc.setFillColor(248, 244, 237);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

      // ── Outer gold frame (10mm inset) ────────────────────────────────
      const COV_FI = 10;
      const COV_FX = COV_FI;
      const COV_FY = COV_FI;
      const COV_FW = PAGE_W - COV_FI * 2;
      const COV_FH = PAGE_H - COV_FI * 2;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.5);
      doc.rect(COV_FX, COV_FY, COV_FW, COV_FH, 'S');

      // ── Inner hairline frame (3mm inside the outer frame) ───────────
      doc.setDrawColor(...GOLD_LIGHT);
      doc.setLineWidth(0.2);
      doc.rect(COV_FX + 3, COV_FY + 3, COV_FW - 6, COV_FH - 6, 'S');

      // ── L-shaped gold corner ornaments at each frame corner ─────────
      const COV_CO = 6;
      const COV_CL = 9;
      const COV_CT = 0.8;
      doc.setFillColor(...GOLD);
      // Top-left
      doc.rect(COV_FX + COV_CO, COV_FY + COV_CO, COV_CL, COV_CT, 'F');
      doc.rect(COV_FX + COV_CO, COV_FY + COV_CO, COV_CT, COV_CL, 'F');
      // Top-right
      doc.rect(COV_FX + COV_FW - COV_CO - COV_CL, COV_FY + COV_CO, COV_CL, COV_CT, 'F');
      doc.rect(COV_FX + COV_FW - COV_CO - COV_CT, COV_FY + COV_CO, COV_CT, COV_CL, 'F');
      // Bottom-left
      doc.rect(COV_FX + COV_CO, COV_FY + COV_FH - COV_CO - COV_CT, COV_CL, COV_CT, 'F');
      doc.rect(COV_FX + COV_CO, COV_FY + COV_FH - COV_CO - COV_CL, COV_CT, COV_CL, 'F');
      // Bottom-right
      doc.rect(COV_FX + COV_FW - COV_CO - COV_CL, COV_FY + COV_FH - COV_CO - COV_CT, COV_CL, COV_CT, 'F');
      doc.rect(COV_FX + COV_FW - COV_CO - COV_CT, COV_FY + COV_FH - COV_CO - COV_CL, COV_CT, COV_CL, 'F');

      // ── Logo top-centre ───────────────────────────────────────────────
      if (logoDataUrl) {
        const dims = computeLogoMm(13, 60);
        const lw = dims?.w ?? 50;
        doc.addImage(logoDataUrl, 'PNG', (PAGE_W - lw) / 2, 32, lw, dims?.h ?? 13);
      }

      // Tiny gold rule beneath logo
      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 6, 51, 12, 0.5, 'F');

      // ── Eyebrow above title ──────────────────────────────────────────
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...GOLD);
      doc.text('A I  \u00B7  P R O J E C T  B R I E F', PAGE_W / 2, 60, { align: 'center' });

      // ── Title hero (centred) ─────────────────────────────────────────
      const cvTitleRaw = String(brief.projectTitle || 'Project Planning Document').trim();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(30);
      doc.setTextColor(...DARK);
      const cvTLines = doc.splitTextToSize(cvTitleRaw, COV_FW - 40);
      const cvTLineH = 13;
      const cvTopY = 100;
      cvTLines.forEach((ln, li) => doc.text(ln, PAGE_W / 2, cvTopY + li * cvTLineH, { align: 'center' }));
      const cvTitleEndY = cvTopY + (cvTLines.length - 1) * cvTLineH;

      // ── Ornament: line — gold dot — line ─────────────────────────────
      const COV_ORN_Y = cvTitleEndY + 16;
      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 36, COV_ORN_Y, 28, 0.6, 'F');
      doc.rect(PAGE_W / 2 + 8,  COV_ORN_Y, 28, 0.6, 'F');
      doc.circle(PAGE_W / 2, COV_ORN_Y + 0.3, 1.6, 'F');

      // ── Italic byline below ornament ─────────────────────────────────
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(...GRAY);
      doc.text('Prepared by Crescentek', PAGE_W / 2, COV_ORN_Y + 12, { align: 'center' });

      // ── Project overview excerpt (centred, narrow column, max 4 lines)
      if (brief.projectOverview) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...GRAY);
        const cvExcW = 130;
        const cvExcLines = doc.splitTextToSize(brief.projectOverview, cvExcW);
        cvExcLines.slice(0, 4).forEach((ln, li) => doc.text(ln, PAGE_W / 2, COV_ORN_Y + 26 + li * 5.6, { align: 'center' }));
      }

      // ── Bottom meta band ─────────────────────────────────────────────
      const COV_META_Y = PAGE_H - 38;

      // Centred gold rule above meta band
      doc.setFillColor(...GOLD_LIGHT);
      doc.rect(PAGE_W / 2 - 32, COV_META_Y, 64, 0.4, 'F');

      const cvDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      const cvDocId = `N\u00B0 ${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

      // Left meta column — PUBLISHED
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...GOLD);
      doc.text('PUBLISHED', PAGE_W / 2 - 50, COV_META_Y + 8, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK);
      doc.text(cvDate, PAGE_W / 2 - 50, COV_META_Y + 14, { align: 'center' });

      // Centre gold dot separator
      doc.setFillColor(...GOLD);
      doc.circle(PAGE_W / 2, COV_META_Y + 12, 0.9, 'F');

      // Right meta column — DOCUMENT
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...GOLD);
      doc.text('DOCUMENT', PAGE_W / 2 + 50, COV_META_Y + 8, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK);
      doc.text(cvDocId, PAGE_W / 2 + 50, COV_META_Y + 14, { align: 'center' });

      // ── Tiny brand line at the very bottom ───────────────────────────
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(...GRAY);
      doc.text(`${SITE_BRAND_LABEL}  \u00B7  Confidential  \u00B7  For recipient use only`, PAGE_W / 2, PAGE_H - 16, { align: 'center' });

      // ══════════════════════════════════════════════════════════════════
      // PAGE 2 — INDEX (Editorial Single-Column List)
      // Clean white page. Centred eyebrow + heading at the top, then a
      // single-column index where each row is a generously-spaced line
      // with a big gold number, section title, dotted leader and a
      // section descriptor on the right. No contact info.
      // ══════════════════════════════════════════════════════════════════
      finalizeCurrentPage();
      doc.addPage();

      // ── Pure white page ───────────────────────────────────────────────
      doc.setFillColor(...WHITE);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

      // Top hairline gold accent
      doc.setFillColor(...GOLD);
      doc.rect(0, 0, PAGE_W, 1.5, 'F');

      // Logo top-left
      if (logoDataUrl) {
        const dims = computeLogoMm(10, 44);
        doc.addImage(logoDataUrl, 'PNG', MARGIN, 12, dims?.w ?? 36, dims?.h ?? 10);
      }

      // Right-aligned page tag
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...GOLD);
      doc.text('PAGE  02', PAGE_W - MARGIN, 14, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(...GRAY);
      doc.text('TABLE OF CONTENTS', PAGE_W - MARGIN, 19, { align: 'right' });

      // Hairline rule under the masthead
      doc.setFillColor(...CREAM_DARK);
      doc.rect(MARGIN, 28, CONTENT_W, 0.3, 'F');

      // ── Centred title block ───────────────────────────────────────────
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...GOLD);
      doc.text('— CONTENTS —', PAGE_W / 2, 50, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(...DARK);
      doc.text('Inside this Brief', PAGE_W / 2, 65, { align: 'center' });

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9.5);
      doc.setTextColor(...GRAY);
      doc.text('A structured walkthrough of the project — from scope to delivery.', PAGE_W / 2, 74, { align: 'center' });

      // Ornamental separator (line + dot + line)
      const TOC_SEP_Y = 82;
      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 22, TOC_SEP_Y, 18, 0.5, 'F');
      doc.rect(PAGE_W / 2 + 4, TOC_SEP_Y, 18, 0.5, 'F');
      doc.circle(PAGE_W / 2, TOC_SEP_Y + 0.25, 1.1, 'F');

      // ── Build TOC entries ──────────────────────────────────────────────
      const tocEntries = [];
      if (brief.projectOverview || brief.projectGoal)      tocEntries.push({ title: 'Project Overview',              sub: 'Background, purpose and context' });
      if (brief.executiveSummary)                           tocEntries.push({ title: 'Executive Summary',             sub: 'High-level summary and approach' });
                                                            tocEntries.push({ title: 'Why Crescentek',                sub: 'Our expertise and value proposition' });
      if (brief.projectObjectives?.length)                  tocEntries.push({ title: 'Project Objectives',            sub: 'Key outcomes and measurable goals' });
      if (brief.projectGoal)                                tocEntries.push({ title: 'Project Goal',                  sub: 'Primary goal and success criteria' });
      if (brief.suggestedArchitecture)                      tocEntries.push({ title: 'Suggested Architecture',        sub: 'System design and technical approach' });
      if (answers && Object.entries(answers).filter(([k]) => ({ projectType:1, problemStatement:1, platform:1, targetUsers:1, coreFeatures:1, timeline:1 })[k]).length > 0)
                                                            tocEntries.push({ title: 'Project Requirements',          sub: 'Detailed requirements and inputs' });
      if (brief.techStack)                                  tocEntries.push({ title: 'Suggested Tech Stack',          sub: 'Recommended technologies and tools' });
      if (brief.coreFeatures?.length)                       tocEntries.push({ title: 'Core Feature List',             sub: 'Feature breakdown and priorities' });
      if (brief.projectPhases?.length)                      tocEntries.push({ title: 'Timeline & Milestones',         sub: 'Delivery phases and deliverables' });
      if (brief.additionalRecommendations?.length || brief.nextSteps?.length)
                                                            tocEntries.push({ title: 'Recommendations',              sub: 'Strategic recommendations and next steps' });
      if (brief.conclusion)                                 tocEntries.push({ title: 'Conclusion',                    sub: 'Summary and closing statement' });

      // ── Render entries: single-column editorial list ──────────────────
      const TOC_LIST_TOP = 100;
      const TOC_LIST_BOTTOM = PAGE_H - 24;
      const TOC_AVAILABLE = TOC_LIST_BOTTOM - TOC_LIST_TOP;
      const TOC_ROW_H = Math.min(18, TOC_AVAILABLE / Math.max(tocEntries.length, 1));
      const TOC_NUM_X = MARGIN + 2;
      const TOC_TITLE_X = MARGIN + 22;
      const TOC_DESC_X = PAGE_W - MARGIN;

      tocEntries.forEach(({ title, sub }, i) => {
        const baseY = TOC_LIST_TOP + i * TOC_ROW_H;

        // Big gold number
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...GOLD);
        doc.text(String(i + 1).padStart(2, '0'), TOC_NUM_X, baseY + 2);

        // Section title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...DARK);
        doc.text(title, TOC_TITLE_X, baseY);

        // Right-aligned descriptor
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(...GRAY);
        const descTrim = sub.length > 42 ? sub.slice(0, 42) + '\u2026' : sub;
        doc.text(descTrim, TOC_DESC_X, baseY, { align: 'right' });

        // Dotted leader between title and descriptor
        const titleW = doc.getTextWidth(title);
        const descW  = doc.getTextWidth(descTrim);
        const leaderStart = TOC_TITLE_X + titleW + 3;
        const leaderEnd   = TOC_DESC_X - descW - 3;
        if (leaderEnd > leaderStart) {
          doc.setFillColor(...CREAM_DARK);
          for (let lx = leaderStart; lx < leaderEnd; lx += 2) {
            doc.circle(lx, baseY - 1.3, 0.3, 'F');
          }
        }

        // Row hairline beneath
        doc.setFillColor(244, 238, 226);
        doc.rect(MARGIN + 22, baseY + 5, CONTENT_W - 22, 0.2, 'F');
      });

      // ── Footer band ────────────────────────────────────────────────────
      doc.setFillColor(...GOLD);
      doc.rect(0, PAGE_H - 1.5, PAGE_W, 1.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...GRAY);
      doc.text(`CRESCENTEK  \u00B7  ${new Date().getFullYear()}  \u00B7  CONFIDENTIAL`, PAGE_W / 2, PAGE_H - 6, { align: 'center' });

      // ── Start content pages ────────────────────────────────────────────
      finalizeCurrentPage();
      doc.addPage();
      drawRunningHeader();
      y = 28;

      // ── HELPERS: STEP LABELS ─────────────────────────────────────────────
      const STEP_LABELS = {
        projectType: 'Project Type',
        problemStatement: 'Project Description',
        platform: 'Platforms',
        targetUsers: 'Target Users',
        coreFeatures: 'Core Requirements',
        timeline: 'Timeline',
      };
      const PROJECT_LABELS  = { web_app: 'Web Application', mobile_app: 'Mobile App', saas: 'SaaS Product', ecommerce: 'E-commerce Store', mvp: 'MVP / Prototype', enterprise: 'Enterprise System' };
      const TIMELINE_LABELS = { asap: 'ASAP (1-2 months)', '3months': '3 Months', '6months': '6 Months', '12months': '12 Months', flexible: 'Flexible / Not sure' };

      const formatVal = (key, val) => {
        if (key === 'timeline') return TIMELINE_LABELS[val] || val;
        if (key === 'projectType') return PROJECT_LABELS[val] || val;
        if (Array.isArray(val)) return val.map(v => v.replace(/_/g, ' ')).join(', ');
        return String(val || '').replace(/_/g, ' ');
      };

      // ── 1. PROJECT OVERVIEW ──────────────────────────────────────────────
      if (brief.projectOverview || brief.projectGoal) {
        sectionHeading('Project Overview', 22);
        if (brief.projectOverview) {
          setStyle(8.5, GRAY, false);
          writeWrapped(brief.projectOverview, MARGIN, CONTENT_W);
          y += 3;
        }
      }

      // ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────
      if (brief.executiveSummary) {
        sectionHeading('Executive Summary', 22);
        setStyle(8.5, GRAY, false);
        writeWrapped(brief.executiveSummary, MARGIN, CONTENT_W);
        y += 3;
      }

      // ── WHY CRESCENTEK (placed immediately after Executive Summary) ───────
      {
        const whyCrescentekText = brief.whyCrescentek ||
          'Crescentek brings 14+ years of experience delivering 3,200+ projects across diverse industries. ' +
          'Our team of senior engineers, designers, and project managers will ensure your project is delivered ' +
          'on time, on budget, and to the highest quality standards. We specialise in building scalable, ' +
          'future-ready software that grows with your business.';
        sectionHeading('Why Crescentek', 22);
        setStyle(8.5, GRAY, false);
        writeWrapped(whyCrescentekText, MARGIN, CONTENT_W);
        y += 3;
      }

      // ── PROJECT OBJECTIVES — table layout matching Core Feature List ──────
      if (brief.projectObjectives?.length) {
        sectionHeading('Project Objectives', 24, 8);

        setStyle(8, GRAY, false);
        doc.setFont('helvetica', 'normal');
        const objectivesIntro =
          'The objectives below define the key outcomes this project must achieve. They guide scope decisions, ' +
          'ensure every feature contributes to usability, performance, and security, and serve as acceptance ' +
          'criteria for milestone sign-off.';
        guard(16);
        const introLines = doc.splitTextToSize(objectivesIntro, CONTENT_W);
        introLines.forEach((ln, i) => doc.text(ln, MARGIN, y + i * 4.8));
        y += introLines.length * 4.8 + 6;

        const OBJ_NUM_W = 10;
        const OBJ_TITLE_W = 52;
        const OBJ_DESC_X = MARGIN + OBJ_NUM_W + OBJ_TITLE_W + 4;
        const OBJ_DESC_W = CONTENT_W - OBJ_NUM_W - OBJ_TITLE_W - 4;

        // Table header row
        guard(10);
        doc.setFillColor(...GOLD);
        doc.rect(MARGIN, y - 3, CONTENT_W, 8, 'F');
        setStyle(7.5, WHITE, true);
        doc.text('#', MARGIN + 3, y + 1);
        doc.text('Objective', MARGIN + OBJ_NUM_W + 2, y + 1);
        doc.text('Description', OBJ_DESC_X, y + 1);
        y += 9;

        brief.projectObjectives.forEach((obj, idx) => {
          // Support both {title, description} objects and legacy plain strings
          let title, desc;
          if (typeof obj === 'object' && obj !== null) {
            title = String(obj.title || '');
            desc = String(obj.description || '');
          } else {
            const raw = String(obj || '');
            // Fallback: first 4 words as title, full text as description
            const words = raw.split(' ');
            title = words.slice(0, 4).join(' ').replace(/[,.:;]$/, '');
            desc = raw;
          }

          const titleLines = doc.splitTextToSize(title, OBJ_TITLE_W - 2);
          const descLines = doc.splitTextToSize(desc, OBJ_DESC_W - 2);
          const rowH = Math.max(Math.max(titleLines.length, descLines.length) * 4.5 + 6, 12);
          guard(rowH + 2);

          const rowBg = idx % 2 === 0 ? [252, 249, 244] : [248, 244, 238];
          setFill(rowBg);
          doc.rect(MARGIN, y - 3, CONTENT_W, rowH, 'F');

          // Number
          setStyle(8, GOLD, true);
          doc.text(String(idx + 1).padStart(2, '0'), MARGIN + 3, y + 3);

          // Title (bold, dark)
          setStyle(8, DARK, true);
          titleLines.forEach((tl, ti) => {
            doc.text(tl, MARGIN + OBJ_NUM_W + 2, y + 3 + ti * 4.5);
          });

          // Description (regular, gray)
          setStyle(7.5, GRAY, false);
          descLines.forEach((dl, di) => {
            doc.text(dl, OBJ_DESC_X, y + 3 + di * 4.5);
          });

          y += rowH;
          doc.setDrawColor(...CREAM_DARK);
          doc.setLineWidth(0.15);
          doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
        });
        y += 5;
      }

      // ── 2. PROJECT GOAL ──────────────────────────────────────────────────
      if (brief.projectGoal) {
        sectionHeading('Project Goal', 26);
        // Match "Project Overview" layout: plain wrapped text, no extra box/container.
        setStyle(8.5, GRAY, false);
        writeWrapped(brief.projectGoal, MARGIN, CONTENT_W);
        y += 3;
      }

      // ── 3. SUGGESTED ARCHITECTURE ────────────────────────────────────────
      if (brief.suggestedArchitecture) {
        sectionHeading('Suggested Architecture', 24);
        setStyle(8.5, GRAY, false);
        writeWrapped(brief.suggestedArchitecture, MARGIN, CONTENT_W);
        y += 3;
      }

      // ── 4. PROJECT REQUIREMENTS ──────────────────────────────────────────
      if (answers && Object.keys(answers).length > 0) {
        const qaEntries = Object.entries(answers).filter(([k]) => STEP_LABELS[k]);
        if (qaEntries.length > 0) {
          sectionHeading('Project Requirements', 28);
          qaEntries.forEach(([key, val], idx) => {
            const label = STEP_LABELS[key];
            const labelLines = doc.splitTextToSize(label.toUpperCase(), 42);
            const value = formatVal(key, val);
            const valLines = doc.splitTextToSize(value, CONTENT_W - 54);
            const lineStep = 5;
            const labelBlock = labelLines.length * lineStep;
            const valBlock = valLines.length * lineStep;
            const rowH = Math.max(labelBlock, valBlock, 12) + 4;
            guard(rowH + 2);
            const rowBg = idx % 2 === 0 ? [252, 249, 244] : [248, 244, 238];
            setFill(rowBg);
            doc.rect(MARGIN, y - 3.5, CONTENT_W, rowH, 'F');
            setFill(CREAM);
            doc.rect(MARGIN, y - 3.5, 48, rowH, 'F');
            setStyle(7, GOLD, true);
            labelLines.forEach((ll, li) => {
              doc.text(ll, MARGIN + 3, y + 1 + li * lineStep);
            });
            setStyle(8.5, DARK, false);
            valLines.forEach((vl, vi) => {
              doc.text(vl, MARGIN + 51, y + 1 + vi * lineStep);
            });
            y += rowH;
            // Row divider
            setDraw(CREAM_DARK);
            doc.setLineWidth(0.15);
            doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
          });
          // Bottom border
          setDraw(GOLD_LIGHT);
          doc.setLineWidth(0.3);
          doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
          y += 5;
        }
      }



      // ── 5. SUGGESTED TECH STACK ──────────────────────────────────────────
      if (brief.techStack) {
        sectionHeading('Suggested Tech Stack', 30);
        const stackItems = [
          ['Frontend',       brief.techStack.frontend],
          ['Backend',        brief.techStack.backend],
          ['Database',       brief.techStack.database],
          ['Infrastructure', brief.techStack.infrastructure],
          ['Third-party',    brief.techStack.thirdParty],
        ].filter(([, arr]) => arr?.length);

        /** Equal half-column widths (mm), stable rounding so left/right cells match exactly. */
        const TECH_COL_GAP = 6;
        const techCellOuterW = Math.round(((CONTENT_W - TECH_COL_GAP) / 2) * 1000) / 1000;
        const TECH_HEADER_H = 10;
        const TECH_BODY_PAD_TOP = 2.75;
        const TECH_LINE_H = 4.5;
        const TECH_PAD_BOTTOM = 3.25;
        const TECH_CARD_RADIUS = 3;
        const TECH_STROKE_W = 0.28;

        const mmq = (v) => Math.round(Number(v) * 1000) / 1000;

        const PILL_H = 7.5;
        const PILL_PAD_X = 3.5;
        const PILL_GAP_X = 2.5;
        const PILL_GAP_Y = 2.5;
        const PILL_FONT_SIZE = 7;
        const ICON_SIZE = 3.5;
        const ICON_GAP = 1.5;

        const techMetrics = (outerW) => {
          const full = outerW >= CONTENT_W - 0.5;
          return full
            ? { bodyPt: 9, lineH: 5, headerH: 11, labelPt: 8 }
            : { bodyPt: 8, lineH: TECH_LINE_H, headerH: TECH_HEADER_H, labelPt: 7.5 };
        };

        const getPillRows = (items, innerW) => {
          doc.setFontSize(PILL_FONT_SIZE);
          doc.setFont('helvetica', 'bold');
          const cleanItems = (items || []).flatMap(i => String(i).split(/\s*\|\s*/).map(s => s.trim())).filter(Boolean);
          // Pill width = left pad + icon + gap-between-icon-and-text + text + right pad
          const pillWidths = cleanItems.map(t => {
            const textW = doc.getStringUnitWidth(t) * PILL_FONT_SIZE / doc.internal.scaleFactor;
            return Math.min(PILL_PAD_X + ICON_SIZE + ICON_GAP + textW + PILL_PAD_X, innerW);
          });
          const rows = [];
          let cur = [], curW = 0;
          pillWidths.forEach((pw, idx) => {
            if (curW + pw + (cur.length > 0 ? PILL_GAP_X : 0) > innerW && cur.length > 0) {
              rows.push(cur); cur = [idx]; curW = pw;
            } else { curW += pw + (cur.length > 0 ? PILL_GAP_X : 0); cur.push(idx); }
          });
          if (cur.length > 0) rows.push(cur);
          return { rows, pillWidths, cleanItems };
        };

        const techCardHeight = (items, innerW, outerW) => {
          const m = techMetrics(outerW);
          const { rows } = getPillRows(items, innerW);
          const pillBlockH = rows.length * (PILL_H + PILL_GAP_Y) - PILL_GAP_Y;
          return m.headerH + TECH_BODY_PAD_TOP + pillBlockH + TECH_PAD_BOTTOM + 2.25;
        };

        const drawTechCard = (colX, rowStart, label, items, outerW, forcedCardH) => {
          const innerPad = 6;
          const innerW = outerW - innerPad * 2;
          const m = techMetrics(outerW);
          const PILL_RADIUS = 2.2;

          const { rows: pillRows, pillWidths, cleanItems } = getPillRows(items, innerW);
          const pillBlockH = Math.max(pillRows.length, 1) * (PILL_H + PILL_GAP_Y) - PILL_GAP_Y;
          const ownCardH = m.headerH + TECH_BODY_PAD_TOP + pillBlockH + TECH_PAD_BOTTOM + 2.25;
          const cardH = forcedCardH || ownCardH;

          const colXq = mmq(colX);
          const outerWq = mmq(outerW);
          const cardTop = mmq(rowStart - 1.25);
          const headerBottom = mmq(cardTop + m.headerH);

          // 1) Soft shadow (premium depth) — subtle cream offset
          doc.setFillColor(...CREAM_DARK);
          doc.roundedRect(
            mmq(colXq + 0.6),
            mmq(cardTop + 0.9),
            outerWq,
            cardH,
            TECH_CARD_RADIUS,
            TECH_CARD_RADIUS,
            'F',
          );

          // 2) Card shell
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(colXq, cardTop, outerWq, cardH, TECH_CARD_RADIUS, TECH_CARD_RADIUS, 'F');

          // 3) Top accent line (theme gold)
          doc.setFillColor(...GOLD_LIGHT);
          doc.rect(colXq, cardTop, outerWq, 1, 'F');

          // 4) Border (soft, modern)
          doc.setDrawColor(...GOLD_LIGHT);
          doc.setLineWidth(TECH_STROKE_W);
          doc.roundedRect(colXq, cardTop, outerWq, cardH, TECH_CARD_RADIUS, TECH_CARD_RADIUS, 'S');

          // 5) Header label (left-aligned, clean hierarchy)
          setStyle(m.labelPt, GOLD, true);
          doc.text(label.toUpperCase(), mmq(colXq + innerPad), mmq(cardTop + 6.6));

          // 6) Subtle divider under label
          doc.setDrawColor(...CREAM_DARK);
          doc.setLineWidth(0.25);
          doc.line(mmq(colXq + innerPad), mmq(cardTop + 8.4), mmq(colXq + outerWq - innerPad), mmq(cardTop + 8.4));

          // 7) Draw pills
          const bodyStartY = mmq(headerBottom + TECH_BODY_PAD_TOP);
          pillRows.forEach((row, rowIdx) => {
            const rowY = bodyStartY + rowIdx * (PILL_H + PILL_GAP_Y);
            let px = colXq + innerPad;
            row.forEach(itemIdx => {
              const t = cleanItems[itemIdx];
              const pw = pillWidths[itemIdx];

              // Pill background: subtle cream tint + crisp border (theme-aligned)
              doc.setFillColor(252, 249, 244);
              doc.setDrawColor(...GOLD_LIGHT);
              doc.setLineWidth(0.25);
              doc.roundedRect(px, rowY, pw, PILL_H, PILL_RADIUS, PILL_RADIUS, 'FD');

              // Icon circle — vertically centred in pill
              const iconCx = px + PILL_PAD_X + ICON_SIZE / 2;
              const iconCy = rowY + PILL_H / 2;
              const tn = (t || '').toLowerCase().replace(/[.\s-]/g, '');
              const iconColors = {
                react:[97,218,251], nextjs:[30,30,30], vuejs:[65,184,131], angular:[221,0,49],
                svelte:[255,62,0], typescript:[49,120,198], nodejs:[51,153,51], python:[55,118,171],
                django:[9,46,32], fastapi:[0,150,136], laravel:[252,60,60], rails:[204,0,0],
                ruby:[204,0,0], net:[82,45,168], dotnet:[82,45,168], aspnet:[82,45,168],
                go:[0,172,215], java:[235,85,35], spring:[109,179,63], postgresql:[51,103,145],
                mysql:[0,117,143], mongodb:[77,179,61], redis:[220,60,50], firebase:[255,160,0],
                supabase:[62,207,142], dynamodb:[35,124,210], aws:[255,153,0], azure:[0,120,212],
                gcp:[66,133,244], google:[66,133,244], docker:[41,130,226], kubernetes:[50,108,229],
                k8s:[50,108,229], terraform:[100,45,195], github:[30,30,30], stripe:[99,91,255],
                paypal:[0,112,186], twilio:[245,22,65], openai:[16,163,127], wordpress:[33,117,155],
                shopify:[150,191,71], flutter:[66,165,245], reactnative:[97,218,251],
                nuxt:[0,220,130], expo:[30,30,30], swift:[255,95,45], kotlin:[127,82,255],
              };
              const matchKey = Object.keys(iconColors).find(k => tn.includes(k)) || null;
              const ic = matchKey ? iconColors[matchKey] : [160, 120, 48];
              doc.setFillColor(ic[0], ic[1], ic[2]);
              doc.circle(iconCx, iconCy, ICON_SIZE / 2, 'F');
              // 2-char abbreviation — jsPDF baseline sits ~1/3 of cap-height below visual centre
              // For 3pt font: cap-height ≈ 3 * 0.353mm * 0.72 ≈ 0.76mm; offset = 0.76/2 ≈ 0.38mm
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(3);
              doc.setTextColor(255, 255, 255);
              const abbr = (t || '').slice(0, 2).toUpperCase();
              doc.text(abbr, iconCx, iconCy + 0.38, { align: 'center' });

              // Pill label — starts right after icon + gap, baseline at pill vertical centre
              // For 7pt font: cap-height ≈ 7 * 0.353mm * 0.72 ≈ 1.78mm; shift baseline down by half
              const textX = px + PILL_PAD_X + ICON_SIZE + ICON_GAP;
              doc.setFontSize(PILL_FONT_SIZE);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(120, 85, 20);
              doc.text(t, textX, iconCy + 0.89);

              px += pw + PILL_GAP_X;
            });
          });

          return cardH;
        };

        for (let idx = 0; idx < stackItems.length; idx += 2) {
          const left = stackItems[idx];
          const right = stackItems[idx + 1];
          const singleRow = Boolean(left && !right);

          const leftOuterW = singleRow ? CONTENT_W : techCellOuterW;
          const rightOuterW = techCellOuterW;
          const leftInnerW = leftOuterW - 12;
          const rightInnerW = rightOuterW - 12;

          const rowH = Math.max(
            left ? techCardHeight(left[1], leftInnerW, leftOuterW) : 0,
            right ? techCardHeight(right[1], rightInnerW, rightOuterW) : 0,
          );
          // Use larger guard so the full card pair always stays on the same page
          guard(rowH + 16);
          const rowStart = y;

          let drawnH = 0;
          const rightColX = Math.round((MARGIN + techCellOuterW + TECH_COL_GAP) * 1000) / 1000;
          if (left) drawnH = Math.max(drawnH, drawTechCard(MARGIN, rowStart, left[0], left[1], leftOuterW, rowH));
          if (right) {
            drawnH = Math.max(drawnH, drawTechCard(rightColX, rowStart, right[0], right[1], rightOuterW, rowH));
          }
          y = rowStart + Math.max(rowH, drawnH) + 4;
        }
        y += 3;
      }

      // ── 6. CORE FEATURE LIST (Feature + Description only — theme colors) ─
      if (brief.coreFeatures?.length) {
        sectionHeading('Core Detailed Feature List', 26);

        const FEAT_COL_W = 52;
        const DESC_X = MARGIN + FEAT_COL_W + 6;
        const DESC_W = CONTENT_W - FEAT_COL_W - 6;

        guard(10);
        setFill(GOLD);
        doc.rect(MARGIN, y - 3, CONTENT_W, 8, 'F');
        setStyle(7.5, WHITE, true);
        doc.text('Feature', MARGIN + 3, y + 1);
        doc.text('Description', DESC_X, y + 1);
        y += 9;

        brief.coreFeatures.forEach((f, i) => {
          const descLines = doc.splitTextToSize(f.description || '', DESC_W - 2);
          const featLines = doc.splitTextToSize(f.feature || '', FEAT_COL_W - 4);
          const rowH = Math.max(Math.max(descLines.length, featLines.length) * 4.5 + 6, 12);
          guard(rowH + 2);

          const rowBg = i % 2 === 0 ? [252, 249, 244] : [248, 244, 238];
          setFill(rowBg);
          doc.rect(MARGIN, y - 3, CONTENT_W, rowH, 'F');

          setStyle(8, DARK, true);
          featLines.forEach((fl, fi) => {
            doc.text(fl, MARGIN + 3, y + 3 + fi * 4.5);
          });
          setStyle(7.5, GRAY, false);
          descLines.forEach((dl, di) => {
            doc.text(dl, DESC_X, y + 3 + di * 4.5);
          });

          y += rowH;
          setDraw(CREAM_DARK);
          doc.setLineWidth(0.15);
          doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
        });
        y += 5;
      }

      // ── 7. ESTIMATED TIMELINE & MILESTONES ──────────────────────────────
      if (brief.projectPhases?.length) {
        sectionHeading('Estimated Timeline & Milestones', 32);

        brief.projectPhases.forEach((phase, i) => {
          const delivLines = (phase.deliverables || []).slice(0, 6);

          // Strip any leading "Phase N:" or "Phase N -" prefixes from the phase name
          const rawPhase = String(phase.phase || 'Milestone');
          const cleanName = rawPhase.replace(/^phase\s*\d+\s*[-:]\s*/i, '').trim();
          const milestoneLabel = `Milestone ${i + 1} \u2014 ${cleanName}`;

          const TITLE_FONT_PT = 9;

          // Use jsPDF's own layout metrics (same approach as the main title band)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(TITLE_FONT_PT);
          const titleDim = doc.getTextDimensions(milestoneLabel, { maxWidth: CONTENT_W - 12, fontSize: TITLE_FONT_PT });
          // Slightly tighter header bar height so it feels more balanced
          const headerBarH = Math.max(10, titleDim.h + 6) + 1.2;

          const DELIV_LINE_MM = 4.5;
          const DELIV_FONT_PT = 8;
          const DELIV_TEXT_X = MARGIN + 9;
          const DELIV_TEXT_W = CONTENT_W - (DELIV_TEXT_X - MARGIN) - 5;

          let deliverablesH = 4;
          delivLines.forEach((d) => {
            const dLines = doc.splitTextToSize(d, DELIV_TEXT_W);
            deliverablesH += dLines.length * DELIV_LINE_MM + 2;
          });
          guard(headerBarH + deliverablesH + 8);

          const milestoneBarTop = y - 2;
          doc.setFillColor(...GOLD);
          doc.roundedRect(MARGIN, milestoneBarTop, CONTENT_W, headerBarH, 1.5, 1.5, 'F');

          const sf = doc.internal.scaleFactor;
          const fs = doc.getFontSize();
          const lhf = doc.getLineHeightFactor();
          const lineBoxMm = fs / sf;
          // Give milestone headers a touch more top breathing room
          const titleBaselineNudge = 0.7;
          const titleFirstBaseline =
            (milestoneBarTop + headerBarH / 2) - titleDim.h / 2 + lineBoxMm * 0.56 + titleBaselineNudge;
          // Left-align all milestone/phase titles with consistent inner padding
          const titleLeftX = MARGIN + 6;

          setStyle(TITLE_FONT_PT, WHITE, true);
          doc.setFont('helvetica', 'bold');
          doc.text(milestoneLabel, titleLeftX, titleFirstBaseline, {
            maxWidth: CONTENT_W - 12,
            align: 'left',
            lineHeightFactor: lhf,
          });

          y += headerBarH + 3;

          delivLines.forEach((d) => {
            guard(8);
            const dLines = doc.splitTextToSize(d, DELIV_TEXT_W);
            doc.setFillColor(...GOLD);
            const bulletSize = 2;
            const bulletLeft = MARGIN + 4;
            const delivFirstBaseline = y;
            const mmPerPt = 25.4 / 72;
            const capCenterAboveBaseline = DELIV_FONT_PT * mmPerPt * 0.38;
            const bulletCenterY = delivFirstBaseline - capCenterAboveBaseline;
            doc.rect(
              bulletLeft,
              bulletCenterY - bulletSize / 2,
              bulletSize,
              bulletSize,
              'F',
            );
            setStyle(DELIV_FONT_PT, GRAY, false);
            doc.setFont('helvetica', 'normal');
            dLines.forEach((dl, dj) => {
              doc.text(dl, DELIV_TEXT_X, delivFirstBaseline + dj * DELIV_LINE_MM);
            });
            y += dLines.length * DELIV_LINE_MM + 2;
          });
          y += 4;
        });

        // ── TIMELINE SUMMARY BOX ──────────────────────────────────────────
        const totalPhases = brief.projectPhases.length;
        const firstPhase = brief.projectPhases[0]?.phase || 'Planning';
        const lastPhase = brief.projectPhases[totalPhases - 1]?.phase || 'Launch';
        const summaryText =
          `This project is structured across ${totalPhases} milestones — from ${firstPhase} through to ${lastPhase}. ` +
          `Each milestone builds on the previous, ensuring a controlled, iterative delivery with clear sign-off criteria. ` +
          `Crescentek recommends regular progress reviews at every milestone gate to maintain alignment, manage risk, and ensure on-time delivery.`;
        const summaryLines = doc.splitTextToSize(summaryText, CONTENT_W - 10);
        const summaryH = summaryLines.length * 4.8 + 10;
        guard(summaryH + 6);
        y += 4;
        doc.setFillColor(245, 240, 232);
        doc.setDrawColor(...GOLD_LIGHT);
        doc.setLineWidth(0.3);
        doc.roundedRect(MARGIN, y - 2, CONTENT_W, summaryH, 2, 2, 'FD');
        doc.setFillColor(...GOLD);
        doc.rect(MARGIN, y - 2, 3.5, summaryH, 'F');
        setStyle(7.5, GRAY, false);
        summaryLines.forEach((ln, j) => doc.text(ln, MARGIN + 7, y + 4 + j * 4.8));
        y += summaryH + 6;
      }

      // ── 8. RECOMMENDATIONS & NEXT STEPS (merged single section) ─────────
      const allActions = [
        ...(brief.additionalRecommendations || []).map(r => ({ text: r, type: 'rec' })),
        ...(brief.nextSteps || []).map(s => ({ text: String(s || ''), type: 'step' })),
      ];
      if (allActions.length) {
        sectionHeading('Recommendations & Next Steps', 24);
        const ACT_NUM_X = MARGIN + 4;
        const ACT_TXT_X = MARGIN + 14;

        allActions.forEach((item, i) => {
          guard(12);
          const lines = doc.splitTextToSize(item.text, CONTENT_W - 20);
          const rowH = lines.length * 5 + 8;
          const rowBg = i % 2 === 0 ? CREAM : [248, 244, 238];
          setFill(rowBg);
          doc.roundedRect(MARGIN, y - 3, CONTENT_W, rowH, 1.5, 1.5, 'F');

          const leadY = y + 5;
          setStyle(9, GOLD, true);
          doc.setFont('helvetica', 'bold');
          doc.text(`${i + 1}.`, ACT_NUM_X, leadY);
          setStyle(8.5, DARK, false);
          doc.setFont('helvetica', 'normal');
          lines.forEach((ln, li) => {
            doc.text(ln, ACT_TXT_X, leadY + li * 5);
          });
          y += rowH + 3;
        });
        y += 2;
      }

      // ── CONCLUSION ───────────────────────────────────────────────────────
      if (brief.conclusion) {
        sectionHeading('Conclusion', 26);
        setStyle(8.5, GRAY, false);
        writeWrapped(brief.conclusion, MARGIN, CONTENT_W);
        y += 3;
      }

      finalizeCurrentPage();

      // ══════════════════════════════════════════════════════════════════
      // LAST PAGE — THANK YOU (Framed Letter)
      // Cream canvas using the same gold double-frame and L corner accents
      // as the cover, for cohesive bookend pairing. Centred typographic
      // hero: eyebrow → "Thank You." → ornament → tagline → letter copy →
      // signature. Below: centred GET IN TOUCH heading and a horizontal
      // 4-column contact strip with hairline gold separators.
      // All contact details live ONLY here.
      // ══════════════════════════════════════════════════════════════════
      doc.addPage();

      // ── Cream canvas ───────────────────────────────────────────────────
      doc.setFillColor(248, 244, 237);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

      // ── Outer gold frame (matches cover) ─────────────────────────────
      const TY_FI = 10;
      const TY_FX = TY_FI;
      const TY_FY = TY_FI;
      const TY_FW = PAGE_W - TY_FI * 2;
      const TY_FH = PAGE_H - TY_FI * 2;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.5);
      doc.rect(TY_FX, TY_FY, TY_FW, TY_FH, 'S');

      // Inner hairline frame
      doc.setDrawColor(...GOLD_LIGHT);
      doc.setLineWidth(0.2);
      doc.rect(TY_FX + 3, TY_FY + 3, TY_FW - 6, TY_FH - 6, 'S');

      // L corner ornaments
      const TY_CO = 6;
      const TY_CL = 9;
      const TY_CT = 0.8;
      doc.setFillColor(...GOLD);
      doc.rect(TY_FX + TY_CO, TY_FY + TY_CO, TY_CL, TY_CT, 'F');
      doc.rect(TY_FX + TY_CO, TY_FY + TY_CO, TY_CT, TY_CL, 'F');
      doc.rect(TY_FX + TY_FW - TY_CO - TY_CL, TY_FY + TY_CO, TY_CL, TY_CT, 'F');
      doc.rect(TY_FX + TY_FW - TY_CO - TY_CT, TY_FY + TY_CO, TY_CT, TY_CL, 'F');
      doc.rect(TY_FX + TY_CO, TY_FY + TY_FH - TY_CO - TY_CT, TY_CL, TY_CT, 'F');
      doc.rect(TY_FX + TY_CO, TY_FY + TY_FH - TY_CO - TY_CL, TY_CT, TY_CL, 'F');
      doc.rect(TY_FX + TY_FW - TY_CO - TY_CL, TY_FY + TY_FH - TY_CO - TY_CT, TY_CL, TY_CT, 'F');
      doc.rect(TY_FX + TY_FW - TY_CO - TY_CT, TY_FY + TY_FH - TY_CO - TY_CL, TY_CT, TY_CL, 'F');

      // ── Logo top-centre + small rule ──────────────────────────────────
      if (logoDataUrl) {
        const dims = computeLogoMm(13, 60);
        const lw = dims?.w ?? 50;
        doc.addImage(logoDataUrl, 'PNG', (PAGE_W - lw) / 2, 28, lw, dims?.h ?? 13);
      }
      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 6, 47, 12, 0.5, 'F');

      // ── Hero ─────────────────────────────────────────────────────────
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...GOLD);
      doc.text('— A NOTE FROM US —', PAGE_W / 2, 58, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(44);
      doc.setTextColor(...DARK);
      doc.text('Thank You.', PAGE_W / 2, 84, { align: 'center' });

      // Ornament: line — gold dot — line
      const TY_ORN_Y = 92;
      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 38, TY_ORN_Y, 28, 0.6, 'F');
      doc.rect(PAGE_W / 2 + 10, TY_ORN_Y, 28, 0.6, 'F');
      doc.circle(PAGE_W / 2, TY_ORN_Y + 0.3, 1.6, 'F');

      // Italic tagline
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11.5);
      doc.setTextColor(...GRAY);
      doc.text('for the opportunity to present this proposal.', PAGE_W / 2, TY_ORN_Y + 11, { align: 'center' });

      // Letter body — centred
      const tyBodyMsg = 'We are excited about the possibility of partnering with you. Our team at Crescentek is ready to bring your vision to life with precision, creativity, and dedication. Let\'s build something extraordinary together.';
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...GRAY);
      const tyBodyLines = doc.splitTextToSize(tyBodyMsg, 140);
      tyBodyLines.forEach((ln, li) => doc.text(ln, PAGE_W / 2, TY_ORN_Y + 26 + li * 5.8, { align: 'center' }));

      // Sign-off (centred italic + bold) with thin gold underline
      const TY_SIGN_Y = TY_ORN_Y + 26 + tyBodyLines.length * 5.8 + 12;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(...GRAY);
      doc.text('— With gratitude,', PAGE_W / 2, TY_SIGN_Y, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...DARK);
      doc.text('The Crescentek Team', PAGE_W / 2, TY_SIGN_Y + 9, { align: 'center' });

      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 16, TY_SIGN_Y + 12.5, 32, 0.5, 'F');

      // ── GET IN TOUCH heading (centred, with line ornaments) ──────────
      const TY_GIT_Y = PAGE_H - 70;

      doc.setFillColor(...GOLD);
      doc.rect(PAGE_W / 2 - 40, TY_GIT_Y - 1.5, 22, 0.5, 'F');
      doc.rect(PAGE_W / 2 + 18, TY_GIT_Y - 1.5, 22, 0.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text('GET IN TOUCH', PAGE_W / 2, TY_GIT_Y, { align: 'center' });

      // ── 4-column horizontal contact strip ────────────────────────────
      const tyContacts = [
        { label: 'CONTACT', value: 'Rajesh Bajaj' },
        { label: 'PHONE',   value: '+91 9836900840' },
        { label: 'EMAIL',   value: 'rajesh@crescentek.com' },
        { label: 'WEB',     value: SITE_BRAND_LABEL },
      ];
      const TY_STRIP_TOP = TY_GIT_Y + 10;
      const TY_COL_W = CONTENT_W / tyContacts.length;

      tyContacts.forEach((c, ci) => {
        const cx = MARGIN + ci * TY_COL_W + TY_COL_W / 2;

        // Hairline gold separator between columns
        if (ci > 0) {
          doc.setFillColor(...GOLD_LIGHT);
          doc.rect(MARGIN + ci * TY_COL_W, TY_STRIP_TOP - 2, 0.3, 18, 'F');
        }

        // Label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(...GOLD);
        doc.text(c.label, cx, TY_STRIP_TOP + 4, { align: 'center' });

        // Value
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...DARK);
        doc.text(c.value, cx, TY_STRIP_TOP + 12, { align: 'center' });
      });

      // ── Bottom centred date / brand line ─────────────────────────────
      const tyDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...GRAY);
      doc.text(`${tyDate}  \u00B7  ${SITE_BRAND_LABEL}  \u00B7  Confidential`, PAGE_W / 2, PAGE_H - 16, { align: 'center' });

      // drawWatermark(); // WATERMARK DISABLED — code kept for future re-enabling

      // Return base64 string (strip the data URI prefix)
      const dataUri = doc.output('datauristring');
      return dataUri.split(',')[1];
  };

  const handlePdfModalConfirm = async () => {
    const name = modalName.trim();
    const email = modalEmail.trim();
    const phone = normalizePhone(`${modalCountry?.code || ''}${modalPhone}`);
    setModalError('');
    if (!name || !email || !phone) {
      setModalError('Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      setModalError('Please enter a valid email address.');
      return;
    }
    if (!isValidPhone(phone)) {
      setModalError('Please enter a valid phone number.');
      return;
    }
    setModalBusy(true);
    setModalPhase('prepare');
    try {
      // Step 1: Generate PDF as blob
      setPdfLoading(true);
      const pdfBase64 = await generatePdfBase64();

      // Convert base64 to a File blob and upload to get a public URL
      const pdfBytes = Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0));
      const safeName = (brief.projectTitle || 'Brief').replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || 'Brief';
      const pdfFile = new File([pdfBytes], `Crescentek-Project-Brief-${safeName}.pdf`, { type: 'application/pdf' });
      const uploadRes = await uploadBriefPdf(pdfFile);
      const pdfUrl = uploadRes?.file_url || null;
      setPdfLoading(false);

      // Step 2: Send email with PDF attached (base64) + download URL
      setModalPhase('sending');
      const res = await sendBriefEmail({
        name,
        email,
        phone,
        brief,
        pdfBase64,
        pdfUrl,
      });
      if (res?.data?.error) {
        setModalError(typeof res.data.error === 'string' ? res.data.error : 'Could not send email. Please try again.');
        return;
      }
      // Step 3: Show success state
      setEmailSent(true);
    } catch (err) {
      const msg = err?.response?.data?.error ?? err?.data?.error ?? err?.message ?? 'Something went wrong. Please try again.';
      setModalError(typeof msg === 'string' ? msg : 'Something went wrong. Please try again.');
    } finally {
      setModalBusy(false);
      setPdfLoading(false);
      setModalPhase(null);
    }
  };

  const timelinePhases = brief.projectPhases?.map((p, i) => {
    const icons = ['🔍', '🎨', '⚙️', '🧪', '🚀', '📦'];
    const colors = ['#A07830', '#6B52A8', '#2E6E9E', '#1E8A6E', '#C96A2E', '#4F46E5'];
    return { label: p.phase, duration: p.duration, icon: icons[i] || '●', color: colors[i] || '#A07830' };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-500 text-sm font-medium">Brief Generated</span>
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl text-ivory font-light">{brief.projectTitle}</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => { setModalError(''); setEmailSent(false); setPdfModalOpen(true); }}
            disabled={modalBusy || pdfLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-70 hover:brightness-110 hover:shadow-md hover:scale-[1.02] active:scale-[0.99]"
            style={{ background: '#A07830', color: '#FAF7F2' }}
          >
            <Mail className="w-4 h-4" /> Get PDF via Email
          </button>
          <button onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border border-gold/20 text-warmgray hover:border-gold/40 hover:text-ivory hover:bg-gold/5 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200">
            <RotateCcw className="w-4 h-4" /> Start Over
          </button>
        </div>
      </div>

      {/* Download PDF — portal + full-bleed blur avoids top seam / stacking issues from Layout <main> */}
      {pdfModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[210]"
            style={{ overscrollBehavior: 'contain' }}
          >
            <button
              type="button"
              aria-label="Close dialog"
              className="absolute inset-0 block min-h-[100dvh] w-full cursor-pointer border-0 bg-[#1a1710]/35 p-0 backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] [transform:translateZ(0)]"
              onClick={() => !modalBusy && !pdfLoading && setPdfModalOpen(false)}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
              <div
                className="pointer-events-auto relative w-full max-w-[420px] rounded-2xl border border-[#D4C4A8] bg-[#FAF7F2] shadow-[0_24px_48px_-12px_rgba(26,23,16,0.25)] ring-1 ring-black/5 overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pdf-modal-title"
              >
            <div className="h-1" style={{ background: 'linear-gradient(90deg,#A07830,#C9A96E,#A07830)' }} />
            <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3 border-b border-[#E8E0D4] bg-[#FFFCF8]">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: '#A07830' }}>
                  Project brief
                </p>
                <h2 id="pdf-modal-title" className="font-heading text-xl text-[#1A1710] font-light leading-snug">
                  {emailSent ? 'Email sent!' : 'Get your PDF via email'}
                </h2>
              </div>
              <button
                type="button"
                disabled={modalBusy || pdfLoading}
                onClick={() => { setPdfModalOpen(false); setEmailSent(false); }}
                className="shrink-0 p-2 rounded-lg text-[#6B6456] hover:text-[#1A1710] hover:bg-[#A07830]/10 disabled:opacity-40 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5 bg-[#FAF7F2]">
              {emailSent ? (
                <div className="flex flex-col items-center text-center py-4 gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <p className="text-[#1A1710] font-medium text-base">Your project brief has been sent!</p>
                  <p className="text-[#6B6456] text-sm leading-relaxed">
                    We've sent the PDF to <strong>{modalEmail}</strong> with your full project brief attached. Please check your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setPdfModalOpen(false); setEmailSent(false); }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-105"
                    style={{ background: '#A07830', color: '#FAF7F2' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
              <>
              <p className="text-[#6B6456] text-sm leading-relaxed">
                Enter your details below. We'll send your project brief PDF directly to your email.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="pdf-modal-name" className="block text-xs font-semibold tracking-wide text-[#1A1710] mb-1.5">
                    Full name <span className="text-red-600 font-normal" aria-hidden>*</span>
                  </label>
                  <input
                    id="pdf-modal-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={modalName}
                    onChange={e => setModalName(e.target.value)}
                    disabled={modalBusy || pdfLoading}
                    className="w-full rounded-lg border border-[#D4C4A8] bg-white px-3 py-2.5 text-sm text-[#1A1710] outline-none focus:border-[#A07830] focus:ring-2 focus:ring-[#A07830]/20 placeholder:text-[#9A9288] disabled:opacity-50 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="pdf-modal-email" className="block text-xs font-semibold tracking-wide text-[#1A1710] mb-1.5">
                    Email address <span className="text-red-600 font-normal" aria-hidden>*</span>
                  </label>
                  <input
                    id="pdf-modal-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={modalEmail}
                    onChange={e => setModalEmail(e.target.value)}
                    disabled={modalBusy || pdfLoading}
                    className="w-full rounded-lg border border-[#D4C4A8] bg-white px-3 py-2.5 text-sm text-[#1A1710] outline-none focus:border-[#A07830] focus:ring-2 focus:ring-[#A07830]/20 placeholder:text-[#9A9288] disabled:opacity-50 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="pdf-modal-phone" className="block text-xs font-semibold tracking-wide text-[#1A1710] mb-1.5">
                    Phone number <span className="text-red-600 font-normal" aria-hidden>*</span>
                  </label>
                  <div className="w-full rounded-lg border border-[#D4C4A8] bg-white px-3 flex items-center focus-within:border-[#A07830] focus-within:ring-2 focus-within:ring-[#A07830]/20 disabled:opacity-50 transition-shadow">
                    <CountryCodePicker
                      value={modalCountry}
                      onChange={setModalCountry}
                      tone="light"
                      buttonClassName="flex items-center gap-1.5 py-2.5 pr-2 text-[#1A1710] text-sm outline-none cursor-pointer whitespace-nowrap"
                    />
                    <span className="text-[#D4C4A8] mx-2">|</span>
                    <input
                      id="pdf-modal-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={modalPhone}
                      onChange={e => setModalPhone(sanitizePhoneInput(e.target.value))}
                      disabled={modalBusy || pdfLoading}
                      className="flex-1 bg-transparent py-2.5 text-sm text-[#1A1710] outline-none placeholder:text-[#9A9288] disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
              {modalError ? (
                <p className="text-red-700 text-sm rounded-lg bg-red-50 border border-red-100 px-3 py-2" role="alert">
                  {modalError}
                </p>
              ) : null}
              <button
                type="button"
                onClick={handlePdfModalConfirm}
                disabled={modalBusy || pdfLoading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium disabled:opacity-50 transition-all duration-200 hover:brightness-105 shadow-md hover:shadow-lg"
                style={{ background: '#A07830', color: '#FAF7F2' }}
              >
                {modalBusy || pdfLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {modalPhase === 'prepare' ? 'Generating PDF…' : 'Sending email…'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send to my email
                  </>
                )}
              </button>
              </>
              )}
            </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Timeline */}
      {timelinePhases?.length > 0 && (
        <div className="rounded-xl border border-gold/15 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <ProjectTimeline phases={timelinePhases} />
        </div>
      )}

      {/* Brief Sections */}
      <div className="space-y-3">
        {(brief.projectOverview || brief.projectGoal) && (
          <Section title="Project Overview & Goal">
            {brief.projectOverview && <p className="text-warmgray text-sm leading-relaxed mb-3">{brief.projectOverview}</p>}
            {brief.projectGoal && (
              <div className="rounded-lg p-3 border border-gold/10" style={{ background: 'rgba(160,120,48,0.05)' }}>
                <p className="text-gold text-xs font-medium mb-1">Project Goal</p>
                <p className="text-ivory text-sm leading-relaxed">{brief.projectGoal}</p>
              </div>
            )}
          </Section>
        )}

        {brief.executiveSummary && (
          <Section title="Executive Summary">
            <p className="text-warmgray text-sm leading-relaxed">{brief.executiveSummary}</p>
          </Section>
        )}

        {brief.projectObjectives?.length > 0 && (
          <Section title="Project Objectives">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-2 text-warmgray text-xs font-medium w-1/4">Objective</th>
                    <th className="text-left py-2 text-warmgray text-xs font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {brief.projectObjectives.map((obj, i) => {
                    const title = typeof obj === 'object' ? obj.title : String(obj || '').split(' ').slice(0, 4).join(' ');
                    const desc = typeof obj === 'object' ? obj.description : String(obj || '');
                    return (
                      <tr key={i} className="border-b border-gold/5">
                        <td className="py-2 text-ivory text-sm font-medium pr-3 align-top">{title}</td>
                        <td className="py-2 text-warmgray text-xs leading-relaxed">{desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {brief.coreFeatures?.length > 0 && (
          <Section title="Core Feature List">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-2 text-warmgray text-xs font-medium w-1/4">Feature</th>
                    <th className="text-left py-2 text-warmgray text-xs font-medium">Description</th>
                    <th className="text-left py-2 text-warmgray text-xs font-medium w-20">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {brief.coreFeatures.map((f, i) => (
                    <tr key={i} className="border-b border-gold/5">
                      <td className="py-2 text-ivory text-sm font-medium pr-3">{f.feature}</td>
                      <td className="py-2 text-warmgray text-xs leading-relaxed pr-3">{f.description}</td>
                      <td className="py-2">
                        <span className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{
                            background: f.priority === 'Critical' ? 'rgba(180,60,30,0.12)' : f.priority === 'High' ? 'rgba(201,106,46,0.15)' : 'rgba(160,120,48,0.12)',
                            color: f.priority === 'Critical' ? '#B43C1E' : f.priority === 'High' ? '#C96A2E' : '#A07830'
                          }}>
                          {f.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {brief.techStack && (
          <Section title="Suggested Tech Stack">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Frontend', brief.techStack.frontend],
                ['Backend', brief.techStack.backend],
                ['Database', brief.techStack.database],
                ['Infrastructure', brief.techStack.infrastructure],
                ['Third-party', brief.techStack.thirdParty],
              ].filter(([, arr]) => arr?.length).map(([label, items]) => (
                <div key={label} className="rounded-lg p-3 border border-gold/10" style={{ background: 'rgba(160,120,48,0.05)' }}>
                  <p className="text-warmgray text-xs mb-2">{label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(160,120,48,0.15)', color: '#A07830', border: '1px solid rgba(160,120,48,0.25)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {brief.suggestedArchitecture && (
          <Section title="Suggested Architecture">
            <p className="text-warmgray text-sm leading-relaxed">{brief.suggestedArchitecture}</p>
          </Section>
        )}

        {(brief.additionalRecommendations?.length > 0 || brief.nextSteps?.length > 0) && (
          <Section title="Recommendations & Next Steps">
            <ol className="space-y-2">
              {[
                ...(brief.additionalRecommendations || []).map(r => ({ text: r, type: 'rec' })),
                ...(brief.nextSteps || []).map(s => ({ text: String(s || ''), type: 'step' })),
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-warmgray">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: '#A07830', color: '#FAF7F2' }}>{i + 1}</span>
                  {item.text}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {brief.whyCrescentek && (
          <Section title="Why Crescentek?" defaultOpen={false}>
            <p className="text-warmgray text-sm leading-relaxed">{brief.whyCrescentek}</p>
          </Section>
        )}

        {brief.conclusion && (
          <Section title="Conclusion" defaultOpen={false}>
            <p className="text-warmgray text-sm leading-relaxed">{brief.conclusion}</p>
            <a href="/contact"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-110 hover:shadow-md hover:scale-[1.02] active:scale-[0.99]"
              style={{ background: '#A07830', color: '#FAF7F2' }}>
              Start Your Project →
            </a>
          </Section>
        )}
      </div>
    </div>
  );
}