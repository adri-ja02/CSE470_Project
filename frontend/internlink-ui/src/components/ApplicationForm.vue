<template>
  <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg mt-8">
    <h2 class="text-xl font-semibold mb-4 text-slate-800">Submit Application</h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <select v-model="form.internship_id"
        class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option disabled value="">Select internship</option>
        <option v-for="item in internships" :key="item.id" :value="item.id">
          {{ item.title }} — {{ item.company || 'Unknown Company' }}
        </option>
      </select>

      <input v-model="form.applicant_name" placeholder="Applicant Name"
        class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <div class="mt-4 flex gap-2">
      <button @click="submitApplication"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
        Submit Application
      </button>
    </div>

    <div v-if="message" class="mt-3 text-sm" :class="messageClass">{{ message }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  internships: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['refreshApplications'])

const form = reactive({
  internship_id: '',
  applicant_name: ''
})

const message = ref('')
const messageClass = ref('text-slate-700')

const submitApplication = async () => {
  if (!form.internship_id) {
    message.value = 'Please select an internship.'
    messageClass.value = 'text-red-600'
    return
  }
  if (!form.applicant_name.trim()) {
    message.value = 'Applicant name is required.'
    messageClass.value = 'text-red-600'
    return
  }

  try {
    await axios.post('http://localhost:5000/applications', form)
    message.value = 'Application submitted successfully.'
    messageClass.value = 'text-green-600'
    form.internship_id = ''
    form.applicant_name = ''
    emit('refreshApplications')
  } catch (err) {
    message.value = err.response?.data?.message || 'Submission failed.'
    messageClass.value = 'text-red-600'
  }
}
</script>