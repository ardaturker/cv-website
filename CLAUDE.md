# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Build for production
npm run generate   # Static site generation
npm run preview    # Preview production build
```

No test runner is configured beyond `@playwright/test` (no test files exist yet).

## Architecture

This is a single-page CV/portfolio website built with **Nuxt 3** + **Vue 3** + **TypeScript** + **Tailwind CSS**.

**Data layer** (`data/`): All CV content lives as plain TypeScript arrays/objects — `experience.ts`, `education.ts`, `skills.ts`, `projects.ts`, `volunteering.ts`, `contact.ts`. Each file exports typed data matching the interfaces in `types/index.ts`. To update CV content, edit only these files.

**Section components** (`components/Section*.vue`): Each page section is a standalone component (`SectionHero`, `SectionExperience`, `SectionVolunteering`, `SectionEducation`, `SectionSkills`, `SectionProjects`, `SectionContact`). They import directly from `data/` and render using the reusable UI primitives below.

**UI primitives** (`components/ui/`): Reusable building blocks — `SectionWrapper.vue` (consistent section layout), `TimelineItem.vue` (experience/education rows), `SkillTag.vue` (pill tags), `ProjectCard.vue` (project tiles), `SocialIcon.vue` (icon links via `@iconify/vue`).

**Dark mode**: Controlled by `@vueuse/core`'s `useColorMode` in `app.vue`. The `dark` class is applied to the root div, and Tailwind's `darkMode: 'class'` handles the rest.

**Scroll animations**: CSS utility `.animate-on-scroll` (defined in `assets/css/main.css`) toggles to `.visible` via IntersectionObserver. Components add this class to elements they want to animate in.

**Component auto-import**: `nuxt.config.ts` sets `pathPrefix: false` so all components under `components/` are auto-imported without namespace prefixes.

**Iconify**: Icons are rendered via `<Icon icon="..." />` from `@iconify/vue`. Icon strings follow the `collection:icon-name` format (e.g. `mdi:github`).

**Accent colors**: The design uses a constrained palette — `orange`, `green`, and `blue` variants. The `color` field on `Project` and `SkillCategory` types drives which accent is applied per card/tag.
