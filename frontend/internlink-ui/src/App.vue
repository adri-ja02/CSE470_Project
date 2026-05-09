<script setup>
import Navbar from './components/common/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <Navbar />
    <router-view />
  </div>
</template>