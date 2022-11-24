import SimplePokemonStoreAction from './simpleActions';
import getPokemonThunkAction from './thunk/getPokemonThunkAction';
import loadPokemonThunkAction from './thunk/loadPokemonThunkAction';
import loadBatchPokemonThunkAction from './thunk/loadBatchPokemonThunkAction';

const actions = {

    // Actions
    ...SimplePokemonStoreAction,

    // Thunk actions
    thunk: {
        getPokemon: getPokemonThunkAction,
        loadPokemonByID: loadPokemonThunkAction,
        batchPokemonByID: loadBatchPokemonThunkAction,
    }
};

export default actions;