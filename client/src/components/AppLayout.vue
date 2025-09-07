<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserId } from '@/utils/userId-management.util'

onMounted(() => {
  getUserId()
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <div class="w-4/5 h-full flex flex-col py-4 text-slate-500">
      <header class="flex justify-end items-center">
        <nav class="hover:underline cursor-pointer hover:italic transition-all duration-200 ease-out">
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </header>

      <main class="flex-1">
        <slot />
      </main>

      <footer class="flex justify-center items-center">
        <a class="hover:underline cursor-pointer hover:italic transition-all duration-200 ease-out" href="https://product-pioneer-app.lovable.app/" target="_blank" rel="noopener noreferrer">Relewise Candidate Assignment</a>
      </footer>
    </div>
  </div>
</template>
