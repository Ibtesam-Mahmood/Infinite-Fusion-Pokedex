import SimplePokemonStoreAction from './simpleActions';
import getPokemonThunkAction from './thunk/getPokemonThunkAction';
import loadPokemonThunkAction from './thunk/loadPokemonThunkAction';
import loadBatchPokemonThunkAction from './thunk/loadBatchPokemonThunkAction';
import loadPokemonSpeciesThunkAction from './thunk/loadPokemonSpeciesThunkAction';
import loadEvolutionChainThunkAction from './thunk/loadEvolutionChainThunkAction';

const actions = {

    // Actions
    ...SimplePokemonStoreAction,

    // Thunk actions
    thunk: {
        getPokemon: getPokemonThunkAction,
        loadPokemonByID: loadPokemonThunkAction,
        batchPokemonByID: loadBatchPokemonThunkAction,
        loadSpeciesByID: loadPokemonSpeciesThunkAction,
        loadEvolutionChain: loadEvolutionChainThunkAction,
    }
};

export default actions;