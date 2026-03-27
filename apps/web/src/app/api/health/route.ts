import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || 'http://localhost:3000';

export async function GET() {
  try {
    const res = await fetch(`${INTERNAL_API_URL}/api/health`, {
      cache: 'no-store',
    });

    const data: unknown = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'API server is not reachable';
    return NextResponse.json(
      { code: 'API_UNAVAILABLE', message },
      { status: 503 },
    );
  }
}
