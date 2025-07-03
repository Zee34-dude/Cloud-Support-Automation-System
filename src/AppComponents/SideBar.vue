<template>
    <div class="flex">
        <!-- Mobile Overlay -->
        <div v-if="sidebarOpen" @click="sidebarOpen = false"
            class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"></div>

        <!-- Sidebar -->
        <div :class="[
            'w-64 bg-[#0F151F] text-white transition-transform duration-300 ease-in-out z-10',
            'lg:translate-x-0 lg:static lg:inset-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'fixed inset-y-0 left-0 lg:relative'
        ]">
            <div class="p-4">
                <div class="flex items-center justify-between">
                    <button @click="sidebarOpen = false" class="lg:hidden text-white">
                        <CloseIcon class="w-6 h-6" />
                    </button>
                </div>
            </div>
            <nav class="mt-8 p-2">
                <router-link v-for="item in sidebarItems" :key="item.name" :to="item.link"
                    class="" @click="handleActive(item)">
                    <div :class="['flex items-center px-4 py-3 text-sm  hover:bg-[#4B5054] gap-2 cursor-pointer rounded-lg',
                        item.active ? 'bg-[#4B5054]' : '']" @click="sidebarOpen = false">
                        <img :src="item.active ? item.activeIcon||item.icon : item.icon" alt="">
                        <span class="truncate">{{ item.name }}</span>
                    </div>
                </router-link>
            </nav>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import DashboardIcon from '../assets/svg-icons/material-symbols_dashboard-rounded (1).svg'
import IncidentIcon from '../assets/svg-icons/mingcute_performance-line.svg'
import ServiceIcon from '../assets/svg-icons/tdesign_chart-filled.svg'
import NotificationIcon from '../assets/svg-icons/mdi_notifications-active.svg'
import ServiceIConActive from '../assets/svg-icons/tdesign_chart_active.svg'

// Data
defineProps({
    sidebarOpen: {
        type: Boolean,
        default: false
    }
})
// Icons (using simple SVG components)

const CloseIcon = {
    template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
}

const sidebarItems = ref([
    { name: 'Support Dashboard', icon: DashboardIcon, active: true, link: '/' },
    { name: 'Incident/Fault Management', icon: IncidentIcon, active: false, link: '/fault-management' },
    { name: 'Service Request Automation', icon: ServiceIcon, activeIcon: ServiceIConActive, active: false, link: '/service-request' },
    { name: 'Monitoring and Alert', icon: ServiceIcon, activeIcon: ServiceIConActive, active: false, link: '/monitoring-and-alert' },
    { name: 'Analyst Desk', icon: ServiceIcon, activeIcon: ServiceIConActive, active: false, link: '/analyst-desk' },
    { name: 'Notifications', icon: NotificationIcon, active: false, link: '/notifications' }
])

const handleActive = (item) => {
   sidebarItems.value.forEach(i => {
        i.active = false;
    });
    item.active = true;
    // Optionally close sidebar on item click
  
}
</script>