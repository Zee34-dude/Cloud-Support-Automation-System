<template>
  <div class="flex relative">
    <SideBar />
    <router-view />
  </div>
</template>

<script setup>

import SideBar from './AppComponents/SideBar.vue';
import { ref, provide } from 'vue';

const sidebarOpen = ref(false);

provide('sidebarOpen', sidebarOpen);
</script>
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
