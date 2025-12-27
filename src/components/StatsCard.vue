<template>
  <div 
    class="card shadow-lg border"
    :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
  >
    <div class="card-body p-6">
      <h3 
        class="text-sm font-medium mb-2"
        :class="isDark ? 'text-gray-400' : 'text-gray-600'"
      >
        {{ title }}
      </h3>
      <p 
        class="text-3xl font-bold mb-3"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        {{ value }}
      </p>
      <div class="flex items-center gap-1">
        <Icon 
          :icon="trend === 'up' ? 'line-md:arrow-up' : 'line-md:arrow-down'" 
          :class="trend === 'up' ? 'text-green-500' : 'text-red-500'"
          class="h-4 w-4"
        />
        <span 
          :class="trend === 'up' ? 'text-green-500' : 'text-red-500'"
          class="text-sm font-medium"
        >
          {{ percentage }}
        </span>
        <span 
          class="text-sm"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'"
        >
          from last month
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  trend: {
    type: String,
    default: 'up', // 'up' or 'down'
  },
  isDark: {
    type: Boolean,
    default: true,
  },
});
</script>