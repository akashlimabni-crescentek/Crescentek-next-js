import { apiPost } from '@/lib/api-fetch';

export async function getAIRecommendations(payload) {
  return apiPost('/api/planner/recommendations', payload);
}

export async function generateDynamicSteps(payload) {
  return apiPost('/api/planner/steps', payload);
}

export async function generateProjectBrief(payload) {
  return apiPost('/api/planner/brief', payload);
}

export async function sendBriefEmail(payload) {
  return apiPost('/api/planner/email', payload);
}

export async function uploadBriefPdf(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/uploads/brief', { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Upload failed');
  }
  return data;
}
