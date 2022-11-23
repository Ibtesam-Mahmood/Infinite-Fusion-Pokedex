import {Pokemon} from '../../../models/pokemon';
import PokemonStoreAction from '../simpleActions';
import pokedex from '../../../services/pokedex';


const loadPokemonThunkAction = ({id, onStart = ()=>{}, onComplete = (pokemon)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    
    // Get the current state of the store for the pokemon
    const {pokemap} = getState();

    // If the pokemon is already in the store, exit and call the onComplete callback
    if(pokemap[id] != null) {
        onComplete(pokemap[id]);
        return;
    }
    
    let pokemon = null;
    try {
        // Get the pokemon from the pokedex
        const response = await pokedex.getPokemonByName(parseInt(id));
        // console.log(response);
        
        // Parse the pokemon into a Pokemon object and dispatch it to the store
        pokemon = Pokemon.from(response);
        dispatch(PokemonStoreAction.setPokemon(pokemon));
    } catch (error) {
        console.error(error);
    }

    // Call the onComplete callback
    onComplete(pokemon);
  }
}

export default loadPokemonThunkAction;