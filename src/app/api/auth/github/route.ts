// src/app/api/auth/github/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { signStateCookie } from "@/lib/cookies"

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize"

export async function GET() {
  try {
    const state = crypto.randomBytes(16).toString("hex")
    const signed = signStateCookie(state)
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`
    
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID || "",
      redirect_uri: redirectUri,
      scope: "repo read:user user:email",
      state,
      allow_signup: "true",
    })

    const authUrl = `${GITHUB_AUTH_URL}?${params.toString()}`
    
    return NextResponse.redirect(authUrl, {
      headers: { "Set-Cookie": signed },
    })
  } catch {
    return NextResponse.json({ error: 'OAuth initiation failed' }, { status: 500 })
  }
}
