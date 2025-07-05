<template>
    <div class="w-full ">
        <Heading>
            <template #header>Service Request and Automation</template>
        </Heading>

        <div class="min-h-screen  p-6 w-full">
            <div class="mx-auto w-full">

                <!-- Top Section: Provisioning Request + Workflow -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 w-full">

                    <!-- Provisioning Request -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center mb-6 gap-1">
                            <img :src="UserIcon" alt="" class="pt-1">
                            <h2 class="text-lg font-semibold text-gray-900">Provisioning Request</h2>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                                <select v-model="selectedServiceType"
                                    class="w-full px-3 py-2 border border-[#E5E5E5] outline-0  rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="vm-instance">VM Instance</option>
                                    <option value="storage">Storage</option>
                                    <option value="network">Virtual Network</option>
                                    <option value="database">Database</option>
                                </select>
                            </div>

                            <button @click="submitRequest" :disabled="isSubmitting"
                                class="w-full bg-[#D50036] hover:opacity-80 disabled:bg-[#D50036] text-white py-2 rounded-lg">
                                {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
                            </button>
                        </div>
                    </div>

                    <!-- Auto Approval Workflow Visualizer -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-6">Auto Approval Workflow Visualizer</h2>
                        <div class="">
                            <div v-for="(step, index) in workflowSteps" :key="index" class="flex items-center py-4 ">
                                <div :class="['w-6 h-6 rounded-full flex items-center justify-center mr-3 relative',!(index==workflowSteps.length-1)?'checkmark':'']">
                                    <img :src="checkMark" alt="">
                                </div>
                                <span :class="['text-sm', step.completed ? 'text-gray-900' : 'text-gray-500']">{{
                                    step.name
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Approval Notifications -->
                <div class="bg-white rounded-lg shadow">
                    <div class="p-6 border-b border-gray-200 flex items-center gap-1">
                       <img :src="CheckLine" alt="" class=" pt-1">
                        <h2 class="text-lg font-semibold text-gray-900">Approval Notifications</h2>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="notification in notifications" :key="notification.id"
                                    class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <img :src=BellNotification alt="">
                                            <span class="text-sm font-medium text-gray-900">{{ notification.desk
                                                }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="text-sm text-gray-700">{{ notification.serviceType }}</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right">
                                        <div v-if="notification.type === 'approval'" class="flex space-x-2">
                                            <button @click="handleApproval(notification.id, 'accept')"
                                                class="bg-[#00B454] hover:bg-green-600 text-white px-3 py-1 rounded text-sm">Accept</button>
                                            <button @click="handleApproval(notification.id, 'reject')"
                                                class="bg-[#E50303] hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
                                        </div>
                                        <div v-else class="flex ">
                                            <button @click="viewLog(notification.id)"
                                                class="text-[#D50036] hover:text-[#D50036] text-sm">View log</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Heading from '@/AppComponents/Heading.vue'
import checkMark from '@/assets/svg-icons/fluent-mdl2_check-mark.svg'
import BellNotification from '@/assets/svg-icons/mdi_bell-notification.svg'
import UserIcon from '@/assets/svg-icons/fluent-mdl2_provisioning-package.svg'
import CheckLine from '@/assets/svg-icons/ri_chat-check-line.svg'

// SVG Icons as inline components

const selectedServiceType = ref('vm-instance')
const isSubmitting = ref(false)

const workflowSteps = ref([
    { name: 'Request Submitted', completed: true },
    { name: 'Request Reviewed', completed: true },
    { name: 'Approval Decision', completed: true },
    { name: 'Automatically Approved', completed: true }
])

const notifications = ref([
    { id: 1, desk: 'Desk A', serviceType: 'Storage Quota Increase', type: 'approval' },
    { id: 2, desk: 'Desk A', serviceType: 'Storage Quota Increase', type: 'approval' },
    { id: 3, desk: 'Desk A', serviceType: 'Storage Quota Increase', type: 'approval' },
    { id: 4, desk: 'Desk B', serviceType: 'Virtual Network', type: 'log' },
    { id: 5, desk: 'Desk B', serviceType: 'Virtual Network', type: 'log' }
])

const submitRequest = async () => {
    isSubmitting.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))

        workflowSteps.value.forEach(step => step.completed = false)

        setTimeout(() => { workflowSteps.value[0].completed = true }, 500)
        setTimeout(() => { workflowSteps.value[1].completed = true }, 1000)
        setTimeout(() => { workflowSteps.value[2].completed = true }, 1500)
        setTimeout(() => { workflowSteps.value[3].completed = true }, 2000)

        console.log('Request submitted:', selectedServiceType.value)
    } catch (error) {
        console.error('Error submitting request:', error)
    } finally {
        isSubmitting.value = false
    }
}

const handleApproval = (notificationId, action) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
        console.log(`${action.toUpperCase()} notification:`, notification)
        notifications.value = notifications.value.filter(n => n.id !== notificationId)
        alert(`Request ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`)
    }
}

const viewLog = (notificationId) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
        console.log('Viewing log for:', notification)
        alert(`Opening log for ${notification.serviceType} at ${notification.desk}`)
    }
}

// Periodically add new notifications (demo)
// setInterval(() => {
//     const desks = ['Desk A', 'Desk B', 'Desk C']
//     const services = ['Storage Quota Increase', 'Virtual Network', 'VM Instance', 'Database Access']
//     const types = ['approval', 'log']

//     notifications.value.push({
//         id: Date.now(),
//         desk: desks[Math.floor(Math.random() * desks.length)],
//         serviceType: services[Math.floor(Math.random() * services.length)],
//         type: types[Math.floor(Math.random() * types.length)]
//     })
// }, 10000)
</script>
