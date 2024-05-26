export interface Cries {
  latest: string;
  legacy: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  front_default: string;
  front_shiny: string;
  other: {
    official_artwork: {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface Evolution {
  name: string;
  sprite: string;
}

export interface Pokemon {
  name: string;
  sprites: Sprites;
  types: Type[];
  stats: Stat[];
  cries: Cries;
  height: number;
  weight: number;
  description: string;
  evolution_chain: Evolution[];
}

export interface Result {
  name: string;
  url: string;
}

export interface PokemonResults {
  count: number;
  next: string;
  previous: string | null,
  results: Result[]
}
