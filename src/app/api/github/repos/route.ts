// src/app/api/github/repos/route.ts
import { NextResponse } from "next/server"
import { getOctokitOrNull } from "@/lib/octokit"

export async function GET(req: Request) {
  const octokit = getOctokitOrNull(req)
  if (!octokit) return NextResponse.json({ error: "unauthenticated" }, { status: 401 })
  
  try {
    const res = await octokit.repos.listForAuthenticatedUser({ per_page: 100 })
    const repos = res.data.map(r => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      private: r.private,
      html_url: r.html_url,
      updated_at: r.updated_at,
    }))
    return NextResponse.json({ repos })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch repos'
    console.error("Failed to fetch repos:", error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
