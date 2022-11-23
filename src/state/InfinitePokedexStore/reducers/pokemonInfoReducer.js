import SetPokemonInfoListAction from '../actions/setPokemonInfoListAction';

export default function pokemonInfoReducer(state = [], action) {
    switch (action.type) {
        case SetPokemonInfoListAction.name:
            return [...action.pokemon];
        default:
            return state;
    }
}