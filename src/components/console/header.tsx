"use client"

import { useState, useRef, useEffect } from "react"
import { User, Search, PanelLeft, PanelRight, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"
import { useRouter } from "next/navigation"

export function ConsoleHeader() {
  const { isOpen, setIsOpen } = useSidebar()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    // Clear demo mode flag
    if (typeof window !== 'undefined') {
      localStorage.removeItem("ghostops_demo_mode")
    }
    // Clear authentication and redirect
    router.push("/api/auth/logout")
  }

  const handleProfile = () => {
    setShowProfileMenu(false)
    router.push("/console/settings")
  }

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
          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-purple-500/20 transition-colors"
              title="User Profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <User className="w-5 h-5 text-slate-300" />
            </Button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-purple-500/30 rounded-lg shadow-lg shadow-purple-500/20 overflow-hidden">
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-300 hover:bg-purple-500/20 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <div className="border-t border-purple-500/30"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
