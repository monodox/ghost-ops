"use client"


import { motion } from "framer-motion"
import { GitPullRequest, CheckCircle2, Clock, XCircle, Play, RotateCcw, Eye, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function RemediationsPage() {
  const remediations: { id: string; status: string; title: string; finding: string; repository: string; createdAt: string; script: string; prUrl?: string; type: string }[] = []

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
          <h1 className="text-3xl font-bold text-white">Remediation Center</h1>
          <p className="text-purple-300 mt-1">Automated and manual security fixes</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid gap-4 md:grid-cols-4"
        variants={itemVariants}
      >
        <StatCard title="Total Remediations" value="0" />
        <StatCard title="Pending" value="0" color="yellow" />
        <StatCard title="Completed" value="0" color="green" />
        <StatCard title="PRs Created" value="0" color="purple" />
      </motion.div>

      {/* Remediations List */}
      {remediations.length > 0 ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-slate-900/50 border border-purple-500/30">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="automated">Automated</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {remediations.map((remediation) => (
              <RemediationCard key={remediation.id} remediation={remediation} />
            ))}
          </TabsContent>

          <TabsContent value="automated" className="space-y-4">
            {remediations.filter(r => r.type === "automated").map((remediation) => (
              <RemediationCard key={remediation.id} remediation={remediation} />
            ))}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {remediations.filter(r => r.type === "manual").map((remediation) => (
              <RemediationCard key={remediation.id} remediation={remediation} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {remediations.filter(r => r.status === "completed").map((remediation) => (
              <RemediationCard key={remediation.id} remediation={remediation} />
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/50 border-purple-500/30">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -8, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <GitPullRequest className="w-20 h-20 text-slate-600 mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">No Remediations Yet</h3>
              <p className="text-sm text-slate-400 text-center max-w-md">
                Remediation actions will appear here after you run scans and generate fixes
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
  color = "purple" 
}: { 
  title: string
  value: string
  color?: string
}) {
  const colors = {
    purple: "border-purple-500/30",
    yellow: "border-yellow-500/30",
    green: "border-green-500/30"
  }

  return (
    <Card className={`bg-slate-900/50 ${colors[color as keyof typeof colors]}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}


function RemediationCard({ remediation }: { remediation: { id: string; status: string; title: string; finding: string; repository: string; createdAt: string; script: string; prUrl?: string; type: string } }) {
  
  const statusConfig = {
    pending: {
      color: "border-yellow-500/30 bg-yellow-950/20",
      badge: "bg-yellow-950/50 text-yellow-400 border-yellow-500/50",
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      text: "Pending"
    },
    pr_created: {
      color: "border-blue-500/30 bg-blue-950/20",
      badge: "bg-blue-950/50 text-blue-400 border-blue-500/50",
      icon: <GitPullRequest className="w-5 h-5 text-blue-500" />,
      text: "PR Created"
    },
    completed: {
      color: "border-green-500/30 bg-green-950/20",
      badge: "bg-green-950/50 text-green-400 border-green-500/50",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      text: "Completed"
    },
    failed: {
      color: "border-red-500/30 bg-red-950/20",
      badge: "bg-red-950/50 text-red-400 border-red-500/50",
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      text: "Failed"
    },
    manual: {
      color: "border-purple-500/30 bg-purple-950/20",
      badge: "bg-purple-950/50 text-purple-400 border-purple-500/50",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      text: "Manual Review"
    }
  }

  const config = statusConfig[remediation.status as keyof typeof statusConfig]
  const isPRCreated = remediation.status === "pr_created"

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      {/* Spectral Wave for PR Created */}
      {isPRCreated && (
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      )}
      
      <Card className={`bg-slate-900/50 ${config.color} relative`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {config.icon}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-white">{remediation.title}</CardTitle>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                  {config.text}
                </span>
                {remediation.type === "automated" && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-950/30 text-purple-400 border border-purple-500/30">
                    AI-Powered
                  </span>
                )}
              </div>
              <CardDescription className="mb-2">
                Fixes: {remediation.finding}
              </CardDescription>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{remediation.repository}</span>
                <span>•</span>
                <span>{remediation.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* AI Script */}
          <motion.div 
            className="bg-black/30 rounded-lg p-3 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.div>
              <span className="text-xs font-semibold text-purple-300">AI-Generated Script</span>
            </div>
            <p className="text-sm text-slate-300 font-mono">{remediation.script}</p>
          </motion.div>

          {/* PR Link */}
          {remediation.prUrl && (
            <div className="flex items-center gap-2 text-sm">
              <GitPullRequest className="w-4 h-4 text-blue-400" />
              <a 
                href={remediation.prUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Pull Request
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {remediation.status === "pending" && (
              <>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Play className="w-4 h-4 mr-2" />
                  Execute
                </Button>
                <Button size="sm" variant="outline" className="border-purple-500/30 hover:bg-purple-500/20">
                  <Eye className="w-4 h-4 mr-2" />
                  Review
                </Button>
              </>
            )}
            {remediation.status === "failed" && (
              <Button size="sm" variant="outline" className="border-yellow-500/30 hover:bg-yellow-500/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
            {remediation.status === "pr_created" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve & Merge
                </Button>
                <Button size="sm" variant="outline" className="border-purple-500/30 hover:bg-purple-500/20">
                  <Eye className="w-4 h-4 mr-2" />
                  Review PR
                </Button>
              </>
            )}
            {remediation.status === "manual" && (
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Assistance
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  )
}
