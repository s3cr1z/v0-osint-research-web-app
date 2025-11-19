'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockTeamMembers } from '../lib/mock-data'

export default function DetailsView() {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <div className="text-gray-500">Status</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-gray-300">Active Investigation</span>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div>
        <div className="text-gray-500">Priority Level</div>
        <div className="mt-2">
          <Badge variant="outline" className="border-yellow-500 bg-yellow-500/20 text-yellow-400">
            High Priority
          </Badge>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div>
        <div className="text-gray-500">Team Members</div>
        <div className="mt-2 flex -space-x-2">
          {mockTeamMembers.map((member) => (
            <Avatar key={member.id} className="h-8 w-8 border-2 border-gray-900">
              <AvatarImage src={member.avatarUrl} />
              <AvatarFallback className="bg-gray-800 text-xs">{member.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div className="space-y-2">
        <div>
          <span className="text-gray-500">Created:</span>{' '}
          <span className="text-gray-300">2024-01-15</span>
        </div>
        <div>
          <span className="text-gray-500">Last Updated:</span>{' '}
          <span className="text-gray-300">2024-01-18</span>
        </div>
        <div>
          <span className="text-gray-500">Case ID:</span>{' '}
          <span className="font-mono text-gray-300">2024-INV-001</span>
        </div>
      </div>
    </div>
  )
}
