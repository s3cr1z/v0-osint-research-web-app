// Enrichment integrations catalog with credit costs
export interface Integration {
  id: string
  name: string
  description: string
  credits_per_call: number
  rate_limit: number // calls per minute
  supported_types: string[]
}

export const INTEGRATIONS: Record<string, Integration> = {
  whois: {
    id: "whois",
    name: "WHOIS Lookup",
    description: "Domain registration and registrar data",
    credits_per_call: 1,
    rate_limit: 10,
    supported_types: ["domain", "subdomain"],
  },
  dns: {
    id: "dns",
    name: "DNS Resolution",
    description: "DNS records and MX servers",
    credits_per_call: 1,
    rate_limit: 20,
    supported_types: ["domain", "subdomain"],
  },
  ssl: {
    id: "ssl",
    name: "SSL Certificate",
    description: "SSL certificate and transparency logs",
    credits_per_call: 2,
    rate_limit: 10,
    supported_types: ["domain", "subdomain", "ip"],
  },
  breach: {
    id: "breach",
    name: "Breach Data",
    description: "Check against known breaches",
    credits_per_call: 1,
    rate_limit: 15,
    supported_types: ["email", "username"],
  },
  ip_reputation: {
    id: "ip_reputation",
    name: "IP Reputation",
    description: "IP threat intelligence",
    credits_per_call: 2,
    rate_limit: 10,
    supported_types: ["ip", "cidr"],
  },
}

// Get integrations available for entity type
export function getIntegrationsForType(entityType: string): Integration[] {
  return Object.values(INTEGRATIONS).filter((i) => i.supported_types.includes(entityType))
}
