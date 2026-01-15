<template>
  <div class="p-6">
    <h1 
      class="text-3xl font-bold mb-6"
      :class="isDark ? 'text-white' : 'text-black'"
    >
      Settings
    </h1>

    <!-- Tabs Navigation -->
    <div class="tabs tabs-boxed mb-6 w-full overflow-x-auto">
      <a 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab gap-2"
        :class="{ 'tab-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <Icon :icon="tab.icon" class="h-5 w-5" />
        {{ tab.name }}
      </a>
    </div>

    <!-- General Settings -->
    <div v-if="activeTab === 'general'" class="space-y-6">
      <div 
        class="card shadow-lg border"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body">
          <h3 
            class="text-xl font-bold mb-4"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            Application Settings
          </h3>
          
          <div class="space-y-4">
            <div>
              <label 
                class="text-sm font-medium mb-2 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Application Name
              </label>
              <input 
                type="text" 
                value="AdminPanel"
                class="input input-bordered w-full"
                :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              />
            </div>

            <div>
              <label 
                class="text-sm font-medium mb-2 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Company Name
              </label>
              <input 
                type="text" 
                value="My Company Inc."
                class="input input-bordered w-full"
                :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              />
            </div>

            <div>
              <label 
                class="text-sm font-medium mb-2 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Time Zone
              </label>
              <select 
                class="select select-bordered w-full"
                :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              >
                <option>GMT+7 (Jakarta)</option>
                <option>GMT+8 (Singapore)</option>
                <option>GMT+9 (Tokyo)</option>
                <option>UTC (London)</option>
              </select>
            </div>

            <div>
              <label 
                class="text-sm font-medium mb-2 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Language
              </label>
              <select 
                class="select select-bordered w-full"
                :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              >
                <option>English</option>
                <option>Bahasa Indonesia</option>
                <option>日本語 (Japanese)</option>
                <option>中文 (Chinese)</option>
              </select>
            </div>

            <div>
              <label 
                class="text-sm font-medium mb-2 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Date Format
              </label>
              <select 
                class="select select-bordered w-full"
                :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              >
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button class="btn btn-ghost">Cancel</button>
              <button class="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Appearance Settings -->
    <div v-if="activeTab === 'appearance'" class="space-y-6">
      <div 
        class="card shadow-lg border"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body">
          <h3 
            class="text-xl font-bold mb-4"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            Theme & Appearance
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Dark Mode</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Enable dark theme across the application</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" :checked="isDark" />
            </div>

            <div>
              <label 
                class="text-sm font-medium mb-3 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Primary Color
              </label>
              <div class="grid grid-cols-5 gap-4">
                <button 
                  v-for="color in colors" 
                  :key="color.name"
                  class="btn btn-square h-12 w-12"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <div>
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                  >
                  Sidebar Width
                </label>
                <input 
                  v-model.number="sidebarWidth"
                  type="range" 
                  min="240" 
                  max="400" 
                  step="10"
                  class="range range-primary w-full" 
                />
                <div class="flex justify-between text-xs mt-2" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  <span>Compact</span>
                  <span>Wide</span>
                </div>
              </div>
            </div>      
            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Compact Mode</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Reduce spacing and padding</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" />
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button class="btn btn-ghost">Reset to Default</button>
              <button class="btn btn-primary">Apply Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Settings -->
    <div v-if="activeTab === 'notifications'" class="space-y-6">
      <div 
        class="card shadow-lg border"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body">
          <h3 
            class="text-xl font-bold mb-4"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            Notification Preferences
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Email Notifications</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Receive notifications via email</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>

            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Push Notifications</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Receive push notifications in browser</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>

            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">SMS Notifications</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Receive SMS for important updates</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" />
            </div>

            <div class="divider"></div>

            <h4 
              class="text-lg font-semibold mb-3"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              Notification Types
            </h4>

            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <span :class="isDark ? 'text-white' : 'text-black'">New user registrations</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <span :class="isDark ? 'text-white' : 'text-black'">New orders</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <span :class="isDark ? 'text-white' : 'text-black'">Product updates</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" />
                <span :class="isDark ? 'text-white' : 'text-black'">Marketing emails</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <span :class="isDark ? 'text-white' : 'text-black'">System updates</span>
              </label>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button class="btn btn-ghost">Cancel</button>
              <button class="btn btn-primary">Save Preferences</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings -->
    <div v-if="activeTab === 'security'" class="space-y-6">
      <div 
        class="card shadow-lg border"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body">
          <h3 
            class="text-xl font-bold mb-4"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            Security Settings
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Two-Factor Authentication</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Add an extra layer of security to your account</p>
              </div>
              <button class="btn btn-primary btn-sm">Enable</button>
            </div>

            <div class="divider"></div>

            <h4 
              class="text-lg font-semibold mb-3"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              Active Sessions
            </h4>

            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 rounded-lg border" :class="isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'">
                <div class="flex items-center gap-4">
                  <Icon icon="line-md:laptop" class="h-8 w-8" :class="isDark ? 'text-blue-400' : 'text-blue-600'" />
                  <div>
                    <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Windows • Chrome</p>
                    <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Bogor, Indonesia • Current session</p>
                  </div>
                </div>
                <span class="badge badge-success">Active</span>
              </div>

              <div class="flex items-center justify-between p-4 rounded-lg border" :class="isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'">
                <div class="flex items-center gap-4">
                  <Icon icon="line-md:phone" class="h-8 w-8" :class="isDark ? 'text-purple-400' : 'text-purple-600'" />
                  <div>
                    <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Android • Chrome Mobile</p>
                    <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Jakarta, Indonesia • 2 days ago</p>
                  </div>
                </div>
                <button class="btn btn-error btn-sm">Revoke</button>
              </div>
            </div>

            <div class="divider"></div>

            <h4 
              class="text-lg font-semibold mb-3"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              Login History
            </h4>

            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
                    <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Date</th>
                    <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Location</th>
                    <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Device</th>
                    <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'">
                    <td :class="isDark ? 'text-white' : 'text-black'">2025-01-15 10:30</td>
                    <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">Bogor, Indonesia</td>
                    <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">Windows • Chrome</td>
                    <td><span class="badge badge-success">Success</span></td>
                  </tr>
                  <tr :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'">
                    <td :class="isDark ? 'text-white' : 'text-black'">2025-01-13 14:20</td>
                    <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">Jakarta, Indonesia</td>
                    <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">Android • Chrome</td>
                    <td><span class="badge badge-success">Success</span></td>
                  </tr>
                  <tr :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'">
                    <td :class="isDark ? 'text-white' : 'text-black'">2025-01-10 09:15</td>
                    <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">Unknown</td>
                    <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">Unknown</td>
                    <td><span class="badge badge-error">Failed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Privacy Settings -->
    <div v-if="activeTab === 'privacy'" class="space-y-6">
      <div 
        class="card shadow-lg border"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body">
          <h3 
            class="text-xl font-bold mb-4"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            Privacy Settings
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Profile Visibility</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Make your profile visible to others</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>

            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Activity Status</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Show when you're active</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>

            <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <div>
                <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Analytics Tracking</p>
                <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Allow us to collect usage data</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>

            <div class="divider"></div>

            <div class="alert alert-warning">
              <Icon icon="line-md:alert" class="h-6 w-6" />
              <div>
                <h3 class="font-bold">Danger Zone</h3>
                <div class="text-sm">These actions are irreversible</div>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <button class="btn btn-outline btn-error">
                <Icon icon="line-md:download-outline" class="h-5 w-5" />
                Download My Data
              </button>
              <button class="btn btn-outline btn-error">
                <Icon icon="line-md:close-circle" class="h-5 w-5" />
                Nonactive Account
              </button>
              <button class="btn btn-error">
                <Icon icon="line-md:remove" class="h-5 w-5" />
                Delete Account Permanently
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');

const activeTab = ref('general');
const sidebarWidth = ref(320);

const tabs = [
  { id: 'general', name: 'General', icon: 'line-md:cog' },
  { id: 'appearance', name: 'Appearance', icon: 'line-md:paint-drop' },
  { id: 'notifications', name: 'Notifications', icon: 'line-md:bell' },
  { id: 'security', name: 'Security', icon: 'line-md:lock' },
  { id: 'privacy', name: 'Privacy', icon: 'line-md:shield' },
];

const colors = [
  { name: 'Blue', value: '#6366f1' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Green', value: '#10b981' },
];
</script>