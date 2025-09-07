<script setup lang="ts">
interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="w-full">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Search for something to drink..."
      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 bg-slate-100 shadow-sm transition-all duration-200 placeholder:text-slate-400/85"
    />
  </div>
</template>
