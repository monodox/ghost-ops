// src/app/api/github/create-pr/route.ts
import { NextResponse } from "next/server"
import { getOctokitOrNull } from "@/lib/octokit"

export async function POST(req: Request) {
  const body = await req.json()
  const { owner, repo, base_branch = "main", filePath, content, commitMessage, prTitle, prBody } = body
  const octokit = getOctokitOrNull(req)
  if (!octokit) return NextResponse.json({ error: "unauthenticated" }, { status: 401 })

  try {
    // 1. create branch from base
    const branchName = `ghostops/remediation/${Date.now()}`
    // get base branch commit sha
    const baseRef = await octokit.git.getRef({ owner, repo, ref: `heads/${base_branch}` })
    const baseSha = baseRef.data.object.sha

    // create branch
    await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branchName}`, sha: baseSha })

    // create or update file
    const contentEncoded = Buffer.from(content).toString("base64")
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      content: contentEncoded,
      branch: branchName,
    })

    // create PR
    const pr = await octokit.pulls.create({
      owner,
      repo,
      title: prTitle,
      head: branchName,
      base: base_branch,
      body: prBody,
    })

    return NextResponse.json({ prUrl: pr.data.html_url, prNumber: pr.data.number })
  } catch (error: any) {
    console.error("Failed to create PR:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
