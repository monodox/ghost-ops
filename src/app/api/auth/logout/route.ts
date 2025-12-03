// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server"
import { clearAuthCookies } from "@/lib/cookies"

export async function GET() {
  const cookies = clearAuthCookies()
  const response = NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  
  // Set each cookie header individually
  cookies.forEach(cookie => {
    response.headers.append("Set-Cookie", cookie)
  })
  
  return response
}
