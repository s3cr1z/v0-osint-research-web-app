'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Facebook } from 'lucide-react'
import type { Investigation } from '../types/investigation'

interface CaseSummaryProps {
  investigation: Investigation
}

export default function CaseSummary({ investigation }: CaseSummaryProps) {
  return (
    <Card className="border-gray-800 bg-gray-900 p-4 sm:p-6">
      <h3 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">Case Summary</h3>

      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-gray-800 pb-3 sm:pb-4">
          <p className="text-sm text-gray-300">{investigation.summary}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
          <div>
            <div className="text-gray-500">Source Type</div>
            <div className="mt-1 text-gray-300">{investigation.sourceType}</div>
          </div>
          <div>
            <div className="text-gray-500">Source</div>
            <div className="mt-1 flex items-center gap-2 text-gray-300">
              <Facebook className="h-4 w-4 text-blue-500" />
              {investigation.source}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Reference Threat</div>
            <div className="mt-1 text-gray-300">{investigation.referenceThreat}</div>
          </div>
          <div>
            <div className="text-gray-500">Reference Use Case</div>
            <div className="mt-1 text-gray-300">{investigation.referenceUseCase}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Trigger Rule</div>
          <div className="mt-1 text-sm text-gray-300 break-words">
            <span className="text-green-400">[+5 keywords]</span> in a{' '}
            <span className="text-green-400">[Post]</span> on{' '}
            <span className="text-green-400">[Source of Interest]</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 sm:w-auto">
          View Source
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  )
}
