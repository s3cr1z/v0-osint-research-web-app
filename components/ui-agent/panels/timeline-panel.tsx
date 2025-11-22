'use client';

import {
  ChevronLeft,
  ChevronRight,
  Play,
  ChevronDown,
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
          {months.map((month) => (
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
