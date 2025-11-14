"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface Case {
  id: string
  title: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [newCaseTitle, setNewCaseTitle] = useState("")
  const [newCaseDesc, setNewCaseDesc] = useState("")
  const [creatingCase, setCreatingCase] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    try {
      const { data, error } = await supabase.from("cases").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setCases(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load cases",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateCase() {
    if (!newCaseTitle.trim()) return

    setCreatingCase(true)
    try {
      const { data, error } = await supabase
        .from("cases")
        .insert({
          title: newCaseTitle,
          description: newCaseDesc || null,
          status: "active",
        })
        .select()
        .single()

      if (error) throw error

      setCases([data, ...cases])
      setNewCaseTitle("")
      setNewCaseDesc("")
      toast({
        title: "Success",
        description: "Case created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create case",
        variant: "destructive",
      })
    } finally {
      setCreatingCase(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cases</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Case</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>Start a new investigation</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Title</label>
                  <Input
                    placeholder="Case title"
                    value={newCaseTitle}
                    onChange={(e) => setNewCaseTitle(e.target.value)}
                    disabled={creatingCase}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <Input
                    placeholder="Optional description"
                    value={newCaseDesc}
                    onChange={(e) => setNewCaseDesc(e.target.value)}
                    disabled={creatingCase}
                  />
                </div>
                <Button onClick={handleCreateCase} disabled={creatingCase || !newCaseTitle.trim()} className="w-full">
                  {creatingCase ? "Creating..." : "Create Case"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : cases.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center">
              <p className="text-muted-foreground mb-4">No cases yet. Create one to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {cases.map((caseItem) => (
              <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{caseItem.title}</CardTitle>
                        {caseItem.description && <CardDescription>{caseItem.description}</CardDescription>}
                      </div>
                      <div className="text-xs bg-secondary px-2 py-1 rounded">{caseItem.status}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Created: {new Date(caseItem.created_at).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
