<template>
  <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">

    <h2 class="text-xl font-semibold mb-4 text-slate-800">Internships</h2>

    <table class="w-full border-collapse">
      <thead class="bg-slate-100">
        <tr>
          <th class="p-2">Title</th>
          <th class="p-2">Type</th>
          <th class="p-2">Category</th>
          <th class="p-2">Deadline</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="i in internships" :key="i.id"
          class="border-t text-center hover:bg-slate-50">

          <td class="p-3">{{ i.title }}</td>
          <td class="p-3">{{ i.type }}</td>
          <td class="p-3">{{ i.category }}</td>
          <td class="p-3">{{ i.deadline }}</td>

          <td class="p-3 flex justify-center gap-3">

            <button @click="editItem(i)"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow">
              Edit
            </button>

            <button @click="deleteItem(i.id)" :disabled="isDeleting === i.id"
              class="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-3 py-1 rounded shadow">
              {{ isDeleting === i.id ? 'Deleting...' : 'Delete' }}
            </button>

          </td>

        </tr>
      </tbody>

    </table>

  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['internships'])
const emit = defineEmits(['refresh', 'edit'])

const isDeleting = ref(null)

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this internship?')) {
    isDeleting.value = id
    try {
      await axios.delete(`http://localhost:5000/internships/${id}`)
      emit('refresh')
    } catch (error) {
      console.error('Error deleting internship:', error)
      alert('Failed to delete internship')
    } finally {
      isDeleting.value = null
    }
  }
}

const editItem = (internship) => {
  emit('edit', internship)
}
</script>
