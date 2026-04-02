<script setup lang="ts">
import { skills } from '~/data/skills'
import { education } from '~/data/education'
import { contact } from '~/data/contact'
import { experience } from '~/data/experience'

const siteUrl = 'https://ardaturker.me'

const knowsAbout = skills.flatMap(cat => cat.skills).slice(0, 20)

const alumniOf = education.map(edu => ({
  '@type': 'EducationalOrganization',
  name: edu.school,
  description: `${edu.degree} in ${edu.field}`,
}))

const worksFor = education[0]
  ? { '@type': 'EducationalOrganization', name: education[0].school }
  : undefined

const sameAs = [contact.linkedin, contact.github].filter(
  url => url && !url.includes('yourname'),
)

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arda Türker',
    alternateName: ['Arda Turker', 'Arda Turker CV', 'Arda Türker CV'],
    url: siteUrl,
    image: `${siteUrl}/avatar.jpg`,
    jobTitle: `${education[0]?.field ?? 'Supply Chain Digitalisation'} ${education[0]?.degree ?? 'MSc'} Student & Developer`,
    worksFor,
    alumniOf,
    knowsAbout,
    email: contact.email,
    ...(sameAs.length > 0 && { sameAs }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sønderborg',
      addressCountry: 'DK',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arda Türker',
    url: siteUrl,
  },
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    },
  ],
})
</script>

<template></template>
