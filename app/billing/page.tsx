"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CREDIT_PACKAGES, SUBSCRIPTION_PLANS } from "@/lib/products"
import { CreditDisplay } from "@/components/billing/credit-display"
import { UsageChart } from "@/components/billing/usage-chart"
import { Loader2 } from "lucide-react"

export default function BillingPage() {
  const [credits, setCredits] = useState<any>(null)
  const [usageData, setUsageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchBillingData()
  }, [])

  async function fetchBillingData() {
    try {
      // Fetch credits
      const creditsRes = await fetch("/api/credits")
      const creditsData = await creditsRes.json()
      setCredits(creditsData)

      // Fetch usage logs
      const { data: usage } = await supabase
        .from("usage_logs")
        .select("integration, credits_used, created_at")
        .order("created_at", { ascending: false })
        .limit(100)

      setUsageData(usage || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load billing data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handlePurchaseCredits(productId: string) {
    setPurchasing(productId)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) throw new Error("Checkout failed")

      const { clientSecret } = await response.json()
      if (clientSecret) {
        // Redirect to checkout (in real app)
        toast({
          title: "Checkout",
          description: "Redirecting to payment...",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout",
        variant: "destructive",
      })
    } finally {
      setPurchasing(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Billing & Credits</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Current Credits */}
        {credits && <CreditDisplay credits={credits} />}

        {/* Usage Chart */}
        {usageData && <UsageChart usage={usageData} />}

        {/* Pricing Tabs */}
        <Tabs defaultValue="credits" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credits">Credit Packages</TabsTrigger>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          </TabsList>

          {/* Credit Packages */}
          <TabsContent value="credits">
            <div className="grid md:grid-cols-3 gap-4">
              {CREDIT_PACKAGES.map((pkg) => (
                <Card key={pkg.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      <div className="text-3xl font-bold">${(pkg.priceInCents / 100).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{pkg.credits} credits</div>
                    </div>
                    <Button
                      onClick={() => handlePurchaseCredits(pkg.id)}
                      disabled={purchasing === pkg.id}
                      className="w-full"
                    >
                      {purchasing === pkg.id ? "Processing..." : "Buy Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscription Plans */}
          <TabsContent value="plans">
            <div className="grid md:grid-cols-3 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <Card
                  key={plan.id}
                  className={`flex flex-col ${plan.id === "plan-pro" ? "border-primary border-2" : ""}`}
                >
                  <CardHeader>
                    {plan.id === "plan-pro" && <Badge className="w-fit mb-2">Popular</Badge>}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      {plan.priceInCents === 0 ? (
                        <div className="text-3xl font-bold">Free</div>
                      ) : (
                        <>
                          <div className="text-3xl font-bold">${(plan.priceInCents / 100).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">per month</div>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant={plan.id === "plan-pro" ? "default" : "outline"}
                      className="w-full"
                      disabled={plan.id === "plan-free"}
                    >
                      {plan.id === "plan-free" ? "Current Plan" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your credit usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            {usageData && usageData.length > 0 ? (
              <div className="space-y-2">
                {usageData.slice(0, 10).map((log: any) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold">{log.integration}</div>
                      <div className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</div>
                    </div>
                    <div className="text-sm font-semibold">-{log.credits_used} credits</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No activity yet</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
