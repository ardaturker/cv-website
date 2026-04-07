import type { LeveledSkillCategory, Language } from '~/types'

export const skills: LeveledSkillCategory[] = [
  {
    category: 'Technical & Programming',
    icon: 'mdi:code-braces',
    items: [
      { name: 'Python', level: 4 },
      { name: 'HTML / CSS', level: 5 },
      { name: 'JavaScript', level: 4 },
      { name: 'MySQL', level: 4 },
      { name: 'C', level: 3 },
      { name: 'Vue.js / React', level: 3 },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: 'mdi:chart-bar',
    items: [
      { name: 'Excel / SPSS', level: 5 },
      { name: 'Power BI', level: 4 },
      { name: 'Quantitative Analysis', level: 5 },
      { name: 'Machine Learning', level: 3 },
      { name: 'MATLAB', level: 3 },
      { name: 'Plant Simulation', level: 3 },
    ],
  },
  {
    category: 'Supply Chain & Operations',
    icon: 'mdi:truck-delivery',
    items: [
      { name: 'Data Pipelines & Automation', level: 4 },
      { name: 'Production Optimization', level: 4 },
      { name: 'Forecasting & Planning', level: 4 },
      { name: 'Demand Planning', level: 3 },
      { name: 'MRP / ERP Systems', level: 3 },
      { name: 'Process Improvement', level: 4 },
    ],
  },
  {
    category: 'Design & Tools',
    icon: 'mdi:palette',
    items: [
      { name: 'Figma', level: 5 },
      { name: 'Photoshop', level: 4 },
      { name: 'UI/UX Design', level: 4 },
      { name: 'Data Visualization', level: 4 },
      { name: 'Siemens NX', level: 2 },
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
