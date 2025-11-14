// Entity type detection and normalization
export type EntityType =
  | "domain"
  | "subdomain"
  | "ip"
  | "cidr"
  | "email"
  | "username"
  | "phone"
  | "crypto_address"
  | "ssl_hash"
  | "as_number"

export interface ParsedEntity {
  type: EntityType
  value: string
  normalizedValue: string
  confidence: number
}

// Detect entity type by pattern matching
export function detectEntityType(input: string): ParsedEntity | null {
  const trimmed = input.trim()

  // Email detection
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return {
      type: "email",
      value: trimmed,
      normalizedValue: trimmed.toLowerCase(),
      confidence: 1,
    }
  }

  // IPv4 detection
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(trimmed)) {
    return {
      type: "ip",
      value: trimmed,
      normalizedValue: trimmed,
      confidence: 1,
    }
  }

  // CIDR detection
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(trimmed)) {
    return {
      type: "cidr",
      value: trimmed,
      normalizedValue: trimmed,
      confidence: 1,
    }
  }

  // Bitcoin/Crypto address detection (34-35 chars, starts with 1, 3, or bc1)
  if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(trimmed)) {
    return {
      type: "crypto_address",
      value: trimmed,
      normalizedValue: trimmed.toLowerCase(),
      confidence: 1,
    }
  }

  // Phone number detection (basic)
  if (/^\+?1?\s?($$[0-9]{3}$$|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/.test(trimmed)) {
    return {
      type: "phone",
      value: trimmed,
      normalizedValue: trimmed.replace(/\D/g, ""),
      confidence: 0.8,
    }
  }

  // SSL Hash detection (40 or 64 hex chars)
  if (/^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/.test(trimmed)) {
    return {
      type: "ssl_hash",
      value: trimmed,
      normalizedValue: trimmed.toLowerCase(),
      confidence: 0.9,
    }
  }

  // AS Number detection
  if (/^AS\d+$/i.test(trimmed)) {
    return {
      type: "as_number",
      value: trimmed,
      normalizedValue: trimmed.toUpperCase(),
      confidence: 1,
    }
  }

  // Domain/Subdomain detection
  if (/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(trimmed)) {
    const parts = trimmed.split(".")
    const isSubdomain = parts.length > 2
    return {
      type: isSubdomain ? "subdomain" : "domain",
      value: trimmed,
      normalizedValue: trimmed.toLowerCase(),
      confidence: 1,
    }
  }

  // Username detection (basic: alphanumeric + underscore/dash, 3-32 chars)
  if (/^[a-zA-Z0-9_-]{3,32}$/.test(trimmed)) {
    return {
      type: "username",
      value: trimmed,
      normalizedValue: trimmed.toLowerCase(),
      confidence: 0.7,
    }
  }

  return null
}

// Parse multiple entities from text (comma or newline separated)
export function parseMultipleEntities(input: string): ParsedEntity[] {
  const entities = input
    .split(/[,\n]/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(detectEntityType)
    .filter((e): e is ParsedEntity => e !== null)

  return entities
}
