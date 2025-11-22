'use client'

import { useState, useEffect } from 'react'
import TopNav from './components/top-nav'
import LeftSidebar from './components/left-sidebar'
import CenterPanel from './components/center-panel'
import RightPanel from './components/right-panel'
import TimelineBar from './components/timeline-bar'
import CommandInput from './components/command-input'

export default function OSINTDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Auto-collapse sidebars on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(true)
        setRightPanelCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-gray-300">
      <TopNav
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={isMobile}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <LeftSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
        />

        <CenterPanel />

        <RightPanel
          collapsed={rightPanelCollapsed}
          onToggleCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          isMobile={isMobile}
        />
      </div>

      <div className="hidden md:block">
        <TimelineBar />
      </div>
      <CommandInput />
    </div>
  )
}
