# 👻 GhostOps Agent Hooks

Agent hooks automate your development workflow by triggering actions when specific events occur. This keeps your code spooky, secure, and consistent!

## 🪝 Available Hooks

### Active Hooks (Enabled)

#### 1. 👻 Format Code on Save
**File**: `format_on_save.json`  
**Trigger**: When any TypeScript/React file is saved  
**Action**: Runs ESLint with auto-fix  
**Purpose**: Maintains consistent code formatting across the project

#### 2. 🧪 Run Tests on Component Change
**File**: `test_on_component_change.json`  
**Trigger**: When component files are saved  
**Action**: Runs related test file  
**Purpose**: Immediate feedback on component changes

#### 3. 📝 Update README on New Feature
**File**: `update_readme_on_feature.json`  
**Trigger**: When new page.tsx files are created  
**Action**: Reminds to update README  
**Purpose**: Keeps documentation in sync with features

#### 4. 👻 Spooky Commit Message Check
**File**: `spooky_commit_check.json`  
**Trigger**: On git commit  
**Action**: Reminds to use spooky terminology  
**Purpose**: Maintains Halloween theme consistency

#### 5. 🔒 API Route Security Check
**File**: `api_route_security_check.json`  
**Trigger**: When API route files are saved  
**Action**: Security checklist reminder  
**Purpose**: Ensures API routes follow security best practices

#### 6. 🔧 Generate Fix PR (Existing)
**File**: `generate_fix_pr.json`  
**Trigger**: On remediation action  
**Action**: Creates GitHub PR with fix  
**Purpose**: Automates security fix deployment

#### 7. 🔍 On Push Scan (Existing)
**File**: `on_push_scan.json`  
**Trigger**: On git push  
**Action**: Triggers security scan  
**Purpose**: Continuous security monitoring

#### 8. 🛠️ On Remediation (Existing)
**File**: `on_remediation.json`  
**Trigger**: When remediation is applied  
**Action**: Tracks fix application  
**Purpose**: Monitors security improvements

### Disabled Hooks (Available)

#### 9. ⚡ Animation Performance Reminder
**File**: `animation_performance_reminder.json`  
**Status**: Disabled (can be noisy)  
**Trigger**: When files with animations are saved  
**Action**: Performance optimization tips  
**Purpose**: Ensures smooth 60fps animations

#### 10. 🔑 Environment Variable Check
**File**: `env_variable_check.json`  
**Status**: Disabled (can be noisy)  
**Trigger**: When files are saved  
**Action**: Reminds to update .env.example  
**Purpose**: Keeps environment documentation current

## 🎯 Hook Types

### Trigger Types
- `onFileSave` - Fires when files matching pattern are saved
- `onGitCommit` - Fires when commits are made
- `onGitPush` - Fires when code is pushed
- `onAgentMessage` - Fires when agent receives messages
- `onAgentComplete` - Fires when agent execution completes

### Action Types
- `sendMessage` - Sends a message to the agent
- `executeCommand` - Runs a shell command

## 🛠️ Managing Hooks

### Enable a Hook
Edit the hook JSON file and set:
```json
"enabled": true
```

### Disable a Hook
Edit the hook JSON file and set:
```json
"enabled": false
```

### View Active Hooks
Use the Kiro IDE:
1. Open Command Palette (Ctrl/Cmd + Shift + P)
2. Search "Kiro: View Agent Hooks"
3. See all hooks and their status

### Create Custom Hook
1. Create new `.json` file in `.kiro/hooks/`
2. Use this template:
```json
{
  "name": "Your Hook Name",
  "description": "What this hook does",
  "trigger": {
    "type": "onFileSave",
    "filePattern": "**/*.tsx"
  },
  "action": {
    "type": "sendMessage",
    "message": "Your message here"
  },
  "enabled": true
}
```

## 💡 Hook Best Practices

### Do's ✅
- Use specific file patterns to avoid noise
- Write clear, actionable messages
- Include checklists for complex tasks
- Maintain the spooky theme in messages
- Test hooks before enabling permanently

### Don'ts ❌
- Don't create hooks that fire too frequently
- Don't use hooks for long-running commands
- Don't duplicate functionality across hooks
- Don't forget to disable noisy hooks
- Don't skip testing new hooks

## 🎃 Spooky Hook Ideas

Here are more hook ideas you can implement:

### Development Workflow
- **Type Check on Save**: Run TypeScript compiler on save
- **Build Check**: Verify build succeeds before commit
- **Dependency Update**: Remind to update outdated packages

### Documentation
- **JSDoc Reminder**: Prompt for documentation on new functions
- **Changelog Update**: Remind to update CHANGELOG.md
- **API Docs**: Generate API documentation on route changes

### Testing
- **Coverage Check**: Warn if test coverage drops
- **E2E Test Reminder**: Suggest E2E tests for new features
- **Snapshot Update**: Remind to update snapshots

### Security
- **Dependency Audit**: Run npm audit on package.json changes
- **Secret Scanner**: Check for accidentally committed secrets
- **CORS Check**: Verify CORS settings on API changes

### Performance
- **Bundle Size Check**: Warn if bundle size increases significantly
- **Lighthouse Score**: Run Lighthouse on major UI changes
- **Image Optimization**: Remind to optimize images

## 🔄 Hook Workflow Examples

### Example 1: Feature Development
```
1. Create new page.tsx
   → update_readme_on_feature fires
   → Kiro reminds to update README

2. Save component file
   → format_on_save fires
   → Code is auto-formatted

3. Save component again
   → test_on_component_change fires
   → Tests run automatically

4. Commit changes
   → spooky_commit_check fires
   → Reminded to use spooky message
```

### Example 2: API Development
```
1. Create new API route
   → api_route_security_check fires
   → Security checklist appears

2. Add authentication
   → format_on_save fires
   → Code is formatted

3. Push to GitHub
   → on_push_scan fires
   → Security scan runs
```

## 📊 Hook Impact

### Time Saved
- **Auto-formatting**: ~5 min/day
- **Test automation**: ~10 min/day
- **Documentation reminders**: ~15 min/week
- **Security checks**: ~20 min/week

### Quality Improvements
- Consistent code style
- Better test coverage
- Up-to-date documentation
- Fewer security issues
- Maintained theme consistency

## 🎯 Next Steps

1. **Review Active Hooks**: Check which hooks are enabled
2. **Test Hooks**: Make changes and observe hook behavior
3. **Customize**: Adjust messages and patterns to your workflow
4. **Create New**: Add hooks for your specific needs
5. **Share**: Document useful hooks for your team

---

**Made with 👻 for the Kiroween Hackathon**

*Automating the spooky development experience!*
