"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Terminal as TerminalIcon, Ghost, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TerminalPage() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [history, setHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [flashColor, setFlashColor] = useState<string | null>(null)

  useEffect(() => {
    // Welcome message
    const welcome = [
      "👻 GhostOps Terminal v1.0.0",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Available commands:",
      "  ghost scan              - Run security scan on current repository",
      "  ghost audit             - Perform compliance audit",
      "  ghost fix <id>          - Apply automated fix for finding",
      "  ghost status            - Show scan status",
      "  ghost help              - Show this help message",
      "  clear                   - Clear terminal",
      "",
      "Type a command to get started...",
      ""
    ]
    setHistory(welcome)
  }, [])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const newHistory = [...history, `$ ${trimmed}`]

    if (trimmed === "clear") {
      setHistory([])
      setCurrentCommand("")
      return
    }

    let output: string[] = []

    if (trimmed === "ghost scan") {
      setFlashColor("green")
      setTimeout(() => setFlashColor(null), 100)
      output = [
        "",
        "🔍 Initializing security scan...",
        "📦 Analyzing dependencies...",
        "🔐 Checking for hardcoded secrets...",
        "⚠️  Found 3 hardcoded API keys in config/",
        "✓ HTTPS properly configured",
        "⚠️  12 outdated packages with vulnerabilities",
        "✓ No SQL injection vulnerabilities detected",
        "⚠️  Missing security headers",
        "",
        "📊 Scan complete. 3 critical, 5 high, 7 medium, 3 low severity issues.",
        "💡 Run 'ghost fix <id>' to apply automated fixes",
        ""
      ]
    } else if (trimmed === "ghost audit") {
      output = [
        "",
        "🔒 Running compliance audit...",
        "📋 Checking SOC2 requirements...",
        "📋 Checking CIS benchmarks...",
        "📋 Checking OWASP Top 10...",
        "",
        "✓ Access control: PASSED",
        "⚠️  Encryption at rest: WARNING",
        "✗ Audit logging: FAILED",
        "✓ Secure communication: PASSED",
        "",
        "Compliance Score: 75/100",
        ""
      ]
    } else if (trimmed.startsWith("ghost fix")) {
      const id = trimmed.split(" ")[2]
      output = [
        "",
        `🔧 Applying fix for finding #${id || "1"}...`,
        "📝 Generating remediation code...",
        "🤖 AI analyzing best practices...",
        "✓ Code changes prepared",
        "✓ Tests generated",
        "✓ Creating pull request...",
        "",
        `✅ PR created: https://github.com/ghostops/repo/pull/${Math.floor(Math.random() * 100)}`,
        ""
      ]
    } else if (trimmed === "ghost status") {
      output = [
        "",
        "📊 GhostOps Status",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "Active Repositories: 4",
        "Last Scan: 2 minutes ago",
        "Pending Fixes: 3",
        "Open PRs: 2",
        "Security Score: 78/100",
        ""
      ]
    } else if (trimmed === "ghost help") {
      output = [
        "",
        "👻 GhostOps Commands",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "",
        "ghost scan              Run security scan",
        "ghost audit             Perform compliance audit",
        "ghost fix <id>          Apply automated fix",
        "ghost status            Show system status",
        "ghost help              Show this help",
        "clear                   Clear terminal",
        ""
      ]
    } else {
      output = [
        "",
        `Command not found: ${trimmed}`,
        "Type &apos;ghost help&apos; for available commands",
        ""
      ]
    }

    setHistory([...newHistory, ...output])
    setCurrentCommand("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand)
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <TerminalIcon className="w-8 h-8 text-purple-400" />
            Terminal
          </h1>
          <p className="text-purple-300 mt-1">Execute GhostOps commands</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHistory([])}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            Clear
          </Button>
        </div>
      </motion.div>

      {/* Quick Commands */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickCommand
          icon={<Ghost className="w-4 h-4" />}
          label="ghost scan"
          onClick={() => executeCommand("ghost scan")}
        />
        <QuickCommand
          icon={<Zap className="w-4 h-4" />}
          label="ghost audit"
          onClick={() => executeCommand("ghost audit")}
        />
        <QuickCommand
          icon={<TerminalIcon className="w-4 h-4" />}
          label="ghost status"
          onClick={() => executeCommand("ghost status")}
        />
        <QuickCommand
          icon={<Ghost className="w-4 h-4" />}
          label="ghost help"
          onClick={() => executeCommand("ghost help")}
        />
      </div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-black border-purple-500/50 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none crt-scanlines z-10" />
          
          {/* Flash Effect */}
          {flashColor && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{
                backgroundColor: flashColor === "green" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"
              }}
            />
          )}
          
          <CardHeader className="border-b border-purple-500/30 bg-slate-900/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-purple-300 font-mono text-sm flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span>ghostops@terminal:~$</span>
              </CardTitle>
              <div className="text-xs text-green-400 font-mono animate-pulse">● ONLINE</div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div
              ref={terminalRef}
              className="h-[500px] overflow-y-auto p-4 font-mono text-sm bg-black relative"
              style={{
                textShadow: "0 0 5px rgba(34, 197, 94, 0.5)",
                fontFamily: "'Courier New', monospace"
              }}
            >
            {history.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith("$")
                    ? "text-purple-400 mb-1"
                    : line.includes("✓") || line.includes("✅")
                    ? "text-green-400"
                    : line.includes("⚠️") || line.includes("WARNING")
                    ? "text-yellow-400"
                    : line.includes("✗") || line.includes("FAILED")
                    ? "text-red-400"
                    : line.includes("━")
                    ? "text-purple-500"
                    : "text-green-300"
                }
              >
                {line}
              </div>
            ))}
            <div className="flex items-center gap-2 text-purple-400">
              <span>$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-300 caret-green-400"
                autoFocus
                style={{ textShadow: "0 0 5px rgba(34, 197, 94, 0.5)" }}
              />
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-sm text-purple-300">Terminal Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Use quick command buttons above for faster execution</li>
              <li>• Type 'ghost help' to see all available commands</li>
              <li>• Terminal supports command history and auto-completion</li>
              <li>• All commands are safe and run in a sandboxed environment</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function QuickCommand({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="border-purple-500/30 hover:bg-purple-500/20 justify-start font-mono text-xs"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  )
}
