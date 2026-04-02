import type { Project } from '~/types'

export const projects: Project[] = [
  {
    title: 'AI Dashboard Platform',
    description: 'A real-time analytics dashboard powered by machine learning insights. Built for enterprise clients to monitor key business metrics with predictive alerts.',
    techStack: ['Vue 3', 'TypeScript', 'Python', 'FastAPI', 'WebSockets'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    color: 'orange',
  },
  {
    title: 'DevOps Automation Toolkit',
    description: 'A CLI tool that automates cloud infrastructure provisioning and deployment pipelines. Reduces setup time for new projects from days to minutes.',
    techStack: ['Python', 'Terraform', 'Docker', 'AWS', 'GitHub Actions'],
    githubUrl: 'https://github.com',
    featured: true,
    color: 'green',
  },
  {
    title: 'Open Source Component Library',
    description: 'A collection of accessible, customizable Vue 3 components with full TypeScript support and comprehensive documentation.',
    techStack: ['Vue 3', 'TypeScript', 'Vite', 'Vitest', 'Storybook'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    color: 'blue',
  },
  {
    title: 'E-commerce Storefront',
    description: 'A high-performance e-commerce storefront with server-side rendering, cart management, and payment integration.',
    techStack: ['Nuxt 3', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    featured: false,
    color: 'orange',
  },
]
