import { createClient } from "@/lib/supabase/server"
import { INTERNAL_TEST_USER_ID } from "@/lib/config"

export async function GET() {
  try {
    const supabase = await createClient()
    const userId = INTERNAL_TEST_USER_ID

    const { data: credits, error } = await supabase.from("user_credits").select("*").eq("user_id", userId).single()

    if (error && error.code === "PGRST116") {
      // No credits yet, create record
      const { data: newCredits } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          balance: 1000,
          plan: "free",
        })
        .select()
        .single()

      return Response.json(newCredits)
    }

    if (error) throw error
    return Response.json(credits)
  } catch (error) {
    console.error("Credits error:", error)
    return Response.json({ error: "Failed to fetch credits" }, { status: 500 })
  }
}
