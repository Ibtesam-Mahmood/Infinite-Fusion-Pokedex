import PokemonStoreAction from '../simpleActions';
import pokedex from '../../../services/pokedex';
import {MoveInfo} from '../../../models/pokemon';


const loadBatchMovesThunkAction = ({ids, onStart = ()=>{}, onComplete = (movesList)=>{}}) => {
  return async (dispatch, getState) => {

    // Call the onStart callback
    onStart();
    
    // Get the current state of the store for the moves
    const {moves} = getState();
    
    const moveRequestMap = {};
    
    // Itterate through the move list and check if they are already in the move state
    // If they are then add them to the moveRequestMap
    ids.forEach(id => {
      moveRequestMap[id] = moves[id];
    });
    
    // List of pokemon that need to be requested from the pokedex
    const moveRequestList = Object.keys(moveRequestMap).filter(e => moveRequestMap[e] == null);
    const pokedexPromise = await Promise.all(moveRequestList.map(id => pokedex.getMoveByName(parseInt(id))));
    
    // Add the moves to the moveRequestMap
    pokedexPromise.forEach(move => {
      moveRequestMap[move.id] = move;
    });

    // Removes null values from the moveRequestMap

    // Retreive the list of pokemon from the pokemonRequestMap
    // Then dispatches them to the store
    const moveList = Object.values(moveRequestMap).filter(e => e != null);
    moveList.forEach(move => {
      dispatch(PokemonStoreAction.setMove(MoveInfo.from(move)));
    });

    // Call the onComplete callback
    onComplete(moveList);
  }
}

export default loadBatchMovesThunkAction;