"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, AlertTriangle, XCircle, Filter, Ghost, FileCode } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4
    }
  }
}

export default function ScanResultsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const scanInfo = {
    timestamp: "--",
    duration: "--",
    repository: "No repository selected",
    totalFindings: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  }

  const findings: { id: string; severity: string; title: string; description: string; file: string; line: number; category: string }[] = []

  const filteredFindings = selectedSeverity === "all" 
    ? findings 
    : findings.filter(f => f.severity === selectedSeverity)

  return (
    <div className="space-y-6 relative">
      {/* Misty Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Scan Results</h1>
          <p className="text-purple-300 mt-1">Latest security scan findings</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Ghost className="w-4 h-4 mr-2" />
            Run New Scan
          </Button>
        </motion.div>
      </motion.div>

      {/* Scan Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-500/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Ghost className="w-6 h-6 text-purple-400" />
                  </motion.div>
                Scan Summary
              </CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {scanInfo.timestamp}
                </span>
                <span>Duration: {scanInfo.duration}</span>
                <span>Repository: {scanInfo.repository}</span>
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-red-400">{scanInfo.totalFindings}</div>
              <div className="text-sm text-slate-400">Total Findings</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="grid grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SeverityCard
                severity="Critical"
                count={scanInfo.critical}
                color="red"
                icon={<XCircle className="w-5 h-5" />}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SeverityCard
                severity="High"
                count={scanInfo.high}
                color="orange"
                icon={<AlertTriangle className="w-5 h-5" />}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SeverityCard
                severity="Medium"
                count={scanInfo.medium}
              color="yellow"
              icon={<AlertTriangle className="w-5 h-5" />}
            />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SeverityCard
                severity="Low"
                count={scanInfo.low}
                color="blue"
                icon={<AlertTriangle className="w-5 h-5" />}
              />
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Findings List */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-300">Findings</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <Tabs value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <TabsList className="bg-slate-800/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                  <TabsTrigger value="high">High</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="low">Low</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFindings.length > 0 ? (
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredFindings.map((finding, index) => (
                <motion.div
                  key={finding.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <FindingCard finding={finding} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <Ghost className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              </motion.div>
              <p className="text-slate-400">No findings yet</p>
              <p className="text-sm text-slate-500 mt-2">Run a security scan to discover vulnerabilities</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SeverityCard({ 
  severity, 
  count, 
  color, 
  icon 
}: { 
  severity: string
  count: number
  color: string
  icon: React.ReactNode
}) {
  const colors = {
    red: "bg-red-950/30 border-red-500/30 text-red-400",
    orange: "bg-orange-950/30 border-orange-500/30 text-orange-400",
    yellow: "bg-yellow-950/30 border-yellow-500/30 text-yellow-400",
    blue: "bg-blue-950/30 border-blue-500/30 text-blue-400"
  }

  const glowAnimations = {
    red: {
      boxShadow: [
        "0 0 0px rgba(239, 68, 68, 0)",
        "0 0 20px rgba(239, 68, 68, 0.6)",
        "0 0 0px rgba(239, 68, 68, 0)"
      ]
    },
    orange: {
      boxShadow: [
        "0 0 0px rgba(251, 146, 60, 0)",
        "0 0 15px rgba(251, 146, 60, 0.5)",
        "0 0 0px rgba(251, 146, 60, 0)"
      ]
    },
    yellow: {
      boxShadow: [
        "0 0 0px rgba(250, 204, 21, 0)",
        "0 0 12px rgba(250, 204, 21, 0.4)",
        "0 0 0px rgba(250, 204, 21, 0)"
      ]
    },
    blue: {
      boxShadow: [
        "0 0 0px rgba(96, 165, 250, 0)",
        "0 0 10px rgba(96, 165, 250, 0.3)",
        "0 0 0px rgba(96, 165, 250, 0)"
      ]
    }
  }

  return (
    <motion.div 
      className={`p-4 rounded-lg border ${colors[color as keyof typeof colors]}`}
      animate={count > 0 ? glowAnimations[color as keyof typeof glowAnimations] : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium">{severity}</span>
      </div>
      <div className="text-3xl font-bold">{count}</div>
    </motion.div>
  )
}

function FindingCard({ finding }: { finding: { id: string; severity: string; title: string; description: string; file: string; line: number; category: string } }) {
  const severityConfig = {
    critical: {
      color: "border-red-500/30 bg-red-950/20",
      badge: "bg-red-950/50 text-red-400 border-red-500/50",
      icon: <XCircle className="w-5 h-5 text-red-500" />
    },
    high: {
      color: "border-orange-500/30 bg-orange-950/20",
      badge: "bg-orange-950/50 text-orange-400 border-orange-500/50",
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />
    },
    medium: {
      color: "border-yellow-500/30 bg-yellow-950/20",
      badge: "bg-yellow-950/50 text-yellow-400 border-yellow-500/50",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
    },
    low: {
      color: "border-blue-500/30 bg-blue-950/20",
      badge: "bg-blue-950/50 text-blue-400 border-blue-500/50",
      icon: <AlertTriangle className="w-5 h-5 text-blue-500" />
    }
  }

  const config = severityConfig[finding.severity as keyof typeof severityConfig]

  return (
    <Link href={`/console/finding/${finding.id}`}>
      <div className={`p-4 rounded-lg border ${config.color} hover:border-purple-500/50 transition-colors cursor-pointer`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {config.icon}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-white">{finding.title}</h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                  {finding.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-2">{finding.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <FileCode className="w-3 h-3" />
                  {finding.file}:{finding.line}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-950/30 text-purple-400">
                  {finding.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
