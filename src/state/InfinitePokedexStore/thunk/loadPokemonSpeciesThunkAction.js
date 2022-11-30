// import {Pokemon} from '../../../models/pokemon';
import PokemonStoreActions from '../simpleActions';
import PokedexApi from '../../../services/api/pokedexAPI';


const loadPokemonSpeciesThunkAction = ({id, onStart = ()=>{}, onComplete = (species)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    // console.log('Running thunk action');
    
    // Get the current state of the store for the pokemon
    const {species} = getState();
    // console.log(species);
    
    // If the pokemon is already in the store, exit and call the onComplete callback
    if(species[id] != null) {
        onComplete(species[id]);
        return;
    }
    
    const pokemon = await PokedexApi.getPokemonSpeciesByID(id);
    
    if(pokemon != null){
      dispatch(PokemonStoreActions.setPokemonSpecies(pokemon));
    }

    // Call the onComplete callback
    onComplete(pokemon);
  }
}

export default loadPokemonSpeciesThunkAction;