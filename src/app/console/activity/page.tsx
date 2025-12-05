"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Ghost, GitPullRequest, AlertTriangle, Terminal, Zap, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_ACTIVITY_LOG } from "@/lib/mockData"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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

export default function ActivityLogPage() {
  const [activities, setActivities] = useState<typeof MOCK_ACTIVITY_LOG>([])

  useEffect(() => {
    // Check if in demo mode
    const isDemoMode = typeof window !== 'undefined' && localStorage.getItem("ghostops_demo_mode") === "true"
    
    if (isDemoMode) {
      setActivities(MOCK_ACTIVITY_LOG)
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
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="w-8 h-8 text-purple-400" />
            </motion.div>
            Activity Log
          </h1>
          <p className="text-purple-300 mt-1">System-wide chronological activity</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid gap-4 md:grid-cols-5"
        variants={itemVariants}
      >
        <StatCard title="Total Events" value={activities.length.toString()} icon={<Activity className="w-4 h-4" />} />
        <StatCard title="Scans" value={activities.filter(a => a.type === "scan").length.toString()} icon={<Ghost className="w-4 h-4" />} />
        <StatCard title="Findings" value={activities.filter(a => a.type === "finding").length.toString()} icon={<AlertTriangle className="w-4 h-4" />} />
        <StatCard title="Remediations" value={activities.filter(a => a.type === "remediation").length.toString()} icon={<GitPullRequest className="w-4 h-4" />} />
        <StatCard title="Hooks" value={activities.filter(a => a.type === "hook").length.toString()} icon={<Zap className="w-4 h-4" />} />
      </motion.div>

      {/* Activity Feed */}
      {activities.length > 0 ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-slate-900/50 border border-purple-500/30">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="scans">Scans</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="remediations">Remediations</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>

          <TabsContent value="scans" className="space-y-3">
            {activities.filter(a => a.type === "scan").map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>

          <TabsContent value="findings" className="space-y-3">
            {activities.filter(a => a.type === "finding").map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>

          <TabsContent value="remediations" className="space-y-3">
            {activities.filter(a => a.type === "remediation").map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>

          <TabsContent value="terminal" className="space-y-3">
            {activities.filter(a => a.type === "terminal").map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/50 border-purple-500/30">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Activity className="w-20 h-20 text-slate-600 mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">No Activity Yet</h3>
              <p className="text-sm text-slate-400 text-center max-w-md">
                Activity logs will appear here as you use GhostOps. Start by running a scan or connecting a repository.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-slate-300">{title}</CardTitle>
        <div className="text-purple-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}


function ActivityCard({ activity }: { activity: { id: string; type: string; title: string; description: string; details: string; timestamp: string; severity: string } }) {
  const typeConfig = {
    scan: {
      icon: <Ghost className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/30 bg-purple-950/20"
    },
    finding: {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      color: "border-yellow-500/30 bg-yellow-950/20"
    },
    remediation: {
      icon: <GitPullRequest className="w-5 h-5 text-blue-400" />,
      color: "border-blue-500/30 bg-blue-950/20"
    },
    terminal: {
      icon: <Terminal className="w-5 h-5 text-green-400" />,
      color: "border-green-500/30 bg-green-950/20"
    },
    hook: {
      icon: <Zap className="w-5 h-5 text-orange-400" />,
      color: "border-orange-500/30 bg-orange-950/20"
    }
  }

  const severityConfig = {
    critical: "text-red-400",
    high: "text-orange-400",
    info: "text-blue-400",
    success: "text-green-400"
  }

  const config = typeConfig[activity.type as keyof typeof typeConfig]
  const severityColor = severityConfig[activity.severity as keyof typeof severityConfig]

  return (
    <Card className={`bg-slate-900/50 ${config.color}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{config.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className={`font-semibold ${severityColor}`}>{activity.title}</h4>
                <p className="text-sm text-slate-400 mt-1">{activity.description}</p>
                <p className="text-xs text-slate-500 mt-2">{activity.details}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
                <Clock className="w-3 h-3" />
                {activity.timestamp}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
