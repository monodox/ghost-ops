"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ghost, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleGitHubLogin = () => {
    window.location.href = "/api/auth/github"
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement email/password login
    setTimeout(() => {
      setLoading(false)
      // Redirect to dashboard after successful login
      window.location.href = "/console/dashboard"
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating ghosts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side ghosts */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{ y: [0, -25, 0], x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Ghost className="w-12 h-12 text-purple-400/30" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-20"
          animate={{ y: [0, -30, 0], x: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        >
          <Ghost className="w-16 h-16 text-purple-500/25" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16"
          animate={{ y: [0, -20, 0], x: [0, 12, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        >
          <Ghost className="w-14 h-14 text-purple-300/20" />
        </motion.div>

        {/* Right side ghosts */}
        <motion.div
          className="absolute top-24 right-16"
          animate={{ y: [0, -28, 0], x: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        >
          <Ghost className="w-14 h-14 text-purple-400/25" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-12"
          animate={{ y: [0, -35, 0], x: [0, 15, 0], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 6.5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
        >
          <Ghost className="w-20 h-20 text-purple-500/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-28 right-20"
          animate={{ y: [0, -22, 0], x: [0, -12, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2.5, ease: "easeInOut" }}
        >
          <Ghost className="w-16 h-16 text-purple-400/30" />
        </motion.div>

        {/* Center floating ghosts */}
        <motion.div
          className="absolute top-16 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, delay: 3, ease: "easeInOut" }}
        >
          <Ghost className="w-10 h-10 text-purple-300/20" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-slate-900/80 backdrop-blur-xl border-purple-500/50 shadow-2xl shadow-purple-500/20">
          <CardHeader className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-4"
            >
              <Ghost className="w-16 h-16 text-purple-400" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-purple-300">
              Sign in to continue haunting your codebase 👻
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ghost@example.com"
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Ghost className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            {/* GitHub OAuth Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                onClick={handleGitHubLogin}
                variant="outline"
                className="w-full border-purple-500/30 hover:bg-purple-500/10 text-white py-2 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Button>
            </motion.div>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-slate-400 pt-4 border-t border-purple-500/30">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
