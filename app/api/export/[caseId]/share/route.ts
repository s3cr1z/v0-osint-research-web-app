import { createClient } from "@/lib/supabase/server"
import { nanoid } from "nanoid"

export async function POST(request: Request, { params }: { params: { caseId: string } }) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Generate unique share token
    const shareToken = nanoid(12)

    // Store share record (would need a shares table in production)
    // For MVP, just return a link
    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/share/${shareToken}`

    return Response.json({ shareLink })
  } catch (error) {
    console.error("Share creation error:", error)
    return Response.json({ error: "Failed to create share link" }, { status: 500 })
  }
}
