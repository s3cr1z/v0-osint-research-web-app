"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Network, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", icon: Search, label: "Search", id: "search" },
    { href: "/graph", icon: Network, label: "Graph", id: "graph" },
    { href: "/cases", icon: FileText, label: "Cases", id: "cases" },
    { href: "/billing", icon: Settings, label: "Billing", id: "billing" },
  ]

  return (
    <aside className="w-64 border-r border-border/50 bg-sidebar flex flex-col">
      {/* Logo */}
      <Link
        href="/"
        className="h-16 border-b border-border/50 flex items-center gap-2 px-4 hover:bg-sidebar-accent transition"
      >
        <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
          Ⓘ
        </div>
        <span className="font-bold text-sidebar-foreground">OSINT</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto px-3 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname.startsWith(link.href)
          return (
            <Link key={link.id} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 p-4 space-y-2">
        <div className="text-xs text-sidebar-foreground/60">Internal Testing</div>
        <p className="text-xs text-sidebar-foreground/40">v0.1.0-alpha</p>
      </div>
    </aside>
  )
}
