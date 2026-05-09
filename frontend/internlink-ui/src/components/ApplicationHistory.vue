<template>
  <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg mt-8">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-slate-800">Application History</h2>
        <p class="text-sm text-slate-600">Recent application submissions and statuses.</p>
      </div>
      <span class="text-sm text-slate-500">{{ applications.length }} records</span>
    </div>

    <div v-if="applications.length === 0" class="text-slate-700 py-8 text-center">
      No applications submitted yet.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-left text-sm text-slate-700">
        <thead class="bg-slate-100">
          <tr>
            <th class="p-2">Applicant</th>
            <th class="p-2">Internship</th>
            <th class="p-2">Company</th>
            <th class="p-2">Status</th>
            <th class="p-2">Applied At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in applications" :key="app.id" class="border-t hover:bg-slate-50">
            <td class="p-2">{{ app.applicant_name }}</td>
            <td class="p-2">{{ app.internship_title || 'Unknown' }}</td>
            <td class="p-2">{{ app.internship_company || 'Unknown' }}</td>
            <td class="p-2 capitalize">{{ app.status }}</td>
            <td class="p-2">{{ formatDate(app.applied_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  applications: {
    type: Array,
    default: () => []
  }
})

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}
</script>