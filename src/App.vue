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
      
      <main class="flex-1 p-6 bg-base-200 dark:bg-backgroundDark">
        <!-- Dashboard Content -->
        <div v-if="$route.path === '/'">
          <!-- Stats Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Total Users"
              value="12,345"
              percentage="14%"
              trend="up"
              :isDark="isDark"
            />
            <StatsCard 
              title="Revenue"
              value="$42,256"
              percentage="23%"
              trend="up"
              :isDark="isDark"
            />
            <StatsCard 
              title="New Orders"
              value="56"
              percentage="8%"
              trend="down"
              :isDark="isDark"
            />
            <StatsCard 
              title="Active Projects"
              value="56"
              percentage="8%"
              trend="up"
              :isDark="isDark"
            />
          </div>

          <!-- Charts Component -->
          <Charts :isDark="isDark" />
        </div>

        <!-- Router View untuk halaman lain -->
        <router-view v-else />
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
import { onMounted, ref, watchEffect, provide } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import StatsCard from './components/StatsCard.vue';
import Charts from './components/Charts.vue';

const isDark = ref(true);

// Provide isDark agar bisa diakses di child components
provide('isDark', isDark);

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