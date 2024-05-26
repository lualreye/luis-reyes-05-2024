import { defineStore } from 'pinia';

import APIPokemon from '@/services/pokemonService';

import type { Pokemon, PokemonResults } from '@/types/pokemon.interface';

const pokemonService = new APIPokemon();

interface Rootstate {
  pokemon: null | PokemonResults,
  limit: number,
  offset: number,
  isLoading: boolean
}

export const usePokemonStore = defineStore('PokemonStore', {
  state: (): Rootstate => ({
    pokemon: null,
    limit: 25,
    offset: 0,
    isLoading: false
  }),

  actions: {
    async getPokemon(): Promise<void> {
      this.isLoading = true
      try {
        if (this.offset < 150) {
          this.offset += this.limit;
          const response = await pokemonService.getPokemon(this.limit, this.offset);
          if (this.pokemon !== null) {
            this.pokemon.results = this.pokemon.results.concat(response.results);
          } else {
            this.pokemon = response;
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getPokemonDetail(pokeNumber: number): Promise<Pokemon | null> {
      try {
        return await pokemonService.getPokemonDetail(pokeNumber);
      } catch (error) {
        console.error(error);
        return null
      }
    }
  }
})

export default usePokemonStore;