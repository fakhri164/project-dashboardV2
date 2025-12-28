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
        <!-- Menu tanpa children -->
        <router-link
          v-if="!link.children"
          :to="link.path"
          class="flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors"
          :class="isActive(link.path)
            ? 'bg-primary text-white' 
            : (isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100')"
        >
          <Icon :icon="link.icon" class="h-5 w-5 mr-3" />
          <span class="flex-1">{{ link.name }}</span>
        </router-link>

        <!-- Menu dengan children -->
        <div v-else>
          <button
            @click="toggleSubmenu(index)"
            class="flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors"
            :class="isActive(link.path)
              ? 'bg-primary text-white' 
              : (isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100')"
          >
            <Icon :icon="link.icon" class="h-5 w-5 mr-3" />
            <span class="flex-1">{{ link.name }}</span>
            <Icon 
              :icon="link.open ? 'line-md:chevron-down' : 'line-md:chevron-right'" 
              class="h-4 w-4"
            />
          </button>
          
          <!-- Sub-menu -->
          <ul v-if="link.open" class="ml-8 mt-1">
            <li v-for="(child, childIndex) in link.children" :key="childIndex" class="mb-1">
              <router-link
                :to="child.path"
                class="block px-4 py-2 text-sm rounded-lg transition-colors"
                :class="isActive(child.path)
                  ? 'bg-primary/20 text-primary'
                  : (isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100')"
              >
                {{ child.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
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
    icon: 'line-md:shopping-bag',
    path: '/products',
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
]);

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/');
};

const toggleSubmenu = (index) => {
  links.value[index].open = !links.value[index].open;
};
</script>