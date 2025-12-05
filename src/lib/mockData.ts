// Mock data for test credentials (test@example.com / password)
// This provides a demo experience without requiring GitHub OAuth

export const MOCK_USER = {
  email: "test@example.com",
  name: "Demo User",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  isDemo: true
}

export const MOCK_REPOSITORIES = [
  {
    id: 1,
    name: "ghost-ops",
    full_name: "demo-user/ghost-ops",
    description: "🎃 Automated Security & Compliance Scanner for GitHub Repositories",
    private: false,
    html_url: "https://github.com/demo-user/ghost-ops",
    language: "TypeScript",
    stargazers_count: 42,
    forks_count: 8,
    open_issues_count: 3,
    created_at: "2024-10-15T10:30:00Z",
    updated_at: "2024-12-03T08:00:00Z",
    pushed_at: "2024-12-03T08:00:00Z",
    size: 2048,
    default_branch: "main",
    owner: {
      login: "demo-user",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
    }
  },
  {
    id: 2,
    name: "vulnerable-app",
    full_name: "demo-user/vulnerable-app",
    description: "Demo app with intentional security vulnerabilities for testing",
    private: true,
    html_url: "https://github.com/demo-user/vulnerable-app",
    language: "JavaScript",
    stargazers_count: 5,
    forks_count: 2,
    open_issues_count: 12,
    created_at: "2024-09-01T14:20:00Z",
    updated_at: "2024-11-28T16:45:00Z",
    pushed_at: "2024-11-28T16:45:00Z",
    size: 512,
    default_branch: "main",
    owner: {
      login: "demo-user",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
    }
  },
  {
    id: 3,
    name: "secure-api",
    full_name: "demo-user/secure-api",
    description: "Well-secured REST API with best practices",
    private: false,
    html_url: "https://github.com/demo-user/secure-api",
    language: "Python",
    stargazers_count: 128,
    forks_count: 24,
    open_issues_count: 1,
    created_at: "2024-06-10T09:15:00Z",
    updated_at: "2024-12-01T12:30:00Z",
    pushed_at: "2024-12-01T12:30:00Z",
    size: 1024,
    default_branch: "main",
    owner: {
      login: "demo-user",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
    }
  }
]

export const MOCK_SCAN_RESULTS: Record<number, any> = {
  1: { // ghost-ops
    id: "scan_1",
    repository: "demo-user/ghost-ops",
    status: "completed",
    timestamp: "2024-12-03T08:00:00Z",
    duration: 45,
    findings: {
      critical: 1,
      high: 3,
      medium: 8,
      low: 12
    },
    healthScore: 72,
    details: [
      {
        id: "finding_1",
        severity: "critical",
        category: "Secrets Management",
        title: "Hardcoded API Key in Configuration",
        description: "API key found hardcoded in config/settings.ts",
        file: "config/settings.ts",
        line: 42,
        recommendation: "Move API keys to environment variables"
      },
      {
        id: "finding_2",
        severity: "high",
        category: "Authentication",
        title: "Missing CSRF Protection",
        description: "API endpoints lack CSRF token validation",
        file: "src/api/routes.ts",
        line: 156,
        recommendation: "Implement CSRF token validation for state-changing operations"
      },
      {
        id: "finding_3",
        severity: "high",
        category: "Input Validation",
        title: "SQL Injection Vulnerability",
        description: "User input directly concatenated into SQL query",
        file: "src/db/queries.ts",
        line: 89,
        recommendation: "Use parameterized queries or ORM"
      }
    ]
  },
  2: { // vulnerable-app
    id: "scan_2",
    repository: "demo-user/vulnerable-app",
    status: "completed",
    timestamp: "2024-11-28T17:00:00Z",
    duration: 32,
    findings: {
      critical: 5,
      high: 8,
      medium: 15,
      low: 22
    },
    healthScore: 28,
    details: [
      {
        id: "finding_4",
        severity: "critical",
        category: "Authentication",
        title: "Weak Password Hashing Algorithm",
        description: "Using MD5 for password hashing instead of bcrypt",
        file: "auth/password.js",
        line: 23,
        recommendation: "Switch to bcrypt or Argon2 for password hashing"
      },
      {
        id: "finding_5",
        severity: "critical",
        category: "Injection",
        title: "Command Injection Vulnerability",
        description: "User input passed directly to exec() without sanitization",
        file: "utils/system.js",
        line: 67,
        recommendation: "Avoid exec() with user input or use proper sanitization"
      }
    ]
  },
  3: { // secure-api
    id: "scan_3",
    repository: "demo-user/secure-api",
    status: "completed",
    timestamp: "2024-12-01T13:00:00Z",
    duration: 28,
    findings: {
      critical: 0,
      high: 0,
      medium: 2,
      low: 5
    },
    healthScore: 94,
    details: [
      {
        id: "finding_6",
        severity: "medium",
        category: "Dependencies",
        title: "Outdated Dependency with Known Vulnerability",
        description: "requests package version 2.25.0 has known CVE",
        file: "requirements.txt",
        line: 12,
        recommendation: "Update requests to version 2.31.0 or higher"
      }
    ]
  }
}

export const MOCK_DASHBOARD_STATS = {
  totalRepos: 3,
  scannedRepos: 3,
  totalFindings: 74,
  criticalFindings: 6,
  averageHealthScore: 65,
  recentScans: [
    {
      repository: "demo-user/ghost-ops",
      timestamp: "2024-12-03T08:00:00Z",
      healthScore: 72,
      findings: 24
    },
    {
      repository: "demo-user/secure-api",
      timestamp: "2024-12-01T13:00:00Z",
      healthScore: 94,
      findings: 7
    },
    {
      repository: "demo-user/vulnerable-app",
      timestamp: "2024-11-28T17:00:00Z",
      healthScore: 28,
      findings: 50
    }
  ],
  findingsByCategory: {
    "Secrets Management": 8,
    "Authentication": 12,
    "Input Validation": 15,
    "Dependencies": 18,
    "Configuration": 10,
    "Injection": 11
  }
}

export const MOCK_ACTIVITY_LOG = [
  {
    id: "activity_1",
    type: "scan",
    title: "👻 Security Scan Completed",
    description: "Spectral scan detected 24 haunting issues",
    details: "demo-user/ghost-ops • 1 critical, 3 high, 8 medium, 12 low",
    timestamp: "2 hours ago",
    severity: "info"
  },
  {
    id: "activity_2",
    type: "finding",
    title: "🚨 Critical Vulnerability Detected",
    description: "Hardcoded API Key found in configuration",
    details: "demo-user/ghost-ops • config/settings.ts:42",
    timestamp: "2 hours ago",
    severity: "critical"
  },
  {
    id: "activity_3",
    type: "remediation",
    title: "✅ Automated Fix Applied",
    description: "PR created to remove hardcoded credentials",
    details: "demo-user/ghost-ops • PR #42 opened",
    timestamp: "1 hour ago",
    severity: "success"
  },
  {
    id: "activity_4",
    type: "terminal",
    title: "⚡ Terminal Command Executed",
    description: "ghost scan command completed successfully",
    details: "Scanned 247 files in 45 seconds",
    timestamp: "3 hours ago",
    severity: "info"
  },
  {
    id: "activity_5",
    type: "scan",
    title: "✨ Clean Scan Result",
    description: "Only 7 minor issues found in secure-api",
    details: "demo-user/secure-api • Health Score: 94/100",
    timestamp: "2 days ago",
    severity: "success"
  },
  {
    id: "activity_6",
    type: "finding",
    title: "⚠️ High Severity Issue Found",
    description: "SQL Injection vulnerability in database queries",
    details: "demo-user/ghost-ops • src/db/queries.ts:89",
    timestamp: "2 days ago",
    severity: "high"
  },
  {
    id: "activity_7",
    type: "remediation",
    title: "🔧 Manual Fix Required",
    description: "Complex authentication issue needs review",
    details: "demo-user/vulnerable-app • Awaiting developer action",
    timestamp: "3 days ago",
    severity: "info"
  },
  {
    id: "activity_8",
    type: "scan",
    title: "👻 Haunted Codebase Detected",
    description: "50 spectral vulnerabilities found",
    details: "demo-user/vulnerable-app • 5 critical, 8 high, 15 medium, 22 low",
    timestamp: "5 days ago",
    severity: "critical"
  },
  {
    id: "activity_9",
    type: "hook",
    title: "🪝 Agent Hook Triggered",
    description: "Format on save hook executed",
    details: "Auto-formatted 3 TypeScript files",
    timestamp: "6 hours ago",
    severity: "info"
  },
  {
    id: "activity_10",
    type: "terminal",
    title: "📊 Status Check Completed",
    description: "ghost status command executed",
    details: "System health: 78/100 • 3 pending fixes",
    timestamp: "4 hours ago",
    severity: "info"
  }
]

export const MOCK_REMEDIATIONS = [
  {
    id: "rem_1",
    status: "pr_created",
    title: "Remove Hardcoded API Keys",
    finding: "Hardcoded API Key in Configuration",
    repository: "demo-user/ghost-ops",
    createdAt: "1 hour ago",
    type: "automated",
    script: "Move API keys to environment variables using dotenv. Update config/settings.ts to read from process.env.API_KEY",
    prUrl: "https://github.com/demo-user/ghost-ops/pull/42"
  },
  {
    id: "rem_2",
    status: "completed",
    title: "Update Vulnerable Dependencies",
    finding: "Outdated packages with known CVEs",
    repository: "demo-user/secure-api",
    createdAt: "2 days ago",
    type: "automated",
    script: "npm update requests@2.31.0 express@4.18.2 lodash@4.17.21",
    prUrl: "https://github.com/demo-user/secure-api/pull/15"
  },
  {
    id: "rem_3",
    status: "pending",
    title: "Implement CSRF Protection",
    finding: "Missing CSRF token validation",
    repository: "demo-user/ghost-ops",
    createdAt: "2 hours ago",
    type: "automated",
    script: "Add csurf middleware to Express app. Generate and validate CSRF tokens for all state-changing operations"
  },
  {
    id: "rem_4",
    status: "manual",
    title: "Fix Authentication Flow",
    finding: "Weak password hashing algorithm",
    repository: "demo-user/vulnerable-app",
    createdAt: "3 days ago",
    type: "manual",
    script: "Replace MD5 with bcrypt for password hashing. Requires database migration and user password reset"
  },
  {
    id: "rem_5",
    status: "pending",
    title: "Sanitize SQL Queries",
    finding: "SQL Injection vulnerability",
    repository: "demo-user/ghost-ops",
    createdAt: "2 hours ago",
    type: "automated",
    script: "Replace string concatenation with parameterized queries using prepared statements"
  },
  {
    id: "rem_6",
    status: "failed",
    title: "Add Security Headers",
    finding: "Missing security headers",
    repository: "demo-user/vulnerable-app",
    createdAt: "4 days ago",
    type: "automated",
    script: "Add helmet middleware to set security headers: CSP, HSTS, X-Frame-Options, etc."
  },
  {
    id: "rem_7",
    status: "pr_created",
    title: "Fix Command Injection",
    finding: "Unsanitized user input in exec()",
    repository: "demo-user/vulnerable-app",
    createdAt: "5 days ago",
    type: "automated",
    script: "Replace exec() with safer alternatives. Use child_process.spawn() with argument array instead of shell string",
    prUrl: "https://github.com/demo-user/vulnerable-app/pull/8"
  }
]

// Helper function to check if user is using demo credentials
export function isDemoUser(email: string, password: string): boolean {
  return email === "test@example.com" && password === "password"
}
