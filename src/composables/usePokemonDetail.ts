import { ref, onMounted } from 'vue';
import usePokemonStore from '@/store/pokemonStore';
import type { Pokemon } from '@/types/pokemon.interface';

export default function usePokemonDetail(pokeNumber: number) {
  const pokemonStore = usePokemonStore();
  const pokemonDetail = ref<null | Pokemon>(null);

  onMounted(async () => {
    if (pokeNumber) {
      pokemonDetail.value = await pokemonStore.getPokemonDetail(pokeNumber);
    }
  });

  return {
    pokemonDetail,
  };
}
