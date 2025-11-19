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
    <Card className="border-gray-800 bg-gray-900 p-6">
      <div className="flex gap-6">
        <Avatar className="h-20 w-20 rounded-lg">
          <AvatarImage src={person.imageUrl} className="grayscale" />
          <AvatarFallback className="rounded-lg bg-gray-800 text-lg">
            {person.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{person.name}</h3>
            <Badge variant="outline" className="mt-1 border-red-500 bg-red-500/20 text-red-400">
              Person of Interest
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:grid-cols-3">
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
            <div className="col-span-2">
              <span className="text-gray-500">Address:</span>{' '}
              <span className="text-gray-300">{person.address}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
