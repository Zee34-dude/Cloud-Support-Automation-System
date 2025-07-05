<template>
    <div class="w-full">
        <Heading>
            <template #header>Analyst desk Management</template>
        </Heading>
        <div class="min-h-screen  p-4 lg:p-6">
            <div class="bg-white p-4">
                <!-- Main Grid Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <!-- Left Column - Team Members -->
                    <div class="lg:col-span-1">
                        <div class="space-y-4">
                            <div v-for="member in teamMembers" :key="member.id"
                                class="bg-white rounded-lg border border-[#E5E5E5] p-6">
                                <div class="flex items-center space-x-4 mb-4">
                                    <img :src="image" :alt="member.name"
                                        class="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h3 class="font-semibold text-gray-900">{{ member.name }}</h3>
                                        <p class="text-sm text-gray-600">{{ member.role }}</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-sm text-gray-600 mb-1">Resolved</p>
                                        <p class="text-2xl font-bold text-gray-900">{{ member.resolved }}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600 mb-1">Time Per Ticket</p>
                                        <p class="text-2xl font-bold text-gray-900">{{ member.timePerTicket }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Activity and Stats -->
                    <div class="lg:col-span-2 space-y-6">

                        <!-- Desk Tabs -->
                        <div class="flex justify-end ">
                            <button v-for="(desk,i) in desks" :key="desk.id" @click="activeDesk = desk.id" :class="[
                                ' py-1 rounded-[4px] font-medium text-sm transition-colors border border-[#E5E5E5] w-[82px] ',
                                activeDesk === desk.id
                                    ? 'bg-[#D50036] text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50',
                                    i==0?'rounded-r-none border-r-0':'rounded-l-none'
                            ]">
                                {{ desk.name }}
                            </button>
                        </div>

                        <!-- Activity Log -->
                        <div class="bg-white rounded-lg shadow">
                            <div class="p-6 border-b border-gray-200">
                                <h2 class="text-lg font-semibold text-gray-900">Activity Log</h2>
                            </div>

                            <div class="p-6">
                                <div class="space-y-3 max-h-80 overflow-y-auto">
                                    <div v-for="activity in activityLog" :key="activity.id"
                                        class="flex items-start space-x-3 text-sm">
                                        <span class="text-gray-500 font-medium min-w-0 flex-shrink-0">
                                            {{ activity.time }}
                                        </span>
                                        <span class="text-gray-700 flex-1">
                                            {{ activity.description }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Resolved vs Open Tickets -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-semibold text-gray-900 mb-4">Resolved vs Open Tickets</h2>

                            <!-- Progress Bar -->
                            <div class="relative h-8 bg-gray-200 rounded-lg overflow-hidden mb-4">
                                <div class="absolute left-0 top-0 h-full bg-[#00B454] transition-all duration-300"
                                    :style="{ width: `${(resolvedTickets / totalTickets) * 100}%` }">
                                </div>
                                <div class="absolute right-0 top-0 h-full bg-[#E50303] transition-all duration-300"
                                    :style="{ width: `${(openTickets / totalTickets) * 100}%` }">
                                </div>
                            </div>

                            <!-- Legend -->
                            <div
                                class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-green-500 rounded"></div>
                                    <span class="text-sm font-medium text-gray-700">
                                        {{ resolvedTickets }} Resolved
                                    </span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-red-500 rounded"></div>
                                    <span class="text-sm font-medium text-gray-700">
                                        {{ openTickets }} Open
                                    </span>
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
import { ref, computed } from 'vue'
import Heading from '@/AppComponents/Heading.vue'
import image from '@/assets/svg-icons/Ellipse 9.svg'

// Active desk state
const activeDesk = ref('desk-b')

// Desk data
const desks = ref([
    { id: 'desk-a', name: 'Desk A' },
    { id: 'desk-b', name: 'Desk B' }
])

// Team members data
const teamMembers = ref([
    {
        id: 1,
        name: 'Similoluwa Adejoke',
        role: 'Analyst',
        resolved: 45,
        timePerTicket: '1h',
        avatar: '/placeholder.svg?height=48&width=48'
    },
    {
        id: 2,
        name: 'Peace Jeremiah',
        role: 'Analyst',
        resolved: 43,
        timePerTicket: '1.30h',
        avatar: '/placeholder.svg?height=48&width=48'
    },
    {
        id: 3,
        name: 'Jeremiah James',
        role: 'Analyst',
        resolved: 20,
        timePerTicket: '1.20h',
        avatar: '/placeholder.svg?height=48&width=48'
    },
    {
        id: 4,
        name: 'Prince Bright',
        role: 'Analyst',
        resolved: 54,
        timePerTicket: '1h',
        avatar: '/placeholder.svg?height=48&width=48'
    }
])

// Activity log data
const activityLog = ref([
    {
        id: 1,
        time: '11:30 AM',
        description: 'Similoluwa Adejoke has resolved the ticket'
    },
    {
        id: 2,
        time: '11:30 AM',
        description: 'Similoluwa Adejoke has resolved the ticket'
    },
    {
        id: 3,
        time: '11:30 AM',
        description: 'Peace Jeremiah has resolved the ticket'
    },
    {
        id: 4,
        time: '11:30 AM',
        description: 'Jeremiah James commented on a ticket'
    },
    {
        id: 5,
        time: '11:30 AM',
        description: 'Prince Bright has resolved the ticket'
    },
    {
        id: 6,
        time: '11:30 AM',
        description: 'Similoluwa Adejoke has resolved the ticket'
    },
    {
        id: 7,
        time: '11:30 AM',
        description: 'Prince Bright has resolved the ticket'
    },
    {
        id: 8,
        time: '11:30 AM',
        description: 'Jeremiah James has resolved the ticket'
    },
    {
        id: 9,
        time: '11:30 AM',
        description: 'Similoluwa Adejoke has resolved the ticket'
    }
])

// Ticket statistics
const resolvedTickets = ref(108)
const openTickets = ref(38)

const totalTickets = computed(() => resolvedTickets.value + openTickets.value)
</script>