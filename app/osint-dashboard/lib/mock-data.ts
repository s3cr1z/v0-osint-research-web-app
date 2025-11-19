import type { Investigation, TimelineEvent, SocialPost, TeamMember } from '../types/investigation'

export const mockInvestigation: Investigation = {
  caseNumber: 'Case #2024-INV-001',
  title: 'Suspicious Activity Investigation',
  status: 'active',
  priority: 'high',
  assignedTo: 'Jonathan Murphy',
  openedDate: '2024-01-15',
  summary: 'Suspicious person watching JC homes in Caulfield area. Multiple reports of photographing private residences without permission.',
  sourceType: 'Social Media',
  source: 'Facebook',
  referenceThreat: 'Hate Crime',
  referenceUseCase: 'Physical harm to JC members',
  triggerRule: '[+5 keywords] in a [Post] on [Source of Interest]',
  personOfInterest: {
    id: 'poi-001',
    name: 'Timothée Chalamet',
    age: 28,
    nationality: 'Australian',
    occupation: 'Civil Engineer',
    workplace: 'Municipality of Melbourne',
    address: 'Briggs St, Caulfield',
    imageUrl: '/placeholder.svg?height=80&width=80&query=person'
  },
  riskCategories: [
    { name: 'Financial Crime', score: 85, color: 'bg-red-500' },
    { name: 'Terrorism', score: 12, color: 'bg-green-500' },
    { name: 'Organized Crime', score: 45, color: 'bg-yellow-500' },
    { name: 'Cybercrime', score: 67, color: 'bg-orange-500' },
    { name: 'Human Trafficking', score: 23, color: 'bg-green-500' },
  ]
}

export const mockTimelineEvents: TimelineEvent[] = [
  { time: '09:00', type: 'location', label: 'Home' },
  { time: '10:30', type: 'communication', label: 'Phone Call' },
  { time: '12:00', type: 'transaction', label: 'Bank Transfer' },
  { time: '14:30', type: 'social', label: 'Social Post' },
  { time: '16:00', type: 'location', label: 'Work' },
  { time: '18:30', type: 'meeting', label: 'Meeting' },
]

export const mockSocialPosts: SocialPost[] = [
  {
    id: 'post-001',
    author: 'Timothée Chalamet',
    platform: 'Facebook',
    content: 'Just saw a suspicious-looking man seemingly take a bunch of pictures of our house at Briggs st in Caulfield...',
    timestamp: '2024-01-15 14:30',
    location: 'Caulfield, VIC',
    avatarUrl: '/placeholder.svg?height=40&width=40&query=person'
  },
  {
    id: 'post-002',
    author: 'Timothée Chalamet',
    platform: 'Twitter',
    content: 'Concerned about security in the neighborhood. Multiple incidents reported.',
    timestamp: '2024-01-15 16:45',
    location: 'Melbourne, VIC',
    avatarUrl: '/placeholder.svg?height=40&width=40&query=person'
  }
]

export const mockTeamMembers: TeamMember[] = [
  { id: 'tm-001', name: 'Jonathan Murphy', initials: 'JM', avatarUrl: '/placeholder.svg?height=32&width=32&query=agent1' },
  { id: 'tm-002', name: 'Sarah Chen', initials: 'SC', avatarUrl: '/placeholder.svg?height=32&width=32&query=agent2' },
  { id: 'tm-003', name: 'Michael Torres', initials: 'MT', avatarUrl: '/placeholder.svg?height=32&width=32&query=agent3' },
]
