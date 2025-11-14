"use client"

// This component is deprecated - graph visualization moved to SVG canvas in app/graph/page.tsx

const typeColors: Record<string, string> = {
  domain: "bg-blue-500",
  subdomain: "bg-blue-400",
  ip: "bg-purple-500",
  cidr: "bg-purple-400",
  email: "bg-green-500",
  username: "bg-amber-500",
  phone: "bg-pink-500",
  crypto_address: "bg-orange-500",
  ssl_hash: "bg-red-500",
  as_number: "bg-cyan-500",
}

export function EntityNode({ data }: { data: any }) {
  const color = typeColors[data.type] || "bg-gray-500"

  return (
    <div className={`px-3 py-2 rounded-lg border-2 border-current ${color} text-white shadow-lg`}>
      {/* Remove reactflow dependency - no longer needed with custom SVG graph */}
      <div className="text-xs font-semibold truncate max-w-[120px]">{data.label}</div>
      <div className="text-xs opacity-75 mt-1">{data.type}</div>
    </div>
  )
}
