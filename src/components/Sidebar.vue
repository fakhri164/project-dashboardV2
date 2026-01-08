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
    <div class="p-4 space-y-1">
      <div v-for="(link, index) in links" :key="index">
        <!-- Menu tanpa children -->
        <router-link
          v-if="!link.children"
          :to="link.path"
          class="flex items-center px-4 py-2.5 rounded-lg transition-colors"
          :class="isActive(link.path)
            ? 'bg-primary text-white' 
            : (isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100')"
        >
          <Icon :icon="link.icon" class="h-5 w-5 shrink-0" />
          <span class="ml-3">{{ link.name }}</span>
        </router-link>

        <!-- Menu berchildren -->
        <div v-else>
          <button
            @click="toggleSubmenu(index)"
            class="flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors"
            :class="isActiveParent(link)
              ? 'bg-primary text-white' 
              : (isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100')"
          >
            <Icon :icon="link.icon" class="h-5 w-5 shrink-0" />
            <span class="ml-3 flex-1">{{ link.name }}</span>
            <Icon 
              :icon="link.open ? 'line-md:chevron-down' : 'line-md:chevron-right'" 
              class="h-4 w-4 shrink-0"
            />
          </button>
          
          <!-- Sub-menu -->
          <div v-if="link.open" class="mt-1 pl-11 space-y-1">
            <router-link
              v-for="(child, childIndex) in link.children"
              :key="childIndex"
              :to="child.path"
              class="flex items-center px-4 py-2 rounded-lg transition-colors text-sm"
              :class="isActive(child.path)
                ? 'bg-primary/20 text-primary font-medium'
                : (isDark ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black')"
            >
              {{ child.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

defineProps({
  isDark: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();

const links = ref([
  {
    name: 'Dashboard',
    icon: 'line-md:home',
    path: '/',
  },
  {
    name: 'Analytics',
    icon: 'icon-park-outline:chart-line',
    path: '/analytics',
  },
  {
    name: 'Reports',
    icon: 'line-md:document',
    path: '/reports',
  },
  {
    name: 'Users',
    icon: 'line-md:account',
    path: '/users',
    children: [
      { name: 'All Users', path: '/users/all' },
      { name: 'Add New', path: '/users/add-new' },
      { name: 'Roles & Permissions', path: '/users/roles-permissions' },
    ],
    open: false,
  },
  {
    name: 'Products',
    icon: 'mdi:shopping-outline',
    path: '/products',
    children: [
      { name: 'All Products', path: '/products/all' },
      { name: 'Add New', path: '/products/add-new' },
      { name: 'Categories', path: '/products/categories' },
    ],
    open: false,
  },
  {
    name: 'Messages',
    icon: 'line-md:email',
    path: '/messages',
  },
  {
    name: 'Settings',
    icon: 'line-md:cog',
    path: '/settings',
  },
  {
    name: 'Profile',
    icon: 'icon-park-outline:user',
    path: '/profile',
  }
]);

const isActive = (path) => {
  return route.path === path;
};

const isActiveParent = (link) => {
  if (route.path === link.path) return true;
  if (link.children) {
    return link.children.some(child => route.path === child.path);
  }
  return false;
};

const toggleSubmenu = (index) => {
  links.value[index].open = !links.value[index].open;
};
</script>