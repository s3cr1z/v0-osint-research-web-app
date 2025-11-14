import { createClient } from "@/lib/supabase/server"
import { detectEntityType } from "@/lib/entity-parser"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return Response.json({ error: "Query required" }, { status: 400 })
    }

    // Detect entity type
    const entity = detectEntityType(query)
    if (!entity) {
      return Response.json({ error: "Unable to detect entity type" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if entity exists in database
    const { data: existingEntity, error: fetchError } = await supabase
      .from("entities")
      .select("*")
      .eq("type", entity.type)
      .eq("normalized_value", entity.normalizedValue)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError
    }

    let entityId: string

    if (existingEntity) {
      entityId = existingEntity.id
      // Update last_seen
      await supabase.from("entities").update({ last_seen: new Date().toISOString() }).eq("id", entityId)
    } else {
      // Create new entity
      const { data: newEntity, error: insertError } = await supabase
        .from("entities")
        .insert({
          type: entity.type,
          value: entity.value,
          normalized_value: entity.normalizedValue,
          source: "manual_search",
          metadata: {},
        })
        .select()
        .single()

      if (insertError) throw insertError
      entityId = newEntity.id
    }

    // Fetch related entities via relationships
    const { data: relationships, error: relError } = await supabase
      .from("relationships")
      .select("target_entity_id, relationship_type, confidence, evidence")
      .eq("source_entity_id", entityId)
      .limit(50)

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
      entity: existingEntity || { id: entityId, ...entity, created_at: new Date().toISOString() },
      relatedEntities,
      totalRelations: relatedEntities.length,
    })
  } catch (error) {
    console.error("Search error:", error)
    return Response.json({ error: "Search failed" }, { status: 500 })
  }
}
