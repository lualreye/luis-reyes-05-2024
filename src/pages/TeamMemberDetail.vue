<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Chart, registerables, ChartOptions } from 'chart.js';
import usePokemonDetail from '@/composables/usePokemonDetail';

Chart.register(...registerables);

const route = useRoute();
const pokeNumber = Number(route.params.id);
const { pokemonDetail } = usePokemonDetail(pokeNumber);
const chartInstance = ref<Chart<'radar'> | null>(null);
const audio = ref<HTMLAudioElement | null>(null);

function playSound(): void {
  if (pokemonDetail.value && pokemonDetail.value.cries.latest) {
    audio.value = new Audio(pokemonDetail.value.cries.latest);
    audio.value.play();
  }
}

function stopSound(): void {
  if (audio.value) {
    audio.value.pause();
    audio.value.currentTime = 0;
  }
}

function renderChart() {
  nextTick(() => {
    if (pokemonDetail.value) {
      const canvas = document.getElementById('statsChart') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (chartInstance.value) {
            chartInstance.value.destroy();
          }
          const options: ChartOptions<'radar'> = {
            scales: {
              r: {
                angleLines: {
                  display: false,
                },
                suggestedMin: 0,
                suggestedMax: 150,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                },
              },
            },
          };

          chartInstance.value = new Chart<'radar'>(ctx, {
            type: 'radar',
            data: {
              labels: pokemonDetail.value.stats.map(stat => stat.stat.name),
              datasets: [
                {
                  label: 'Base Stats',
                  data: pokemonDetail.value.stats.map(stat => stat.base_stat),
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
              ],
            },
            options: options,
          });
        }
      }
    }
  });
}

watch(pokemonDetail, (newValue) => {
  if (newValue) {
    renderChart();
  }
});

onMounted(() => {
  renderChart();
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});
</script>

<template>
  <div v-if="pokemonDetail" class="pokemon-detail bg-white shadow-md rounded-lg p-4 text-center w-full max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold mb-4">{{ pokemonDetail.name }}</h2>
    <img
      :src="pokemonDetail.sprites.front_default"
      :alt="pokemonDetail.name"
      class="mx-auto mb-4" />
    <div class="mb-4">
      <h3 class="font-bold">Types</h3>
      <div>
        <span
          v-for="type in pokemonDetail.types"
          :key="type.slot"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {{ type.type.name }}
        </span>
      </div>
    </div>
    <div class="mb-4 mx-auto">
      <canvas id="statsChart" class="mx-auto"></canvas>
    </div>
    <div class="mb-4">
      <h3 class="font-bold text-gray-800">Height</h3>
      <p class="text-gray-800">{{ pokemonDetail.height }} dm</p>
    </div>
    <div class="mb-4">
      <h3 class="font-bold text-gray-800">Weight</h3>
      <p class="text-gray-800">{{ pokemonDetail.weight }} hg</p>
    </div>
    <div class="mb-4">
      <h3 class="font-bold text-gray-800">Description</h3>
      <p class="text-gray-800">{{ pokemonDetail.description }}</p>
    </div>
    <div class="mb-4">
      <h3 class="font-bold">Evolution Chain</h3>
      <div class="flex justify-center">
        <div v-for="evolution in pokemonDetail.evolution_chain" :key="evolution.name" class="text-center mx-2">
          <img
            :src="evolution.sprite"
            :alt="evolution.name"
            class="mx-auto mb-2" />
          <p class="text-gray-800 font-semibold text-xl">
            {{ evolution.name }}
          </p>
        </div>
      </div>
    </div>
    <button
      @mouseover="playSound"
      @mouseleave="stopSound"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Play Sound
    </button>
  </div>
</template>

<style scoped>
.pokemon-detail {
  position: relative;
}
</style>
