// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your pages/components
import SupportDashboard from './sidebar-components/SupportDashboard.vue'
import FaultManagement from './sidebar-components/FaultManagement.vue'
import ServiceRequest from './sidebar-components/ServiceRequest.vue' // Assuming you have this component

// Define route records
const routes = [
  { path: '/', name: 'support-dashboard', component: SupportDashboard },
  { path: '/fault-management', name: 'fault-management', component: FaultManagement },
  {path:'/service-request',name:'service-request',component:ServiceRequest },
  // Catch-all route for 404
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // or createWebHashHistory() if you prefer hashes
  routes,
})

export default router
