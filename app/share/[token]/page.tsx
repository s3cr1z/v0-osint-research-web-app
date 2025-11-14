"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SharePage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Shared OSINT Report</CardTitle>
          <CardDescription>This report has been shared with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Share Token: <code>{params.token}</code>
            </p>
            <p className="text-sm">
              In production, this would display the shared case data with appropriate access controls and expiration
              times.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full bg-transparent">
              Download PDF
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
