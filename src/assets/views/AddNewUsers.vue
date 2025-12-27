<template>
  <div class="p-6">
    <h1 
      class="text-3xl font-bold mb-4"
      :class="isDark ? 'text-white' : 'text-black'"
    >
      Add New User
    </h1>
    <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
      This is the Add New User page. SABAR!!!!!!!!
    </p>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const isDark = inject('isDark');
</script>