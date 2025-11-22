'use client';

import { ChevronDown, AlertCircle, Users, MapPin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
