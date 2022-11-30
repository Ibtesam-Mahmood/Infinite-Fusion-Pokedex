import PokemonStoreAction from '../simpleActions';
import pokedex from '../../../services/pokedex';
import {AbilityInfo} from '../../../models/pokemon';


const loadBatchAbilitiesThunkAction = ({ids, onStart = ()=>{}, onComplete = (abilitiesList)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    
    // Get the current state of the store for the abilities
    const {abilities} = getState();
    
    const abilityRequestMap = {};
    
    // Itterate through the abilities list and check if they are already in the abilities state
    // If they are then add them to the moveRequestMap
    ids.forEach(id => {
      abilityRequestMap[id] = abilities[id];
    });
    
    // List of pokemon that need to be requested from the pokedex
    const abilityRequestList = Object.keys(abilityRequestMap).filter(e => abilityRequestMap[e] == null);
    const pokedexPromise = await Promise.all(abilityRequestList.map(id => pokedex.getAbilityByName(parseInt(id))));
    
    // Add the moves to the moveRequestMap
    pokedexPromise.forEach(ability => {
      abilityRequestMap[ability.id] = ability;
    });

    // Removes null values from the moveRequestMap

    // Retreive the list of pokemon from the pokemonRequestMap
    // Then dispatches them to the store
    const abilityList = Object.values(abilityRequestMap).filter(e => e != null);
    abilityList.forEach(ability => {
      dispatch(PokemonStoreAction.setAbility(AbilityInfo.from(ability)));
    });

    // Call the onComplete callback
    onComplete(abilityList);
  }
}

export default loadBatchAbilitiesThunkAction;