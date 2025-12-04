"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ghost, Mail, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement forgot password logic
    setTimeout(() => {
      setLoading(false)
      setSent(true)
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
            <CardTitle className="text-3xl font-bold text-white">Forgot Password?</CardTitle>
            <CardDescription className="text-purple-300">
              {sent 
                ? "Check your email for reset instructions 📧" 
                : "No worries, we'll send you reset instructions 👻"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-950/20 border border-green-500/30">
                  <p className="text-sm text-green-400 text-center">
                    If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
                  </p>
                </div>
                <div className="text-center text-sm text-slate-400">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button 
                    onClick={() => setSent(false)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    try again
                  </button>
                </div>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full border-purple-500/30 hover:bg-purple-500/20 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      "Send Reset Link"
                    )}
                  </Button>
                </motion.div>

                {/* Back to Login */}
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full border-purple-500/30 hover:bg-purple-500/20 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
