/**
 * Shared AI / Base44 function entry points.
 * Re-exports domain services for a single import surface.
 */
export {
  visitorChat,
  chatLeadCapture,
  chatLeadCaptureSafe,
} from '@/services/chatbotService';

export {
  getAIRecommendations,
  generateDynamicSteps,
  generateProjectBrief,
  sendBriefEmail,
  uploadBriefPdf,
} from '@/services/generationService';

export { logToHubspot } from '@/services/hubspotService';
