<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <router-link to="/users" class="btn btn-ghost btn-sm btn-circle">
          <Icon icon="line-md:arrow-left" class="h-5 w-5" />
        </router-link>
        <h1 
          class="text-3xl font-bold"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          Add New User
        </h1>
      </div>
      <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        Create a new user account with role and permissions
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
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
              <div class="form-control">
                <label class="label">
                <span 
                  class="label-text font-medium"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                >
                  First Name *
                </span>
                </label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  placeholder="Enter first name"
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                <span 
                 class="label-text font-medium"
                 :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                >
                  Last Name *
                </span>
                </label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  placeholder="Enter last name"
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Email Address *
                  </span>
                </label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="user@example.com"
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Phone Number
                  </span>
                </label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+62 812 3456 7890"
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Date of Birth
                  </span>
                </label>
                <input 
                  v-model="form.dob"
                  type="date" 
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                />
              </div>

              <div class="form-control md:col-span-2">
                <label class="label">
                <span 
                  class="label-text font-medium"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                >
                  Address
                </span>
                </label>
                  <textarea 
                    v-model="form.address"
                    class="textarea textarea-bordered h-24 GAP w-full"
                    :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                    placeholder="Enter full address"
                ></textarea>
              </div>
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Username *
                  </span>
                </label>
                <input 
                  v-model="form.username"
                  type="text" 
                  placeholder="Enter username"
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Role *
                  </span>
                </label>
                <select 
                  v-model="form.role"
                  class="select select-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Password *
                  </span>
                </label>
                <div class="relative">
                  <input 
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter password"
                    class="input input-bordered w-full pr-12"
                    :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                    required
                  />
                  <button 
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
                    @click="showPassword = !showPassword"
                  >
                    <Icon :icon="showPassword ? 'line-md:eye-off' : 'line-md:eye'" class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Confirm Password *
                  </span>
                </label>
                <input 
                  v-model="form.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Confirm password"
                  class="input input-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Department
                  </span>
                </label>
                <select 
                  v-model="form.department"
                  class="select select-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span 
                    class="label-text font-medium"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Status
                  </span>
                </label>
                <select 
                  v-model="form.status"
                  class="select select-bordered"
                  :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body">
            <h3 
              class="text-xl font-bold mb-4 flex items-center gap-2"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              <Icon icon="line-md:shield" class="h-6 w-6" />
              Permissions
            </h3>

            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-opacity-10 hover:bg-primary">
                <input 
                  v-model="form.permissions.canCreate"
                  type="checkbox" 
                  class="checkbox checkbox-primary" 
                />
                <div>
                  <span :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">
                    Can Create
                  </span>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">
                    Allow user to create new records
                  </p>
                </div>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-opacity-10 hover:bg-primary">
                <input 
                  v-model="form.permissions.canEdit"
                  type="checkbox" 
                  class="checkbox checkbox-primary" 
                />
                <div>
                  <span :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">
                    Can Edit
                  </span>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">
                    Allow user to edit existing records
                  </p>
                </div>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-opacity-10 hover:bg-primary">
                <input 
                  v-model="form.permissions.canDelete"
                  type="checkbox" 
                  class="checkbox checkbox-primary" 
                />
                <div>
                  <span :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">
                    Can Delete
                  </span>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">
                    Allow user to delete records
                  </p>
                </div>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-opacity-10 hover:bg-primary">
                <input 
                  v-model="form.permissions.canExport"
                  type="checkbox" 
                  class="checkbox checkbox-primary" 
                />
                <div>
                  <span :class="isDark ? 'text-white font-medium' : 'text-black font-medium'">
                    Can Export Data
                  </span>
                  <p :class="isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">
                    Allow user to export data
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Profile Picture -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body items-center text-center">
            <h3 
              class="text-lg font-bold mb-4"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              Profile Picture
            </h3>

            <div class="avatar mb-4">
              <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="previewImage" alt="Preview" />
              </div>
            </div>

            <input 
              type="file" 
              accept="image/*"
              class="file-input file-input-bordered file-input-sm w-full max-w-xs"
              @change="handleImageUpload"
            />
            
            <p 
              class="text-xs mt-2"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Allowed JPG, PNG. Max size of 2MB
            </p>
          </div>
        </div>

        <!-- Notifications -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body">
            <h3 
              class="text-lg font-bold mb-4"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              Notifications
            </h3>

            <div class="space-y-3">
              <label class="flex items-center justify-between cursor-pointer">
                <span :class="isDark ? 'text-white' : 'text-black'">
                  Email Notifications
                </span>
                <input 
                  v-model="form.notifications.email"
                  type="checkbox" 
                  class="toggle toggle-primary" 
                  checked
                />
              </label>

              <label class="flex items-center justify-between cursor-pointer">
                <span :class="isDark ? 'text-white' : 'text-black'">
                  SMS Notifications
                </span>
                <input 
                  v-model="form.notifications.sms"
                  type="checkbox" 
                  class="toggle toggle-primary" 
                />
              </label>

              <label class="flex items-center justify-between cursor-pointer">
                <span :class="isDark ? 'text-white' : 'text-black'">
                  Push Notifications
                </span>
                <input 
                  v-model="form.notifications.push"
                  type="checkbox" 
                  class="toggle toggle-primary" 
                  checked
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div 
          class="card shadow-lg border"
          :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
        >
          <div class="card-body">
            <button 
              class="btn btn-primary w-full mb-3"
              @click="handleSubmit"
            >
              <Icon icon="line-md:confirm" class="h-5 w-5" />
              Create User
            </button>
            
            <button 
              class="btn btn-outline w-full"
              @click="handleReset"
            >
              <Icon icon="line-md:close" class="h-5 w-5" />
              Reset Form
            </button>

            <div class="divider"></div>

            <router-link 
              to="/users" 
              class="btn btn-ghost w-full"
            >
              <Icon icon="line-md:arrow-left" class="h-5 w-5" />
              Back to Users
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');
const router = useRouter();

const showPassword = ref(false);
const previewImage = ref('https://ui-avatars.com/api/?name=New+User&background=6366f1&color=fff&size=128');

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  username: '',
  role: '',
  password: '',
  confirmPassword: '',
  department: '',
  status: 'Active',
  permissions: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: false,
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
  }
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  // Validation
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.username || !form.value.role || !form.value.password) {
    alert('Please fill in all required fields!');
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  console.log('Creating user:', form.value);
  alert('User created successfully!');
  router.push('/users');
};

const handleReset = () => {
  if (confirm('Are you sure you want to reset the form?')) {
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      username: '',
      role: '',
      password: '',
      confirmPassword: '',
      department: '',
      status: 'Active',
      permissions: {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canExport: false,
      },
      notifications: {
        email: true,
        sms: false,
        push: true,
      }
    };
    previewImage.value = 'https://ui-avatars.com/api/?name=New+User&background=6366f1&color=fff&size=128';
  }
};
</script>