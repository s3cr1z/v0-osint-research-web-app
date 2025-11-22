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
