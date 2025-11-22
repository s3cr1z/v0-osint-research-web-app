import { SidebarNav } from '@/components/ui-agent/layout/sidebar-nav';
import { TopBar } from '@/components/ui-agent/layout/top-bar';
import { RightToolbar } from '@/components/ui-agent/layout/right-toolbar';
import { RightSidebar } from '@/components/ui-agent/layout/right-sidebar';
import { CaseDetailsPanel } from '@/components/ui-agent/panels/case-details-panel';
import { VisualizationPanel } from '@/components/ui-agent/panels/visualization-panel';
import { TimelinePanel } from '@/components/ui-agent/panels/timeline-panel';
import { CommandInput } from '@/components/ui-agent/command-input';

export default function OSINTAgentDashboard() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0A0A] flex flex-col">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Icon Sidebar */}
        <SidebarNav />

        {/* Case Details Panel */}
        <CaseDetailsPanel />

        {/* Main Visualization Area */}
        <VisualizationPanel />

        {/* Right Toolbar */}
        <RightToolbar />

        {/* Far Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Bottom Timeline */}
      <TimelinePanel />

      {/* Command Input */}
      <CommandInput />
    </div>
  );
}
