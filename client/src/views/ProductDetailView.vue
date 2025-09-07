<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { trackProductView } from '@/services/trackingService'
import { getUserId } from '@/utils/userId-management.util'

interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()
const productId = ref('')

onMounted(async () => {
  // NOTE: We could check if product ID exists in database, if not, display an error component
  productId.value = props.id || (route.params.id as string) || ''
  
  if (productId.value) {
    try {
      const userId = getUserId()
      await trackProductView(userId, productId.value)
      console.log(`Product view tracked: product ${productId.value} viewed by user: ${userId}`)
    } catch (error) {
      console.error('Error tracking product view:', error)
    }
  }
  
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-96 p-6">
    <div v-if="productId" class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Product Detail Page</h1>
      <ul class="max-h-[65vh] overflow-y-auto space-y-3 py-2 list-none">
        <li
          class="p-4 border border-slate-200 rounded-xl hover:bg-slate-50/80 hover:ring-1 hover:ring-slate-300 bg-slate-100/80 cursor-pointer transition-all duration-300 ease-in-out"
        >
          <p class="font-semibold">Product ID: {{ productId }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
