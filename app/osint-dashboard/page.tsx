'use client'

import { useState } from 'react'
import TopNav from './components/top-nav'
import LeftSidebar from './components/left-sidebar'
import CenterPanel from './components/center-panel'
import RightPanel from './components/right-panel'
import TimelineBar from './components/timeline-bar'
import CommandInput from './components/command-input'

export default function OSINTDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-gray-300">
      <TopNav />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <CenterPanel />

        <RightPanel
          collapsed={rightPanelCollapsed}
          onToggleCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
        />
      </div>

      <TimelineBar />
      <CommandInput />
    </div>
  )
}
