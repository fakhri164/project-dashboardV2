<template>
  <div class="min-h-screen bg-[#0f172a] p-4 sm:p-6">
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Roles & Permissions</h1>
      <p class="text-sm sm:text-base text-slate-400">Manage user roles and their permissions across the system</p>
    </div>

    <!-- Action Bar -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base flex items-center gap-2',
            activeTab === tab.id
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          ]"
        >
          <Icon :icon="tab.icon" class="text-lg sm:text-xl flex-shrink-0" />
          <span class="hidden sm:inline">{{ tab.label }}</span>
          <span class="sm:hidden">{{ tab.shortLabel || tab.label }}</span>
        </button>
      </div>
      <button
        @click="openCreateRoleModal"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
      >
        <Icon icon="mdi:plus-circle" class="text-xl flex-shrink-0" />
        <span class="hidden sm:inline">Create New Role</span>
        <span class="sm:hidden">Create Role</span>
      </button>
    </div>

    <!-- Roles Grid -->
    <div v-if="activeTab === 'roles'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      <div
        v-for="role in roles"
        :key="role.id"
        class="bg-[#1e293b] border border-slate-700/50 rounded-xl p-4 sm:p-6 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
      >
        <!-- Role Header -->
        <div class="flex justify-between items-start mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <div
              :class="[
                'w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                role.color
              ]"
            >
              <Icon :icon="role.icon" class="text-xl sm:text-2xl text-white" />
            </div>
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-semibold text-white truncate">{{ role.name }}</h3>
              <p class="text-xs sm:text-sm text-slate-400">{{ role.userCount }} users</p>
            </div>
          </div>
          <button class="text-slate-400 hover:text-white flex-shrink-0">
            <Icon icon="mdi:dots-vertical" class="text-xl" />
          </button>
        </div>

        <!-- Role Description -->
        <p class="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{{ role.description }}</p>

        <!-- Permissions Summary -->
        <div class="border-t border-slate-700 pt-3 sm:pt-4 mb-3 sm:mb-4">
          <p class="text-xs font-medium text-slate-400 mb-2 sm:mb-3">PERMISSIONS</p>
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            <span
              v-for="(perm, index) in role.permissions.slice(0, 4)"
              :key="index"
              class="px-2 sm:px-2.5 py-1 bg-slate-700 text-slate-300 text-xs rounded-md truncate"
            >
              {{ perm }}
            </span>
            <span
              v-if="role.permissions.length > 4"
              class="px-2 sm:px-2.5 py-1 bg-indigo-600/20 text-indigo-400 text-xs rounded-md"
            >
              +{{ role.permissions.length - 4 }} more
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <button
            @click="editRole(role)"
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
          >
            <Icon icon="mdi:pencil" class="inline mr-1" />
            Edit
          </button>
          <button
            @click="viewRoleDetails(role)"
            class="flex-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
          >
            <Icon icon="mdi:eye" class="inline mr-1" />
            View
          </button>
        </div>
      </div>
    </div>

    <!-- Permissions Matrix -->
    <div v-if="activeTab === 'permissions'" class="bg-[#1e293b] border border-slate-700/50 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-900/50">
              <th class="px-6 py-4 text-left text-sm font-semibold text-slate-300 sticky left-0 bg-slate-900/50">
                Permission
              </th>
              <th
                v-for="role in roles"
                :key="role.id"
                class="px-6 py-4 text-center text-sm font-semibold text-slate-300 min-w-[120px]"
              >
                <div class="flex flex-col items-center gap-2">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', role.color]">
                    <Icon :icon="role.icon" class="text-xl text-white" />
                  </div>
                  <span>{{ role.name }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(category, catIndex) in permissionCategories" :key="catIndex">
              <tr class="border-t border-slate-700">
                <td colspan="100%" class="px-6 py-3 bg-slate-900/30">
                  <div class="flex items-center gap-2">
                    <Icon :icon="category.icon" class="text-indigo-400" />
                    <span class="font-semibold text-slate-300 text-sm">{{ category.name }}</span>
                  </div>
                </td>
              </tr>
              <tr
                v-for="(perm, permIndex) in category.permissions"
                :key="`${catIndex}-${permIndex}`"
                class="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors"
              >
                <td class="px-6 py-4 sticky left-0 bg-[#1e293b]">
                  <div>
                    <p class="text-sm font-medium text-white">{{ perm.name }}</p>
                    <p class="text-xs text-slate-400">{{ perm.description }}</p>
                  </div>
                </td>
                <td
                  v-for="role in roles"
                  :key="role.id"
                  class="px-6 py-4 text-center"
                >
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      :checked="hasPermission(role, perm.key)"
                      @change="togglePermission(role, perm.key)"
                      class="sr-only peer"
                    />
                    <div class="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Activity Log -->
    <div v-if="activeTab === 'activity'" class="bg-[#1e293b] border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <div class="space-y-3 sm:space-y-4">
        <div
          v-for="(activity, index) in activityLog"
          :key="index"
          class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-all"
        >
          <div :class="['w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0', activity.iconBg]">
            <Icon :icon="activity.icon" class="text-xl sm:text-2xl" :class="activity.iconColor" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-medium text-white mb-1 line-clamp-2">{{ activity.description }}</p>
            <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400">
              <span class="flex items-center gap-1">
                <Icon icon="mdi:account" class="text-sm" />
                <span class="truncate">{{ activity.user }}</span>
              </span>
              <span class="flex items-center gap-1">
                <Icon icon="mdi:clock-outline" class="text-sm" />
                {{ activity.time }}
              </span>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center gap-1 min-w-[80px] sm:min-w-[100px]">
            <span :class="['px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap', activity.statusClass]">
              {{ activity.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Role Modal -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-[#1e293b] rounded-xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-[#1e293b] border-b border-slate-700/50 p-6 flex justify-between items-center">
            <h2 class="text-xl font-bold text-white">
              {{ editingRole ? 'Edit Role' : 'Create New Role' }}
            </h2>
            <button @click="closeModal" class="text-slate-400 hover:text-white">
              <Icon icon="mdi:close" class="text-2xl" />
            </button>
          </div>

          <div class="p-6 space-y-6">
            <!-- Role Name -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Role Name *</label>
              <input
                v-model="roleForm.name"
                type="text"
                placeholder="e.g., Content Manager"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                v-model="roleForm.description"
                rows="3"
                placeholder="Brief description of this role..."
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <!-- Icon & Color -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                <select
                  v-model="roleForm.icon"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="mdi:shield-crown">Crown</option>
                  <option value="mdi:account-tie">Tie</option>
                  <option value="mdi:account-star">Star</option>
                  <option value="mdi:account-edit">Edit</option>
                  <option value="mdi:eye">Eye</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Color</label>
                <select
                  v-model="roleForm.color"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="bg-purple-600">Purple</option>
                  <option value="bg-indigo-600">Indigo</option>
                  <option value="bg-blue-600">Blue</option>
                  <option value="bg-green-600">Green</option>
                  <option value="bg-orange-600">Orange</option>
                  <option value="bg-pink-600">Pink</option>
                </select>
              </div>
            </div>

            <!-- Permissions Selection -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-3">Permissions</label>
              <div class="space-y-4">
                <div
                  v-for="category in permissionCategories"
                  :key="category.name"
                  class="bg-slate-900/30 rounded-lg p-4"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <Icon :icon="category.icon" class="text-indigo-400" />
                    <span class="font-medium text-white text-sm">{{ category.name }}</span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <label
                      v-for="perm in category.permissions"
                      :key="perm.key"
                      class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-800 transition-colors"
                    >
                      <input
                        type="checkbox"
                        :value="perm.key"
                        v-model="roleForm.permissions"
                        class="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                      <span class="text-sm text-slate-300">{{ perm.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sticky bottom-0 bg-[#1e293b] border-t border-slate-700/50 p-6 flex justify-end gap-3">
            <button
              @click="closeModal"
              class="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
            <button
              @click="saveRole"
              class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Icon icon="mdi:content-save" />
              {{ editingRole ? 'Update Role' : 'Create Role' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';

// Tabs
const tabs = [
  { id: 'roles', label: 'Roles', shortLabel: 'Roles', icon: 'mdi:shield-account' },
  { id: 'permissions', label: 'Permissions Matrix', shortLabel: 'Matrix', icon: 'mdi:table-cog' },
  { id: 'activity', label: 'Activity Log', shortLabel: 'Activity', icon: 'mdi:history' }
];

const activeTab = ref('roles');

// Roles Data
const roles = ref([
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    userCount: 3,
    icon: 'mdi:shield-crown',
    color: 'bg-purple-600',
    permissions: ['users.create', 'users.edit', 'users.delete', 'roles.manage', 'settings.manage', 'analytics.view', 'reports.export', 'messages.send']
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Administrative access with limited restrictions',
    userCount: 8,
    icon: 'mdi:account-tie',
    color: 'bg-indigo-600',
    permissions: ['users.create', 'users.edit', 'roles.view', 'analytics.view', 'reports.export', 'messages.send']
  },
  {
    id: 3,
    name: 'Manager',
    description: 'Can manage users and view reports',
    userCount: 15,
    icon: 'mdi:account-star',
    color: 'bg-blue-600',
    permissions: ['users.view', 'users.edit', 'analytics.view', 'reports.view', 'messages.send']
  },
  {
    id: 4,
    name: 'Editor',
    description: 'Can edit content and manage products',
    userCount: 24,
    icon: 'mdi:account-edit',
    color: 'bg-green-600',
    permissions: ['products.create', 'products.edit', 'products.delete', 'messages.send']
  },
  {
    id: 5,
    name: 'Viewer',
    description: 'Read-only access to system resources',
    userCount: 42,
    icon: 'mdi:eye',
    color: 'bg-orange-600',
    permissions: ['users.view', 'analytics.view', 'reports.view', 'products.view']
  },
  {
    id: 6,
    name: 'Support',
    description: 'Customer support and messaging access',
    userCount: 18,
    icon: 'mdi:headset',
    color: 'bg-pink-600',
    permissions: ['messages.send', 'users.view', 'tickets.manage']
  }
]);

// Permission Categories
const permissionCategories = [
  {
    name: 'User Management',
    icon: 'mdi:account-group',
    permissions: [
      { key: 'users.view', name: 'View Users', description: 'Can view user list and profiles' },
      { key: 'users.create', name: 'Create Users', description: 'Can add new users' },
      { key: 'users.edit', name: 'Edit Users', description: 'Can modify user information' },
      { key: 'users.delete', name: 'Delete Users', description: 'Can remove users from system' }
    ]
  },
  {
    name: 'Role Management',
    icon: 'mdi:shield-account',
    permissions: [
      { key: 'roles.view', name: 'View Roles', description: 'Can view roles and permissions' },
      { key: 'roles.manage', name: 'Manage Roles', description: 'Can create, edit, and delete roles' }
    ]
  },
  {
    name: 'Product Management',
    icon: 'mdi:package-variant',
    permissions: [
      { key: 'products.view', name: 'View Products', description: 'Can view product catalog' },
      { key: 'products.create', name: 'Create Products', description: 'Can add new products' },
      { key: 'products.edit', name: 'Edit Products', description: 'Can modify product details' },
      { key: 'products.delete', name: 'Delete Products', description: 'Can remove products' }
    ]
  },
  {
    name: 'Analytics & Reports',
    icon: 'mdi:chart-line',
    permissions: [
      { key: 'analytics.view', name: 'View Analytics', description: 'Can view analytics dashboard' },
      { key: 'reports.view', name: 'View Reports', description: 'Can view generated reports' },
      { key: 'reports.export', name: 'Export Reports', description: 'Can export reports to files' }
    ]
  },
  {
    name: 'Communication',
    icon: 'mdi:message-text',
    permissions: [
      { key: 'messages.send', name: 'Send Messages', description: 'Can send messages to users' },
      { key: 'tickets.manage', name: 'Manage Tickets', description: 'Can handle support tickets' }
    ]
  },
  {
    name: 'System Settings',
    icon: 'mdi:cog',
    permissions: [
      { key: 'settings.view', name: 'View Settings', description: 'Can view system settings' },
      { key: 'settings.manage', name: 'Manage Settings', description: 'Can modify system configuration' }
    ]
  }
];

// Activity Log
const activityLog = ref([
  {
    description: 'Super Admin role updated with new permissions',
    user: 'Diana Prince',
    time: '2 minutes ago',
    status: 'Updated',
    statusClass: 'bg-blue-600/20 text-blue-400',
    icon: 'mdi:shield-edit',
    iconBg: 'bg-blue-600/20',
    iconColor: 'text-blue-400'
  },
  {
    description: 'New role "Content Manager" created',
    user: 'Alice Williams',
    time: '1 hour ago',
    status: 'Created',
    statusClass: 'bg-green-600/20 text-green-400',
    icon: 'mdi:plus-circle',
    iconBg: 'bg-green-600/20',
    iconColor: 'text-green-400'
  },
  {
    description: 'Viewer role permissions modified',
    user: 'Ceri Blossom',
    time: '3 hours ago',
    status: 'Modified',
    statusClass: 'bg-orange-600/20 text-orange-400',
    icon: 'mdi:pencil',
    iconBg: 'bg-orange-600/20',
    iconColor: 'text-orange-400'
  },
  {
    description: 'Editor role assigned to 5 new users',
    user: 'Diana Prince',
    time: '5 hours ago',
    status: 'Assigned',
    statusClass: 'bg-purple-600/20 text-purple-400',
    icon: 'mdi:account-multiple-plus',
    iconBg: 'bg-purple-600/20',
    iconColor: 'text-purple-400'
  },
  {
    description: 'Guest role deleted from system',
    user: 'Alice Williams',
    time: '1 day ago',
    status: 'Deleted',
    statusClass: 'bg-red-600/20 text-red-400',
    icon: 'mdi:delete',
    iconBg: 'bg-red-600/20',
    iconColor: 'text-red-400'
  }
]);

// Modal State
const showModal = ref(false);
const editingRole = ref(null);
const roleForm = reactive({
  name: '',
  description: '',
  icon: 'mdi:shield-crown',
  color: 'bg-purple-600',
  permissions: []
});

// Methods
const openCreateRoleModal = () => {
  editingRole.value = null;
  roleForm.name = '';
  roleForm.description = '';
  roleForm.icon = 'mdi:shield-crown';
  roleForm.color = 'bg-purple-600';
  roleForm.permissions = [];
  showModal.value = true;
};

const editRole = (role) => {
  editingRole.value = role;
  roleForm.name = role.name;
  roleForm.description = role.description;
  roleForm.icon = role.icon;
  roleForm.color = role.color;
  roleForm.permissions = [...role.permissions];
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveRole = () => {
  if (editingRole.value) {
    // Update existing role
    const index = roles.value.findIndex(r => r.id === editingRole.value.id);
    if (index !== -1) {
      roles.value[index] = {
        ...roles.value[index],
        name: roleForm.name,
        description: roleForm.description,
        icon: roleForm.icon,
        color: roleForm.color,
        permissions: [...roleForm.permissions]
      };
    }
  } else {
    // Create new role
    roles.value.push({
      id: roles.value.length + 1,
      name: roleForm.name,
      description: roleForm.description,
      icon: roleForm.icon,
      color: roleForm.color,
      userCount: 0,
      permissions: [...roleForm.permissions]
    });
  }
  closeModal();
};

const viewRoleDetails = (role) => {
  console.log('View role details:', role);
};

const hasPermission = (role, permKey) => {
  return role.permissions.includes(permKey);
};

const togglePermission = (role, permKey) => {
  const index = role.permissions.indexOf(permKey);
  if (index > -1) {
    role.permissions.splice(index, 1);
  } else {
    role.permissions.push(permKey);
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>