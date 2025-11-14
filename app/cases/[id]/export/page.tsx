"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Download, Link2 } from "lucide-react"

export default function ExportPage() {
  const params = useParams()
  const caseId = params.id as string
  const [format, setFormat] = useState<"csv" | "json" | "pdf">("pdf")
  const [options, setOptions] = useState({
    includeEnrichment: true,
    includeTimeline: true,
    redactSensitive: false,
  })
  const [exporting, setExporting] = useState(false)
  const [shareLink, setShareLink] = useState<string | null>(null)
  const { toast } = useToast()

  async function handleExport() {
    setExporting(true)
    try {
      const response = await fetch(`/api/export/${caseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, ...options }),
      })

      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `case-${caseId}.${format === "json" ? "json" : format === "csv" ? "csv" : "html"}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Success",
        description: "Export downloaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Export failed",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
    }
  }

  async function handleCreateShareLink() {
    try {
      const response = await fetch(`/api/export/${caseId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...options }),
      })

      if (!response.ok) throw new Error("Share link creation failed")

      const data = await response.json()
      setShareLink(data.shareLink)

      toast({
        title: "Success",
        description: "Share link created",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Export Case</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Format</CardTitle>
            <CardDescription>Choose how to export your case data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(["csv", "json", "pdf"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`p-3 rounded-lg border-2 transition ${
                    format === fmt ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold uppercase text-sm">{fmt}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {fmt === "csv" ? "Spreadsheet" : fmt === "json" ? "Structured" : "Report"}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="enrichment"
                checked={options.includeEnrichment}
                onCheckedChange={(checked) =>
                  setOptions({
                    ...options,
                    includeEnrichment: checked as boolean,
                  })
                }
              />
              <label htmlFor="enrichment" className="text-sm cursor-pointer">
                Include enrichment data
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="timeline"
                checked={options.includeTimeline}
                onCheckedChange={(checked) =>
                  setOptions({
                    ...options,
                    includeTimeline: checked as boolean,
                  })
                }
              />
              <label htmlFor="timeline" className="text-sm cursor-pointer">
                Include timeline and notes
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="redact"
                checked={options.redactSensitive}
                onCheckedChange={(checked) =>
                  setOptions({
                    ...options,
                    redactSensitive: checked as boolean,
                  })
                }
              />
              <label htmlFor="redact" className="text-sm cursor-pointer">
                Redact sensitive data (emails, phone numbers)
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Export Button */}
        <Button onClick={handleExport} disabled={exporting} size="lg" className="w-full">
          {exporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download Export
            </>
          )}
        </Button>

        {/* Share Link */}
        <Card>
          <CardHeader>
            <CardTitle>Share Report</CardTitle>
            <CardDescription>Create a shareable link for stakeholders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {shareLink ? (
              <div className="space-y-2">
                <div className="p-3 bg-secondary rounded-lg font-mono text-sm break-all">{shareLink}</div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink)
                    toast({
                      title: "Copied",
                      description: "Link copied to clipboard",
                    })
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Copy Link
                </Button>
              </div>
            ) : (
              <Button onClick={handleCreateShareLink} variant="outline" className="w-full bg-transparent">
                <Link2 className="w-4 h-4 mr-2" />
                Create Share Link
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
