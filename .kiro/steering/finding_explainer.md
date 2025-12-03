# 🔍 Finding Explainer Steering

## Purpose
This steering document guides Kiro in generating clear, comprehensive, and actionable security finding explanations for the Finding Detail page.

## Structure Template

Every finding explanation should follow this structure:

### 1. Executive Summary (2-3 sentences)
- What is the vulnerability?
- Why is it dangerous?
- What's at risk?

### 2. Technical Details
- How the vulnerability works
- Attack vectors
- Potential exploits
- Code-level explanation

### 3. Impact Analysis
- Confidentiality impact
- Integrity impact
- Availability impact
- Business consequences
- Compliance violations

### 4. Real-World Context
- Industry examples
- Known breaches
- Statistics (if relevant)
- Why this matters

### 5. Remediation Steps
- Immediate actions
- Code changes needed
- Prevention strategies
- Best practices

## Tone Guidelines

### Be Clear
- Use simple language
- Avoid jargon when possible
- Define technical terms
- Use analogies for complex concepts

### Be Comprehensive
- Cover all aspects of the vulnerability
- Explain the "why" not just the "what"
- Provide context and background
- Link related concepts

### Be Actionable
- Give specific steps
- Provide code examples
- Suggest tools and resources
- Prioritize actions

### Be Empowering
- Focus on solutions
- Encourage learning
- Avoid blame
- Build confidence

## Severity-Specific Guidelines

### Critical Findings
```markdown
**Urgency**: Immediate action required
**Tone**: Serious but not alarmist
**Focus**: Quick remediation steps
**Length**: Detailed but scannable

Example opening:
"This is a critical security vulnerability that requires immediate attention. 
[Vulnerability name] allows attackers to [specific threat], potentially leading 
to [specific consequences]."
```

### High Findings
```markdown
**Urgency**: Address soon
**Tone**: Important and clear
**Focus**: Understanding and fixing
**Length**: Comprehensive

Example opening:
"This high-severity issue poses a significant security risk. [Vulnerability name] 
could enable [attack scenario], affecting [impacted systems]."
```

### Medium Findings
```markdown
**Urgency**: Plan to address
**Tone**: Informative
**Focus**: Best practices
**Length**: Balanced

Example opening:
"This medium-severity finding represents a security gap that should be addressed. 
While not immediately exploitable, [vulnerability name] could [potential risk]."
```

### Low Findings
```markdown
**Urgency**: Address when convenient
**Tone**: Educational
**Focus**: Code quality and prevention
**Length**: Concise

Example opening:
"This low-severity issue is a minor security concern. [Vulnerability name] 
represents a best practice violation that could [minor risk]."
```

## Content Sections

### 🎃 GhostOps AI Analysis

Start with spooky hook, then technical:

```markdown
🎃 **GhostOps AI Analysis**

[Spooky intro sentence using steering/spooky_tone.md]

This is a **[severity] security vulnerability**. [Technical explanation]

**Key Risks:**
1. **[Risk Category]**: [Specific risk]
2. **[Risk Category]**: [Specific risk]
3. **[Risk Category]**: [Specific risk]

**Why this happened**: [Root cause explanation]

**Industry Impact**: [Real-world context and examples]
```

### Attack Scenarios

Provide concrete examples:

```markdown
**Potential Attack Scenarios:**

1. **Scenario 1**: [Step-by-step attack]
   - Attacker does X
   - System responds with Y
   - Result: Z

2. **Scenario 2**: [Alternative attack]
   - Different approach
   - Same or different outcome
```

### Compliance Impact

Map to frameworks:

```markdown
**Compliance Violations:**

- ❌ **SOC2**: [Specific control violated]
- ❌ **PCI-DSS**: [Requirement not met]
- ❌ **HIPAA**: [Safeguard missing]
- ❌ **GDPR**: [Article violated]
```

### Code Analysis

Explain the vulnerable code:

```markdown
**Code Analysis:**

The vulnerable code at line [X] in [file]:
```[language]
[code snippet]
```

**Problem**: [What's wrong]
**Why it's vulnerable**: [Technical explanation]
**Attack vector**: [How it can be exploited]
```

## Remediation Format

### Immediate Actions
```markdown
**Immediate Actions:**

1. **[Action 1]** (Priority: High)
   - What: [Specific action]
   - Why: [Reason]
   - How: [Steps]

2. **[Action 2]** (Priority: Medium)
   - What: [Specific action]
   - Why: [Reason]
   - How: [Steps]
```

### Code Changes
```markdown
**Code Changes:**

Replace the vulnerable code with:

```[language]
[secure code example]
```

**Key improvements:**
- ✅ [Improvement 1]
- ✅ [Improvement 2]
- ✅ [Improvement 3]
```

### Prevention
```markdown
**Prevention Strategies:**

1. **[Strategy 1]**
   - Implement [tool/practice]
   - Configure [setting]
   - Monitor [metric]

2. **[Strategy 2]**
   - Use [library/framework]
   - Follow [standard]
   - Test [scenario]
```

## Examples by Category

### Secrets Management
```markdown
**Finding**: Hardcoded API Keys

**Explanation**: API keys are stored directly in source code, making them 
accessible to anyone with repository access. This violates the principle of 
least privilege and creates a permanent security risk in version control history.

**Impact**: Compromised credentials could lead to:
- Unauthorized API access
- Data breaches
- Service abuse
- Unexpected costs

**Fix**: Move credentials to environment variables and use a secrets manager.
```

### Injection Vulnerabilities
```markdown
**Finding**: SQL Injection

**Explanation**: User input is directly concatenated into SQL queries without 
sanitization or parameterization. This allows attackers to inject malicious 
SQL commands that can read, modify, or delete database data.

**Impact**: Complete database compromise including:
- Data theft
- Data manipulation
- Authentication bypass
- System takeover

**Fix**: Use parameterized queries or an ORM with built-in protection.
```

### Authentication Issues
```markdown
**Finding**: Weak Password Policy

**Explanation**: The application accepts passwords with minimal requirements 
(6 characters, no complexity rules). This makes accounts vulnerable to 
brute-force and dictionary attacks.

**Impact**: Account compromise leading to:
- Unauthorized access
- Identity theft
- Data exposure
- Privilege escalation

**Fix**: Implement strong password requirements (12+ chars, complexity, no common passwords).
```

## Quality Checklist

Before finalizing an explanation, verify:

- [ ] Clear executive summary
- [ ] Technical accuracy
- [ ] Real-world context provided
- [ ] Specific remediation steps
- [ ] Code examples included
- [ ] Compliance impact noted
- [ ] Appropriate severity tone
- [ ] Actionable recommendations
- [ ] No jargon without explanation
- [ ] Spooky tone applied (from spooky_tone.md)

## Integration Points

This steering applies to:
- Finding Detail page AI explanations
- Scan Results descriptions
- Email notifications
- PDF reports
- API responses

---

**Goal**: Empower developers to understand and fix security issues confidently.

🔍 Clear Explanations = Better Security 🛡️
