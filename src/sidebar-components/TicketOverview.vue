<template>
    <div class="w-full">
        <Heading>
            <template #header>Support Dashboard</template>
        </Heading>

        <div class="p-2 w-full">
            <div class="mb-2 flex justify-between items-center">
                <h1 class="text-2xl font-bold"></h1>
                <div class="relative">
                    <button @click="showTimeDropdown = !showTimeDropdown"
                        class="w-60 px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between">
                        {{ selectedTimeRange }}
                        <img class="w-3 h-3" :src="dropDownButton" alt="">
                    </button>
                    <div v-if="showTimeDropdown"
                        class="absolute top-full right-0 w-60 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-y-auto h-[300px]">
                        <button v-for="option in timeRangeOptions" :key="option" @click="selectTimeRange(option)"
                            class="w-full px-3  py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md">
                            {{ option }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Calendar Modal -->
            <div v-if="showCalendar" @click="showCalendar = false"
                class="fixed inset-0 bg-[hsla(0,0%,0%,1)] bg-opacity-50 flex items-center justify-center z-50 ">
                <div class="datepicker-container">

                    <VueDatePicker v-model="selectedRange" :multi-calendars="2" :enable-time-picker="false"
                        :inline="true" :auto-apply="false" :month-change-on-scroll="false" :range="true"
                        :partial-range="false" :preview-format="'dd/MM/yyyy'" class="custom-range-datepicker"
                        @range-start="onRangeStart" @range-end="onRangeEnd" />

                    <div class="action-buttons" v-if="selectedRange && selectedRange.length === 2">
                        <button @click="clearSelection" class="clear-btn">
                            <XIcon class="w-4 h-4" />
                            Clear
                        </button>
                        <button @click="applySelection" class="apply-btn">
                            <CheckIcon class="w-4 h-4" />
                            Apply Selection
                        </button>
                    </div>

                    <div class="selection-prompt" v-else>
                        <p class="prompt-text">Select your start and end dates to continue</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 ">

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Ticket Overview -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-semibold mb-4">Ticket Overview</h2>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div v-for="(ticket, index) in ticketData" :key="index" class="border border-[#E5E5E5] rounded-lg p-4 px-6">
                                    <div class="flex items-center gap-2 mb-2">
                                        <img :src="ticket.img" alt="">
                                        <span class="font-[600]">{{ ticket.type }}</span>
                                    </div>
                                    <div class="text-3xl font-bold mb-2">{{ ticket.total }}</div>
                                    <div class="space-y-1 text-sm">
                                        <div class="flex justify-between">
                                            <span>Open</span>
                                            <span>{{ ticket.open }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Closed</span>
                                            <span>{{ ticket.closed }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Resolved</span>
                                            <span>{{ ticket.resolved }}</span>
                                        </div>
                                    </div>
                                    <div class="text-xs text-gray-500 italic text-center mt-2">Updated {{ ticket.updated }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- System Health -->
                    <div>
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-semibold mb-4">System Health</h2>
                            <div class="grid grid-cols-2 gap-4">
                                <div v-for="(item, index) in systemHealth.slice(0, 3)" :key="index"
                                    class="flex flex-col items-center">
                                    <div class="relative w-16 h-16">
                                        <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4"
                                                fill="none" class="text-gray-200" />
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4"
                                                fill="none" :stroke-dasharray="2 * Math.PI * 28"
                                                :stroke-dashoffset="2 * Math.PI * 28 * (1 - item.value / 100)"
                                                :class="item.color" stroke-linecap="round" />
                                        </svg>
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <span class="text-sm font-semibold">{{ item.value }}%</span>
                                        </div>
                                    </div>
                                    <span class="text-sm mt-2">{{ item.name }}</span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <div class="w-16 h-16 flex items-center justify-center">
                                        <svg width="64" height="32" viewBox="0 0 64 32">
                                            <polyline points="0,20 8,18 16,22 24,16 32,20 40,14 48,18 56,12 64,16"
                                                fill="none" stroke="#ef4444" stroke-width="2" />
                                        </svg>
                                    </div>
                                    <span class="text-sm mt-2">Network</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <!-- Incident Trends -->
                    <div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <h2 class="text-lg font-semibold mb-4">Incident Trends</h2>
                            <div class="">
                                <div class="grid grid-cols-8 gap-1 text-xs">
                                    <div></div>
                                    <div v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day"
                                        class="text-center font-medium">
                                        {{ day }}
                                    </div>
                                </div>
                                <div v-for="(trend, index) in incidentTrends" :key="index"
                                    class="grid grid-cols-8 gap-1 pb-2">
                                    <div class="text-xs font-medium">{{ trend.day }}</div>
                                    <div v-for="(value, i) in trend.data" :key="i" class="w-[35px] h-[18px] rounded"
                                        :class="getIntensityColor(value)"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Ticket Summary by Desk -->
                    <div class="w-full">
                        <div class="bg-white rounded-lg shadow p-4 w-full">
                            <h2 class="text-lg font-semibold mb-4">Ticket Summary by Desk</h2>
                            <div class="flex flex-col gap-2 w-full">
                                <div class="border border-[#E5E5E5] p-1 rounded-sm flex">
                                    <div class="w-[50%]">
                                        <div class="text-sm font-medium mb-1">Desk A</div>
                                        <div class="text-xs text-gray-500 ">Open</div>
                                    </div>
                                    <div class="w-50 h-18">
                                        <LineChart :chartData='chartData' :tension="0" color="#ef4444" />
                                    </div>
                                </div>
                                <div class="border border-[#E5E5E5] p-1 rounded-sm flex  ">
                                    <div class="w-[50%]">
                                        <div class="text-sm font-medium mb-1">Desk B</div>
                                        <div class="text-xs text-gray-500 ">Open</div>
                                    </div>
                                    <div class="w-50 h-18">
                                        <LineChart :chartData='chartData' :tension="0" color="#ef4444" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--AI suggestions-->
                    <div>
                        <div class="bg-white rounded-lg  shadow pt-4">
                            <h2 class="text-lg font-semibold mb-4 px-8">AI Suggestions</h2>
                            <div class="flex flex-col gap-4">
                                <div v-for="(suggestion, index) in aiSuggestions" :key="index"
                                    :class="['flex items-center justify-between border border-b-[#E5E5E5] border-transparent pb-4', index === aiSuggestions.length - 1 ? 'border-b-0 ' : '']">
                                    <div class="flex items-center pl-4 gap-2">
                                        <img src="/src/assets/png-icons/Group.png" alt="">
                                        <span class="text-sm">{{ suggestion.text }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="px-2 py-1 text-xs rounded text-white"
                                            :class="suggestion.status === 'new' ? 'bg-[#E50303] ' : 'bg-[#00B454] '">
                                            {{ suggestion.status === 'new' ? 'New' : 'Applied' }}
                                        </span>
                                       <img  class="ml-8 mr-4" :src="RightIcon" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alerts -->
                    <div>
                        <div class="bg-white rounded-lg shadow p-6 ">
                            <h2 class="text-lg font-semibold mb-4">Alerts</h2>
                            <div class="space-y-3 relative">
                                <div v-for="(alert, index) in alerts" :key="index"
                                    class="flex items-center justify-between ">
                                    <div class=" grid grid-cols-2">
                                        <span class="px-4 py-1 text-xs rounded w-fit "
                                            :class="alert.level === 'High' ? 'bg-[#E50303] text-white' : 'bg-[#F39D1C] text-white'">
                                            {{ alert.level }}
                                        </span>
                                        <span class="text-sm ">{{ alert.message }}</span>
                                    </div>
                                    <span class="text-xs text-gray-500">{{ alert.time }}</span>
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
import { ref,} from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import '../assets/base.css'
import Heading from '@/AppComponents/Heading.vue'
import RightIcon from '@/assets/svg-icons/lsicon_right-filled.svg'
import LineChart from '@/ChartComponents/LineChart.vue'
import dropDownButton from '@/assets/svg-icons/teenyicons_down-solid.svg'





const selectedDate = ref('last')
const selectedTimeRange = ref('Last 7 Days')
const showTimeDropdown = ref(false)
const showCalendar = ref(false)



const timeRangeOptions = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'Last month',
    'Last 70 days',
    'Last 90 days',
    'Last 6 months',
    'Last year',
    'Select Range'
]

const ticketData = [
    { type: 'Subscription', total: 25, open: 5, closed: 15, resolved: 5, updated: '2 hours ago', img: '/src/assets/png-icons/eos-icons_subscriptions-created.png' },
    { type: 'Billing', total: 9, open: 5, closed: 3, resolved: 1, updated: '2 hours ago', img: '/src/assets/png-icons/stash_billing-info.png' },
    { type: 'Fault', total: 25, open: 5, closed: 15, resolved: 5, updated: '2 hours ago', img: '/src/assets/png-icons/ooui_alert.png' }
]

const systemHealth = [
    { name: 'CPU', value: 65, color: 'text-green-500' },
    { name: 'Memory', value: 60, color: 'text-orange-500' },
    { name: 'Memory', value: 80, color: 'text-red-500' },
    { name: 'Network', value: 0, color: 'text-gray-500' }
]

const incidentTrends = [
    { day: 'Mon', data: [0, 1, 2, 3, 2, 1, 0] },
    { day: 'Tue', data: [1, 0, 1, 2, 1, 2, 1] },
    { day: 'Wed', data: [2, 3, 4, 4, 3, 3, 4] },
    { day: 'Thu', data: [1, 2, 3, 4, 2, 1, 2] },
    { day: 'Fri', data: [0, 1, 2, 4, 4, 2, 1] },
    { day: 'Sat', data: [1, 2, 1, 3, 3, 4, 0] },
    { day: 'Sun', data: [3, 4, 4, 4, 3, 2, 1] }
]

const aiSuggestions = [
    { text: 'Implement auto-remediation', status: 'new' },
    { text: 'Implement auto-remediation', status: 'applied' },
    { text: 'Implement auto-remediation', status: 'new' }
]

const alerts = [
    { level: 'High', message: 'High CPU Utilization', time: '2 Hours Ago' },
    { level: 'Medium', message: 'High CPU Utilization', time: '2 Hours Ago' },
    { level: 'Medium', message: 'High CPU Utilization', time: '2 Hours Ago' },
    { level: 'High', message: 'High CPU Utilization', time: '2 Hours Ago' }
]

const selectTimeRange = (option) => {
    if (option === 'Select Range') {
        showCalendar.value = true
    } else {
        selectedTimeRange.value = option
    }
    showTimeDropdown.value = false
}

const getIntensityColor = (value) => {
    if (value === 0) return 'bg-gray-100'
    if (value === 1) return 'bg-red-100'
    if (value === 2) return 'bg-red-200'
    if (value === 3) return 'bg-red-400'
    if (value === 4) return 'bg-red-600'
    return 'bg-red-800'
}

const selectedRange = ref([])
const isSelectingRange = ref(false)

const formatDateRange = (startDate, endDate) => {
    const formatSingleDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return `${formatSingleDate(startDate)} to ${formatSingleDate(endDate)}`;
}


const onRangeStart = (date) => {
    isSelectingRange.value = true
    console.log('Range start selected:', date)
}

const onRangeEnd = (date) => {
    isSelectingRange.value = false
    console.log('Range end selected:', date)
}

const clearSelection = () => {
    selectedRange.value = []
    isSelectingRange.value = false
}

const applySelection = () => {
    selectedTimeRange.value = formatDateRange(selectedRange.value[0], selectedRange.value[1])
    selectedDate.value = selectedRange.value
    showCalendar.value = false
    isSelectingRange.value = false
}



// Data points matching the trend in your image
const chartData = [
    { x: 0, y: 25 },
    { x: 1, y: 15 },
    { x: 2, y: 18 },
    { x: 3, y: 12 },
    { x: 4, y: 22 },
    { x: 5, y: 35 },
    { x: 6, y: 42 },
    { x: 7, y: 38 }
];




</script>

<style scoped>
.datepicker-container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.selection-prompt {
    text-align: center;
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border: 2px dashed #d1d5db;
}

.prompt-text {
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0;
}

.clear-btn,
.apply-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    min-width: 140px;
    justify-content: center;
}

.clear-btn {
    background: #f3f4f6;
    color: #6b7280;
    border: 2px solid #e5e7eb;
}

.clear-btn:hover {
    background: #e5e7eb;
    color: #374151;
    border-color: #d1d5db;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.apply-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: 2px solid #10b981;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.apply-btn:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    border-color: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}

.apply-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

:deep(.dp__theme_light) {
    --dp-background-color: #ffffff;
    --dp-text-color: #333333;
    --dp-hover-color: #f3f4f6;
    --dp-hover-text-color: #333333;
    --dp-hover-icon-color: #333333;
    --dp-primary-color: #10b981;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #ef4444;
    --dp-border-color: #e5e7eb;
    --dp-menu-border-color: #e5e7eb;
    --dp-border-color-hover: #d1d5db;
    --dp-disabled-color: #f9fafb;
    --dp-scroll-bar-background: #f3f4f6;
    --dp-scroll-bar-color: #9ca3af;
    --dp-success-color: #10b981;
    --dp-success-color-disabled: #a7f3d0;
    --dp-icon-color: #6b7280;
    --dp-danger-color: #ef4444;
    --dp-highlight-color: rgba(16, 185, 129, 0.1);
    --dp-range-between-dates-background-color: #ecfdf5;
    --dp-range-between-dates-text-color: #065f46;
    --dp-range-between-border-color: #a7f3d0;
}

:deep(.dp__calendar_wrap) {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 1rem;
}

:deep(.dp__calendar_header) {
    padding: 0.75rem 0;
    margin-bottom: 0.5rem;
}

:deep(.dp__calendar_header_item) {
    font-weight: 600;
    font-size: 1.1rem;
    color: #374151;
    text-align: center;
}

:deep(.dp__arrow_top) {
    color: #6b7280;
    font-size: 1.2rem;
    font-weight: bold;
}

:deep(.dp__arrow_top:hover) {
    color: #374151;
    background: #f3f4f6;
    border-radius: 6px;
}

:deep(.dp__calendar_item) {
    border-radius: 8px;
    margin: 2px;
    font-weight: 500;
    font-size: 0.95rem;
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

:deep(.dp__calendar_item:hover) {
    background: #f3f4f6;
    color: #374151;
    transform: scale(1.05);
}

/* Start date styling - Green */
:deep(.dp__range_start) {
    background: #10b981 !important;
    color: white !important;
    font-weight: 700;
    transform: scale(1.1);
    box-shadow: 0 3px 6px rgba(16, 185, 129, 0.4);
    position: relative;
}

:deep(.dp__range_start::before) {
    content: 'START';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    font-weight: 600;
    color: #10b981;
    background: white;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #10b981;
}

/* End date styling - Red */
:deep(.dp__range_end) {
    background: #ef4444 !important;
    color: white !important;
    font-weight: 700;
    transform: scale(1.1);
    box-shadow: 0 3px 6px rgba(239, 68, 68, 0.4);
    position: relative;
}

:deep(.dp__range_end::before) {
    content: 'END';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    font-weight: 600;
    color: #ef4444;
    background: white;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #ef4444;
}

/* Range between dates */
:deep(.dp__range_between) {
    background: #ecfdf5 !important;
    color: #065f46 !important;
    font-weight: 500;
}

:deep(.dp__today) {
    background: #fbbf24;
    color: white;
    font-weight: 600;
}

:deep(.dp__today.dp__range_start) {
    background: #10b981 !important;
}

:deep(.dp__today.dp__range_end) {
    background: #ef4444 !important;
}

:deep(.dp__calendar_header_item) {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    padding: 0.5rem 0;
}

:deep(.dp__menu_inner) {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Enhanced hover effects */
:deep(.dp__calendar_item:not(.dp__range_start):not(.dp__range_end):not(.dp__range_between):hover) {
    background: #f0fdf4;
    color: #166534;
}

/* Responsive design */
@media (max-width: 640px) {
    .range-info {
        flex-direction: column;
        gap: 0.5rem;
    }

    .range-separator {
        transform: rotate(90deg);
    }

    .action-buttons {
        flex-direction: column;
    }
}
</style>