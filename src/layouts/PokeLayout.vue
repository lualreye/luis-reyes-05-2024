<script setup lang="ts">
import { RouterView } from 'vue-router';

import PokeHeader from '@/components/PokeHeader.vue';
</script>

<template>
  <div class="layout-container flex flex-col">
    <poke-header />
    <div class="view-container flex-grow p-4"> 
      <router-view />
    </div>
  </div>
</template>