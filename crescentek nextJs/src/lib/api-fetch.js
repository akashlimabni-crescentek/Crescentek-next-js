/**
 * Browser-side fetch wrapper — returns axios-like `{ data }` for existing UI code.
 */
export async function apiPost(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'Request failed');
    err.response = { data, status: res.status };
    err.data = data;
    throw err;
  }

  return { data, status: res.status, ok: true };
}
