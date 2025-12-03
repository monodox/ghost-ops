# 👻 GhostOps

<div align="center">

![GhostOps Banner](https://img.shields.io/badge/GhostOps-Security%20Scanner-purple?style=for-the-badge&logo=ghost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Kiroween Hackathon](https://img.shields.io/badge/Kiroween-Hackathon-orange?style=for-the-badge)](https://kiro.ai)

**Automated Security & Compliance Scanner for GitHub Repositories**

*GhostOps haunts your codebase for misconfigurations, detects policy violations, and generates AI-powered remediation suggestions using Kiro's hooks, specs, and steering capabilities.*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 🎃 About

GhostOps is a spooky security scanner built for the **Kiroween Hackathon (Frankenstein Category)**. It combines automated security scanning with AI-powered remediation, featuring a haunted terminal-style interface that makes security fun and accessible.

### Why GhostOps?

- 🔍 **Automated Scanning** - Continuous security monitoring without manual intervention
- 🤖 **AI-Powered Fixes** - Kiro-driven remediation suggestions and PR generation
- 👻 **Spooky UX** - Engaging, themed interface that makes security less intimidating
- 📊 **Compliance Ready** - Mock SOC2/CIS-like checks for enterprise readiness
- 🚀 **Developer Friendly** - Built by developers, for developers

## ✨ Features

### 🔐 Security Scanning
- **Secrets Detection** - Identifies hardcoded API keys, tokens, and credentials
- **Dependency Analysis** - Scans for vulnerable packages and outdated dependencies
- **Code Security** - Detects SQL injection, XSS, and other vulnerabilities
- **Configuration Audit** - Validates security headers, HTTPS enforcement, and more
- **Compliance Checks** - SOC2, CIS, OWASP Top 10 compliance validation

### 🤖 AI-Powered Remediation
- **Automated PR Generation** - Creates pull requests with security fixes
- **Kiro AI Explanations** - Detailed vulnerability analysis and impact assessment
- **Smart Suggestions** - Context-aware remediation recommendations
- **One-Click Fixes** - Apply automated fixes with a single click
- **Remediation Tracking** - Monitor fix status and PR progress

### 🎨 Spooky Interface
- **Haunted Dashboard** - Real-time security score with ghost animations
- **Terminal Emulation** - Interactive xterm.js-powered command interface
- **Activity Log** - Chronological event tracking with spooky indicators
- **Dark Theme** - Eye-friendly purple/dark aesthetic
- **Responsive Design** - Works seamlessly on all devices

### 📊 Management Features
- **Repository Management** - Connect and manage multiple GitHub repos
- **Scan Results** - Filterable findings with severity indicators
- **Finding Details** - Deep dive into vulnerabilities with code snippets
- **Settings Panel** - Configure scanning, notifications, and integrations

## 🎬 Demo

### Dashboard
The main dashboard shows your "Haunted Health Score" with real-time security metrics:
- Overall security posture (0-100 score)
- Critical, high, medium, and low severity issues
- Recent scan activity
- Quick action buttons

### Terminal
Interactive terminal with ghost-themed commands:
```bash
$ ghost scan              # Run security scan
$ ghost audit             # Perform compliance audit
$ ghost fix <id>          # Apply automated fix
$ ghost status            # Show system status
```

### Finding Detail
Comprehensive vulnerability analysis including:
- Vulnerable code snippet with line numbers
- AI-powered explanation of the security risk
- Step-by-step remediation guide
- Suggested code fix with copy button
- One-click PR generation

## 🚀 Installation

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ghostops.git
   cd ghostops
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📖 Usage

### Basic Workflow

1. **Connect Repository** - Add your GitHub repository in the Repositories page
2. **Run Scan** - Click "Start Scan" on the dashboard
3. **Review Findings** - Check scan results and filter by severity
4. **View Details** - Click on any finding for detailed analysis
5. **Apply Fixes** - Generate PR or apply fixes manually
6. **Monitor Progress** - Track remediation status in the Remediation Center

### Terminal Commands

GhostOps includes an interactive terminal with these commands:

| Command | Description |
|---------|-------------|
| `ghost scan` | Run security scan on current repository |
| `ghost audit` | Perform compliance audit (SOC2, CIS, OWASP) |
| `ghost fix <id>` | Apply automated fix for specific finding |
| `ghost status` | Show system status and statistics |
| `ghost help` | Display available commands |
| `clear` | Clear terminal screen |

### Configuration

Configure GhostOps in the Settings page:

- **GitHub Connection** - Connect your GitHub account
- **Scan Frequency** - Set automated scan schedule (daily, weekly, on push)
- **Spooky Mode** - Toggle ghost animations and effects
- **Notifications** - Configure email, Slack, Discord alerts
- **API Tokens** - Manage access tokens

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[xterm.js](https://xtermjs.org/)** - Terminal emulation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
ghostops/
├── src/
│   ├── app/
│   │   ├── console/
│   │   │   ├── activity/          # Activity log page
│   │   │   ├── dashboard/         # Main dashboard
│   │   │   ├── finding/[id]/      # Finding detail (dynamic)
│   │   │   ├── remediations/      # Remediation center
│   │   │   ├── repositories/      # Repository management
│   │   │   ├── scan-results/      # Scan results
│   │   │   ├── settings/          # Settings
│   │   │   ├── terminal/          # Terminal interface
│   │   │   └── layout.tsx         # Console layout
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Root page
│   ├── components/
│   │   └── ui/                    # Reusable UI components
│   └── lib/
│       └── utils.ts               # Utility functions
├── public/                        # Static assets
├── .gitignore                     # Git ignore rules
├── CHANGELOG.md                   # Version history
├── CODE_OF_CONDUCT.md            # Community guidelines
├── CONTRIBUTING.md               # Contribution guide
├── LICENSE                        # MIT license
├── package.json                   # Dependencies
├── README.md                      # This file
├── SECURITY.md                    # Security policy
└── tsconfig.json                  # TypeScript config
```

## 🎃 Kiroween Hackathon

GhostOps was built for the **Kiroween Hackathon** in the **Frankenstein Category**, demonstrating:

- **Kiro Integration** - AI-powered security analysis and remediation
- **Hooks & Automation** - Automated scanning on code changes
- **Specs & Steering** - Structured security policy enforcement
- **Creative Theme** - Spooky, engaging security interface

### Judging Criteria Alignment

- ✅ **Innovation** - Unique approach to security with AI and gamification
- ✅ **Implementation** - Full-featured application with 8+ pages
- ✅ **Kiro Integration** - Deep integration with Kiro's AI capabilities
- ✅ **Theme** - Spooky, Halloween-themed security scanner
- ✅ **Creativity** - Terminal interface, ghost animations, haunted UX

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

Found a security vulnerability? Please see our [Security Policy](SECURITY.md) for reporting guidelines.

## 📞 Contact & Support

- **Issues** - [GitHub Issues](https://github.com/yourusername/ghostops/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/ghostops/discussions)
- **Email** - security@ghostops.dev

## 🙏 Acknowledgments

- Built with [Kiro AI](https://kiro.ai)
- Inspired by the Kiroween Hackathon
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<div align="center">

**Made with 👻 for the Kiroween Hackathon**

[⬆ Back to Top](#-ghostops)

</div>
