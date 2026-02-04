<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          All Users
        </h1>
        <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          Complete list of all users in the system
        </p>
      </div>
      
      <div class="flex gap-3">
        <div class="join">
          <button 
            class="join-item btn btn-sm"
            :class="viewMode === 'grid' ? 'btn-active' : ''"
            @click="viewMode = 'grid'"
          >
            <Icon icon="line-md:grid-3" class="h-5 w-5" />
          </button>
          <button 
            class="join-item btn btn-sm"
            :class="viewMode === 'list' ? 'btn-active' : ''"
            @click="viewMode = 'list'"
          >
            <Icon icon="line-md:list" class="h-5 w-5" />
          </button>
        </div>
        <router-link to="/users/add-new" class="btn btn-primary btn-sm gap-2">
          <Icon icon="line-md:plus" class="h-5 w-5" />
          Add User
        </router-link>
      </div>
    </div>

    <!-- Search & Filters -->
    <div 
      class="card shadow-lg border p-4 mb-6"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Icon icon="line-md:search" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" :class="isDark ? 'text-gray-400' : 'text-gray-600'" />
            <input 
              v-model="search"
              type="text" 
              placeholder="Search users by name, email, or ID..."
              class="input input-bordered w-full pl-10"
              :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
            />
          </div>
        </div>

        <select 
          v-model="sortBy"
          class="select select-bordered"
          :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="role">Sort by Role</option>
          <option value="joined">Sort by Join Date</option>
        </select>

        <select 
          v-model="filterRole"
          class="select select-bordered"
          :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
        </select>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id"
        class="card shadow-lg border hover:shadow-xl transition-shadow"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body items-center text-center p-6">
          <div class="avatar mb-4" :class="user.online ? 'online' : 'offline'">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img :src="user.avatar" :alt="user.name" />
            </div>
          </div>
          
          <h3 
            class="card-title text-lg mb-1"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            {{ user.name }}
          </h3>
          
          <p 
            class="text-sm mb-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            {{ user.email }}
          </p>

          <div class="flex gap-2 mb-4">
            <span 
              class="badge badge-sm"
              :class="{
                'badge-primary': user.role === 'Admin',
                'badge-secondary': user.role === 'Manager',
                'badge-accent': user.role === 'User',
                'badge-neutral': user.role === 'Guest'
              }"
            >
              {{ user.role }}
            </span>
            <span 
              class="badge badge-sm"
              :class="user.status === 'Active' ? 'badge-success' : 'badge-error'"
            >
              {{ user.status }}
            </span>
          </div>

          <div class="divider my-2"></div>

          <div class="w-full space-y-2 text-sm">
            <div class="flex justify-between">
              <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">Projects:</span>
              <span :class="isDark ? 'text-white font-semibold' : 'text-black font-semibold'">{{ user.projects }}</span>
            </div>
            <div class="flex justify-between">
              <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">Joined:</span>
              <span :class="isDark ? 'text-white' : 'text-black'">{{ user.joinDate }}</span>
            </div>
            <div class="flex justify-between">
              <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">Last Active:</span>
              <span :class="isDark ? 'text-white' : 'text-black'">{{ user.lastActive }}</span>
            </div>
          </div>

          <div class="card-actions w-full mt-4">
            <button class="btn btn-primary btn-sm flex-1">
              <Icon icon="line-md:email" class="h-4 w-4" />
              Message
            </button>
            <div class="dropdown dropdown-end">
              <button tabindex="0" class="btn btn-ghost btn-sm btn-square">
                <Icon icon="line-md:menu" class="h-5 w-5" />
              </button>
              <ul 
                tabindex="0" 
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
                :class="isDark ? 'bg-gray-800' : 'bg-white'"
              >
                <li><a><Icon icon="line-md:eye" class="h-4 w-4" /> View Profile</a></li>
                <li><a><Icon icon="line-md:edit" class="h-4 w-4" /> Edit User</a></li>
                <li><a class="text-error"><Icon icon="line-md:remove" class="h-4 w-4" /> Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div 
      v-else
      class="card shadow-lg border overflow-hidden"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">User</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Contact</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Role</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Status</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Projects</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Joined</th>
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
                <div class="flex items-center gap-3">
                  <div class="avatar" :class="user.online ? 'online' : 'offline'">
                    <div class="w-12 rounded-full">
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
              <td>
                <div :class="isDark ? 'text-white' : 'text-black'">{{ user.email }}</div>
                <div 
                  class="text-sm"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  {{ user.phone }}
                </div>
              </td>
              <td>
                <span 
                  class="badge"
                  :class="{
                    'badge-primary': user.role === 'Admin',
                    'badge-secondary': user.role === 'Manager',
                    'badge-accent': user.role === 'User',
                    'badge-neutral': user.role === 'Guest'
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span 
                  class="badge"
                  :class="user.status === 'Active' ? 'badge-success' : 'badge-error'"
                >
                  {{ user.status }}
                </span>
              </td>
              <td :class="isDark ? 'text-white' : 'text-black'">
                {{ user.projects }}
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ user.joinDate }}
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ user.lastActive }}
              </td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn-ghost btn-sm btn-square" title="View">
                    <Icon icon="line-md:eye" class="h-4 w-4" />
                  </button>
                  <button class="btn btn-ghost btn-sm btn-square" title="Edit">
                    <Icon icon="line-md:edit" class="h-4 w-4" />
                  </button>
                  <button class="btn btn-ghost btn-sm btn-square text-error" title="Delete">
                    <Icon icon="line-md:remove" class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div 
        class="p-6 border-t flex justify-between items-center"
        :class="isDark ? 'border-gray-700' : 'border-gray-200'"
      >
        <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          Showing {{ filteredUsers.length }} of {{ users.length }} users
        </span>
        <div class="join">
          <button class="join-item btn btn-sm">«</button>
          <button class="join-item btn btn-sm btn-active">1</button>
          <button class="join-item btn btn-sm">2</button>
          <button class="join-item btn btn-sm">3</button>
          <button class="join-item btn btn-sm">»</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');

const viewMode = ref('grid'); // 'grid' or 'list'
const search = ref('');
const sortBy = ref('name');
const filterRole = ref('');

const users = ref([
  {
    id: 1001,
    name: 'Jamal',
    email: 'jamal.aja@example.com',
    phone: '+62 812 3456 7890',
    role: 'Admin',
    status: 'Active',
    projects: 12,
    joinDate: 'Jan 15, 2024',
    lastActive: '2 hours ago',
    online: true,
    avatar: 'https://ui-avatars.com/api/?name=Jamal+Aja&background=6366f1&color=fff'
  },
  {
    id: 1002,
    name: 'Steven',
    email: 'steven1@example.com',
    phone: '+62 813 9876 5432',
    role: 'Manager',
    status: 'Active',
    projects: 8,
    joinDate: 'Feb 20, 2024',
    lastActive: '5 minutes ago',
    online: true,
    avatar: 'https://ui-avatars.com/api/?name=Steven&background=8b5cf6&color=fff'
  },
  {
    id: 1003,
    name: 'Bobi Wiliam',
    email: 'bobi.wiliam@example.com',
    phone: '+62 821 1234 5678',
    role: 'User',
    status: 'Active',
    projects: 5,
    joinDate: 'Mar 10, 2024',
    lastActive: '1 day ago',
    online: false,
    avatar: 'https://ui-avatars.com/api/?name=Bobi+Wiliam&background=ec4899&color=fff'
  },
  {
    id: 1004,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    phone: '+62 822 9876 1234',
    role: 'Manager',
    status: 'Inactive',
    projects: 15,
    joinDate: 'Jan 5, 2024',
    lastActive: '1 week ago',
    online: false,
    avatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=f59e0b&color=fff'
  },
  {
    id: 1005,
    name: 'Ceri blossom',
    email: 'ceri.blossom@example.com',
    phone: '+62 823 5555 6666',
    role: 'User',
    status: 'Active',
    projects: 3,
    joinDate: 'Apr 1, 2024',
    lastActive: '3 hours ago',
    online: true,
    avatar: 'https://ui-avatars.com/api/?name=Ceri+Blossom&background=10b981&color=fff'
  },
  {
    id: 1006,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    phone: '+62 824 7777 8888',
    role: 'Admin',
    status: 'Active',
    projects: 20,
    joinDate: 'Dec 1, 2023',
    lastActive: '30 minutes ago',
    online: true,
    avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=3b82f6&color=fff'
  },
  {
    id: 1007,
    name: 'Edward Halim',
    email: 'edward.halim@example.com',
    phone: '+62 825 4444 3333',
    role: 'Guest',
    status: 'Inactive',
    projects: 0,
    joinDate: 'May 10, 2024',
    lastActive: '2 weeks ago',
    online: false,
    avatar: 'https://ui-avatars.com/api/?name=Edward+Halim&background=ef4444&color=fff'
  },
  {
    id: 1008,
    name: 'Gracia',
    email: 'gracia@example.com',
    phone: '+62 826 1111 2222',
    role: 'Manager',
    status: 'Active',
    projects: 10,
    joinDate: 'Feb 28, 2024',
    lastActive: 'Just now',
    online: true,
    avatar: 'https://ui-avatars.com/api/?name=Gracia&background=14b8a6&color=fff'
  },
]);

const filteredUsers = computed(() => {
  let result = users.value;

  // Filter by search
  if (search.value) {
    result = result.filter(user => 
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase()) ||
      user.id.toString().includes(search.value)
    );
  }

  // Filter by role
  if (filterRole.value) {
    result = result.filter(user => user.role === filterRole.value);
  }

  // Sort
  result.sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name);
    if (sortBy.value === 'email') return a.email.localeCompare(b.email);
    if (sortBy.value === 'role') return a.role.localeCompare(b.role);
    return 0;
  });

  return result;
});
</script>