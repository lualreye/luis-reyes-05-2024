<script setup lang="ts">
import { ref } from 'vue';

import { useTeamStore } from '@/store/teamStore';
import TeamCard from '@/components/TeamCard.vue';

const teamStore = useTeamStore();
const updateSignal = ref(0);

function removePokemon(pokeNumber: number): void {
  teamStore.addOrRemovePokemon(pokeNumber);
  updateSignal.value++
}
</script>

<template>
  <div
    v-if="teamStore.team.length"
    class="text-white flex gap-3 flex-wrap max-w-screen-lg mx-auto justify-center">
    <div
      v-for="(pokemon, index) in teamStore.team"
      :key="index"
      class="pokemon-detail">
      <TeamCard
        :poke-number="pokemon"
        :key="updateSignal"
        @remove-pokemon="removePokemon" />
    </div>
  </div>
  <div
    v-else
    class="font-semibold text-2xl text-yellow-300">
    No team yet!
  </div>
</template>