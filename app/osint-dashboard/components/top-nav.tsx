'use client'

import { Shield, Search, AlertCircle, Share2, Settings, Upload, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-4 h-14 border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <span className="font-semibold text-white">OSINT Platform</span>
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-800" />

        <Select defaultValue="investigation-001">
          <SelectTrigger className="w-[200px] bg-transparent border-gray-700 text-white">
            <SelectValue placeholder="Select investigation" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="investigation-001">Investigation #001</SelectItem>
            <SelectItem value="investigation-002">Investigation #002</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-yellow-500 text-yellow-500 bg-yellow-500/10">
            <AlertCircle className="h-3 w-3 mr-1" />
            High Priority
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-500/10">
            Active
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <AlertCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Settings className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 bg-gray-800 mx-2" />

        <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Upload className="h-4 w-4" />
          Import
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Download className="h-4 w-4" />
          Export
        </Button>

        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src="/placeholder.svg?height=32&width=32&query=agent" />
          <AvatarFallback className="bg-gray-800 text-white">JM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
