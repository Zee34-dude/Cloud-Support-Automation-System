<template>
    <!-- Header -->
    <header class="bg-white shadow-md  px-4 sm:px-6 py-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 lg:w-[350px]">
                <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden text-gray-600">
                    <div class="w-6 h-6"> <img :src="MenuIcon" alt=""></div>
                </button>
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    <slot name="header"></slot>
                </h1>
            </div>
            <div class="relative hidden sm:flex flex-1 justify-center">
                <div class=" pl-4 pr-4 py-2 bg-[#F5F5F5] rounded-lg flex items-center w-[70%] gap-2 ">
                    <SearchIcon class="w-5 h-5 text-gray-500" />
                    <!-- Search Input -->
                    <input type="text" placeholder="Search..." class="sm:w-[50%] outline-none">
                </div>
            </div>
            <div class="flex items-center space-x-2 sm:space-x-4">
                <!-- notification -->
                <div class="relative">
                    <img :src='BellIcon' alt="">
                    <span
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </div>
                <!-- profile -->
                <div class="relative">
                    <div class="flex items-center space-x-2 cursor-pointer"
                        @click="profileDropdownOpen = !profileDropdownOpen">
                        <img :src='Ellipse' alt="Jane Peters" class="w-8 h-8 rounded-full">
                        <span class="text-sm font-medium hidden sm:block">Jane Peters</span>
                        <img class="w-3 h-3" :src='dropDownButton' alt="">
                    </div>

                    <!-- Profile Dropdown -->
                    <div v-if="profileDropdownOpen"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                        @click.stop>
                        <div class="py-1">
                            <div class="px-4 py-2 border-b border-gray-100">
                                <p class="text-sm font-medium text-gray-900">Jane Peters</p>
                                <p class="text-xs text-gray-500">jane.peters@example.com</p>
                            </div>
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-2">
                                    <UserIcon class="w-4 h-4" />
                                    <span>Profile</span>
                                </div>
                            </a>
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-2">
                                    <SettingsIcon class="w-4 h-4" />
                                    <span>Settings</span>
                                </div>
                            </a>
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-2">
                                    <HelpIcon class="w-4 h-4" />
                                    <span>Help & Support</span>
                                </div>
                            </a>
                            <div class="border-t border-gray-100">
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <div class="flex items-center space-x-2">
                                        <LogoutIcon class="w-4 h-4" />
                                        <span>Sign out</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>
<script setup>
import SearchIcon from '@/assets/icons/SearchIcon.vue'
import BellIcon from '@/assets/svg-icons/iconamoon_notification-bold.svg'
import Ellipse from '@/assets/svg-icons/Ellipse 4.svg'
import { inject, ref, } from 'vue'
import MenuIcon from '@/assets/svg-icons/burger-menu-right-svgrepo-com.svg'
import dropDownButton from '@/assets/svg-icons/teenyicons_down-solid.svg'
const sidebarOpen = inject('sidebarOpen')
const profileDropdownOpen =ref(false)

const ChevronDownIcon = {
    template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>'
}



</script>