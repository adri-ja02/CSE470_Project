<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlus } from 'lucide-vue-next'
import { registerUser } from '../../services/auth'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'student'
})

const submit = async () => {
  error.value = ''

  if (!form.name.trim() || !form.email.trim() || !form.password) {
    error.value = 'Name, email, and password are required'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true
  try {
    await registerUser(form)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submit">
    <div>
      <label class="mb-1 block text-sm text-gray-300">Name</label>
      <input
        v-model="form.name"
        class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
        placeholder="Your name"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm text-gray-300">Email</label>
      <input
        v-model="form.email"
        type="email"
        class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
        placeholder="you@example.com"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm text-gray-300">Password</label>
      <input
        v-model="form.password"
        type="password"
        class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
        placeholder="At least 6 characters"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm text-gray-300">Role</label>
      <select
        v-model="form.role"
        class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
      >
        <option value="student">Student</option>
        <option value="company">Company</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <p v-if="error" class="text-sm text-red-300">{{ error }}</p>

    <button
      type="submit"
      :disabled="isLoading"
      class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-600"
    >
      <UserPlus :size="18" />
      {{ isLoading ? 'Creating account...' : 'Register' }}
    </button>
  </form>
</template>
