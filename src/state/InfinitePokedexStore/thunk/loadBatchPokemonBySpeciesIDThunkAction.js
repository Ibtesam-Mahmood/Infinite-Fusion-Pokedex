import PokemonStoreAction from '../simpleActions';
import pokedex from '../../../services/pokedex';
import {Pokemon, PokemonSpecies} from '../../../models/pokemon';


const loadBatchPokemonBySpeciesIDThunkAction = ({ids, onStart = ()=>{}, onComplete = (pokemap)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    
    // Get the current state of the store for the pokemon
    const {pokemap, species} = getState();
    
    const speciesRequestMap = {};
    const pokemonRequestMap = {};
    
    // Itterate through the pokemon list and check if they are already in the pokemap state
    // If they are then add them to the pokemonRequestMap
    ids.forEach(id => {
      speciesRequestMap[id] = species[id];
    });
    
    // List of pokemon that need to be requested from the pokedex
    const speciesRequestList = Object.keys(speciesRequestMap).filter(e => pokemonRequestMap[e] == null);
    // console.log(`Loading [${speciesRequestList.length}] batch of species ...`);
    
    const pokedexSpeciesPromise = await Promise.all(speciesRequestList.map(id => pokedex.getPokemonSpeciesByName(parseInt(id))));
    
    // Add the pokemon to the pokemonRequestMap
    // console.log(pokedexPromise);
    pokedexSpeciesPromise.forEach(pokemon => {
      speciesRequestMap[pokemon.id] = PokemonSpecies.from(pokemon);
    });

    // Removes null values from the pokemonRequestMap

    // Retreive the list of pokemon from the pokemonRequestMap
    // Then dispatches them to the store
    const speciesList = Object.values(speciesRequestMap).filter(e => e != null);
    speciesList.forEach(spec => {
      dispatch(PokemonStoreAction.setPokemonSpecies(spec));
    });

    // Call the onComplete callback
    // console.log(`Loaded [${speciesList.length}] species...`);

    // Itterate through the list of species and add thier pokemon to the pokemonRequestMap
    speciesList.forEach(spec => {
      const pokemonID = spec.getPokemonID();
      pokemonRequestMap[pokemonID] = pokemap[pokemonID];
    });

    // List of pokemon that need to be requested from the pokedex
    const pokemonRequestList = Object.keys(pokemonRequestMap).filter(e => pokemonRequestMap[e] == null);
    // console.log(`Loading [${pokemonRequestList.length}] batch of pokemon ...`);

    // Load in the pokemon
    const pokedexPromise = await Promise.all(pokemonRequestList.map(id => pokedex.getPokemonByName(parseInt(id))));
    
    // Add the pokemon to the pokemonRequestMap
    // console.log(pokedexPromise);
    pokedexPromise.forEach(pokemon => {
      pokemonRequestMap[pokemon.id] = Pokemon.from(pokemon);
    });

    // Removes null values from the pokemonRequestMap

    // Retreive the list of pokemon from the pokemonRequestMap
    // Then dispatches them to the store
    const pokemonList = Object.values(pokemonRequestMap).filter(e => e != null);
    pokemonList.forEach(pokemon => {
      dispatch(PokemonStoreAction.setPokemon(pokemon));
    });

    // Call the onComplete callback
    // console.log(`Loaded [${pokemonList.length}] pokemon...`);

    const speciesPokemonMap = {};
    Object.keys(speciesRequestMap).forEach(id => {
      const spec = speciesRequestMap[id];
      const pokemonID = spec.getPokemonID();
      speciesPokemonMap[id] = pokemonRequestMap[pokemonID];
    });
    // console.log(speciesPokemonMap);

    onComplete(speciesPokemonMap);
  }
}

export default loadBatchPokemonBySpeciesIDThunkAction;