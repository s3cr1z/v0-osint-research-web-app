"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { detectEntityType } from "@/lib/entity-parser"
import { EntityResultCard } from "./entity-result-card"
import { Badge } from "@/components/ui/badge"

export function SearchInterface() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [detectedType, setDetectedType] = useState<string | null>(null)
  const { toast } = useToast()

  function handleInputChange(value: string) {
    setQuery(value)
    if (value.trim().length > 0) {
      const entity = detectEntityType(value)
      setDetectedType(entity?.type || null)
    } else {
      setDetectedType(null)
    }
  }

  async function handleSearch() {
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Search failed")
      }

      const data = await response.json()
      setResults(data)
      toast({
        title: "Search Complete",
        description: `Found ${data.totalRelations} related entities`,
      })
    } catch (error) {
      toast({
        title: "Search Error",
        description: error instanceof Error ? error.message : "Search failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !loading) {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card>
        <CardHeader>
          <CardTitle>OSINT Search</CardTitle>
          <CardDescription>Paste a domain, IP, email, username, or other entity to begin investigation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="example.com, 1.2.3.4, user@example.com, @username..."
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="pr-24"
              />
              {detectedType && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Badge variant="secondary" className="text-xs">
                    {detectedType}
                  </Badge>
                </div>
              )}
            </div>
            <Button onClick={handleSearch} disabled={loading || !query.trim()}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Tabs defaultValue="entity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="entity">Primary Entity</TabsTrigger>
            <TabsTrigger value="related">Related ({results.relatedEntities.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="entity">
            <EntityResultCard entity={results.entity} />
          </TabsContent>

          <TabsContent value="related" className="space-y-3">
            {results.relatedEntities.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No related entities found yet</p>
                </CardContent>
              </Card>
            ) : (
              results.relatedEntities.map((rel: any) => (
                <div key={rel.target_entity_id} className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground">
                    {rel.relationship_type} (confidence: {(rel.confidence * 100).toFixed(0)}%)
                  </div>
                  <EntityResultCard entity={rel.target} />
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
