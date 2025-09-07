<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '@/types'

interface Props {
  results: Product[]
  isLoading?: boolean
  searchTerm?: string
}

defineProps<Props>()
const router = useRouter()

const navigateToProduct = (result: Product) => {
  const { id } = result
  router.push({
    name: 'product-detail',
    params: { id },
  })
}
</script>

<template>
  <div class="">
    <div v-if="isLoading" class="text-center">
      <p class="text-sm">Loading...</p>
    </div>
    
    <ul v-if="results.length > 0" class="max-h-[65vh] overflow-y-auto space-y-3 py-2 list-none">
      <li
        v-for="(result) in results"
        :key="result.id"
        class="p-4 rounded-xl bg-slate-100/80 hover:bg-slate-50/80 hover:ring-2 hover:ring-slate-300 cursor-pointer transition-all duration-300 ease-in-out"
        @click="navigateToProduct(result)"
      >
        <div class="font-semibold">{{ result.name }}</div>
        <div class="text-xs mt-1">ID: {{ result.id }}</div>
      </li>
    </ul>
    
    <div v-else-if="searchTerm && searchTerm.length > 0 && !isLoading" class="text-center py-6">
      <p class="text-sm italic">No results found for "{{ searchTerm }}"</p>
    </div>
  </div>
</template>
