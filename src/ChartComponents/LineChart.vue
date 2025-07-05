<template>
    <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js'
const props = defineProps({
    chartData: {
        type: Array,
        required: true
    },
    chartOptions: {
        type: Object,
        required: true
    },
    tension: {
        type: Number,
        default: 0.4
    },
    color: {
        type: String,
        default: '#ef4444'
    }
})

Chart.register(...registerables)
const chartCanvas = ref(null)
let chartInstance = null
onMounted(() => {
    const ctx = chartCanvas.value.getContext('2d')

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                data:  props.chartData,
                borderColor: props.color || '#ef4444',
                borderWidth: 1,
                pointRadius: 0,
                fill: false,
                tension: props.tension,
            }],
        },
        options: props.chartOptions || {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: {
                    type: 'linear',   // critical for your x values!
                    display: false
                },
                y: {
                    display: false
                }
            }
        }
    })
    onBeforeUnmount(() => {
        if (chartInstance) chartInstance.destroy()
    })

})
</script>