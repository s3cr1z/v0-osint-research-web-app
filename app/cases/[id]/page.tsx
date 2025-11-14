"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CaseEntities } from "@/components/cases/case-entities"
import { CaseTimeline } from "@/components/cases/case-timeline"
import { CaseNotes } from "@/components/cases/case-notes"
import { Loader2 } from "lucide-react"

interface Case {
  id: string
  title: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [addingEntity, setAddingEntity] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchCase()
  }, [caseId])

  async function fetchCase() {
    try {
      const { data, error } = await supabase.from("cases").select("*").eq("id", caseId).single()

      if (error) throw error
      setCaseData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load case",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleAddEntity() {
    if (!searchQuery.trim()) return

    setAddingEntity(true)
    try {
      // Search for entity
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery.trim() }),
      })

      if (!response.ok) throw new Error("Search failed")
      const { entity } = await response.json()

      // Add to case
      const { error } = await supabase.from("case_entities").insert({
        case_id: caseId,
        entity_id: entity.id,
      })

      if (error && error.code !== "23505") throw error

      toast({
        title: "Success",
        description: "Entity added to case",
      })
      setSearchQuery("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add entity",
        variant: "destructive",
      })
    } finally {
      setAddingEntity(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Case not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{caseData.title}</h1>
            {caseData.description && <p className="text-sm text-muted-foreground">{caseData.description}</p>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="entities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="entities">Entities</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="entities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Entity</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Input
                  placeholder="Search and add entity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={addingEntity}
                />
                <Button onClick={handleAddEntity} disabled={addingEntity || !searchQuery.trim()}>
                  {addingEntity ? "Adding..." : "Add"}
                </Button>
              </CardContent>
            </Card>

            <CaseEntities caseId={caseId} />
          </TabsContent>

          <TabsContent value="timeline">
            <CaseTimeline caseId={caseId} />
          </TabsContent>

          <TabsContent value="notes">
            <CaseNotes caseId={caseId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
