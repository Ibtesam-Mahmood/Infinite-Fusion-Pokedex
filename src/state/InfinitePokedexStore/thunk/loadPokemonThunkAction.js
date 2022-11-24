import {Pokemon} from '../../../models/pokemon';
import PokemonStoreActions from '../simpleActions';
import PokedexApi from '../../../services/api/pokedexAPI';


const loadPokemonThunkAction = ({id, onStart = ()=>{}, onComplete = (pokemon)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    // console.log('Running thunk action');
    
    // Get the current state of the store for the pokemon
    const {pokemap} = getState();

    // If the pokemon is already in the store, exit and call the onComplete callback
    if(pokemap[id] != null) {
        onComplete(pokemap[id]);
        return;
    }
    
    const pokemon = await PokedexApi.getPokemonByID(id);
    
    if(pokemon != null){
      dispatch(PokemonStoreActions.setPokemon(pokemon));
    }

    // Call the onComplete callback
    onComplete(pokemon);
  }
}

export default loadPokemonThunkAction;