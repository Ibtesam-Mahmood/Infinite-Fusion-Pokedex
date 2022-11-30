import SetAbilityAction from '../actions/setAbilityAction';

export default function abilityReducer(state = {}, action) {
  switch (action.type) {
    case SetAbilityAction.name:
      const map = {...state};
      map[action.id] = action.ability;
      return map;
    default:
      return state;
  }
}