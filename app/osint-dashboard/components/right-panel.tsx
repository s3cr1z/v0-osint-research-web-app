'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Info, Map, MessageSquare, Network, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import DetailsView from './details-view'
import MapView from './map-view'
import SocialView from './social-view'
import GraphView from './graph-view'

interface RightPanelProps {
  collapsed: boolean
  onToggleCollapse: () => void
  isMobile?: boolean
}

export default function RightPanel({ collapsed, onToggleCollapse, isMobile }: RightPanelProps) {
  if (collapsed && !isMobile) {
    return (
      <div className="relative hidden lg:flex w-0 overflow-hidden border-l border-gray-800 bg-gray-950">
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

  if (collapsed) {
    return null
  }

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {(isMobile || window.innerWidth < 1280) && !collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
          onClick={onToggleCollapse}
        />
      )}

      {/* Panel */}
      <aside
        className={cn(
          'relative flex flex-col border-l border-gray-800 bg-gray-950 transition-all duration-300 ease-in-out',
          // Desktop behavior
          'xl:relative xl:w-[500px]',
          // Mobile/Tablet behavior - overlay from right
          'fixed right-0 top-14 bottom-0 z-50 w-full sm:w-[400px] md:w-[500px] xl:static'
        )}
      >
        {/* Close Button (Mobile/Tablet) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="absolute left-2 top-2 z-10 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 xl:hidden"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Toggle Button (Desktop) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="absolute -left-3 top-6 z-10 hidden h-6 w-6 rounded-full border border-gray-800 bg-gray-950 hover:bg-gray-800 xl:flex"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>

        <Tabs defaultValue="details" className="flex h-full flex-col">
          <div className="border-b border-gray-800 px-4 pt-4">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900">
              <TabsTrigger value="details" className="gap-1 text-xs sm:gap-2">
                <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Details</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-1 text-xs sm:gap-2">
                <Map className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Map</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="gap-1 text-xs sm:gap-2">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Social</span>
              </TabsTrigger>
              <TabsTrigger value="graph" className="gap-1 text-xs sm:gap-2">
                <Network className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Graph</span>
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
    </>
  )
}
