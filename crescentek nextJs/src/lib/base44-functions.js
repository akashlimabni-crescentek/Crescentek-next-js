import { getBase44ServerClient } from '@/integrations/base44-server-client';

/**
 * Invoke a deployed Base44 function with service-role auth.
 * @param {string} functionName
 * @param {Record<string, unknown>} data
 */
export async function invokeBase44Function(functionName, data = {}) {
  const res = await getBase44ServerClient().asServiceRole.functions.invoke(functionName, data);
  const body = res?.data ?? res;

  if (body?.error) {
    throw Object.assign(new Error(String(body.error)), { status: 400 });
  }

  return body;
}
