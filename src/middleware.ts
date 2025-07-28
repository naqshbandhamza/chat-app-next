// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define which routes to protect
export const config = {
    matcher: ['/profile/:path*'], // ✅ matches /profile and /profile/*
}

export function middleware(request: NextRequest) {

 console.log("in middle ware")
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
