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
    type: "scan_completed",
    repository: "demo-user/ghost-ops",
    timestamp: "2024-12-03T08:00:00Z",
    message: "👻 Scan completed: 24 ghosts detected",
    severity: "info"
  },
  {
    id: "activity_2",
    type: "finding_detected",
    repository: "demo-user/ghost-ops",
    timestamp: "2024-12-03T08:00:15Z",
    message: "🚨 Critical vulnerability found: Hardcoded API Key",
    severity: "critical"
  },
  {
    id: "activity_3",
    type: "scan_completed",
    repository: "demo-user/secure-api",
    timestamp: "2024-12-01T13:00:00Z",
    message: "✨ Scan completed: Only 7 minor issues found",
    severity: "success"
  },
  {
    id: "activity_4",
    type: "scan_completed",
    repository: "demo-user/vulnerable-app",
    timestamp: "2024-11-28T17:00:00Z",
    message: "⚠️ Scan completed: 50 vulnerabilities detected",
    severity: "warning"
  },
  {
    id: "activity_5",
    type: "repo_connected",
    repository: "demo-user/vulnerable-app",
    timestamp: "2024-11-28T16:45:00Z",
    message: "🔗 Repository connected for scanning",
    severity: "info"
  }
]

// Helper function to check if user is using demo credentials
export function isDemoUser(email: string, password: string): boolean {
  return email === "test@example.com" && password === "password"
}
