<template>
  <div class="min-h-screen bg-[#001f3f] p-6 relative overflow-hidden text-white">
    
    <!-- ✅ BACKGROUND COMPONENT -->
    <ParticlesBackground />

    <!-- UI Layer -->
    <div class="relative z-10">
      
      <div class="max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6">
        
        <!-- Header -->
        <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
          <h1 class="text-3xl font-bold">InternLink Admin Panel</h1>
          <p>Internship Posting Module (Sprint-1)</p>
        </div>

        <!-- Form -->
        <InternshipForm
          :editData="editData"
          @refresh="fetchInternships"
          @clearEdit="clearEdit"
        />

        <!-- Table -->
        <InternshipList
          :internships="internships"
          @refresh="fetchInternships"
          @edit="setEditData"
        />

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import InternshipForm from './components/InternshipForm.vue'
import InternshipList from './components/InternshipList.vue'
import ParticlesBackground from './components/ParticlesBackground.vue' // ✅ correct place

const internships = ref([])
const editData = ref(null)

const fetchInternships = async () => {
  const res = await axios.get('http://localhost:5000/internships')
  internships.value = res.data
}

const setEditData = (data) => {
  editData.value = data
}

const clearEdit = () => {
  editData.value = null
}

onMounted(fetchInternships)
</script>