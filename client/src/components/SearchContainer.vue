<script setup lang="ts">
import { ref, watch } from 'vue'
import { debouncedRef } from '@vueuse/core'
import SearchInput from './SearchInput.vue'
import SearchResults from './SearchResults.vue'
import { searchProducts } from '@/services/searchService'
import { getUserId } from '@/utils/userId-management.util'
import type { Product } from '@/types'

const searchTerm = ref('')
const debouncedSearchTerm = debouncedRef(searchTerm, 200)
const searchResults = ref<Product[]>([])
const isLoading = ref(false)

watch(debouncedSearchTerm, async (searchTerm) => {
  if (searchTerm && searchTerm.length > 0) {
    isLoading.value = true
    
    try {
      const userId = getUserId()
      const response = await searchProducts(userId, searchTerm)
      searchResults.value = response.products
    } catch (error) {
      console.error('error searching for:', searchTerm, error)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  } else {
    searchResults.value = []
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <SearchInput
      v-model="searchTerm"
    />
    
    <SearchResults
      :results="searchResults"
      :is-loading="isLoading"
      :search-term="debouncedSearchTerm"
    />
  </div>
</template>
