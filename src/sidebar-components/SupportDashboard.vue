<template>
    <div class="w-full ">
        <Heading>
            <template #header>
                Support Dashboard
            </template>
        </Heading>
        <!-- Main Content -->
        <div class="flex-1 flex flex-col min-w-0">

            <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <!-- Main Dashboard Content -->
                <div class="flex-1 p-4 sm:p-6">
                    <!-- Mobile Search (visible on small screens) -->
                    <div class="mb-6 sm:hidden">
                        <div class="relative">
                            <input type="text" placeholder="Search..."
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SearchIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </div>

                    <!-- Status Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 bg-white ">
                        <router-link v-for="(card, i) in statusCards" :to="`/ticket-overview/${card.id}`" :key="card.title" :class="[
                            '   p-4 sm:p-6 block',
                            { 'div-border': i !== 2 }
                        ]">
                            <div class="flex items-center justify-between mb-4">
                                <span :class="['px-3 py-1 rounded-sm text-sm font-medium text-white', card.badgeClass]">
                                    {{ card.title }}
                                </span>
                            </div>
                            <div class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{{ card.count }} Open</div>
                            <div class="text-sm text-gray-600">Tickets</div>
                        </router-link>
                    </div>

                    <!-- Chart Section with Chart.js -->
                    <div class="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Tickets by Status and Desks</h3>
                        <div class="relative h-64 sm:h-80">
                            <canvas ref="chartCanvas"></canvas>
                        </div>
                    </div>

                    <!-- Bottom Panels -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-0">
                        <div v-for="panel in bottomPanels" :key="panel.title"
                            class="bg-white rounded-lg shadow p-4 sm:p-4">
                            <h4 class="font-semibold text-gray-900 mb-3">{{ panel.title }}</h4>
                            <div class="space-y-2">
                                <div v-for="item in panel.items" :key="item.label" class="flex justify-between text-sm">
                                    <span class="text-gray-600 truncate mr-2">{{ item.label }}</span>
                                    <span class="font-medium flex-shrink-0">{{ item.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div :class="[
                    'w-full lg:w-80 bg-[#F4F0F0] p-4 sm:p-6 border-t lg:border-t-0 ',
                    showRightSidebar ? 'block' : 'hidden lg:block'
                ]">
                    <!-- Toggle button for mobile -->
                    <div class="flex items-center justify-between mb-4 lg:hidden">
                        <h3 class="font-semibold text-gray-900">System Status</h3>
                        <button @click="showRightSidebar = false" class="text-gray-500">
                            <ChevronUpIcon class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- System Health -->
                    <div class="mb-6 bg-white p-8 rounded-lg pl-4">
                        <div class="flex items-center mb-3 gap-2">
                            <img :src='HealthIcon' alt="">
                            <span class="font-medium text-gray-900">System Health</span>
                        </div>
                        <p class="text-sm text-gray-600">All Systems are operational</p>
                    </div>

                    <!-- Alerts -->
                    <div class="space-y-4 ">
                        <div v-for="alert in alerts" :key="alert.id" class=" bg-white p-8 pl-4 rounded-lg">
                            <div class="flex items-center mb-1 gap-2">
                                <img :src='alert.icon' alt="">
                                <span class="font-medium text-sm">Alert</span>
                            </div>
                            <p class="text-sm text-gray-600">{{ alert.message }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile bottom button to show right sidebar -->
            <div class="lg:hidden bg-white border-t p-4">
                <button @click="showRightSidebar = !showRightSidebar"
                    class="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                    <span class="text-sm font-medium">System Status & Alerts</span>
                    <ChevronUpIcon :class="['w-4 h-4 transition-transform', showRightSidebar ? 'rotate-180' : '']" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import AlertCircleIcon from '@/assets/svg-icons/mingcute_alert-fill (1).svg'
import AlertYellowIcon from '@/assets/svg-icons/mingcute_alert-fill.svg'
import AlertTriangleIcon from '@/assets/svg-icons/fluent-mdl2_alert-solid.svg'
import Heading from '@/AppComponents/Heading.vue'
import HealthIcon from '@/assets/svg-icons/fluent-mdl2_health-solid.svg'


// Register Chart.js components
Chart.register(...registerables)

// Responsive state
const showRightSidebar = ref(false)



const ChevronUpIcon = {
    template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>'
}



// Refs
const chartCanvas = ref(null)
let chartInstance = null



const statusCards = ref([
    { title: 'Subscription', count: 32, badgeClass: 'bg-[#00B454]', id:1 },
    { title: 'Billing', count: 32, badgeClass: 'bg-[#F39D1C]', id:2 },
    { title: 'Fault', count: 32, badgeClass: 'bg-[#E50303]', id:3 }
])

const bottomPanels = ref([
    {
        title: 'AI Suggestions Resolution',
        items: [
            { label: 'Reboot Service', value: '' },
            { label: 'On Subscription', value: '123' }
        ]
    },
    {
        title: 'AI Suggestions Resolution',
        items: [
            { label: 'Reboot Service', value: '' },
            { label: 'On Subscription', value: '123' }
        ]
    },
    {
        title: 'RCA Summary',
        items: [
            { label: 'Root cause identified as', value: '' },
            { label: 'Misconfigured billing process', value: '' },
            { label: 'Alternative resolved', value: '' }
        ]
    }
])

const alerts = ref([
    {
        id: 1,
        message: 'High CPU usage on server 1',
        icon: AlertTriangleIcon,
        iconClass: 'text-red-500',
        borderClass: 'border-red-500'
    },
    {
        id: 2,
        message: 'Potential issue detected in Desk A',
        icon: AlertYellowIcon,
        iconClass: 'text-green-500',
        borderClass: 'border-green-500'
    },
    {
        id: 3,
        message: 'Desk B needs attention immediately',
        icon: AlertCircleIcon,
        iconClass: 'text-blue-500',
        borderClass: 'border-blue-500'
    },

])

// Chart initialization
const initChart = () => {
    const ctx = chartCanvas.value.getContext('2d')

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Desk A', 'Desk B'],
            datasets: [
                {
                    label: 'Open',
                    data: [10, 12],
                    backgroundColor: '#E50303',
                    borderWidth: 1,
                    barThickness: 40
                },
                {
                    label: 'closed',
                    data: [15, 16],
                    backgroundColor: '#C4C4C4',
                    borderWidth: 1,
                    barThickness: 40
                },
                {
                    label: 'Resolved',
                    data: [20, 16],
                    backgroundColor: '#00B454',
                    borderWidth: 1,
                    barThickness: 40
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20,
                    ticks: {
                        stepSize: 5,
                        color: '#6b7280'
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                x: {
                    ticks: {
                        color: '#6b7280'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 0
                }
            }
        }
    })
}

// Lifecycle hooks
onMounted(() => {
    initChart()
})

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.destroy()
    }
})
</script>