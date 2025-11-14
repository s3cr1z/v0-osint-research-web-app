import { runEnrichment } from "@/lib/integrations/enrichment-engine"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { entityId, entityType, entityValue, integrationId } = body

    if (!entityId || !entityType || !integrationId) {
      return Response.json({ error: "Missing parameters" }, { status: 400 })
    }

    const result = await runEnrichment(entityId, entityType, entityValue, integrationId)

    return Response.json(result)
  } catch (error) {
    console.error("Enrichment error:", error)
    const message = error instanceof Error ? error.message : "Enrichment failed"
    return Response.json({ error: message }, { status: 500 })
  }
}
