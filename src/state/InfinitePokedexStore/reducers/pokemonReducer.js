import SetPokemonAction from '../actions/setPokemonAction';

export default function pokemonInfoReducer(state = {}, action) {
  switch (action.type) {
    case SetPokemonAction.name:
      const map = {...state};
      map[action.id] = action.pokemon;
      return map;
    default:
      return state;
  }
}