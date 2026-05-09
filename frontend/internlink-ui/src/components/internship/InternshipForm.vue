<template>
  <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">

    <h2 class="text-xl font-semibold mb-4 text-slate-800">
      {{ editData ? "Edit Internship" : "Create Internship" }}
    </h2>

    <div class="grid grid-cols-2 gap-4">

      <input v-model="form.title" placeholder="Title"
        class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />


      <input v-model="form.category" placeholder="Category"
        class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />

      <select v-model="form.type" class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400">
        <option>Remote</option>
        <option>On-site</option>
        <option>Hybrid</option>
      </select>


      <input type="date" v-model="form.deadline"
        class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />

      <input v-model="form.description"
        placeholder="Description"
        class="border p-2 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-green-400" />

    </div>

    <div class="mt-4 flex gap-2">

      <button @click="submitForm"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
        {{ editData ? "Update" : "Submit" }}
      </button>

      <button v-if="editData" @click="cancelEdit"
        class="bg-gray-300 hover:bg-gray-350 text-slate-800 px-4 py-2 rounded">
        Cancel
      </button>

    </div>

  </div>
</template>


<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'

const props = defineProps(['editData'])
const emit = defineEmits(['refresh', 'clearEdit'])

const form = reactive({
  title: '',
  description: '',
  type: 'Remote',
  category: '',
  deadline: ''
})

watch(() => props.editData, (val) => {
  if (val) {
    Object.assign(form, val)
  }
})

const submitForm = async () => {
  if (props.editData) {
    await axios.put(
      `http://localhost:5000/internships/${props.editData.id}`,
      form
    )
    emit('clearEdit')
  } else {
    await axios.post('http://localhost:5000/internships', form)
  }

  emit('refresh')

  form.title = ''
  form.description = ''
  form.category = ''
  form.deadline = ''
}

const cancelEdit = () => {
  emit('clearEdit')
}

</script>
