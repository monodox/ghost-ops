# 🔌 API Route Scaffolding Prompt

## Purpose
Generate Next.js API routes for GhostOps following REST conventions and spec.yaml definitions.

## Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
```

## API Routes from spec.yaml

### 1. POST /api/scan
```typescript
// app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { repositoryId, branch } = await request.json()
    
    // Trigger scan
    const scanResult = await triggerScan(repositoryId, branch)
    
    return NextResponse.json({
      success: true,
      data: scanResult
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
```

### 2. GET /api/findings
```typescript
// app/api/findings/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const scanId = searchParams.get('scanId')
  const severity = searchParams.get('severity')
  
  const findings = await getFindings(scanId, severity)
  
  return NextResponse.json({ success: true, data: findings })
}
```

### 3. POST /api/remediate
```typescript
// app/api/remediate/route.ts
export async function POST(request: NextRequest) {
  const { findingId, type } = await request.json()
  
  const remediation = await generateRemediation(findingId, type)
  
  return NextResponse.json({ success: true, data: remediation })
}
```

## Error Handling

```typescript
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
  }
}

export function handleError(error: unknown) {
  if (error instanceof APIError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    )
  }
  
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}
```

## Validation

```typescript
import { z } from 'zod'

const scanSchema = z.object({
  repositoryId: z.string(),
  branch: z.string().optional()
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validated = scanSchema.parse(body)
  // Use validated data
}
```

## Response Format

```typescript
// Success
{
  "success": true,
  "data": { /* result */ }
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

---

**Goal**: Create consistent, type-safe API routes matching spec.yaml! 🔌
