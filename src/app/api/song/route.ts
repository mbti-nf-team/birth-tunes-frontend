import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const ONE_HOUR = 3600;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/songs/${year}/${month}/${day}`, {
    method: 'GET',
    next: {
      // NOTE - 정적인 데이터라 한시간 캐시
      revalidate: ONE_HOUR,
    },
    headers: {
      ...requestHeaders,
      'nfteam-api-token': process.env.API_HEADER_TOKEN,
    },
  });

  if (response.ok) {
    const searchResult = await response.json();

    return NextResponse.json(searchResult, {
      ...response,
      headers: {
        ...response.headers,
        'Cache-Control': 'public, s-maxage=1',
        'CDN-Cache-Control': 'public, s-maxage=60',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
    });
  }

  return NextResponse.json(null, response);
}
