'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import CaseHeader from './case-header'
import POICard from './poi-card'
import CaseSummary from './case-summary'
import RiskAssessment from './risk-assessment'
import { mockInvestigation } from '../lib/mock-data'

export default function CenterPanel() {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <CaseHeader investigation={mockInvestigation} />
          <POICard person={mockInvestigation.personOfInterest} />
          <CaseSummary investigation={mockInvestigation} />
          <RiskAssessment categories={mockInvestigation.riskCategories} />
        </div>
      </ScrollArea>
    </div>
  )
}
