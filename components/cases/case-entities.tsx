"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, X, Download } from "lucide-react"

interface CaseEntity {
  id: string
  entity_id: string
  notes: string | null
  tags: string[]
  entity: {
    id: string
    type: string
    value: string
    normalized_value: string
  }
}

export function CaseEntities({ caseId }: { caseId: string }) {
  const [entities, setEntities] = useState<CaseEntity[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchEntities()
  }, [caseId])

  async function fetchEntities() {
    try {
      const { data, error } = await supabase
        .from("case_entities")
        .select("id, entity_id, notes, tags, entity:entities(*)")
        .eq("case_id", caseId)

      if (error) throw error
      setEntities(data || [])
    } catch (error) {
      console.error("Failed to fetch entities:", error)
    } finally {
      setLoading(false)
    }
  }

  async function removeEntity(caseEntityId: string) {
    try {
      const { error } = await supabase.from("case_entities").delete().eq("id", caseEntityId)

      if (error) throw error
      setEntities(entities.filter((e) => e.id !== caseEntityId))
    } catch (error) {
      console.error("Failed to remove entity:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (entities.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">No entities yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {entities.map((ce) => (
        <Card key={ce.id}>
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono">{ce.entity.value}</code>
                  <Badge variant="secondary">{ce.entity.type}</Badge>
                </div>
                {ce.notes && <p className="text-sm text-muted-foreground">{ce.notes}</p>}
                {ce.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {ce.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeEntity(ce.id)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Link href={`/cases/${caseId}/export`}>
        <Button className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Export Case
        </Button>
      </Link>
    </div>
  )
}
