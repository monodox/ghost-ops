// src/app/api/scan/trigger/route.ts
import { NextResponse } from "next/server"
import { getOctokitOrNull } from "@/lib/octokit"

export async function POST(req: Request) {
  const body = await req.json()
  const { owner, repo } = body
  
  if (!owner || !repo) {
    return NextResponse.json({ error: "owner and repo are required" }, { status: 400 })
  }
  
  const octokit = getOctokitOrNull(req)
  if (!octokit) return NextResponse.json({ error: "unauthenticated" }, { status: 401 })

  try {
    // Get repository details
    const { data: repoData } = await octokit.repos.get({ owner, repo })
    
    // Simulate scanning process with realistic timing
    const scanId = `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    console.log(`👻 Starting spectral scan for ${owner}/${repo}`)
    console.log(`Scan ID: ${scanId}`)
    
    // Simulate realistic scan results based on repository characteristics
    const filesScanned = Math.floor(Math.random() * 150) + 50
    const critical = Math.floor(Math.random() * 4)
    const high = Math.floor(Math.random() * 7) + 1
    const medium = Math.floor(Math.random() * 12) + 2
    const low = Math.floor(Math.random() * 15) + 3
    
    const totalFindings = critical + high + medium + low
    const healthScore = Math.max(0, 100 - (critical * 20 + high * 10 + medium * 5 + low * 2))
    
    // Generate some sample findings
    const sampleFindings = []
    
    if (critical > 0) {
      sampleFindings.push({
        id: `finding_${Date.now()}_1`,
        severity: "critical",
        title: "Hardcoded API Key Detected",
        description: "A spectral vulnerability has been detected: API credentials are hardcoded in source code",
        file: "src/config/api.ts",
        line: 42,
        category: "secrets"
      })
    }
    
    if (high > 0) {
      sampleFindings.push({
        id: `finding_${Date.now()}_2`,
        severity: "high",
        title: "SQL Injection Vulnerability",
        description: "This phantom could allow attackers to inject malicious SQL queries",
        file: "src/db/queries.ts",
        line: 128,
        category: "injection"
      })
    }
    
    if (medium > 0) {
      sampleFindings.push({
        id: `finding_${Date.now()}_3`,
        severity: "medium",
        title: "Missing CSRF Protection",
        description: "A ghostly misconfiguration: CSRF tokens are not validated",
        file: "src/middleware/auth.ts",
        line: 67,
        category: "authentication"
      })
    }
    
    const mockResults = {
      scanId,
      repository: repoData.full_name,
      repositoryUrl: repoData.html_url,
      timestamp: new Date().toISOString(),
      status: "completed",
      findings: {
        critical,
        high,
        medium,
        low,
        total: totalFindings
      },
      healthScore,
      duration: `${(Math.random() * 3 + 1).toFixed(1)}s`,
      filesScanned,
      sampleFindings: sampleFindings.slice(0, 3)
    }

    return NextResponse.json({
      success: true,
      scan: mockResults
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to trigger scan'
    console.error("Failed to trigger scan:", error)
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 })
  }
}
