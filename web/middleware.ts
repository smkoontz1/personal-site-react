import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Temporarily make photo the home page
  // until I can design one
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/photo', request.url))
  }

  return NextResponse.next()
}