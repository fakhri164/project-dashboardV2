<template>
  <div class="p-6">
    <h1 
      class="text-3xl font-bold mb-6"
      :class="isDark ? 'text-white' : 'text-black'"
    >
      My Profile
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div 
        class="card shadow-lg border"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="card-body items-center text-center">
          <div class="avatar mb-4">
            <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/rhl.jpeg" alt="Profile" />
            </div>
          </div>
          
          <h2 
            class="text-2xl font-bold"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            M. Fakhri Abdilah
          </h2>
          
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            Administrator
          </p>
          
          <div class="badge badge-primary mt-2">
            <select 
              class="bg-primary border-0 p-0 text-white"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              <option>admin</option>
              <option>user</option>
              <option>bos</option>
            </select>
          </div>
          
          <div class="divider"></div>
          
          <div class="stats stats-vertical shadow w-full">
            <div class="stat">
              <div class="stat-title">Projects</div>
              <div class="stat-value text-primary">42</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">Tasks Completed</div>
              <div class="stat-value text-secondary">186</div>
            </div>
          </div>
          
          <button class="btn btn-primary btn-block mt-4">
            <Icon icon="line-md:edit" class="h-5 w-5 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Profile Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Information -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body">
            <h3 
              class="text-xl font-bold mb-4 flex items-center gap-2"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              <Icon icon="line-md:account" class="h-6 w-6" />
              Personal Information
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  value="M. Fakhri Abdilah"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
              
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Email Address
                </label>
                <input 
                  type="email" 
                  value="fakhri@example.com"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
              
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  value="0838-1366-7399"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
              
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Location
                </label>
                <input 
                  type="text" 
                  value="Bogor, Indonesia"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
            </div>
            
            <div class="mt-4">
              <label 
                class="text-sm font-medium mb-2 block"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Bio
              </label>
              <textarea 
                class="textarea textarea-bordered w-full h-24"
                :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              >Adalah pokoknya</textarea>
            </div>
            
            <div class="flex justify-end gap-3 mt-6">
              <button class="btn btn-ghost">Cancel</button>
              <button class="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body">
            <h3 
              class="text-xl font-bold mb-4 flex items-center gap-2"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              <Icon icon="line-md:cog" class="h-6 w-6" />
              Account Settings
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
                <div>
                  <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Email Notifications</p>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Receive email about your account activity</p>
                </div>
                <input type="checkbox" class="toggle toggle-primary" checked />
              </div>
              
              <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
                <div>
                  <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Two-Factor Authentication</p>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Add an extra layer of security</p>
                </div>
                <input type="checkbox" class="toggle toggle-primary" />
              </div>
              
              <div class="flex items-center justify-between p-4 rounded-lg" :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
                <div>
                  <p :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">Marketing Emails</p>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">Receive emails about new features and updates</p>
                </div>
                <input type="checkbox" class="toggle toggle-primary" checked />
              </div>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body">
            <h3 
              class="text-xl font-bold mb-4 flex items-center gap-2"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              <Icon icon="line-md:lock" class="h-6 w-6" />
              Change Password
            </h3>
            
            <div class="space-y-4">
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Current Password
                </label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
              
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  New Password
                </label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
              
              <div>
                <label 
                  class="text-sm font-medium mb-2 block"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Confirm New Password
                </label>
                <input 
                  type="password" 
                  placeholder="Confirm new password"
                  class="input input-bordered w-full"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>
              
              <button class="btn btn-primary">Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');
</script>