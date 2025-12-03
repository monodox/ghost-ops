# 👻 GhostOps Kiro Integration

This directory contains all Kiro-specific files for the GhostOps project, enabling AI-powered development, automation, and security remediation.

## 📁 Directory Structure

```
.kiro/
├── spec.yaml                    # Project specification and data models
├── hooks/                       # Event-driven automations
│   ├── on_push_scan.json       # Auto-scan on git push
│   ├── on_remediation.json     # Generate security fixes
│   └── generate_fix_pr.json    # Create GitHub PRs
├── steering/                    # AI behavior control
│   ├── spooky_tone.md          # Halloween-themed messaging
│   ├── finding_explainer.md    # Security finding explanations
│   └── remediation_writer.md   # Fix generation guidelines
├── prompts/                     # Development templates
│   ├── vibe_init.md            # Project vibe and theme
│   ├── scaffold_component.md   # Component generation
│   └── scaffold_api_route.md   # API route generation
└── README.md                    # This file
```

## 🎯 Purpose

### spec.yaml
Defines the entire application structure including:
- Data models (Repository, ScanResult, Finding, Remediation)
- API endpoints
- Terminal commands
- Security rules
- Compliance frameworks

### Hooks
Automated workflows triggered by events:
- **on_push_scan.json**: Scans code when pushed to GitHub
- **on_remediation.json**: Generates AI-powered security fixes
- **generate_fix_pr.json**: Creates pull requests with fixes

### Steering
Controls AI behavior and output:
- **spooky_tone.md**: Maintains Halloween theme across all communications
- **finding_explainer.md**: Guides security vulnerability explanations
- **remediation_writer.md**: Ensures safe, effective security fixes

### Prompts
Development templates for consistency:
- **vibe_init.md**: Project theme and visual guidelines
- **scaffold_component.md**: React component patterns
- **scaffold_api_route.md**: API route templates

## 🔗 Integration with GhostOps Pages

| Page | Kiro Features Used |
|------|-------------------|
| Dashboard | Vibe coding, spooky tone |
| Repositories | Hooks (on_push_scan) |
| Scan Results | Spec models, finding explainer |
| Finding Detail | Finding explainer, remediation writer |
| Remediation Center | Remediation hooks, PR generation |
| Terminal | Spec commands, vibe coding |
| Activity Log | All hooks post events |
| Settings | Steering profiles |

## 🚀 Usage

### For Developers
These files guide Kiro in:
- Generating consistent components
- Creating API routes
- Writing security explanations
- Generating automated fixes

### For Kiro
These files provide:
- Project structure understanding
- Behavioral guidelines
- Output formatting rules
- Automation triggers

## 🎃 Kiroween Hackathon Compliance

This structure fulfills all Kiroween requirements:
- ✅ .kiro directory at project root
- ✅ Spec-driven development (spec.yaml)
- ✅ Hooks for automation
- ✅ Steering documents for AI control
- ✅ Vibe coding demonstrations
- ✅ Integration across all features

## 📚 Learn More

- [Kiro Documentation](https://kiro.ai/docs)
- [GhostOps README](../README.md)
- [Kiroween Hackathon](https://kiro.ai/kiroween)

---

**Made with 👻 for the Kiroween Hackathon**
