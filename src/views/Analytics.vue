<template>
  <div class="p-6">
    <h1 
      class="text-3xl font-bold mb-6"
      :class="isDark ? 'text-white' : 'text-black'"
    >
      Analytics Overview
    </h1>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between mb-2">
          <span 
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Page Views
          </span>
          <Icon icon="line-md:eye" class="h-5 w-5 text-blue-500" />
        </div>
        <p 
          class="text-3xl font-bold"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          45,234
        </p>
        <div class="flex items-center mt-2 text-sm">
          <Icon icon="line-md:arrow-up" class="h-4 w-4 text-green-500" />
          <span class="text-green-500 font-medium ml-1">12%</span>
          <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="ml-1">vs last month</span>
        </div>
      </div>

      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between mb-2">
          <span 
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            New Visitors
          </span>
          <Icon icon="line-md:account-add" class="h-5 w-5 text-purple-500" />
        </div>
        <p 
          class="text-3xl font-bold"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          8,492
        </p>
        <div class="flex items-center mt-2 text-sm">
          <Icon icon="line-md:arrow-up" class="h-4 w-4 text-green-500" />
          <span class="text-green-500 font-medium ml-1">8%</span>
          <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="ml-1">vs last month</span>
        </div>
      </div>

      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between mb-2">
          <span 
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Bounce Rate
          </span>
          <Icon icon="line-md:arrow-align-left" class="h-5 w-5 text-orange-500" />
        </div>
        <p 
          class="text-3xl font-bold"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          32.5%
        </p>
        <div class="flex items-center mt-2 text-sm">
          <Icon icon="line-md:arrow-down" class="h-4 w-4 text-green-500" />
          <span class="text-green-500 font-medium ml-1">3%</span>
          <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="ml-1">vs last month</span>
        </div>
      </div>

      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <div class="flex items-center justify-between mb-2">
          <span 
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Avg. Session
          </span>
          <Icon icon="line-md:watch-loop" class="h-5 w-5 text-green-500" />
        </div>
        <p 
          class="text-3xl font-bold"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          4m 32s
        </p>
        <div class="flex items-center mt-2 text-sm">
          <Icon icon="line-md:arrow-up" class="h-4 w-4 text-green-500" />
          <span class="text-green-500 font-medium ml-1">15%</span>
          <span :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="ml-1">vs last month</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Traffic Sources -->
      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <h2 
          class="text-xl font-bold mb-4"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          Traffic Sources
        </h2>
        <Bar :data="trafficData" :options="barOptions" />
      </div>

      <!-- Device Usage -->
      <div 
        class="card shadow-lg border p-6"
        :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
      >
        <h2 
          class="text-xl font-bold mb-4"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          Device Usage
        </h2>
        <Doughnut :data="deviceData" :options="doughnutOptions" />
      </div>
    </div>

    <!-- Weekly Traffic -->
    <div 
      class="card shadow-lg border p-6"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <h2 
        class="text-xl font-bold mb-4"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        Weekly Traffic
      </h2>
      <Line :data="weeklyData" :options="lineOptions" />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { Bar, Doughnut, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const isDark = inject('isDark');

// Traffic Sources Data
const trafficData = {
  labels: ['Direct', 'Organic', 'Social', 'Referral', 'Email'],
  datasets: [
    {
      label: 'Visitors',
      data: [3200, 4800, 2100, 1500, 2800],
      backgroundColor: [
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#f59e0b',
        '#10b981',
      ],
    }
  ]
};

// Device Usage Data
const deviceData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [55, 35, 10],
      backgroundColor: ['#6366f1', '#ec4899', '#f59e0b'],
      borderColor: isDark.value ? '#1e293b' : '#ffffff',
      borderWidth: 3,
    }
  ]
};

// Weekly Traffic Data
const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Page Views',
      data: [4200, 5100, 4800, 6200, 5800, 3900, 3200],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'New Visitors',
      data: [1200, 1500, 1300, 1800, 1600, 1100, 900],
      borderColor: '#ec4899',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
      fill: true,
    }
  ]
};

// Chart Options
const barOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: isDark.value ? '#1e293b' : '#ffffff',
      titleColor: isDark.value ? '#ffffff' : '#000000',
      bodyColor: isDark.value ? '#ffffff' : '#000000',
      borderColor: isDark.value ? '#374151' : '#e5e7eb',
      borderWidth: 1,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
      },
      grid: {
        color: isDark.value ? '#374151' : '#e5e7eb',
      }
    },
    x: {
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
      },
      grid: {
        color: isDark.value ? '#374151' : '#e5e7eb',
      }
    }
  }
}));

const doughnutOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: isDark.value ? '#ffffff' : '#000000',
        padding: 15,
        font: {
          size: 13,
        }
      }
    },
    tooltip: {
      backgroundColor: isDark.value ? '#1e293b' : '#ffffff',
      titleColor: isDark.value ? '#ffffff' : '#000000',
      bodyColor: isDark.value ? '#ffffff' : '#000000',
      borderColor: isDark.value ? '#374151' : '#e5e7eb',
      borderWidth: 1,
    }
  },
  cutout: '65%',
}));

const lineOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: isDark.value ? '#ffffff' : '#000000',
        usePointStyle: true,
      }
    },
    tooltip: {
      backgroundColor: isDark.value ? '#1e293b' : '#ffffff',
      titleColor: isDark.value ? '#ffffff' : '#000000',
      bodyColor: isDark.value ? '#ffffff' : '#000000',
      borderColor: isDark.value ? '#374151' : '#e5e7eb',
      borderWidth: 1,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
      },
      grid: {
        color: isDark.value ? '#374151' : '#e5e7eb',
      }
    },
    x: {
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
      },
      grid: {
        color: isDark.value ? '#374151' : '#e5e7eb',
      }
    }
  }
}));
</script>