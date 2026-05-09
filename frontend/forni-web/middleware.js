import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Handle admin redirect
  if (pathname === '/admin') {
    const adminUrl = process.env.NEXT_BASE || 'https://forniengineeringweb.onrender.com';
    return NextResponse.redirect(`${adminUrl}/admin/`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
