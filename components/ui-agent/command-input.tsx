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
