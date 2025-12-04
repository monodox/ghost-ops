"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ghost, Shield, AlertTriangle, CheckCircle2, Play, Eye, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
      duration: 0.5
    }
  }
}

export default function DashboardPage() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startScan = () => {
    setScanning(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

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
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-purple-300 mt-1">Monitor your repository security posture</p>
        </div>
        <Button 
          onClick={startScan}
          disabled={scanning}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Play className="w-4 h-4 mr-2" />
          {scanning ? "Scanning..." : "Run Scan"}
        </Button>
      </motion.div>

      {/* Haunted Health Score */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-500/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      y: [0, -6, 0],
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Ghost className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  Haunted Health Score
                </CardTitle>
                <CardDescription>Overall security posture across all repositories</CardDescription>
              </div>
              <motion.div 
                className="text-right"
                animate={{ 
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0px rgba(168, 85, 247, 0)",
                    "0 0 20px rgba(168, 85, 247, 0.4)",
                    "0 0 0px rgba(168, 85, 247, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-5xl font-bold text-slate-600">--</div>
                <div className="text-sm text-slate-500 flex items-center gap-1 justify-end mt-1">
                  No data yet
                </div>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={0} className="h-3" />
            <p className="text-xs text-slate-400 mt-2">
              Run a scan to calculate your security score
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scanning Progress */}
      {scanning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <Card className="bg-slate-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-5 h-5" />
                </motion.div>
                Scanning Repository...
              </CardTitle>
              <CardDescription>Detecting security vulnerabilities and compliance issues</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-slate-400 mt-2">{progress}% complete</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <StatCard
          title="Critical Issues"
          value="0"
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          trend="No scans yet"
          color="red"
        />
        <StatCard
          title="Medium Issues"
          value="0"
          icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
          trend="No scans yet"
          color="yellow"
        />
        <StatCard
          title="Passed Checks"
          value="0"
          icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
          trend="No scans yet"
          color="green"
        />
        <StatCard
          title="Active Repos"
          value="0"
          icon={<Shield className="w-5 h-5 text-purple-500" />}
          trend="Add repositories"
          color="purple"
        />
      </motion.div>

      {/* Recent Scans */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300">Recent Scans</CardTitle>
            <CardDescription>Latest security scan results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Ghost className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              </motion.div>
              <p className="text-slate-400">No scans yet</p>
              <p className="text-sm text-slate-500 mt-2">Run your first scan to see results here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid gap-4 md:grid-cols-3"
        variants={itemVariants}
      >
        <QuickActionCard
          title="View All Findings"
          description="Review detailed security vulnerabilities"
          icon={<Eye className="w-6 h-6" />}
        />
        <QuickActionCard
          title="Manage Repositories"
          description="Add or configure repositories"
          icon={<Shield className="w-6 h-6" />}
        />
        <QuickActionCard
          title="Configure Hooks"
          description="Set up automated scanning"
          icon={<Activity className="w-6 h-6" />}
        />
      </motion.div>
    </motion.div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color 
}: { 
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: string
}) {
  const borderColors = {
    red: "border-red-500/30",
    yellow: "border-yellow-500/30",
    green: "border-green-500/30",
    purple: "border-purple-500/30"
  }

  return (
    <Card className={`bg-slate-900/50 ${borderColors[color as keyof typeof borderColors]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
        <p className="text-xs text-slate-400 mt-1">{trend}</p>
      </CardContent>
    </Card>
  )
}



function QuickActionCard({
  title,
  description,
  icon
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30 hover:border-purple-500/60 transition-colors cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
            {icon}
          </div>
          <div>
            <CardTitle className="text-base text-white">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
