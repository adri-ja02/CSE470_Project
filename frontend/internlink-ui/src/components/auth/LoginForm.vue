<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn } from 'lucide-vue-next'
import { loginUser } from '../../services/auth'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  error.value = ''

  if (!form.email.trim() || !form.password) {
    error.value = 'Email and password are required'
    return
  }

  isLoading.value = true
  try {
    await loginUser({
      email: form.email,
      password: form.password
    })
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submit">
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
        placeholder="Your password"
      />
    </div>

    <p v-if="error" class="text-sm text-red-300">{{ error }}</p>

    <button
      type="submit"
      :disabled="isLoading"
      class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-600"
    >
      <LogIn :size="18" />
      {{ isLoading ? 'Signing in...' : 'Login' }}
    </button>
  </form>
</template>
