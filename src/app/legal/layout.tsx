import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}
