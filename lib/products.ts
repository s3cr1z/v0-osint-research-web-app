export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  credits: number
  images?: string[]
}

export const CREDIT_PACKAGES: Product[] = [
  {
    id: "credits-100",
    name: "100 Credits",
    description: "Basic enrichment package",
    priceInCents: 999, // $9.99
    credits: 100,
  },
  {
    id: "credits-500",
    name: "500 Credits",
    description: "Popular choice - 17% savings",
    priceInCents: 4499, // $44.99
    credits: 500,
  },
  {
    id: "credits-2000",
    name: "2000 Credits",
    description: "Pro analyst - 50% savings",
    priceInCents: 9999, // $99.99
    credits: 2000,
  },
]

export const SUBSCRIPTION_PLANS = [
  {
    id: "plan-free",
    name: "Free",
    description: "Get started",
    priceInCents: 0,
    creditsPerMonth: 100,
    features: ["100 credits/month", "1 case limit", "Watermarked exports", "Basic integrations"],
  },
  {
    id: "plan-pro",
    name: "Pro",
    description: "For analysts",
    priceInCents: 4999, // $49.99/month
    creditsPerMonth: 1000,
    features: ["1000 credits/month", "Unlimited cases", "No watermarks", "All integrations", "Priority support"],
  },
  {
    id: "plan-team",
    name: "Team",
    description: "For teams",
    priceInCents: 9999, // $99.99/month
    creditsPerMonth: 5000,
    features: [
      "5000 credits/month",
      "Team workspaces",
      "Role management",
      "Audit logs",
      "API access",
      "Dedicated support",
    ],
  },
]
