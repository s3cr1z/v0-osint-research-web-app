'use client'

import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CommandInput() {
  return (
    <div className="border-t border-gray-800 bg-black/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2">
        <Search className="h-4 w-4 flex-shrink-0 text-gray-500" />
        <Input
          type="text"
          placeholder="Type your command or query here..."
          className="flex-1 border-0 bg-transparent p-0 text-sm text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 text-gray-400 hover:text-white">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
