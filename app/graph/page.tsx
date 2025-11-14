"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraphControls } from "@/components/graph/graph-controls"
import { NodeDetailsPanel } from "@/components/graph/node-details-panel"
import { Zap } from "lucide-react"

interface GraphNode {
  id: string
  type: string
  value: string
  x: number
  y: number
}

interface GraphEdge {
  id: string
  source: string
  target: string
  relationship_type: string
  confidence: number
}

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  domain: { bg: "#1e3a5f", border: "#3b82f6", text: "text-blue-400" },
  subdomain: { bg: "#1e3a5f", border: "#60a5fa", text: "text-blue-300" },
  ip: { bg: "#2e1a47", border: "#a855f7", text: "text-purple-400" },
  cidr: { bg: "#2e1a47", border: "#d8b4fe", text: "text-purple-300" },
  email: { bg: "#1b3a1b", border: "#22c55e", text: "text-green-400" },
  username: { bg: "#3a2a1a", border: "#f59e0b", text: "text-amber-400" },
  phone: { bg: "#3a1a2a", border: "#ec4899", text: "text-pink-400" },
  crypto_address: { bg: "#3a2a1a", border: "#f97316", text: "text-orange-400" },
  ssl_hash: { bg: "#3a1a1a", border: "#ef4444", text: "text-red-400" },
  as_number: { bg: "#1a3a3a", border: "#06b6d4", text: "text-cyan-400" },
}

export default function GraphPage() {
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [edges, setEdges] = useState<GraphEdge[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [draggingNode, setDraggingNode] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    setDraggingNode(nodeId)
    e.preventDefault()
  }

  const onCanvasMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNode) return

    const node = nodes.find((n) => n.id === draggingNode)
    if (!node) return

    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = (e.clientX - rect.left - offset.x) / 1
    const y = (e.clientY - rect.top - offset.y) / 1

    setNodes((nds) => nds.map((n) => (n.id === draggingNode ? { ...n, x, y } : n)))
  }

  const onCanvasMouseUp = () => {
    setDraggingNode(null)
  }

  async function addEntityToGraph(entityId: string) {
    setLoading(true)
    try {
      const response = await fetch(`/api/graph/entity/${entityId}`)
      if (!response.ok) throw new Error("Failed to fetch entity")

      const data = await response.json()
      const { entity, relationships } = data

      const newNode: GraphNode = {
        id: entity.id,
        type: entity.type,
        value: entity.value,
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
      }

      if (!nodes.find((n) => n.id === newNode.id)) {
        setNodes((nds) => [...nds, newNode])
      }

      relationships.forEach((rel: any, index: number) => {
        const targetNode: GraphNode = {
          id: rel.target.id,
          type: rel.target.type,
          value: rel.target.value,
          x: Math.random() * 600 - 300,
          y: Math.random() * 600 - 300,
        }

        if (!nodes.find((n) => n.id === targetNode.id)) {
          setNodes((nds) => [...nds, targetNode])
        }

        const newEdge: GraphEdge = {
          id: `${entity.id}-${rel.target.id}`,
          source: entity.id,
          target: rel.target.id,
          relationship_type: rel.relationship_type,
          confidence: rel.confidence,
        }

        if (!edges.find((e) => e.id === newEdge.id)) {
          setEdges((eds) => [...eds, newEdge])
        }
      })
    } catch (error) {
      console.error("Failed to add entity to graph:", error)
    } finally {
      setLoading(false)
    }
  }

  function clearGraph() {
    setNodes([])
    setEdges([])
    setSelectedNode(null)
  }

  function layoutNodes() {
    if (nodes.length === 0) return

    const newNodes = nodes.map((node, index) => ({
      ...node,
      x: (index % 4) * 200 - 300,
      y: Math.floor(index / 4) * 250 - 250,
    }))
    setNodes(newNodes)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Entity Graph</h1>
          <p className="text-sm text-muted-foreground mt-1">Visualize relationships between entities</p>
        </div>
      </header>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Graph Canvas */}
        <div className="flex-1 border border-border rounded-lg overflow-hidden bg-slate-950">
          <svg
            className="w-full h-full cursor-move"
            onMouseMove={onCanvasMouseMove}
            onMouseUp={onCanvasMouseUp}
            onMouseLeave={onCanvasMouseUp}
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map((edge) => {
              const sourceNode = nodes.find((n) => n.id === edge.source)
              const targetNode = nodes.find((n) => n.id === edge.target)
              if (!sourceNode || !targetNode) return null

              const centerX = window.innerWidth / 2
              const centerY = window.innerHeight / 2

              return (
                <g key={edge.id}>
                  <line
                    x1={centerX + sourceNode.x}
                    y1={centerY + sourceNode.y}
                    x2={centerX + targetNode.x}
                    y2={centerY + targetNode.y}
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                    opacity="0.6"
                  />
                  <text
                    x={(centerX + sourceNode.x + centerX + targetNode.x) / 2}
                    y={(centerY + sourceNode.y + centerY + targetNode.y) / 2 - 5}
                    fill="#94a3b8"
                    fontSize="12"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {edge.relationship_type}
                  </text>
                </g>
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const colors = typeColors[node.type] || typeColors.domain
              const centerX = window.innerWidth / 2
              const centerY = window.innerHeight / 2

              return (
                <g
                  key={node.id}
                  onMouseDown={(e) => onNodeMouseDown(node.id, e)}
                  style={{ cursor: draggingNode === node.id ? "grabbing" : "grab" }}
                >
                  {/* Node circle */}
                  <circle
                    cx={centerX + node.x}
                    cy={centerY + node.y}
                    r="45"
                    fill={colors.bg}
                    stroke={colors.border}
                    strokeWidth="3"
                    className="transition-all"
                    onClick={() => setSelectedNode(node.id)}
                    style={{
                      filter:
                        selectedNode === node.id
                          ? "drop-shadow(0 0 12px rgba(236, 72, 153, 0.5))"
                          : "drop-shadow(0 0 6px rgba(0, 0, 0, 0.3))",
                    }}
                  />

                  {/* Node label */}
                  <text
                    x={centerX + node.x}
                    y={centerY + node.y - 5}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="13"
                    fontWeight="600"
                    className="pointer-events-none select-none"
                  >
                    {node.value.substring(0, 15)}
                  </text>

                  {/* Node type */}
                  <text
                    x={centerX + node.x}
                    y={centerY + node.y + 12}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="11"
                    className="pointer-events-none select-none"
                  >
                    {node.type}
                  </text>
                </g>
              )
            })}
          </svg>

          {nodes.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Zap className="mx-auto mb-3 text-muted-foreground opacity-50" size={40} />
                <p className="text-muted-foreground text-sm">
                  Graph is empty. Search for entities and add them to visualize.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-80 space-y-4 overflow-y-auto">
          {/* Controls */}
          <GraphControls
            onAddEntity={() => {}}
            onLayoutNodes={layoutNodes}
            onClearGraph={clearGraph}
            nodeCount={nodes.length}
            edgeCount={edges.length}
          />

          {/* Node Details */}
          {selectedNode && <NodeDetailsPanel nodeId={selectedNode} onClose={() => setSelectedNode(null)} />}

          {/* Instructions */}
          {nodes.length === 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Get Started</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>1. Search for an entity</p>
                <p>2. Click "Add to Graph"</p>
                <p>3. Drag nodes to move</p>
                <p>4. Click "Layout" to organize</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
