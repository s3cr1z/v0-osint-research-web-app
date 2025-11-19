'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ExternalLink, Facebook, MapPin, Clock } from 'lucide-react'
import { mockSocialPosts } from '../lib/mock-data'

const platformIcons = {
  Facebook: Facebook,
  Twitter: Facebook,
  Instagram: Facebook,
  LinkedIn: Facebook,
}

export default function SocialView() {
  return (
    <div className="space-y-4">
      {mockSocialPosts.map((post) => {
        const PlatformIcon = platformIcons[post.platform]
        return (
          <Card key={post.id} className="border-gray-800 bg-gray-900 p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.avatarUrl} className="grayscale" />
                <AvatarFallback className="bg-gray-800">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-white">{post.author}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <PlatformIcon className="h-3 w-3" />
                      <span>{post.platform}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300">{post.content}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{post.location}</span>
                  </div>
                </div>

                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs text-blue-400 hover:text-blue-300"
                >
                  View Original
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
