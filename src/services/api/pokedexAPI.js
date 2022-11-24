import pokedex from "../pokedex";
import {Pokemon} from '../../models/pokemon';


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
}