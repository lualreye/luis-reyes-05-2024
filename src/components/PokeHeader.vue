<script setup lang="ts">

const menuItems = [
  {
    name: 'Inicio',
    path: '/'
  },
  {
    name: 'Team',
    path: '/team'
  }
]
</script>

<template>
  <header class="header bg-gray-800">
    <div class="text-white p-2 text-center mx-auto max-w-screen-xl flex justify-between items-center">
      <div class="w-28">
        <img
          src="../assets//pokemon-23.svg"
          alt="pokemon-logo">
      </div>
      <nav class="navbar">
        <ul class="list flex gap-3">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="item">
            <router-link :to="item.path">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>