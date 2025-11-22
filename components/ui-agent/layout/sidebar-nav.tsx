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
