"use client"

import { motion } from "framer-motion"
import { Cookie, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function CookiesPage() {
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
                <Cookie className="w-8 h-8 text-purple-400" />
                <CardTitle className="text-3xl font-bold text-white">Cookie Policy</CardTitle>
              </div>
              <p className="text-slate-400">Last updated: December 3, 2024</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-purple max-w-none">
              <div className="space-y-6 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">1. What Are Cookies?</h2>
                  <p>
                    Cookies are small text files that are placed on your device when you visit a website. 
                    They help websites remember your preferences and improve your experience.
                  </p>
                  <p className="mt-2">
                    GhostOps uses cookies and similar technologies to provide, secure, and improve our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">2. Types of Cookies We Use</h2>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function and cannot be disabled. They include:
                  </p>
                  <div className="mt-3 p-4 rounded-lg bg-slate-800/50 border border-purple-500/20">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left py-2 text-purple-300">Cookie Name</th>
                          <th className="text-left py-2 text-purple-300">Purpose</th>
                          <th className="text-left py-2 text-purple-300">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-2 font-mono text-xs">ghostops_token</td>
                          <td className="py-2">Authentication session</td>
                          <td className="py-2">30 days</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-2 font-mono text-xs">ghostops_oauth_state</td>
                          <td className="py-2">OAuth CSRF protection</td>
                          <td className="py-2">10 minutes</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-xs">ghostops_preferences</td>
                          <td className="py-2">User settings and preferences</td>
                          <td className="py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.2 Analytics Cookies</h3>
                  <p>
                    These cookies help us understand how visitors use our website. They collect anonymous information about:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Pages visited and time spent</li>
                    <li>Features used and interactions</li>
                    <li>Error messages and performance issues</li>
                    <li>Browser type and device information</li>
                  </ul>
                  <p className="mt-2 text-sm text-slate-400">
                    You can opt out of analytics cookies in your browser settings.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.3 Functional Cookies</h3>
                  <p>
                    These cookies enable enhanced functionality and personalization:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Remember your login state</li>
                    <li>Save your dashboard preferences</li>
                    <li>Remember your theme selection (spooky mode)</li>
                    <li>Store your notification preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">3. Third-Party Cookies</h2>
                  <p>
                    We may use third-party services that set their own cookies:
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.1 GitHub</h3>
                  <p>
                    When you connect your GitHub account, GitHub may set cookies for authentication and session management. 
                    See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">GitHub's Privacy Policy</a> for details.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.2 Analytics Services</h3>
                  <p>
                    We may use analytics services (e.g., Google Analytics, Plausible) to understand usage patterns. 
                    These services may set their own cookies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">4. Cookie Security</h2>
                  <p>
                    We implement security measures to protect cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>HttpOnly:</strong> Prevents JavaScript access to sensitive cookies</li>
                    <li><strong>Secure:</strong> Cookies only sent over HTTPS in production</li>
                    <li><strong>SameSite:</strong> Protects against CSRF attacks</li>
                    <li><strong>Signed:</strong> Authentication cookies are cryptographically signed</li>
                    <li><strong>Encrypted:</strong> Sensitive data in cookies is encrypted</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">5. Managing Cookies</h2>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">5.1 Browser Settings</h3>
                  <p>
                    You can control cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                    <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                    <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">5.2 GhostOps Settings</h3>
                  <p>
                    You can manage some cookie preferences in your GhostOps account settings:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Analytics cookies (opt-in/opt-out)</li>
                    <li>Functional cookies for preferences</li>
                    <li>Session duration preferences</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">5.3 Impact of Disabling Cookies</h3>
                  <p>
                    If you disable cookies, some features may not work properly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You may need to log in more frequently</li>
                    <li>Your preferences won't be saved</li>
                    <li>Some features may be unavailable</li>
                    <li>The user experience may be degraded</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">6. Do Not Track</h2>
                  <p>
                    Some browsers have a "Do Not Track" (DNT) feature. Currently, there is no industry standard for how to respond to DNT signals. 
                    We do not currently respond to DNT signals, but we respect your privacy choices through our cookie settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">7. Updates to This Policy</h2>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                    We will notify you of significant changes by updating the "Last updated" date at the top of this page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">8. Contact Us</h2>
                  <p>
                    If you have questions about our use of cookies, please contact us at:
                  </p>
                  <p className="mt-2 text-purple-400">
                    Email: privacy@ghostops.dev<br />
                    GitHub: github.com/ghostops/ghost-ops
                  </p>
                </section>

                <div className="mt-8 p-4 rounded-lg bg-purple-950/30 border border-purple-500/30">
                  <p className="text-sm text-purple-300">
                    🍪 We use cookies to make GhostOps work better for you. By continuing to use our service, you consent to our use of cookies as described in this policy.
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
