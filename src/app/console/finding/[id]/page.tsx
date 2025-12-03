"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Ghost, FileCode, AlertTriangle, Sparkles, GitPullRequest, Copy, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function FindingDetailPage({ params }: { params: { id: string } }) {
  // In real app, fetch based on params.id
  const finding = null

  // Show empty state when no finding data
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link href="/console/scan-results">
          <Button variant="outline" className="border-purple-500/30 hover:bg-purple-500/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scan Results
          </Button>
        </Link>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardContent className="flex flex-col items-center justify-center py-16">
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
              <Ghost className="w-20 h-20 text-slate-600 mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              Finding Not Found
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Ghost className="w-4 h-4 text-purple-400" />
              </motion.div>
            </h3>
            <p className="text-sm text-slate-400 text-center max-w-md">
              The requested finding (ID: {params.id}) could not be found. Run a scan to discover vulnerabilities.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
