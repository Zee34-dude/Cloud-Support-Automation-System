// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your pages/components
import SupportDashboard from './sidebar-components/SupportDashboard.vue'
import FaultManagement from './sidebar-components/FaultManagement.vue'
import ServiceRequest from './sidebar-components/ServiceRequest.vue' 
import MonitoringAltering from './sidebar-components/Monitoring-altering.vue'
import AnalystDeskManagement from './sidebar-components/AnalystDeskManagement.vue' 
import TicketOverview from './sidebar-components/TicketOverview.vue' 
// Define route records
const routes = [
  { path: '/', name: 'support-dashboard', component: SupportDashboard },
  { path: '/fault-management', name: 'fault-management', component: FaultManagement },
  { path: '/service-request', name: 'service-request', component: ServiceRequest },
  { path: '/monitoring-altering', name: 'monitoring-altering', component: MonitoringAltering },
  { path: '/analyst-desk-management', name: 'analyst-desk-management', component: AnalystDeskManagement },
  { path: '/ticket-overview/:id', name: 'ticket-overview', component: TicketOverview },

]

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // or createWebHashHistory() 
  routes,
})

export default router
