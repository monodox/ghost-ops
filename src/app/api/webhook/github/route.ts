// src/app/api/webhook/github/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"

function verifySignature(secret: string, body: string, signature: string) {
  const hmac = crypto.createHmac("sha256", secret)
  const digest = `sha256=${hmac.update(body).digest("hex")}`
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(req: Request) {
  const signature = req.headers.get("x-hub-signature-256")
  const event = req.headers.get("x-github-event")
  const body = await req.text()
  
  // Verify webhook signature
  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (secret && signature) {
    if (!verifySignature(secret, body, signature)) {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 })
    }
  }

  const payload = JSON.parse(body)

  // Handle push events
  if (event === "push") {
    const { repository, ref, commits } = payload
    console.log(`👻 Push event received for ${repository.full_name} on ${ref}`)
    console.log(`Commits: ${commits.length}`)
    
    // TODO: Trigger scan
    // You can call your internal scan API here
    // await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/scan/trigger`, {
    //   method: "POST",
    //   body: JSON.stringify({ repo: repository.full_name, ref }),
    // })
    
    return NextResponse.json({ 
      message: "webhook received", 
      repo: repository.full_name,
      commits: commits.length 
    })
  }

  return NextResponse.json({ message: "event ignored" })
}
