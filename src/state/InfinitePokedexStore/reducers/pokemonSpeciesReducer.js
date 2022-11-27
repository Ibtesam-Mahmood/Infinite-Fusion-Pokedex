import SetPokemonSpeciesAction from '../actions/setPokemonSpeciesAction';

export default function pokemonSpeciesReducer(state = {}, action) {
  switch (action.type) {
    case SetPokemonSpeciesAction.name:
      const map = {...state};
      map[action.id] = action.species;
      return map;
    default:
      return state;
  }
} 