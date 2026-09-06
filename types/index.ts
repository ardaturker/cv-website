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

/** A tracked skill scored 0–100. Drives the 5-cell segmented stat bars. */
export interface SkillItem {
  name: string
  value: number
}

export interface LeveledSkillCategory {
  category: string
  /** Short label for the stat-screen tab strip, e.g. 'Supply Chain'. */
  tab: string
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

export type ProjectTrack = 'Research' | 'Data' | 'Engineering'

/** One workstream inside a project, scored 0–100 for the contribution bars. */
export interface Workstream {
  name: string
  value: number
}

export interface CrewMember {
  name: string
  role: string
  /** True while the name is still a stand-in — renders in muted grey. */
  placeholder?: boolean
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
  kind: string
  level: string
  track: ProjectTrack
  /** Author's share of the whole project, e.g. '70%'. */
  share: string
  role: string
  /** Extra meta shown after kind and level, e.g. 'Credits 15'. */
  meta: string[]
  work: Workstream[]
  crew: CrewMember[]
}

export interface ContactInfo {
  email: string
  github?: string
  instagram?: string
  facebook?: string
  linkedin?: string
}
