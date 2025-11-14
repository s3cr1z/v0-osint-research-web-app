import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CreditDisplayProps {
  credits: {
    balance: number
    plan: string
  } | null
}

export function CreditDisplay({ credits }: CreditDisplayProps) {
  if (!credits) {
    return (
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle>Current Credits</CardTitle>
          <CardDescription>Available for enrichment calls</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading credits...</p>
        </CardContent>
      </Card>
    )
  }

  const balance = credits.balance || 0
  const plan = credits.plan || "free"

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Current Credits</span>
          <Badge>{plan}</Badge>
        </CardTitle>
        <CardDescription>Available for enrichment calls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-4xl font-bold">{balance.toFixed(0)}</div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${Math.min((balance / 1000) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {balance > 500 ? "Good balance" : balance > 100 ? "Low on credits" : "Critical - consider purchasing"}
        </p>
      </CardContent>
    </Card>
  )
}
