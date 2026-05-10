<script setup>
import { useRouter } from 'vue-router'
import { LogOut } from 'lucide-vue-next'
import { authState, logoutUser } from '../../services/auth'

const router = useRouter()

const logout = async () => {
  await logoutUser()
  router.push('/auth')
}
</script>

<template>
  <nav class="bg-gray-900 border-b border-gray-800 px-8 py-4">
    <div class="flex justify-between items-center">

      <router-link to="/" class="text-2xl font-bold text-white">
        InternLink
      </router-link>

      <div class="flex gap-6 text-gray-300">

        <router-link
          to="/"
          class="hover:text-white transition"
        >
          Home
        </router-link>

        <router-link
          to="/internships"
          class="hover:text-white transition"
        >
          Internships
        </router-link>

        <router-link
          v-if="authState.token"
          to="/dashboard"
          class="hover:text-white transition"
        >
          Dashboard
        </router-link>

        <router-link
          v-if="!authState.token"
          to="/auth"
          class="hover:text-white transition"
        >
          Login
        </router-link>

        <button
          v-else
          class="inline-flex items-center gap-2 hover:text-white transition"
          @click="logout"
        >
          <LogOut :size="16" />
          Logout
        </button>

      </div>

    </div>
  </nav>
</template>
