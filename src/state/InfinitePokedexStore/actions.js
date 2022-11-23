import SimplePokemonStoreAction from '../simpleActions';
import getPokemonThunkAction from './thunk/getPokemonThunkAction';
import loadPokemonThunkAction from './thunk/loadPokemonThunkAction';

const actions = {

    // Actions
    ...SimplePokemonStoreAction,

    // Thunk actions
    thunk: {
        getPokemon: getPokemonThunkAction,
        loadPokemonByID: loadPokemonThunkAction,
    }
};

export default actions;