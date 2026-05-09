<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import InternshipForm from '../components/internship/InternshipForm.vue'
import InternshipList from '../components/internship/InternshipList.vue'

const internships = ref([])
const editData = ref(null)
const isLoading = ref(false)
const error = ref('')

const fetchInternships = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await axios.get('http://localhost:5000/internships')
    internships.value = response.data
  } catch (err) {
    error.value = 'Failed to load internships'
    console.error('Error fetching internships:', err)
  } finally {
    isLoading.value = false
  }
}

const handleRefresh = () => {
  fetchInternships()
}

const handleEdit = (internship) => {
  editData.value = internship
}

const handleClearEdit = () => {
  editData.value = null
}

onMounted(() => {
  fetchInternships()
})
</script>

<template>
  <div class="p-10">
    <InternshipForm
      :editData="editData"
      @refresh="handleRefresh"
      @clearEdit="handleClearEdit"
    />

    <div v-if="isLoading" class="text-center py-8">
      Loading internships...
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-600">
      {{ error }}
    </div>

    <InternshipList
      v-else
      :internships="internships"
      @refresh="handleRefresh"
      @edit="handleEdit"
    />
  </div>
</template>