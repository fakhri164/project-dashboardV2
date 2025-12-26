<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main Content -->
    <div class="drawer-content flex flex-col">
      <Navbar
        :isDark="isDark"
        @toggle-drawer="toggleDrawer"
        @toggle-theme="toggleTheme"
      />
      <main class="flex-1 p-6">
        <h1 class="text-2xl font-bold">Dashboard Content</h1>
      </main>
    </div>
    
    <!-- Sidebar -->
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <Sidebar :isDark="isDark" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

const isDark = ref(true);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if(savedTheme){
    isDark.value = savedTheme === 'dark';
  } else if(systemPrefersDark){
    isDark.value = true;
  }
});

watchEffect(() => {
  const html = document.documentElement;
  if(isDark.value){
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }else{
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

const toggleDrawer = () => {
  const drawer = document.getElementById('my-drawer');
  if (drawer) {
    drawer.checked = !drawer.checked;
  }
};
</script>