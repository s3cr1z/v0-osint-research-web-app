'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Info, Map, MessageSquare, Network, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import DetailsView from './details-view'
import MapView from './map-view'
import SocialView from './social-view'
import GraphView from './graph-view'

interface RightPanelProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function RightPanel({ collapsed, onToggleCollapse }: RightPanelProps) {
  if (collapsed) {
    return (
      <div className="relative flex w-0 overflow-hidden border-l border-gray-800 bg-gray-950">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="absolute -left-3 top-6 z-10 h-6 w-6 rounded-full border border-gray-800 bg-gray-950 hover:bg-gray-800"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'relative flex w-[500px] flex-col border-l border-gray-800 bg-gray-950 transition-all duration-300 ease-in-out'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="absolute -left-3 top-6 z-10 h-6 w-6 rounded-full border border-gray-800 bg-gray-950 hover:bg-gray-800"
      >
        <ChevronRight className="h-3 w-3" />
      </Button>

      <Tabs defaultValue="details" className="flex h-full flex-col">
        <div className="border-b border-gray-800 px-4 pt-4">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900">
            <TabsTrigger value="details" className="gap-2 text-xs">
              <Info className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2 text-xs">
              <Map className="h-4 w-4" />
              Map
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2 text-xs">
              <MessageSquare className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="graph" className="gap-2 text-xs">
              <Network className="h-4 w-4" />
              Graph
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="details" className="mt-0">
              <DetailsView />
            </TabsContent>
            <TabsContent value="map" className="mt-0">
              <MapView />
            </TabsContent>
            <TabsContent value="social" className="mt-0">
              <SocialView />
            </TabsContent>
            <TabsContent value="graph" className="mt-0">
              <GraphView />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </aside>
  )
}
