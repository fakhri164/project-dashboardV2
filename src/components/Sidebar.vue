<template>
  <div 
    class="flex flex-col w-80 min-h-full border-r"
    :class="isDark ? 'bg-[#1a1f2e] border-gray-700' : 'bg-white border-gray-200'"
  >
    <!-- Header -->
    <div 
      class="p-4 border-b h-16 flex items-center"
      :class="isDark ? 'border-gray-700' : 'border-gray-200'"
    >
      <h1 
        class="text-xl font-bold" 
        :class="isDark ? 'text-white' : 'text-black'"
      >
        AdminPanel
      </h1>
    </div>
    
    <!-- Menu -->
    <ul class="menu p-4">
      <li v-for="(link, index) in links" :key="index" class="mb-1">
        <button
          @click="setActive(index)"
          class="flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors"
          :class="link.active 
            ? 'bg-primary text-white' 
            : (isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100')"
        >
          <Icon :icon="link.icon" class="h-5 w-5 mr-3" />
          <span class="flex-1">{{ link.name }}</span>
          <Icon 
            v-if="link.children" 
            :icon="link.open ? 'line-md:chevron-down' : 'line-md:chevron-right'" 
            class="h-4 w-4"
          />
        </button>
        
        <!-- Sub-menu -->
        <ul v-if="link.children && link.open" class="ml-8 mt-1">
          <li v-for="(child, childIndex) in link.children" :key="childIndex" class="mb-1">
            <a 
              href="#" 
              class="block px-4 py-2 text-sm rounded-lg transition-colors"
              :class="isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100'"
            >
              {{ child.name }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

defineProps({
  isDark: {
    type: Boolean,
    required: true,
  },
});

const links = ref([
  {
    name: 'Dashboard',
    icon: 'line-md:home',
    active: true,
    open: false,
  },
  {
    name: 'Analytics',
    icon: 'icon-park-outline:chart-line',
    active: false,
    open: false,
  },
  {
    name: 'Reports',
    icon: 'line-md:document',
    active: false,
    open: false,
  },
  {
    name: 'Users',
    icon: 'line-md:account',
    active: false,
    open: false,
    children: [
      { name: 'All Users' },
      { name: 'Add New' },
      { name: 'Roles & Permissions' },
    ],
  },
  {
    name: 'Products',
    icon: 'mdi:shopping-outline',
    active: false,
    open: false,
    children: [
      { name: 'All Products' },
      { name: 'Add New' },
      { name: 'Categories' },
    ],
  },
  {
    name: 'Messages',
    icon: 'line-md:email',
    active: false,
    open: false,
  },
  {
    name: 'Settings',
    icon: 'line-md:cog',
    active: false,
    open: false,
  },
]);

const setActive = (index) => {
  links.value.forEach((link, i) => {
    if (i === index) {
      link.active = true;
      if (link.children) {
        link.open = !link.open;
      }
    } else {
      link.active = false;
    }
  });
};
</script>