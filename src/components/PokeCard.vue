<script setup lang="ts">
import { computed } from 'vue';

import useTeamStore from '@/store/teamStore';
import usePokemonDetail from '@/composables/usePokemonDetail';

const props = defineProps({
  pokeNumber: {
    type: Number,
    required: true,
  },
});

const teamStore = useTeamStore();
const { pokemonDetail } = usePokemonDetail(props.pokeNumber);

const isAdded = computed(() => teamStore.team.includes(props.pokeNumber));
const buttonName = computed(() => (!isAdded.value ? 'Agregar' : 'Agregado'));
const buttonClass = computed(() =>
  !isAdded.value
    ? 'bg-green-500 hover:bg-green-700'
    : 'bg-pink-500 hover:bg-pink-700'
);
const teamCompleted = computed(() => teamStore.team.length >= 6);

function addPokemon(): void {
  teamStore.addOrRemovePokemon(props.pokeNumber);
}
</script>

<template>
  <div
    v-if="pokemonDetail"
    class="pokemon-card bg-white shadow-md rounded-lg p-4 text-center w-64">
    {{ teamStore.team }}
    <h2 class="text-2xl font-bold mb-4">
      {{ pokemonDetail?.name }}
    </h2>
    <img
      :src="pokemonDetail.sprites.front_default"
      :alt="pokemonDetail.name"
      class="mx-auto">
    <button
      v-if="teamCompleted && !isAdded"
      @click="addPokemon"
      class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      Equipo Completo
    </button>
    <button
      v-else
      class="text-white font-bold py-2 px-4 rounded"
      :class="buttonClass"
      @click="addPokemon">
      {{ buttonName }}
    </button>
  </div>
</template>
