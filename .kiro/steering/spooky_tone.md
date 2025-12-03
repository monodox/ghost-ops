# 👻 Spooky Tone Steering

## Purpose
This steering document controls the tone and style of all GhostOps communications, ensuring a consistent spooky, Halloween-themed experience while maintaining professionalism.

## Tone Guidelines

### Voice Characteristics
- **Playfully Spooky**: Use ghost and Halloween metaphors without being scary
- **Professional**: Maintain technical accuracy and clarity
- **Engaging**: Make security fun and approachable
- **Empowering**: Help developers feel confident about fixing issues

### Language Patterns

#### ✅ DO Use:
- "haunting your codebase"
- "spectral vulnerabilities"
- "ghostly misconfigurations"
- "phantom security issues"
- "lurking in the shadows"
- "spooky findings"
- "haunted health score"
- "supernatural scanning"

#### ❌ DON'T Use:
- Overly scary or threatening language
- Horror movie references that might be off-putting
- Jokes that undermine security severity
- Unprofessional slang

### Message Templates

#### Dashboard Messages
```
"👻 A spectral scan has revealed ${count} haunting issues in your repository..."
"🎃 Your Haunted Health Score: ${score}/100 - ${count} ghosts detected!"
"🕷️ ${count} phantom vulnerabilities are lurking in ${repo}..."
```

#### Finding Descriptions
```
"This critical vulnerability haunts your ${file} file..."
"A ghostly misconfiguration has been detected in ${location}..."
"Beware! This security specter could lead to ${impact}..."
```

#### Terminal Output
```
"🔍 Summoning the spirits of security analysis..."
"👻 Scanning for supernatural vulnerabilities..."
"⚠️  Warning: ${count} ghosts detected in your codebase!"
"✅ All clear! No phantoms found in this scan."
```

#### Success Messages
```
"🎉 Exorcism complete! The vulnerability has been banished."
"✨ Your code is now ghost-free!"
"👻 Another specter vanquished!"
```

#### Error Messages
```
"😱 The spirits are restless... scan failed: ${error}"
"🕸️ Something wicked this way comes: ${error}"
"👻 Boo! An error occurred: ${error}"
```

## Severity Mapping

### Critical
- "A terrifying vulnerability"
- "Extremely haunted"
- "Critical phantom"
- "Dangerous specter"

### High
- "A concerning ghost"
- "Seriously spooky"
- "Major haunting"

### Medium
- "A moderate phantom"
- "Somewhat spooky"
- "Minor haunting"

### Low
- "A friendly ghost"
- "Barely spooky"
- "Harmless specter"

## Context-Specific Guidelines

### Activity Log
Use past tense with spooky verbs:
- "haunted" instead of "scanned"
- "detected" instead of "found"
- "exorcised" instead of "fixed"
- "summoned" instead of "triggered"

### Remediation Center
Balance spooky with actionable:
- "Banish this vulnerability by..."
- "Exorcise this ghost with the following fix..."
- "Vanquish this specter using..."

### Finding Detail
Start spooky, end professional:
1. Hook with spooky intro
2. Explain technically
3. Provide clear remediation

## Emoji Usage

### Approved Emojis
- 👻 Ghost (primary)
- 🎃 Jack-o'-lantern
- 🕷️ Spider
- 🕸️ Spider web
- 🦇 Bat
- 💀 Skull (use sparingly)
- ⚠️ Warning
- ✅ Success
- 🔍 Search
- 🔧 Fix

### Emoji Placement
- Start of messages for attention
- End of success messages for celebration
- Inline for emphasis (use sparingly)

## Examples

### Good Examples
```
"👻 GhostOps has detected a spectral vulnerability in your authentication flow. 
This phantom could allow unauthorized access to user accounts. Let's banish it!"

"🎃 Scan complete! Your Haunted Health Score improved by 15 points. 
3 ghosts exorcised, 2 specters remain."

"🔍 Summoning security spirits... analyzing 247 files for supernatural threats..."
```

### Bad Examples
```
❌ "Your code is cursed and doomed!" (too scary)
❌ "LOL found some bugs 😂" (unprofessional)
❌ "This will haunt you forever..." (threatening)
```

## Adaptation Rules

### Serious Issues
When severity is critical:
- Lead with clear, direct language
- Add spooky flavor as secondary
- Never joke about serious security risks

### User Errors
When user makes a mistake:
- Be helpful, not scary
- Use gentle spooky language
- Focus on solutions

### Success States
When things go well:
- Celebrate with spooky joy
- Use positive ghost metaphors
- Encourage continued security

## Integration Points

This steering applies to:
- Dashboard messages
- Finding descriptions
- Terminal output
- Activity log entries
- Notification text
- Error messages
- Success confirmations
- Email templates
- PR descriptions

---

**Remember**: We're making security fun and approachable, not scary and intimidating. 
The goal is to engage developers with a playful theme while maintaining professional security standards.

👻 Happy Haunting! 🎃
