'use client'

import { Button } from '@/components/ui/button'
import { MapPin, Maximize2 } from 'lucide-react'

export default function MapView() {
  return (
    <div className="space-y-4">
      <div className="relative h-[400px] overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
        {/* Map Placeholder */}
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-gray-700" />
            <p className="mt-2 text-sm text-gray-500">Map visualization</p>
            <p className="text-xs text-gray-600">Caulfield, VIC</p>
          </div>
        </div>

        {/* Location Marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-red-500" />
            <div className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75" />
          </div>
        </div>

        {/* Controls */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-gray-900/80 hover:bg-gray-800"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
          <div>
            <div className="font-medium text-white">Primary Location</div>
            <div className="text-gray-400">Briggs St, Caulfield, VIC 3162</div>
          </div>
        </div>
      </div>
    </div>
  )
}
