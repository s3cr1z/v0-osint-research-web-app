import { createClient } from "@/lib/supabase/server"

export interface ExportOptions {
  format: "csv" | "json" | "pdf"
  includeEnrichment: boolean
  includeTimeline: boolean
  redactSensitive: boolean
}

export async function exportCaseData(caseId: string, options: ExportOptions) {
  const supabase = await createClient()

  // Fetch case
  const { data: caseData } = await supabase.from("cases").select("*").eq("id", caseId).single()

  // Fetch case entities
  const { data: caseEntities } = await supabase
    .from("case_entities")
    .select("*, entity:entities(*)")
    .eq("case_id", caseId)

  // Fetch activities
  const { data: activities } = await supabase
    .from("case_activities")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false })

  const exportData = {
    case: caseData,
    entities: caseEntities || [],
    activities: options.includeTimeline ? activities : [],
    exportedAt: new Date().toISOString(),
  }

  if (options.redactSensitive) {
    return redactSensitiveData(exportData)
  }

  return exportData
}

function redactSensitiveData(data: any) {
  // Redact sensitive fields
  const redacted = { ...data }

  if (redacted.entities) {
    redacted.entities = redacted.entities.map((ce: any) => ({
      ...ce,
      entity: {
        ...ce.entity,
        value: ce.entity.type === "email" ? "***@***.***" : ce.entity.type === "phone" ? "***-****" : ce.entity.value,
      },
    }))
  }

  return redacted
}

export function convertToCSV(data: any): string {
  const headers = ["Entity Value", "Entity Type", "Source", "Notes", "First Seen", "Last Seen"]

  const rows = (data.entities || []).map((ce: any) => [
    ce.entity.value,
    ce.entity.type,
    ce.entity.source || "",
    ce.notes || "",
    ce.entity.first_seen || "",
    ce.entity.last_seen || "",
  ])

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

  return csv
}

export function convertToJSON(data: any): string {
  return JSON.stringify(data, null, 2)
}

export function generatePDFContent(data: any, watermark = true): string {
  const caseTitle = data.case.title
  const caseDesc = data.case.description || "No description"
  const exportDate = new Date(data.exportedAt).toLocaleString()

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${caseTitle} - OSINT Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f0f0f0; font-weight: bold; }
        .watermark { opacity: 0.1; position: fixed; top: 50%; left: 50%; font-size: 80px; transform: rotate(-45deg); }
        .metadata { background-color: #f9f9f9; padding: 10px; margin-bottom: 20px; border-radius: 4px; }
        .entity-row { margin: 15px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #007bff; }
      </style>
    </head>
    <body>
      ${watermark ? '<div class="watermark">OSINT Report</div>' : ""}
      
      <h1>${caseTitle}</h1>
      
      <div class="metadata">
        <p><strong>Description:</strong> ${caseDesc}</p>
        <p><strong>Status:</strong> ${data.case.status}</p>
        <p><strong>Created:</strong> ${new Date(data.case.created_at).toLocaleString()}</p>
        <p><strong>Report Generated:</strong> ${exportDate}</p>
      </div>

      <h2>Entities (${data.entities.length})</h2>
      <table>
        <tr>
          <th>Value</th>
          <th>Type</th>
          <th>Source</th>
          <th>Notes</th>
          <th>First Seen</th>
          <th>Last Seen</th>
        </tr>
  `

  data.entities.forEach((ce: any) => {
    html += `
      <tr>
        <td><code>${ce.entity.value}</code></td>
        <td><strong>${ce.entity.type}</strong></td>
        <td>${ce.entity.source || "-"}</td>
        <td>${ce.notes || "-"}</td>
        <td>${ce.entity.first_seen ? new Date(ce.entity.first_seen).toLocaleDateString() : "-"}</td>
        <td>${ce.entity.last_seen ? new Date(ce.entity.last_seen).toLocaleDateString() : "-"}</td>
      </tr>
    `
  })

  html += `
      </table>
  `

  if (data.activities && data.activities.length > 0) {
    html += `
      <h2>Timeline</h2>
      <div>
    `

    data.activities.forEach((activity: any) => {
      html += `
        <div class="entity-row">
          <strong>${activity.action_type}</strong> - ${new Date(activity.created_at).toLocaleString()}
          <p>${activity.description || ""}</p>
        </div>
      `
    })

    html += `
      </div>
    `
  }

  html += `
      <footer style="margin-top: 50px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
        <p>This report was generated by OSINT Research on ${exportDate}</p>
        <p>Confidential - For authorized use only</p>
      </footer>
    </body>
    </html>
  `

  return html
}
