'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Maximize2 } from 'lucide-react'

export default function GraphView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Entity Relationship Graph</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Graph Canvas - simplified version */}
      <div className="relative h-[400px] overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
        <svg className="h-full w-full" viewBox="0 0 500 400">
          {/* Connections */}
          <line x1="100" y1="200" x2="250" y2="120" stroke="#4b5563" strokeWidth="2" />
          <line x1="100" y1="200" x2="250" y2="200" stroke="#4b5563" strokeWidth="2" />
          <line x1="100" y1="200" x2="250" y2="280" stroke="#4b5563" strokeWidth="2" />
          <line x1="250" y1="120" x2="400" y2="80" stroke="#4b5563" strokeWidth="2" />
          <line x1="250" y1="200" x2="400" y2="200" stroke="#4b5563" strokeWidth="2" />

          {/* Person of Interest Node (Red) */}
          <rect x="50" y="170" width="100" height="60" rx="8" fill="#1a1a1a" stroke="#ef4444" strokeWidth="2" />
          <text x="100" y="205" textAnchor="middle" fill="white" fontSize="12">Person of</text>
          <text x="100" y="220" textAnchor="middle" fill="white" fontSize="12">Interest</text>

          {/* Social Media Node (Blue) */}
          <rect x="200" y="90" width="100" height="60" rx="8" fill="#1a1a1a" stroke="#3b82f6" strokeWidth="2" />
          <text x="250" y="125" textAnchor="middle" fill="white" fontSize="12">Social Media</text>

          {/* Financial Records Node (Green) */}
          <rect x="200" y="170" width="100" height="60" rx="8" fill="#1a1a1a" stroke="#10b981" strokeWidth="2" />
          <text x="250" y="205" textAnchor="middle" fill="white" fontSize="12">Financial</text>

          {/* Associates Node (Orange) */}
          <rect x="200" y="250" width="100" height="60" rx="8" fill="#1a1a1a" stroke="#f59e0b" strokeWidth="2" />
          <text x="250" y="285" textAnchor="middle" fill="white" fontSize="12">Associates</text>

          {/* Location Node (Purple) */}
          <rect x="350" y="50" width="100" height="60" rx="8" fill="#1a1a1a" stroke="#8b5cf6" strokeWidth="2" />
          <text x="400" y="85" textAnchor="middle" fill="white" fontSize="12">Locations</text>

          {/* Platform Node (Blue) */}
          <rect x="350" y="170" width="100" height="60" rx="8" fill="#1a1a1a" stroke="#3b82f6" strokeWidth="2" />
          <text x="400" y="205" textAnchor="middle" fill="white" fontSize="12">Platforms</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="border-red-500 text-red-400">
          <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
          Subject
        </Badge>
        <Badge variant="outline" className="border-blue-500 text-blue-400">
          <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
          Social Media
        </Badge>
        <Badge variant="outline" className="border-green-500 text-green-400">
          <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
          Financial
        </Badge>
        <Badge variant="outline" className="border-orange-500 text-orange-400">
          <div className="mr-2 h-2 w-2 rounded-full bg-orange-500" />
          Associates
        </Badge>
        <Badge variant="outline" className="border-purple-500 text-purple-400">
          <div className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
          Locations
        </Badge>
      </div>
    </div>
  )
}
