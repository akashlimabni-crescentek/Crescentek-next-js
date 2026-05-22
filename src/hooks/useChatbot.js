'use client';

import { useCallback } from 'react';
import { visitorChat, chatLeadCapture, chatLeadCaptureSafe } from '@/services/chatbotService';
import { logToHubspot } from '@/services/hubspotService';

export function useChatbot() {
  const sendVisitorMessage = useCallback((payload) => visitorChat(payload), []);
  const saveLead = useCallback((payload) => chatLeadCapture(payload), []);
  const saveLeadSafe = useCallback((payload) => chatLeadCaptureSafe(payload), []);
  const submitLeadToHubspot = useCallback((payload) => logToHubspot(payload), []);

  return {
    sendVisitorMessage,
    saveLead,
    saveLeadSafe,
    submitLeadToHubspot,
  };
}
