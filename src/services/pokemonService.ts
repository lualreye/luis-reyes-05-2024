import type { Evolution, Pokemon, PokemonResults } from '@/types/pokemon.interface';

import APIBase from '@/services/httpBase';


class APIPokemon extends APIBase {
  async getPokemon(limit: number = 25, offset: number = 25): Promise<PokemonResults> {
    return this.get<PokemonResults>(`pokemon?limit=${limit}&offset=${offset}`);
  }

  async getPokemonDetail(pokeNumber: number): Promise<Pokemon> {
    const pokemonData = await this.get<any>(`pokemon/${pokeNumber}`);
    
    const speciesData = await this.get<any>(`pokemon-species/${pokeNumber}`);
    const evolutionData = await this.get<any>(speciesData.evolution_chain.url.replace(this.baseUrl, ''));

    const evolutionChain: Evolution[] = [];
    let currentEvolution = evolutionData.chain;

    while (currentEvolution) {
      const speciesUrl = currentEvolution.species.url;
      const speciesId = speciesUrl.split('/').slice(-2, -1)[0];
      const speciesSpriteData = await this.get<any>(`pokemon/${speciesId}`);

      evolutionChain.push({
        name: currentEvolution.species.name,
        sprite: speciesSpriteData.sprites.other['official-artwork'].front_default,
      });

      currentEvolution = currentEvolution.evolves_to[0];
    }

    const pokemon: Pokemon = {
      name: pokemonData.name,
      sprites: pokemonData.sprites,
      types: pokemonData.types,
      stats: pokemonData.stats,
      cries: {
        latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeNumber}.ogg`,
        legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${pokeNumber}.ogg`,
      },
      height: pokemonData.height,
      weight: pokemonData.weight,
      description: speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text,
      evolution_chain: evolutionChain,
    };

    return pokemon;
  }
}

export default APIPokemon;