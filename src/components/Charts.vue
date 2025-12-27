<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Line Chart -->
    <div 
      class="card shadow-lg border p-6"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <h2 
        class="text-xl font-bold mb-4"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        Monthly Revenue
      </h2>
      <Line :data="lineChartData" :options="lineChartOptions" />
    </div>

    <!-- Doughnut Chart -->
    <div 
      class="card shadow-lg border p-6"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <h2 
        class="text-xl font-bold mb-4"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        Revenue Sources
      </h2>
      <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line, Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register all Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  isDark: {
    type: Boolean,
    default: true,
  },
});

// Line Chart Data
const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue ($)',
      data: [12000, 5000, 8000, 10000, 18000, 4000],
      borderColor: '#ec4899',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#ec4899',
      pointBorderColor: '#ec4899',
      pointRadius: 5,
      pointHoverRadius: 7,
    }
  ]
};

// Line Chart Options
const lineChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: props.isDark ? '#ffffff' : '#000000',
        usePointStyle: true,
      }
    },
    tooltip: {
      backgroundColor: props.isDark ? '#1e293b' : '#ffffff',
      titleColor: props.isDark ? '#ffffff' : '#000000',
      bodyColor: props.isDark ? '#ffffff' : '#000000',
      borderColor: props.isDark ? '#374151' : '#e5e7eb',
      borderWidth: 1,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: props.isDark ? '#9ca3af' : '#6b7280',
        callback: function(value) {
          return value.toLocaleString();
        }
      },
      grid: {
        color: props.isDark ? '#374151' : '#e5e7eb',
      }
    },
    x: {
      ticks: {
        color: props.isDark ? '#9ca3af' : '#6b7280',
      },
      grid: {
        color: props.isDark ? '#374151' : '#e5e7eb',
      }
    }
  }
}));

// Doughnut Chart Data
const doughnutChartData = {
  labels: ['Products', 'Services', 'Subscription', 'Consulting'],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: [
        '#6366f1', // Blue/Purple
        '#ec4899', // Pink
        '#eab308', // Yellow
        '#fb923c', // Orange
      ],
      borderColor: props.isDark ? '#1e293b' : '#ffffff',
      borderWidth: 3,
    }
  ]
};

// Doughnut Chart Options
const doughnutChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        color: props.isDark ? '#ffffff' : '#000000',
        usePointStyle: true,
        padding: 15,
        font: {
          size: 13,
        }
      }
    },
    tooltip: {
      backgroundColor: props.isDark ? '#1e293b' : '#ffffff',
      titleColor: props.isDark ? '#ffffff' : '#000000',
      bodyColor: props.isDark ? '#ffffff' : '#000000',
      borderColor: props.isDark ? '#374151' : '#e5e7eb',
      borderWidth: 1,
      callbacks: {
        label: function(context) {
          return context.label + ': ' + context.parsed + '%';
        }
      }
    }
  },
  cutout: '70%',
}));
</script>