/**
 * @deprecated Mail is sent via Base44 functions (Outlook connector).
 * Use invokeBase44Function('sendBriefEmail' | 'logToHubspot') — requires BASE44_API_KEY only.
 */
export async function sendGraphMail() {
  throw new Error(
    'Azure mail is disabled. Use Base44 sendBriefEmail / logToHubspot with BASE44_API_KEY.'
  );
}
