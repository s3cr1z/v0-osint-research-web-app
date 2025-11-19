'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { RiskCategory } from '../types/investigation'
import { cn } from '@/lib/utils'

interface RiskAssessmentProps {
  categories: RiskCategory[]
}

function getRiskColor(score: number) {
  if (score <= 30) return 'bg-green-500'
  if (score <= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function RiskAssessment({ categories }: RiskAssessmentProps) {
  return (
    <Card className="border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Risk Assessment</h3>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{category.name}</span>
              <span className="font-medium text-white">{category.score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-800">
              <div
                className={cn('h-full transition-all', getRiskColor(category.score))}
                style={{ width: `${category.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
