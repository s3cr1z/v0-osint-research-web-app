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
