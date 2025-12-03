"use client"

import { ConsoleHeader } from "@/components/console/header"
import { ConsoleSidebar } from "@/components/console/sidebar"
import { SidebarProvider, useSidebar } from "@/components/console/sidebar-context"

function ConsoleLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <ConsoleHeader />

      <div className="flex pt-16">
        {/* Sidebar */}
        <ConsoleSidebar />

        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ConsoleLayoutContent>{children}</ConsoleLayoutContent>
    </SidebarProvider>
  )
}
