export interface Profile {
  name: string
  title: string
  bio: string
  location: string
  email: string
  phone: string
  avatarUrl: string
  resumeUrl: string
  social: {
    github?: string
    linkedin?: string
    instagram?: string
    facebook?: string
  }
}

export interface ExperienceItem {
  id?: string
  company: string
  title: string
  role?: string
  startDate: string
  endDate: string | null
  location?: string
  description?: string
  bullets: string[]
  technologies?: string[]
}

export interface EducationItem {
  id?: string
  school?: string
  institution?: string
  degree: string
  field: string
  year?: string
  startDate?: string
  endDate?: string | null
  subjects?: string[]
}

export interface SkillItem {
  name: string
  level: 1 | 2 | 3 | 4 | 5
}

export interface LeveledSkillCategory {
  category: string
  icon: string
  items: SkillItem[]
}

export interface Language {
  name: string
  level: string
  understanding: string
  speaking: string
  written: string
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
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  color: 'orange' | 'green' | 'blue'
}

export interface ContactInfo {
  email: string
  github?: string
  instagram?: string
  facebook?: string
  linkedin?: string
}

export interface Photo {
  src: string
  alt: string
  caption?: string
  category?: string
}
