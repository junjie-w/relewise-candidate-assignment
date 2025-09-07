<script setup lang="ts">
import SearchContainer from './SearchContainer.vue'
</script>

<template>
  <div class="flex flex-col gap-8 w-3/5 md:w-2/5 min-w-80 mx-auto py-8">
    <div class="flex flex-col gap-4 text-center">
      <h1 class="text-xl font-bold">Search Products</h1>
      <p class="text-slate-400 italic">e.g. search for "tea", "wine", "beer", "Earl Grey", "Carlsberg", etc.</p>
    </div>
    <SearchContainer />
  </div>
</template>
