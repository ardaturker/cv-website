export interface ExperienceItem {
  company: string
  title: string
  startDate: string
  endDate: string
  bullets: string[]
  location?: string
}

export interface EducationItem {
  school: string
  degree: string
  field: string
  year: string
}

export interface SkillCategory {
  category: string
  color: 'orange' | 'green' | 'blue' | 'yellow'
  skills: string[]
}

export interface Project {
  title: string
  description: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  color: 'orange' | 'green' | 'blue'
}

export interface ContactInfo {
  email: string
  github: string
  linkedin: string
  twitter?: string
  instagram?: string
}
