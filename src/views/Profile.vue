<template>
  <div class="p-6">
    <h1 
      class="text-3xl font-bold mb-4"
      :class="isDark ? 'text-white' : 'text-black'"
    >
      Profile Page
    </h1>
    <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
      This is the Profile page. Content akan di update nanti developper sedang mager.
    </p>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const isDark = inject('isDark');
</script>