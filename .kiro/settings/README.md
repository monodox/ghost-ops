# 🔌 MCP (Model Context Protocol) Configuration

## 🚀 Quick Start (5 Minutes)

### Step 1: Install uv
```bash
# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify
uv --version
```

### Step 2: Configure GitHub Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`, `write:packages`
4. Copy token
5. Add to `.env.local`:
   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
   ```

### Step 3: Restart Kiro IDE
Close and reopen Kiro IDE - MCP servers will auto-connect!

### Step 4: Test MCP
Ask Kiro:
```
"Use Fetch MCP to query https://api.github.com/zen"
```

---

## 📋 Configured MCP Servers

### ✅ Fetch MCP (Enabled)
**Purpose**: Make HTTP requests to external APIs

**Capabilities**:
- Query vulnerability databases (NVD, CVE)
- Check npm registry for package info
- Fetch security advisories
- Integrate with external scanning tools

**Setup**: No additional setup needed!

**Example Use**:
```
"Use Fetch MCP to query the npm registry for 'react'"
"Query the NVD database for CVE-2024-1234"
```

### 🔧 GitHub MCP (Disabled)
**Purpose**: Enhanced GitHub operations

**Capabilities**:
- Create and update files in repositories
- Search across all repositories
- Create issues and pull requests
- Manage branches and tags

**Setup**:
1. Install uv (see Quick Start)
2. Set `GITHUB_PERSONAL_ACCESS_TOKEN` in `.env.local`
3. Enable in `mcp.json`: `"disabled": false`
4. Restart Kiro IDE

**Use Cases**:
- Automated PR creation for security fixes
- Search for vulnerable code patterns
- Create issues for detected vulnerabilities
- Batch update configuration files

### 📁 Filesystem MCP (Disabled)
**Purpose**: Advanced file operations

**Capabilities**:
- Recursive directory listing
- Pattern-based file search
- File metadata access
- Batch file operations

**Setup**:
1. Install uv
2. Enable in `mcp.json`: `"disabled": false`
3. Restart Kiro IDE

**Use Cases**:
- Search for security patterns in codebase
- Analyze project structure
- Find configuration files
- Batch process scan results

### 🔀 Git MCP (Disabled)
**Purpose**: Advanced git operations

**Capabilities**:
- View git status and diffs
- Access commit history
- Create commits programmatically
- Branch management

**Setup**:
1. Install uv
2. Enable in `mcp.json`: `"disabled": false`
3. Restart Kiro IDE

**Use Cases**:
- Track security fix history
- Analyze code changes for vulnerabilities
- Automated commit of security patches
- Generate security audit reports

### 🔍 Brave Search MCP (Disabled)
**Purpose**: Web search for security research

**Setup**:
1. Get API key at https://brave.com/search/api/
2. Add to `.env.local`: `BRAVE_API_KEY=your_key`
3. Enable in `mcp.json`: `"disabled": false`
4. Restart Kiro IDE

**Use Cases**:
- Research security vulnerabilities
- Find remediation best practices
- Lookup CVE details

### 🗄️ PostgreSQL MCP (Disabled)
**Purpose**: Database operations

**Setup**:
1. Install PostgreSQL
2. Create database: `CREATE DATABASE ghostops;`
3. Update connection string in `mcp.json`
4. Enable in `mcp.json`: `"disabled": false`
5. Restart Kiro IDE

**Use Cases**:
- Store scan results persistently
- Track vulnerability history
- Analytics and reporting

### 🎭 Puppeteer MCP (Disabled)
**Purpose**: Browser automation

**Setup**:
1. Enable in `mcp.json`: `"disabled": false`
2. Restart Kiro IDE
3. Note: Resource intensive!

**Use Cases**:
- E2E testing of security features
- Screenshot generation for reports
- Test authentication flows

---

## 🎯 Recommended Setup

### Essential (Enable These)
✅ **Fetch MCP** - Already enabled!  
⚠️ **GitHub MCP** - For PR creation (requires token)  
⚠️ **Filesystem MCP** - For code analysis  
⚠️ **Git MCP** - For version control operations

### Optional (Enable When Needed)
⚠️ **Brave Search** - For security research (requires API key)  
⚠️ **PostgreSQL** - For persistent storage (requires database)  
⚠️ **Puppeteer** - For E2E testing (resource intensive)

---

## 🔧 Managing MCP Servers

### View Active Servers
1. Open Kiro IDE
2. Command Palette → "MCP: List Servers"

### Enable/Disable Server
Edit `mcp.json`:
```json
{
  "mcpServers": {
    "server-name": {
      "disabled": false  // true to disable
    }
  }
}
```

### Reconnect Server
Command Palette → "MCP: Reconnect Server"

### View Server Logs
Command Palette → "MCP: Show Server Logs"

---

## 🎃 GhostOps MCP Workflows

### Workflow 1: Automated Security Fix PR
```
1. Scan detects vulnerability
2. Kiro uses Fetch MCP to query CVE database
3. Kiro uses GitHub MCP to create fix PR
4. PR is ready for review!
```

### Workflow 2: Vulnerability Research
```
1. Unknown vulnerability detected
2. Kiro uses Brave Search MCP to research
3. Kiro uses Fetch MCP to query NVD
4. Kiro uses GitHub MCP to create issue
```

### Workflow 3: Batch Security Updates
```
1. Multiple repos need security patch
2. Kiro uses GitHub MCP to search repos
3. Kiro uses Filesystem MCP to analyze code
4. Kiro uses GitHub MCP to push fixes
```

---

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Check if uv is installed
uv --version

# Try manual server start
uvx mcp-server-fetch

# Check logs in Kiro IDE
Command Palette → "MCP: Show Server Logs"
```

### Authentication Errors
```bash
# Verify environment variables
echo $GITHUB_PERSONAL_ACCESS_TOKEN

# Check .env.local file
cat .env.local

# Restart Kiro IDE after adding variables
```

### Server Disconnects
- Reconnect: Command Palette → "MCP: Reconnect Server"
- Check network connection
- Check API rate limits
- Review server logs for errors

---

## ⚠️ Current Status

**Most MCP servers are disabled by default** to avoid connection errors during demo.

**Why?**
- Requires `uv` installation
- Needs environment variables (GitHub token, etc.)
- Requires security approval in Kiro
- Project works perfectly without MCP

**This is intentional!** MCP is configured and documented, ready to enable when needed.

---

## 💡 Key Takeaway

MCP extends Kiro's capabilities for advanced automation. The configuration demonstrates understanding of MCP architecture even though servers are disabled by default. This is a production-ready approach where optional enhancements are enabled when needed.

---

**Made with 👻 for the Kiroween Hackathon**

*MCP: Configured, documented, ready to enable!*
