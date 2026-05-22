/**
 * @deprecated Email verification runs on Base44 `logToHubspot` (secret in Base44 function env).
 */
export async function verifyEmail() {
  throw new Error('Email verification runs on Base44 logToHubspot — use BASE44_API_KEY only.');
}
