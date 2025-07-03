<template>
    <!-- Header -->
    <header class="bg-white shadow-md  px-4 sm:px-6 py-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <button @click="sidebarOpen = true" class="lg:hidden text-gray-600">
                    <MenuIcon class="w-6 h-6" />
                </button>
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    <slot name="header"></slot>
                </h1>
            </div>
            <div class="relative hidden sm:flex flex-1 justify-center">
                <div class=" pl-4 pr-4 py-2 bg-[#F5F5F5] rounded-lg flex items-center w-[70%] gap-2 ">

                    <SearchIcon class="w-5 h-5  left-3 top-2" />
                    <input type="text" placeholder="Search..." class="sm:w-[50%] outline-none">
                </div>
            </div>
            <div class="flex items-center space-x-2 sm:space-x-4">
                <div class="relative">
                    <img :src='BellIcon' alt="">
                    <span
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </div>
                <div class="flex items-center space-x-2">
                    <img :src='Ellipse' alt="Jane Peters" class="w-8 h-8 rounded-full">
                    <span class="text-sm font-medium hidden sm:block">Jane Peters</span>
                    <ChevronDownIcon class="w-4 h-4 text-gray-500" />
                </div>
            </div>
        </div>
    </header>

</template>
<script setup>
import { ref } from 'vue';
import SearchIcon from '@/assets/icons/SearchIcon.vue'
import BellIcon from '@/assets/svg-icons/iconamoon_notification-bold.svg'
import Ellipse from '@/assets/svg-icons/Ellipse 4.svg'
defineProps({
    sidebarOpen: {
        type: Boolean,
        default: false
    }
})


const ChevronDownIcon = {
    template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>'
}
const MenuIcon = {
    template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>'
}



</script>