<script setup>
import { ref } from 'vue'
import { KeyRound } from 'lucide-vue-next'
import { requestPasswordReset } from '../services/auth'

const email = ref('')
const isLoading = ref(false)
const error = ref('')
const message = ref('')
const resetToken = ref('')

const submit = async () => {
  error.value = ''
  message.value = ''
  resetToken.value = ''

  if (!email.value.trim()) {
    error.value = 'Email is required'
    return
  }

  isLoading.value = true
  try {
    const response = await requestPasswordReset(email.value)
    message.value = response.message
    resetToken.value = response.resetToken || ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Could not generate reset token'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-lg px-6 py-12">
    <section class="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <h1 class="text-2xl font-bold text-white">Reset Password</h1>
      <p class="mt-2 text-sm text-gray-300">Enter your account email to generate a one-hour reset token.</p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm text-gray-300">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-lg border border-white/10 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-400"
            placeholder="you@example.com"
          />
        </div>

        <p v-if="error" class="text-sm text-red-300">{{ error }}</p>
        <p v-if="message" class="text-sm text-emerald-300">{{ message }}</p>

        <div v-if="resetToken" class="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3">
          <p class="text-sm text-gray-200">Reset token</p>
          <p class="mt-1 break-all font-mono text-xs text-emerald-200">{{ resetToken }}</p>
          <router-link
            :to="`/reset-password?token=${resetToken}`"
            class="mt-3 inline-block text-sm font-semibold text-emerald-200 hover:text-white"
          >
            Continue to new password
          </router-link>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          <KeyRound :size="18" />
          {{ isLoading ? 'Generating...' : 'Generate reset token' }}
        </button>
      </form>
    </section>
  </main>
</template>
