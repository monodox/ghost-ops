// src/lib/octokit.ts
import { parse } from "cookie"
import { Octokit } from "@octokit/rest"

export function getTokenFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const cookies = parse(cookie)
  return cookies[process.env.GHOSTOPS_COOKIE_NAME || "ghostops_token"] || null
}

export function getOctokitOrNull(req: Request) {
  const token = getTokenFromRequest(req)
  if (!token) return null
  return new Octokit({ auth: token })
}
