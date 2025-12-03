// src/app/api/github/user/route.ts
import { NextResponse } from "next/server"
import { getOctokitOrNull } from "@/lib/octokit"

export async function GET(req: Request) {
  const octokit = getOctokitOrNull(req)
  if (!octokit) return NextResponse.json({ error: "unauthenticated" }, { status: 401 })
  
  try {
    const { data } = await octokit.users.getAuthenticated()
    return NextResponse.json({
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      email: data.email,
    })
  } catch (error: any) {
    console.error("Failed to fetch user:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
