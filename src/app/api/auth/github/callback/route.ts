// src/app/api/auth/github/callback/route.ts
import { NextResponse } from "next/server"
import { verifyStateFromRequest, createTokenCookie } from "@/lib/cookies"

const TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    const error = url.searchParams.get("error")

    // Handle GitHub OAuth errors
    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=github_${error}`)
    }

    // verify state
    const stored = verifyStateFromRequest(request)
    if (!stored || stored !== state) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=invalid_state`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=missing_code`)
    }

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  })
    const data: { access_token?: string; error?: string } = await res.json()
    if (!data.access_token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=token_failed`)
    }
    const cookie = createTokenCookie(data.access_token)
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/console/dashboard`
    return NextResponse.redirect(redirectUrl, {
      headers: { "Set-Cookie": cookie },
    })
  } catch {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=callback_failed`)
  }
}
