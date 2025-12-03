// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server"
import { clearAuthCookies } from "@/lib/cookies"

export async function GET() {
  const cookies = clearAuthCookies()
  return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
    headers: cookies.map(c => ["Set-Cookie", c]),
  })
}
