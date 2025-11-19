'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, Calendar, UserCircle } from 'lucide-react'
import type { Investigation } from '../types/investigation'

interface CaseHeaderProps {
  investigation: Investigation
}

export default function CaseHeader({ investigation }: CaseHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{investigation.caseNumber}</h1>
          <p className="text-sm text-gray-400">{investigation.title}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Badge variant="outline" className="gap-1 border-gray-700 text-gray-300">
          <Calendar className="h-3 w-3" />
          Opened {investigation.openedDate}
        </Badge>
        <Badge variant="outline" className="gap-1 border-gray-700 text-gray-300">
          <UserCircle className="h-3 w-3" />
          Assigned to {investigation.assignedTo}
        </Badge>
      </div>
    </div>
  )
}
