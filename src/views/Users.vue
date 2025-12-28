<template>
  <div class="p-6">
    <h1 
      class="text-3xl font-bold mb-4"
      :class="isDark ? 'text-white' : 'text-black'"
    >
      Users Page
    </h1>
    <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
      This is the Users page. Content akan di update nanti.
    </p>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const isDark = inject('isDark');
</script>