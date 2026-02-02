<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          Users Management
        </h1>
        <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          Manage your users and their permissions
        </p>
      </div>
      
      <div class="flex gap-3">
        <button 
          class="btn btn-outline gap-2"
          @click="showFilters = !showFilters"
        >
          <Icon icon="line-md:filter" class="h-5 w-5" />
          Filters
        </button>
        <router-link to="/users/add-new" class="btn btn-primary gap-2">
          <Icon icon="line-md:plus" class="h-5 w-5" />
          Add User
        </router-link>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between">
          <div>
            <p 
              class="text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Total Users
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.total }}
            </p>
          </div>
          <div class="p-4 rounded-full bg-blue-500/10">
            <Icon icon="line-md:account" class="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between">
          <div>
            <p 
              class="text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Active Users
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.active }}
            </p>
          </div>
          <div class="p-4 rounded-full bg-green-500/10">
            <Icon icon="line-md:confirm-circle" class="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between">
          <div>
            <p 
              class="text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Inactive
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.inactive }}
            </p>
          </div>
          <div class="p-4 rounded-full bg-orange-500/10">
            <Icon icon="line-md:close-circle" class="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between">
          <div>
            <p 
              class="text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Admins
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.admins }}
            </p>
          </div>
          <div class="p-4 rounded-full bg-purple-500/10">
            <Icon icon="line-md:star" class="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters (Collapsible) -->
    <div 
      v-if="showFilters"
      class="card shadow-lg border p-6 mb-6"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label 
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Search
          </label>
          <div class="relative">
            <Icon icon="line-md:search" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" :class="isDark ? 'text-gray-400' : 'text-gray-600'" />
            <input 
              v-model="search"
              type="text" 
              placeholder="Search users..."
              class="input input-bordered w-full pl-10"
              :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
            />
          </div>
        </div>

        <div>
          <label 
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Role
          </label>
          <select 
            v-model="filterRole"
            class="select select-bordered w-full"
            :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>

        <div>
          <label 
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Status
          </label>
          <select 
            v-model="filterStatus"
            class="select select-bordered w-full"
            :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="flex items-end">
          <button 
            class="btn btn-neutral w-full"
            @click="applyFilters"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div 
      class="card shadow-lg border overflow-hidden"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                <input type="checkbox" class="checkbox checkbox-sm" />
              </th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">User</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Email</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Role</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Status</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Last Active</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="user in filteredUsers" 
              :key="user.id"
              class="hover"
              :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'"
            >
              <td>
                <input type="checkbox" class="checkbox checkbox-sm" />
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-10 h-10 rounded-full">
                      <img :src="user.avatar" :alt="user.name" />
                    </div>
                  </div>
                  <div>
                    <div 
                      class="font-semibold"
                      :class="isDark ? 'text-white' : 'text-black'"
                    >
                      {{ user.name }}
                    </div>
                    <div 
                      class="text-sm"
                      :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                    >
                      ID: {{ user.id }}
                    </div>
                  </div>
                </div>
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ user.email }}
              </td>
              <td>
                <span 
                  class="badge badge-sm"
                  :class="{
                    'badge-primary': user.role === 'Admin',
                    'badge-secondary': user.role === 'Manager',
                    'badge-neutral': user.role === 'User'
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span 
                  class="badge badge-sm"
                  :class="user.status === 'Active' ? 'badge-success' : 'badge-error'"
                >
                  {{ user.status }}
                </span>
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ user.lastActive }}
              </td>
              <td>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-sm">
                    <Icon icon="line-md:menu" class="h-5 w-5" />
                  </button>
                  <ul 
                    tabindex="0" 
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
                    :class="isDark ? 'bg-gray-800' : 'bg-white'"
                  >
                    <li>
                      <a class="flex items-center gap-2">
                        <Icon icon="line-md:eye" class="h-4 w-4" />
                        View Details
                      </a>
                    </li>
                    <li>
                      <a class="flex items-center gap-2">
                        <Icon icon="line-md:edit" class="h-4 w-4" />
                        Edit User
                      </a>
                    </li>
                    <li>
                      <a class="flex items-center gap-2">
                        <Icon icon="line-md:email" class="h-4 w-4" />
                        Send Email
                      </a>
                    </li>
                    <li>
                      <a class="flex items-center gap-2 text-error">
                        <Icon icon="line-md:remove" class="h-4 w-4" />
                        Delete User
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div 
        class="p-6 border-t flex flex-col md:flex-row justify-between items-center gap-4"
        :class="isDark ? 'border-gray-700' : 'border-gray-200'"
      >
        <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          Showing {{ (currentPage - 1) * perPage + 1 }} to {{ Math.min(currentPage * perPage, filteredUsers.length) }} of {{ filteredUsers.length }} users
        </span>
        <div class="join">
          <button 
            class="join-item btn btn-sm"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            «
          </button>
          <button class="join-item btn btn-sm btn-active">{{ currentPage }}</button>
          <button class="join-item btn btn-sm">{{ currentPage + 1 }}</button>
          <button class="join-item btn btn-sm">{{ currentPage + 2 }}</button>
          <button 
            class="join-item btn btn-sm"
            @click="currentPage++"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');

const showFilters = ref(false);
const search = ref('');
const filterRole = ref('');
const filterStatus = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const stats = ref({
  total: 1247,
  active: 1089,
  inactive: 158,
  admins: 24
});

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 hours ago',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '5 minutes ago',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'Active',
    lastActive: '1 day ago',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=ec4899&color=fff'
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Manager',
    status: 'Inactive',
    lastActive: '1 week ago',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=f59e0b&color=fff'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    status: 'Active',
    lastActive: '3 hours ago',
    avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=10b981&color=fff'
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '30 minutes ago',
    avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=3b82f6&color=fff'
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward.norton@example.com',
    role: 'User',
    status: 'Inactive',
    lastActive: '2 weeks ago',
    avatar: 'https://ui-avatars.com/api/?name=Edward+Norton&background=ef4444&color=fff'
  },
  {
    id: 8,
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    role: 'Manager',
    status: 'Active',
    lastActive: 'Just now',
    avatar: 'https://ui-avatars.com/api/?name=Fiona+Garcia&background=14b8a6&color=fff'
  },
]);

const filteredUsers = computed(() => {
  let result = users.value;

  // Filter by search
  if (search.value) {
    result = result.filter(user => 
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Filter by role
  if (filterRole.value) {
    result = result.filter(user => user.role === filterRole.value);
  }

  // Filter by status
  if (filterStatus.value) {
    result = result.filter(user => user.status === filterStatus.value);
  }

  return result;
});

const applyFilters = () => {
  console.log('Filters applied:', { search: search.value, role: filterRole.value, status: filterStatus.value });
};
</script>