// Debug endpoint to check environment variables (remove in production)
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasClientId: !!process.env.GITHUB_OAUTH_CLIENT_ID,
    hasClientSecret: !!process.env.GITHUB_OAUTH_CLIENT_SECRET,
    hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
    hasCookieSecret: !!process.env.COOKIE_SECRET,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    // Never expose actual secrets!
    clientIdLength: process.env.GITHUB_OAUTH_CLIENT_ID?.length || 0,
  })
}
