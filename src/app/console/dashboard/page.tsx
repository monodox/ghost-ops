"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Ghost, Shield, AlertTriangle, CheckCircle2, Eye, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_DASHBOARD_STATS } from "@/lib/mockData"

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
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    // Check if in demo mode
    const demoMode = typeof window !== 'undefined' && localStorage.getItem("ghostops_demo_mode") === "true"
    
    if (demoMode) {
      setStats(MOCK_DASHBOARD_STATS)
    }
  }, [])

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-purple-300 mt-1">Monitor your repository security posture</p>
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
                <div className={`text-5xl font-bold ${stats ? (stats.averageHealthScore >= 80 ? 'text-green-400' : stats.averageHealthScore >= 60 ? 'text-yellow-400' : 'text-red-400') : 'text-slate-600'}`}>
                  {stats ? stats.averageHealthScore : '--'}
                </div>
                <div className="text-sm text-slate-500 flex items-center gap-1 justify-end mt-1">
                  {stats ? `${stats.scannedRepos} repos scanned` : 'No data yet'}
                </div>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
                style={{ width: `${stats ? stats.averageHealthScore : 0}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {stats ? `${stats.totalFindings} total findings across ${stats.totalRepos} repositories` : 'Run a scan to calculate your security score'}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <StatCard
          title="Critical Issues"
          value={stats ? stats.criticalFindings.toString() : "0"}
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          trend={stats ? "Requires immediate attention" : "No scans yet"}
          color="red"
        />
        <StatCard
          title="Total Findings"
          value={stats ? stats.totalFindings.toString() : "0"}
          icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
          trend={stats ? "Across all repositories" : "No scans yet"}
          color="yellow"
        />
        <StatCard
          title="Health Score"
          value={stats ? `${stats.averageHealthScore}%` : "0"}
          icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
          trend={stats ? "Average across repos" : "No scans yet"}
          color="green"
        />
        <StatCard
          title="Active Repos"
          value={stats ? stats.totalRepos.toString() : "0"}
          icon={<Shield className="w-5 h-5 text-purple-500" />}
          trend={stats ? `${stats.scannedRepos} scanned` : "Add repositories"}
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
            {stats && stats.recentScans && stats.recentScans.length > 0 ? (
              <div className="space-y-4">
                {stats.recentScans.map((scan: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <Ghost className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{scan.repository}</p>
                        <p className="text-xs text-slate-400">{new Date(scan.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${scan.healthScore >= 80 ? 'text-green-400' : scan.healthScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {scan.healthScore}
                      </p>
                      <p className="text-xs text-slate-400">{scan.findings} findings</p>
                    </div>
                  </div>
                ))}
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
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Ghost className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                </motion.div>
                <p className="text-slate-400">No scans yet</p>
                <p className="text-sm text-slate-500 mt-2">Run your first scan to see results here</p>
              </div>
            )}
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
