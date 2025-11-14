"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface NodeDetailsPanelProps {
  nodeId: string
  onClose: () => void
}

export function NodeDetailsPanel({ nodeId, onClose }: NodeDetailsPanelProps) {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch(`/api/graph/entity/${nodeId}`)
        if (response.ok) {
          const data = await response.json()
          setDetails(data.entity)
        }
      } catch (error) {
        console.error("Failed to fetch node details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [nodeId])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!details) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Unable to load details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Node Details</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-2 top-2">
          ✕
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-muted-foreground">Value</div>
          <code className="text-xs break-all">{details.value}</code>
        </div>

        <div>
          <div className="text-xs font-semibold text-muted-foreground">Type</div>
          <Badge variant="secondary">{details.type}</Badge>
        </div>

        {details.source && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Source</div>
            <div className="text-xs">{details.source}</div>
          </div>
        )}

        {details.first_seen && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground">First Seen</div>
            <div className="text-xs">{new Date(details.first_seen).toLocaleString()}</div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Button size="sm" variant="outline" className="w-full bg-transparent">
            Add to Case
          </Button>
          <Button size="sm" variant="outline" className="w-full bg-transparent">
            Enrich
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
