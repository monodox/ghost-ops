"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, FolderGit2, FileSearch, GitPullRequest, Terminal, Activity, Settings, Ghost } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-context"
import { MOCK_DASHBOARD_STATS } from "@/lib/mockData"

const navItems = [
  { href: "/console/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/console/repositories", icon: FolderGit2, label: "Repositories" },
  { href: "/console/scan-results", icon: FileSearch, label: "Scan Results" },
  { href: "/console/remediations", icon: GitPullRequest, label: "Remediations" },
  { href: "/console/terminal", icon: Terminal, label: "Terminal" },
  { href: "/console/activity", icon: Activity, label: "Activity Log" },
  { href: "/console/settings", icon: Settings, label: "Settings" },
]

export function ConsoleSidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()
  const [healthScore, setHealthScore] = useState<number | null>(null)

  useEffect(() => {
    // Check if in demo mode
    const isDemoMode = typeof window !== 'undefined' && localStorage.getItem("ghostops_demo_mode") === "true"
    
    if (isDemoMode) {
      setHealthScore(MOCK_DASHBOARD_STATS.averageHealthScore)
    }
  }, [])

  return (
    <aside className={`fixed left-0 top-0 bottom-0 border-r border-purple-500/30 bg-slate-900/50 backdrop-blur flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      {/* Logo Section */}
      <div className="h-16 flex items-center px-4 border-b border-purple-500/30">
        <div className="flex items-center gap-3 overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -4, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Ghost className="w-6 h-6 text-purple-400 flex-shrink-0" />
          </motion.div>
          {isOpen && (
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-lg font-bold text-white whitespace-nowrap"
            >
              GhostOps
            </motion.h2>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-500/20 text-white border border-purple-500/30"
                    : "text-slate-300 hover:bg-purple-500/10 hover:text-white"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer - Fixed at Bottom */}
      {isOpen && (
        <div className="p-4 border-t border-purple-500/30">
          {/* Haunted Health Widget */}
          <div className="px-3 py-3 rounded-lg bg-purple-950/30 border border-purple-500/30 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Ghost className="w-4 h-4 text-purple-400" />
              </motion.div>
              <span className="text-xs font-semibold text-purple-300">Haunted Health</span>
            </div>
            <div className={`text-2xl font-bold ${
              healthScore !== null 
                ? healthScore >= 80 
                  ? 'text-green-400' 
                  : healthScore >= 60 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
                : 'text-slate-600'
            }`}>
              {healthScore !== null ? healthScore : '--'}
            </div>
            {healthScore !== null && (
              <div className="mt-1">
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <motion.div 
                    className={`h-1.5 rounded-full ${
                      healthScore >= 80 
                        ? 'bg-green-400' 
                        : healthScore >= 60 
                          ? 'bg-yellow-400' 
                          : 'bg-red-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${healthScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Version Info */}
          <div className="px-3 py-2 text-center">
            <p className="text-xs text-slate-500">GhostOps v1.0.0</p>
            <p className="text-xs text-slate-600">Kiroween Edition 🎃</p>
          </div>
        </div>
      )}
    </aside>
  )
}
