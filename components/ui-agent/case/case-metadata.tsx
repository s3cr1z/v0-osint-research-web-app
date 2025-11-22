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
