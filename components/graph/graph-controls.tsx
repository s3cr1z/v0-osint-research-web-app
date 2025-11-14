"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface GraphControlsProps {
  onAddEntity: () => void
  onLayoutNodes: () => void
  onClearGraph: () => void
  nodeCount: number
  edgeCount: number
}

export function GraphControls({ onAddEntity, onLayoutNodes, onClearGraph, nodeCount, edgeCount }: GraphControlsProps) {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Graph Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm space-y-1">
          <div>Nodes: {nodeCount}</div>
          <div>Edges: {edgeCount}</div>
        </div>

        <div className="space-y-2">
          <Button onClick={() => router.push("/dashboard")} variant="outline" size="sm" className="w-full">
            Search & Add
          </Button>
          <Button onClick={onLayoutNodes} size="sm" variant="outline" className="w-full bg-transparent">
            Auto Layout
          </Button>
          <Button onClick={onClearGraph} size="sm" variant="destructive" className="w-full">
            Clear Graph
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
