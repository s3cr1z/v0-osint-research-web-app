'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Play, Pause, SkipBack, SkipForward, Maximize2 } from 'lucide-react'
import { mockTimelineEvents } from '../lib/mock-data'
import { cn } from '@/lib/utils'

const eventColors = {
  location: 'bg-purple-500',
  communication: 'bg-blue-500',
  transaction: 'bg-green-500',
  social: 'bg-yellow-500',
  meeting: 'bg-red-500',
}

export default function TimelineBar() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="border-t border-gray-800 bg-gray-950 p-4">
      <div className="space-y-3">
        {/* Header with Controls */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Timeline Analysis</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative h-16 rounded-lg border border-gray-800 bg-gray-900 px-4">
          {/* Center line */}
          <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-gray-700" />

          {/* Time labels */}
          <div className="absolute left-4 top-1 text-[10px] text-gray-500">00:00</div>
          <div className="absolute left-1/2 top-1 -translate-x-1/2 text-[10px] text-gray-500">12:00</div>
          <div className="absolute right-4 top-1 text-[10px] text-gray-500">24:00</div>

          {/* Events */}
          <TooltipProvider>
            {mockTimelineEvents.map((event, index) => {
              const [hours, minutes] = event.time.split(':').map(Number)
              const position = ((hours * 60 + minutes) / (24 * 60)) * 100

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `calc(${position}% - 16px + 1rem)` }}
                    >
                      <div
                        className={cn(
                          'h-3 w-3 rounded-full border-2 border-gray-900',
                          eventColors[event.type]
                        )}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-800 text-xs text-white">
                    <div>
                      <div className="font-semibold">{event.label}</div>
                      <div className="text-gray-400">{event.time}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
