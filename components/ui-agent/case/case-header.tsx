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
