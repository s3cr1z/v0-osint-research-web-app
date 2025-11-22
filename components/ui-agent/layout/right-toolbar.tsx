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
