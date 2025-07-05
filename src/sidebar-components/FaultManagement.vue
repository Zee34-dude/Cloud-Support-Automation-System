<template>
  <div>
    <Heading>
      <template #header>
        Incident and Fault Management
      </template>
    </Heading>
    <div class=" p-6 w-full">
      <div class="mx-auto space-y-6">

        <!-- Header Section with Ticket Categorization and Self Healing Scripts -->
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

          <!-- Ticket Categorization -->
          <div class="bg-white rounded-lg p-6 w-[30%]">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Ticket Categorization</h3>
            <div class="space-y-3">
              <label class="flex items-center cursor-pointer">
                <input type="radio" v-model="ticketCategory" value="minor" class="sr-only" />
                <div :class="[
                  'w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center',
                  ticketCategory === 'minor' ? 'border-[#F39D1c] bg-[#F39D1c]' : 'border-gray-300'
                ]">
                  <div v-if="ticketCategory === 'minor'" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span class="text-gray-700">Minor Fault</span>
              </label>

              <label class="flex items-center cursor-pointer">
                <input type="radio" v-model="ticketCategory" value="major" class="sr-only" />
                <div :class="[
                  'w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center',
                  ticketCategory === 'major' ? 'border-[#E50303] bg-[#E50303]' : 'border-gray-300'
                ]">
                  <div v-if="ticketCategory === 'major'" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span class="text-gray-700">Major Fault</span>
              </label>
            </div>
          </div>

          <!-- Self Healing Scripts -->
          <div class="bg-white rounded-lg p-6 lg:w-80">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Self Healing Scripts</h3>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">Enable Self Healing</span>
              <button @click="toggleSelfHealing" :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                selfHealingEnabled ? 'bg-green-500' : 'bg-gray-200'
              ]">
                <span :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  selfHealingEnabled ? 'translate-x-6' : 'translate-x-1'
                ]"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Root Cause Analysis Section -->
        <div class="bg-white rounded-lg border-2 border-blue-300 p-6 w-full ">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="bg-[#00B454] text-white p-4 rounded-lg  lg:w-[35%]">
              <h4 class="font-semibold mb-2">Root Cause Analysis</h4>
              <p class="text-sm leading-relaxed ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
            </div>
            <button @click="viewRollbackHistory"
              class="bg-[#D50036] hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-opacity ">
              View Rollback History
            </button>
          </div>
        </div>

        <!-- Service Interruption Form -->
        <div class="bg-white rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Service Interruption</h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Service Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select v-model="formData.serviceType"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Service Type</option>
                <option value="web">Web Service</option>
                <option value="database">Database</option>
                <option value="api">API Service</option>
                <option value="network">Network</option>
              </select>
            </div>

            <!-- Fault Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fault Type</label>
              <select v-model="formData.faultType"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Fault Type</option>
                <option value="hardware">Hardware Failure</option>
                <option value="software">Software Bug</option>
                <option value="network">Network Issue</option>
                <option value="performance">Performance Degradation</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Priority -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select v-model="formData.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="formData.description" rows="4"
              placeholder="Enter detailed description of the service interruption..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"></textarea>
          </div>

          <!-- Submit Button -->
          <div class="mt-6 flex justify-end">
            <button @click="submitForm"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Heading from '@/AppComponents/Heading.vue'


// Reactive state
const ticketCategory = ref('minor')
const selfHealingEnabled = ref(true)

const formData = reactive({
  serviceType: '',
  faultType: '',
  priority: '',
  description: ''
})

// Methods
const toggleSelfHealing = () => {
  selfHealingEnabled.value = !selfHealingEnabled.value
  console.log('Self healing toggled:', selfHealingEnabled.value)
}

const viewRollbackHistory = () => {
  console.log('Viewing rollback history...')
  // Here you would typically open a modal or navigate to rollback history page
  alert('Opening rollback history...')
}

const submitForm = () => {
  // Validate form
  if (!formData.serviceType || !formData.faultType || !formData.priority) {
    alert('Please fill in all required fields')
    return
  }

  // Prepare submission data
  const submissionData = {
    ticketCategory: ticketCategory.value,
    selfHealingEnabled: selfHealingEnabled.value,
    ...formData
  }

  console.log('Form submitted:', submissionData)
  alert('Service interruption report submitted successfully!')

  // Reset form
  resetForm()
}

const resetForm = () => {
  formData.serviceType = ''
  formData.faultType = ''
  formData.priority = ''
  formData.description = ''
  ticketCategory.value = 'minor'
  selfHealingEnabled.value = true
}
</script>