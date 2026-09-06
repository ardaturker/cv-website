import type { LeveledSkillCategory, Language } from '~/types'

export const skills: LeveledSkillCategory[] = [
  {
    category: 'Technical & Programming',
    tab: 'Technical',
    icon: 'mdi:code-braces',
    items: [
      { name: 'Python', value: 90 },
      { name: 'HTML / CSS', value: 100 },
      { name: 'JavaScript', value: 90 },
      { name: 'MySQL', value: 80 },
      { name: 'C', value: 60 },
      { name: 'Vue.js / React', value: 60 },
    ],
  },
  {
    category: 'Data & Analytics',
    tab: 'Data',
    icon: 'mdi:chart-bar',
    items: [
      { name: 'Excel / SPSS', value: 100 },
      { name: 'Power BI', value: 80 },
      { name: 'Quantitative Analysis', value: 100 },
      { name: 'Machine Learning', value: 60 },
      { name: 'MATLAB', value: 60 },
      { name: 'Plant Simulation', value: 60 },
    ],
  },
  {
    category: 'Supply Chain & Operations',
    tab: 'Supply Chain',
    icon: 'mdi:truck-delivery',
    items: [
      { name: 'Data Pipelines & Automation', value: 80 },
      { name: 'Production Optimization', value: 80 },
      { name: 'Forecasting & Planning', value: 100 },
      { name: 'Demand Planning', value: 60 },
      { name: 'MRP / ERP Systems', value: 80 },
      { name: 'Process Improvement', value: 80 },
    ],
  },
  {
    category: 'Design & Tools',
    tab: 'Design',
    icon: 'mdi:palette',
    items: [
      { name: 'Figma', value: 100 },
      { name: 'Photoshop', value: 80 },
      { name: 'UI/UX Design', value: 80 },
      { name: 'Data Visualization', value: 80 },
      { name: 'Siemens NX', value: 40 },
    ],
  },
]

export const languages: Language[] = [
  {
    name: 'Turkish',
    level: 'Native',
    understanding: 'Excellent',
    speaking: 'Excellent',
    written: 'Excellent',
  },
  {
    name: 'English',
    level: 'Fluent — IELTS 7.0',
    understanding: 'Excellent',
    speaking: 'Excellent',
    written: 'Excellent',
  },
  {
    name: 'Danish',
    level: 'Beginner',
    understanding: 'Basic',
    speaking: 'Basic',
    written: 'Basic',
  },
  {
    name: 'German',
    level: 'Basic',
    understanding: 'Basic',
    speaking: 'Basic',
    written: 'Basic',
  },
]
