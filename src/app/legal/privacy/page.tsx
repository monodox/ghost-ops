"use client"

import { motion } from "framer-motion"
import { Shield, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PrivacyPage() {
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
                <Shield className="w-8 h-8 text-purple-400" />
                <CardTitle className="text-3xl font-bold text-white">Privacy Policy</CardTitle>
              </div>
              <p className="text-slate-400">Last updated: December 3, 2024</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-purple max-w-none">
              <div className="space-y-6 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
                  <p>
                    Welcome to GhostOps. We respect your privacy and are committed to protecting your personal data. 
                    This privacy policy explains how we collect, use, and safeguard your information when you use our security scanning service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 Account Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and email address</li>
                    <li>GitHub username and profile information</li>
                    <li>GitHub OAuth access tokens (encrypted)</li>
                    <li>Account preferences and settings</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.2 Repository Data</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Repository names and metadata</li>
                    <li>Code snippets for vulnerability analysis</li>
                    <li>Scan results and findings</li>
                    <li>Webhook events (push, pull request)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.3 Usage Data</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Log data (IP address, browser type, timestamps)</li>
                    <li>Feature usage and interactions</li>
                    <li>Scan frequency and patterns</li>
                    <li>Error reports and diagnostics</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                  <p>We use your information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and maintain our security scanning service</li>
                    <li>Analyze your code for vulnerabilities</li>
                    <li>Generate security reports and recommendations</li>
                    <li>Create automated pull requests with fixes</li>
                    <li>Send notifications about scan results</li>
                    <li>Improve our service and develop new features</li>
                    <li>Communicate with you about your account</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">4. Data Storage and Security</h2>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.1 Storage</h3>
                  <p>
                    Your data is stored securely on cloud infrastructure with industry-standard encryption. 
                    We do not permanently store your source code - only scan results and metadata.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.2 Security Measures</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Encryption in transit (HTTPS/TLS)</li>
                    <li>Encryption at rest for sensitive data</li>
                    <li>Secure token storage with HttpOnly cookies</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Webhook signature verification</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.3 Data Retention</h3>
                  <p>
                    We retain your data for as long as your account is active. Scan results are kept for 90 days. 
                    You can request deletion of your data at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">5. Data Sharing</h2>
                  <p>
                    We do not sell your personal data. We may share your information only in these circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>With your consent:</strong> When you explicitly authorize sharing</li>
                    <li><strong>Service providers:</strong> Third-party services that help us operate (e.g., hosting, analytics)</li>
                    <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">6. GitHub Integration</h2>
                  <p>
                    GhostOps uses GitHub OAuth for authentication. When you connect your GitHub account:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We receive an access token to access your repositories</li>
                    <li>We can read repository contents for scanning</li>
                    <li>We can create pull requests on your behalf</li>
                    <li>We receive webhook notifications for repository events</li>
                  </ul>
                  <p className="mt-2">
                    You can revoke these permissions at any time through GitHub settings or by disconnecting in GhostOps.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">7. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintain your login session</li>
                    <li>Remember your preferences</li>
                    <li>Analyze usage patterns</li>
                    <li>Improve user experience</li>
                  </ul>
                  <p className="mt-2">
                    See our <Link href="/legal/cookies" className="text-purple-400 hover:text-purple-300">Cookie Policy</Link> for more details.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">8. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Update or correct your information</li>
                    <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                    <li><strong>Export:</strong> Download your scan results and reports</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong>Revoke:</strong> Disconnect GitHub integration at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">9. Children's Privacy</h2>
                  <p>
                    GhostOps is not intended for users under 13 years of age. We do not knowingly collect personal information from children. 
                    If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">10. International Data Transfers</h2>
                  <p>
                    Your data may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">11. Changes to This Policy</h2>
                  <p>
                    We may update this privacy policy from time to time. We will notify you of significant changes via email or through the service. 
                    The "Last updated" date at the top indicates when the policy was last revised.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">12. Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy or want to exercise your rights, contact us at:
                  </p>
                  <p className="mt-2 text-purple-400">
                    Email: privacy@ghostops.dev<br />
                    GitHub: github.com/ghostops/ghost-ops
                  </p>
                </section>

                <div className="mt-8 p-4 rounded-lg bg-purple-950/30 border border-purple-500/30">
                  <p className="text-sm text-purple-300">
                    👻 Your privacy is important to us. We're committed to being transparent about how we handle your data.
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
