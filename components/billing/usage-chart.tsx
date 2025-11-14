"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface UsageChartProps {
  usage: Array<{
    integration: string
    credits_used: number
    created_at: string
  }>
}

export function UsageChart({ usage }: UsageChartProps) {
  // Aggregate usage by integration
  const byIntegration = usage.reduce(
    (acc, log) => {
      const existing = acc.find((x) => x.name === log.integration)
      if (existing) {
        existing.value += log.credits_used
      } else {
        acc.push({ name: log.integration, value: log.credits_used })
      }
      return acc
    },
    [] as Array<{ name: string; value: number }>,
  )

  // Aggregate usage by day
  const byDay = usage.reduce(
    (acc, log) => {
      const date = new Date(log.created_at).toLocaleDateString()
      const existing = acc.find((x) => x.date === date)
      if (existing) {
        existing.credits += log.credits_used
      } else {
        acc.push({ date, credits: log.credits_used })
      }
      return acc
    },
    [] as Array<{ date: string; credits: number }>,
  )

  const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Usage by Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage by Integration</CardTitle>
          <CardDescription>Credits spent per service</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byIntegration}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {byIntegration.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Usage over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Trend</CardTitle>
          <CardDescription>Daily credit consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" style={{ fontSize: "12px" }} />
              <YAxis style={{ fontSize: "12px" }} />
              <Tooltip />
              <Bar dataKey="credits" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
