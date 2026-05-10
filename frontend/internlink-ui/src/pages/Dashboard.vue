<script setup>
import { computed } from 'vue'
import { Building2, GraduationCap, ShieldCheck } from 'lucide-vue-next'
import { authState } from '../services/auth'

const dashboard = computed(() => {
  const role = authState.user?.role

  if (role === 'admin') {
    return {
      icon: ShieldCheck,
      title: 'Admin Dashboard',
      subtitle: 'Manage platform activity, users, companies, and internships.',
      stats: ['User approvals', 'Company verification', 'System reports']
    }
  }

  if (role === 'company') {
    return {
      icon: Building2,
      title: 'Company Dashboard',
      subtitle: 'Publish internships, review applicants, and track hiring progress.',
      stats: ['Posted internships', 'Applicant review', 'Shortlist pipeline']
    }
  }

  return {
    icon: GraduationCap,
    title: 'Student Dashboard',
    subtitle: 'Discover internships, manage applications, and keep your profile ready.',
    stats: ['Recommended roles', 'Saved internships', 'Application status']
  }
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-10">
    <section class="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wider text-emerald-300">
            Welcome, {{ authState.user?.name }}
          </p>
          <h1 class="mt-2 text-3xl font-bold text-white">{{ dashboard.title }}</h1>
          <p class="mt-2 max-w-2xl text-gray-300">{{ dashboard.subtitle }}</p>
        </div>

        <component :is="dashboard.icon" class="h-16 w-16 text-emerald-300" />
      </div>
    </section>

    <section class="mt-8 grid gap-4 md:grid-cols-3">
      <article
        v-for="item in dashboard.stats"
        :key="item"
        class="rounded-lg border border-white/10 bg-gray-900 p-5"
      >
        <p class="text-sm text-gray-400">{{ authState.user?.role }}</p>
        <h2 class="mt-2 text-xl font-semibold text-white">{{ item }}</h2>
        <p class="mt-3 text-sm text-gray-300">Ready for the next workflow in your role.</p>
      </article>
    </section>
  </main>
</template>
