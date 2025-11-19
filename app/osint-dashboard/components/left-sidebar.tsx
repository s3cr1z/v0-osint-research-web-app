'use client'

import {
  Home,
  User,
  Map,
  MessageCircle,
  Database,
  Globe,
  Link,
  FileText,
  Activity,
  Target,
  Eye,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NavItem {
  icon: React.ElementType
  label: string
  badge?: number
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Overview', active: true },
  { icon: User, label: 'Subjects', badge: 3 },
  { icon: Map, label: 'Geolocation' },
  { icon: MessageCircle, label: 'Communications', badge: 12 },
  { icon: Database, label: 'Data Sources' },
  { icon: Globe, label: 'Web Intelligence' },
  { icon: Link, label: 'Connections' },
  { icon: FileText, label: 'Documents' },
  { icon: Activity, label: 'Timeline' },
  { icon: Target, label: 'Targets', badge: 2 },
  { icon: Eye, label: 'Surveillance' },
  { icon: AlertTriangle, label: 'Alerts', badge: 5 },
]

interface LeftSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function LeftSidebar({ collapsed, onToggleCollapse }: LeftSidebarProps) {
  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-gray-800 bg-gray-950 transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-gray-800 bg-gray-950 hover:bg-gray-800"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-2 pt-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              item.active
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant="outline"
                    className="h-5 border-red-500/30 bg-red-500/20 px-2 text-[11px] text-red-400"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </button>
        ))}
      </nav>
    </aside>
  )
}
