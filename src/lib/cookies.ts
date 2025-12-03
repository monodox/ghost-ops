// src/lib/cookies.ts
import { serialize, parse } from "cookie"
import jwt from "jsonwebtoken"

const STATE_COOKIE = "ghostops_oauth_state"
const TOKEN_COOKIE = process.env.GHOSTOPS_COOKIE_NAME || "ghostops_token"
const SECRET = process.env.COOKIE_SECRET || "dev_secret_change_in_production"

export function signStateCookie(state: string) {
  const token = jwt.sign({ state }, SECRET, { expiresIn: "10m" })
  return serialize(STATE_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
  })
}

export function verifyStateFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const parsed = parse(cookie)
  const token = parsed[STATE_COOKIE]
  if (!token) return null
  try {
    const data = jwt.verify(token, SECRET) as any
    return data.state as string
  } catch {
    return null
  }
}

export function createTokenCookie(accessToken: string) {
  return serialize(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export function clearAuthCookies() {
  return [
    serialize(TOKEN_COOKIE, "", { maxAge: -1, path: "/" }),
    serialize(STATE_COOKIE, "", { maxAge: -1, path: "/" }),
  ]
}
