import { NextResponse } from 'next/server';

export async function parseJsonBody(request) {
  try {
    return await request.json();
  } catch {
    throw Object.assign(new Error('Invalid JSON body'), { status: 400 });
  }
}

export function apiError(error) {
  const status = error?.status || 500;
  const message = error?.message || 'Internal server error';
  return NextResponse.json({ error: message }, { status });
}

export function apiJson(body, status = 200) {
  return NextResponse.json(body, { status });
}

export function getForwardedFor(request) {
  return request.headers.get('x-forwarded-for');
}
