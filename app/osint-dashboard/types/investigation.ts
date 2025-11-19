export interface PersonOfInterest {
  id: string
  name: string
  age: number
  nationality: string
  occupation: string
  workplace: string
  address: string
  imageUrl: string
}

export interface RiskCategory {
  name: string
  score: number
  color: string
}

export interface Investigation {
  caseNumber: string
  title: string
  status: 'active' | 'closed' | 'pending'
  priority: 'high' | 'medium' | 'low'
  assignedTo: string
  openedDate: string
  summary: string
  sourceType: string
  source: string
  referenceThreat: string
  referenceUseCase: string
  triggerRule: string
  personOfInterest: PersonOfInterest
  riskCategories: RiskCategory[]
}

export interface TimelineEvent {
  time: string
  type: 'location' | 'communication' | 'transaction' | 'social' | 'meeting'
  label: string
}

export interface SocialPost {
  id: string
  author: string
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn'
  content: string
  timestamp: string
  location: string
  avatarUrl?: string
}

export interface TeamMember {
  id: string
  name: string
  initials: string
  avatarUrl?: string
}

export interface GraphNode {
  id: string
  label: string
  type: 'poi' | 'social' | 'financial' | 'associate' | 'location'
  x: number
  y: number
}

export interface GraphConnection {
  from: string
  to: string
  label?: string
}
