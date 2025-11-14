"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Activity {
  id: string
  action_type: string
  description: string | null
  created_at: string
  data: Record<string, any>
}

export function CaseTimeline({ caseId }: { caseId: string }) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchActivities()
  }, [caseId])

  async function fetchActivities() {
    try {
      const { data, error } = await supabase
        .from("case_activities")
        .select("*")
        .eq("case_id", caseId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      console.error("Failed to fetch activities:", error)
    } finally {
      setLoading(false)
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

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">No activities yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <Card key={activity.id}>
          <CardContent className="pt-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">{activity.action_type}</div>
                <div className="text-xs text-muted-foreground">{new Date(activity.created_at).toLocaleString()}</div>
              </div>
              {activity.description && <p className="text-sm text-muted-foreground">{activity.description}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
