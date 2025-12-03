# Design Document

## Overview

The GitHub Repository Scanner is a client-side React application built with Next.js 14 that integrates with GitHub's OAuth and REST API. The system follows a three-tier architecture: presentation layer (React components with Framer Motion animations), API layer (Next.js API routes), and integration layer (GitHub API via Octokit). The design emphasizes real-time feedback, smooth animations, and a spooky-themed user experience.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Repositories │  │ Scan Results │  │   Settings   │      │
│  │     Page     │  │    Modal     │  │     Page     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                      API Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   /api/auth  │  │ /api/github  │  │  /api/scan   │      │
│  │   /github    │  │    /repos    │  │   /trigger   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼──────────────┐
│         │        Integration Layer            │              │
│  ┌──────▼──────┐  ┌──────────────┐  ┌────────▼────┐        │
│  │   Octokit   │  │Cookie Manager│  │Scan Engine  │        │
│  │   Client    │  │              │  │  (Mock)     │        │
│  └─────────────┘  └──────────────┘  └─────────────┘        │
│         │                                    │               │
└─────────┼────────────────────────────────────┼───────────────┘
          │                                    │
          ▼                                    ▼
   ┌─────────────┐                    ┌──────────────┐
   │  GitHub API │                    │ Scan Results │
   └─────────────┘                    └──────────────┘
```

### Component Architecture

```
RepositoriesPage (Main Container)
├── Header (Navigation & Actions)
├── StatCards (Metrics Display)
├── RepoCard[] (Repository List)
│   ├── StatusBadge
│   ├── ScanResultsSummary
│   └── ActionButtons
├── ScanResultModal (Animated Results)
│   ├── HealthScoreDisplay
│   ├── FindingsBreakdown
│   └── ScanStats
└── CreateRepoModal (Repository Creation)
    └── RepoForm
```

## Components and Interfaces

### 1. RepositoriesPage Component

**Purpose**: Main container component managing repository listing, scanning, and result display.

**State Management**:
```typescript
interface RepositoriesPageState {
  repos: Repository[]
  loading: boolean
  error: string | null
  scanningRepos: Set<number>
  scanResults: Map<number, ScanResult>
  showScanResultModal: boolean
  currentScanResult: ScanResult | null
  showCreateModal: boolean
  creating: boolean
  newRepo: NewRepoForm
}
```

**Key Methods**:
- `fetchRepos()`: Retrieves repository list from GitHub API
- `handleScanRepo(repo)`: Initiates security scan for a repository
- `handleCreateRepo(form)`: Creates new GitHub repository

### 2. RepoCard Component

**Purpose**: Displays individual repository information with scan status and actions.

**Props**:
```typescript
interface RepoCardProps {
  repo: Repository
  onScan: () => void
  isScanning: boolean
  scanResult?: ScanResult
}
```

**Features**:
- Dynamic status badge (Healthy, Warning, Critical, Scanning, Unknown)
- Horizontal scan results summary
- Animated hover effects
- Last updated timestamp

### 3. ScanResultModal Component

**Purpose**: Animated modal displaying detailed scan results.

**Animation Sequence**:
1. Modal entrance (scale + fade, 0s)
2. Health score animation (spring, 0.2s delay)
3. Findings stagger (0.5s-0.9s delays)
4. Stats fade-in (1.0s delay)
5. Button pulse (1.1s delay)

**Layout**:
- Pulsing gradient header
- Large health score display
- Color-coded severity breakdown
- Scan statistics footer

### 4. API Routes

#### `/api/github/repos`
- **Method**: GET
- **Auth**: Required (GitHub OAuth token)
- **Response**: Array of repositories
- **Error Handling**: 401 for unauthenticated, 500 for API errors

#### `/api/scan/trigger`
- **Method**: POST
- **Body**: `{ owner: string, repo: string }`
- **Auth**: Required
- **Response**: Scan results with findings and health score
- **Processing**: Simulates scan with realistic timing (1-4 seconds)

#### `/api/github/create-repo`
- **Method**: POST
- **Body**: `{ name: string, description?: string, private: boolean }`
- **Auth**: Required
- **Response**: Created repository data

## Data Models

### Repository
```typescript
interface Repository {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  updated_at: string
  description?: string
  owner: {
    login: string
    avatar_url: string
  }
}
```

### ScanResult
```typescript
interface ScanResult {
  scanId: string
  repository: string
  repositoryUrl: string
  timestamp: string
  status: 'completed' | 'failed' | 'in_progress'
  findings: {
    critical: number
    high: number
    medium: number
    low: number
    total: number
  }
  healthScore: number // 0-100
  duration: string
  filesScanned: number
  sampleFindings: Finding[]
}
```

### Finding
```typescript
interface Finding {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  file: string
  line: number
  category: string
}
```

### NewRepoForm
```typescript
interface NewRepoForm {
  name: string
  description: string
  private: boolean
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Authentication Token Persistence
*For any* authenticated user session, the GitHub access token should remain valid and accessible across page refreshes until explicit logout or token expiration.
**Validates: Requirements 1.2, 1.3**

### Property 2: Repository List Consistency
*For any* GitHub account, fetching repositories multiple times without changes should return the same list of repositories in the same order.
**Validates: Requirements 2.1**

### Property 3: Scan Idempotency
*For any* repository, running multiple scans on the same code state should produce consistent health scores within a 5-point margin (due to randomization in mock).
**Validates: Requirements 4.1, 4.4**

### Property 4: Health Score Calculation
*For any* scan result, the health score should equal `max(0, 100 - (critical * 20 + high * 10 + medium * 5 + low * 2))`.
**Validates: Requirements 5.1**

### Property 5: Severity Categorization Completeness
*For any* scan result, the sum of all severity counts (critical + high + medium + low) should equal the total findings count.
**Validates: Requirements 5.2**

### Property 6: Scan State Transitions
*For any* repository, the scanning state should transition from "Not Scanned" → "Scanning" → ("Healthy" | "Warning" | "Critical") and never revert to "Not Scanned" without explicit user action.
**Validates: Requirements 4.2, 5.5**

### Property 7: Modal Animation Completion
*For any* scan result modal, all animations should complete within 1.5 seconds from modal open.
**Validates: Requirements 6.5**

### Property 8: Error Message Display
*For any* API error, the system should display a user-friendly error message containing spooky-themed language.
**Validates: Requirements 7.1, 7.4**

### Property 9: Repository Creation Validation
*For any* repository name containing invalid characters (not matching `[a-zA-Z0-9_-]+`), the form submission should be rejected before API call.
**Validates: Requirements 3.5**

### Property 10: Scan Results Persistence
*For any* completed scan, the results should remain accessible in the UI state until page refresh or new scan.
**Validates: Requirements 8.1, 8.3**

### Property 11: Responsive Layout Adaptation
*For any* screen width, the repository grid should display 1 column on mobile (<768px), 2 columns on tablet (768-1024px), and 1 column on desktop (>1024px) with full-width cards.
**Validates: Requirements 9.1, 9.2, 9.3**

### Property 12: Spooky Terminology Consistency
*For any* user-facing message, the text should contain at least one spooky-themed term from the approved vocabulary (ghost, phantom, spectral, haunted, etc.).
**Validates: Requirements 10.1, 10.3**

## Error Handling

### Error Categories

1. **Authentication Errors**
   - Missing or invalid OAuth token → Redirect to login
   - Token expiration → Prompt re-authentication
   - OAuth flow interruption → Display error with retry

2. **API Errors**
   - GitHub API rate limiting → Display wait time
   - Network failures → Show offline indicator
   - Invalid repository access → Permission error message

3. **Validation Errors**
   - Invalid repository name → Inline form validation
   - Empty required fields → Highlight missing fields
   - Duplicate repository name → GitHub API error passthrough

4. **Scan Errors**
   - Repository not found → Display error with repository link
   - Scan timeout → Retry option with exponential backoff
   - Insufficient permissions → Permission upgrade prompt

### Error Recovery Strategies

- **Automatic Retry**: Network errors with exponential backoff (1s, 2s, 4s)
- **User-Initiated Retry**: Display retry button for failed operations
- **Graceful Degradation**: Show cached data when API unavailable
- **Error Logging**: Console logging for debugging (development only)

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Test Coverage**:
1. Component rendering with various props
2. State management and updates
3. Event handlers and callbacks
4. Form validation logic
5. Error boundary behavior

**Example Tests**:
```typescript
describe('RepoCard', () => {
  it('displays health score when scan result exists', () => {
    const scanResult = { healthScore: 85, findings: {...} }
    render(<RepoCard repo={mockRepo} scanResult={scanResult} />)
    expect(screen.getByText('85')).toBeInTheDocument()
  })
  
  it('shows scanning indicator when isScanning is true', () => {
    render(<RepoCard repo={mockRepo} isScanning={true} />)
    expect(screen.getByText('Scanning...')).toBeInTheDocument()
  })
})
```

### Property-Based Testing

**Framework**: fast-check (JavaScript property testing library)

**Configuration**: Minimum 100 iterations per property test

**Property Tests**:

1. **Property 4: Health Score Calculation**
```typescript
// Feature: github-scanner, Property 4: Health Score Calculation
it('calculates health score correctly for any finding counts', () => {
  fc.assert(
    fc.property(
      fc.integer(0, 10), // critical
      fc.integer(0, 10), // high
      fc.integer(0, 20), // medium
      fc.integer(0, 30), // low
      (critical, high, medium, low) => {
        const expected = Math.max(0, 100 - (critical * 20 + high * 10 + medium * 5 + low * 2))
        const result = calculateHealthScore({ critical, high, medium, low })
        expect(result).toBe(expected)
      }
    ),
    { numRuns: 100 }
  )
})
```

2. **Property 5: Severity Categorization Completeness**
```typescript
// Feature: github-scanner, Property 5: Severity Categorization Completeness
it('total findings equals sum of all severities', () => {
  fc.assert(
    fc.property(
      fc.record({
        critical: fc.integer(0, 10),
        high: fc.integer(0, 10),
        medium: fc.integer(0, 20),
        low: fc.integer(0, 30)
      }),
      (findings) => {
        const total = findings.critical + findings.high + findings.medium + findings.low
        const scanResult = createScanResult(findings)
        expect(scanResult.findings.total).toBe(total)
      }
    ),
    { numRuns: 100 }
  )
})
```

3. **Property 9: Repository Creation Validation**
```typescript
// Feature: github-scanner, Property 9: Repository Creation Validation
it('rejects invalid repository names', () => {
  fc.assert(
    fc.property(
      fc.string().filter(s => !/^[a-zA-Z0-9_-]+$/.test(s)),
      (invalidName) => {
        const result = validateRepoName(invalidName)
        expect(result.valid).toBe(false)
      }
    ),
    { numRuns: 100 }
  )
})
```

### Integration Testing

**Framework**: Playwright

**Test Scenarios**:
1. End-to-end OAuth flow
2. Repository listing and refresh
3. Scan trigger and result display
4. Repository creation workflow
5. Error handling and recovery

### Animation Testing

**Approach**: Visual regression testing with Playwright screenshots

**Validation**:
- Modal entrance animation timing
- Stagger effect on findings
- Hover state transitions
- Loading indicator animations

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Repository cards rendered on-demand
2. **Memoization**: React.memo for expensive components
3. **Debouncing**: Search and filter operations
4. **Code Splitting**: Route-based code splitting with Next.js
5. **Image Optimization**: Next.js Image component for avatars

### Performance Targets

- **Initial Page Load**: < 2 seconds
- **Repository List Fetch**: < 1 second
- **Scan Execution**: < 5 seconds
- **Animation Frame Rate**: 60 FPS
- **Time to Interactive**: < 3 seconds

## Security Considerations

### Authentication Security

- HTTP-only cookies for token storage
- Secure flag enabled in production
- SameSite=Lax for CSRF protection
- Token expiration after 7 days
- No token exposure in client-side JavaScript

### API Security

- CORS restrictions to application domain
- Rate limiting on API routes
- Input validation on all endpoints
- SQL injection prevention (N/A - no database)
- XSS prevention via React's built-in escaping

### Data Privacy

- No sensitive data stored in localStorage
- Scan results stored in memory only
- No logging of access tokens
- GitHub permissions limited to repository read/write

## Deployment Architecture

### Development Environment
- Local Next.js dev server (port 3000)
- Hot module replacement enabled
- Source maps for debugging
- Mock GitHub API responses (optional)

### Production Environment
- Vercel deployment with edge functions
- Environment variables via Vercel dashboard
- Automatic HTTPS with SSL certificates
- CDN for static assets
- Serverless API routes

### Environment Variables
```bash
GITHUB_OAUTH_CLIENT_ID=<production_client_id>
GITHUB_OAUTH_CLIENT_SECRET=<production_secret>
NEXT_PUBLIC_APP_URL=https://ghostops.yourdomain.com
COOKIE_SECRET=<32_char_random_string>
```

## Future Enhancements

1. **Real Scanning Engine**: Replace mock with actual security analysis
2. **Database Integration**: Persistent storage for scan history
3. **Webhook Support**: Automated scanning on push events
4. **Scheduled Scans**: Cron-based periodic scanning
5. **Team Collaboration**: Multi-user repository management
6. **Custom Rules**: User-defined security policies
7. **Export Reports**: PDF/CSV report generation
8. **Notification System**: Email/Slack alerts for findings
