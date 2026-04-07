<script setup lang="ts">
import { profile } from '~/data/profile'

const year = new Date().getFullYear()

const form = reactive({ name: '', email: '', subject: '', message: '' })

const submit = () => {
  const body = `Name: ${form.name}\n\n${form.message}`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <section id="contact" class="py-24 bg-slate-50 dark:bg-slate-900/50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Get In Touch"
        subtitle="Open to opportunities in supply chain digitalisation, data-driven operations, and process automation."
      />

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Left: contact cards + quick facts -->
        <div data-reveal>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact</h3>
          <div class="space-y-4 mb-8">
            <a
              :href="`mailto:${profile.email}`"
              class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500 transition-colors group"
            >
              <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                <Icon name="mdi:email" class="text-primary-600 dark:text-primary-400 text-2xl" />
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Email</p>
                <p class="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{{ profile.email }}</p>
              </div>
            </a>

            <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                <Icon name="mdi:phone" class="text-primary-600 dark:text-primary-400 text-2xl" />
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                <p class="font-medium text-slate-900 dark:text-white">{{ profile.phone }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                <Icon name="mdi:map-marker" class="text-primary-600 dark:text-primary-400 text-2xl" />
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Location</p>
                <p class="font-medium text-slate-900 dark:text-white">{{ profile.location }}</p>
              </div>
            </div>

            <a
              :href="profile.social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500 transition-colors group"
            >
              <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                <Icon name="mdi:linkedin" class="text-primary-600 dark:text-primary-400 text-2xl" />
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
                <p class="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">Arda Türker</p>
              </div>
            </a>

            <a
              :href="profile.social.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500 transition-colors group"
            >
              <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                <Icon name="mdi:github" class="text-primary-600 dark:text-primary-400 text-2xl" />
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">GitHub</p>
                <p class="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">ardaturker</p>
              </div>
            </a>
          </div>

          <!-- Quick facts -->
          <div class="space-y-0">
            <div
              v-for="(item, i) in [
                { label: 'Status', value: 'MSc Student · SDU 2025–2027' },
                { label: 'Availability', value: 'Open to internships & projects' },
                { label: 'Languages', value: 'Turkish, English, Danish, German' },
              ]"
              :key="i"
              class="flex justify-between py-4 border-b border-slate-200 dark:border-slate-800 last:border-0"
            >
              <span class="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">{{ item.label }}</span>
              <span class="text-sm text-slate-700 dark:text-slate-300 text-right">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- Right: contact form -->
        <div data-reveal style="transition-delay: 0.15s">
          <form
            @submit.prevent="submit"
            class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-5"
          >
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Send a Message</h3>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="your@email.com"
                  class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="What's this about?"
                class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Your message..."
                class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            <BaseButton variant="primary" class="w-full justify-center">
              <Icon name="mdi:send" />
              Send Message
            </BaseButton>
          </form>
        </div>
      </div>

      <div class="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <span class="font-mono text-xs text-slate-400 dark:text-slate-600">© {{ year }} Arda Türker</span>
        <span class="font-mono text-xs text-slate-400 dark:text-slate-600">Nuxt 3 + Tailwind CSS</span>
      </div>
    </div>
  </section>
</template>
