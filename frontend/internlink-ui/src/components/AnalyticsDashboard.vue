<template>
  <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg mt-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-2 text-slate-800">Reporting & Analytics</h2>
        <p class="text-sm text-slate-600">Track category statistics, hiring success, company performance, and monthly placements.</p>
      </div>
      <button @click="downloadSummary"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
        Download Analytics Summary
      </button>
    </div>

    <div v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</div>

    <div v-if="loading" class="mt-6 text-slate-700">Loading analytics...</div>

    <div v-else class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-xl bg-slate-50 p-4 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Categories</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">{{ categoryStats.length }}</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-4 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Total Applications</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">{{ applicationSuccess.total }}</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-4 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Success Rate</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">{{ applicationSuccess.successRate }}%</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-4 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Company Reports</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">{{ companyHiring.length }}</p>
      </div>
    </div>

    <div class="grid gap-4 mt-6 lg:grid-cols-3">
      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-3">Category Statistics</h3>
        <table class="w-full text-left text-sm text-slate-700">
          <thead>
            <tr>
              <th class="pb-2">Category</th>
              <th class="pb-2">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in categoryStats" :key="row.category" class="border-t">
              <td class="py-2">{{ row.category || 'Uncategorized' }}</td>
              <td class="py-2">{{ row.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-3">Company-wise Hiring</h3>
        <table class="w-full text-left text-sm text-slate-700">
          <thead>
            <tr>
              <th class="pb-2">Company</th>
              <th class="pb-2">Hires</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in companyHiring" :key="row.company" class="border-t">
              <td class="py-2">{{ row.company || 'Unknown' }}</td>
              <td class="py-2">{{ row.hires }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-3">Monthly Placement</h3>
        <table class="w-full text-left text-sm text-slate-700">
          <thead>
            <tr>
              <th class="pb-2">Month</th>
              <th class="pb-2">Placements</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in monthlyPlacement" :key="row.month" class="border-t">
              <td class="py-2">{{ row.month }}</td>
              <td class="py-2">{{ row.placements }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categoryStats = ref([])
const applicationSuccess = ref({ total: 0, accepted: 0, rejected: 0, successRate: 0 })
const companyHiring = ref([])
const monthlyPlacement = ref([])
const loading = ref(true)
const error = ref('')

const fetchAnalytics = async () => {
  loading.value = true
  error.value = ''

  try {
    const [categoryRes, successRes, companyRes, monthlyRes] = await Promise.all([
      axios.get('http://localhost:5000/analytics/category-stats'),
      axios.get('http://localhost:5000/analytics/application-success'),
      axios.get('http://localhost:5000/analytics/company-hiring'),
      axios.get('http://localhost:5000/analytics/monthly-placement')
    ])

    categoryStats.value = categoryRes.data
    applicationSuccess.value = successRes.data
    companyHiring.value = companyRes.data
    monthlyPlacement.value = monthlyRes.data
  } catch (err) {
    console.error('Error loading analytics:', err)
    error.value = 'Unable to load analytics data.'
  } finally {
    loading.value = false
  }
}

const downloadSummary = async () => {
  try {
    const response = await axios.get('http://localhost:5000/analytics/download', {
      responseType: 'blob'
    })
    const url = URL.createObjectURL(new Blob([response.data], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'analytics-summary.json')
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error downloading analytics summary:', err)
    error.value = 'Download failed. Please try again.'
  }
}

onMounted(fetchAnalytics)
</script>
