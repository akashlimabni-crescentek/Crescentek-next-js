/**
 * Server environment — Base44 is the only required secret.
 * HubSpot, OpenAI, Outlook, reCAPTCHA, and email verification run on Base44.
 */

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`[env] Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name, fallback = '') {
  return process.env[name]?.trim() || fallback;
}

/** Crescentek Base44 app id (see crescentek/base44/.app.jsonc) */
const DEFAULT_BASE44_APP_ID = '69d756f93d31745e193a6ca0';

/** Base44 editor → Workspace → API → Authentication → headers.api_key */
export function getBase44ApiKey() {
  return required('BASE44_API_KEY');
}

export function getBase44AppId() {
  return optional('BASE44_APP_ID', DEFAULT_BASE44_APP_ID);
}

export function getBase44FunctionsVersion() {
  return optional('BASE44_FUNCTIONS_VERSION', '');
}

/** @deprecated Use BASE44_API_KEY */
export function getBase44ServiceToken() {
  return optional('BASE44_SERVICE_TOKEN', '') || getBase44ApiKey();
}
