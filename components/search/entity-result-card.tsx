"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getIntegrationsForType } from "@/lib/integrations/integrations"
import { useToast } from "@/hooks/use-toast"

interface Entity {
  id: string
  type: string
  value: string
  normalized_value: string
  source?: string
  first_seen?: string
  last_seen?: string
  metadata?: Record<string, any>
}

export function EntityResultCard({ entity }: { entity: Entity }) {
  const [enriching, setEnriching] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [enrichmentResult, setEnrichmentResult] = useState<any>(null)
  const { toast } = useToast()

  const typeColors: Record<string, string> = {
    domain: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    subdomain: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    ip: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    cidr: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    email: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    username: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    phone: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    crypto_address: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    ssl_hash: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    as_number: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  }

  const integrations = getIntegrationsForType(entity.type)

  async function handleEnrich(integrationId: string) {
    setEnriching(true)
    try {
      const response = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityId: entity.id,
          entityType: entity.type,
          entityValue: entity.value,
          integrationId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Enrichment failed")
      }

      const result = await response.json()
      setEnrichmentResult(result)
      setSelectedIntegration(integrationId)
      toast({
        title: "Enrichment Complete",
        description: `${integrationId} enrichment finished`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Enrichment failed",
        variant: "destructive",
      })
    } finally {
      setEnriching(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono break-all">{entity.value}</code>
                <Badge className={typeColors[entity.type] || ""}>{entity.type}</Badge>
              </div>
              {entity.source && <CardDescription className="text-xs">Source: {entity.source}</CardDescription>}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={enriching}>
                  ⋮
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>Add to Case</DropdownMenuItem>
                {integrations.length > 0 && (
                  <>
                    <DropdownMenuItem disabled>Enrich</DropdownMenuItem>
                    {integrations.map((int) => (
                      <DropdownMenuItem key={int.id} onClick={() => handleEnrich(int.id)} disabled={enriching}>
                        {int.name} ({int.credits_per_call} credits)
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
                <DropdownMenuItem disabled>Add to Graph</DropdownMenuItem>
                <DropdownMenuItem disabled>Copy Value</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1">
          {entity.first_seen && <div>First seen: {new Date(entity.first_seen).toLocaleString()}</div>}
          {entity.last_seen && <div>Last seen: {new Date(entity.last_seen).toLocaleString()}</div>}
        </CardContent>
      </Card>

      {/* Enrichment Results Dialog */}
      {enrichmentResult && selectedIntegration && (
        <Dialog open={true} onOpenChange={() => setEnrichmentResult(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Enrichment Results</DialogTitle>
              <DialogDescription>{selectedIntegration} data</DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-auto">
              <pre className="text-xs bg-secondary p-3 rounded overflow-auto">
                {JSON.stringify(enrichmentResult.data, null, 2)}
              </pre>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
