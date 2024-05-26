import { onMounted, ref } from 'vue';
import usePokemonStore from '@/store/pokemonStore';

export function useInfiniteScroll() {
  const pokemonStore = usePokemonStore();
  
  const isFetching = ref(false);
  
  function addScrollListener(): void {
    window.addEventListener('scroll', handleScroll);
  }
  
  function handleScroll(): void {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  
    if (scrollY + windowHeight >= documentHeight - 100 && !isFetching.value) {
      isFetching.value = true;
      fetchMorePokemon();
    }
  }
  
  function fetchMorePokemon(): void {
    pokemonStore.getPokemon();
    isFetching.value = false;
  }
  
  onMounted(() => {
    if (!pokemonStore.pokemon) {
      pokemonStore.pokemon;
    }
    addScrollListener();
  });

  return { isFetching };
};