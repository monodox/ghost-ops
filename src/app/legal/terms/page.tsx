"use client"

import { motion } from "framer-motion"
import { FileText, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/auth/login">
            <Button
              variant="ghost"
              className="mb-6 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
          
          <Card className="bg-slate-900/80 backdrop-blur-xl border-purple-500/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-purple-400" />
                <CardTitle className="text-3xl font-bold text-white">Terms of Service</CardTitle>
              </div>
              <p className="text-slate-400">Last updated: December 3, 2024</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-purple max-w-none">
              <div className="space-y-6 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                  <p>
                    Welcome to GhostOps! By accessing or using our security scanning service, you agree to be bound by these Terms of Service. 
                    If you disagree with any part of these terms, you may not access the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">2. Description of Service</h2>
                  <p>
                    GhostOps provides automated security scanning and vulnerability detection for GitHub repositories. Our service includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Automated code security analysis</li>
                    <li>Vulnerability detection and reporting</li>
                    <li>AI-powered remediation suggestions</li>
                    <li>Pull request generation for security fixes</li>
                    <li>Compliance checking and reporting</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">3. User Accounts</h2>
                  <p>
                    To use GhostOps, you must create an account and connect your GitHub account. You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintaining the security of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized access</li>
                    <li>Ensuring your GitHub permissions are appropriate</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">4. Acceptable Use</h2>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the service for any illegal purposes</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the service</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                    <li>Use the service to scan repositories you don't have permission to access</li>
                    <li>Abuse or overload our scanning infrastructure</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">5. Data and Privacy</h2>
                  <p>
                    We take your privacy seriously. Our use of your data is governed by our Privacy Policy. 
                    By using GhostOps, you consent to our collection and use of data as described in the Privacy Policy.
                  </p>
                  <p className="mt-2">
                    We scan your code to detect vulnerabilities but do not store your source code permanently. 
                    Scan results and metadata are retained for reporting purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">6. GitHub Integration</h2>
                  <p>
                    GhostOps integrates with GitHub via OAuth. By connecting your GitHub account, you grant us permission to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Read repository contents for scanning</li>
                    <li>Create pull requests with security fixes</li>
                    <li>Receive webhook notifications for repository events</li>
                    <li>Access your profile information</li>
                  </ul>
                  <p className="mt-2">
                    You can revoke these permissions at any time through your GitHub settings or by disconnecting in GhostOps settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">7. Intellectual Property</h2>
                  <p>
                    The GhostOps service, including its design, code, and content, is owned by us and protected by intellectual property laws. 
                    You may not copy, modify, or distribute our service without permission.
                  </p>
                  <p className="mt-2">
                    You retain all rights to your code and repositories. We claim no ownership over your content.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">8. Disclaimer of Warranties</h2>
                  <p>
                    GhostOps is provided "as is" without warranties of any kind. We do not guarantee that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>The service will be uninterrupted or error-free</li>
                    <li>All vulnerabilities will be detected</li>
                    <li>Automated fixes will work in all cases</li>
                    <li>The service will meet your specific requirements</li>
                  </ul>
                  <p className="mt-2">
                    You are responsible for reviewing and testing all suggested fixes before deploying to production.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">9. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, GhostOps shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages resulting from your use of the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">10. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate your account at any time for violations of these terms. 
                    You may terminate your account at any time by contacting us or using the account deletion feature.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">11. Changes to Terms</h2>
                  <p>
                    We may update these terms from time to time. We will notify you of significant changes via email or through the service. 
                    Continued use after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">12. Contact</h2>
                  <p>
                    If you have questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="mt-2 text-purple-400">
                    Email: legal@ghostops.dev<br />
                    GitHub: github.com/ghostops/ghost-ops
                  </p>
                </section>

                <div className="mt-8 p-4 rounded-lg bg-purple-950/30 border border-purple-500/30">
                  <p className="text-sm text-purple-300">
                    👻 By using GhostOps, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
