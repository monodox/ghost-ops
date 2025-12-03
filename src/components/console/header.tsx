"use client"

import { Bell, User, Search, PanelLeft, PanelRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"

export function ConsoleHeader() {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <header className={`fixed top-0 right-0 h-16 border-b border-purple-500/30 bg-slate-900/80 backdrop-blur-lg z-50 transition-all duration-300 ${isOpen ? "left-64" : "left-16"}`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-purple-500/20 text-purple-400 transition-colors"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeft className="w-5 h-5" /> : <PanelRight className="w-5 h-5" />}
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="👻 Search findings, repos..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-purple-500/20 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-purple-500/20 transition-colors"
            title="User Profile"
          >
            <User className="w-5 h-5 text-slate-300" />
          </Button>
        </div>
      </div>
    </header>
  )
}
