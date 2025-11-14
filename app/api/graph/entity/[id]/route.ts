import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const entityId = params.id
    const supabase = await createClient()

    // Fetch entity
    const { data: entity, error: entityError } = await supabase.from("entities").select("*").eq("id", entityId).single()

    if (entityError) throw entityError

    // Fetch relationships
    const { data: relationships, error: relError } = await supabase
      .from("relationships")
      .select("target_entity_id, relationship_type, confidence, evidence")
      .eq("source_entity_id", entityId)
      .limit(20)

    if (relError) throw relError

    // Fetch target entity details
    let relatedEntities = []
    if (relationships && relationships.length > 0) {
      const targetIds = relationships.map((r) => r.target_entity_id)
      const { data: targets } = await supabase.from("entities").select("*").in("id", targetIds)

      relatedEntities = relationships.map((rel) => {
        const target = targets?.find((t) => t.id === rel.target_entity_id)
        return {
          ...rel,
          target,
        }
      })
    }

    return Response.json({
      entity,
      relationships: relatedEntities,
    })
  } catch (error) {
    console.error("Graph fetch error:", error)
    return Response.json({ error: "Failed to fetch graph data" }, { status: 500 })
  }
}
