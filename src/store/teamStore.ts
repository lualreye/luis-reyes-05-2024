import { defineStore } from 'pinia';

interface Rootstate {
  team: number[],
  message: string | null;
}

export const useTeamStore = defineStore('TeamStore', {
  state: (): Rootstate => ({
    team: [],
    message: null
  }),

  actions: {
    async addOrRemovePokemon(pokeNumber: number): Promise<void> {
      const index = this.team.indexOf(pokeNumber);

      if (index !== -1) {
        this.team.splice(index, 1);
        this.message = `Removed Pokémon with ID ${pokeNumber} from the team.`;
      } else if (this.team.length < 6) {
        this.team.push(pokeNumber);
        this.message = `Added Pokémon with ID ${pokeNumber} to the team.`;
      } else {
        this.message = "The team already has 6 Pokémon. Can't add more.";
      }
      console.log(this.message)
  
      setTimeout(() => {
        this.message = null;
      }, 3000);
    }
  }
})

export default useTeamStore;