// import {Pokemon} from '../../../models/pokemon';
import PokemonStoreActions from '../simpleActions';
import PokedexApi from '../../../services/api/pokedexAPI';


const loadEvolutionChainThunkAction = ({id, onStart = ()=>{}, onComplete = (evolution)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    // console.log('Running thunk action');
    
    // Get the current state of the store for the pokemon
    const {chains} = getState();

    // If the pokemon is already in the store, exit and call the onComplete callback
    if(chains[id] != null) {
        onComplete(chains[id]);
        return;
    }
    
    const evolution = await PokedexApi.getEvolutionChainByID(id);
    
    if(evolution != null){
      dispatch(PokemonStoreActions.setEvolution(evolution));
    }

    // Call the onComplete callback
    onComplete(evolution);
  }
}

export default loadEvolutionChainThunkAction;