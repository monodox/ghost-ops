import { NextResponse } from 'next/server'

export function middleware() {
  // Only apply CSP headers in development
  // In production, Amplify handles headers via amplify.yml
  if (process.env.NODE_ENV === 'development') {
    const response = NextResponse.next()

    // Add security headers for local development
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // CSP for GitHub OAuth in development
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://github.com https://*.github.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob: https://*.githubusercontent.com https://avatars.githubusercontent.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.github.com https://github.com https://*.github.com",
      "frame-src 'self' https://github.com https://*.github.com",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ')
    
    response.headers.set('Content-Security-Policy', csp)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}