<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          Reports
        </h1>
        <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          Generate and download detailed reports
        </p>
      </div>
      
      <div class="flex gap-3">
        <button 
          class="btn btn-primary gap-2"
          @click="generateReport"
        >
          <Icon icon="line-md:document-add" class="h-5 w-5" />
          Generate Report
        </button>
        <button 
          class="btn btn-outline gap-2"
          :class="isDark ? 'btn-outline-white' : 'btn-outline-dark'"
        >
          <Icon icon="line-md:download-outline-loop" class="h-5 w-5" />
          Export
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div 
      class="card shadow-lg border p-6 mb-6"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <h2 
        class="text-lg font-semibold mb-4"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        Filters
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label 
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Report Type
          </label>
          <select 
            v-model="filters.type"
            class="select select-bordered w-full"
            :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
          >
            <option value="all">All Reports</option>
            <option value="sales">Sales Report</option>
            <option value="users">Users Report</option>
            <option value="products">Products Report</option>
            <option value="revenue">Revenue Report</option>
          </select>
        </div>

        <div>
          <label 
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Date Range
          </label>
          <select 
            v-model="filters.range"
            class="select select-bordered w-full"
            :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">This Year</option>
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
            v-model="filters.status"
            class="select select-bordered w-full"
            :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div class="flex items-end">
          <button 
            class="btn btn-neutral w-full"
            @click="applyFilters"
          >
            <Icon icon="line-md:search" class="h-5 w-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              Total Reports
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.total }}
            </p>
          </div>
          <div class="p-4 rounded-full bg-blue-500/10">
            <Icon icon="line-md:document-list" class="h-8 w-8 text-blue-500" />
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
              Completed
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.completed }}
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
              Processing
            </p>
            <p 
              class="text-3xl font-bold"
              :class="isDark ? 'text-white' : 'text-black'"
            >
              {{ stats.processing }}
            </p>
          </div>
          <div class="p-4 rounded-full bg-orange-500/10">
            <Icon icon="line-md:loading-loop" class="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div 
      class="card shadow-lg border overflow-hidden"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <div class="p-6 border-b" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
        <h2 
          class="text-xl font-bold"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          Recent Reports
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr :class="isDark ? 'bg-gray-800' : 'bg-gray-100'">
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Report Name</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Type</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Date</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Status</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Size</th>
              <th :class="isDark ? 'text-gray-300' : 'text-gray-700'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="report in reports" 
              :key="report.id"
              class="hover"
              :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'"
            >
              <td :class="isDark ? 'text-white' : 'text-black'">
                <div class="flex items-center gap-3">
                  <Icon icon="line-md:document" class="h-5 w-5" />
                  <span class="font-medium">{{ report.name }}</span>
                </div>
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ report.type }}
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ report.date }}
              </td>
              <td>
                <span 
                  class="badge badge-sm"
                  :class="{
                    'badge-success': report.status === 'Completed',
                    'badge-warning': report.status === 'Processing',
                    'badge-error': report.status === 'Failed'
                  }"
                >
                  {{ report.status }}
                </span>
              </td>
              <td :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ report.size }}
              </td>
              <td>
                <div class="flex gap-2">
                  <button 
                    class="btn btn-sm btn-ghost"
                    title="Download"
                  >
                    <Icon icon="line-md:download-outline" class="h-4 w-4" />
                  </button>
                  <button 
                    class="btn btn-sm btn-ghost"
                    title="View"
                  >
                    <Icon icon="line-md:eye" class="h-4 w-4" />
                  </button>
                  <button 
                    class="btn btn-sm btn-ghost text-error"
                    title="Delete"
                  >
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
          Showing 1 to 10 of 50 reports
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
import { ref, inject } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');

const filters = ref({
  type: 'all',
  range: 'month',
  status: 'all'
});

const stats = ref({
  total: 156,
  completed: 142,
  processing: 8
});

const reports = ref([
  { id: 1, name: 'Monthly Sales Report', type: 'Sales', date: '2026-01-15', status: 'Completed', size: '2.4 MB' },
  { id: 2, name: 'User Analytics Q4', type: 'Users', date: '2026-01-14', status: 'Completed', size: '1.8 MB' },
  { id: 3, name: 'Product Performance', type: 'Products', date: '2026-01-13', status: 'Processing', size: '3.2 MB' },
  { id: 4, name: 'Revenue Breakdown', type: 'Revenue', date: '2026-01-12', status: 'Completed', size: '1.5 MB' },
  { id: 5, name: 'Customer Insights', type: 'Users', date: '2026-01-11', status: 'Completed', size: '2.1 MB' },
  { id: 6, name: 'Inventory Report', type: 'Products', date: '2026-01-10', status: 'Failed', size: '0 MB' },
  { id: 7, name: 'Annual Summary 2024', type: 'Sales', date: '2026-01-09', status: 'Completed', size: '5.6 MB' },
  { id: 8, name: 'Marketing Campaign', type: 'Sales', date: '2026-01-08', status: 'Completed', size: '1.9 MB' },
  { id: 9, name: 'Weekly Traffic Report', type: 'Users', date: '2026-01-07', status: 'Processing', size: '1.2 MB' },
  { id: 10, name: 'Top Products Analysis', type: 'Products', date: '2026-01-06', status: 'Completed', size: '2.8 MB' },
]);

const applyFilters = () => {
  console.log('Applying filters:', filters.value);
  // Logic untuk filter akan ditambahkan di sini
};

const generateReport = () => {
  console.log('Generating new report...');
  // Logic untuk generate report
};
</script>