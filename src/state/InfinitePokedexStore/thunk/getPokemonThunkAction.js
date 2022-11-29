import PokemonStoreAction from '../simpleActions';
import {PokemonInfo} from '../../../models/pokemon';
import pokedex from '../../../services/pokedex';

const getPokemonThunkAction = () => {
  return async (dispatch, getState) => {
    
    try {
      // Get the pokemon from the pokedex
      const response = await pokedex.getPokemonsList();
      
      // Parse the pokemon into a list of PokemonInfo objects and dispatch them to the store
      let pokemon = response.results.map(e => PokemonInfo.from(e));

      // Filter out pokemon that are not in the game
      pokemon = pokemon.filter(e => e.isInGame());

      // Sort the list by the game id
      pokemon.sort((a, b) => a.getGameID() - b.getGameID());

      // console.log(pokemon);
      dispatch(PokemonStoreAction.setPokemonInfo(pokemon));
    } catch (error) {
      console.error(error);
    }
  }
}

export default getPokemonThunkAction;