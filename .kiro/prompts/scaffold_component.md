# 🧱 Component Scaffolding Prompt

## Purpose
Generate new React components for GhostOps following established patterns and the spooky theme.

## Component Template

```tsx
"use client"

import { [Icons] } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function [ComponentName]() {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <[Icon] className="w-5 h-5" />
          [Title]
        </CardTitle>
        <CardDescription>[Description]</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  )
}
```

## Common Component Types

### 1. Status Card
```tsx
export function StatusCard({ 
  title, 
  value, 
  icon, 
  trend 
}: { 
  title: string
  value: string
  icon: React.ReactNode
  trend: string
}) {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-slate-400 mt-1">{trend}</p>
      </CardContent>
    </Card>
  )
}
```

### 2. List Item Card
```tsx
export function ListItemCard({ item }: { item: any }) {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ghost className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-slate-400">{item.subtitle}</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="border-purple-500/30">
            Action
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 3. Empty State
```tsx
export function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30">
      <CardContent className="flex flex-col items-center justify-center py-16">
        {icon}
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 text-center max-w-md mb-4">
          {description}
        </p>
        {action}
      </CardContent>
    </Card>
  )
}
```

### 4. Data Table Row
```tsx
export function TableRow({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Ghost className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{data.name}</p>
          <p className="text-xs text-slate-400">{data.details}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Actions */}
      </div>
    </div>
  )
}
```

## Styling Patterns

### Card Variants
```tsx
// Default
className="bg-slate-900/50 border-purple-500/30"

// Success
className="bg-slate-900/50 border-green-500/30"

// Warning
className="bg-slate-900/50 border-yellow-500/30"

// Error
className="bg-slate-900/50 border-red-500/30"

// Highlighted
className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-500/50"
```

### Button Variants
```tsx
// Primary
className="bg-purple-600 hover:bg-purple-700"

// Outline
variant="outline" className="border-purple-500/30 hover:bg-purple-500/20"

// Ghost
variant="ghost" className="hover:bg-purple-500/20"

// Destructive
variant="outline" className="border-red-500/30 hover:bg-red-500/20 text-red-400"
```

### Icon Patterns
```tsx
// Animated ghost
<Ghost className="w-5 h-5 text-purple-400 animate-pulse" />

// Status icons
<CheckCircle2 className="w-5 h-5 text-green-500" />
<AlertTriangle className="w-5 h-5 text-yellow-500" />
<XCircle className="w-5 h-5 text-red-500" />

// Action icons
<Play className="w-4 h-4 mr-2" />
<Settings className="w-4 h-4" />
<Trash2 className="w-4 h-4" />
```

## State Management

### Loading State
```tsx
const [loading, setLoading] = useState(false)

{loading && (
  <div className="flex items-center gap-2 text-purple-400">
    <Activity className="w-4 h-4 animate-spin" />
    <span>Loading...</span>
  </div>
)}
```

### Empty State
```tsx
{items.length === 0 && (
  <EmptyState
    icon={<Ghost className="w-20 h-20 text-slate-600 mb-4" />}
    title="No Items Found"
    description="Get started by adding your first item"
    action={<Button>Add Item</Button>}
  />
)}
```

### Error State
```tsx
{error && (
  <Card className="bg-slate-900/50 border-red-500/30">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 text-red-400">
        <XCircle className="w-5 h-5" />
        <span>{error.message}</span>
      </div>
    </CardContent>
  </Card>
)}
```

## Responsive Patterns

```tsx
// Grid layouts
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* Cards */}
</div>

// Flex layouts
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
  {/* Content */}
</div>

// Hidden on mobile
<div className="hidden md:block">
  {/* Desktop only */}
</div>
```

## Accessibility

```tsx
// Semantic HTML
<button aria-label="Close dialog">
  <X className="w-4 h-4" />
</button>

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-purple-500"

// Screen reader text
<span className="sr-only">Loading</span>
```

## Component Checklist

When creating a new component:

- [ ] Uses TypeScript with proper types
- [ ] Follows naming conventions
- [ ] Applies spooky theme colors
- [ ] Includes proper spacing
- [ ] Responsive design
- [ ] Accessible markup
- [ ] Loading/empty/error states
- [ ] Consistent with existing components
- [ ] Uses shadcn/ui primitives
- [ ] Includes ghost emoji where appropriate

---

**Goal**: Maintain consistency across all GhostOps components while keeping the spooky theme alive! 👻
