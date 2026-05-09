<template>
  <nav class="bg-gray-900 border-b border-gray-800 px-8 py-4">
    <div class="flex justify-between items-center">

      <h1 class="text-2xl font-bold text-white">
        InternLink
      </h1>

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

      </div>

    </div>
  </nav>
</template>