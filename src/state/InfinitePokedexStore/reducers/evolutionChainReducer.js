import SetEvolutionChainAction from '../actions/setEvolutionChainAction';

export default function evolutionChainReducer(state = {}, action) {
  switch (action.type) {
    case SetEvolutionChainAction.name:
      const map = {...state};
      map[action.id] = action.chain;
      return map;
    default:
      return state;
  }
} 