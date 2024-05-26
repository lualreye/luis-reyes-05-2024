<script setup lang="ts">
import { onMounted } from 'vue';

import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import usePokemonStore from '@/store/pokemonStore';
import PokeCard from '@/components/PokeCard.vue';
import IsLoading from '@/components/IsLoading.vue';

const pokemonStore = usePokemonStore();

function getNumber(url: string): number {
  const poke = url.split('/')
  return Number(poke[poke.length - 2])
}

const { isFetching } = useInfiniteScroll()

onMounted(async () => {
  await pokemonStore.getPokemon();
});
</script>

<template>
  <div
    v-if="pokemonStore.pokemon !== null"
    class="text-white flex gap-3 flex-wrap max-w-screen-lg mx-auto justify-center">
    <div
      v-for="(pokemon, index) in pokemonStore.pokemon.results"
      :key="index"
      class="pokemon-detail">
      <PokeCard :poke-number="getNumber(pokemon.url)" />
    </div>
  </div>
  <IsLoading :is-loading="pokemonStore.isLoading" />
</template>