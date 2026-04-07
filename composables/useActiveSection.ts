export const useActiveSection = () => {
  const activeSection = ref('hero')

  onMounted(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' },
    )
    sections.forEach(s => observer.observe(s))
    onUnmounted(() => observer.disconnect())
  })

  return { activeSection }
}
