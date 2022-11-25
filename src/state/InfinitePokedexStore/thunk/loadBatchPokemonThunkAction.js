import PokemonStoreAction from '../simpleActions';
import pokedex from '../../../services/pokedex';
import {Pokemon} from '../../../models/pokemon';


const loadBatchPokemonThunkAction = ({ids, onStart = ()=>{}, onComplete = (pokemonList)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    console.log(`Loading [${ids.length}] batch of pokemon...`);
    
    // Get the current state of the store for the pokemon
    const {pokemap} = getState();

    const pokemonRequestMap = {};

    // Itterate through the pokemon list and check if they are already in the pokemap state
    // If they are then add them to the pokemonRequestMap
    ids.forEach(id => {
      pokemonRequestMap[id] = pokemap[id];
    });

    // List of pokemon that need to be requested from the pokedex
    const pokemonRequestList = Object.keys(pokemonRequestMap).filter(e => pokemonRequestMap[e] == null);
    
    const pokedexPromise = await Promise.all(pokemonRequestList.map(id => pokedex.getPokemonByName(parseInt(id))));
    
    // Add the pokemon to the pokemonRequestMap
    // console.log(pokedexPromise);
    pokedexPromise.forEach(pokemon => {
      pokemonRequestMap[pokemon.id] = pokemon;
    });

    // Removes null values from the pokemonRequestMap

    // Retreive the list of pokemon from the pokemonRequestMap
    // Then dispatches them to the store
    const pokemonList = Object.values(pokemonRequestMap).filter(e => e != null);
    pokemonList.forEach(pokemon => {
      dispatch(PokemonStoreAction.setPokemon(Pokemon.from(pokemon)));
    });

    // Call the onComplete callback
    console.log(`Loaded [${pokemonList.length}] pokemon...`);
    onComplete(pokemonList);
  }
}

export default loadBatchPokemonThunkAction;