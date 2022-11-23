import PokemonStoreAction from '../simpleActions';
import {PokemonInfo} from '../../../models/pokemon';
import pokedex from '../../../services/pokedex';

const getPokemonThunkAction = () => {
  return async (dispatch, getState) => {
    
    try {
      // Get the pokemon from the pokedex
      const response = await pokedex.getPokemonsList();
      
      // Parse the pokemon into a list of PokemonInfo objects and dispatch them to the store
      const pokemon = response.results.map(e => PokemonInfo.from(e));
      console.log(pokemon);
      dispatch(PokemonStoreAction.setPokemonInfo(pokemon));
    } catch (error) {
      console.error(error);
    }
  }
}

export default getPokemonThunkAction;