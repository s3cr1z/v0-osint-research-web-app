```markdown project="OSINT Dashboard Implementation" file="CLAUDE_CODE_INSTRUCTIONS.md" type="code"

## Overview
This document provides pixel-perfect specifications for implementing an OSINT (Open Source Intelligence) investigation dashboard. The implementation uses Next.js 15, Tailwind CSS v4, shadcn/ui, and Rete.js for the node-based canvas visualization.

---

## 1. PROJECT SETUP

### Initialize Project
```bash
npx create-next-app@latest osint-dashboard --typescript --tailwind --eslint --app --src-dir
cd osint-dashboard
```

### Install Dependencies

```bash
# Core UI
npm install @radix-ui/react-icons lucide-react class-variance-authority clsx tailwind-merge

# shadcn/ui setup
npx shadcn@latest init
npx shadcn@latest add button badge card avatar dropdown-menu tooltip tabs scroll-area separator input

# Rete.js for node graph
npm install rete rete-area-plugin rete-connection-plugin rete-react-plugin rete-render-utils rete-auto-arrange-plugin

# Charts and Visualizations
npm install recharts d3-sankey @types/d3-sankey

# Date handling
npm install date-fns
```

-----

## 2. EXACT COLOR SYSTEM

### globals.css Configuration

```css
@import 'tailwindcss';

@theme inline {
  /* Font families */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* === EXACT COLOR TOKENS FROM SCREENSHOT === */
  
  /* Backgrounds */
  --color-bg-base: #0A0A0A;
  --color-bg-surface: #111111;
  --color-bg-elevated: #1A1A1A;
  --color-bg-card: #1E1E1E;
  --color-bg-input: #252525;
  --color-bg-hover: #2A2A2A;
  
  /* Borders */
  --color-border-default: #2E2E2E;
  --color-border-subtle: #222222;
  --color-border-strong: #404040;
  
  /* Text */
  --color-text-primary: #F5F5F5;
  --color-text-secondary: #A3A3A3;
  --color-text-muted: #737373;
  --color-text-disabled: #525252;
  
  /* Status Colors */
  --color-critical: #E85D4C;
  --color-critical-bg: rgba(232, 93, 76, 0.15);
  --color-warning: #F59E0B;
  --color-warning-bg: rgba(245, 158, 11, 0.15);
  --color-success: #22C55E;
  --color-success-bg: rgba(34, 197, 94, 0.15);
  --color-info: #3B82F6;
  --color-info-bg: rgba(59, 130, 246, 0.15);
  
  /* Accent Colors */
  --color-accent-green: #4ADE80;
  --color-accent-teal: #2DD4BF;
  --color-accent-cyan: #22D3EE;
  --color-accent-blue: #60A5FA;
  
  /* Sankey Diagram Colors */
  --color-sankey-red: #8B5A5A;
  --color-sankey-red-dark: #6B4444;
  --color-sankey-green: #5A8B6A;
  --color-sankey-green-dark: #446B54;
  --color-sankey-gray: #6B7280;
  --color-sankey-gray-dark: #4B5563;
  
  /* Risk Level Colors */
  --color-risk-very-high: #EF4444;
  --color-risk-high: #F97316;
  --color-risk-medium: #EAB308;
  --color-risk-low: #22C55E;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
}

/* Base styles */
* {
  border-color: var(--color-border-default);
}

body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}
```

-----

## 3. PROJECT FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── sidebar-nav.tsx          # Left icon sidebar
│   │   ├── top-bar.tsx              # Top navigation bar
│   │   ├── right-toolbar.tsx        # Right action toolbar
│   │   └── right-sidebar.tsx        # Far right icons
│   ├── panels/
│   │   ├── case-details-panel.tsx   # Left case information panel
│   │   ├── visualization-panel.tsx  # Main Sankey/canvas area
│   │   └── timeline-panel.tsx       # Bottom timeline
│   ├── case/
│   │   ├── case-header.tsx          # Case ID, date, risk badge
│   │   ├── case-metadata.tsx        # Assigned to, source, threat info
│   │   ├── trigger-rule.tsx         # Green highlighted rule
│   │   └── source-person.tsx        # Person avatar and view source
│   ├── visualizations/
│   │   ├── sankey-diagram.tsx       # D3 Sankey visualization
│   │   ├── risk-donut.tsx           # 47% donut chart
│   │   └── activity-timeline.tsx    # Bar chart timeline
│   ├── rete/
│   │   ├── editor.tsx               # Main Rete.js editor
│   │   ├── nodes/
│   │   │   ├── person-node.tsx
│   │   │   ├── location-node.tsx
│   │   │   ├── event-node.tsx
│   │   │   ├── entity-node.tsx
│   │   │   └── threat-node.tsx
│   │   ├── sockets.tsx
│   │   └── connections.tsx
│   ├── ui/                          # shadcn components
│   └── command-input.tsx            # Bottom input bar
├── lib/
│   ├── utils.ts
│   ├── rete-config.ts
│   └── mock-data.ts
└── types/
    └── index.ts
```

-----

## 4. EXACT LAYOUT SPECIFICATIONS

### Main Layout Grid

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           TOP BAR (56px)                                │
├────┬────────────────────────────────────────────────────────────┬───┬───┤
│    │                                                            │   │   │
│ 56 │              CASE DETAILS              VISUALIZATION       │48 │48 │
│ px │              PANEL (420px)             PANEL (flex-1)      │px │px │
│    │                                                            │   │   │
│    │                                                            │   │   │
│ S  │                                                            │ T │ R │
│ I  │                                                            │ O │ I │
│ D  │                                                            │ O │ G │
│ E  │                                                            │ L │ H │
│ B  │                                                            │ B │ T │
│ A  │                                                            │ A │   │
│ R  │                                                            │ R │ S │
│    │                                                            │   │ I │
│    │                                                            │   │ D │
│    │                                                            │   │ E │
├────┴────────────────────────────────────────────────────────────┴───┴───┤
│                        TIMELINE PANEL (140px)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                        COMMAND INPUT (56px)                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Exact Dimensions

```typescript
const LAYOUT = {
  topBar: {
    height: 56,
    padding: '0 16px',
  },
  leftSidebar: {
    width: 56,
    iconSize: 24,
    iconPadding: 16,
  },
  casePanel: {
    width: 420,
    padding: 16,
  },
  rightToolbar: {
    width: 48,
    iconSize: 20,
    gap: 4,
  },
  rightSidebar: {
    width: 48,
    iconSize: 20,
  },
  timeline: {
    height: 140,
    controlsHeight: 40,
  },
  commandInput: {
    height: 56,
    padding: '0 16px',
  },
};
```

-----

## 5. COMPONENT IMPLEMENTATIONS

### 5.1 Main Layout (app/page.tsx)

```tsx
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { TopBar } from '@/components/layout/top-bar';
import { RightToolbar } from '@/components/layout/right-toolbar';
import { RightSidebar } from '@/components/layout/right-sidebar';
import { CaseDetailsPanel } from '@/components/panels/case-details-panel';
import { VisualizationPanel } from '@/components/panels/visualization-panel';
import { TimelinePanel } from '@/components/panels/timeline-panel';
import { CommandInput } from '@/components/command-input';

export default function Dashboard() {
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
```

### 5.2 Top Bar Component

```tsx
// components/layout/top-bar.tsx
'use client';

import { ChevronDown, AlertCircle, Users, MapPin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function TopBar() {
  return (
    <header className="h-14 border-b border-[#2E2E2E] bg-[#111111] flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="w-8 h-8 rounded-md bg-[#1E1E1E] flex items-center justify-center">
          <span className="text-[#F5F5F5] font-semibold text-sm">W</span>
        </div>
        
        {/* Investigation Dropdown */}
        <button className="flex items-center gap-2 text-[#F5F5F5] hover:text-white transition-colors">
          <span className="text-sm font-medium">Investigation</span>
          <ChevronDown className="h-4 w-4 text-[#737373]" />
        </button>
        
        {/* Metrics Badges */}
        <div className="flex items-center gap-4 ml-4">
          <MetricBadge 
            icon={AlertCircle} 
            count={3} 
            label="top alerts" 
          />
          <MetricBadge 
            icon={Users} 
            count={2} 
            label="top entities" 
          />
          <MetricBadge 
            icon={MapPin} 
            count={1} 
            label="top location" 
          />
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Progress Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#A3A3A3]">83%</span>
          <div className="w-6 h-6 rounded-full border-2 border-[#F59E0B] border-t-transparent animate-spin" />
        </div>
        
        {/* User Avatar */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32&query=user+avatar" />
          <AvatarFallback className="bg-[#2A2A2A] text-[#F5F5F5]">JM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function MetricBadge({ 
  icon: Icon, 
  count, 
  label 
}: { 
  icon: React.ElementType; 
  count: number; 
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[#A3A3A3]">
      <Icon className="h-4 w-4" />
      <span className="text-sm">
        <span className="text-[#F5F5F5] font-medium">{count}</span> {label}
      </span>
    </div>
  );
}
```

### 5.3 Left Sidebar Navigation

```tsx
// components/layout/sidebar-nav.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, Network, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { id: 'chat', icon: MessageCircle, label: 'Chat', active: true },
  { id: 'network', icon: Network, label: 'Network Graph' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function SidebarNav() {
  const [activeItem, setActiveItem] = useState('chat');

  return (
    <TooltipProvider delayDuration={0}>
      <nav className="w-14 bg-[#111111] border-r border-[#2E2E2E] flex flex-col items-center py-4 gap-2">
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
                  activeItem === item.id
                    ? 'bg-[#4ADE80] text-[#0A0A0A]'
                    : 'text-[#737373] hover:text-[#F5F5F5] hover:bg-[#1E1E1E]'
                )}
              >
                <item.icon className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#1E1E1E] border-[#2E2E2E] text-[#F5F5F5]">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}
```

### 5.4 Case Details Panel

```tsx
// components/panels/case-details-panel.tsx
'use client';

import { CaseHeader } from '@/components/case/case-header';
import { CaseMetadata } from '@/components/case/case-metadata';
import { TriggerRule } from '@/components/case/trigger-rule';
import { SourcePerson } from '@/components/case/source-person';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CaseDetailsPanel() {
  return (
    <aside className="w-[420px] bg-[#111111] border-r border-[#2E2E2E] flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <CaseHeader />
          <CaseMetadata />
          <TriggerRule />
          <SourcePerson />
        </div>
      </ScrollArea>
    </aside>
  );
}
```

### 5.5 Case Header Component

```tsx
// components/case/case-header.tsx
'use client';

import { ChevronDown, MoreVertical, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function CaseHeader() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-4">
      {/* Case ID and Date Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#A3A3A3]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span className="text-sm font-medium text-[#F5F5F5]">#99696</span>
          </div>
        </div>
        <span className="text-sm text-[#737373]">12 Sep 2024 1:24pm</span>
      </div>

      {/* Policy Risk Score Row */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <label className="text-xs text-[#737373]">Policy risk score</label>
          <Badge 
            className="bg-[#E85D4C] hover:bg-[#E85D4C] text-white font-medium px-3 py-1"
          >
            Critical
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 bg-transparent border-[#2E2E2E] text-[#F5F5F5] hover:bg-[#2A2A2A] gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Alert
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-[#737373] hover:text-[#F5F5F5] hover:bg-[#2A2A2A]"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Assigned To */}
      <div className="space-y-1">
        <label className="text-xs text-[#737373]">Assigned to</label>
        <p className="text-sm text-[#F5F5F5]">Jonathan Murphy</p>
      </div>

      {/* Summary */}
      <div className="space-y-1">
        <label className="text-xs text-[#737373]">Summary</label>
        <div className="bg-[#252525] rounded-md px-3 py-2 border border-[#2E2E2E]">
          <input
            type="text"
            defaultValue="Suspicious person watching JC homes"
            className="w-full bg-transparent text-sm text-[#F5F5F5] outline-none"
          />
        </div>
      </div>
    </div>
  );
}
```

### 5.6 Case Metadata Component

```tsx
// components/case/case-metadata.tsx
'use client';

import { Facebook } from 'lucide-react';

export function CaseMetadata() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-4">
      {/* Source Type and Source */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-[#737373]">Source type</label>
          <p className="text-sm text-[#F5F5F5]">Social media</p>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[#737373]">Source</label>
          <div className="flex items-center gap-2">
            <Facebook className="h-4 w-4 text-[#1877F2]" />
            <span className="text-sm text-[#F5F5F5]">Facebook</span>
          </div>
        </div>
      </div>

      {/* Reference Threat and Use Case */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-[#737373]">Reference threat</label>
          <p className="text-sm text-[#F5F5F5]">Hate crime</p>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[#737373]">Reference use case</label>
          <p className="text-sm text-[#F5F5F5]">Physical harm to JC members</p>
        </div>
      </div>
    </div>
  );
}
```

### 5.7 Trigger Rule Component

```tsx
// components/case/trigger-rule.tsx
'use client';

export function TriggerRule() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4">
      <label className="text-xs text-[#737373] block mb-2">Trigger rule</label>
      <p className="text-sm">
        <span className="text-[#4ADE80] font-medium">[+5 keywords]</span>
        <span className="text-[#F5F5F5]"> in a </span>
        <span className="text-[#4ADE80] font-medium">[Post]</span>
        <span className="text-[#F5F5F5]"> on </span>
        <span className="text-[#4ADE80] font-medium">[Source of Interest]</span>
      </p>
    </div>
  );
}
```

### 5.8 Source Person Component

```tsx
// components/case/source-person.tsx
'use client';

import { ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function SourcePerson() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 grayscale">
            <AvatarImage src="/placeholder.svg?height=40&width=40&query=person+portrait" />
            <AvatarFallback className="bg-[#2A2A2A] text-[#F5F5F5]">TC</AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#F5F5F5]">Timothée Chalamet</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-[#A3A3A3] hover:text-[#F5F5F5] gap-2"
        >
          View source
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
```

### 5.9 Right Toolbar Component

```tsx
// components/layout/right-toolbar.tsx
'use client';

import { 
  MousePointer2, 
  Move, 
  Pause, 
  RotateCcw, 
  Download, 
  Filter, 
  Settings,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const topTools = [
  { id: 'select', icon: MousePointer2, active: true },
  { id: 'pan', icon: Move },
  { id: 'pause', icon: Pause },
  { id: 'undo', icon: RotateCcw },
  { id: 'download', icon: Download },
  { id: 'filter', icon: Filter },
  { id: 'settings', icon: Settings },
];

const zoomTools = [
  { id: 'zoom-in', icon: Plus },
  { id: 'zoom-out', icon: Minus },
];

export function RightToolbar() {
  return (
    <div className="w-12 bg-[#111111] border-l border-[#2E2E2E] flex flex-col items-center py-4">
      {/* Main Tools */}
      <div className="flex flex-col items-center gap-1">
        {topTools.map((tool) => (
          <button
            key={tool.id}
            className={cn(
              'w-8 h-8 rounded-md flex items-center justify-center transition-all',
              tool.active
                ? 'bg-[#2A2A2A] text-[#F5F5F5]'
                : 'text-[#737373] hover:text-[#F5F5F5] hover:bg-[#1E1E1E]'
            )}
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      <Separator className="my-4 w-6 bg-[#2E2E2E]" />

      {/* Zoom Controls */}
      <div className="flex flex-col items-center gap-1">
        {zoomTools.map((tool) => (
          <button
            key={tool.id}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[#737373] hover:text-[#F5F5F5] hover:bg-[#1E1E1E] transition-all"
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 5.10 Right Sidebar Component

```tsx
// components/layout/right-sidebar.tsx
'use client';

import { Clock, PlusCircle } from 'lucide-react';

export function RightSidebar() {
  return (
    <div className="w-12 bg-[#0A0A0A] border-l border-[#2E2E2E] flex flex-col items-center py-4 gap-4">
      <button className="w-8 h-8 rounded-md flex items-center justify-center text-[#737373] hover:text-[#F5F5F5] hover:bg-[#1E1E1E] transition-all">
        <Clock className="h-5 w-5" />
      </button>
      <button className="w-8 h-8 rounded-md flex items-center justify-center text-[#737373] hover:text-[#F5F5F5] hover:bg-[#1E1E1E] transition-all">
        <PlusCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
```

-----

## 6. SANKEY DIAGRAM IMPLEMENTATION

### 6.1 Sankey Diagram Component

```tsx
// components/visualizations/sankey-diagram.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyGraph } from 'd3-sankey';

interface SankeyNode {
  name: string;
  category: string;
  impact?: string;
  risk?: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

const sankeyData = {
  nodes: [
    // Sources (left)
    { name: 'Hate Crime', category: 'source' },
    { name: 'Standard Crime', category: 'source' },
    // Targets (right)
    { name: 'Physical harm to JC members', category: 'target', impact: 'Very High Impact', risk: 28 },
    { name: 'Harassment', category: 'target', impact: 'Low Impact', risk: 44 },
    { name: 'Economic impact to JC businesses', category: 'target', impact: 'Medium Impact', risk: 42 },
    { name: 'Property Crime', category: 'target', impact: 'High Impact', risk: 52 },
    { name: 'Vice', category: 'target', impact: 'Medium Impact', risk: 40 },
    { name: 'Petty Crime', category: 'target', impact: 'Low Impact', risk: 35 },
  ],
  links: [
    // Hate Crime connections
    { source: 0, target: 2, value: 30 },
    { source: 0, target: 3, value: 20 },
    { source: 0, target: 4, value: 25 },
    // Standard Crime connections
    { source: 1, target: 2, value: 25 },
    { source: 1, target: 5, value: 35 },
    { source: 1, target: 6, value: 20 },
    { source: 1, target: 7, value: 15 },
  ],
};

export function SankeyDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 200, bottom: 20, left: 20 };

    const sankeyGenerator = sankey<SankeyNode, SankeyLink>()
      .nodeWidth(20)
      .nodePadding(24)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const { nodes, links } = sankeyGenerator({
      nodes: sankeyData.nodes.map((d) => ({ ...d })),
      links: sankeyData.links.map((d) => ({ ...d })),
    });

    // Draw links
    svg
      .append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d) => {
        const sourceNode = d.source as SankeyNode;
        return sourceNode.name === 'Hate Crime' ? '#8B5A5A' : '#5A8B6A';
      })
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', (d) => Math.max(1, d.width || 0))
      .style('mix-blend-mode', 'screen');

    // Draw nodes
    svg
      .append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', (d) => d.x0 || 0)
      .attr('y', (d) => d.y0 || 0)
      .attr('height', (d) => (d.y1 || 0) - (d.y0 || 0))
      .attr('width', (d) => (d.x1 || 0) - (d.x0 || 0))
      .attr('fill', (d) => {
        if (d.category === 'source') {
          return d.name === 'Hate Crime' ? '#6B4444' : '#446B54';
        }
        return '#2E2E2E';
      })
      .attr('rx', 2);

    // Draw node labels
    svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', (d) => (d.x0 || 0) < width / 2 ? (d.x0 || 0) - 8 : (d.x1 || 0) + 8)
      .attr('y', (d) => ((d.y1 || 0) + (d.y0 || 0)) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d) => (d.x0 || 0) < width / 2 ? 'end' : 'start')
      .attr('fill', '#F5F5F5')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .text((d) => d.name);

    // Draw impact/risk labels for target nodes
    svg
      .append('g')
      .selectAll('text.impact')
      .data(nodes.filter((n) => n.category === 'target'))
      .join('text')
      .attr('class', 'impact')
      .attr('x', (d) => (d.x1 || 0) + 8)
      .attr('y', (d) => ((d.y1 || 0) + (d.y0 || 0)) / 2 + 14)
      .attr('fill', (d) => {
        const impact = d.impact || '';
        if (impact.includes('Very High')) return '#EF4444';
        if (impact.includes('High')) return '#F97316';
        if (impact.includes('Medium')) return '#EAB308';
        return '#22C55E';
      })
      .attr('font-size', '11px')
      .text((d) => `${d.impact}, Risk ${d.risk}%`);

  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
```

### 6.2 Risk Donut Chart

```tsx
// components/visualizations/risk-donut.tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Risk', value: 47 },
  { name: 'Safe', value: 53 },
];

const COLORS = ['#4ADE80', '#1E1E1E'];

export function RiskDonut() {
  return (
    <div className="relative w-32 h-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={50}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold text-[#F5F5F5]">47%</span>
      </div>
    </div>
  );
}
```

-----

## 7. TIMELINE PANEL IMPLEMENTATION

```tsx
// components/panels/timeline-panel.tsx
'use client';

import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Minus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Mock activity data - heights represent activity levels
const activityData = Array.from({ length: 365 }, () => Math.random() * 100);

export function TimelinePanel() {
  return (
    <div className="h-[140px] bg-[#111111] border-t border-[#2E2E2E] flex flex-col">
      {/* Controls Bar */}
      <div className="h-10 border-b border-[#2E2E2E] flex items-center justify-center gap-2 px-4">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#737373] hover:text-[#F5F5F5]">
          <ChevronLeft className="h-4 w-4" />
          <ChevronLeft className="h-4 w-4 -ml-2" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#737373] hover:text-[#F5F5F5]">
          <Play className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#737373] hover:text-[#F5F5F5]">
          <ChevronRight className="h-4 w-4" />
          <ChevronRight className="h-4 w-4 -ml-2" />
        </Button>
        
        <div className="w-px h-4 bg-[#2E2E2E] mx-2" />
        
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#737373] hover:text-[#F5F5F5]">
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-4 bg-[#2E2E2E] mx-2" />
        
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#737373] hover:text-[#F5F5F5]">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#737373] hover:text-[#F5F5F5]">
          <Minus className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-4 bg-[#2E2E2E] mx-2" />
        
        <Button variant="ghost" size="sm" className="h-7 text-[#A3A3A3] hover:text-[#F5F5F5] gap-1">
          2024
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>

      {/* Timeline Visualization */}
      <div className="flex-1 relative overflow-hidden">
        {/* Activity Bars */}
        <div className="absolute inset-0 flex items-end px-4 pb-6">
          {activityData.slice(0, 300).map((height, index) => (
            <div
              key={index}
              className="flex-1 min-w-[2px] mx-[1px] bg-[#737373] rounded-t-sm transition-all hover:bg-[#A3A3A3]"
              style={{ height: `${Math.max(4, height * 0.6)}%` }}
            />
          ))}
        </div>

        {/* Current Position Indicator */}
        <div 
          className="absolute top-0 bottom-6 w-0.5 bg-[#2DD4BF]"
          style={{ left: '75%' }}
        />

        {/* Month Labels */}
        <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center px-4">
          {months.map((month, index) => (
            <div 
              key={month} 
              className="flex-1 text-center text-xs text-[#737373]"
            >
              {month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

-----

## 8. COMMAND INPUT COMPONENT

```tsx
// components/command-input.tsx
'use client';

import { useState } from 'react';

export function CommandInput() {
  const [value, setValue] = useState('');

  return (
    <div className="h-14 bg-[#0A0A0A] border-t border-[#2E2E2E] px-4 py-2">
      <div className="h-full bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] px-4 flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your request here..."
          className="flex-1 bg-transparent text-sm text-[#F5F5F5] placeholder-[#525252] outline-none"
        />
      </div>
    </div>
  );
}
```

-----

## 9. VISUALIZATION PANEL WITH RETE.JS

```tsx
// components/panels/visualization-panel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { SankeyDiagram } from '@/components/visualizations/sankey-diagram';
import { RiskDonut } from '@/components/visualizations/risk-donut';

export function VisualizationPanel() {
  const [viewMode, setViewMode] = useState<'sankey' | 'rete'>('sankey');

  return (
    <main className="flex-1 bg-[#0A0A0A] relative overflow-hidden">
      {/* Category Headers */}
      <div className="absolute left-8 top-8 space-y-4 z-10">
        <h3 className="text-sm font-medium text-[#F5F5F5]">Hate Crime</h3>
      </div>
      <div className="absolute left-8 top-[45%] space-y-4 z-10">
        <h3 className="text-sm font-medium text-[#F5F5F5]">Standard Crime</h3>
      </div>

      {/* Sankey Diagram */}
      <div className="absolute inset-0">
        <SankeyDiagram />
      </div>

      {/* Donut Chart */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <RiskDonut />
      </div>
    </main>
  );
}
```

-----

## 10. RETE.JS NODE IMPLEMENTATIONS

### 10.1 Rete Editor Setup

```tsx
// components/rete/editor.tsx
'use client';

import { useEffect, useRef } from 'react';
import { NodeEditor, GetSchemes, ClassicPreset } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { ReactPlugin, Presets, ReactArea2D } from 'rete-react-plugin';
import { createRoot } from 'react-dom/client';
import { PersonNode, PersonNodeComponent } from './nodes/person-node';
import { LocationNode, LocationNodeComponent } from './nodes/location-node';
import { EventNode, EventNodeComponent } from './nodes/event-node';
import { ThreatNode, ThreatNodeComponent } from './nodes/threat-node';

type Schemes = GetSchemes<
  PersonNode | LocationNode | EventNode | ThreatNode,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

export function ReteEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<NodeEditor<Schemes> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    async function createEditor() {
      const editor = new NodeEditor<Schemes>();
      const area = new AreaPlugin<Schemes, AreaExtra>(container);
      const connection = new ConnectionPlugin<Schemes, AreaExtra>();
      const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

      editor.use(area);
      area.use(connection);
      area.use(render);

      connection.addPreset(ConnectionPresets.classic.setup());

      render.addPreset(
        Presets.classic.setup({
          customize: {
            node(context) {
              if (context.payload instanceof PersonNode) {
                return PersonNodeComponent;
              }
              if (context.payload instanceof LocationNode) {
                return LocationNodeComponent;
              }
              if (context.payload instanceof EventNode) {
                return EventNodeComponent;
              }
              if (context.payload instanceof ThreatNode) {
                return ThreatNodeComponent;
              }
              return Presets.classic.Node;
            },
          },
        })
      );

      AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
      });

      AreaExtensions.simpleNodesOrder(area);

      // Add sample nodes
      const personNode = new PersonNode();
      personNode.setData({
        name: 'Timothée Chalamet',
        age: 28,
        nationality: 'France',
        occupation: 'Actor',
      });
      await editor.addNode(personNode);
      await area.translate(personNode.id, { x: 100, y: 100 });

      const locationNode = new LocationNode();
      locationNode.setData({
        address: 'Briggs St, Caulfield',
        coords: '-37.8765, 145.0182',
      });
      await editor.addNode(locationNode);
      await area.translate(locationNode.id, { x: 400, y: 100 });

      const threatNode = new ThreatNode();
      threatNode.setData({
        type: 'Hate Crime',
        severity: 'Critical',
        description: 'Suspicious surveillance of JC community homes',
      });
      await editor.addNode(threatNode);
      await area.translate(threatNode.id, { x: 250, y: 300 });

      // Create connections
      await editor.addConnection(
        new ClassicPreset.Connection(personNode, 'out', threatNode, 'in')
      );
      await editor.addConnection(
        new ClassicPreset.Connection(locationNode, 'out', threatNode, 'in')
      );

      AreaExtensions.zoomAt(area, editor.getNodes());

      editorRef.current = editor;

      return () => {
        area.destroy();
      };
    }

    createEditor();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        background: `
          radial-gradient(circle at 1px 1px, #2E2E2E 1px, transparent 0)
        `,
        backgroundSize: '24px 24px',
      }}
    />
  );
}
```

### 10.2 Person Node

```tsx
// components/rete/nodes/person-node.tsx
'use client';

import { ClassicPreset } from 'rete';
import { User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const socket = new ClassicPreset.Socket('osint');

interface PersonData {
  name: string;
  age: number;
  nationality: string;
  occupation: string;
  image?: string;
}

export class PersonNode extends ClassicPreset.Node<
  { in: ClassicPreset.Socket },
  { out: ClassicPreset.Socket },
  {}
> {
  width = 260;
  height = 180;
  data: PersonData = { name: '', age: 0, nationality: '', occupation: '' };

  constructor() {
    super('Person');
    this.addInput('in', new ClassicPreset.Input(socket, 'In', true));
    this.addOutput('out', new ClassicPreset.Output(socket, 'Out', true));
  }

  setData(data: PersonData) {
    this.data = data;
  }
}

export function PersonNodeComponent({ data }: { data: PersonNode }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg overflow-hidden shadow-xl min-w-[260px]">
      {/* Header */}
      <div className="bg-[#252525] px-4 py-3 flex items-center gap-3 border-b border-[#2E2E2E]">
        <div className="w-8 h-8 rounded-md bg-[#3B82F6]/20 flex items-center justify-center">
          <User className="h-4 w-4 text-[#60A5FA]" />
        </div>
        <span className="text-sm font-medium text-[#F5F5F5]">Person</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 grayscale">
            <AvatarImage src={data.data.image || '/placeholder.svg?height=48&width=48&query=person'} />
            <AvatarFallback className="bg-[#2A2A2A] text-[#F5F5F5]">
              {data.data.name?.slice(0, 2).toUpperCase() || 'P'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-[#F5F5F5]">{data.data.name || 'Unknown'}</div>
            <div className="text-xs text-[#737373]">Age: {data.data.age || 'N/A'}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[#737373]">Nationality:</span>
            <span className="text-[#A3A3A3] ml-1">{data.data.nationality}</span>
          </div>
          <div>
            <span className="text-[#737373]">Occupation:</span>
            <span className="text-[#A3A3A3] ml-1">{data.data.occupation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 10.3 Location Node

```tsx
// components/rete/nodes/location-node.tsx
'use client';

import { ClassicPreset } from 'rete';
import { MapPin } from 'lucide-react';

const socket = new ClassicPreset.Socket('osint');

interface LocationData {
  address: string;
  coords: string;
  type?: string;
}

export class LocationNode extends ClassicPreset.Node<
  { in: ClassicPreset.Socket },
  { out: ClassicPreset.Socket },
  {}
> {
  width = 240;
  height = 140;
  data: LocationData = { address: '', coords: '' };

  constructor() {
    super('Location');
    this.addInput('in', new ClassicPreset.Input(socket, 'In', true));
    this.addOutput('out', new ClassicPreset.Output(socket, 'Out', true));
  }

  setData(data: LocationData) {
    this.data = data;
  }
}

export function LocationNodeComponent({ data }: { data: LocationNode }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg overflow-hidden shadow-xl min-w-[240px]">
      {/* Header */}
      <div className="bg-[#252525] px-4 py-3 flex items-center gap-3 border-b border-[#2E2E2E]">
        <div className="w-8 h-8 rounded-md bg-[#22C55E]/20 flex items-center justify-center">
          <MapPin className="h-4 w-4 text-[#4ADE80]" />
        </div>
        <span className="text-sm font-medium text-[#F5F5F5]">Location</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="text-sm text-[#F5F5F5]">{data.data.address || 'Unknown location'}</div>
        <div className="text-xs text-[#737373]">{data.data.coords}</div>
        <button className="text-xs text-[#60A5FA] hover:text-[#93C5FD] transition-colors">
          View on map →
        </button>
      </div>
    </div>
  );
}
```

### 10.4 Event Node

```tsx
// components/rete/nodes/event-node.tsx
'use client';

import { ClassicPreset } from 'rete';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const socket = new ClassicPreset.Socket('osint');

interface EventData {
  title: string;
  timestamp: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export class EventNode extends ClassicPreset.Node<
  { in: ClassicPreset.Socket },
  { out: ClassicPreset.Socket },
  {}
> {
  width = 260;
  height = 160;
  data: EventData = { title: '', timestamp: '', type: '', severity: 'Low' };

  constructor() {
    super('Event');
    this.addInput('in', new ClassicPreset.Input(socket, 'In', true));
    this.addOutput('out', new ClassicPreset.Output(socket, 'Out', true));
  }

  setData(data: EventData) {
    this.data = data;
  }
}

const severityColors = {
  Low: 'bg-[#22C55E] text-white',
  Medium: 'bg-[#EAB308] text-black',
  High: 'bg-[#F97316] text-white',
  Critical: 'bg-[#EF4444] text-white',
};

export function EventNodeComponent({ data }: { data: EventNode }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg overflow-hidden shadow-xl min-w-[260px]">
      {/* Header */}
      <div className="bg-[#252525] px-4 py-3 flex items-center gap-3 border-b border-[#2E2E2E]">
        <div className="w-8 h-8 rounded-md bg-[#F59E0B]/20 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-[#FBBF24]" />
        </div>
        <span className="text-sm font-medium text-[#F5F5F5]">Event</span>
        <Badge className={`ml-auto ${severityColors[data.data.severity]}`}>
          {data.data.severity}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="text-sm font-medium text-[#F5F5F5]">{data.data.title || 'Untitled Event'}</div>
        <div className="text-xs text-[#737373]">{data.data.timestamp}</div>
        <div className="text-xs text-[#A3A3A3]">Type: {data.data.type}</div>
      </div>
    </div>
  );
}
```

### 10.5 Threat Node

```tsx
// components/rete/nodes/threat-node.tsx
'use client';

import { ClassicPreset } from 'rete';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const socket = new ClassicPreset.Socket('osint');

interface ThreatData {
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
}

export class ThreatNode extends ClassicPreset.Node<
  { in: ClassicPreset.Socket },
  { out: ClassicPreset.Socket },
  {}
> {
  width = 280;
  height = 180;
  data: ThreatData = { type: '', severity: 'Low', description: '' };

  constructor() {
    super('Threat');
    this.addInput('in', new ClassicPreset.Input(socket, 'In', true));
    this.addOutput('out', new ClassicPreset.Output(socket, 'Out', true));
  }

  setData(data: ThreatData) {
    this.data = data;
  }
}

const severityColors = {
  Low: { bg: 'bg-[#22C55E]/20', text: 'text-[#4ADE80]', badge: 'bg-[#22C55E]' },
  Medium: { bg: 'bg-[#EAB308]/20', text: 'text-[#FBBF24]', badge: 'bg-[#EAB308]' },
  High: { bg: 'bg-[#F97316]/20', text: 'text-[#FB923C]', badge: 'bg-[#F97316]' },
  Critical: { bg: 'bg-[#EF4444]/20', text: 'text-[#F87171]', badge: 'bg-[#E85D4C]' },
};

export function ThreatNodeComponent({ data }: { data: ThreatNode }) {
  const colors = severityColors[data.data.severity];

  return (
    <div className={`bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg overflow-hidden shadow-xl min-w-[280px] ${
      data.data.severity === 'Critical' ? 'border-[#E85D4C]/50' : ''
    }`}>
      {/* Header */}
      <div className="bg-[#252525] px-4 py-3 flex items-center gap-3 border-b border-[#2E2E2E]">
        <div className={`w-8 h-8 rounded-md ${colors.bg} flex items-center justify-center`}>
          <AlertTriangle className={`h-4 w-4 ${colors.text}`} />
        </div>
        <span className="text-sm font-medium text-[#F5F5F5]">Threat</span>
        <Badge className={`ml-auto ${colors.badge} text-white`}>
          {data.data.severity}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <span className="text-xs text-[#737373]">Type</span>
          <div className="text-sm font-medium text-[#F5F5F5]">{data.data.type || 'Unknown'}</div>
        </div>
        <div>
          <span className="text-xs text-[#737373]">Description</span>
          <div className="text-sm text-[#A3A3A3] line-clamp-2">{data.data.description}</div>
        </div>
      </div>
    </div>
  );
}
```

-----

## 11. RESPONSIVE DESIGN BREAKPOINTS

```typescript
// Responsive breakpoint handling
const breakpoints = {
  mobile: 640,    // < 640px: Single column, tab navigation
  tablet: 1024,   // 640-1024px: Two columns, collapsible panels
  desktop: 1280,  // 1024-1280px: Full layout, smaller panels
  wide: 1536,     // > 1536px: Full layout, maximum widths
};

// Component visibility rules
const responsiveRules = {
  mobile: {
    sidebar: 'hidden', // Use drawer
    casePanel: 'hidden', // Use tab
    rightToolbar: 'bottom-fixed',
    rightSidebar: 'hidden',
    timeline: 'collapsed',
  },
  tablet: {
    sidebar: 'visible',
    casePanel: 'collapsible',
    rightToolbar: 'visible',
    rightSidebar: 'hidden',
    timeline: 'visible',
  },
  desktop: {
    sidebar: 'visible',
    casePanel: 'visible',
    rightToolbar: 'visible',
    rightSidebar: 'visible',
    timeline: 'visible',
  },
};
```

-----

## 12. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation (Days 1-2)

- [ ] Initialize Next.js 15 project
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS v4 with exact color tokens
- [ ] Set up shadcn/ui components
- [ ] Create base layout structure
- [ ] Implement responsive grid system

### Phase 2: Layout Components (Days 3-4)

- [ ] TopBar component with metrics badges
- [ ] SidebarNav with icon navigation
- [ ] RightToolbar with all tool icons
- [ ] RightSidebar with action icons
- [ ] CommandInput component

### Phase 3: Case Panel (Days 5-6)

- [ ] CaseHeader with risk badge and controls
- [ ] CaseMetadata with source information
- [ ] TriggerRule with green highlights
- [ ] SourcePerson with avatar

### Phase 4: Visualizations (Days 7-9)

- [ ] SankeyDiagram with D3
- [ ] RiskDonut chart
- [ ] TimelinePanel with activity bars
- [ ] Category labels and legends

### Phase 5: Rete.js Integration (Days 10-12)

- [ ] Editor setup and configuration
- [ ] PersonNode implementation
- [ ] LocationNode implementation
- [ ] EventNode implementation
- [ ] ThreatNode implementation
- [ ] Custom connection styling
- [ ] Node interaction handlers

### Phase 6: Polish (Days 13-14)

- [ ] Animations and transitions
- [ ] Keyboard navigation
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile responsiveness

-----

## 13. CRITICAL IMPLEMENTATION NOTES

1. **Color Accuracy**: Use exact hex values from the specification. Do not approximate colors.
1. **Font Loading**: Load Inter font from Google Fonts with weights 400, 500, 600, 700.
1. **Border Consistency**: All borders should use #2E2E2E unless specified otherwise.
1. **Shadow Treatment**: Use subtle shadows with high transparency for depth without distraction.
1. **Icon Sizing**: Maintain consistent 16px/20px/24px icon sizes based on context.
1. **Spacing System**: Use the 4px base spacing system (4, 8, 12, 16, 20, 24, 32).
1. **Animation Timing**: Use 150ms for micro-interactions, 300ms for panel transitions.
1. **Z-Index Management**:

- Base content: 0
- Floating elements: 10
- Modals: 50
- Tooltips: 100

1. **Canvas Performance**: Use `will-change: transform` on scrolling/animated elements.
1. **Accessibility**: Ensure all interactive elements have focus states and ARIA labels.

```
This comprehensive specification document provides Claude Code with everything needed to implement a pixel-perfect OSINT investigation dashboard matching the uploaded screenshot. The guide includes exact color values, precise layout dimensions, complete component implementations, and Rete.js node configurations for the canvas-based visualization system.​​​​​​​​​​​​​​​​
```