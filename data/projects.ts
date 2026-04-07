import type { Project } from '~/types'

export const projects: Project[] = [
  {
    title: 'Trading Platform Adoption & Retention',
    description: 'Bachelor thesis in collaboration with RYZE — a Cyprus-based multi-asset trading platform finalising its first funding round. Analysed retail investor adoption and retention through demographic, psychographic, and behavioural data. Applied regression, correlation, ANOVA and Mann-Whitney U tests to validate hypotheses around trust, social influence, financial literacy, and risk perception. Proposed usability and onboarding optimisation strategies.',
    techStack: ['SPSS', 'Python', 'Regression Analysis', 'Survey Design', 'Hypothesis Testing', 'Quantitative Research'],
    image: '/projects/bachelor_0.png',
    featured: true,
    color: 'blue',
  },
  {
    title: 'DK1 Electricity Price Forecasting & Production Planning',
    description: 'Developed a data-driven model to forecast Danish electricity market (DK1) hourly prices and optimise industrial production shift scheduling accordingly. The goal was to minimise total production costs — covering electricity, labour, outsourcing and backorder penalties — by scheduling production in the cheapest hours while respecting factory operational constraints.',
    techStack: ['Python', 'Machine Learning', 'Time Series Forecasting', 'Excel', 'Supply Chain Planning', 'Optimisation'],
    featured: true,
    color: 'orange',
  },
  {
    title: 'Urban Trends — Retail Data Science',
    description: 'Applied a complete data science lifecycle to invoice-level sales and product master data for Urban Trends, a multi-city retail company. Delivered actionable insights on product offering optimisation, inventory decisions, and customer purchasing behaviour across store locations. Covered data cleaning, EDA, statistical modelling and managerial recommendations.',
    techStack: ['Python', 'Data Science', 'EDA', 'Statistical Modelling', 'Inventory Optimisation', 'Pandas'],
    image: '/projects/datascience_0.jpg',
    featured: true,
    color: 'green',
  },
  {
    title: 'Sleepy Time — Smart Sleep Device',
    description: 'Designed and prototyped a personalised sleep device combining light, sound, and odour systems. Light mimics sunset and sunrise for natural sleep transitions; sound delivers white noise and breathing exercises; an odour module supports aromatherapy and humidity control. Fully customisable via a dedicated mobile app with sprint-based development across electronics, software, and mechanical design.',
    techStack: ['Embedded Systems', 'App Development', 'Mechanical Design', 'Prototype Development', 'Electronics', 'Figma'],
    image: '/projects/sleepytime_0.png',
    featured: false,
    color: 'blue',
  },
  {
    title: 'Conveyor System Design & Production Simulation',
    description: 'Designed a conveyor system from scratch including 3D modelling, technical drawings, mechanical component selection and supplier research. Built a Siemens Plant Simulation model to analyse throughput, bottlenecks and resource utilisation across three production growth scenarios (Year 1–3), reaching a 60k unit target.',
    techStack: ['Siemens NX', 'Plant Simulation', 'Process Optimisation', 'MATLAB', '3D Modelling', 'Technical Drawing'],
    image: '/projects/spro4_0.png',
    featured: false,
    color: 'orange',
  },
  {
    title: 'JackShot — Student Startup & TEK EXPO',
    description: 'Developed a physical product prototype from concept to pitch as part of a first-year engineering project. Covered full product lifecycle: mechanical design (arm and coin mechanism), technical drawings, business planning, and branding. Presented at TEK EXPO with a dedicated product brochure and QR-linked pitch.',
    techStack: ['Figma', 'Photoshop', 'Prototype Development', 'Mechanical Design', 'Business Planning', 'Product Design'],
    image: '/projects/jackshot.png',
    featured: false,
    color: 'green',
  },
]
