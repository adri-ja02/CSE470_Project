<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Save } from 'lucide-vue-next'
import { resetPassword } from '../services/auth'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const message = ref('')

const form = reactive({
  token: route.query.token || '',
  password: ''
})

const submit = async () => {
  error.value = ''
  message.value = ''

  if (!form.token.trim() || !form.password) {
    error.value = 'Token and new password are required'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true
  try {
    const response = await resetPassword(form)
    message.value = response.message
    setTimeout(() => router.push('/auth'), 900)
  } catch (err) {
    error.value = err.response?.data?.message || 'Could not reset password'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-lg px-6 py-12">
    <section class="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <h1 class="text-2xl font-bold text-white">Choose New Password</h1>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm text-gray-300">Reset token</label>
          <input
            v-model="form.token"
            class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
            placeholder="Paste your reset token"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm text-gray-300">New password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
            placeholder="At least 6 characters"
          />
        </div>

        <p v-if="error" class="text-sm text-red-300">{{ error }}</p>
        <p v-if="message" class="text-sm text-emerald-300">{{ message }}</p>

        <button
          type="submit"
          :disabled="isLoading"
          class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          <Save :size="18" />
          {{ isLoading ? 'Saving...' : 'Save new password' }}
        </button>
      </form>
    </section>
  </main>
</template>
