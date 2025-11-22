# OSINT Investigation Dashboard - Pixel-Perfect Implementation Specification

Based on the uploaded screenshot, here are comprehensive implementation instructions for Claude Code to build this dashboard with Rete.js integration.

```markdown project="OSINT Dashboard Implementation" file="CLAUDE_CODE_INSTRUCTIONS.md" type="code"
# OSINT Investigation Dashboard - Complete Implementation Guide for Claude Code

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

See full specification document for complete implementation details.
```

## Quick Reference

- **Target Route**: `/osint-dashboard` or new route
- **Color Base**: #0A0A0A (darker than current #000000)
- **Key Features**: Five-section layout, Sankey diagram, Rete.js canvas, activity timeline
- **Dependencies**: recharts, d3-sankey, rete plugins, date-fns

## Implementation Phases

1. **Phase 1**: Foundation - project setup, dependencies, color system
2. **Phase 2**: Layout Components - TopBar, sidebars, toolbars
3. **Phase 3**: Case Panel - header, metadata, trigger rule, source person
4. **Phase 4**: Visualizations - Sankey, donut chart, timeline
5. **Phase 5**: Rete.js Integration - editor, custom nodes
6. **Phase 6**: Polish - animations, accessibility, performance

Estimated timeline: 14 days for complete implementation
