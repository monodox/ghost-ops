// src/app/api/github/create-repo/route.ts
import { NextResponse } from "next/server"
import { getOctokitOrNull } from "@/lib/octokit"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description, private: isPrivate = false, auto_init = true } = body
  
  const octokit = getOctokitOrNull(req)
  if (!octokit) return NextResponse.json({ error: "unauthenticated" }, { status: 401 })

  try {
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
      auto_init,
    })

    return NextResponse.json({
      success: true,
      repo: {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        html_url: data.html_url,
        private: data.private,
      }
    })
  } catch (error: any) {
    console.error("Failed to create repo:", error)
    return NextResponse.json({ 
      error: error.message || "Failed to create repository" 
    }, { status: 500 })
  }
}
