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

      // Filter out pokemon that have an id greater than 898
      pokemon = pokemon.filter(e => parseInt(e.getID()) <= 898);

      // console.log(pokemon);
      dispatch(PokemonStoreAction.setPokemonInfo(pokemon));
    } catch (error) {
      console.error(error);
    }
  }
}

export default getPokemonThunkAction;