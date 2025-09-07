<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserId } from '@/utils/userId-management.util'

onMounted(() => {
  getUserId()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-end items-center p-4">
      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/">PDP</RouterLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="flex justify-center items-center p-4">
      <p>Relewise Candidate Assignment</p>
    </footer>
  </div>
</template>
