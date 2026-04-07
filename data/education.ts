import type { EducationItem } from '~/types'

export const education: EducationItem[] = [
  {
    id: 'msc-sdu',
    institution: 'University of Southern Denmark',
    degree: 'MSc',
    field: 'Supply Chain Digitalisation',
    startDate: '2025-09',
    endDate: null,
    subjects: [
      'Machine Learning',
      'Operations Research',
      'Automation & Digitalisation',
      'Data Science',
      'Finance for Engineers',
      'Supply Chain Fundamentals',
    ],
  },
  {
    id: 'bsc-sdu',
    institution: 'University of Southern Denmark',
    degree: 'BSc',
    field: 'Engineering, Innovation & Business',
    startDate: '2022-09',
    endDate: '2025-06',
    subjects: [
      'Mechanics & Electronics',
      'Programming',
      'Business Development',
      'Production Optimization',
      'Prototype Development',
      'Innovation & Management',
    ],
  },
  {
    id: 'erasmus-ut',
    institution: 'University of Twente',
    degree: 'Erasmus Exchange',
    field: 'Innovation, Entrepreneurship & Business Development',
    startDate: '2023-09',
    endDate: '2024-06',
    subjects: [
      'Innovation Management',
      'Entrepreneurship',
      'Business Development',
    ],
  },
]
