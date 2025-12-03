# 🎃 GhostOps Vibe Initialization

## Project Vibe

GhostOps is a **spooky security scanner** with a playful Halloween theme that makes security fun and approachable. Think: friendly ghosts helping developers, not scary monsters attacking them.

## Visual Theme

### Colors
- **Primary**: Purple (#9333ea, #a855f7)
- **Background**: Dark slate (#0f172a, #1e293b)
- **Accent**: Ghost white (#f8fafc)
- **Danger**: Red (#ef4444)
- **Warning**: Yellow (#eab308)
- **Success**: Green (#22c55e)

### Typography
- **Headings**: Bold, clear, with ghost emojis
- **Body**: Inter font, readable
- **Code**: Monospace, terminal-style
- **Accent**: Purple highlights

### Spacing
- Generous padding for breathing room
- Consistent gaps between sections
- Card-based layout with rounded corners

## Component Patterns

### Cards
```tsx
<Card className="bg-slate-900/50 border-purple-500/30">
  <CardHeader>
    <CardTitle className="text-purple-300 flex items-center gap-2">
      <Ghost className="w-5 h-5 animate-pulse" />
      Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Buttons
```tsx
<Button className="bg-purple-600 hover:bg-purple-700">
  <Icon className="w-4 h-4 mr-2" />
  Action
</Button>
```

### Status Indicators
```tsx
<Ghost className="w-5 h-5 text-purple-400 animate-pulse" />
```

## Layout Structure

### Sidebar Navigation
- Fixed left sidebar
- Ghost logo at top
- Icon + text navigation items
- Purple hover states
- Active state highlighting

### Main Content
- Full-width container
- Consistent padding
- Header with title and actions
- Card-based content sections

### Empty States
- Centered content
- Large ghost icon
- Helpful message
- Call-to-action button

## Animation Guidelines

### Subtle Animations
- Ghost icons: `animate-pulse`
- Loading states: `animate-spin`
- Hover transitions: `transition-colors`
- Card hovers: `hover:border-purple-500/60`

### No Animations
- Avoid excessive movement
- No auto-playing animations
- No distracting effects

## Accessibility

### Color Contrast
- Ensure text is readable
- Use sufficient contrast ratios
- Don't rely on color alone

### Interactive Elements
- Clear focus states
- Keyboard navigation
- Screen reader friendly
- Semantic HTML

## Responsive Design

### Mobile
- Stack cards vertically
- Collapsible sidebar
- Touch-friendly buttons
- Readable text sizes

### Tablet
- 2-column layouts
- Sidebar visible
- Optimized spacing

### Desktop
- Multi-column layouts
- Full sidebar
- Maximum content width

## Tone in UI

### Messages
- Playfully spooky
- Helpful and clear
- Professional when serious
- Encouraging and positive

### Labels
- Clear and descriptive
- Action-oriented
- Consistent terminology

### Errors
- Gentle and helpful
- Suggest solutions
- Avoid blame

## Component Library

### From shadcn/ui
- Button
- Card
- Tabs
- Progress
- Input
- Select
- Dialog
- Toast

### Custom Components
- Terminal
- SecurityDashboard
- FindingCard
- RemediationCard
- ActivityCard

## File Organization

```
src/
├── app/
│   ├── console/
│   │   ├── dashboard/
│   │   ├── repositories/
│   │   ├── scan-results/
│   │   ├── finding/[id]/
│   │   ├── remediations/
│   │   ├── terminal/
│   │   ├── activity/
│   │   └── settings/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── ui/
└── lib/
    └── utils.ts
```

## Naming Conventions

### Components
- PascalCase: `SecurityDashboard`
- Descriptive: `FindingDetailPage`
- Suffix with type: `RemediationCard`

### Functions
- camelCase: `startScan`
- Verb-first: `generateFix`
- Descriptive: `calculateHealthScore`

### Variables
- camelCase: `scanResults`
- Descriptive: `hauntedHealthScore`
- Boolean prefix: `isScanning`

## Code Style

### TypeScript
- Use types over interfaces
- Avoid `any`
- Use optional chaining
- Destructure props

### React
- Functional components
- Hooks for state
- Props destructuring
- Early returns for conditions

### Tailwind
- Utility-first
- Consistent spacing scale
- Responsive prefixes
- Custom colors from config

## Development Workflow

### Creating New Pages
1. Create page.tsx in app/console/[name]/
2. Use consistent layout structure
3. Add to sidebar navigation
4. Include empty states
5. Apply spooky theme

### Adding Features
1. Define in spec.yaml
2. Create components
3. Add hooks if needed
4. Update steering docs
5. Test thoroughly

### Styling
1. Use Tailwind utilities
2. Follow color scheme
3. Maintain consistency
4. Test responsiveness

---

**Remember**: We're building a tool that makes security fun, not frightening. Every component should feel friendly, helpful, and a little bit spooky! 👻
