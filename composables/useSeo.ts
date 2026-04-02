import { skills } from '~/data/skills'
import { education } from '~/data/education'
import { experience } from '~/data/experience'
import { contact } from '~/data/contact'

export const useSeo = () => {
  const siteUrl = 'https://ardaturker.me'
  const fullName = 'Arda Türker'

  const currentRole = experience[0]
  const currentEducation = education[0]

  const description = `${fullName} — ${currentEducation.degree} student in ${currentEducation.field} at the ${currentEducation.school}. Front-end developer skilled in Vue.js, Python, TypeScript and supply chain digitalisation. Based in Sønderborg, Denmark.`

  const skillKeywords = skills.flatMap(cat => cat.skills).slice(0, 20)
  const keywords = [
    'Arda Turker',
    'Arda Türker',
    'Arda Turker CV',
    'Arda Türker CV',
    'Supply Chain Digitalisation',
    `${currentEducation.degree} ${currentEducation.field}`,
    'University of Southern Denmark',
    'SDU student',
    'Sønderborg Denmark',
    'Front End Developer',
    'Vue.js Developer',
    'Python Developer',
    'TypeScript',
    'ardaturker.me',
    'supply chain engineer',
    'digital transformation',
    'Engineering Innovation Business',
    ...skillKeywords,
  ].join(', ')

  const title = `${fullName} | ${currentEducation.field} ${currentEducation.degree} · Developer`

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    keywords,
    author: fullName,
    robots: 'index, follow',
    ogUrl: siteUrl,
    ogType: 'profile',
    ogImage: `${siteUrl}/avatar.jpg`,
    ogImageAlt: `${fullName} — profile photo`,
    ogLocale: 'en_US',
    ogSiteName: `${fullName} — CV`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${siteUrl}/avatar.jpg`,
  })

  useHead({
    link: [{ rel: 'canonical', href: siteUrl }],
    meta: [
      { property: 'profile:first_name', content: 'Arda' },
      { property: 'profile:last_name', content: 'Türker' },
    ],
  })
}
