"use client"

import { Ghost, Star, Github } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AppHeader() {
  const [stars, setStars] = useState<number | null>(null)
  const githubRepo = "monodox/ghost-ops"

  useEffect(() => {
    fetch(`https://api.github.com/repos/${githubRepo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        // Silently fail if API request fails
      })
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-purple-500/30 bg-slate-900/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Ghost className="w-6 h-6 text-purple-400" />
          </motion.div>
          <span className="text-xl font-bold text-white">GhostOps</span>
        </Link>

        {/* GitHub Stars */}
        <a
          href={`https://github.com/${githubRepo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-slate-800/50 hover:bg-slate-800 hover:border-purple-500/50 transition-all group"
        >
          <Github className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <Star className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
            {stars !== null ? stars.toLocaleString() : "Star"}
          </span>
        </a>
      </div>
    </motion.header>
  )
}
