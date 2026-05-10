<script setup>
import { computed, ref } from 'vue'
import LoginForm from '../components/auth/LoginForm.vue'
import RegisterForm from '../components/auth/RegisterForm.vue'

const mode = ref('login')
const isLogin = computed(() => mode.value === 'login')
</script>

<template>
  <main class="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[1fr_420px]">
    <section class="flex flex-col justify-center">
      <p class="text-sm font-semibold uppercase tracking-wider text-emerald-300">InternLink Access</p>
      <h1 class="mt-3 text-4xl font-bold text-white">One account for students, companies, and admins.</h1>
      <p class="mt-4 max-w-xl text-gray-300">
        Login to continue to your workspace, or register with the role that matches your place in the internship portal.
      </p>
    </section>

    <section class="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div class="mb-6 grid grid-cols-2 rounded-lg border border-white/10 bg-gray-950 p-1">
        <button
          class="rounded-md px-3 py-2 text-sm font-semibold transition"
          :class="isLogin ? 'bg-emerald-500 text-gray-950' : 'text-gray-300 hover:text-white'"
          @click="mode = 'login'"
        >
          Login
        </button>
        <button
          class="rounded-md px-3 py-2 text-sm font-semibold transition"
          :class="!isLogin ? 'bg-emerald-500 text-gray-950' : 'text-gray-300 hover:text-white'"
          @click="mode = 'register'"
        >
          Register
        </button>
      </div>

      <LoginForm v-if="isLogin" />
      <RegisterForm v-else />

      <router-link
        v-if="isLogin"
        to="/forgot-password"
        class="mt-4 block text-center text-sm text-emerald-300 hover:text-emerald-200"
      >
        Forgot password?
      </router-link>
    </section>
  </main>
</template>
