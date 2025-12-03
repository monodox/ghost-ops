"use client"

import { Ghost } from "lucide-react"
import Link from "next/link"

export default function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-purple-500/30 bg-slate-900/50 backdrop-blur-lg mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand - Left */}
          <div className="flex items-center gap-3">
            <Ghost className="w-5 h-5 text-purple-400" />
            <div>
              <span className="font-bold text-white block">GhostOps</span>
              <p className="text-xs text-slate-400">
                Haunting your codebase for security vulnerabilities 👻
              </p>
            </div>
          </div>

          {/* Legal Links - Right */}
          <div className="flex items-center gap-6 relative z-10">
            <Link href="/legal/privacy" className="text-sm text-slate-400 hover:text-purple-400 transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-sm text-slate-400 hover:text-purple-400 transition-colors cursor-pointer">
              Terms of Service
            </Link>
            <Link href="/legal/cookies" className="text-sm text-slate-400 hover:text-purple-400 transition-colors cursor-pointer">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-purple-500/20 text-center">
          <p className="text-xs text-slate-500">
            © {currentYear} GhostOps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
