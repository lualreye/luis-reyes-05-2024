<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Chart, registerables } from 'chart.js';
import usePokemonDetail from '@/composables/usePokemonDetail';

Chart.register(...registerables);

const emit = defineEmits(['remove-pokemon']);
const props = defineProps({
  pokeNumber: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const { pokemonDetail } = usePokemonDetail(props.pokeNumber);
const audio = ref<HTMLAudioElement | null>(null);
const chartInstance = ref<Chart | null>(null);
const updateSignal = ref(0); 

function removePokemon(): void {
  emit('remove-pokemon', props.pokeNumber);
}

function redirectToDetail(): void {
  router.push(`/team/${props.pokeNumber}`);
}

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
      const canvas = document.getElementById(`statsChart-${props.pokeNumber}`) as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (chartInstance.value) {
            chartInstance.value.destroy();
          }
          chartInstance.value = new Chart(ctx, {
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
            options: {
              scales: {
                r: {
                  angleLines: {
                    display: false,
                  },
                  suggestedMin: 0,
                  suggestedMax: 150,
                },
              },
            },
          });
        }
      }
    }
  });
}

watch([pokemonDetail, updateSignal], (newValue) => {
  if (newValue) {
    renderChart();
  }
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});
</script>

<template>
  <div
    v-if="pokemonDetail"
    class="pokemon-card bg-white shadow-md rounded-lg p-4 text-center w-64"
    @click="redirectToDetail"
    @mouseover="playSound"
    @mouseleave="stopSound"
  >
    <h2 class="text-2xl font-bold mb-4">
      {{ pokemonDetail.name }}
    </h2>
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
    <div class="mb-4">
      <canvas :id="`statsChart-${props.pokeNumber}`"></canvas>
    </div>
    <button
      @click.stop="removePokemon"
      class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
      Quitar
    </button>
  </div>
</template>

<style scoped>
.pokemon-card {
  position: relative;
  transition: transform 0.2s;
}
.pokemon-card:hover {
  transform: scale(1.05);
}
</style>
