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
    <div className="border-t border-gray-800 bg-gray-950 p-2 sm:p-3 md:p-4">
      <div className="space-y-2 sm:space-y-3">
        {/* Header with Controls */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold text-white sm:text-sm">Timeline</h3>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
              <SkipBack className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
              <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 hidden sm:flex">
              <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="overflow-x-auto">
          <div className="relative h-14 sm:h-16 min-w-[400px] rounded-lg border border-gray-800 bg-gray-900 px-3 sm:px-4">
            {/* Center line */}
            <div className="absolute left-3 right-3 sm:left-4 sm:right-4 top-1/2 h-0.5 -translate-y-1/2 bg-gray-700" />

            {/* Time labels */}
            <div className="absolute left-3 sm:left-4 top-1 text-[9px] sm:text-[10px] text-gray-500">00:00</div>
            <div className="absolute left-1/2 top-1 -translate-x-1/2 text-[9px] sm:text-[10px] text-gray-500">12:00</div>
            <div className="absolute right-3 sm:right-4 top-1 text-[9px] sm:text-[10px] text-gray-500">24:00</div>

            {/* Events */}
            <TooltipProvider>
              {mockTimelineEvents.map((event, index) => {
                const [hours, minutes] = event.time.split(':').map(Number)
                const position = ((hours * 60 + minutes) / (24 * 60)) * 100

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{ left: `calc(${position}% - 12px + 0.75rem)` }}
                      >
                        <div
                          className={cn(
                            'h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-gray-900',
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
    </div>
  )
}
