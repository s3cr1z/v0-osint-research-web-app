'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import type { PersonOfInterest } from '../types/investigation'

interface POICardProps {
  person: PersonOfInterest
}

export default function POICard({ person }: POICardProps) {
  return (
    <Card className="border-gray-800 bg-gray-900 p-4 sm:p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        <Avatar className="h-16 w-16 rounded-lg sm:h-20 sm:w-20">
          <AvatarImage src={person.imageUrl} className="grayscale" />
          <AvatarFallback className="rounded-lg bg-gray-800 text-base sm:text-lg">
            {person.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-semibold text-white sm:text-xl">{person.name}</h3>
            <Badge variant="outline" className="mt-1 border-red-500 bg-red-500/20 text-red-400 text-xs">
              Person of Interest
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 md:grid-cols-3 sm:gap-x-8">
            <div>
              <span className="text-gray-500">Age:</span>{' '}
              <span className="text-gray-300">{person.age}</span>
            </div>
            <div>
              <span className="text-gray-500">Nationality:</span>{' '}
              <span className="text-gray-300">{person.nationality}</span>
            </div>
            <div>
              <span className="text-gray-500">Occupation:</span>{' '}
              <span className="text-gray-300">{person.occupation}</span>
            </div>
            <div>
              <span className="text-gray-500">Workplace:</span>{' '}
              <span className="text-gray-300">{person.workplace}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500">Address:</span>{' '}
              <span className="text-gray-300">{person.address}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
