"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Github, Bell, Moon, Key, Clock, Zap, Ghost } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
}

export default function SettingsPage() {
  const [spookyMode, setSpookyMode] = useState(true)
  const [autoScan, setAutoScan] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [githubUser, setGithubUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Check GitHub connection status
  useState(() => {
    fetch("/api/github/user")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setGithubUser(data)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  })

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Settings className="w-8 h-8 text-purple-400" />
            </motion.div>
            Settings
          </h1>
          <p className="text-purple-300 mt-1">Configure GhostOps scanning and notifications</p>
        </div>
      </motion.div>

      {/* GitHub Connection */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub Connection
            </CardTitle>
            <CardDescription>Connect your GitHub account to enable repository scanning</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Ghost className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-slate-400">Checking connection...</p>
              </div>
            ) : githubUser ? (
              <div className="flex items-center justify-between p-4 rounded-lg bg-green-950/20 border border-green-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center overflow-hidden">
                    {githubUser.avatar_url ? (
                      <img src={githubUser.avatar_url} alt={githubUser.login} className="w-full h-full" />
                    ) : (
                      <Github className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Connected as @{githubUser.login}</p>
                    <p className="text-xs text-slate-400">{githubUser.name || "GitHub User"}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-500/30 hover:bg-red-500/20 text-red-400"
                  onClick={() => window.location.href = "/api/auth/logout"}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity
                  }}
                >
                  <Github className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">No GitHub Connection</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Connect your GitHub account to enable repository scanning
                </p>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => window.location.href = "/api/auth/github"}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Connect GitHub
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Scan Frequency */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Scan Frequency
          </CardTitle>
          <CardDescription>Configure automated security scanning schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <SettingToggle
              label="Auto-scan on push"
              description="Automatically scan repositories when code is pushed"
              enabled={autoScan}
              onToggle={() => setAutoScan(!autoScan)}
            />
            <div className="grid grid-cols-2 gap-3">
              <FrequencyOption label="Daily" selected={false} />
              <FrequencyOption label="Weekly" selected={false} />
              <FrequencyOption label="On Push" selected={false} />
              <FrequencyOption label="Manual Only" selected={true} />
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Theme Settings */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Ghost className="w-5 h-5 animate-pulse" />
            Spooky Mode
          </CardTitle>
          <CardDescription>Toggle the haunted theme and animations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingToggle
            label="Spooky Mode"
            description="Enable ghost animations and spooky visual effects"
            enabled={spookyMode}
            onToggle={() => setSpookyMode(!spookyMode)}
          />
          <div className="p-4 rounded-lg bg-purple-950/30 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Moon className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-white">Dark Theme Active</span>
            </div>
            <p className="text-xs text-slate-400">
              GhostOps looks best in the dark. Light theme coming soon... maybe. 👻
            </p>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure how you receive security alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <SettingToggle
            label="Email Notifications"
            description="Receive email alerts for critical findings"
            enabled={notifications}
            onToggle={() => setNotifications(!notifications)}
          />
          <SettingToggle
            label="Slack Integration"
            description="Send alerts to Slack channels"
            enabled={false}
            onToggle={() => {}}
          />
          <SettingToggle
            label="Discord Webhooks"
            description="Post security updates to Discord"
            enabled={false}
            onToggle={() => {}}
          />
        </CardContent>
      </Card>
      </motion.div>

      {/* API Tokens */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Tokens
            </CardTitle>
            <CardDescription>Manage API access tokens</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-12">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Key className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white mb-2">No API Tokens</h3>
            <p className="text-sm text-slate-400 mb-4">
              Generate API tokens to integrate GhostOps with your workflows
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Key className="w-4 h-4 mr-2" />
              Generate New Token
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Settings */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Advanced Settings
          </CardTitle>
          <CardDescription>Power user configurations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <SettingToggle
            label="Aggressive Scanning"
            description="Enable deep code analysis (may take longer)"
            enabled={false}
            onToggle={() => {}}
          />
          <SettingToggle
            label="Auto-merge Safe Fixes"
            description="Automatically merge low-risk remediation PRs"
            enabled={false}
            onToggle={() => {}}
          />
          <SettingToggle
            label="Experimental Features"
            description="Enable beta features and AI improvements"
            enabled={true}
            onToggle={() => {}}
          />
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  )
}

function SettingToggle({
  label,
  description,
  enabled,
  onToggle
}: {
  label: string
  description: string
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-purple-500/20">
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <motion.button
        onClick={onToggle}
        className="relative w-11 h-6 rounded-full toggle-switch"
        animate={{
          backgroundColor: enabled ? "rgb(147, 51, 234)" : "rgb(51, 65, 85)"
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white toggle-knob"
          animate={{
            x: enabled ? 20 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </motion.button>
    </div>
  )
}

function FrequencyOption({ label, selected }: { label: string; selected: boolean }) {
  return (
    <button
      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
        selected
          ? "bg-purple-950/50 border-purple-500/50 text-purple-300"
          : "bg-slate-800/30 border-slate-700 text-slate-400 hover:border-purple-500/30"
      }`}
    >
      {label}
    </button>
  )
}
