import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Temporarily make photo the home page
  // until I can design one
  if (url.pathname === '/') {
    url.pathname = '/photo'

    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}