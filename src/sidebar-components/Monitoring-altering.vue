<template>
    <div class="w-full ">
        <Heading>
            <template #header>Monitoring and alerting</template>
        </Heading>
        <div class="flex flex-col lg:flex-row ">
            <!-- Filter Pane Sidebar -->
            <div class="w-full lg:w-70 p-4 lg:p-6 h-[700px]">
                <div class="w-full bg-white shadow-lg p-4 lg:p-6 rounded-2xl h-full">
                    <h2 class="text-lg font-semibold text-gray-900 mb-6">Filter Pane</h2>

                    <!-- Cloud Provider Filter -->
                    <div class="mb-6">
                        <h3 class="text-sm font-medium text-gray-700 mb-3">Cloud Provider</h3>
                        <div class="space-y-2">
                            <label v-for="provider in cloudProviders" :key="provider.id"
                                class="flex items-center cursor-pointer">
                                <input type="checkbox"
                                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span class="ml-2 text-sm text-gray-700">{{ provider.name }}</span>
                            </label>
                        </div>
                    </div>


                    <!-- Severity Filter -->
                    <div class="mb-6">
                        <h3 class="text-sm font-medium text-gray-700 mb-3">Severity</h3>
                        <div class="space-y-2">
                            <label v-for="severity in severityLevels" :key="severity.id"
                                class="flex items-center cursor-pointer">
                                <input type="checkbox" class="rounded border-gray-300 bg-white focus:ring-blue-500"
                                    :class="severity.checkboxClass" />
                                <span class="ml-2 text-sm text-gray-700">{{ severity.name }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Desk Filter -->
                    <div class="mb-6">
                        <h3 class="text-sm font-medium text-gray-700 mb-3">Desk</h3>
                        <div class="space-y-2">
                            <label v-for="desk in desks" :key="desk.id" class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="desk.selected" @change="applyFilters"
                                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span class="ml-2 text-sm text-gray-700">{{ desk.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1 p-4 lg:p-6 overflow-y-auto">
                <!-- Predictive Performance Graphs -->
                <div class="mb-8 bg-white p-4 rounded-2xl">
                    <h2 class="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Predictive Performance Graphs</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        <!-- CPU Utilization Rate -->
                        <div class="rounded-b-lg border border-[#E5E5E5] p-4">
                            <h3 class="text-sm font-medium text-gray-700 mb-4">CPU Utilization Rate</h3>
                            <div class="h-32">
                                <LineChart :chartData="chartData" :chartOptions="ChartOptions" :tension="0.4" color="#ef4444" />
                            </div>
                        </div>

                        <!-- Disk Usage -->
                        <div class="rounded-lg p-4 border border-[#E5E5E5]">
                            <h3 class="text-sm font-medium text-gray-700 mb-4">Disk Usage</h3>
                            <div class="h-32">
                                <LineChart :chartData="chartData" :chartOptions="ChartOptions" :tension="0.4" color="#ef4444" />
                            </div>
                        </div>

                        <!-- Network Latency -->
                        <div class="rounded-lg p-4 border border-[#E5E5E5] md:col-span-2 lg:col-span-1">
                            <h3 class="text-sm font-medium text-gray-700 mb-4">Network Latency</h3>
                            <div class="h-32">
                                <LineChart :chartData="chartData" :chartOptions="ChartOptions" :tension="0.4" color="#F39D1C" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Alert Feed -->
                <div class="">
                    <div class="p-4 lg:p-6 border-b border-gray-200">
                        <h2 class="text-lg lg:text-xl font-semibold text-gray-900">Alert Feed</h2>
                    </div>
                    <div class="">
                        <div v-for="alert in alerts" :key="alert.id"
                            class="p-2 bg-white hover:bg-gray-50 transition-colors mb-4">
                            <div
                                class="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                                <div class="flex items-start space-x-3">
                                    <!-- Severity Indicator -->
                                    <div :class="[
                                        'w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
                                        getSeverityColor(alert.severity)
                                    ]">
                                        {{ alert.severity.charAt(0).toUpperCase() }}
                                    </div>

                                    <!-- Alert Content -->
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 break-words">{{ alert.title }}</p>
                                        <div
                                            class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                                            <span class="text-sm text-gray-600">{{ alert.provider }}</span>
                                            <span class="text-sm text-gray-600">{{ alert.desk }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Timestamp -->
                                <div class="text-left sm:text-right flex-shrink-0 ml-11 sm:ml-0">
                                    <span class="text-sm text-gray-500">{{ alert.timestamp }}</span>
                                    <div class="text-sm text-gray-600 mt-1">{{ alert.desk }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import Heading from '@/AppComponents/Heading.vue'
import LineChart from '@/ChartComponents/LineChart.vue'

// Register Chart.js components
Chart.register(...registerables)
const chartData = ref([
    { x: 0, y: 10 },
    { x: 5, y: 20 },
    { x: 10, y: 39 },
    { x: 15, y: 25 },
    { x: 20, y: 40 },
    { x: 25, y: 35 },
    { x: 30, y: 50 }
])
// Chart refs




const ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            type: 'linear',
            title: {
                display: true,
                text: 'Time (seconds)',
                color: '#000000',
                font: { size: 14, weight: 'bold' }
            },
            grid: {
                display: false
            }
        },
        y: {
            display: true,
            grid: {
                display: false
            }
        }
    },
    elements: {
        point: {
            radius: 0
        }
    },
}

const cloudProviders = ref([
    { id: 1, name: 'AWS', selected: true },
    { id: 2, name: 'Azure', selected: false },
    { id: 3, name: 'Google Cloud', selected: false }
])

const severityLevels = ref([
    { id: 1, name: 'Critical', selected: true, checkboxClass: 'accent-[#E50303]' },
    { id: 2, name: 'High', selected: true, checkboxClass: 'accent-[#F39D1C]' },
    { id: 3, name: 'Medium', selected: true, checkboxClass: 'accent-[#4B5054]' },
    { id: 4, name: 'Low', selected: true, checkboxClass: 'accent-[#00B454]' }
])

const desks = ref([
    { id: 1, name: 'Desk A', selected: false },
    { id: 2, name: 'Desk B', selected: false }
])

// Alert data
const alerts = ref([
    {
        id: 1,
        title: 'Instance Unreachable for 10 minutes',
        provider: 'AWS',
        desk: 'Desk A',
        severity: 'low',
        timestamp: '24 Minutes Ago'
    },
    {
        id: 2,
        title: 'High Memory Usage Detected on Instance V-m - 01',
        provider: 'Azure',
        desk: 'Desk A',
        severity: 'high',
        timestamp: '1 Hour Ago'
    },
    {
        id: 3,
        title: 'I/O Operation rate is below balance',
        provider: 'Google Cloud',
        desk: 'Desk B',
        severity: 'medium',
        timestamp: '3 hours ago'
    },
    {
        id: 4,
        title: 'Instance Unreachable for 10 minutes',
        provider: 'AWS',
        desk: 'Desk B',
        severity: 'high',
        timestamp: '24 Minutes Ago'
    },
    {
        id: 5,
        title: 'Instance Unreachable for 10 minutes',
        provider: 'AWS',
        desk: 'Desk A',
        severity: 'critical',
        timestamp: '24 Minutes Ago'
    }
])

// Methods
const getSeverityColor = (severity) => {
    const colors = {
        critical: 'bg-[#E50303]',
        high: 'bg-[#F39D1C]',
        medium: 'bg-[#4B5054]',
        low: 'bg-[#00B454]'
    }
    return colors[severity] || 'bg-gray-500'
}
</script>