"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface Note {
  id: string
  content: string
  created_at: string
}

export function CaseNotes({ caseId }: { caseId: string }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchNotes()
  }, [caseId])

  async function fetchNotes() {
    try {
      const { data: activities, error } = await supabase
        .from("case_activities")
        .select("id, description, created_at")
        .eq("case_id", caseId)
        .eq("action_type", "note")
        .order("created_at", { ascending: false })

      if (error) throw error
      setNotes(
        (activities || []).map((a) => ({
          id: a.id,
          content: a.description || "",
          created_at: a.created_at,
        })),
      )
    } catch (error) {
      console.error("Failed to fetch notes:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddNote() {
    if (!newNote.trim()) return

    setSaving(true)
    try {
      const { error } = await supabase.from("case_activities").insert({
        case_id: caseId,
        action_type: "note",
        description: newNote,
      })

      if (error) throw error
      toast({ title: "Note saved" })
      setNewNote("")
      fetchNotes()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <textarea
            placeholder="Write your notes here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={saving}
            className="w-full min-h-24 p-2 border border-input rounded-md text-sm"
          />
          <Button onClick={handleAddNote} disabled={saving || !newNote.trim()}>
            {saving ? "Saving..." : "Save Note"}
          </Button>
        </CardContent>
      </Card>

      {notes.length > 0 && (
        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4">
                <p className="text-sm mb-2">{note.content}</p>
                <div className="text-xs text-muted-foreground">{new Date(note.created_at).toLocaleString()}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
