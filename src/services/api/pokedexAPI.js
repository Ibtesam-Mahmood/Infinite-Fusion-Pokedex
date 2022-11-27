import pokedex from "../pokedex";
import {Pokemon, PokemonSpecies, EvolutionInfo} from '../../models/pokemon';


export default class PokedexApi {

    static async getPokemonByID(id) {

      let pokemon = null;

      try {
        // Get the pokemon from the pokedex
        const response = await pokedex.getPokemonByName(parseInt(id));
        
        // Parse the pokemon into a Pokemon object and dispatch it to the store
        pokemon = Pokemon.from(response);
        // console.log(pokemon);
      } catch (error) {
        console.error(error);
      }

      return pokemon;
    }

    static async getPokemonSpeciesByID(id) {
      let species = null;

      try {
        // Get the pokemon from the pokedex
        const response = await pokedex.getPokemonSpeciesByName(parseInt(id));
        
        // Parse the pokemon into a Pokemon object and dispatch it to the store
        species = PokemonSpecies.from(response);
        // console.log(pokemon);
      } catch (error) {
        console.error(error);
      }

      return species;
    }

    static async getEvolutionChainByID(id) {
      let info = null;

      try {
        // Get the pokemon from the pokedex
        const response = await pokedex.getEvolutionChainById(parseInt(id));
        
        // Parse the pokemon into a Pokemon object and dispatch it to the store
        info = EvolutionInfo.from(response);
        // console.log(pokemon);
      } catch (error) {
        console.error(error);
      }

      return info;
    }
}