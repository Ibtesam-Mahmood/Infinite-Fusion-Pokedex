import SetPokemonInfoListAction from './actions/setPokemonInfoListAction';
import SetPokemonAction from './actions/setPokemonAction';
import getPokemonThunkAction from './thunk/getPokemonThunkAction';
import loadPokemonThunkAction from './thunk/loadPokemonThunkAction';

const actions = {

    // Actions
    setPokemonInfo: SetPokemonInfoListAction.action,
    setPokemon: SetPokemonAction.action,

};

export default actions;