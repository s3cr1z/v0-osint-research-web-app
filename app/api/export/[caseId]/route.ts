import { exportCaseData, convertToCSV, convertToJSON, generatePDFContent } from "@/lib/export"

export async function POST(request: Request, { params }: { params: { caseId: string } }) {
  try {
    const body = await request.json()
    const { format, includeEnrichment, includeTimeline, redactSensitive } = body

    const data = await exportCaseData(params.caseId, {
      format: format as "csv" | "json" | "pdf",
      includeEnrichment,
      includeTimeline,
      redactSensitive,
    })

    let content: string
    let contentType: string

    if (format === "csv") {
      content = convertToCSV(data)
      contentType = "text/csv"
    } else if (format === "json") {
      content = convertToJSON(data)
      contentType = "application/json"
    } else {
      content = generatePDFContent(data, !redactSensitive)
      contentType = "text/html"
    }

    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="case-${params.caseId}.${
          format === "json" ? "json" : format === "csv" ? "csv" : "html"
        }"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return Response.json({ error: "Export failed" }, { status: 500 })
  }
}
