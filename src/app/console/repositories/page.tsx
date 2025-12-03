"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Github, Clock, Ghost, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4
    }
  }
}

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [scanningRepos, setScanningRepos] = useState<Set<number>>(new Set())
  const [scanResults, setScanResults] = useState<Map<number, any>>(new Map())
  const [showScanResultModal, setShowScanResultModal] = useState(false)
  const [currentScanResult, setCurrentScanResult] = useState<any>(null)
  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    private: false
  })

  const fetchRepos = () => {
    setLoading(true)
    fetch("/api/github/repos")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setRepos(data.repos || [])
        }
      })
      .catch(err => {
        setError("Failed to fetch repositories")
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  const handleCreateRepo = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const res = await fetch("/api/github/create-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newRepo.name,
          description: newRepo.description,
          private: newRepo.private,
          auto_init: true
        })
      })

      const data = await res.json()

      if (data.error) {
        alert(`Error: ${data.error}`)
      } else {
        setShowCreateModal(false)
        setNewRepo({ name: "", description: "", private: false })
        fetchRepos() // Refresh the list
        alert(`✅ Repository "${data.repo.name}" created successfully!`)
      }
    } catch (err) {
      alert("Failed to create repository")
      console.error(err)
    } finally {
      setCreating(false)
    }
  }

  const handleScanRepo = async (repo: any) => {
    // Extract owner and repo name from full_name
    const [owner, repoName] = repo.full_name.split("/")
    
    // Mark as scanning
    setScanningRepos(prev => new Set(prev).add(repo.id))
    
    try {
      const res = await fetch("/api/scan/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo: repoName })
      })

      const data = await res.json()

      if (data.error) {
        alert(`👻 Scan failed: ${data.error}`)
      } else if (data.scan) {
        // Store scan results
        setScanResults(prev => {
          const newMap = new Map(prev)
          newMap.set(repo.id, data.scan)
          return newMap
        })
        
        // Show animated modal with results
        setCurrentScanResult(data.scan)
        setShowScanResultModal(true)
      }
    } catch (err) {
      console.error("Scan error:", err)
      alert("👻 The spirits are restless... scan failed")
    } finally {
      // Remove from scanning set
      setScanningRepos(prev => {
        const newSet = new Set(prev)
        newSet.delete(repo.id)
        return newSet
      })
    }
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
          <h1 className="text-3xl font-bold text-white">Repositories</h1>
          <p className="text-purple-300 mt-1">Manage your connected GitHub repositories</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={fetchRepos}
              disabled={loading}
              variant="outline"
              className="border-purple-500/30 hover:bg-purple-500/20"
            >
              <motion.div
                animate={loading ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
              Refresh
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-purple-400/30 rounded-full"
              initial={{ scale: 0, opacity: 0.5 }}
              whileTap={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
              <Plus className="w-4 h-4 mr-2" />
              Create Repository
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid gap-4 md:grid-cols-4"
        variants={itemVariants}
      >
        <StatCard title="Total Repos" value={loading ? "..." : repos.length.toString()} />
        <StatCard title="Active Scans" value="0" />
        <StatCard title="Hooks Enabled" value="0" />
        <StatCard title="Total Issues" value="0" />
      </motion.div>

      {/* Repository List */}
      {loading ? (
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/50 border-purple-500/30">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Ghost className="w-16 h-16 text-purple-400 mb-4" />
              </motion.div>
              <p className="text-slate-400">Loading repositories...</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : error ? (
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/50 border-red-500/30">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Ghost className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Error Loading Repositories</h3>
              <p className="text-sm text-slate-400 text-center max-w-md mb-4">
                {error === "unauthenticated" 
                  ? "Please connect your GitHub account in Settings" 
                  : error
                }
              </p>
              <Button 
                onClick={() => window.location.href = "/console/settings"}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : repos.length > 0 ? (
        <motion.div 
          className="grid gap-4"
          variants={containerVariants}
        >
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              variants={itemVariants}
              custom={index}
            >
              <RepoCard 
                repo={repo} 
                onScan={() => handleScanRepo(repo)}
                isScanning={scanningRepos.has(repo.id)}
                scanResult={scanResults.get(repo.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
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
              <h3 className="text-lg font-semibold text-white mb-2">No Repositories Connected</h3>
              <p className="text-sm text-slate-400 text-center max-w-md">
                Connect your first GitHub repository to start scanning for security vulnerabilities
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Scan Result Modal */}
      {showScanResultModal && currentScanResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-slate-900/95 border-purple-500/50 overflow-hidden">
              <CardHeader className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className="relative">
                  <CardTitle className="text-white flex items-center gap-2 text-2xl">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3,
                      }}
                    >
                      <Ghost className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    Spectral Scan Complete!
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {currentScanResult.repository}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Health Score */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-center py-6 bg-slate-800/50 rounded-lg border border-purple-500/30"
                >
                  <div className="text-sm text-slate-400 mb-2">Haunted Health Score</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl font-bold text-white mb-2"
                  >
                    {currentScanResult.healthScore}
                    <span className="text-3xl text-slate-400">/100</span>
                  </motion.div>
                  <div className="text-sm text-purple-300">
                    {currentScanResult.findings.total} ghosts detected
                  </div>
                </motion.div>

                {/* Findings Breakdown */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-300 mb-3">
                    Findings Breakdown:
                  </div>
                  
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between p-3 bg-red-950/20 border border-red-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-white font-medium">Critical</span>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="text-2xl font-bold text-red-400"
                    >
                      {currentScanResult.findings.critical}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between p-3 bg-orange-950/20 border border-orange-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-white font-medium">High</span>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="text-2xl font-bold text-orange-400"
                    >
                      {currentScanResult.findings.high}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between p-3 bg-yellow-950/20 border border-yellow-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-white font-medium">Medium</span>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className="text-2xl font-bold text-yellow-400"
                    >
                      {currentScanResult.findings.medium}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-between p-3 bg-green-950/20 border border-green-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-white font-medium">Low</span>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                      className="text-2xl font-bold text-green-400"
                    >
                      {currentScanResult.findings.low}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Scan Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-around text-sm text-slate-400 pt-4 border-t border-slate-700"
                >
                  <div className="text-center">
                    <div className="text-white font-medium">{currentScanResult.filesScanned}</div>
                    <div>Files Scanned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium">{currentScanResult.duration}</div>
                    <div>Duration</div>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    onClick={() => {
                      setShowScanResultModal(false)
                      setCurrentScanResult(null)
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    >
                      OK
                    </motion.span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Create Repository Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="bg-slate-900/95 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Ghost className="w-5 h-5 text-purple-400" />
                  Create New Repository
                </CardTitle>
                <CardDescription>Create a new GitHub repository from GhostOps</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateRepo} className="space-y-4">
                  {/* Repository Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Repository Name *</label>
                    <input
                      type="text"
                      value={newRepo.name}
                      onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
                      placeholder="my-awesome-project"
                      className="w-full px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      required
                      pattern="[a-zA-Z0-9_-]+"
                      title="Only letters, numbers, hyphens, and underscores"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Description</label>
                    <textarea
                      value={newRepo.description}
                      onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
                      placeholder="A brief description of your repository"
                      className="w-full px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Private Checkbox */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="private"
                      checked={newRepo.private}
                      onChange={(e) => setNewRepo({ ...newRepo, private: e.target.checked })}
                      className="w-4 h-4 rounded border-purple-500/30 bg-slate-800/50 text-purple-600 focus:ring-2 focus:ring-purple-500/50"
                    />
                    <label htmlFor="private" className="text-sm text-slate-300">
                      Make this repository private
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={creating}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      {creating ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Ghost className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Repository
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      disabled={creating}
                      variant="outline"
                      className="border-purple-500/30 hover:bg-purple-500/20"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="bg-slate-900/50 border-purple-500/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}

function RepoCard({ 
  repo,
  onScan,
  isScanning,
  scanResult
}: { 
  repo: {
    id: number
    name: string
    full_name: string
    private: boolean
    html_url: string
    updated_at: string
  }
  onScan: () => void
  isScanning: boolean
  scanResult?: any
}) {
  const statusConfig = {
    healthy: {
      icon: <Ghost className="w-5 h-5 text-green-400" />,
      color: "border-green-500/30",
      bg: "bg-green-950/20",
      text: "Healthy"
    },
    warning: {
      icon: <Ghost className="w-5 h-5 text-yellow-400 animate-pulse" />,
      color: "border-yellow-500/30",
      bg: "bg-yellow-950/20",
      text: "Warning"
    },
    critical: {
      icon: <Ghost className="w-5 h-5 text-red-400 animate-pulse" />,
      color: "border-red-500/30",
      bg: "bg-red-950/20",
      text: "Critical"
    },
    scanning: {
      icon: <Ghost className="w-5 h-5 text-purple-400 animate-bounce" />,
      color: "border-purple-500/30",
      bg: "bg-purple-950/20",
      text: "Scanning..."
    },
    unknown: {
      icon: <Ghost className="w-5 h-5 text-slate-400" />,
      color: "border-slate-500/30",
      bg: "bg-slate-950/20",
      text: "Not Scanned"
    }
  }

  // Determine status based on scan results
  let config = statusConfig.unknown
  if (isScanning) {
    config = statusConfig.scanning
  } else if (scanResult) {
    const { healthScore, findings } = scanResult
    if (findings.critical > 0) {
      config = statusConfig.critical
    } else if (healthScore >= 80) {
      config = statusConfig.healthy
    } else {
      config = statusConfig.warning
    }
  }

  const lastUpdated = new Date(repo.updated_at).toLocaleDateString()

  return (
    <motion.div
      whileHover={{ 
        rotate: [0, -0.5, 0.5, 0],
        transition: { duration: 0.3 }
      }}
    >
      <Card className={`bg-slate-900/50 ${config.color} transition-all hover:shadow-lg hover:shadow-purple-500/20`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {config.icon}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-white truncate">{repo.name}</CardTitle>
                  {repo.private && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                      Private
                    </span>
                  )}
                </div>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Github className="w-3 h-3" />
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-400 transition-colors truncate"
                  >
                    {repo.full_name}
                  </a>
                </CardDescription>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color.replace('border-', 'text-')} whitespace-nowrap`}>
              {config.text}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Scan Results Summary */}
            {scanResult && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-6 p-3 bg-slate-800/30 rounded-lg border border-purple-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-white">{scanResult.healthScore}</div>
                  <div className="text-sm text-slate-400">Health Score</div>
                </div>
                <div className="h-8 w-px bg-slate-600" />
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-400">{scanResult.findings.critical}</div>
                  <div className="text-sm text-slate-400">Critical</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-400">{scanResult.findings.high}</div>
                  <div className="text-sm text-slate-400">High</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-yellow-400">{scanResult.findings.medium}</div>
                  <div className="text-sm text-slate-400">Medium</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-green-400">{scanResult.findings.low}</div>
                  <div className="text-sm text-slate-400">Low</div>
                </div>
              </motion.div>
            )}

            {/* Repository Info and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {lastUpdated}</span>
                </div>
                {scanResult && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Last Scan:</span>
                    <span className="text-purple-400">{scanResult.duration}</span>
                  </div>
                )}
                {scanResult && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Files:</span>
                    <span className="text-slate-300">{scanResult.filesScanned}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-500/30 hover:bg-purple-500/20"
                    onClick={onScan}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Ghost className="w-4 h-4 mr-1" />
                        </motion.div>
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Ghost className="w-4 h-4 mr-1" />
                        {scanResult ? "Rescan" : "Scan Now"}
                      </>
                    )}
                  </Button>
                </motion.div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-purple-500/30 hover:bg-purple-500/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
